import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

// Ensure source index.html is always restored from src/index.template.html before Vite dev or build runs
const templatePath = path.resolve(process.cwd(), 'src', 'index.template.html');
const rootIndexPath = path.resolve(process.cwd(), 'index.html');
if (fs.existsSync(templatePath)) {
  const tpl = fs.readFileSync(templatePath, 'utf8');
  if (!fs.existsSync(rootIndexPath) || fs.readFileSync(rootIndexPath, 'utf8') !== tpl) {
    fs.writeFileSync(rootIndexPath, tpl, 'utf8');
  }
}

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
  const pathname = (rawUrl.split('?')[0].split('#')[0] || '/')
    .replace(/^\/Mojo-Cleaning-(?=\/|$)/i, '')
    .replace(/\/index\.html$/i, '');
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function routingMiddleware(): Plugin {
  const routeGuard = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url) {
      next();
      return;
    }

    const rawPath = (req.url.split('?')[0].split('#')[0] || '/').replace(
      /^\/Mojo-Cleaning-(?=\/|$)/i,
      ''
    );
    const lowerRawPath = rawPath.toLowerCase();

    if (LEGACY_REDIRECTS[lowerRawPath]) {
      res.statusCode = 301;
      res.setHeader('Location', LEGACY_REDIRECTS[lowerRawPath]);
      res.end();
      return;
    }

    if (
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

  return {
    name: 'mojo-routing-middleware',
    configureServer(server) {
      server.middlewares.use(routeGuard);
    },
    configurePreviewServer(server) {
      server.middlewares.use(routeGuard);
    },
  };
}

export default defineConfig({
  plugins: [react(), routingMiddleware()],
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
