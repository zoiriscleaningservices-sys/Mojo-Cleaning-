/**
 * Cloudflare Pages Function: POST /api/quote
 * Handles quote submissions for Mojo Cleaning (mojocleaningservice.com).
 *
 * Environment Variables (optional, configured in Cloudflare Pages / Server):
 * - GHL_WEBHOOK_URL: Optional authorized GoHighLevel inbound webhook URL.
 *   Never expose private webhook tokens or API keys in frontend JavaScript.
 */

interface QuotePayload {
  fullName?: string;
  phone?: string;
  email?: string;
  service?: string;
  details?: string;
  homeSize?: string;
  frequency?: string;
  zipCode?: string;
  preferredDate?: string;
  promoCode?: string;
  smsConsent?: boolean;
  sourcePagePath?: string;
  firstLandingPath?: string;
  preselectedLocationId?: string | null;
  companyWebsite?: string; // Honeypot field
}

interface Env {
  GHL_WEBHOOK_URL?: string;
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://mojocleaningservice.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  try {
    const data = (await context.request.json()) as QuotePayload;

    // 1. Honeypot spam protection
    if (data.companyWebsite && String(data.companyWebsite).trim() !== '') {
      return new Response(JSON.stringify({ ok: true, spamFiltered: true }), { status: 200, headers });
    }

    // 2. Field normalization & validation
    const fullName = String(data.fullName || '').trim();
    const phone = String(data.phone || '').trim();
    const email = String(data.email || '').trim();
    const service = String(data.service || '').trim();
    const details = String(data.details || '').trim();

    const phoneDigits = phone.replace(/\D/g, '');
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!fullName || fullName.length < 2) {
      return new Response(
        JSON.stringify({ ok: false, field: 'fullName', error: 'Please provide your full name.' }),
        { status: 400, headers }
      );
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return new Response(
        JSON.stringify({ ok: false, field: 'phone', error: 'Please provide a valid 10-digit telephone number.' }),
        { status: 400, headers }
      );
    }

    if (!emailValid) {
      return new Response(
        JSON.stringify({ ok: false, field: 'email', error: 'Please provide a valid email address.' }),
        { status: 400, headers }
      );
    }

    if (!service) {
      return new Response(
        JSON.stringify({ ok: false, field: 'service', error: 'Please select a requested cleaning service.' }),
        { status: 400, headers }
      );
    }

    if (!details || details.length < 5) {
      return new Response(
        JSON.stringify({
          ok: false,
          field: 'details',
          error: 'Please share a few details about your home or cleaning needs.',
        }),
        { status: 400, headers }
      );
    }

    const referenceId = `MOJO-${Date.now().toString(36).toUpperCase()}`;
    const nameParts = fullName.split(/\s+/);
    const firstName = nameParts[0] || fullName;
    const lastName = nameParts.slice(1).join(' ') || '';

    const crmRecord = {
      referenceId,
      source: 'mojocleaningservice.com — Website Quote Request Form',
      sourcePagePath: String(data.sourcePagePath || '/'),
      firstLandingPath: String(data.firstLandingPath || data.sourcePagePath || '/'),
      preselectedLocationId: data.preselectedLocationId || null,
      location: 'Huntsville & Madison County, AL',
      firstName,
      lastName,
      fullName,
      phone,
      email,
      requestedService: service,
      propertyDetails: details,
      approximateSize: data.homeSize || 'Not specified',
      preferredFrequency: data.frequency || 'Not specified',
      zipCode: data.zipCode || 'Not specified',
      preferredDate: data.preferredDate || 'Flexible',
      promoCode: data.promoCode || '',
      smsAppointmentConsent: Boolean(data.smsConsent),
      marketingSubscription: false, // Never auto-subscribe to marketing without explicit separate opt-in
      submittedAt: new Date().toISOString(),
    };

    // 3. Forward to authorized GoHighLevel / CRM webhook if configured in server environment
    if (context.env?.GHL_WEBHOOK_URL) {
      const webhookResp = await fetch(context.env.GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(crmRecord),
      });

      if (!webhookResp.ok) {
        return new Response(
          JSON.stringify({
            ok: false,
            error:
              'We could not reach our scheduling system at this moment. Please use the direct CRM form tab or call/text (256) 418-8199.',
          }),
          { status: 502, headers }
        );
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        referenceId,
        receivedAt: crmRecord.submittedAt,
        message:
          'Thanks for reaching out to Mojo Cleaning. Your quote request has been received. Our team will follow up using the contact information you provided.',
        leadSummary: {
          fullName,
          phone,
          email,
          service,
          homeSize: crmRecord.approximateSize,
          frequency: crmRecord.preferredFrequency,
          zipCode: crmRecord.zipCode,
          preferredDate: crmRecord.preferredDate,
          smsConsent: crmRecord.smsAppointmentConsent,
          sourcePagePath: crmRecord.sourcePagePath,
        },
      }),
      { status: 200, headers }
    );
  } catch {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Unable to process your request right now. Please call or text (256) 418-8199 or email hello@mojocleaningservice.com.',
      }),
      { status: 500, headers }
    );
  }
}
