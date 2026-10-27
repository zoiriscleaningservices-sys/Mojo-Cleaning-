import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');
const ssrOutDir = path.resolve(rootDir, '.ssr-temp');

const SITE_ORIGIN = 'https://mojocleaningservice.com';

function escapeHtmlAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Rewrites root-relative asset references (/assets/, /images/, /favicon*, /apple-touch-icon*, /mojo-logo.png)
 * to depth-relative paths (./ or ../ or ../../) so the pre-rendered HTML works both at root (/)
 * and under a GitHub Pages repository subpath (/Mojo-Cleaning-/).
 */
function rewriteHtmlAssetsRelativeToDepth(html, depth) {
  const prefix = depth <= 0 ? './' : '../'.repeat(depth);
  return html.replace(
    /\b(href|src|srcset)="\/(assets\/|images\/|favicon|apple-touch-icon|mojo-logo\.png)/gi,
    (_, attr, rest) => `${attr}="${prefix}${rest}`
  );
}

function injectPageMetadataAndMarkup(templateHtml, page, renderedMarkup, depth = 0) {
  const safeTitle = escapeHtmlAttr(page.title);
  const safeDesc = escapeHtmlAttr(page.metaDescription);
  const safeRobots = escapeHtmlAttr(page.robots);
  const safeCanonical = escapeHtmlAttr(page.canonicalUrl);
  const schemaObj =
    page.jsonLd && page.jsonLd[0]
      ? page.jsonLd[0]
      : null;

  let html = templateHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+name="robots"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="robots" content="${safeRobots}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/>/,
    `<link rel="canonical" href="${safeCanonical}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/,
    `<meta property="og:url" content="${safeCanonical}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );

  if (schemaObj) {
    const jsonLdString = JSON.stringify(schemaObj, null, 2);
    html = html.replace(
      /<script id="mojo-schema-ld" type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="mojo-schema-ld" type="application/ld+json">\n${jsonLdString}\n    </script>`
    );
  } else {
    html = html.replace(
      /<script id="mojo-schema-ld" type="application\/ld\+json">[\s\S]*?<\/script>/,
      ''
    );
  }

  html = html.replace('<div id="root"></div>', `<div id="root">${renderedMarkup}</div>`);

  return rewriteHtmlAssetsRelativeToDepth(html, depth);
}

/**
 * PHASE 7 — SITEMAP GENERATOR (Strictly <loc> and registry <lastmod>, no artificial priority/changefreq)
 */
function generateUrlsetXml(pages) {
  const urlsXml = pages
    .map((p) => {
      const lastmod = p.lastModified || '2026-10-26';
      return `  <url>
    <loc>${p.canonicalUrl}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;
}

function generateSitemapIndexXml(sitemapFiles) {
  const entries = sitemapFiles
    .map(
      (item) => `  <sitemap>
    <loc>${SITE_ORIGIN}/${item.filename}</loc>
    <lastmod>${item.lastmod}</lastmod>
  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>
`;
}

function copyRecursiveSync(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursiveSync(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

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
  const { renderPageByPath, PUBLISHED_PAGES, NOT_FOUND_PAGE, LEGACY_REDIRECTS } = await import(
    `file://${serverEntryPath.replace(/\\/g, '/')}`
  );

  const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  // 1. Pre-render all published routes
  for (const pageDef of PUBLISHED_PAGES) {
    const { html: renderedMarkup, page } = renderPageByPath(pageDef.path);

    if (page.path === '/') {
      const fullHtml = injectPageMetadataAndMarkup(templateHtml, page, renderedMarkup, 0);
      fs.writeFileSync(path.join(distDir, 'index.html'), fullHtml, 'utf-8');
    } else {
      const relativeSegments = page.path.replace(/^\/|\/$/g, '');
      const depth = relativeSegments.split('/').filter(Boolean).length;
      const fullHtml = injectPageMetadataAndMarkup(templateHtml, page, renderedMarkup, depth);
      const targetDir = path.join(distDir, relativeSegments);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), fullHtml, 'utf-8');
    }
    console.log(`Pre-rendered [${page.pageType}]: ${page.path}`);
  }

  // 2. Pre-render Custom 404 Page (dist/404.html & dist/404/index.html)
  const { html: notFoundMarkup } = renderPageByPath('/404/');
  const notFoundHtmlRoot = injectPageMetadataAndMarkup(
    templateHtml,
    NOT_FOUND_PAGE,
    notFoundMarkup,
    0
  );
  const notFoundHtmlSub = injectPageMetadataAndMarkup(
    templateHtml,
    NOT_FOUND_PAGE,
    notFoundMarkup,
    1
  );
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtmlRoot, 'utf-8');
  const dir404 = path.join(distDir, '404');
  fs.mkdirSync(dir404, { recursive: true });
  fs.writeFileSync(path.join(dir404, 'index.html'), notFoundHtmlSub, 'utf-8');
  console.log('Pre-rendered [not_found]: dist/404.html');

  // 3. Generate Segmented XML Sitemaps + Sitemap Index from Authoritative Page Registry
  const indexablePages = PUBLISHED_PAGES.filter(
    (p) =>
      p.publicationStatus === 'published' &&
      p.sitemapEligibility === true &&
      p.robots.startsWith('index')
  );

  const sitemapPartitions = [
    'sitemap-core.xml',
    'sitemap-locations.xml',
    'sitemap-services.xml',
    'sitemap-service-locations.xml',
    'sitemap-guides.xml',
  ];

  const generatedChildSitemaps = [];

  for (const filename of sitemapPartitions) {
    const pagesForFile = indexablePages.filter((p) => p.sitemapFile === filename);
    const xml = generateUrlsetXml(pagesForFile);
    fs.writeFileSync(path.join(distDir, filename), xml, 'utf-8');
    fs.writeFileSync(path.join(publicDir, filename), xml, 'utf-8');
    const latestLastMod =
      pagesForFile
        .map((p) => p.lastModified || '2026-10-26')
        .sort()
        .reverse()[0] || '2026-10-26';
    generatedChildSitemaps.push({
      filename,
      count: pagesForFile.length,
      lastmod: latestLastMod,
    });
  }

  const sitemapIndexXml = generateSitemapIndexXml(generatedChildSitemaps);
  fs.writeFileSync(path.join(distDir, 'sitemap_index.xml'), sitemapIndexXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), sitemapIndexXml, 'utf-8');

  // Also write combined sitemap.xml for backward compatibility
  const combinedSitemapXml = generateUrlsetXml(indexablePages);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), combinedSitemapXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), combinedSitemapXml, 'utf-8');
  console.log(
    `Generated sitemap_index.xml + 5 child sitemaps (${indexablePages.length} canonical indexable URLs).`
  );

  // 4. Generate _redirects for legacy route preservation
  const redirectLines = Object.entries(LEGACY_REDIRECTS || {}).flatMap(([fromPath, toPath]) => {
    const cleanFrom = fromPath.endsWith('/') && fromPath !== '/' ? fromPath.slice(0, -1) : fromPath;
    return [`${cleanFrom} ${toPath} 301`, `${cleanFrom}/ ${toPath} 301`];
  });
  const uniqueRedirectLines = [...new Set(redirectLines)];
  const redirectsContent = `# Legacy route preservation & location-isolated 301 redirects for mojocleaningservice.com\n${uniqueRedirectLines.join('\n')}\n`;
  fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent, 'utf-8');
  fs.writeFileSync(path.join(publicDir, '_redirects'), redirectsContent, 'utf-8');

  // 5. Write .nojekyll and CNAME so GitHub Pages serves all folders and custom apex domain without redirects
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf-8');
  fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf-8');
  fs.writeFileSync(path.join(distDir, 'CNAME'), 'mojocleaningservice.com\n', 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'CNAME'), 'mojocleaningservice.com\n', 'utf-8');
  fs.writeFileSync(path.join(rootDir, 'CNAME'), 'mojocleaningservice.com\n', 'utf-8');

  // 6. Sync compiled static site to repository root so GitHub Pages (main branch / root) serves live immediately
  const rootStaticDirsToClean = [
    'assets',
    'images',
    'huntsville-al',
    'madison-al',
    'hampton-cove-al',
    'owens-cross-roads-al',
    'athens-al',
    'locations',
    'guides',
    'seo-dashboard',
    'privacy-policy',
    'terms',
    '404',
  ];
  for (const dirName of rootStaticDirsToClean) {
    fs.rmSync(path.join(rootDir, dirName), { recursive: true, force: true });
  }

  for (const entry of fs.readdirSync(distDir)) {
    copyRecursiveSync(path.join(distDir, entry), path.join(rootDir, entry));
  }

  // Clean up temporary SSR build folder
  fs.rmSync(ssrOutDir, { recursive: true, force: true });
  console.log(
    `Static pre-rendering complete (${PUBLISHED_PAGES.length} published routes + 404.html + GitHub Pages root sync).`
  );
}

runPrerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
