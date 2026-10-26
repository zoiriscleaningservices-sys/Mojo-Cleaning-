import React from 'react';
import { BUSINESS_INFO } from '../config/business';
import type { ActivePageView } from '../config/routes';
import { ArrowRightIcon, MojoSparkle } from './Icons';

interface LegalViewProps {
  view: 'privacy-policy' | 'terms-and-conditions';
  onReturnHome: () => void;
  onSwitchView: (view: ActivePageView) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({
  view,
  onReturnHome,
  onSwitchView,
}) => {
  const isPrivacy = view === 'privacy-policy';

  return (
    <section className="legal-section" aria-labelledby="legal-heading">
      <div className="container legal-container">
        <div className="legal-top-nav">
          <button type="button" className="btn btn-outline-dark btn-sm" onClick={onReturnHome}>
            ← Back to Mojo Cleaning Homepage
          </button>

          <div className="legal-switcher">
            <button
              type="button"
              className={`legal-switch-btn ${isPrivacy ? 'is-active' : ''}`}
              onClick={() => onSwitchView('privacy-policy')}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className={`legal-switch-btn ${!isPrivacy ? 'is-active' : ''}`}
              onClick={() => onSwitchView('terms-and-conditions')}
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>

        {isPrivacy ? (
          <article className="legal-card">
            <div className="section-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>Transparency &amp; Trust</span>
            </div>
            <h1 id="legal-heading" className="legal-title">
              Privacy Policy
            </h1>
            <p className="legal-meta">
              Updated: June 01, 2026 • {BUSINESS_INFO.legalName} ({BUSINESS_INFO.primaryRegionLabel})
            </p>

            <div className="legal-prose">
              <h2>1. Introduction</h2>
              <p>
                This Privacy Policy outlines the policies and procedures of {BUSINESS_INFO.legalName}{' '}
                (“{BUSINESS_INFO.name},” “we,” “our,” or “us”) for collecting, using, and
                protecting your information when you visit {BUSINESS_INFO.domain}, request a
                cleaning quote, or use our residential cleaning services.
              </p>

              <h2>2. Information We Collect</h2>
              <p>
                When you request a quote or schedule a cleaning appointment, we collect only the
                personal contact and property information necessary to respond to your inquiry and
                deliver your service—such as your name, telephone number, email address, service
                address or ZIP code, and cleaning preferences (“Personal Contact Information”).
              </p>

              <h2>3. How We Use &amp; Protect Your Data</h2>
              <p>
                We use your Personal Contact Information to prepare custom cleaning quotes, confirm
                appointments, send service reminders, and provide customer support.{' '}
                <strong>
                  Mojo Cleaning does not sell, rent, or trade your personal information to third
                  parties.
                </strong>{' '}
                No mobile information will be shared with third parties or affiliates for
                marketing or promotional purposes. Text messaging originator opt-in data and
                consent will not be shared with any third parties.
              </p>

              <h2>4. Payment Security</h2>
              <p>
                {BUSINESS_INFO.name} does not store raw credit card numbers on this website. Online
                billing and payment transactions are processed securely through PCI-compliant
                payment processors such as Stripe.
              </p>

              <h2>5. Mojo Cleaning Text &amp; SMS Program</h2>
              <p>
                If you explicitly opt in to receive SMS notifications on our quote or scheduling
                forms, you may receive appointment confirmations, reminders, and follow-up messages
                about your cleaning service. You can cancel SMS messages at any time by texting{' '}
                <strong>STOP</strong> to {BUSINESS_INFO.phoneDisplay}. For assistance, reply{' '}
                <strong>HELP</strong> or email{' '}
                <a href={BUSINESS_INFO.emailHref}>{BUSINESS_INFO.email}</a>. Message and data rates
                may apply; message frequency varies. Carriers are not liable for delayed or
                undelivered messages.
              </p>

              <h2>6. Contact Us</h2>
              <p>
                For questions regarding this Privacy Policy or to request access, correction, or
                deletion of your data, contact {BUSINESS_INFO.legalName} at{' '}
                <a href={BUSINESS_INFO.emailHref}>{BUSINESS_INFO.email}</a> or call{' '}
                <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phoneDisplay}</a> in Huntsville,
                Alabama.
              </p>
            </div>
          </article>
        ) : (
          <article className="legal-card">
            <div className="section-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>Compliance &amp; Service Agreement</span>
            </div>
            <h1 id="legal-heading" className="legal-title">
              Terms &amp; Conditions
            </h1>
            <p className="legal-meta">
              Effective Date: January 1, 2026 • {BUSINESS_INFO.legalName} (Huntsville, Alabama)
            </p>

            <div className="legal-prose">
              <h2>1. Service Quotes &amp; Appointments</h2>
              <p>
                Submitting a quote request through {BUSINESS_INFO.domain} does not automatically
                book a cleaning appointment. Our Huntsville team reviews your property details and
                follows up to confirm scope, pricing, and scheduling availability.
              </p>

              <h2>2. 48-Hour Happiness Guarantee</h2>
              <p>
                Every completed cleaning service is backed by our 48-Hour Happiness Guarantee. If
                any checklist item was overlooked during your appointment, notify{' '}
                {BUSINESS_INFO.name} within 48 hours at{' '}
                <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phoneDisplay}</a> or{' '}
                <a href={BUSINESS_INFO.emailHref}>{BUSINESS_INFO.email}</a>, and we will return to
                re-clean the affected area at no additional charge.
              </p>

              <h2>3. SMS Messaging Terms &amp; Compliance</h2>
              <p>
                By opting in to our SMS program via our web forms, you consent to receive
                scheduling confirmations, appointment reminders, and customer support messages from{' '}
                {BUSINESS_INFO.legalName}. You may opt out at any time by texting{' '}
                <strong>STOP</strong>. Reply <strong>HELP</strong> for support or contact{' '}
                <a href={BUSINESS_INFO.emailHref}>{BUSINESS_INFO.email}</a>. Message and data rates
                may apply. You must be 18 years or older to participate.
              </p>

              <h2>4. Intellectual Property &amp; Governing Law</h2>
              <p>
                All content, branding, logos, and materials on this website are the property of{' '}
                {BUSINESS_INFO.legalName}. These Terms of Service are governed by and construed in
                accordance with the laws of the State of Alabama, in Huntsville, Madison County,
                Alabama.
              </p>
            </div>
          </article>
        )}

        <div className="legal-bottom-cta">
          <button type="button" className="btn btn-primary" onClick={onReturnHome}>
            <span>Return to Homepage &amp; Quote Form</span>
            <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
