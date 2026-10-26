import React from 'react';
import { BUSINESS_INFO } from '../config/business';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockCheckIcon,
  MapPinIcon,
  MojoSparkle,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
} from '../components/Icons';
import { QuoteForm } from '../components/QuoteForm';
import type { LocationEntity } from '../data/entities';
import { VERIFIED_REVIEWS } from '../data/business-profile';
import { LOCATIONS_BY_ID } from '../data/locations-data';
import { PUBLISHED_SERVICE_LOCATIONS } from '../data/service-locations-data';
import { SERVICES_BY_ID } from '../data/services-data';

interface LocationDetailPageProps {
  location: LocationEntity;
}

export const LocationDetailPage: React.FC<LocationDetailPageProps> = ({ location }) => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Service Areas', href: '/locations/' },
    { label: location.name, href: location.urlPath },
  ];

  const availableServices = location.availableServiceIds
    .map((id) => SERVICES_BY_ID[id])
    .filter(Boolean);

  const publishedCityCombos = PUBLISHED_SERVICE_LOCATIONS.filter(
    (combo) => combo.locationId === location.id
  );

  const nearbyLocations = location.nearbyLocationIds
    .map((id) => LOCATIONS_BY_ID[id])
    .filter(Boolean);

  return (
    <>
      {/* 1. Location Hero & 2. Service Availability Confirmation */}
      <section className="interior-hero" aria-labelledby="location-detail-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>
                  Verified Service Area • {location.county} • {location.regionLabel}
                </span>
              </div>

              <h1 id="location-detail-heading" className="interior-hero-title">
                House Cleaning in {location.name}
              </h1>

              <p className="interior-hero-lead">{location.shortSummary}</p>

              <div className="location-availability-banner">
                <CheckCircleIcon size={18} className="text-coral" />
                <div>
                  <strong>Confirmed On-Site Coverage in {location.name}</strong>
                  <span>
                    ZIP Codes Served: {location.zipCodes.join(', ')} •{' '}
                    {location.serviceAvailabilityNote}
                  </span>
                </div>
              </div>

              <div className="interior-hero-actions">
                <a href="#quote" className="btn btn-primary btn-lg">
                  <span>Request a {location.city} Quote</span>
                  <ArrowRightIcon size={17} />
                </a>
                <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-lg">
                  <PhoneIcon size={17} />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <ul className="interior-hero-trust-strip" aria-label="Local service credentials">
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>Insured, Bonded &amp; Background-Checked</span>
                </li>
                <li>
                  <ClockCheckIcon size={16} className="text-coral" />
                  <span>48-Hour Happiness Guarantee</span>
                </li>
                <li>
                  <MapPinIcon size={16} className="text-coral" />
                  <span>All Supplies &amp; Equipment Provided</span>
                </li>
              </ul>
            </div>

            {/* 7. Embedded Google Map for this City */}
            <div className="interior-hero-media">
              <div className="map-frame-card">
                <div className="map-card-topbar">
                  <div className="map-topbar-title">
                    <MapPinIcon size={16} className="text-coral" />
                    <span>{location.name} Coverage Area</span>
                  </div>
                  <span className="map-sab-badge">On-Site Dispatch</span>
                </div>

                <div className="map-iframe-container">
                  <iframe
                    src={location.mapEmbedUrl}
                    title={`Mojo Cleaning Service Area Map — ${location.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="service-area-iframe"
                    allowFullScreen
                  />
                </div>

                <div className="map-card-footer">
                  <p className="map-footer-note">{location.commuteAndLifestyleContext}</p>
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-external-link"
                  >
                    <span>Open {location.city} in Google Maps</span>
                    <ArrowRightIcon size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Genuine Local Context & Neighborhoods Served */}
      <section className="editorial-section" aria-labelledby="local-context-heading">
        <div className="container">
          <div className="editorial-split-layout">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Local Home Care in {location.city}</span>
              </div>
              <h2 id="local-context-heading" className="section-title">
                Tailored residential cleaning for {location.city} homes &amp; neighborhoods.
              </h2>
              {location.localIntroduction.map((para, idx) => (
                <p key={idx} className="editorial-body-text">
                  {para}
                </p>
              ))}
              <p className="editorial-body-text">
                <strong>Housing &amp; Surface Care Focus:</strong> {location.localHousingContext}
              </p>
            </div>

            <aside
              className="verified-facts-card"
              aria-label={`Neighborhoods served in ${location.city}`}
            >
              <h3 className="verified-facts-title">
                {location.city} Neighborhoods &amp; Communities We Serve
              </h3>
              <ul className="compact-check-list">
                {location.neighborhoods.map((neighborhood) => (
                  <li key={neighborhood}>
                    <MapPinIcon size={15} className="text-coral" />
                    <span>{neighborhood}</span>
                  </li>
                ))}
              </ul>
              <div className="neighborhood-zip-note">
                <strong>Confirmed ZIP Codes:</strong> {location.zipCodes.join(', ')}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 4. Available Services in This Location */}
      <section
        className="editorial-section bg-warm-cream"
        aria-labelledby="location-services-heading"
      >
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Services Available in {location.name}</span>
              </div>
              <h2 id="location-services-heading" className="section-title">
                Residential cleaning services available in {location.city}.
              </h2>
            </div>
            <p className="section-subtitle">
              All five Mojo Cleaning residential tiers are available for homes in {location.city}.
              Choose a service below to explore local scope or request a quote.
            </p>
          </div>

          <div className="room-scope-grid">
            {availableServices.map((svc) => {
              const localCombo = publishedCityCombos.find((c) => c.serviceId === svc.id);
              const primaryHref = localCombo ? localCombo.urlPath : svc.urlPath;
              const primaryCtaText = localCombo
                ? `Explore ${svc.name} in ${location.city}`
                : `View ${svc.name} Checklist`;

              return (
                <article key={svc.id} className="room-scope-card">
                  <div className="service-card-eyebrow">
                    <MojoSparkle className="text-coral" size={13} />
                    <span>{svc.categoryLabel}</span>
                  </div>
                  <h3 className="room-scope-title">
                    <a href={primaryHref}>
                      {svc.name} in {location.city}
                    </a>
                  </h3>
                  <p className="editorial-body-text">{svc.shortDescription}</p>
                  <ul className="compact-check-list">
                    {svc.includedHighlights.slice(0, 3).map((t) => (
                      <li key={t}>
                        <CheckCircleIcon size={15} className="text-coral" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="location-service-card-links">
                    <a href={primaryHref} className="btn btn-primary btn-sm">
                      <span>{primaryCtaText}</span>
                      <ArrowRightIcon size={14} />
                    </a>
                    {localCombo ? (
                      <a href={svc.urlPath} className="service-checklist-jump">
                        Full {svc.shortName} Overview →
                      </a>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Verified Reviews */}
      <section className="editorial-section" aria-labelledby="location-reviews-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Verified Client Feedback</span>
              </div>
              <h2 id="location-reviews-heading" className="section-title">
                Trusted by homeowners across {location.city} &amp; Madison County.
              </h2>
            </div>
            <p className="section-subtitle">
              Every visit in {location.city} is backed by our{' '}
              <a href="/reviews/" className="inline-editorial-link">
                48-Hour Happiness Guarantee
              </a>
              .
            </p>
          </div>

          <div className="reviews-grid">
            {VERIFIED_REVIEWS.map((review) => (
              <article key={review.id} className="review-card">
                <div className="review-stars" aria-label="Verified client feedback">
                  {[...Array(5)].map((_, idx) => (
                    <StarIcon key={idx} size={16} className="text-coral" />
                  ))}
                </div>
                <blockquote className="review-quote">“{review.quote}”</blockquote>
                <footer className="review-footer">
                  <div>
                    <strong className="review-author">{review.author}</strong>
                    <span className="review-meta">
                      {review.locationLabel} • {review.serviceLabel}
                    </span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Location-Specific FAQs & 9. Nearby Service Areas */}
      <section
        className="editorial-section bg-warm-cream"
        aria-labelledby="location-faqs-heading"
      >
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>{location.city} Cleaning FAQs</span>
              </div>
              <h2 id="location-faqs-heading" className="section-title">
                Questions about house cleaning in {location.name}.
              </h2>
            </div>
            <p className="section-subtitle">
              Have more questions? Visit our{' '}
              <a href="/faqs/" className="inline-editorial-link">
                complete FAQ hub
              </a>{' '}
              or call <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phoneDisplay}</a>.
            </p>
          </div>

          <div className="faq-cards-grid">
            {location.faqs.map((faq) => (
              <article key={faq.id} className="faq-static-card">
                <span className="faq-category-tag">{location.name}</span>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>

          {/* 9. Nearby Service Areas */}
          <div className="nearby-areas-strip">
            <h3>Nearby North Alabama Service Areas</h3>
            <div className="discovery-chip-grid">
              {nearbyLocations.map((near) => (
                <a key={near.id} href={near.urlPath} className="discovery-location-chip">
                  <MapPinIcon size={14} className="text-coral" />
                  <span>
                    {near.name} ({near.zipCodes.join(', ')})
                  </span>
                </a>
              ))}
              <a href="/locations/" className="discovery-location-chip">
                <span>View All Service Areas →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Preselected Quote Form */}
      <QuoteForm
        preselectedLocationId={location.id}
        contextKicker={`Custom Quote for ${location.name}`}
        contextHeadline={`Ready for a spotless home in ${location.city}?`}
        contextSubheadline={`We have pre-filled ${location.name} in your quote form below. Choose your desired cleaning service and our team will follow up promptly.`}
      />
    </>
  );
};
