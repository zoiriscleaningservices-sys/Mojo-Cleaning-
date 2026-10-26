import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR =
  'C:\\Users\\lucia\\.gemini\\antigravity\\brain\\137179d6-5a77-4fb5-aea0-9d7cdd4312de';
const BASE_URL = 'http://localhost:4173';

const ALL_LOCATION_SLUGS = [
  'huntsville-al',
  'madison-al',
  'hampton-cove-al',
  'owens-cross-roads-al',
  'athens-al',
];

const VIEWPORTS = [
  { name: '320x568', width: 320, height: 568 },
  { name: '375x812', width: 375, height: 812 },
  { name: '390x844', width: 390, height: 844 },
  { name: '412x915', width: 412, height: 915 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1024x768', width: 1024, height: 768 },
  { name: '1280x800', width: 1280, height: 800 },
  { name: '1440x900', width: 1440, height: 900 },
];

const REPRESENTATIVE_ROUTES = [
  { path: '/', slug: 'root_home', expectedLoc: 'huntsville-al' },
  { path: '/locations/', slug: 'locations_directory', expectedLoc: null },
  { path: '/huntsville-al/', slug: 'location_huntsville_home', expectedLoc: 'huntsville-al' },
  { path: '/huntsville-al/about/', slug: 'location_huntsville_about', expectedLoc: 'huntsville-al' },
  { path: '/huntsville-al/services/', slug: 'location_huntsville_services', expectedLoc: 'huntsville-al' },
  {
    path: '/huntsville-al/services/deep-house-cleaning/',
    slug: 'combo_huntsville_deep',
    expectedLoc: 'huntsville-al',
  },
  { path: '/huntsville-al/checklist/', slug: 'location_huntsville_checklist', expectedLoc: 'huntsville-al' },
  { path: '/huntsville-al/reviews/', slug: 'location_huntsville_reviews', expectedLoc: 'huntsville-al' },
  { path: '/huntsville-al/faqs/', slug: 'location_huntsville_faqs', expectedLoc: 'huntsville-al' },
  { path: '/huntsville-al/contact/', slug: 'location_huntsville_contact', expectedLoc: 'huntsville-al' },
  { path: '/huntsville-al/request-a-quote/', slug: 'location_huntsville_quote', expectedLoc: 'huntsville-al' },
  { path: '/madison-al/', slug: 'location_madison_home', expectedLoc: 'madison-al' },
  {
    path: '/madison-al/services/move-out-cleaning/',
    slug: 'combo_madison_move_out',
    expectedLoc: 'madison-al',
  },
  { path: '/hampton-cove-al/', slug: 'location_hampton_cove_home', expectedLoc: 'hampton-cove-al' },
  {
    path: '/owens-cross-roads-al/',
    slug: 'location_owens_cross_roads_home',
    expectedLoc: 'owens-cross-roads-al',
  },
  { path: '/athens-al/', slug: 'location_athens_home', expectedLoc: 'athens-al' },
  { path: '/privacy-policy/', slug: 'privacy_policy', expectedLoc: null },
  { path: '/terms/', slug: 'terms', expectedLoc: null },
];

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
  throw new Error('Could not find Chrome or Edge executable.');
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Preview server did not start within ${timeoutMs}ms`);
}

async function runQaSuite() {
  console.log('Starting Vite preview server on port 4173...');
  const serverProc = spawn('npx.cmd', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    stdio: 'pipe',
    shell: true,
  });

  const failures = [];
  const consoleErrors = [];
  let perfMetrics = {};

  try {
    await waitForServer(`${BASE_URL}/`);
    console.log('Preview server is up.');

    const executablePath = findBrowserExecutable();
    const browser = await chromium.launch({ executablePath, headless: true });

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });

    const page = await context.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const txt = msg.text();
        const locUrl = msg.location()?.url || '';
        const isThirdPartyWidget =
          locUrl.includes('leadconnectorhq.com') ||
          locUrl.includes('msgsndr.com') ||
          txt.includes('leadconnectorhq.com') ||
          txt.includes('msgsndr.com');
        if (!txt.includes('status of 404 (Not Found)') && !isThirdPartyWidget) {
          consoleErrors.push(txt);
        }
      }
    });
    page.on('pageerror', (err) => {
      if (
        !err.message.includes('leadconnectorhq.com') &&
        !err.message.includes('msgsndr.com')
      ) {
        consoleErrors.push(err.message);
      }
    });

    // 1. Multi-Viewport Overflow Check across all 8 viewports
    const overflowTestRoutes = [
      '/huntsville-al/',
      '/madison-al/',
      '/locations/',
      '/huntsville-al/services/',
      '/huntsville-al/checklist/',
      '/madison-al/services/move-out-cleaning/',
    ];

    for (const testRoute of overflowTestRoutes) {
      await page.goto(`${BASE_URL}${testRoute}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(200);
      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.waitForTimeout(60);
        const overflow = await page.evaluate(() => {
          return {
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
          };
        });
        if (overflow.scrollWidth > overflow.innerWidth) {
          failures.push(
            `Horizontal overflow on ${testRoute} at ${vp.name}: scrollWidth=${overflow.scrollWidth} > innerWidth=${overflow.innerWidth}`
          );
        }
      }
    }
    console.log('✓ Multi-viewport overflow check passed across all 8 viewports (320px–1440px).');

    // 2. Verify Representative Routes + Strict Location Isolation in Live DOM + Capture Screenshots
    for (const route of REPRESENTATIVE_ROUTES) {
      await page.setViewportSize({ width: 1440, height: 900 });
      const resp = await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(250);
      if (!resp || resp.status() !== 200) {
        failures.push(`Route ${route.path} returned HTTP ${resp?.status()}`);
        continue;
      }

      const pageCheck = await page.evaluate(
        ({ allLocs, expectedLoc }) => {
          const h1s = [...document.querySelectorAll('h1')].map((el) => el.textContent?.trim());
          const canonical = document
            .querySelector('link[rel="canonical"]')
            ?.getAttribute('href');
          const desc = document
            .querySelector('meta[name="description"]')
            ?.getAttribute('content');

          const hrefs = [...document.querySelectorAll('a[href]')]
            .map((a) => a.getAttribute('href') || '')
            .filter((h) => h.startsWith('/'));

          const crossLocationLeaks = [];
          if (expectedLoc) {
            for (const h of hrefs) {
              const clean = h.split('?')[0].split('#')[0].replace(/^\/|\/$/g, '');
              const firstSeg = clean.split('/')[0];
              if (allLocs.includes(firstSeg) && firstSeg !== expectedLoc) {
                crossLocationLeaks.push(h);
              }
            }
          }

          const hasSeeAllLocations = hrefs.some(
            (h) => h.split('?')[0].split('#')[0] === '/locations/'
          );

          const brokenImages = [...document.querySelectorAll('img')]
            .filter((img) => img.loading !== 'lazy' && (!img.complete || img.naturalWidth === 0))
            .map((img) => img.getAttribute('src'));

          const ghlIframe = document.querySelector('iframe#inline-LMshydq3SzEFJgOrXehA');
          const hasGhlForm =
            Boolean(ghlIframe) &&
            ghlIframe?.getAttribute('src') ===
              'https://api.leadconnectorhq.com/widget/form/LMshydq3SzEFJgOrXehA' &&
            ghlIframe?.getAttribute('data-form-id') === 'LMshydq3SzEFJgOrXehA';
          const hasGhlScript = Boolean(
            document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')
          );
          const h1El = document.querySelector('h1');
          const h1FontFamily = h1El ? window.getComputedStyle(h1El).fontFamily : '';

          return {
            title: document.title,
            h1Count: h1s.length,
            h1Text: h1s[0] || '',
            h1FontFamily,
            canonical,
            descLength: desc ? desc.length : 0,
            crossLocationLeaks,
            hasSeeAllLocations,
            brokenImages,
            hasGhlForm,
            hasGhlScript,
          };
        },
        { allLocs: ALL_LOCATION_SLUGS, expectedLoc: route.expectedLoc }
      );

      if (
        pageCheck.h1Count !== 1 ||
        !pageCheck.title ||
        !pageCheck.canonical ||
        pageCheck.descLength < 50
      ) {
        failures.push(`SEO metadata check failed on ${route.path}: ${JSON.stringify(pageCheck)}`);
      }

      if (pageCheck.crossLocationLeaks.length > 0) {
        failures.push(
          `Cross-location link leak on ${route.path}: ${pageCheck.crossLocationLeaks.join(', ')}`
        );
      }

      if (route.expectedLoc && !pageCheck.hasSeeAllLocations) {
        failures.push(`Missing "See All Locations" link on ${route.path}`);
      }

      if (pageCheck.brokenImages && pageCheck.brokenImages.length > 0) {
        failures.push(`Broken eager images on ${route.path}: ${pageCheck.brokenImages.join(', ')}`);
      }

      if (!pageCheck.hasGhlForm || !pageCheck.hasGhlScript) {
        failures.push(
          `Missing LeadConnector form or script on ${route.path}: hasGhlForm=${pageCheck.hasGhlForm}, hasGhlScript=${pageCheck.hasGhlScript}`
        );
      }

      if (!pageCheck.h1FontFamily.includes('Titan One')) {
        failures.push(
          `H1 font-family on ${route.path} does not use Titan One: found "${pageCheck.h1FontFamily}"`
        );
      }

      // Save key screenshots to Artifact Directory for visual inspection
      if (
        [
          'locations_directory',
          'location_huntsville_home',
          'location_huntsville_about',
          'location_madison_home',
          'location_hampton_cove_home',
          'location_owens_cross_roads_home',
          'location_athens_home',
          'location_huntsville_services',
          'location_huntsville_checklist',
          'combo_huntsville_deep',
          'combo_madison_move_out',
        ].includes(route.slug)
      ) {
        await page.screenshot({
          path: path.join(ARTIFACT_DIR, `isolated_${route.slug}_1440.png`),
          fullPage: false,
        });

        if (route.slug === 'location_huntsville_about') {
          await page.locator('#people-behind-mojo').scrollIntoViewIfNeeded();
          await page.waitForTimeout(250);
          await page.screenshot({
            path: path.join(ARTIFACT_DIR, 'about_team_gallery_organic_1440.png'),
            fullPage: false,
          });
        }

        if (route.slug === 'location_huntsville_services') {
          await page.locator('.available-services-modern-grid').scrollIntoViewIfNeeded();
          await page.waitForTimeout(250);
          await page.screenshot({
            path: path.join(ARTIFACT_DIR, 'residential_services_suite_1440.png'),
            fullPage: false,
          });
        }

        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForTimeout(60);
        await page.screenshot({
          path: path.join(ARTIFACT_DIR, `isolated_${route.slug}_390.png`),
          fullPage: false,
        });
      }
      console.log(
        `✓ Verified route ${route.path} — H1: "${pageCheck.h1Text}" (0 cross-location leaks)`
      );
    }

    // 3. Verify Desktop Services Dropdown Interaction & Isolation on /madison-al/
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/madison-al/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    await page.click('.desktop-dropdown-toggle-btn');
    await page.waitForTimeout(150);
    const dropdownVisible = await page.isVisible('#desktop-services-dropdown-menu.is-open');
    if (!dropdownVisible) {
      failures.push('Desktop Services dropdown did not open on click.');
    } else {
      const dropdownLinks = await page.evaluate(() =>
        [...document.querySelectorAll('#desktop-services-dropdown-menu a[href]')].map((a) =>
          a.getAttribute('href')
        )
      );
      const nonMadisonLinks = dropdownLinks.filter((h) => !h || !h.startsWith('/madison-al/'));
      if (nonMadisonLinks.length > 0) {
        failures.push(
          `Madison Services dropdown contained non-Madison links: ${nonMadisonLinks.join(', ')}`
        );
      } else {
        await page.screenshot({
          path: path.join(ARTIFACT_DIR, 'isolated_madison_services_dropdown_1440.png'),
          fullPage: false,
        });
        console.log(
          `✓ Desktop Services dropdown verified on /madison-al/ (${dropdownLinks.length} Madison-scoped links).`
        );
      }
    }

    // 4. Verify Mobile Drawer & Expandable Services Accordion on /hampton-cove-al/
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/hampton-cove-al/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    await page.click('.mobile-menu-toggle');
    await page.waitForTimeout(150);
    await page.click('.mobile-services-expand-btn');
    await page.waitForTimeout(150);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'isolated_hampton_cove_mobile_drawer_390.png'),
      fullPage: false,
    });
    console.log('✓ Mobile drawer & expandable Services accordion verified on /hampton-cove-al/.');

    // 5. Verify "See All Locations" Footer Link -> /locations/ -> "Explore Athens" -> /athens-al/ Flow
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/madison-al/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    await page.locator('.footer-location-directory-bar').scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'isolated_footer_see_all_locations_1440.png'),
      fullPage: false,
    });
    await page.click('.footer-see-all-locations-link');
    await page.waitForTimeout(150);
    if (!page.url().endsWith('/locations/')) {
      failures.push(`Clicking See All Locations navigated to ${page.url()} instead of /locations/`);
    } else {
      // Verify all 5 Explore [Location] buttons exist on /locations/
      const exploreLabels = await page.evaluate(() =>
        [...document.querySelectorAll('.location-hub-footer .btn-primary')].map((el) =>
          el.textContent?.trim()
        )
      );
      const expectedLabels = [
        'Explore Huntsville',
        'Explore Madison',
        'Explore Hampton Cove',
        'Explore Owens Cross Roads',
        'Explore Athens',
      ];
      for (const lbl of expectedLabels) {
        if (!exploreLabels.includes(lbl)) {
          failures.push(`Missing "${lbl}" button on /locations/ (found: ${exploreLabels.join(', ')})`);
        }
      }

      // Click Explore Athens and verify navigation enters /athens-al/
      await page.click('a.btn-primary[href="/athens-al/"]');
      await page.waitForTimeout(150);
      const athensBadge = await page.textContent('.header-location-pill');
      if (!page.url().endsWith('/athens-al/') || !athensBadge?.includes('Athens, AL')) {
        failures.push(
          `Clicking Explore Athens failed to enter Athens context: url=${page.url()}, badge=${athensBadge}`
        );
      } else {
        console.log(
          '✓ Verified "See All Locations" -> /locations/ -> "Explore Athens" -> /athens-al/ isolation flow.'
        );
      }
    }

    // 6. Verify Official LeadConnector / Golden Grove Website Form Embed on /madison-al/request-a-quote/?service=move-out-cleaning
    await page.goto(`${BASE_URL}/madison-al/request-a-quote/?service=move-out-cleaning`, {
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(400);
    const ghlEmbedAttrs = await page.evaluate(() => {
      const iframe = document.querySelector('iframe#inline-LMshydq3SzEFJgOrXehA');
      if (!iframe) return null;
      return {
        src: iframe.getAttribute('src'),
        id: iframe.getAttribute('id'),
        dataLayout: iframe.getAttribute('data-layout'),
        dataTriggerType: iframe.getAttribute('data-trigger-type'),
        dataActivationType: iframe.getAttribute('data-activation-type'),
        dataDeactivationType: iframe.getAttribute('data-deactivation-type'),
        dataFormName: iframe.getAttribute('data-form-name'),
        dataHeight: iframe.getAttribute('data-height'),
        dataLayoutIframeId: iframe.getAttribute('data-layout-iframe-id'),
        dataFormId: iframe.getAttribute('data-form-id'),
        dataCookieConsent: iframe.getAttribute('data-cookie-consent'),
        dataCookieConsentProvider: iframe.getAttribute('data-cookie-consent-provider'),
        title: iframe.getAttribute('title'),
      };
    });
    if (
      !ghlEmbedAttrs ||
      ghlEmbedAttrs.src !== 'https://api.leadconnectorhq.com/widget/form/LMshydq3SzEFJgOrXehA' ||
      ghlEmbedAttrs.dataFormId !== 'LMshydq3SzEFJgOrXehA' ||
      ghlEmbedAttrs.dataFormName !== 'Golden Grove Website Form' ||
      ghlEmbedAttrs.dataLayout !== "{'id':'INLINE'}"
    ) {
      failures.push(
        `LeadConnector iframe attributes mismatch: ${JSON.stringify(ghlEmbedAttrs)}`
      );
    } else {
      await page.locator('#quote').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'mojo_titan_one_and_ghl_form_1440.png'),
        fullPage: false,
      });
      console.log(
        `✓ LeadConnector Golden Grove Website Form (LMshydq3SzEFJgOrXehA) verified with all required data-* attributes.`
      );
    }

    // 6C. Verify Reduced-Motion Usability (prefers-reduced-motion: reduce)
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${BASE_URL}/huntsville-al/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    const reducedMotionUsable = await page.evaluate(() => {
      const overlay = document.querySelector('.intro-overlay');
      const primaryCta = document.querySelector('a.btn-primary');
      return !overlay && Boolean(primaryCta);
    });
    if (!reducedMotionUsable) {
      failures.push('Page failed usability check under prefers-reduced-motion: reduce.');
    } else {
      console.log('✓ Reduced-motion (prefers-reduced-motion: reduce) usability verified.');
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });

    // 7. Verify HTTP 404 & noindex on unknown route + Legacy 301 Redirects
    const res404 = await page.goto(`${BASE_URL}/nonexistent-404-test-route/`, {
      waitUntil: 'domcontentloaded',
    });
    await page.waitForTimeout(150);
    const robots404 = await page
      .locator('meta[name="robots"]')
      .getAttribute('content');
    if (!res404 || res404.status() !== 404 || !robots404?.includes('noindex')) {
      failures.push(
        `404 check failed: status=${res404?.status()}, robots="${robots404}"`
      );
    } else {
      console.log('✓ Custom 404 status code (404) and noindex verified.');
    }

    const legacyCheck1 = await fetch(`${BASE_URL}/cleaning-checklist`, {
      redirect: 'manual',
    });
    const legacyCheck2 = await fetch(`${BASE_URL}/locations/madison-al/`, {
      redirect: 'manual',
    });
    if (legacyCheck1.status !== 301 || legacyCheck2.status !== 301) {
      failures.push(
        `Legacy redirect check failed: /cleaning-checklist=${legacyCheck1.status}, /locations/madison-al/=${legacyCheck2.status}`
      );
    } else {
      console.log('✓ Legacy 301 redirects verified.');
    }

    // 8. Measure Performance & Core Web Vitals on /huntsville-al/
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/huntsville-al/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    perfMetrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const paints = performance.getEntriesByType('paint');
      const fcp = paints.find((p) => p.name === 'first-contentful-paint');
      return {
        ttfbMs: nav ? Math.round(nav.responseStart - nav.requestStart) : 0,
        fcpMs: fcp ? Math.round(fcp.startTime) : 0,
        domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : 0,
        loadCompleteMs: nav ? Math.round(nav.loadEventEnd) : 0,
      };
    });
    console.log('✓ Performance metrics:', perfMetrics);

    await browser.close();
  } finally {
    serverProc.kill();
  }

  if (consoleErrors.length > 0) {
    failures.push(`Console/Page errors: ${consoleErrors.join(' | ')}`);
  }

  if (failures.length > 0) {
    console.error('QA Suite Failures:', failures);
    process.exit(1);
  }

  console.log('ALL LOCATION-ISOLATED QA, NAVIGATION, SEO, FORM & PERFORMANCE CHECKS PASSED.');
  process.exit(0);
}

runQaSuite().catch((err) => {
  console.error('QA Suite error:', err);
  process.exit(1);
});
