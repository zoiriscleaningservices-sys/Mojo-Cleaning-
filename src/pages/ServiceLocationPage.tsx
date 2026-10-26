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
} from '../components/Icons';
import { QuoteForm } from '../components/QuoteForm';
import { HeroTeamShowcase } from '../components/HeroTeamShowcase';
import { ResidentialServicesSuite } from '../components/ResidentialServicesSuite';
import type {
  LocationEntity,
  ServiceEntity,
  ServiceLocationEntity,
} from '../data/entities';
import { SERVICE_ANSWER_FIRST_GUIDES } from '../data/seo-domination-system';
import {
  getAvailableServicesForLocation,
  getLocationChecklistPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationServiceDetailPath,
  getLocationServicesPath,
} from '../utils/location-routing';

interface ServiceLocationPageProps {
  combo: ServiceLocationEntity;
  service: ServiceEntity;
  location: LocationEntity;
}

interface ServiceOutlineHeadings {
  includesH2: string;
  whenToConsiderH2: string;
  processH2: string;
  comparisonH2: string;
  comparisonSummary: string;
  faqsH2: string;
  quoteH2: (city: string) => string;
}

const SERVICE_OUTLINE_HEADINGS: Record<ServiceEntity['id'], ServiceOutlineHeadings> = {
  'deep-house-cleaning': {
    includesH2: 'What Our Deep Cleaning Service Includes',
    whenToConsiderH2: 'When to Consider a Deep Cleaning',
    processH2: 'Our Deep Cleaning Process',
    comparisonH2: 'Deep Cleaning vs. Recurring House Cleaning',
    comparisonSummary:
      'While our 37-point Recurring House Cleaning maintains surfaces that are already in good baseline condition on a weekly, biweekly, or monthly schedule, our 47-point Deep Cleaning adds 10 intensive hand-detailing tasks—including hand-wiped baseboards, interior doors and frames, cabinet exteriors, switch plates, and deeper bathroom/kitchen descaling.',
    faqsH2: 'Deep Cleaning Questions Answered',
    quoteH2: (city) => `Request a Deep Cleaning Quote in ${city}`,
  },
  'recurring-residential-cleaning': {
    includesH2: 'What Our Recurring House Cleaning Service Includes',
    whenToConsiderH2: 'When to Consider Recurring House Cleaning',
    processH2: 'Our Recurring Cleaning Process',
    comparisonH2: 'Recurring House Cleaning vs. One-Time Deep Cleaning',
    comparisonSummary:
      'Our 37-point Recurring House Cleaning is designed for ongoing weekly, biweekly, or monthly maintenance across kitchens, bathrooms, bedrooms, and living areas. Many households start with an initial 47-point Deep Cleaning to hand-wipe baseboards, doors, and cabinet exteriors before locking in recurring maintenance.',
    faqsH2: 'Recurring Cleaning Questions Answered',
    quoteH2: (city) => `Request a Recurring Cleaning Quote in ${city}`,
  },
  'move-in-cleaning': {
    includesH2: 'What Our Move-In Cleaning Service Includes',
    whenToConsiderH2: 'When to Schedule a Move-In Cleaning',
    processH2: 'Our Move-In Cleaning Process',
    comparisonH2: 'Move-In Cleaning vs. Standard Deep Cleaning',
    comparisonSummary:
      'Unlike a 47-point Deep Cleaning for a furnished residence, our 56-point Move-In Cleaning is performed while your new home is vacant—adding full interior sanitization inside every kitchen cabinet, drawer, pantry shelf, bathroom vanity, bedroom closet, oven, and refrigerator, plus wet-wiped window blinds.',
    faqsH2: 'Move-In Cleaning Questions Answered',
    quoteH2: (city) => `Request a Move-In Cleaning Quote in ${city}`,
  },
  'move-out-cleaning': {
    includesH2: 'What Our Move-Out Cleaning Service Includes',
    whenToConsiderH2: 'When to Schedule a Move-Out Cleaning',
    processH2: 'Our Move-Out Cleaning Process',
    comparisonH2: 'Move-Out Cleaning vs. Standard Deep Cleaning',
    comparisonSummary:
      'Our 56-point Move-Out Cleaning goes beyond a 47-point occupied Deep Cleaning by detailing inside every empty cabinet, drawer, closet shelf, oven, and refrigerator, wet-wiping window blinds, and providing itemized completion receipts for property managers, landlords, and closing walk-throughs.',
    faqsH2: 'Move-Out Cleaning Questions Answered',
    quoteH2: (city) => `Request a Move-Out Cleaning Quote in ${city}`,
  },
  'post-construction-cleaning': {
    includesH2: 'What Our Post-Construction Cleaning Service Includes',
    whenToConsiderH2: 'When to Schedule Post-Construction Cleaning',
    processH2: 'Our Post-Construction Cleaning Process',
    comparisonH2: 'Post-Construction Cleaning vs. Move-In Cleaning',
    comparisonSummary:
      'While both services sanitize empty cabinets, closets, and appliances, Post-Construction Cleaning adds a specialized dry-to-wet HEPA vacuuming and multi-pass microfiber protocol specifically engineered to extract fine sheetrock, drywall, and sawdust particles without scratching brand-new stone, glass, or flooring.',
    faqsH2: 'Post-Construction Cleaning Questions Answered',
    quoteH2: (city) => `Request a Post-Construction Cleaning Quote in ${city}`,
  },
};

