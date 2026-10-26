import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const ARTIFACT_DIR =
  'C:/Users/lucia/.gemini/antigravity/brain/137179d6-5a77-4fb5-aea0-9d7cdd4312de';

async function processImageWithCanvas(page, inputPath, maxDim = 640) {
  const inputBuffer = fs.readFileSync(inputPath);
  const ext = path.extname(inputPath).toLowerCase() === '.png' ? 'png' : 'jpeg';
  const dataUrl = `data:image/${ext};base64,${inputBuffer.toString('base64')}`;

  return await page.evaluate(
    async ({ srcDataUrl, targetMaxDim }) => {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = srcDataUrl;
      });

      const scale = Math.min(1, targetMaxDim / Math.max(img.width, img.height));
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const visited = new Uint8Array(width * height);

      const isNearWhite = (idx) => {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        if (a < 16) return true;
        return r >= 235 && g >= 232 && b >= 228;
      };

      const queue = new Int32Array(width * height);
      let head = 0;
      let tail = 0;

      const enqueueIfBg = (x, y) => {
        if (x < 0 || x >= width || y < 0 || y >= height) return;
        const pos = y * width + x;
        if (visited[pos]) return;
        const idx = pos * 4;
        if (isNearWhite(idx)) {
          visited[pos] = 1;
          queue[tail++] = pos;
        }
      };

      for (let x = 0; x < width; x++) {
        enqueueIfBg(x, 0);
        enqueueIfBg(x, height - 1);
      }
      for (let y = 0; y < height; y++) {
        enqueueIfBg(0, y);
        enqueueIfBg(width - 1, y);
      }

      while (head < tail) {
        const pos = queue[head++];
        const x = pos % width;
        const y = (pos - x) / width;

        enqueueIfBg(x + 1, y);
        enqueueIfBg(x - 1, y);
        enqueueIfBg(x, y + 1);
        enqueueIfBg(x, y - 1);
      }

      let minX = width;
      let minY = height;
      let maxX = 0;
      let maxY = 0;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pos = y * width + x;
          const idx = pos * 4;
          if (visited[pos]) {
            data[idx + 3] = 0;
          } else {
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const brightness = (r + g + b) / 3;
            if (brightness > 210) {
              const hasBgNeighbor =
                (x > 0 && visited[pos - 1]) ||
                (x + 1 < width && visited[pos + 1]) ||
                (y > 0 && visited[pos - width]) ||
                (y + 1 < height && visited[pos + width]);
              if (hasBgNeighbor) {
                data[idx + 3] = Math.max(0, Math.min(255, Math.round((248 - brightness) * 5)));
              }
            }
            if (data[idx + 3] > 10) {
              if (x < minX) minX = x;
              if (y < minY) minY = y;
              if (x > maxX) maxX = x;
              if (y > maxY) maxY = y;
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      const pad = 8;
      minX = Math.max(0, minX - pad);
      minY = Math.max(0, minY - pad);
      maxX = Math.min(width - 1, maxX + pad);
      maxY = Math.min(height - 1, maxY + pad);

      const trimW = Math.max(1, maxX - minX + 1);
      const trimH = Math.max(1, maxY - minY + 1);

      const outCanvas = document.createElement('canvas');
      outCanvas.width = trimW;
      outCanvas.height = trimH;
      const outCtx = outCanvas.getContext('2d');
      outCtx.drawImage(canvas, minX, minY, trimW, trimH, 0, 0, trimW, trimH);

      const makeSquareIcon = (size, bgFill = null) => {
        const sq = document.createElement('canvas');
        sq.width = size;
        sq.height = size;
        const sctx = sq.getContext('2d');
        if (bgFill) {
          sctx.fillStyle = bgFill;
          sctx.fillRect(0, 0, size, size);
        }
        const margin = Math.round(size * 0.03);
        const avail = size - margin * 2;
        const fitScale = Math.min(avail / trimW, avail / trimH);
        const drawW = Math.round(trimW * fitScale);
        const drawH = Math.round(trimH * fitScale);
        const dx = Math.round((size - drawW) / 2);
        const dy = Math.round((size - drawH) / 2);
        sctx.drawImage(outCanvas, 0, 0, trimW, trimH, dx, dy, drawW, drawH);
        return sq.toDataURL('image/png').split(',')[1];
      };

      return {
        width: trimW,
        height: trimH,
        pngBase64: outCanvas.toDataURL('image/png').split(',')[1],
        webpBase64: outCanvas.toDataURL('image/webp', 0.92).split(',')[1],
        fav128Base64: makeSquareIcon(128),
        fav64Base64: makeSquareIcon(64),
        fav32Base64: makeSquareIcon(32),
        apple180Base64: makeSquareIcon(180, '#fffaf4'),
      };
    },
    { srcDataUrl: dataUrl, targetMaxDim: maxDim }
  );
}

function findBrowserExecutable() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return undefined;
}

async function main() {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const imagesDir = path.join(publicDir, 'images');

  const browser = await chromium.launch({
    headless: true,
    executablePath: findBrowserExecutable(),
  });
  const page = await browser.newPage();

  try {
    const poses = [
      {
        input: `${ARTIFACT_DIR}/.user_uploaded/media_1793026016409_01ad342a.png`,
        out: 'mascot-wave',
        isFaviconSource: true,
      },
      {
        input: `${ARTIFACT_DIR}/mascot_checklist_raw_1793026209704.jpg`,
        out: 'mascot-checklist',
        isFaviconSource: false,
      },
      {
        input: `${ARTIFACT_DIR}/mascot_action_raw_1793026228188.jpg`,
        out: 'mascot-action',
        isFaviconSource: false,
      },
      {
        input: `${ARTIFACT_DIR}/mascot_welcome_open_raw_v2_1793026264857.jpg`,
        out: 'mascot-welcome-open',
        isFaviconSource: false,
      },
    ];

    for (const pose of poses) {
      if (!fs.existsSync(pose.input)) {
        console.warn(`Missing input file: ${pose.input}`);
        continue;
      }
      console.log(`Processing ${pose.out} from ${path.basename(pose.input)}...`);
      const res = await processImageWithCanvas(page, pose.input, 640);

      fs.writeFileSync(
        path.join(imagesDir, `${pose.out}.png`),
        Buffer.from(res.pngBase64, 'base64')
      );
      fs.writeFileSync(
        path.join(imagesDir, `${pose.out}.webp`),
        Buffer.from(res.webpBase64, 'base64')
      );
      console.log(`  -> Saved ${pose.out}.png & .webp (${res.width}x${res.height})`);

      if (pose.isFaviconSource) {
        fs.writeFileSync(
          path.join(publicDir, 'favicon.png'),
          Buffer.from(res.fav64Base64, 'base64')
        );
        fs.writeFileSync(
          path.join(publicDir, 'favicon-32x32.png'),
          Buffer.from(res.fav32Base64, 'base64')
        );
        fs.writeFileSync(
          path.join(publicDir, 'apple-touch-icon.png'),
          Buffer.from(res.apple180Base64, 'base64')
        );

        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image width="128" height="128" href="data:image/png;base64,${res.fav128Base64}" />
</svg>\n`;
        fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
        console.log('  -> Saved favicon.png, favicon-32x32.png, apple-touch-icon.png, and favicon.svg!');
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
