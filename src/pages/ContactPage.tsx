import React from 'react';
import { BUSINESS_INFO } from '../config/business';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockCheckIcon,
  MailIcon,
  MapPinIcon,
  MojoSparkle,
  PhoneIcon,
  ShieldCheckIcon,
} from '../components/Icons';
import { QuoteForm } from '../components/QuoteForm';
import { HeroWelcomeMascotBadge } from '../components/MojoMascot';
import type { LocationEntity } from '../data/entities';
import {
  getAvailableServicesForLocation,
  getLocationContactPath,
  getLocationHomePath,
  getLocationServiceDetailPath,
} from '../utils/location-routing';

interface ContactPageProps {
  location: LocationEntity;
}

export const ContactPage: React.FC<ContactPageProps> = ({ location }) => {
  const homeHref = getLocationHomePath(location.id);
  const contactHref = getLocationContactPath(location.id);
  const availableServices = getAvailableServicesForLocation(location.id);

  const breadcrumbs = [
    { label: location.name, href: homeHref },
    { label: `Contact ${location.city} Team`, href: contactHref },
  ];

  return (
    <>
      {/* 1. Location-Specific Contact Hero */}
      <section className="interior-hero" aria-labelledby="contact-hero-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>
                  {location.name} Service Area • Direct Dispatch &amp; Fast Quotes
                </span>
              </div>

              <h1 id="contact-hero-heading" className="interior-hero-title">
                Contact Mojo Cleaning in {location.fullStateName}
              </h1>

              <p className="interior-hero-lead">
                Reach out to our team by phone, text, email, or our custom quote form below for
                homes in {location.fullStateName} ({location.zipCodes.join(', ')}). We review every
                inquiry promptly and provide clear, transparent pricing tailored to your rooms and
                schedule.
              </p>

              <div className="interior-hero-actions">
                <a href={BUSINESS_INFO.phoneHref} className="btn btn-primary btn-lg">
                  <PhoneIcon size={17} />
                  <span>Call or Text {BUSINESS_INFO.phoneDisplay}</span>
                </a>
                <a href={BUSINESS_INFO.emailHref} className="btn btn-outline-dark btn-lg">
                  <MailIcon size={17} />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </div>

              <ul className="interior-hero-trust-strip" aria-label="Contact highlights">
                <li>
                  <ClockCheckIcon size={16} className="text-coral" />
                  <span>{BUSINESS_INFO.officeHours.weekdays}</span>
                </li>
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>Insured, Bonded &amp; Vetted Team</span>
                </li>
                <li>
                  <CheckCircleIcon size={16} className="text-coral" />
                  <span>48-Hour Happiness Guarantee</span>
                </li>
              </ul>
            </div>

            <div className="interior-hero-media">
              <div style={{ marginBottom: '12px' }}>
                <HeroWelcomeMascotBadge
                  location={location}
                  pose="welcome-open"
                  greeting={`We'd love to hear from you in ${location.city}!`}
                  subtext="Call, text, email, or request your custom room-by-room quote below."
                />
              </div>
              <aside className="verified-facts-card" aria-label="Direct contact channels">
                <h2 className="verified-facts-title">
                  {location.name} Contact &amp; Coverage Details
                </h2>
                <dl className="verified-facts-dl">
                  <div>
                    <dt>Phone &amp; Text</dt>
                    <dd>
                      <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phoneDisplay}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={BUSINESS_INFO.emailHref}>{BUSINESS_INFO.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Office &amp; Scheduling Hours</dt>
                    <dd>
                      {BUSINESS_INFO.officeHours.weekdays}
                      <br />
                      {BUSINESS_INFO.officeHours.saturday} • {BUSINESS_INFO.officeHours.sunday}
                    </dd>
                  </div>
                  <div>
                    <dt>{location.city} Service Coverage</dt>
                    <dd>
                      {location.fullStateName} ({location.county}) • ZIP Codes:{' '}
                      {location.zipCodes.join(', ')}
                    </dd>
                  </div>
                  <div>
                    <dt>Service-Area Disclosure</dt>
                    <dd>{location.aboutContent.serviceAreaClarification}</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Embedded Quote Request Form */}
      <QuoteForm
        preselectedLocationId={location.id}
        contextKicker={`${location.name} Online Quote Request`}
        contextHeadline={`Tell us about your ${location.city} home and preferred service.`}
      />

      {/* 3. Services & Neighborhoods in This Location ONLY */}
      <section
        className="editorial-section bg-warm-cream"
        aria-labelledby="contact-directory-heading"
      >
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Explore {location.name} Services &amp; Communities</span>
              </div>
              <h2 id="contact-directory-heading" className="section-title">
                Compare our services and neighborhoods served in {location.city}.
              </h2>
            </div>
          </div>

          <div className="discovery-pillars-grid">
            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                Cleaning Services in {location.name}
              </h3>
              <ul className="discovery-link-list">
                {availableServices.map((svc) => (
                  <li key={svc.id}>
                    <a
                      href={getLocationServiceDetailPath(location.id, svc.slug)}
                      className="discovery-link-item"
                    >
                      <div>
                        <strong>
                          {svc.name} in {location.city}
                        </strong>
                        <span>{svc.cadenceOptions.join(' • ')}</span>
                      </div>
                      <ArrowRightIcon size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                {location.city} Neighborhoods &amp; Corridors Served
              </h3>
              <div className="discovery-chip-grid">
                {location.neighborhoods.map((hood) => (
                  <span key={hood} className="static-neighborhood-pill">
                    <MapPinIcon size={14} className="text-coral" />
                    <span>{hood}</span>
                  </span>
                ))}
              </div>
              <p className="discovery-panel-desc" style={{ marginTop: '1rem' }}>
                <strong>Verified ZIP Codes:</strong> {location.zipCodes.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
