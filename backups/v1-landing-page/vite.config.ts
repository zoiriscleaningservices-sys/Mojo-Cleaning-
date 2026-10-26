import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';

function quoteApiMiddleware(): Plugin {
  const handler = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
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
          res.end(JSON.stringify({ ok: false, field: 'fullName', error: 'Please provide your full name.' }));
          return;
        }

        if (phoneDigits.length < 10 || phoneDigits.length > 15) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, field: 'phone', error: 'Please provide a valid 10-digit telephone number.' }));
          return;
        }

        if (!emailValid) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, field: 'email', error: 'Please provide a valid email address.' }));
          return;
        }

        if (!service) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, field: 'service', error: 'Please select a requested cleaning service.' }));
          return;
        }

        if (!details || details.length < 5) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, field: 'details', error: 'Please share a few details about your home or cleaning needs.' }));
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
    name: 'mojo-quote-api-middleware',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  plugins: [react(), quoteApiMiddleware()],
  build: {
    target: 'es2020',
    cssMinify: true,
    minify: 'esbuild',
  },
});
