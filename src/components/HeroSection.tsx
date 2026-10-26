import React from 'react';
import { BUSINESS_INFO } from '../config/business';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  MojoSparkle,
  PhoneIcon,
  ShieldCheckIcon,
} from './Icons';

export const HeroSection: React.FC = () => {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-ambient-glow hero-glow-1" aria-hidden="true" />
      <div className="hero-ambient-glow hero-glow-2" aria-hidden="true" />

      <div className="container hero-grid">
        {/* Left Editorial Column */}
        <div className="hero-content">
          <div className="hero-eyebrow-pill">
            <MojoSparkle className="text-coral" size={14} />
            <span>Huntsville &amp; Madison County Residential Cleaning</span>
          </div>

          <h1 id="hero-heading" className="hero-headline">
            Come home to a <span className="hero-headline-accent">good mood.</span>
          </h1>

          <p className="hero-kicker">
            Thoughtful house cleaning across Huntsville, Madison, Hampton Cove, Owens Cross Roads &amp; Athens, AL.
          </p>

          <p className="hero-lead">
            A home that feels fresh the moment you turn the key—and a weekend that belongs to you
            again. Our insured, background-checked team brings every supply needed to care for your
            space with quiet precision.
          </p>

          <div className="hero-cta-row">
            <a href="#quote" className="btn btn-primary btn-lg hero-primary-btn">
              <span>Request Your Custom Quote</span>
              <MojoSparkle size={16} />
            </a>

            <a href="#services" className="btn btn-secondary btn-lg">
              <span>Explore Cleaning Services</span>
              <ArrowRightIcon size={17} />
            </a>
          </div>

          <div className="hero-direct-assist">
            <span>Prefer to talk through your space?</span>
            <a href={BUSINESS_INFO.phoneHref} className="hero-phone-inline">
              <PhoneIcon size={14} />
              <span>Call or text {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* Verified Trust Bar */}
          <ul className="hero-trust-list" aria-label="Verified Mojo Cleaning Commitments">
            <li className="hero-trust-item">
              <span className="hero-trust-icon">
                <CheckCircleIcon size={16} />
              </span>
              <div>
                <strong>Insured &amp; Bonded</strong>
                <span>Full home protection</span>
              </div>
            </li>
            <li className="hero-trust-item">
              <span className="hero-trust-icon">
                <CheckCircleIcon size={16} />
              </span>
              <div>
                <strong>48-Hour Guarantee</strong>
                <span>Free spot re-clean policy</span>
              </div>
            </li>
            <li className="hero-trust-item">
              <span className="hero-trust-icon">
                <CheckCircleIcon size={16} />
              </span>
              <div>
                <strong>Background-Checked</strong>
                <span>Vetted local specialists</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Visual Composition Column */}
        <div className="hero-visual">
          <div className="hero-frame-backdrop" aria-hidden="true" />

          <figure className="hero-main-figure">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="/images/hero-interior-640w.webp"
                type="image/webp"
              />
              <source srcSet="/images/hero-interior.webp" type="image/webp" />
              <img
                src="/images/hero-interior.jpg"
                alt="Sunlit, freshly cleaned open-concept Huntsville living room and kitchen with white oak floors and marble island"
                width={1280}
                height={714}
                className="hero-main-img"
                fetchPriority="high"
              />
            </picture>

            <figcaption className="hero-image-caption-bar">
              <div className="hero-caption-left">
                <span className="hero-caption-dot" aria-hidden="true" />
                <span>56-Point Room-by-Room Standard</span>
              </div>
              <span className="hero-caption-location">Huntsville &amp; Madison, AL</span>
            </figcaption>
          </figure>

          {/* Secondary Real Mojo Specialist Inset Card */}
          <div className="hero-specialist-card">
            <div className="hero-specialist-thumb-wrap">
              <picture>
                <source srcSet="/images/team-pendant-care-640w.webp" type="image/webp" />
                <img
                  src="/images/team-pendant-care.jpg"
                  alt="Mojo Cleaning specialist hand-polishing a glass kitchen pendant light"
                  width={120}
                  height={154}
                  className="hero-specialist-thumb"
                  loading="eager"
                />
              </picture>
            </div>
            <div className="hero-specialist-copy">
              <div className="hero-specialist-badge">
                <ShieldCheckIcon size={14} />
                <span>Real Care, Every Visit</span>
              </div>
              <p className="hero-specialist-title">
                Supplies, equipment &amp; eco-friendly options included.
              </p>
              <a href="#checklist-explorer" className="hero-specialist-link">
                <span>See our 56-point checklist</span>
                <ArrowRightIcon size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section Transition Ribbon */}
      <div className="hero-transition-strip" aria-hidden="true">
        <div className="container hero-transition-inner">
          <span>RECURRING RESIDENTIAL CARE</span>
          <MojoSparkle size={12} />
          <span>INTENSIVE DEEP CLEANS</span>
          <MojoSparkle size={12} />
          <span>MOVE-IN &amp; MOVE-OUT RESETS</span>
          <MojoSparkle size={12} />
          <span>POST-CONSTRUCTION DETAILING</span>
        </div>
      </div>
    </section>
  );
};