export const ServiceLocationPage: React.FC<ServiceLocationPageProps> = ({
  combo,
  service,
  location,
}) => {
  const homeHref = getLocationHomePath(location.id);
  const servicesHref = getLocationServicesPath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);
  const quoteHref = `${getLocationQuotePath(location.id)}?service=${service.slug}`;

  const breadcrumbs = [
    { label: location.name, href: homeHref },
    { label: 'Services', href: servicesHref },
    { label: service.name, href: combo.urlPath },
  ];

  // Related services within the SAME location ONLY (strict location isolation)
  const otherServicesInLocation = getAvailableServicesForLocation(location.id).filter(
    (s) => s.id !== service.id
  );
  const answerFirstGuide = SERVICE_ANSWER_FIRST_GUIDES[service.id];
  const outline = SERVICE_OUTLINE_HEADINGS[service.id];

  return (
    <>
      {/* 1. Location-Specific Service Headline & Clear Summary */}
      <section className="interior-hero" aria-labelledby="combo-hero-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>
                  {location.name} • {service.categoryLabel} • {service.checklistPointsLabel}
                </span>
              </div>

              <h1 id="combo-hero-heading" className="interior-hero-title">
                {combo.headline}
              </h1>

              <p className="interior-hero-lead">{combo.subheadline}</p>

              <div className="location-availability-banner">
                <CheckCircleIcon size={18} className="text-coral" />
                <div>
                  <strong>
                    Confirmed {service.name} Coverage in {location.name}
                  </strong>
                  <span>
                    ZIP Codes: {location.zipCodes.join(', ')} • {location.county} •{' '}
                    {combo.localSchedulingNote}
                  </span>
                </div>
              </div>

              <div className="interior-hero-actions">
                <a href={quoteHref} className="btn btn-primary btn-lg">
                  <span>
                    Request {service.shortName} Quote in {location.city}
                  </span>
                  <ArrowRightIcon size={17} />
                </a>
                <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-lg">
                  <PhoneIcon size={17} />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <ul className="interior-hero-trust-strip" aria-label="Service credentials">
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>Insured &amp; Bonded LLC</span>
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

            <div className="interior-hero-media">
              <HeroTeamShowcase
                location={location}
                variant="service-detail"
                serviceId={service.id}
                serviceTag={`${service.name} • ${service.checklistPointsLabel}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* H2 #1: What Our [Service] Service Includes */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="combo-scope-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Verified Room-by-Room Checklist</span>
              </div>
              <h2 id="combo-scope-heading" className="section-title">
                {outline.includesH2}
              </h2>
            </div>
            <p className="section-subtitle">
              Every {location.city} appointment follows our structured room checklist. You can also
              compare all three checklist tiers side by side on our{' '}
              <a href={checklistHref} className="inline-editorial-link">
                {location.city} 56-point cleaning checklist page
              </a>
              .
            </p>
          </div>

          {answerFirstGuide ? (
            <div
              id="direct-answer"
              className="local-guidance-callout"
              style={{ marginBottom: '1.5rem' }}
              aria-label={`Summary of what is included in ${service.name}`}
            >
              <h3>Scope Overview ({service.checklistPointsLabel})</h3>
              <p>{answerFirstGuide.directAnswerSummary}</p>
            </div>
          ) : null}

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
        </div>
      </section>

      {/* H2 #2: When to Consider a [Service] */}
      <section className="editorial-section" aria-labelledby="combo-local-explanation-heading">
        <div className="container">
          <div className="editorial-split-layout">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Tailored for {location.name} Residences</span>
              </div>
              <h2 id="combo-local-explanation-heading" className="section-title">
                {outline.whenToConsiderH2}
              </h2>

              {combo.introParagraphs.map((para, idx) => (
                <p key={idx} className="editorial-body-text">
                  {para}
                </p>
              ))}

              <div className="local-guidance-callout">
                <h3>Ideal Household Scenarios</h3>
                <ul className="compact-check-list">
                  {service.idealFor.map((item) => (
                    <li key={item}>
                      <CheckCircleIcon size={15} className="text-coral" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="local-guidance-callout" style={{ marginTop: '1.25rem' }}>
                <h3>Local Guidance for {location.city} Homes</h3>
                <p>{combo.localCustomerGuidance}</p>
              </div>
            </div>

            <aside className="verified-facts-card" aria-label="Local booking highlights">
              <h3 className="verified-facts-title">
                Why Homeowners Book This Service
              </h3>
              <ul className="compact-check-list">
                {combo.whyLocalHomeownersChoose.map((reason) => (
                  <li key={reason.title}>
                    <CheckCircleIcon size={16} className="text-coral" />
                    <span>
                      <strong>{reason.title}:</strong> {reason.detail}
                    </span>
                  </li>
                ))}
              </ul>

              <hr className="card-divider" />

              <h3 className="sub-card-heading">
                {location.city} Neighborhoods &amp; Corridors Served
              </h3>
              <div className="discovery-chip-grid">
                {combo.neighborhoodSpotlight.map((hood) => (
                  <span key={hood} className="static-neighborhood-pill">
                    <MapPinIcon size={13} className="text-coral" />
                    <span>{hood}</span>
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* H2 #3: Our [Service] Process */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="service-boundaries-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Clear Service Stages, Pricing Factors &amp; Preparation</span>
              </div>
              <h2 id="service-boundaries-heading" className="section-title">
                {outline.processH2}
              </h2>
            </div>
            <p className="section-subtitle">
              We believe in transparent expectations, clear service boundaries, and straightforward quote factors before our team arrives at your {location.name} door.
            </p>
          </div>

          <div className="expectation-cards-grid">
            <article className="expectation-card">
              <span className="expectation-step-tag">Stage 1 • Scope &amp; Customizations</span>
              <h3>Key Included Tasks &amp; Customizations</h3>
              <ul className="compact-check-list">
                {service.includedHighlights.map((addon) => (
                  <li key={addon}>
                    <CheckCircleIcon size={15} className="text-coral" />
                    <span>{addon}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="expectation-card">
              <span className="expectation-step-tag">Stage 2 • Pre-Visit Preparation</span>
              <h3>How to Prepare Before Our Team Arrives</h3>
              <ul className="compact-check-list">
                {service.preparationTips.map((step) => (
                  <li key={step}>
                    <CheckCircleIcon size={15} className="text-coral" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="expectation-card">
              <span className="expectation-step-tag">Stage 3 • Safety &amp; Scope Boundaries</span>
              <h3>What Is Not Included / Requires Confirmation</h3>
              <ul className="compact-check-list">
                {service.excludedOrConfirmationItems.map((exclusion) => (
                  <li key={exclusion}>
                    <span className="text-coral" aria-hidden="true">
                      •
                    </span>
                    <span>{exclusion}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {answerFirstGuide ? (
            <div className="discovery-pillars-grid" style={{ marginTop: '1.75rem' }}>
              <div className="discovery-panel">
                <h3 className="discovery-panel-title">
                  What Affects the Cost of Your Quote?
                </h3>
                <p className="discovery-panel-desc">
                  Every {location.city} estimate is tailored to your property rather than a one-size-fits-all guess. Here are the primary factors we evaluate when preparing your house cleaning quote:
                </p>
                <ul className="compact-check-list">
                  {answerFirstGuide.pricingFactors.map((pf) => (
                    <li key={pf.factor}>
                      <CheckCircleIcon size={15} className="text-coral" />
                      <span>
                        <strong>{pf.factor}:</strong> {pf.impactExplanation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="discovery-panel">
                <h3 className="discovery-panel-title">
                  Step-by-Step Home Preparation Checklist
                </h3>
                <p className="discovery-panel-desc">
                  Follow these practical steps before your appointment so our specialists can focus 100% of their time on detailing your surfaces:
                </p>
                <ul className="compact-check-list">
                  {answerFirstGuide.preparationSteps.map((prep) => (
                    <li key={prep.step}>
                      <CheckCircleIcon size={15} className="text-coral" />
                      <span>
                        <strong>{prep.step}:</strong> {prep.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* H2 #4: Service Comparison & Related Services Within the SAME Location ONLY */}
      <section className="editorial-section" aria-labelledby="combo-related-links-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Compare Service Scopes</span>
              </div>
              <h2 id="combo-related-links-heading" className="section-title">
                {outline.comparisonH2}
              </h2>
            </div>
            <p className="section-subtitle">
              {outline.comparisonSummary} Return to the{' '}
              <a href={homeHref} className="inline-editorial-link">
                {location.name} Homepage
              </a>{' '}
              or view{' '}
              <a href={servicesHref} className="inline-editorial-link">
                all {location.city} cleaning services
              </a>
              .
            </p>
          </div>

          <div className="discovery-pillars-grid">
            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                Other Cleaning Services in {location.name}
              </h3>
              <ul className="discovery-link-list">
                {otherServicesInLocation.map((otherSvc) => {
                  const targetHref = getLocationServiceDetailPath(location.id, otherSvc.slug);
                  return (
                    <li key={otherSvc.id}>
                      <a href={targetHref} className="discovery-link-item">
                        <div>
                          <strong>
                            {otherSvc.name} in {location.name}
                          </strong>
                          <span>
                            {otherSvc.categoryLabel} • {otherSvc.checklistPointsLabel}
                          </span>
                        </div>
                        <ArrowRightIcon size={15} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                Compare All 56 Room-by-Room Tasks
              </h3>
              <p className="discovery-panel-desc">
                Want to compare {service.name} side by side with our other {location.city}{' '}
                cleaning tiers? Explore our full 56-point room-by-room breakdown.
              </p>
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={checklistHref} className="btn btn-outline-dark">
                  <span>View 56-Point Checklist</span>
                  <ArrowRightIcon size={15} />
                </a>
                <a href={quoteHref} className="btn btn-primary">
                  <span>Quote {service.shortName}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H2 #4B: Complete Residential & Home Cleaning Services Suite */}
      <ResidentialServicesSuite location={location} compact />

      {/* H2 #5: [Service] Questions Answered */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="combo-faqs-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Local Questions &amp; Answers</span>
              </div>
              <h2 id="combo-faqs-heading" className="section-title">
                {outline.faqsH2}
              </h2>
            </div>
            <p className="section-subtitle">
              Have a specific question about your {location.city} property? Call or text our team at{' '}
              <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phoneDisplay}</a>.
            </p>
          </div>

          <div className="faq-cards-grid">
            {combo.faqs.map((faq) => (
              <article key={faq.id} className="faq-static-card">
                <span className="faq-category-tag">
                  {service.shortName} • {location.city}
                </span>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* H2 #6: Request a [Service] Quote in [City] */}
      <QuoteForm
        selectedServiceId={service.id}
        preselectedLocationId={location.id}
        contextKicker={`${service.name} • ${location.name}`}
        contextHeadline={outline.quoteH2(location.city)}
        contextSubheadline={`We have pre-selected ${service.name} and pre-filled ${location.name} for you below. Tell us about your home and our team will follow up promptly.`}
      />
    </>
  );
};
