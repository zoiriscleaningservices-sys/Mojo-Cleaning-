import React from 'react';
import { BUSINESS_INFO, SERVICES, type ServiceItem } from '../config/business';
import { PRIMARY_NAV_ITEMS, type ActivePageView } from '../config/routes';
import {
  ArrowUpIcon,
  MailIcon,
  MapPinIcon,
  MojoSparkle,
  PhoneIcon,
} from './Icons';

interface SiteFooterProps {
  onSelectService: (id: ServiceItem['id']) => void;
  onChangeView: (view: ActivePageView) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onSelectService,
  onChangeView,
}) => {
  const currentYear = 2026;

  const handleNavClick = () => {
    onChangeView('home');
  };

  return (
    <footer className="site-footer" aria-labelledby="footer-brand-heading">
      <div className="container">
        <div className="footer-main-grid">
          {/* Column 1: Brand Column */}
          <div className="footer-col footer-brand-col">
            <h2 id="footer-brand-heading" className="sr-only">
              {BUSINESS_INFO.name} Footer Navigation and Contact Information
            </h2>

            <a
              href="#top"
              onClick={handleNavClick}
              className="footer-logo-plaque"
              aria-label="Mojo Cleaning — Return to homepage"
            >
              <picture>
                <source srcSet="/images/mojo-logo.webp" type="image/webp" />
                <img
                  src="/mojo-logo.png"
                  alt="Mojo Cleaning"
                  width={156}
                  height={78}
                  loading="lazy"
                  className="footer-logo-img"
                />
              </picture>
            </a>

            <p className="footer-brand-desc">
              <strong>{BUSINESS_INFO.tagline}</strong> Providing thoughtful, insured, and
              background-checked residential cleaning across Huntsville, Madison, Hampton Cove,
              Owens Cross Roads, and Athens, Alabama.
            </p>

            <div className="footer-trust-pills">
              <span>Insured &amp; Bonded</span>
              <span>•</span>
              <span>48-Hour Guarantee</span>
              <span>•</span>
              <span>Eco-Friendly Options</span>
            </div>
          </div>

          {/* Column 2: Navigation Column */}
          <div className="footer-col">
            <h3 className="footer-col-heading">Navigation</h3>
            <ul className="footer-links-list">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={item.href} onClick={handleNavClick} className="footer-link">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#checklist-explorer"
                  onClick={handleNavClick}
                  className="footer-link footer-link-highlight"
                >
                  <span>56-Point Cleaning Checklist</span>
                </a>
              </li>
              <li>
                <a href="#quote" onClick={handleNavClick} className="footer-link">
                  Request a Custom Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Column */}
          <div className="footer-col">
            <h3 className="footer-col-heading">Cleaning Services</h3>
            <ul className="footer-links-list">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href="#quote"
                    className="footer-link"
                    onClick={() => {
                      onChangeView('home');
                      onSelectService(service.id);
                    }}
                  >
                    {service.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#service-areas" onClick={handleNavClick} className="footer-link">
                  Huntsville &amp; Madison Service Areas
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Column */}
          <div className="footer-col">
            <h3 className="footer-col-heading">Contact &amp; Coverage</h3>
            <ul className="footer-contact-list">
              <li>
                <a href={BUSINESS_INFO.phoneHref} className="footer-contact-link">
                  <PhoneIcon size={16} className="text-coral" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={BUSINESS_INFO.emailHref} className="footer-contact-link">
                  <MailIcon size={16} className="text-coral" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </li>
              <li className="footer-contact-static">
                <MapPinIcon size={16} className="text-coral" />
                <div>
                  <span>Huntsville, Madison, Hampton Cove, Owens Cross Roads &amp; Athens, AL</span>
                  <a
                    href={BUSINESS_INFO.googleMaps.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-map-sublink"
                  >
                    View service region on Google Maps →
                  </a>
                </div>
              </li>
              <li className="footer-hours-note">
                <strong>Hours:</strong> {BUSINESS_INFO.officeHours.weekdays} (
                {BUSINESS_INFO.officeHours.saturday})
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Back-to-Top Row */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © {currentYear} {BUSINESS_INFO.legalName}. All rights reserved. Huntsville, Alabama.
          </p>

          <p className="footer-subtle-statement">
            <MojoSparkle className="text-coral" size={12} />
            <span>A Clean Home. A Good Mood.</span>
          </p>

          <div className="footer-legal-links">
            <a
              href="#privacy-policy"
              className="footer-legal-link"
              onClick={(e) => {
                e.preventDefault();
                onChangeView('privacy-policy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Privacy Policy
            </a>
            <span aria-hidden="true">•</span>
            <a
              href="#terms-and-conditions"
              className="footer-legal-link"
              onClick={(e) => {
                e.preventDefault();
                onChangeView('terms-and-conditions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Terms &amp; Conditions
            </a>
            <span aria-hidden="true">•</span>
            <a
              href="#top"
              onClick={handleNavClick}
              className="footer-back-to-top"
              aria-label="Scroll back to top of page"
            >
              <span>Back to top</span>
              <ArrowUpIcon size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
