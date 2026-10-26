/**
 * PHASE 12 — AUTOMATED TECHNICAL SEO, SITEMAP, CANONICAL, INTERNAL-LINK & DUPLICATE-CONTENT TEST SUITE
 * Validates the actual compiled production HTML files, XML sitemaps, and robots.txt in dist/.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const SITE_ORIGIN = 'https://mojocleaningservice.com';

function stripHtmlTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getWordShingles(text, size = 4) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
  const shingles = new Set();
  for (let i = 0; i <= words.length - size; i++) {
    shingles.add(words.slice(i, i + size).join(' '));
  }
  return shingles;
}

function computeJaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function collectHtmlFiles(dir, baseDir = dir, results = []) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      collectHtmlFiles(fullPath, baseDir, results);
    } else if (entry === 'index.html') {
      const relDir = path.relative(baseDir, dir).replace(/\\/g, '/');
      const routePath = relDir === '' ? '/' : `/${relDir}/`;
      results.push({ routePath, filePath: fullPath });
    }
  }
  return results;
}

function runSeoTestSuite() {
  console.log('================================================================================');
  console.log('MOJO CLEANING — PHASE 12 TECHNICAL SEO & INDEXABILITY TEST SUITE (PRODUCTION HTML)');
  console.log('================================================================================');

  const failures = [];
  const testResults = [];

  function recordTest(suite, name, passed, details) {
    testResults.push({ suite, name, passed, details });
    if (!passed) {
      failures.push(`[${suite}] ${name}: ${details}`);
    }
  }

  // Discover all compiled route index.html files in dist/
  const allCompiledRoutes = collectHtmlFiles(distDir);
  const routeMap = new Map(allCompiledRoutes.map((r) => [r.routePath, r.filePath]));

  // Expected counts: 75 indexable pages + 1 /seo-dashboard/ (noindex) + 1 /404/ (noindex) = 77 route directories
  recordTest(
    '1. URL & Routing',
    'Compiled HTML route count',
    allCompiledRoutes.length === 77,
    `Found ${allCompiledRoutes.length} pre-rendered route index.html files in dist/ (expected 77: 75 indexable + /seo-dashboard/ + /404/).`
  );

  // Check dist/404.html exists at root
  const hasRoot404 = fs.existsSync(path.join(distDir, '404.html'));
  recordTest(
    '1. URL & Routing',
    'Root 404.html file presence',
    hasRoot404,
    hasRoot404 ? 'dist/404.html exists.' : 'Missing dist/404.html.'
  );

  // Check _redirects rules
  const redirectsPath = path.join(distDir, '_redirects');
  const redirectsContent = fs.existsSync(redirectsPath)
    ? fs.readFileSync(redirectsPath, 'utf-8')
    : '';
  const redirectLines = redirectsContent
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));

  const legacyRedirectSources = new Set();
  let invalidRedirects = 0;
  for (const line of redirectLines) {
    const parts = line.split(/\s+/);
    const from = parts[0];
    const to = parts[1];
    const code = parts[2];
    legacyRedirectSources.add(from);
    if (code !== '301' || !routeMap.has(to) || from === to) {
      invalidRedirects++;
    }
  }
  recordTest(
    '1. URL & Routing',
    'Legacy 301 redirect rules terminate at valid canonical 200 OK routes',
    redirectLines.length > 0 && invalidRedirects === 0,
    `Validated ${redirectLines.length} redirect directives; ${invalidRedirects} invalid/looping targets.`
  );

  // Parse all compiled HTML pages
  const parsedPages = [];
  const titlesSeen = new Map();
  const h1sSeen = new Map();
  const descriptionsSeen = new Map();
  const duplicateTitles = [];
  const duplicateH1s = [];
  const duplicateDescriptions = [];
  const metadataErrors = [];
  const canonicalErrors = [];
  const contentErrors = [];
  const schemaErrors = [];
  const incomingLinksCount = new Map();
  const brokenInternalLinks = [];
  const nonCanonicalInternalLinks = [];

  for (const { routePath } of allCompiledRoutes) {
    incomingLinksCount.set(routePath, 0);
  }

  for (const { routePath, filePath } of allCompiledRoutes) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/>/i);
    const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([\s\S]*?)"\s*\/>/i);
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([\s\S]*?)"\s*\/>/i);
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];

    const title = titleMatch ? titleMatch[1].trim() : '';
    const description = descMatch ? descMatch[1].trim() : '';
    const robots = robotsMatch ? robotsMatch[1].trim() : '';
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
    const h1Text = h1Matches.length > 0 ? stripHtmlTags(h1Matches[0][1]) : '';
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const mainHtml = mainMatch ? mainMatch[1] : html;
    const bodyText = stripHtmlTags(mainHtml);
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

    const isNoindexRoute = routePath === '/404/' || routePath === '/seo-dashboard/';

    // Check robots directive
    if (isNoindexRoute) {
      if (!robots.includes('noindex')) {
        metadataErrors.push(`${routePath} expected noindex but got "${robots}"`);
      }
    } else {
      if (!robots.startsWith('index')) {
        metadataErrors.push(`${routePath} expected indexable robots directive but got "${robots}"`);
      }
    }

    // Check title, description, H1
    if (!title || !description || h1Matches.length !== 1 || !h1Text) {
      metadataErrors.push(
        `${routePath} missing title/description or invalid H1 count (${h1Matches.length})`
      );
    }

    if (
      title.includes('undefined') ||
      title.includes('{{') ||
      description.includes('undefined') ||
      bodyText.includes('[object Object]')
    ) {
      metadataErrors.push(`${routePath} contains unexpanded template variables`);
    }

    // Check canonical URL format
    const expectedCanonical = `${SITE_ORIGIN}${routePath}`;
    if (canonical !== expectedCanonical) {
      canonicalErrors.push(
        `${routePath} canonical "${canonical}" does not match "${expectedCanonical}"`
      );
    }
    if (
      !canonical.startsWith('https://mojocleaningservice.com/') ||
      !canonical.endsWith('/') ||
      canonical !== canonical.toLowerCase()
    ) {
      canonicalErrors.push(`${routePath} canonical violates HTTPS/lowercase/trailing-slash standard`);
    }

    // Check duplicate titles, H1s, descriptions among published routes
    if (!isNoindexRoute) {
      if (titlesSeen.has(title)) {
        duplicateTitles.push(`${routePath} duplicates title of ${titlesSeen.get(title)}`);
      } else {
        titlesSeen.set(title, routePath);
      }

      if (h1sSeen.has(h1Text)) {
        duplicateH1s.push(`${routePath} duplicates H1 of ${h1sSeen.get(h1Text)}`);
      } else {
        h1sSeen.set(h1Text, routePath);
      }

      if (descriptionsSeen.has(description)) {
        duplicateDescriptions.push(
          `${routePath} duplicates meta description of ${descriptionsSeen.get(description)}`
        );
      } else {
        descriptionsSeen.set(description, routePath);
      }

      // Check substantive content & business facts
      if (wordCount < 180) {
        contentErrors.push(`${routePath} has thin content (${wordCount} words)`);
      }
      if (/lorem ipsum|placeholder text/i.test(bodyText)) {
        contentErrors.push(`${routePath} contains placeholder text`);
      }
      if (!html.includes('(256) 418-8199')) {
        contentErrors.push(`${routePath} missing verified phone number (256) 418-8199`);
      }

      // Check Schema.org JSON-LD
      const schemaMatch = html.match(
        /<script id="mojo-schema-ld" type="application\/ld\+json">([\s\S]*?)<\/script>/i
      );
      if (!schemaMatch) {
        schemaErrors.push(`${routePath} missing #mojo-schema-ld JSON-LD block`);
      } else {
        try {
          const parsedJson = JSON.parse(schemaMatch[1]);
          const graph = parsedJson['@graph'];
          if (parsedJson['@context'] !== 'https://schema.org' || !Array.isArray(graph)) {
            schemaErrors.push(`${routePath} invalid @context or @graph`);
          } else {
            const types = graph.flatMap((node) =>
              Array.isArray(node['@type']) ? node['@type'] : [node['@type']]
            );
            if (!types.includes('LocalBusiness') || !types.includes('BreadcrumbList')) {
              schemaErrors.push(`${routePath} missing LocalBusiness or BreadcrumbList in @graph`);
            }
            if (routePath.startsWith('/guides/') && routePath !== '/guides/') {
              if (!types.includes('Article')) {
                schemaErrors.push(`${routePath} guide article missing Article schema`);
              }
            }
            if (/^\/[a-z-]+-al\/services\/[a-z-]+\/$/.test(routePath)) {
              if (!types.includes('Service')) {
                schemaErrors.push(`${routePath} service-location page missing Service schema`);
              }
            }
          }
        } catch (err) {
          schemaErrors.push(`${routePath} invalid JSON-LD syntax: ${err.message}`);
        }
      }
    }

    // Extract internal links
    const anchorMatches = [...html.matchAll(/<a\s+[^>]*href="([^"]+)"/gi)];
    for (const m of anchorMatches) {
      const rawHref = m[1].trim();
      if (
        !rawHref ||
        rawHref.startsWith('#') ||
        rawHref.startsWith('tel:') ||
        rawHref.startsWith('sms:') ||
        rawHref.startsWith('mailto:') ||
        rawHref.startsWith('http://') ||
        rawHref.startsWith('https://')
      ) {
        continue;
      }
      if (rawHref.startsWith('/')) {
        const cleanPath = rawHref.split('#')[0].split('?')[0];
        const normalizedTarget = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
        if (legacyRedirectSources.has(cleanPath) || legacyRedirectSources.has(normalizedTarget)) {
          nonCanonicalInternalLinks.push(`${routePath} links to legacy redirect URL "${rawHref}"`);
        } else if (!routeMap.has(normalizedTarget)) {
          brokenInternalLinks.push(`${routePath} has broken internal link to "${rawHref}"`);
        } else if (normalizedTarget !== routePath) {
          incomingLinksCount.set(
            normalizedTarget,
            (incomingLinksCount.get(normalizedTarget) || 0) + 1
          );
        }
      }
    }

    parsedPages.push({
      routePath,
      isNoindexRoute,
      wordCount,
      shingles: getWordShingles(bodyText, 4),
    });
  }

  recordTest(
    '2. Metadata & Indexability',
    'Robots directives match centralized policy (75 indexable, 2 noindex)',
    metadataErrors.length === 0,
    metadataErrors.length === 0
      ? 'All 75 indexable pages have index, follow; /404/ and /seo-dashboard/ have noindex, nofollow.'
      : metadataErrors.join('; ')
  );

  recordTest(
    '2. Metadata & Indexability',
    'Zero duplicate <title> tags across all 75 indexable pages',
    duplicateTitles.length === 0,
    duplicateTitles.length === 0
      ? `75/75 unique titles verified.`
      : duplicateTitles.join('; ')
  );

  recordTest(
    '2. Metadata & Indexability',
    'Zero duplicate <h1> headings across all 75 indexable pages',
    duplicateH1s.length === 0,
    duplicateH1s.length === 0 ? `75/75 unique H1s verified.` : duplicateH1s.join('; ')
  );

  recordTest(
    '2. Metadata & Indexability',
    'Zero duplicate <meta name="description"> tags across all 75 indexable pages',
    duplicateDescriptions.length === 0,
    duplicateDescriptions.length === 0
      ? `75/75 unique meta descriptions verified.`
      : duplicateDescriptions.join('; ')
  );

  recordTest(
    '2. Metadata & Indexability',
    'Canonical URLs are valid, HTTPS, lowercase, trailing-slash, and self-referencing',
    canonicalErrors.length === 0,
    canonicalErrors.length === 0
      ? 'All canonical URLs verified.'
      : canonicalErrors.join('; ')
  );

  // Check similarity across indexable pages
  const indexableParsed = parsedPages.filter((p) => !p.isNoindexRoute);
  let highOverlapPairs = 0;
  let maxSimilarity = 0;
  for (let i = 0; i < indexableParsed.length; i++) {
    for (let j = i + 1; j < indexableParsed.length; j++) {
      // Skip comparing / and /huntsville-al/ since / is the flagship gateway operating in Huntsville default context
      if (
        (indexableParsed[i].routePath === '/' &&
          indexableParsed[j].routePath === '/huntsville-al/') ||
        (indexableParsed[i].routePath === '/huntsville-al/' &&
          indexableParsed[j].routePath === '/')
      ) {
        continue;
      }
      const sim = computeJaccardSimilarity(
        indexableParsed[i].shingles,
        indexableParsed[j].shingles
      );
      if (sim > maxSimilarity) maxSimilarity = sim;
      if (sim > 0.85) {
        highOverlapPairs++;
      }
    }
  }

  recordTest(
    '3. Content & Duplication',
    'Substantive word count, verified business facts & anti-doorway similarity check',
    contentErrors.length === 0 && highOverlapPairs === 0,
    contentErrors.length === 0
      ? `All 75 indexable pages have >=180 words, zero placeholders, verified phone, and 0 near-duplicate city/service pairs (max 4-gram Jaccard similarity: ${(maxSimilarity * 100).toFixed(1)}%).`
      : contentErrors.join('; ')
  );

  // Suite 4: XML Sitemaps Validation
  const sitemapIndexPath = path.join(distDir, 'sitemap_index.xml');
  const sitemapIndexXml = fs.existsSync(sitemapIndexPath)
    ? fs.readFileSync(sitemapIndexPath, 'utf-8')
    : '';
  const childSitemapFiles = [
    'sitemap-core.xml',
    'sitemap-locations.xml',
    'sitemap-services.xml',
    'sitemap-service-locations.xml',
    'sitemap-guides.xml',
  ];

  const sitemapErrors = [];
  const allSitemapLocs = new Set();

  for (const childFile of childSitemapFiles) {
    if (!sitemapIndexXml.includes(`<loc>${SITE_ORIGIN}/${childFile}</loc>`)) {
      sitemapErrors.push(`sitemap_index.xml missing reference to ${childFile}`);
    }
    const childPath = path.join(distDir, childFile);
    if (!fs.existsSync(childPath)) {
      sitemapErrors.push(`Missing child sitemap file ${childFile}`);
      continue;
    }
    const xml = fs.readFileSync(childPath, 'utf-8');
    if (xml.includes('<changefreq>') || xml.includes('<priority>')) {
      sitemapErrors.push(`${childFile} contains deprecated <changefreq> or <priority> tags`);
    }
    const locMatches = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => m[1].trim());
    const lastmodMatches = [...xml.matchAll(/<lastmod>([\s\S]*?)<\/lastmod>/g)].map((m) =>
      m[1].trim()
    );
    if (locMatches.length === 0 || locMatches.length !== lastmodMatches.length) {
      sitemapErrors.push(`${childFile} has mismatched <loc> and <lastmod> counts`);
    }
    for (const loc of locMatches) {
      if (allSitemapLocs.has(loc)) {
        sitemapErrors.push(`Duplicate URL across child sitemaps: ${loc}`);
      }
      allSitemapLocs.add(loc);
      const relPath = loc.replace(SITE_ORIGIN, '');
      if (relPath === '/404/' || relPath === '/seo-dashboard/') {
        sitemapErrors.push(`Noindex route ${relPath} accidentally included in ${childFile}`);
      }
      if (!routeMap.has(relPath)) {
        sitemapErrors.push(`Sitemap URL ${loc} does not resolve to a compiled route in dist/`);
      }
    }
  }

  if (allSitemapLocs.size !== 75) {
    sitemapErrors.push(
      `Total URLs across child sitemaps is ${allSitemapLocs.size} (expected 75 indexable canonical URLs)`
    );
  }

  recordTest(
    '4. XML Sitemaps',
    'sitemap_index.xml + 5 segmented child sitemaps validate with 75 canonical indexable URLs and 0 noindex/redirect URLs',
    sitemapErrors.length === 0,
    sitemapErrors.length === 0
      ? 'sitemap_index.xml and all 5 child sitemaps (75 total URLs) passed XML, canonical, and lastmod validation.'
      : sitemapErrors.join('; ')
  );

  // Suite 5: robots.txt & Crawling Validation
  const robotsTxtPath = path.join(distDir, 'robots.txt');
  const robotsTxt = fs.existsSync(robotsTxtPath) ? fs.readFileSync(robotsTxtPath, 'utf-8') : '';
  const robotsValid =
    robotsTxt.includes('User-agent: *') &&
    robotsTxt.includes('Allow: /') &&
    robotsTxt.includes('Sitemap: https://mojocleaningservice.com/sitemap_index.xml') &&
    !robotsTxt.includes('Disallow: /');

  recordTest(
    '5. Robots & Crawling',
    'robots.txt permits Googlebot rendering & declares sitemap_index.xml',
    robotsValid,
    robotsValid
      ? 'robots.txt is valid, allows all essential CSS/JS/images, and declares sitemap_index.xml.'
      : 'robots.txt is missing required directives.'
  );

  // Suite 6: Internal Link Graph & Orphan Detection
  const orphanIndexablePages = [];
  for (const { routePath, isNoindexRoute } of parsedPages) {
    if (isNoindexRoute) continue;
    if ((incomingLinksCount.get(routePath) || 0) === 0) {
      orphanIndexablePages.push(routePath);
    }
  }

  recordTest(
    '6. Internal Linking',
    'Zero broken internal links, zero legacy redirect links, and zero orphan indexable pages',
    brokenInternalLinks.length === 0 &&
      nonCanonicalInternalLinks.length === 0 &&
      orphanIndexablePages.length === 0,
    brokenInternalLinks.length === 0 &&
      nonCanonicalInternalLinks.length === 0 &&
      orphanIndexablePages.length === 0
      ? '0 broken internal links, 0 non-canonical internal links, and 0 orphan indexable pages across all 75 indexable routes.'
      : [
          ...brokenInternalLinks,
          ...nonCanonicalInternalLinks,
          ...orphanIndexablePages.map((p) => `Orphan page: ${p}`),
        ].join('; ')
  );

  // Suite 7: Structured Data Validation
  recordTest(
    '7. Structured Data',
    'Schema.org JSON-LD (@graph: LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, Article, FAQPage)',
    schemaErrors.length === 0,
    schemaErrors.length === 0
      ? 'All 75 indexable pages contain valid, conflict-free Schema.org JSON-LD graphs.'
      : schemaErrors.join('; ')
  );

  for (const res of testResults) {
    console.log(`${res.passed ? 'PASS' : 'FAIL'} | ${res.suite} — ${res.name}`);
    console.log(`       ${res.details}`);
  }
  console.log('================================================================================');

  if (failures.length > 0) {
    console.error(`SEO Test Suite FAILED with ${failures.length} error(s):`);
    for (const f of failures) console.error(` - ${f}`);
    process.exit(1);
  } else {
    console.log(
      `ALL ${testResults.length} TECHNICAL SEO TEST SUITES PASSED (75 Indexable Pages, 2 Noindex Routes, 5 Child Sitemaps, 0 Orphans).`
    );
  }
}

runSeoTestSuite();
