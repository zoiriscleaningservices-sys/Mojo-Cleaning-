import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const LOCATION_SLUGS = [
  'huntsville-al',
  'madison-al',
  'hampton-cove-al',
  'owens-cross-roads-al',
  'athens-al',
];

const SERVICE_SLUGS = [
  'recurring-residential-cleaning',
  'deep-house-cleaning',
  'move-in-cleaning',
  'move-out-cleaning',
  'post-construction-cleaning',
];

const VALID_PUBLISHED_PATHS = new Set<string>([
  '/',
  '/locations/',
  '/privacy-policy/',
  '/terms/',
  ...LOCATION_SLUGS.flatMap((loc) => [
    `/${loc}/`,
    `/${loc}/about/`,
    `/${loc}/services/`,
    ...SERVICE_SLUGS.map((svc) => `/${loc}/services/${svc}/`),
    `/${loc}/checklist/`,
    `/${loc}/reviews/`,
    `/${loc}/faqs/`,
    `/${loc}/contact/`,
    `/${loc}/request-a-quote/`,
  ]),
]);

const LEGACY_REDIRECTS: Record<string, string> = {
  '/about': '/huntsville-al/about/',
  '/about/': '/huntsville-al/about/',
  '/services': '/huntsville-al/services/',
  '/services/': '/huntsville-al/services/',
  '/services/recurring-cleaning': '/huntsville-al/services/recurring-residential-cleaning/',
  '/services/recurring-cleaning/': '/huntsville-al/services/recurring-residential-cleaning/',
  '/services/deep-cleaning': '/huntsville-al/services/deep-house-cleaning/',
  '/services/deep-cleaning/': '/huntsville-al/services/deep-house-cleaning/',
  '/services/move-in-cleaning': '/huntsville-al/services/move-in-cleaning/',
  '/services/move-in-cleaning/': '/huntsville-al/services/move-in-cleaning/',
  '/services/move-out-cleaning': '/huntsville-al/services/move-out-cleaning/',
  '/services/move-out-cleaning/': '/huntsville-al/services/move-out-cleaning/',
  '/services/post-construction-cleaning': '/huntsville-al/services/post-construction-cleaning/',
  '/services/post-construction-cleaning/': '/huntsville-al/services/post-construction-cleaning/',
  '/reviews': '/huntsville-al/reviews/',
  '/reviews/': '/huntsville-al/reviews/',
  '/faqs': '/huntsville-al/faqs/',
  '/faqs/': '/huntsville-al/faqs/',
  '/contact': '/huntsville-al/contact/',
  '/contact/': '/huntsville-al/contact/',
  '/cleaning-checklist': '/huntsville-al/checklist/',
  '/cleaning-checklist/': '/huntsville-al/checklist/',
  '/contact_us': '/huntsville-al/contact/',
  '/contact_us/': '/huntsville-al/contact/',
  '/terms-and-conditions': '/terms/',
  '/terms-and-conditions/': '/terms/',
  ...Object.fromEntries(
    LOCATION_SLUGS.flatMap((loc) => [
      [`/locations/${loc}`, `/${loc}/`],
      [`/locations/${loc}/`, `/${loc}/`],
      [`/locations/${loc}/recurring-cleaning`, `/${loc}/services/recurring-residential-cleaning/`],
      [`/locations/${loc}/recurring-cleaning/`, `/${loc}/services/recurring-residential-cleaning/`],
      [`/locations/${loc}/deep-cleaning`, `/${loc}/services/deep-house-cleaning/`],
      [`/locations/${loc}/deep-cleaning/`, `/${loc}/services/deep-house-cleaning/`],
      [`/locations/${loc}/move-in-cleaning`, `/${loc}/services/move-in-cleaning/`],
      [`/locations/${loc}/move-in-cleaning/`, `/${loc}/services/move-in-cleaning/`],
      [`/locations/${loc}/move-out-cleaning`, `/${loc}/services/move-out-cleaning/`],
      [`/locations/${loc}/move-out-cleaning/`, `/${loc}/services/move-out-cleaning/`],
      [`/locations/${loc}/post-construction-cleaning`, `/${loc}/services/post-construction-cleaning/`],
      [`/locations/${loc}/post-construction-cleaning/`, `/${loc}/services/post-construction-cleaning/`],
    ])
  ),
};

