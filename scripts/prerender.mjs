import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');
const ssrOutDir = path.resolve(rootDir, '.ssr-temp');

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
      : { '@context': 'https://schema.org', '@graph': [] };
  const jsonLdString = JSON.stringify(schemaObj, null, 2);

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
  html = html.replace(
    /<script id="mojo-schema-ld" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="mojo-schema-ld" type="application/ld+json">\n${jsonLdString}\n    </script>`
  );

  html = html.replace('<div id="root"></div>', `<div id="root">${renderedMarkup}</div>`);

  return rewriteHtmlAssetsRelativeToDepth(html, depth);
}

function generateSitemapXml(publishedPages) {
  const indexablePages = publishedPages.filter(
    (p) => p.publicationStatus === 'published' && p.robots.startsWith('index')
  );

  const urlsXml = indexablePages
    .map((p) => {
      const priority =
        p.path === '/' || p.pageType === 'location_home'
          ? '1.0'
          : p.pageType === 'locations_directory' ||
              p.pageType === 'location_services' ||
              p.pageType === 'location_quote'
            ? '0.9'
            : p.pageType === 'location_service_detail' || p.pageType === 'location_checklist'
              ? '0.85'
              : p.pageType === 'location_about' ||
                  p.pageType === 'location_reviews' ||
                  p.pageType === 'location_faqs' ||
                  p.pageType === 'location_contact'
                ? '0.8'
                : '0.4';

      const changefreq = p.pageType === 'legal' ? 'yearly' : 'weekly';

      return `  <url>
    <loc>${p.canonicalUrl}</loc>
    <lastmod>2026-10-26</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
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

  // 1. Pre-render all 69 published indexable routes
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
  const notFoundHtmlRoot = injectPageMetadataAndMarkup(templateHtml, NOT_FOUND_PAGE, notFoundMarkup, 0);
  const notFoundHtmlSub = injectPageMetadataAndMarkup(templateHtml, NOT_FOUND_PAGE, notFoundMarkup, 1);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtmlRoot, 'utf-8');
  const dir404 = path.join(distDir, '404');
  fs.mkdirSync(dir404, { recursive: true });
  fs.writeFileSync(path.join(dir404, 'index.html'), notFoundHtmlSub, 'utf-8');
  console.log('Pre-rendered [not_found]: dist/404.html');

  // 3. Generate dynamic sitemap.xml in both public/ and dist/
  const sitemapXml = generateSitemapXml(PUBLISHED_PAGES);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');

  // 4. Generate _redirects for legacy route preservation
  const redirectLines = Object.entries(LEGACY_REDIRECTS || {}).flatMap(([fromPath, toPath]) => {
    const cleanFrom = fromPath.endsWith('/') && fromPath !== '/' ? fromPath.slice(0, -1) : fromPath;
    return [`${cleanFrom} ${toPath} 301`, `${cleanFrom}/ ${toPath} 301`];
  });
  const uniqueRedirectLines = [...new Set(redirectLines)];
  const redirectsContent = `# Legacy route preservation & location-isolated 301 redirects for mojocleaningservice.com\n${uniqueRedirectLines.join('\n')}\n`;
  fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent, 'utf-8');
  fs.writeFileSync(path.join(publicDir, '_redirects'), redirectsContent, 'utf-8');

  // 5. Write .nojekyll so GitHub Pages serves all folders and assets without Jekyll filtering
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf-8');
  fs.writeFileSync(path.join(rootDir, '.nojekyll'), '', 'utf-8');

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
  console.log(`Static pre-rendering complete (${PUBLISHED_PAGES.length} routes + GitHub Pages root sync).`);
}

runPrerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
