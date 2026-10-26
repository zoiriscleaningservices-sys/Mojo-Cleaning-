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
  StarIcon,
} from '../components/Icons';
import { QuoteForm } from '../components/QuoteForm';
import { HeroTeamShowcase } from '../components/HeroTeamShowcase';
import { VERIFIED_REVIEWS } from '../data/business-profile';
import type { LocationEntity } from '../data/entities';
import { COMPLIANT_REVIEW_SYSTEM } from '../data/seo-domination-system';
import {
  getAvailableServicesForLocation,
  getLocationChecklistPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationReviewsPath,
  getLocationServiceDetailPath,
} from '../utils/location-routing';

interface ReviewsPageProps {
  location: LocationEntity;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ location }) => {
  const homeHref = getLocationHomePath(location.id);
  const reviewsHref = getLocationReviewsPath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);
  const quoteHref = getLocationQuotePath(location.id);
  const availableServices = getAvailableServicesForLocation(location.id);

  const breadcrumbs = [
    { label: location.name, href: homeHref },
    { label: `Client Reviews & Guarantee`, href: reviewsHref },
  ];

  return (
    <>
      {/* 1. Location-Specific Reviews Hero */}
      <section className="interior-hero" aria-labelledby="reviews-hero-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>
                  Verified Homeowner Feedback • {location.name} Service Area
                </span>
              </div>

              <h1 id="reviews-hero-heading" className="interior-hero-title">
                Client Reviews &amp; 48-Hour Guarantee in {location.fullStateName}
              </h1>

              <p className="interior-hero-lead">
                Read genuine feedback from homeowners across our {location.name} service area and
                see how Mojo Cleaning backs every single appointment in {location.city} with our
                48-Hour Happiness Guarantee and 56-point room-by-room standards.
              </p>

              <div className="interior-hero-actions">
                <a href={quoteHref} className="btn btn-primary btn-lg">
                  <span>Request Your {location.city} Quote</span>
                  <ArrowRightIcon size={17} />
                </a>
                <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-lg">
                  <PhoneIcon size={17} />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <ul className="interior-hero-trust-strip" aria-label="Review transparency">
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>100% Genuine Published Reviews</span>
                </li>
                <li>
                  <ClockCheckIcon size={16} className="text-coral" />
                  <span>48-Hour Free Re-Clean Guarantee</span>
                </li>
                <li>
                  <CheckCircleIcon size={16} className="text-coral" />
                  <span>Insured, Bonded &amp; Vetted Team</span>
                </li>
              </ul>
            </div>

            <div className="interior-hero-media">
              <HeroTeamShowcase
                location={location}
                variant="services"
                serviceTag={`Every ${location.city} Spot Checked • 48-Hr Guarantee`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Verified Customer Reviews */}
      <section className="editorial-section" aria-labelledby="published-reviews-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Published Client Testimonials</span>
              </div>
              <h2 id="published-reviews-heading" className="section-title">
                What local families and homeowners experience with Mojo.
              </h2>
            </div>
            <p className="section-subtitle">
              We never publish fabricated reviews or unverified star counts. Every testimonial
              below comes directly from Mojo Cleaning’s verified customer records, serving{' '}
              {location.name} with the same vetted team and 56-point room checklist.
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
                    <span className="review-source-tag">{review.sourceLabel}</span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 48-Hour Happiness Guarantee Section */}
      <GuaranteeSection />

      {/* 3B. Compliant Review Workflow & Service Resolution Standards (Section 5) */}
      <section className="editorial-section" aria-labelledby="review-process-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Honest Feedback &amp; Resolution Standards in {location.city}</span>
              </div>
              <h2 id="review-process-heading" className="section-title">
                How we gather genuine reviews and handle customer concerns.
              </h2>
            </div>
            <p className="section-subtitle">
              We never gate reviews, offer paid incentives for ratings, or publish unverified
              testimonials. Every {location.name} homeowner receives a transparent follow-up after
              their visit is completed.
            </p>
          </div>

          <div className="expectation-cards-grid">
            {COMPLIANT_REVIEW_SYSTEM.postServiceWorkflowSteps.map((step) => (
              <article key={step.stepNumber} className="expectation-card">
                <span className="expectation-step-tag">Step 0{step.stepNumber}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>

          <div className="local-guidance-callout" style={{ marginTop: '1.75rem' }}>
            <h3>Our Public Review &amp; Customer Care Principles</h3>
            <ul className="compact-check-list">
              {COMPLIANT_REVIEW_SYSTEM.compliancePrinciples.map((principle) => (
                <li key={principle}>
                  <CheckCircleIcon size={15} className="text-coral" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Explore Services in This Location ONLY */}
      <section
        className="editorial-section bg-warm-cream"
        aria-labelledby="reviews-explore-heading"
      >
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Explore {location.name} Services</span>
              </div>
              <h2 id="reviews-explore-heading" className="section-title">
                See what we clean in your {location.city} neighborhood.
              </h2>
            </div>
            <p className="section-subtitle">
              Review our room-by-room checklists by service type for {location.name} homes or open
              our{' '}
              <a href={checklistHref} className="inline-editorial-link">
                complete 56-point cleaning checklist
              </a>
              .
            </p>
          </div>

          <div className="discovery-pillars-grid">
            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                Residential Cleaning Services in {location.name}
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
                        <span>{svc.categoryLabel}</span>
                      </div>
                      <ArrowRightIcon size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                Our 48-Hour Guarantee in {location.city}
              </h3>
              <p className="discovery-panel-desc">
                Every {location.name} appointment is backed by our 48-Hour Happiness Guarantee. If
                any task on your checklist is overlooked, notify us within 48 hours and our team
                returns to re-clean the spot free of charge.
              </p>
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={checklistHref} className="btn btn-outline-dark">
                  <span>View 56-Point Checklist</span>
                </a>
                <a href={quoteHref} className="btn btn-primary">
                  <span>Request {location.city} Quote</span>
                  <ArrowRightIcon size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Request a Quote */}
      <QuoteForm
        preselectedLocationId={location.id}
        contextKicker={`Experience the 48-Hour Guarantee in ${location.name}`}
        contextHeadline={`Ready to come home to a clean ${location.city} house and a good mood?`}
      />
    </>
  );
};