function normalizePath(rawUrl: string): string {
  const pathname = rawUrl.split('?')[0].split('#')[0] || '/';
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function quoteApiAndRoutingMiddleware(): Plugin {
  const routeGuard = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url) {
      next();
      return;
    }

    const rawPath = req.url.split('?')[0].split('#')[0] || '/';
    const lowerRawPath = rawPath.toLowerCase();

    // 1. Legacy 301 Redirects
    if (LEGACY_REDIRECTS[lowerRawPath]) {
      res.statusCode = 301;
      res.setHeader('Location', LEGACY_REDIRECTS[lowerRawPath]);
      res.end();
      return;
    }

    // 2. Skip static assets, Vite internals, and API routes
    if (
      rawPath.startsWith('/api/') ||
      rawPath.startsWith('/@') ||
      rawPath.startsWith('/src/') ||
      rawPath.startsWith('/node_modules/') ||
      rawPath.startsWith('/assets/') ||
      rawPath.startsWith('/images/') ||
      /\.[a-zA-Z0-9]+$/.test(rawPath)
    ) {
      next();
      return;
    }

    const normalized = normalizePath(rawPath);
    if (!VALID_PUBLISHED_PATHS.has(normalized)) {
      res.statusCode = 404;
      const dist404 = path.resolve(process.cwd(), 'dist', '404.html');
      if (fs.existsSync(dist404)) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(fs.readFileSync(dist404, 'utf8'));
        return;
      }
    }

    next();
  };

  const apiHandler = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url || !req.url.startsWith('/api/quote')) {
      next();
      return;
    }

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error: 'Method not allowed. Use POST.' }));
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
      if (body.length > 50_000) {
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');

        // Honeypot spam check
        if (data.companyWebsite && String(data.companyWebsite).trim() !== '') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true, spamFiltered: true }));
          return;
        }

        const fullName = String(data.fullName || '').trim();
        const phone = String(data.phone || '').trim();
        const email = String(data.email || '').trim();
        const service = String(data.service || '').trim();
        const details = String(data.details || '').trim();

        const phoneDigits = phone.replace(/\D/g, '');
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!fullName || fullName.length < 2) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: false,
              field: 'fullName',
              error: 'Please provide your full name.',
            })
          );
          return;
        }

        if (phoneDigits.length < 10 || phoneDigits.length > 15) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: false,
              field: 'phone',
              error: 'Please provide a valid 10-digit telephone number.',
            })
          );
          return;
        }

        if (!emailValid) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: false,
              field: 'email',
              error: 'Please provide a valid email address.',
            })
          );
          return;
        }

        if (!service) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: false,
              field: 'service',
              error: 'Please select a requested cleaning service.',
            })
          );
          return;
        }

        if (!details || details.length < 5) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: false,
              field: 'details',
              error: 'Please share a few details about your home or cleaning needs.',
            })
          );
          return;
        }

        const referenceId = `MOJO-${Date.now().toString(36).toUpperCase()}`;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            ok: true,
            referenceId,
            receivedAt: new Date().toISOString(),
            message:
              'Thanks for reaching out to Mojo Cleaning. Your quote request has been received. Our team will follow up using the contact information you provided.',
            leadSummary: {
              fullName,
              phone,
              email,
              service,
              homeSize: data.homeSize || 'Not specified',
              frequency: data.frequency || 'Not specified',
              zipCode: data.zipCode || 'Huntsville / Madison area',
              preferredDate: data.preferredDate || 'Flexible',
              smsConsent: Boolean(data.smsConsent),
              sourcePagePath: String(data.sourcePagePath || '/'),
            },
          })
        );
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: false, error: 'Invalid request payload.' }));
      }
    });
  };

  return {
    name: 'mojo-quote-api-and-routing-middleware',
    configureServer(server) {
      server.middlewares.use(routeGuard);
      server.middlewares.use(apiHandler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(routeGuard);
      server.middlewares.use(apiHandler);
    },
  };
}

export default defineConfig({
  plugins: [react(), quoteApiAndRoutingMiddleware()],
  build: {
    target: 'es2020',
    cssMinify: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('/src/data/')) {
            return 'content-data';
          }
        },
      },
    },
  },
});
