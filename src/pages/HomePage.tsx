import React, { useState } from 'react';
import {
  BUSINESS_INFO,
  CLEANING_CHECKLIST,
  PROCESS_STEPS,
  type ChecklistRoom,
  type ServiceItem,
} from '../config/business';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockCheckIcon,
  MapPinIcon,
  MojoSparkle,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
  UserCheckIcon,
} from '../components/Icons';
import { QuoteForm } from '../components/QuoteForm';
import { AvailableServicesCatalog } from '../components/AvailableServicesCatalog';
import { HeroTeamShowcase } from '../components/HeroTeamShowcase';
import { MojoMascotFigure, SectionMascotBanner } from '../components/MojoMascot';
import { ResidentialServicesSuite } from '../components/ResidentialServicesSuite';
import { VERIFIED_REVIEWS } from '../data/business-profile';
import type { LocationEntity, ServiceId } from '../data/entities';
import {
  getLocationAboutPath,
  getLocationChecklistPath,
  getLocationContactPath,
  getLocationFaqsPath,
  getLocationQuotePath,
  getLocationReviewsPath,
  getLocationServicesPath,
} from '../utils/location-routing';

interface HomePageProps {
  location: LocationEntity;
  selectedServiceId: ServiceItem['id'] | ServiceId | string;
  onSelectServiceId: (id: ServiceItem['id']) => void;
  customH1?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  location,
  selectedServiceId,
  onSelectServiceId,
  customH1,
}) => {
  const [activeRoom, setActiveRoom] = useState<ChecklistRoom['id']>('kitchen');
  const [checklistExpanded, setChecklistExpanded] = useState<boolean>(false);

  const currentRoom =
    CLEANING_CHECKLIST.find((r) => r.id === activeRoom) || CLEANING_CHECKLIST[0];
  const visibleTasks = checklistExpanded
    ? currentRoom.tasks
    : currentRoom.tasks.slice(0, 8);

  const servicesHref = getLocationServicesPath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);
  const aboutHref = getLocationAboutPath(location.id);
  const reviewsHref = getLocationReviewsPath(location.id);
  const faqsHref = getLocationFaqsPath(location.id);
  const contactHref = getLocationContactPath(location.id);
  const quoteHref = getLocationQuotePath(location.id);

  return (
    <>
      {/* 1. Location-Specific Hero Section & 2. Trust & Assurance Bar */}
      <section id="top" className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-ambient-glow hero-glow-1" aria-hidden="true" />
        <div className="hero-ambient-glow hero-glow-2" aria-hidden="true" />

        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-eyebrow-pill">
              <MojoSparkle className="text-coral" size={14} />
              <span>{location.homepageContent.heroEyebrow}</span>
            </div>

            <h1 id="hero-heading" className="hero-headline">
              {customH1 || location.homepageContent.heroHeadline}
            </h1>

            <p className="hero-lead">
              {location.homepageContent.heroSubheadline}
            </p>

            <div className="hero-cta-row">
              <a href={quoteHref} className="btn btn-primary btn-lg hero-primary-btn">
                <span>Request a Quote</span>
                <MojoSparkle size={16} />
              </a>

              <a href={servicesHref} className="btn btn-secondary btn-lg">
                <span>Explore {location.city} Services</span>
                <ArrowRightIcon size={17} />
              </a>
            </div>

            <div className="hero-direct-assist">
              <span>Direct {location.city} dispatch:</span>
              <a href={BUSINESS_INFO.phoneHref} className="hero-phone-inline">
                <PhoneIcon size={14} />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* 2. Verified Trust & Assurance Bar */}
            <ul
              className="hero-trust-list"
              aria-label={`Verified Mojo Cleaning commitments in ${location.name}`}
            >
              <li className="hero-trust-item">
                <span className="hero-trust-icon">
                  <ShieldCheckIcon size={16} />
                </span>
                <div>
                  <strong>Insured &amp; Bonded</strong>
                  <span>Full {location.city} home protection</span>
                </div>
              </li>
              <li className="hero-trust-item">
                <span className="hero-trust-icon">
                  <ClockCheckIcon size={16} />
                </span>
                <div>
                  <strong>48-Hour Guarantee</strong>
                  <span>Free spot re-clean policy</span>
                </div>
              </li>
              <li className="hero-trust-item">
                <span className="hero-trust-icon">
                  <UserCheckIcon size={16} />
                </span>
                <div>
                  <strong>Background-Checked</strong>
                  <span>Vetted residential specialists</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="hero-visual">
            <HeroTeamShowcase location={location} variant="home" />
          </div>
        </div>

        <div className="hero-transition-strip" aria-hidden="true">
          <div className="container hero-transition-inner">
            <span>{location.name.toUpperCase()} RESIDENTIAL CARE</span>
            <MojoSparkle size={12} />
            <span>56-POINT CHECKLIST STANDARD</span>
            <MojoSparkle size={12} />
            <span>48-HOUR HAPPINESS GUARANTEE</span>
            <MojoSparkle size={12} />
            <span>INSURED &amp; BONDED TEAM</span>
          </div>
        </div>
      </section>

      {/* 3. Available Residential & Home Cleaning Services in This Location */}
      <section id="services" className="services-section" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>{location.name} Residential &amp; Home Cleaning Services</span>
              </div>
              <h2 id="services-heading" className="section-title">
                {location.homepageContent.serviceSectionHeading}
              </h2>
            </div>

            <p className="section-subtitle">
              {location.homepageContent.serviceSectionIntro}
            </p>
          </div>

          <AvailableServicesCatalog
            location={location}
            onSelectServiceId={onSelectServiceId}
          />
        </div>
      </section>

      {/* 3B. Complete Residential & Home Cleaning Services Menu */}
      <ResidentialServicesSuite location={location} />

      {/* 4. 56-Point Room-by-Room Cleaning Checklist Preview */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="checklist-preview-heading">
        <div className="container">
          <SectionMascotBanner
            pose="checklist"
            animation="checklist-nod"
            kicker={`56-Point Room-by-Room Standard • ${location.name}`}
            headline={`No guesswork—every ${location.city} visit follows our verified 56-point checklist!`}
            description={`Switch between Kitchen (24 tasks), Bathrooms (17 tasks), and Bedrooms & Living Areas (15 tasks) below to see what is included in Standard, Deep, and Move-In/Out cleans.`}
            ctaLabel="Open Full Checklist"
            ctaHref={checklistHref}
          />

          <div id="checklist-explorer" className="checklist-explorer-card">
            <div className="checklist-header">
              <div>
                <div className="section-eyebrow">
                  <MojoSparkle className="text-coral" size={13} />
                  <span>Total Transparency • {location.name} 56-Point Standard</span>
                </div>
                <h2 id="checklist-preview-heading" className="checklist-title">
                  56-Point Room-by-Room Cleaning Checklist
                </h2>
                <p className="checklist-subtitle">
                  Compare every task included across Standard (Recurring), Deep, and Move-In /
                  Move-Out cleans for {location.name} residences. View the{' '}
                  <a href={checklistHref} className="inline-editorial-link">
                    complete {location.city} 56-point checklist page
                  </a>{' '}
                  for full room breakdowns.
                </p>
              </div>

              <div className="checklist-room-tabs" role="tablist" aria-label="Select room checklist">
                {CLEANING_CHECKLIST.map((room) => {
                  const isSelected = room.id === activeRoom;
                  return (
                    <button
                      key={room.id}
                      type="button"
                      role="tab"
                      id={`home-tab-${room.id}`}
                      aria-selected={isSelected}
                      aria-controls={`home-panel-${room.id}`}
                      className={`checklist-tab-btn ${isSelected ? 'is-active' : ''}`}
                      onClick={() => setActiveRoom(room.id)}
                    >
                      <span>{room.name}</span>
                      <span className="checklist-tab-count">{room.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              id={`home-panel-${currentRoom.id}`}
              role="tabpanel"
              aria-labelledby={`home-tab-${currentRoom.id}`}
              className="checklist-table-wrapper"
            >
              <div className="checklist-room-summary-bar">
                <div>
                  <strong>{currentRoom.name} Standard</strong> — {currentRoom.summary}
                </div>
                <span className="checklist-custom-badge">100% Flexible Upon Request</span>
              </div>

              <div className="checklist-scroll-container">
                <table className="checklist-table">
                  <thead>
                    <tr>
                      <th scope="col" className="col-task">
                        {currentRoom.name} Task ({currentRoom.count} items)
                      </th>
                      <th scope="col" className="col-tier">
                        <span className="tier-label-mobile">Standard</span>
                        <span className="tier-label-desktop">Standard / Recurring</span>
                      </th>
                      <th scope="col" className="col-tier is-highlighted">
                        <span className="tier-label-mobile">Deep</span>
                        <span className="tier-label-desktop">Deep Clean</span>
                      </th>
                      <th scope="col" className="col-tier">
                        <span className="tier-label-mobile">Move</span>
                        <span className="tier-label-desktop">Move-In / Out</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleTasks.map((item) => (
                      <tr key={item.task}>
                        <th scope="row" className="cell-task">
                          <span>{item.task}</span>
                          {item.addOnNote ? (
                            <span className="task-addon-pill">★ {item.addOnNote}</span>
                          ) : null}
                        </th>
                        <td className="cell-tier">
                          {item.standard ? (
                            <span className="tier-included" aria-label="Included in Standard Clean">
                              <CheckCircleIcon size={16} />
                              <span className="sr-only">Included</span>
                            </span>
                          ) : (
                            <span className="tier-optional">—</span>
                          )}
                        </td>
                        <td className="cell-tier is-highlighted">
                          {item.deep ? (
                            <span className="tier-included" aria-label="Included in Deep Clean">
                              <CheckCircleIcon size={16} />
                              <span className="sr-only">Included</span>
                            </span>
                          ) : (
                            <span className="tier-optional">Add-on</span>
                          )}
                        </td>
                        <td className="cell-tier">
                          {item.moveInOut ? (
                            <span
                              className="tier-included"
                              aria-label="Included in Move-In/Out Clean"
                            >
                              <CheckCircleIcon size={16} />
                              <span className="sr-only">Included</span>
                            </span>
                          ) : (
                            <span className="tier-optional">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="checklist-footer-bar">
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {currentRoom.tasks.length > 8 ? (
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => setChecklistExpanded((prev) => !prev)}
                      aria-expanded={checklistExpanded}
                    >
                      {checklistExpanded
                        ? `Show Fewer ${currentRoom.name} Tasks`
                        : `View All ${currentRoom.tasks.length} ${currentRoom.name} Tasks`}
                    </button>
                  ) : null}
                  <a href={checklistHref} className="btn btn-primary btn-sm">
                    <span>Open Full 56-Point Checklist Page</span>
                    <ArrowRightIcon size={14} />
                  </a>
                </div>

                <a href={quoteHref} className="checklist-custom-cta">
                  <span>Need a custom {location.city} room checklist? Request a quote</span>
                  <ArrowRightIcon size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. About Mojo Cleaning in This Location */}
      <section id="why-mojo" className="about-section" aria-labelledby="about-heading">
        <div className="container">
          <div className="about-editorial-grid">
            <div className="about-visual-column">
              <HeroTeamShowcase
                location={location}
                variant="services"
                serviceTag={`Dedicated ${location.city} Dispatch • Vetted Local Team`}
              />
            </div>

            <div className="about-copy-column">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>About Mojo Cleaning in {location.name}</span>
              </div>

              <h2 id="about-heading" className="section-title">
                {location.homepageContent.aboutPreviewHeading}
              </h2>

              {location.homepageContent.aboutPreviewParagraphs.map((para, idx) => (
                <p key={idx} className={idx === 0 ? 'about-lead' : 'about-body'}>
                  {para}
                </p>
              ))}

              <div className="local-value-props-stack">
                {location.homepageContent.valuePropPillars.map((vp) => (
                  <div key={vp.title} className="local-value-prop-item">
                    <CheckCircleIcon size={18} className="text-coral" />
                    <div>
                      <strong>
                        {vp.title} ({vp.metricOrBadge})
                      </strong>
                      <p>{vp.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="about-cta-bar">
                <a href={aboutHref} className="btn btn-primary btn-lg">
                  <span>About Our {location.city} Service</span>
                  <ArrowRightIcon size={17} />
                </a>
                <a href={quoteHref} className="btn btn-outline-dark btn-lg">
                  <span>Request a Quote</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Simple Booking Process */}
      <section className="process-section" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Simple 3-Step Booking in {location.name}</span>
              </div>
              <h2 id="process-heading" className="section-title">
                Effortless from your first quote to a freshly cleaned {location.city} home.
              </h2>
            </div>
            <p className="section-subtitle">
              No complicated walk-through delays or rigid contracts. Tell us about your{' '}
              {location.city} residence, confirm your customized scope, and enjoy a spotless home.
            </p>
          </div>

          <div className="process-steps-grid">
            {PROCESS_STEPS.map((step) => (
              <article key={step.number} className="process-step-card">
                <div className="process-step-top">
                  <span className="process-step-number">{step.number}</span>
                  <span className="process-step-subtitle">{step.detail}</span>
                </div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-description">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 48-Hour Happiness Guarantee */}
      <section className="guarantee-section" aria-labelledby="guarantee-heading">
        <div className="container">
          <div className="guarantee-banner-card">
            <div className="guarantee-badge-col">
              <div className="guarantee-mascot-seal-wrap">
                <MojoMascotFigure
                  pose="welcome-open"
                  animation="celebrate-hop"
                  size={88}
                  alt={`Mojo Cleaning Mascot celebrating our 48-Hour Happiness Guarantee in ${location.name}`}
                />
                <div className="guarantee-seal">
                  <ShieldCheckIcon size={28} className="text-coral" />
                  <span className="guarantee-seal-hours">48-HR</span>
                  <span className="guarantee-seal-label">GUARANTEE</span>
                </div>
              </div>
            </div>

            <div className="guarantee-copy-col">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Risk-Free {location.name} Residential Care</span>
              </div>
              <h2 id="guarantee-heading" className="guarantee-title">
                Protected by our 48-Hour Happiness Guarantee.
              </h2>
              <p className="guarantee-description">
                Every {location.name} visit follows our 56-point room checklist. If any spot is ever
                missed, let our team know within 48 hours and we will return to re-clean the area
                for free—no hassle, no excuses.
              </p>
            </div>

            <div className="guarantee-cta-col">
              <a href={quoteHref} className="btn btn-primary btn-lg">
                <span>Request Your {location.city} Quote</span>
                <ArrowRightIcon size={16} />
              </a>
              <a href={reviewsHref} className="btn btn-outline-light btn-sm">
                <span>Read Verified Reviews</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Verified Customer Reviews */}
      <section id="reviews" className="reviews-section" aria-labelledby="reviews-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Verified Homeowner Feedback</span>
              </div>
              <h2 id="reviews-heading" className="section-title">
                That’s the Mojo feeling across our service area.
              </h2>
            </div>

            <p className="section-subtitle">
              Genuine feedback published by homeowners who trust {BUSINESS_INFO.name} with their
              recurring, deep, and move-in/move-out cleans.{' '}
              <a href={reviewsHref} className="inline-editorial-link">
                View all verified reviews &amp; our 48-hour guarantee →
              </a>
            </p>
          </div>

          <div className="reviews-grid">
            {VERIFIED_REVIEWS.map((review) => (
              <article key={review.id} className="review-card">
                <div className="review-card-top">
                  <div className="review-stars" aria-label="5 out of 5 stars">
                    {[0, 1, 2, 3, 4].map((idx) => (
                      <StarIcon key={idx} size={15} className="review-star-svg" />
                    ))}
                  </div>
                  <span className="review-service-tag">{review.serviceLabel}</span>
                </div>

                <blockquote className="review-quote">“{review.quote}”</blockquote>

                <footer className="review-footer">
                  <div className="review-author-info">
                    <strong className="review-author-name">{review.author}</strong>
                    <span className="review-author-location">{review.locationLabel}</span>
                  </div>
                  <span className="review-source-note">{review.sourceLabel}</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Neighborhoods and Local Coverage Within THIS Location Only */}
      <section
        id="local-coverage"
        className="editorial-section bg-warm-cream"
        aria-labelledby="local-coverage-heading"
      >
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>
                  {location.name} • {location.county} Coverage
                </span>
              </div>
              <h2 id="local-coverage-heading" className="section-title">
                Neighborhoods, communities &amp; ZIP codes we serve in {location.city}.
              </h2>
            </div>
            <p className="section-subtitle">{location.serviceAvailabilityNote}</p>
          </div>

          <div className="editorial-split-layout">
            <div>
              <h3 className="sub-section-title">
                {location.city} Neighborhoods &amp; Residential Corridors
              </h3>
              <div className="neighborhood-cards-grid">
                {location.neighborhoods.map((hood) => (
                  <article key={hood} className="neighborhood-detail-card">
                    <div className="neighborhood-card-title">
                      <MapPinIcon size={16} className="text-coral" />
                      <strong>{hood}</strong>
                    </div>
                  </article>
                ))}
              </div>
              <p className="editorial-body-text" style={{ marginTop: '1.25rem' }}>
                {location.localHousingContext}
              </p>
              <p className="editorial-body-text">{location.commuteAndLifestyleContext}</p>
            </div>

            <aside className="verified-facts-card" aria-label={`${location.name} coverage summary`}>
              <h3 className="verified-facts-title">{location.name} Dispatch Facts</h3>
              <dl className="verified-facts-dl">
                <div>
                  <dt>Service Area</dt>
                  <dd>{location.fullStateName}</dd>
                </div>
                <div>
                  <dt>County &amp; Region</dt>
                  <dd>
                    {location.county} • {location.regionLabel}
                  </dd>
                </div>
                <div>
                  <dt>Verified ZIP Codes</dt>
                  <dd>{location.zipCodes.join(', ')}</dd>
                </div>
                <div>
                  <dt>Service Model</dt>
                  <dd>{location.aboutContent.serviceAreaClarification}</dd>
                </div>
              </dl>
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={contactHref} className="btn btn-outline-dark btn-sm">
                  <span>{location.city} Contact Details</span>
                </a>
                <a href={quoteHref} className="btn btn-primary btn-sm">
                  <span>Request {location.city} Quote</span>
                  <ArrowRightIcon size={14} />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 10. Location-Specific FAQs */}
      <section id="faqs" className="faq-section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="faq-layout">
            <div className="faq-intro-col">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>{location.name} FAQs</span>
              </div>

              <h2 id="faq-heading" className="section-title">
                Common questions from {location.city} homeowners.
              </h2>

              <p className="faq-lead">
                Answers about our {location.name} dispatch coverage, 56-point room checklists,
                supplies, pet-friendly care, and custom quote scheduling.
              </p>

              <div className="faq-direct-card">
                <strong>Have another question about your {location.city} home?</strong>
                <p>
                  Browse our complete {location.city} FAQ directory or reach out to our team
                  directly at {BUSINESS_INFO.phoneDisplay}.
                </p>
                <div className="faq-direct-actions">
                  <a href={faqsHref} className="btn btn-outline-dark btn-sm">
                    <span>View All {location.city} FAQs</span>
                  </a>
                  <a href={quoteHref} className="btn btn-primary btn-sm">
                    <span>Ask in Your Quote</span>
                    <ArrowRightIcon size={14} />
                  </a>
                </div>
              </div>
            </div>

            <div className="faq-accordion-col">
              {location.faqs.map((item, idx) => (
                <details key={item.id} className="faq-details-item" open={idx === 0}>
                  <summary className="faq-summary">
                    <span className="faq-question-text">{item.question}</span>
                    <span className="faq-toggle-indicator" aria-hidden="true">
                      <span className="faq-plus-horizontal" />
                      <span className="faq-plus-vertical" />
                    </span>
                  </summary>
                  <div className="faq-answer-body">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Quote Request Form / Conversion Section */}
      <QuoteForm
        selectedServiceId={selectedServiceId}
        onSelectServiceId={onSelectServiceId}
        preselectedLocationId={location.id}
        contextKicker={`${location.name} Custom Quote Request`}
        contextHeadline={`Ready for a ${location.city} home that feels like a deep breath?`}
        contextSubheadline={`Tell us about your ${location.name} home and preferred cleaning service below. Our team will follow up promptly with your personalized quote.`}
      />
    </>
  );
};
