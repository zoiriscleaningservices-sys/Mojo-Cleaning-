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
import type { ServiceEntity } from '../data/entities';
import { VERIFIED_REVIEWS } from '../data/business-profile';
import { LOCATIONS_DATA } from '../data/locations-data';
import { PUBLISHED_SERVICE_LOCATIONS } from '../data/service-locations-data';
import { SERVICES_BY_ID } from '../data/services-data';

interface ServiceDetailPageProps {
  service: ServiceEntity;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service }) => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: service.name, href: service.urlPath },
  ];

  const publishedLocalGuidesForService = PUBLISHED_SERVICE_LOCATIONS.filter(
    (combo) => combo.serviceId === service.id
  );

  const relatedServices = service.relatedServiceIds
    .map((id) => SERVICES_BY_ID[id])
    .filter(Boolean);

  return (
    <>
      {/* 1. Service Hero */}
      <section className="interior-hero" aria-labelledby="service-detail-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>{service.categoryLabel}</span>
              </div>

              <h1 id="service-detail-heading" className="interior-hero-title">
                {service.name}
              </h1>

              <p className="interior-hero-lead">{service.shortDescription}</p>

              <div className="interior-hero-actions">
                <a href="#quote" className="btn btn-primary btn-lg">
                  <span>Request {service.shortName} Quote</span>
                  <ArrowRightIcon size={17} />
                </a>
                <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-lg">
                  <PhoneIcon size={17} />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <ul className="interior-hero-trust-strip" aria-label="Service guarantees">
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>Insured &amp; Bonded Specialists</span>
                </li>
                <li>
                  <ClockCheckIcon size={16} className="text-coral" />
                  <span>48-Hour Happiness Guarantee</span>
                </li>
                <li>
                  <CheckCircleIcon size={16} className="text-coral" />
                  <span>Cadence: {service.cadenceOptions.join(' • ')}</span>
                </li>
              </ul>
            </div>

            {/* 7. Relevant Imagery */}
            <div className="interior-hero-media">
              <div className="interior-media-frame">
                <picture>
                  {service.heroImage.webpMobile ? (
                    <source
                      media="(max-width: 640px)"
                      srcSet={service.heroImage.webpMobile}
                      type="image/webp"
                    />
                  ) : null}
                  <source srcSet={service.heroImage.webp} type="image/webp" />
                  <img
                    src={service.heroImage.src}
                    alt={service.heroImage.alt}
                    width={service.heroImage.width}
                    height={service.heroImage.height}
                    className="interior-media-img"
                  />
                </picture>
                <div className="interior-media-badge">
                  <MojoSparkle className="text-coral" size={16} />
                  <div>
                    <strong>{service.badge}</strong>
                    <span>{service.tagline}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Clear Explanation of the Service & 3. Who the Service is Ideal For */}
      <section className="editorial-section" aria-labelledby="service-overview-heading">
        <div className="container">
          <div className="editorial-split-layout">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Service Overview &amp; Purpose</span>
              </div>
              <h2 id="service-overview-heading" className="section-title">
                {service.tagline}
              </h2>
              {service.longDescription.map((paragraph, idx) => (
                <p key={idx} className="editorial-body-text">
                  {paragraph}
                </p>
              ))}
            </div>

            <aside className="verified-facts-card" aria-label={`Who ${service.name} is ideal for`}>
              <h3 className="verified-facts-title">Who {service.name} Is Ideal For</h3>
              <ul className="compact-check-list">
                {service.idealFor.map((item) => (
                  <li key={item}>
                    <CheckCircleIcon size={16} className="text-coral" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 4. What Is Included & 5. What Is Not Included or Requires Confirmation */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="service-scope-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Complete Room-by-Room Scope</span>
              </div>
              <h2 id="service-scope-heading" className="section-title">
                What is included in your {service.name.toLowerCase()}.
              </h2>
            </div>
            <p className="section-subtitle">
              Every visit follows a clear, verifiable room checklist. Want to customize tasks for
              your household? Just note your preferences in the quote form below.
            </p>
          </div>

          <div className="room-scope-grid">
            {service.scopeByRoom.map((roomBlock) => (
              <article key={roomBlock.roomName} className="room-scope-card">
                <h3 className="room-scope-title">{roomBlock.roomName}</h3>
                <ul className="compact-check-list">
                  {roomBlock.includedItems.map((task) => (
                    <li key={task}>
                      <CheckCircleIcon size={15} className="text-coral" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* 5. Exclusions / Requires Confirmation */}
          <div className="exclusions-callout-card">
            <div>
              <h3 className="exclusions-title">
                Items Requiring Prior Confirmation or Outside Standard Residential Scope
              </h3>
              <p className="exclusions-subtitle">
                To keep every quote accurate and protect both your home and our specialists, the
                following items are either optional add-ons or excluded from standard residential
                visits:
              </p>
            </div>
            <ul className="exclusions-list">
              {service.excludedOrConfirmationItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. How the Service Works & Customer Preparation Tips */}
      <section className="editorial-section" aria-labelledby="service-process-heading">
        <div className="container">
          <div className="editorial-split-layout">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Step-by-Step Workflow</span>
              </div>
              <h2 id="service-process-heading" className="section-title">
                How our {service.name.toLowerCase()} process works.
              </h2>

              <div className="service-steps-stack">
                {service.howItWorks.map((step) => (
                  <div key={step.title} className="service-step-row">
                    <span className="service-step-num">{step.stepNumber}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="verified-facts-card" aria-label="Preparation tips">
              <h3 className="verified-facts-title">Helpful Preparation Tips Before We Arrive</h3>
              <ul className="compact-check-list">
                {service.preparationTips.map((tip) => (
                  <li key={tip}>
                    <CheckCircleIcon size={16} className="text-coral" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="secondary-photo-preview">
                <picture>
                  {service.secondaryImage.webpMobile ? (
                    <source
                      media="(max-width: 640px)"
                      srcSet={service.secondaryImage.webpMobile}
                      type="image/webp"
                    />
                  ) : null}
                  <source srcSet={service.secondaryImage.webp} type="image/webp" />
                  <img
                    src={service.secondaryImage.src}
                    alt={service.secondaryImage.alt}
                    width={service.secondaryImage.width}
                    height={service.secondaryImage.height}
                    loading="lazy"
                    className="secondary-photo-img"
                  />
                </picture>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 8. Verified Customer Reviews */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="service-reviews-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Verified Homeowner Feedback</span>
              </div>
              <h2 id="service-reviews-heading" className="section-title">
                What Huntsville &amp; Madison homeowners say about Mojo Cleaning.
              </h2>
            </div>
            <p className="section-subtitle">
              Read verified client feedback below or visit our{' '}
              <a href="/reviews/" className="inline-editorial-link">
                Reviews &amp; 48-Hour Guarantee page
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

      {/* 9. Service-Specific FAQs */}
      <section className="editorial-section" aria-labelledby="service-faqs-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>{service.name} FAQs</span>
              </div>
              <h2 id="service-faqs-heading" className="section-title">
                Common questions about {service.name.toLowerCase()}.
              </h2>
            </div>
            <p className="section-subtitle">
              Need more details? Browse our{' '}
              <a href="/faqs/" className="inline-editorial-link">
                full FAQ directory
              </a>{' '}
              or call <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phoneDisplay}</a>.
            </p>
          </div>

          <div className="faq-cards-grid">
            {service.faqs.map((faq) => (
              <article key={faq.id} className="faq-static-card">
                <span className="faq-category-tag">{service.shortName}</span>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Available Service Areas & 11. Related Services */}
      <section
        className="editorial-section bg-warm-cream"
        aria-labelledby="service-locations-links-heading"
      >
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Where We Offer {service.name}</span>
              </div>
              <h2 id="service-locations-links-heading" className="section-title">
                Available service areas &amp; related residential services.
              </h2>
            </div>
            <p className="section-subtitle">
              We provide {service.name.toLowerCase()} across all five verified North Alabama
              communities. Select your city below or compare related service tiers.
            </p>
          </div>

          <div className="discovery-pillars-grid">
            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                {service.name} by City &amp; Community
              </h3>
              <ul className="discovery-link-list">
                {LOCATIONS_DATA.map((loc) => {
                  const directCombo = publishedLocalGuidesForService.find(
                    (c) => c.locationId === loc.id
                  );
                  const targetHref = directCombo ? directCombo.urlPath : loc.urlPath;
                  const targetLabel = directCombo
                    ? `${service.name} in ${loc.name}`
                    : `${loc.name} Service Area Hub`;
                  return (
                    <li key={loc.id}>
                      <a href={targetHref} className="discovery-link-item">
                        <div>
                          <strong>
                            <MapPinIcon size={14} className="text-coral" /> {targetLabel}
                          </strong>
                          <span>ZIPs: {loc.zipCodes.join(', ')}</span>
                        </div>
                        <ArrowRightIcon size={15} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="discovery-panel">
              <h3 className="discovery-panel-title">Related Cleaning Services</h3>
              <ul className="discovery-link-list">
                {relatedServices.map((rel) => (
                  <li key={rel.id}>
                    <a href={rel.urlPath} className="discovery-link-item">
                      <div>
                        <strong>{rel.name}</strong>
                        <span>{rel.shortDescription}</span>
                      </div>
                      <ArrowRightIcon size={15} />
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/services/#checklist-explorer" className="discovery-link-item">
                    <div>
                      <strong>Compare All 56 Room-by-Room Tasks</strong>
                      <span>Side-by-side Standard vs. Deep vs. Move-In/Out matrix</span>
                    </div>
                    <ArrowRightIcon size={15} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Quote Request Form with Service Preselected & 13. Direct Contact Action */}
      <QuoteForm
        selectedServiceId={service.id}
        contextKicker={`Request Your ${service.name} Quote`}
        contextHeadline={`Ready to schedule ${service.name.toLowerCase()}?`}
        contextSubheadline={`We have pre-selected ${service.name} for you below. Share your home’s approximate size and any priority requests, and our Huntsville team will follow up promptly.`}
      />
    </>
  );
};
