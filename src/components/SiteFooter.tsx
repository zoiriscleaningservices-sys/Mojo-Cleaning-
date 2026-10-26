import React from 'react';
import { BUSINESS_INFO } from '../config/business';
import type { LocationId } from '../data/entities';
import {
  buildLocationNavigation,
  getLocationEntity,
} from '../utils/location-routing';
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ClockCheckIcon,
  MailIcon,
  MapPinIcon,
  MojoSparkle,
  PhoneIcon,
  ShieldCheckIcon,
} from './Icons';

interface SiteFooterProps {
  activeLocationId: LocationId;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ activeLocationId }) => {
  const currentYear = new Date().getFullYear();
  const activeLocation = getLocationEntity(activeLocationId);
  const nav = buildLocationNavigation(activeLocation.id);

  return (
    <footer className="site-footer" aria-labelledby="footer-brand-heading">
      <div className="container">
        <div className="footer-main-grid">
          {/* Section A: Brand */}
          <div className="footer-col-brand">
            <a
              href={nav.homeHref}
              className="footer-logo-plaque"
              aria-label={`Mojo Cleaning ${activeLocation.name} — Return to ${activeLocation.city} homepage`}
            >
              <picture>
                <source srcSet="/images/mojo-logo.webp" type="image/webp" />
                <img
                  src="/mojo-logo.png"
                  alt="Mojo Cleaning"
                  width={144}
                  height={72}
                  className="footer-logo-img"
                  loading="lazy"
                />
              </picture>
            </a>

            <h2 id="footer-brand-heading" className="sr-only">
              Mojo Cleaning — {activeLocation.fullStateName} Residential Cleaning
            </h2>

            <p className="footer-brand-desc">
              Thoughtful, checklist-driven residential cleaning across{' '}
              <strong>{activeLocation.fullStateName}</strong>. Insured, background-checked
              specialists with every supply provided.
            </p>

            <ul className="footer-trust-pills" aria-label="Verified Service Standards">
              <li>
                <ShieldCheckIcon size={14} className="text-coral" />
                <span>Insured &amp; Bonded</span>
              </li>
              <li>
                <MojoSparkle size={12} className="text-coral" />
                <span>48-Hour Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Section B: Explore (Location-Isolated) */}
          <div className="footer-col-nav">
            <h3 className="footer-col-heading">Explore {activeLocation.city}</h3>
            <ul className="footer-links-list">
              <li>
                <a href={nav.homeHref} className="footer-link">
                  {activeLocation.city} Home
                </a>
              </li>
              <li>
                <a href={nav.aboutHref} className="footer-link">
                  About Mojo Cleaning
                </a>
              </li>
              <li>
                <a href={nav.checklistHref} className="footer-link">
                  56-Point Cleaning Checklist
                </a>
              </li>
              <li>
                <a href={nav.reviewsHref} className="footer-link">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href={nav.faqsHref} className="footer-link">
                  FAQs
                </a>
              </li>
              <li>
                <a href={nav.contactHref} className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Section C: Cleaning Services (Available in Active Location) */}
          <div className="footer-col-services">
            <h3 className="footer-col-heading">Cleaning Services</h3>
            <ul className="footer-links-list">
              {nav.footerServiceItems.map((service) => (
                <li key={service.href}>
                  <a href={service.href} className="footer-link">
                    {service.label}
                  </a>
                </li>
              ))}
              <li className="footer-view-all-item">
                <a href={nav.servicesHref} className="footer-link-view-all">
                  <span>View All Services</span>
                  <ArrowRightIcon size={13} />
                </a>
              </li>
            </ul>
          </div>

          {/* Section D: Contact */}
          <div className="footer-col-contact">
            <h3 className="footer-col-heading">Contact &amp; Hours</h3>
            <ul className="footer-contact-list">
              <li>
                <a href={BUSINESS_INFO.phoneHref} className="footer-contact-link">
                  <PhoneIcon size={16} className="footer-contact-icon" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={BUSINESS_INFO.emailHref} className="footer-contact-link">
                  <MailIcon size={16} className="footer-contact-icon" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </li>
              <li className="footer-contact-static">
                <MapPinIcon size={16} className="footer-contact-icon" />
                <div>
                  <strong>{activeLocation.fullStateName} Service Area</strong>
                  <span>ZIP Codes: {activeLocation.zipCodes.join(', ')} (On-site service)</span>
                </div>
              </li>
              <li className="footer-contact-static">
                <ClockCheckIcon size={16} className="footer-contact-icon" />
                <div>
                  <strong>{BUSINESS_INFO.officeHours.weekdays}</strong>
                  <span>{BUSINESS_INFO.officeHours.saturday}</span>
                </div>
              </li>
            </ul>

            <a href={nav.quoteHref} className="btn btn-primary footer-quote-cta-btn">
              <span>Request a Quote</span>
              <ArrowRightIcon size={15} />
            </a>
          </div>
        </div>

        {/* Section F: Global Location Directory Link */}
        <div
          className="footer-location-directory-bar"
          role="region"
          aria-label="Global Location Directory Navigation"
        >
          <div className="footer-location-directory-info">
            <MapPinIcon size={16} className="text-coral" />
            <span>
              You are browsing the dedicated <strong>{activeLocation.fullStateName}</strong>{' '}
              experience. Looking for another North Alabama community?
            </span>
          </div>
          <a href={nav.allLocationsHref} className="footer-see-all-locations-link">
            <span>See All Locations</span>
            <ArrowRightIcon size={15} />
          </a>
        </div>

        {/* Section E: Bottom Utility Bar */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; {currentYear} {BUSINESS_INFO.legalName}. All rights reserved.
          </p>

          <div className="footer-legal-links">
            <a href="/privacy-policy/" className="footer-legal-link">
              Privacy Policy
            </a>
            <span className="footer-legal-sep" aria-hidden="true">
              •
            </span>
            <a href="/terms/" className="footer-legal-link">
              Terms and Conditions
            </a>
            <span className="footer-legal-sep" aria-hidden="true">
              •
            </span>
            <a
              href="#top"
              className="footer-back-to-top"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUpIcon size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
