import React from 'react';
import { BUSINESS_INFO } from '../config/business';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GuaranteeSection } from '../components/GuaranteeSection';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockCheckIcon,
  MojoSparkle,
  PhoneIcon,
  ShieldCheckIcon,
} from '../components/Icons';
import { QuoteForm, type SelectableServiceKey } from '../components/QuoteForm';
import { HeroWelcomeMascotBadge } from '../components/MojoMascot';
import type { LocationEntity } from '../data/entities';
import {
  getAvailableServicesForLocation,
  getLocationChecklistPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationServiceDetailPath,
} from '../utils/location-routing';

interface RequestQuotePageProps {
  location: LocationEntity;
  selectedServiceId?: SelectableServiceKey;
}

export const RequestQuotePage: React.FC<RequestQuotePageProps> = ({
  location,
  selectedServiceId = 'recurring-residential-cleaning',
}) => {
  const homeHref = getLocationHomePath(location.id);
  const quoteHref = getLocationQuotePath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);
  const availableServices = getAvailableServicesForLocation(location.id);

  const breadcrumbs = [
    { label: location.name, href: homeHref },
    { label: `Request a Quote`, href: quoteHref },
  ];

  return (
    <>
      {/* 1. Conversion-Focused Hero Header */}
      <section className="interior-hero" aria-labelledby="quote-page-hero-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>
                  {location.name} Custom Cleaning Estimate • No Obligation
                </span>
              </div>

              <h1 id="quote-page-hero-heading" className="interior-hero-title">
                Request a House Cleaning Quote in {location.fullStateName}
              </h1>

              <p className="interior-hero-lead">
                Tell us about your {location.city} residence ({location.zipCodes.join(', ')}) and
                preferred cleaning service below. Our team reviews every request and follows up
                promptly with a transparent, room-by-room quote—no pressure, no obligation.
              </p>

              <div className="interior-hero-actions">
                <a href="#quote" className="btn btn-primary btn-lg">
                  <span>Start Quote Form Below</span>
                  <ArrowRightIcon size={17} />
                </a>
                <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-lg">
                  <PhoneIcon size={17} />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <ul className="interior-hero-trust-strip" aria-label="Quote assurances">
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>Insured, Bonded &amp; Vetted Team</span>
                </li>
                <li>
                  <ClockCheckIcon size={16} className="text-coral" />
                  <span>48-Hour Happiness Guarantee</span>
                </li>
                <li>
                  <CheckCircleIcon size={16} className="text-coral" />
                  <span>56-Point Room-by-Room Standard</span>
                </li>
              </ul>
            </div>

            <div className="interior-hero-media">
              <div style={{ marginBottom: '12px' }}>
                <HeroWelcomeMascotBadge
                  location={location}
                  pose="welcome-open"
                  greeting={`Let's customize your ${location.city} cleaning quote!`}
                  subtext="Zero obligation—tell us about your rooms below and we'll follow up promptly."
                />
              </div>
              <aside className="verified-facts-card" aria-label="What happens after you submit">
                <h2 className="verified-facts-title">What Happens After You Submit?</h2>
                <dl className="verified-facts-dl">
                  <div>
                    <dt>1. We Review Your {location.city} Home Details</dt>
                    <dd>
                      Our team checks your requested service tier, approximate square footage, and
                      any custom room notes or add-on requests.
                    </dd>
                  </div>
                  <div>
                    <dt>2. You Receive a Transparent Quote</dt>
                    <dd>
                      We follow up via your preferred contact method with clear pricing and available
                      {location.city} arrival windows.
                    </dd>
                  </div>
                  <div>
                    <dt>3. Book Only When You Confirm</dt>
                    <dd>
                      Your appointment is scheduled only after you approve the scope and date.
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Interactive Quote Form (Preselected with Active Location & Service) */}
      <QuoteForm
        selectedServiceId={selectedServiceId}
        preselectedLocationId={location.id}
        contextKicker={`${location.name} • ${location.county}`}
        contextHeadline={`Customize your ${location.city} cleaning quote below.`}
        contextSubheadline={`Select your service tier, share your ${location.name} property details, and our local team will follow up promptly with your customized estimate.`}
      />

      {/* 3. 48-Hour Guarantee */}
      <GuaranteeSection />

      {/* 4. Compare Services in This Location ONLY */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="quote-compare-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Not Sure Which Service Tier to Pick?</span>
              </div>
              <h2 id="quote-compare-heading" className="section-title">
                Compare {location.name} services and our 56-point checklist.
              </h2>
            </div>
          </div>

          <div className="discovery-pillars-grid">
            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                Services Offered in {location.name}
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
                        <span>{svc.checklistPointsLabel}</span>
                      </div>
                      <ArrowRightIcon size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                {location.city} 56-Point Room Checklist
              </h3>
              <p className="discovery-panel-desc">
                See the exact difference between Standard Recurring (37 points), Deep Clean (47
                points), and Move-In/Move-Out (56 points) before submitting your request.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <a href={checklistHref} className="btn btn-outline-dark">
                  <span>View 56-Point Checklist</span>
                  <ArrowRightIcon size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
