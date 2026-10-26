import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');
const docsDir = path.resolve(rootDir, 'docs');
const ssrOutDir = path.resolve(rootDir, '.ssr-temp');

function escapeHtmlAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectPageMetadataAndMarkup(templateHtml, page, renderedMarkup) {
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

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);

  // Replace <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${safeDesc}" />`
  );

  // Replace <meta name="robots">
  html = html.replace(
    /<meta\s+name="robots"\s+content="[\s\S]*?"\s*\/>/,
    `<meta name="robots" content="${safeRobots}" />`
  );

  // Replace <link rel="canonical">
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/>/,
    `<link rel="canonical" href="${safeCanonical}" />`
  );

  // Replace Open Graph & Twitter tags
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

  // Replace Schema.org JSON-LD
  html = html.replace(
    /<script id="mojo-schema-ld" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="mojo-schema-ld" type="application/ld+json">\n${jsonLdString}\n    </script>`
  );

  // Inject rendered React HTML into #root
  html = html.replace('<div id="root"></div>', `<div id="root">${renderedMarkup}</div>`);

  return html;
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
    <lastmod>2026-10-25</lastmod>
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
  const {
    renderPageByPath,
    PUBLISHED_PAGES,
    NOT_FOUND_PAGE,
    LEGACY_REDIRECTS,
    VERIFIED_BUSINESS_PROFILE,
    KEYWORD_MAP,
    PAGE_BLUEPRINTS,
    VERIFIED_KEYWORD_DATABASE,
    CTR_OPTIMIZATION_SYSTEM,
    NORTH_ALABAMA_COMPETITORS,
    COMPETITOR_OPPORTUNITY_MATRIX,
    GBP_AUTHORITY_PROGRAM,
    COMPLIANT_REVIEW_SYSTEM,
    AI_SEARCH_VISIBILITY_BASELINE,
    MEASUREMENT_AND_MONTHLY_REVIEW_CADENCE,
  } = await import(`file://${serverEntryPath.replace(/\\/g, '/')}`);

  const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  // 1. Pre-render all 69 published indexable routes
  for (const pageDef of PUBLISHED_PAGES) {
    const { html: renderedMarkup, page } = renderPageByPath(pageDef.path);
    const fullHtml = injectPageMetadataAndMarkup(templateHtml, page, renderedMarkup);

    if (page.path === '/') {
      fs.writeFileSync(path.join(distDir, 'index.html'), fullHtml, 'utf-8');
    } else {
      const relativeSegments = page.path.replace(/^\/|\/$/g, '');
      const targetDir = path.join(distDir, relativeSegments);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), fullHtml, 'utf-8');
    }
    console.log(`Pre-rendered [${page.pageType}]: ${page.path}`);
  }

  // 2. Pre-render Custom 404 Page (dist/404.html & dist/404/index.html)
  const { html: notFoundMarkup } = renderPageByPath('/404/');
  const notFoundHtml = injectPageMetadataAndMarkup(templateHtml, NOT_FOUND_PAGE, notFoundMarkup);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');
  const dir404 = path.join(distDir, '404');
  fs.mkdirSync(dir404, { recursive: true });
  fs.writeFileSync(path.join(dir404, 'index.html'), notFoundHtml, 'utf-8');
  console.log('Pre-rendered [not_found]: dist/404.html');

  // 3. Generate dynamic sitemap.xml in both public/ and dist/
  const sitemapXml = generateSitemapXml(PUBLISHED_PAGES);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`Generated sitemap.xml with ${PUBLISHED_PAGES.length} indexable routes.`);

  // 4. Generate Cloudflare Pages / Netlify _redirects for legacy route preservation
  const redirectLines = Object.entries(LEGACY_REDIRECTS || {}).flatMap(([fromPath, toPath]) => {
    const cleanFrom = fromPath.endsWith('/') && fromPath !== '/' ? fromPath.slice(0, -1) : fromPath;
    return [
      `${cleanFrom} ${toPath} 301`,
      `${cleanFrom}/ ${toPath} 301`,
    ];
  });
  const uniqueRedirectLines = [...new Set(redirectLines)];
  const redirectsContent = `# Legacy route preservation & location-isolated 301 redirects for mojocleaningservice.com\n${uniqueRedirectLines.join('\n')}\n`;
  fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent, 'utf-8');
  fs.writeFileSync(path.join(publicDir, '_redirects'), redirectsContent, 'utf-8');

  // Also write static HTML redirect stubs in dist/ for legacy paths so local preview servers redirect seamlessly
  const publishedPathSet = new Set(PUBLISHED_PAGES.map((p) => p.path));
  for (const [fromPath, toPath] of Object.entries(LEGACY_REDIRECTS || {})) {
    const normalizedFrom = fromPath.endsWith('/') ? fromPath : `${fromPath}/`;
    if (publishedPathSet.has(normalizedFrom)) continue;
    const relSegs = normalizedFrom.replace(/^\/|\/$/g, '');
    if (!relSegs) continue;
    const stubDir = path.join(distDir, relSegs);
    fs.mkdirSync(stubDir, { recursive: true });
    const stubHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"/><title>Redirecting to ${toPath}</title><meta http-equiv="refresh" content="0; url=${toPath}"/><meta name="robots" content="noindex, nofollow"/><link rel="canonical" href="https://mojocleaningservice.com${toPath}"/><script>window.location.replace(${JSON.stringify(toPath)});</script></head><body><p>Redirecting to <a href="${toPath}">${toPath}</a>...</p></body></html>`;
    fs.writeFileSync(path.join(stubDir, 'index.html'), stubHtml, 'utf-8');
  }

  // 5. Export structured JSON documentation artifacts in docs/
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(
    path.join(docsDir, 'business-profile.json'),
    JSON.stringify(VERIFIED_BUSINESS_PROFILE, null, 2),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(docsDir, 'keyword-map.json'),
    JSON.stringify(KEYWORD_MAP, null, 2),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(docsDir, 'verified-keyword-database.json'),
    JSON.stringify(VERIFIED_KEYWORD_DATABASE, null, 2),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(docsDir, 'ctr-optimization-system.json'),
    JSON.stringify(CTR_OPTIMIZATION_SYSTEM, null, 2),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(docsDir, 'page-blueprints.json'),
    JSON.stringify(PAGE_BLUEPRINTS, null, 2),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(docsDir, 'competitive-intelligence-matrix.json'),
    JSON.stringify(
      {
        generatedAt: '2026-10-25',
        competitorsObserved: NORTH_ALABAMA_COMPETITORS,
        opportunityMatrix: COMPETITOR_OPPORTUNITY_MATRIX,
      },
      null,
      2
    ),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(docsDir, 'gbp-authority-program.json'),
    JSON.stringify(GBP_AUTHORITY_PROGRAM, null, 2),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(docsDir, 'review-reputation-playbook.json'),
    JSON.stringify(COMPLIANT_REVIEW_SYSTEM, null, 2),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(docsDir, 'ai-search-visibility-baseline.json'),
    JSON.stringify(
      {
        baselineObservations: AI_SEARCH_VISIBILITY_BASELINE,
        measurementAndMonthlyReviewCadence: MEASUREMENT_AND_MONTHLY_REVIEW_CADENCE,
      },
      null,
      2
    ),
    'utf-8'
  );
  console.log(
    'Exported docs/business-profile.json, keyword-map.json, competitive-intelligence-matrix.json, gbp-authority-program.json, review-reputation-playbook.json, and ai-search-visibility-baseline.json.'
  );

  // Clean up temporary SSR build folder
  fs.rmSync(ssrOutDir, { recursive: true, force: true });
  console.log(`Static pre-rendering complete (${PUBLISHED_PAGES.length} routes + 404.html).`);
}

runPrerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
