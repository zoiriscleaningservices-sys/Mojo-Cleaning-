import React from 'react';
import { BUSINESS_INFO } from '../config/business';
import {
  CheckCircleIcon,
  MailIcon,
  MojoSparkle,
  PhoneIcon,
  ShieldCheckIcon,
} from './Icons';

export const GuaranteeSection: React.FC = () => {
  return (
    <section
      id="guarantee"
      className="guarantee-section"
      aria-labelledby="guarantee-heading"
    >
      <div className="container">
        <div className="guarantee-banner">
          <div className="guarantee-glow" aria-hidden="true" />

          <div className="guarantee-badge-col">
            <div className="guarantee-seal">
              <ShieldCheckIcon size={34} className="text-coral" />
              <span className="guarantee-seal-hours">48-HOUR</span>
              <span className="guarantee-seal-label">HAPPINESS GUARANTEE</span>
            </div>
          </div>

          <div className="guarantee-copy-col">
            <div className="guarantee-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>The Mojo Promise</span>
            </div>

            <h2 id="guarantee-heading" className="guarantee-title">
              Not quite right? Let’s make it right.
            </h2>

            <p className="guarantee-description">
              Every cleaning appointment is backed by our verified{' '}
              <strong>48-Hour Happiness Guarantee</strong>. If any area on your checklist was
              missed or does not feel up to standard, simply contact our Huntsville team within 48
              hours of your clean and we will return to re-clean the spot at no additional charge.
            </p>

            <ul className="guarantee-points">
              <li>
                <CheckCircleIcon size={16} className="text-coral" />
                <span>Report any missed detail within 48 hours of service completion</span>
              </li>
              <li>
                <CheckCircleIcon size={16} className="text-coral" />
                <span>Complimentary return visit to re-clean the affected spot</span>
              </li>
              <li>
                <CheckCircleIcon size={16} className="text-coral" />
                <span>Direct access to our local support team by phone, text, or email</span>
              </li>
            </ul>
          </div>

          <div className="guarantee-action-col">
            <div className="guarantee-contact-box">
              <span className="guarantee-box-heading">Direct Support Line</span>
              <a href={BUSINESS_INFO.phoneHref} className="guarantee-contact-link">
                <PhoneIcon size={16} />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <a href={BUSINESS_INFO.emailHref} className="guarantee-contact-link">
                <MailIcon size={16} />
                <span>{BUSINESS_INFO.email}</span>
              </a>
              <a href="#quote" className="btn btn-primary btn-full guarantee-cta-btn">
                <span>Book With Confidence</span>
                <MojoSparkle size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
