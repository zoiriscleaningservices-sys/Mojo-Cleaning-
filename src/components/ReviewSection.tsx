import React from 'react';
import { BUSINESS_INFO, VERIFIED_TESTIMONIALS } from '../config/business';
import { ArrowRightIcon, MojoSparkle, ShieldCheckIcon, StarIcon } from './Icons';

export const ReviewSection: React.FC = () => {
  return (
    <section id="reviews" className="reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="section-header-split">
          <div>
            <div className="section-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>Customer Love • Huntsville &amp; Madison</span>
            </div>
            <h2 id="reviews-heading" className="section-title">
              That’s the Mojo feeling.
            </h2>
          </div>

          <p className="section-subtitle">
            Real feedback published by homeowners across Huntsville, South Huntsville, and Madison
            who trust {BUSINESS_INFO.name} with their recurring and deep cleans.
          </p>
        </div>

        <div className="reviews-grid">
          {VERIFIED_TESTIMONIALS.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-card-top">
                <div className="review-stars" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <StarIcon key={idx} size={15} className="review-star-svg" />
                  ))}
                </div>
                <span className="review-service-tag">{review.serviceType}</span>
              </div>

              <blockquote className="review-quote">“{review.quote}”</blockquote>

              <footer className="review-footer">
                <div className="review-author-info">
                  <strong className="review-author-name">{review.author}</strong>
                  <span className="review-author-location">{review.location}</span>
                </div>
                <span className="review-source-note">{review.sourceLabel}</span>
              </footer>
            </article>
          ))}
        </div>

        <div className="reviews-trust-strip">
          <div className="reviews-trust-left">
            <ShieldCheckIcon size={22} className="text-coral" />
            <div>
              <strong>Every visit is backed by our 48-Hour Happiness Guarantee.</strong>
              <span>
                Insured &amp; bonded residential specialists serving Huntsville &amp; Madison
                County.
              </span>
            </div>
          </div>

          <a href="#quote" className="btn btn-outline-dark">
            <span>Experience the Mojo Difference</span>
            <ArrowRightIcon size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};
