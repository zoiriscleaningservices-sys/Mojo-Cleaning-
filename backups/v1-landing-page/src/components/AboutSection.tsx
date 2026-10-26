import React from 'react';
import {
  BENEFIT_PILLARS,
  BUSINESS_INFO,
  TEAM_ACTION_PHOTOS,
  type BenefitPillar,
} from '../config/business';
import {
  ArrowRightIcon,
  ClockCheckIcon,
  LeafIcon,
  MojoSparkle,
  ShieldCheckIcon,
  SlidersIcon,
  UserCheckIcon,
} from './Icons';

const renderPillarIcon = (name: BenefitPillar['iconName']) => {
  switch (name) {
    case 'shield':
      return <ShieldCheckIcon size={22} />;
    case 'userCheck':
      return <UserCheckIcon size={22} />;
    case 'clock':
      return <ClockCheckIcon size={22} />;
    case 'leaf':
      return <LeafIcon size={22} />;
    case 'sliders':
      return <SlidersIcon size={22} />;
    case 'sparkles':
    default:
      return <MojoSparkle size={20} />;
  }
};

export const AboutSection: React.FC = () => {
  return (
    <section id="why-mojo" className="about-section" aria-labelledby="about-heading">
      <div className="container">
        {/* Top Editorial Asymmetric Split */}
        <div className="about-editorial-grid">
          <div className="about-visual-column">
            <div className="about-photo-collage">
              <figure className="about-primary-photo">
                <picture>
                  <source
                    media="(max-width: 640px)"
                    srcSet="/images/team-living-room-640w.webp"
                    type="image/webp"
                  />
                  <source srcSet="/images/team-living-room.webp" type="image/webp" />
                  <img
                    src="/images/team-living-room.jpg"
                    alt="Mojo Cleaning Huntsville team members vacuuming a living room rug and sanitizing a marble kitchen island"
                    width={1080}
                    height={1440}
                    loading="lazy"
                    className="about-collage-img"
                  />
                </picture>
                <figcaption className="about-photo-tag">
                  Real Huntsville Team • Coordinated Room Care
                </figcaption>
              </figure>

              <figure className="about-secondary-photo">
                <picture>
                  <source srcSet="/images/team-cabinet-detail-640w.webp" type="image/webp" />
                  <img
                    src="/images/team-cabinet-detail.jpg"
                    alt="Mojo Cleaning specialist wearing gloves detailing inside lower kitchen cabinets"
                    width={640}
                    height={853}
                    loading="lazy"
                    className="about-collage-img"
                  />
                </picture>
              </figure>

              {/* Circular Brand Stamp */}
              <div className="about-brand-stamp" aria-hidden="true">
                <div className="about-stamp-inner">
                  <MojoSparkle className="text-coral" size={20} />
                  <span className="about-stamp-top">MOJO STANDARD</span>
                  <span className="about-stamp-bottom">HUNTSVILLE • AL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-copy-column">
            <div className="section-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>Why Mojo Cleaning</span>
            </div>

            <h2 id="about-heading" className="section-title">
              We don’t just clean. We give you room to live.
            </h2>

            <p className="about-lead">
              There is a noticeable difference between a house that has been quickly wiped down and
              a home that has been genuinely cared for. At {BUSINESS_INFO.name}, we built our
              Huntsville and Madison service around a simple belief: walking through your front door
              should feel like a weight off your shoulders.
            </p>

            <p className="about-body">
              Whether you are juggling a busy career in Research Park, raising a family in Madison
              or Hampton Cove, or preparing a property for its next chapter, our vetted local
              specialists show up on time, fully equipped, and ready to follow a clear room-by-room
              plan tailored to your household.
            </p>

            <div className="about-signature-callout">
              <picture>
                <source srcSet="/images/mo-mascot.webp" type="image/webp" />
                <img
                  src="/images/mo-mascot.png"
                  alt=""
                  width={56}
                  height={58}
                  loading="lazy"
                  className="about-mascot-icon"
                />
              </picture>
              <div>
                <strong>“A clean home. A good mood.”</strong>
                <p>
                  No vague promises or mystery checklists—just dependable communication, pet-safe
                  options on request, and a 48-hour happiness policy on every visit.
                </p>
              </div>
            </div>

            <div className="about-cta-bar">
              <a href="#quote" className="btn btn-primary btn-lg">
                <span>Request Your Custom Quote</span>
                <ArrowRightIcon size={17} />
              </a>
              <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-lg">
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 6 Verified Benefit Pillars */}
        <div className="benefit-pillars-grid" role="list" aria-label="Why choose Mojo Cleaning">
          {BENEFIT_PILLARS.map((pillar) => (
            <article key={pillar.id} className="benefit-pillar-card" role="listitem">
              <div className="benefit-pillar-top">
                <span className="benefit-pillar-icon">{renderPillarIcon(pillar.iconName)}</span>
                <span className="benefit-pillar-badge">{pillar.badge}</span>
              </div>
              <h3 className="benefit-pillar-title">{pillar.title}</h3>
              <p className="benefit-pillar-desc">{pillar.description}</p>
            </article>
          ))}
        </div>

        {/* Real Homes, Real Care — Huntsville Team in Action Strip */}
        <div className="team-action-showcase">
          <div className="team-action-header">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={13} />
                <span>Our Cleaners in Action</span>
              </div>
              <h3 className="team-action-title">Real homes. Real care.</h3>
            </div>
            <p className="team-action-subtitle">
              From hand-polishing glass pendant lights to deep cabinet scrubbing and ceiling-high
              post-construction dust removal across Huntsville and Madison County.
            </p>
          </div>

          <div className="team-action-grid">
            {TEAM_ACTION_PHOTOS.map((photo) => (
              <figure key={photo.id} className="team-action-card">
                <div className="team-action-img-wrap">
                  <picture>
                    <source
                      media="(max-width: 640px)"
                      srcSet={photo.webp640}
                      type="image/webp"
                    />
                    <source srcSet={photo.webp1080} type="image/webp" />
                    <img
                      src={photo.jpg}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      className="team-action-img"
                    />
                  </picture>
                </div>
                <figcaption className="team-action-caption">
                  <strong>{photo.title}</strong>
                  <span>{photo.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
