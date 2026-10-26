import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrOutDir = path.resolve(rootDir, '.ssr-temp');

async function runPrerender() {
  console.log('Building SSR bundle for static HTML pre-rendering...');
  await build({
    root: rootDir,
    logLevel: 'warn',
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: ssrOutDir,
      emptyOutDir: true,
    },
  });

  const serverEntryPath = path.join(ssrOutDir, 'entry-server.js');
  const { renderPage } = await import(`file://${serverEntryPath.replace(/\\/g, '/')}`);

  const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  // 1. Pre-render Home (/)
  const homeMarkup = renderPage('home');
  const homeHtml = templateHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${homeMarkup}</div>`
  );
  fs.writeFileSync(path.join(distDir, 'index.html'), homeHtml, 'utf-8');
  console.log('Pre-rendered: dist/index.html');

  // 2. Pre-render /privacy-policy
  const privacyMarkup = renderPage('privacy-policy');
  const privacyHtml = templateHtml
    .replace(
      '<title>Mojo Cleaning | House Cleaning in Huntsville &amp; Madison, AL</title>',
      '<title>Privacy Policy | Mojo Cleaning Huntsville &amp; Madison, AL</title>'
    )
    .replace(
      '<link rel="canonical" href="https://mojocleaningservice.com/" />',
      '<link rel="canonical" href="https://mojocleaningservice.com/privacy-policy" />'
    )
    .replace('<div id="root"></div>', `<div id="root">${privacyMarkup}</div>`);
  const privacyDir = path.join(distDir, 'privacy-policy');
  fs.mkdirSync(privacyDir, { recursive: true });
  fs.writeFileSync(path.join(privacyDir, 'index.html'), privacyHtml, 'utf-8');
  console.log('Pre-rendered: dist/privacy-policy/index.html');

  // 3. Pre-render /terms-and-conditions
  const termsMarkup = renderPage('terms-and-conditions');
  const termsHtml = templateHtml
    .replace(
      '<title>Mojo Cleaning | House Cleaning in Huntsville &amp; Madison, AL</title>',
      '<title>Terms &amp; Conditions | Mojo Cleaning Huntsville &amp; Madison, AL</title>'
    )
    .replace(
      '<link rel="canonical" href="https://mojocleaningservice.com/" />',
      '<link rel="canonical" href="https://mojocleaningservice.com/terms-and-conditions" />'
    )
    .replace('<div id="root"></div>', `<div id="root">${termsMarkup}</div>`);
  const termsDir = path.join(distDir, 'terms-and-conditions');
  fs.mkdirSync(termsDir, { recursive: true });
  fs.writeFileSync(path.join(termsDir, 'index.html'), termsHtml, 'utf-8');
  console.log('Pre-rendered: dist/terms-and-conditions/index.html');

  // Clean up temporary SSR build folder
  fs.rmSync(ssrOutDir, { recursive: true, force: true });
  console.log('Static pre-rendering complete.');
}

runPrerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
