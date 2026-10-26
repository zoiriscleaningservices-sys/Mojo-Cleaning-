import path from 'node:path';
import fs from 'node:fs';
import { preview } from 'vite';
import { chromium } from 'playwright-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR =
  'C:\\Users\\lucia\\.gemini\\antigravity\\brain\\73fddd54-2664-4cb9-a833-a32a3178293e\\scratch\\qa_screenshots';

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const VIEWPORTS = [
  { width: 320, height: 700, label: '320px' },
  { width: 360, height: 780, label: '360px' },
  { width: 375, height: 812, label: '375px' },
  { width: 390, height: 844, label: '390px' },
  { width: 430, height: 932, label: '430px' },
  { width: 768, height: 1024, label: '768px' },
  { width: 1024, height: 768, label: '1024px' },
  { width: 1440, height: 900, label: '1440px' },
];

async function runQaSuite() {
  const previewServer = await preview({
    preview: { port: 4173, strictPort: false },
  });
  const serverUrl = previewServer.resolvedUrls.local[0];
  console.log(`Preview server running at ${serverUrl}`);

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const report = {
    viewports: [],
    functional: {},
    seoAndA11y: {},
    consoleErrors: [],
    pageErrors: [],
  };

  try {
    // 1. Test all 8 viewports for overflow, broken images, and logo proportions
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          report.consoleErrors.push(`[${vp.label}] ${msg.text()}`);
        }
      });
      page.on('pageerror', (err) => {
        report.pageErrors.push(`[${vp.label}] ${err.message}`);
      });

      await page.goto(serverUrl, { waitUntil: 'networkidle' });

      // Capture opening animation screenshot at 1440px and 390px before skipping
      if (vp.width === 1440 || vp.width === 390) {
        const introVisible = await page.locator('.mojo-intro-overlay').isVisible().catch(() => false);
        if (introVisible) {
          await page.screenshot({
            path: path.join(SCREENSHOT_DIR, `intro_${vp.width}.png`),
          });
        }
      }

      // Skip or wait for intro overlay to finish
      await page.locator('.mojo-intro-skip').click({ timeout: 400 }).catch(() => {});
      await page.waitForSelector('.mojo-intro-overlay', { state: 'detached', timeout: 2500 }).catch(() => {});

      // Scroll through page with instant behavior to trigger lazy-loaded images
      await page.evaluate(async () => {
        const step = 450;
        for (let y = 0; y <= document.body.scrollHeight; y += step) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        await Promise.all(
          Array.from(document.querySelectorAll('img')).map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
              setTimeout(resolve, 1500);
            });
          })
        );
      });
      await page.waitForTimeout(150);

      const metrics = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const hasHorizontalOverflow = docWidth > winWidth;

        // Find any overflowing elements if any exist
        const overflowingSelectors = [];
        if (hasHorizontalOverflow) {
          document.querySelectorAll('*').forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.right > winWidth + 1) {
              overflowingSelectors.push(
                `${el.tagName.toLowerCase()}.${Array.from(el.classList).join('.')} (right=${Math.round(rect.right)}, win=${winWidth})`
              );
            }
          });
        }

        const imgs = Array.from(document.querySelectorAll('img'));
        const brokenImages = imgs
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.getAttribute('src'));

        const headerLogo = document.querySelector('.brand-logo-img');
        const logoRect = headerLogo ? headerLogo.getBoundingClientRect() : null;
        const logoRatio =
          logoRect && logoRect.height > 0
            ? Number((logoRect.width / logoRect.height).toFixed(2))
            : null;

        return {
          docWidth,
          winWidth,
          hasHorizontalOverflow,
          overflowingSelectors: overflowingSelectors.slice(0, 15),
          totalImages: imgs.length,
          brokenImages,
          logoRatio,
        };
      });

      report.viewports.push({
        viewport: vp.label,
        ...metrics,
      });

      // Capture section screenshots at 1440px (Desktop), 390px (Mobile), and 320px (Compact Mobile)
      if (vp.width === 1440 || vp.width === 390 || vp.width === 320) {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.waitForTimeout(80);
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `hero_${vp.width}.png`),
        });

        const sections = [
          'services',
          'checklist-explorer',
          'why-mojo',
          'how-it-works',
          'guarantee',
          'reviews',
          'service-areas',
          'faqs',
          'quote',
        ];
        for (const secId of sections) {
          const exists = await page.locator(`#${secId}`).count();
          if (exists) {
            await page.evaluate((id) => {
              const el = document.getElementById(id);
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 82;
                window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
              }
            }, secId);
            await page.waitForTimeout(80);
            await page.screenshot({
              path: path.join(SCREENSHOT_DIR, `${secId}_${vp.width}.png`),
            });
          }
        }

        // Footer screenshot
        await page.evaluate(() =>
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })
        );
        await page.waitForTimeout(80);
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `footer_${vp.width}.png`),
        });
      }

      await context.close();
    }

    // 2. Functional & Interactive Testing
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(serverUrl, { waitUntil: 'networkidle' });

    await page.locator('.mojo-intro-skip').click({ timeout: 400 }).catch(() => {});
    await page.waitForSelector('.mojo-intro-overlay', { state: 'detached', timeout: 2500 }).catch(() => {});

    // 2a. Mobile Navigation Toggle & Auto-Close
    const menuToggle = page.locator('.mobile-menu-toggle');
    const initialExpanded = await menuToggle.getAttribute('aria-expanded');
    await menuToggle.click();
    await page.waitForTimeout(300);
    const openExpanded = await menuToggle.getAttribute('aria-expanded');
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'mobile_menu_open_390.png'),
    });
    await page.locator('#mobile-navigation-drawer a[href="#services"]').click();
    await page.waitForTimeout(250);
    const closedExpanded = await menuToggle.getAttribute('aria-expanded');
    report.functional.mobileMenu = {
      initialExpanded,
      openExpanded,
      closedAfterLinkClick: closedExpanded === 'false',
    };

    // 2b. Service Card CTA Preselection
    await page.setViewportSize({ width: 1440, height: 900 });
    const moveOutCta = page.locator('#service-move-in-out .service-card-cta');
    await moveOutCta.click();
    await page.waitForTimeout(150);
    const selectedHiddenService = await page
      .locator('input[name="service"]')
      .inputValue();
    report.functional.servicePreselection = {
      clickedCard: 'Move-In & Move-Out Cleaning',
      selectedFormValue: selectedHiddenService,
      matches: selectedHiddenService === 'Move-In & Move-Out Cleaning',
    };

    // 2c. Checklist Room Tab Switching
    const bathTab = page.locator('#tab-bathrooms');
    await bathTab.click();
    const bathSelected = await bathTab.getAttribute('aria-selected');
    report.functional.checklistTabs = {
      bathroomsTabSelected: bathSelected === 'true',
    };

    // 2d. Quote Form Validation (Empty Submit)
    const submitBtn = page.locator('.quote-submit-btn');
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();
    await page.waitForTimeout(100);
    const errorCount = await page.locator('.field-error-msg').count();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'quote_validation_errors_1440.png'),
    });
    report.functional.formValidation = {
      triggeredErrorMessages: errorCount,
      passed: errorCount >= 4,
    };

    // 2e. Quote Form Real Submission -> 200 OK Confirmation
    await page.fill('#quote-fullName', 'Evelyn Harper');
    await page.fill('#quote-phone', '256-555-0148');
    await page.fill('#quote-email', 'evelyn.harper@example.com');
    await page.fill('#quote-zipCode', '35801');
    await page.selectOption('#quote-homeSize', '3 Bed / 2–2.5 Bath (1,500–2,400 sq ft)');
    await page.fill(
      '#quote-details',
      'Looking for a move-in clean next Friday in Blossomwood. Two friendly dogs, eco-friendly supplies preferred.'
    );
    await submitBtn.click();
    await page.waitForSelector('.quote-success-panel', { timeout: 5000 });
    await page.evaluate(() => {
      const el = document.getElementById('quote');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 82;
        window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
      }
    });
    await page.waitForTimeout(100);
    const successText = await page.locator('.quote-success-message').innerText();
    const referenceText = await page.locator('.quote-success-ref').innerText();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'quote_submission_success_1440.png'),
    });
    report.functional.formSubmission = {
      confirmed: true,
      referenceText,
      successText,
    };

    // 2f. Legal Views Navigation (Privacy Policy & Terms)
    await page.locator('.footer-legal-link').first().click();
    await page.waitForTimeout(150);
    const legalTitle = await page.locator('#legal-heading').innerText();
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'privacy_policy_1440.png'),
    });
    await page.locator('.legal-top-nav button').first().click();
    await page.waitForTimeout(150);
    report.functional.legalNavigation = {
      openedTitle: legalTitle,
      returnedHome: (await page.locator('#hero-heading').count()) === 1,
    };

    // 3. SEO & Accessibility Audit
    report.seoAndA11y = await page.evaluate(() => {
      const h1s = Array.from(document.querySelectorAll('h1')).map((h) => h.innerText.trim());
      const h2s = Array.from(document.querySelectorAll('h2')).map((h) => h.innerText.trim());
      const title = document.title;
      const metaDesc = document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content');
      const canonical = document
        .querySelector('link[rel="canonical"]')
        ?.getAttribute('href');
      const telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]')).map((a) =>
        a.getAttribute('href')
      );
      const mailtoLinks = Array.from(document.querySelectorAll('a[href^="mailto:"]')).map((a) =>
        a.getAttribute('href')
      );
      const imgsMissingAlt = Array.from(document.querySelectorAll('img')).filter(
        (img) => img.getAttribute('alt') === null
      ).length;

      let ldJsonValid = false;
      let ldJsonTypes = [];
      try {
        const raw = document.querySelector('script[type="application/ld+json"]')?.textContent;
        const parsed = JSON.parse(raw || '{}');
        ldJsonValid = Boolean(parsed['@graph']);
        ldJsonTypes = (parsed['@graph'] || []).map((n) => n['@type']);
      } catch {
        ldJsonValid = false;
      }

      return {
        title,
        metaDescLength: metaDesc ? metaDesc.length : 0,
        canonical,
        h1Count: h1s.length,
        h1s,
        h2Count: h2s.length,
        telLinksCount: telLinks.length,
        uniqueTelHrefs: Array.from(new Set(telLinks)),
        mailtoLinksCount: mailtoLinks.length,
        uniqueMailtoHrefs: Array.from(new Set(mailtoLinks)),
        imgsMissingAlt,
        ldJsonValid,
        ldJsonTypes,
      };
    });

    await context.close();
  } finally {
    await browser.close();
    previewServer.httpServer.close();
  }

  console.log(JSON.stringify(report, null, 2));
}

runQaSuite().catch((err) => {
  console.error(err);
  process.exit(1);
});
