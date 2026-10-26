import React from 'react';
import { BENEFIT_PILLARS, BUSINESS_INFO } from '../config/business';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockCheckIcon,
  LeafIcon,
  MapPinIcon,
  MojoSparkle,
  PhoneIcon,
  ShieldCheckIcon,
  SlidersIcon,
  UserCheckIcon,
} from '../components/Icons';
import { QuoteForm } from '../components/QuoteForm';
import { HeroTeamShowcase } from '../components/HeroTeamShowcase';
import { ResidentialServicesSuite } from '../components/ResidentialServicesSuite';
import { REAL_TEAM_ACTION_GALLERY } from '../data/business-profile';
import type { LocationEntity } from '../data/entities';
import { withSiteBasePath } from '../data/page-registry';
import {
  BRAND_AUTHORITY_EXPERIENCE,
  LOCAL_PARTNERSHIP_RESOURCES,
} from '../data/seo-domination-system';
import {
  getAvailableServicesForLocation,
  getLocationAboutPath,
  getLocationChecklistPath,
  getLocationContactPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationServiceDetailPath,
} from '../utils/location-routing';

const renderPillarIcon = (name: string) => {
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
    default:
      return <MojoSparkle size={22} />;
  }
};

interface AboutPageProps {
  location: LocationEntity;
}

export const AboutPage: React.FC<AboutPageProps> = ({ location }) => {
  const homeHref = getLocationHomePath(location.id);
  const aboutHref = getLocationAboutPath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);
  const contactHref = getLocationContactPath(location.id);
  const quoteHref = getLocationQuotePath(location.id);
  const availableServices = getAvailableServicesForLocation(location.id);

  const breadcrumbs = [
    { label: location.name, href: homeHref },
    { label: `About Mojo Cleaning in ${location.city}`, href: aboutHref },
  ];

  return (
    <>
      {/* 1. Location-Specific About Hero */}
      <section className="interior-hero" aria-labelledby="about-hero-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>
                  About {BUSINESS_INFO.legalName} • Serving {location.name}
                </span>
              </div>

              <h1 id="about-hero-heading" className="interior-hero-title">
                {location.aboutContent.heroHeadline}
              </h1>

              <p className="interior-hero-lead">{location.aboutContent.heroLead}</p>

              <div className="interior-hero-actions">
                <a href={quoteHref} className="btn btn-primary btn-lg">
                  <span>Request a {location.city} Quote</span>
                  <ArrowRightIcon size={17} />
                </a>
                <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-lg">
                  <PhoneIcon size={17} />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <ul className="interior-hero-trust-strip" aria-label="Verified company credentials">
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>Insured &amp; Bonded LLC</span>
                </li>
                <li>
                  <UserCheckIcon size={16} className="text-coral" />
                  <span>Vetted, Background-Checked Specialists</span>
                </li>
                <li>
                  <ClockCheckIcon size={16} className="text-coral" />
                  <span>48-Hour Happiness Guarantee</span>
                </li>
              </ul>
            </div>

            <div className="interior-hero-media">
              <HeroTeamShowcase
                location={location}
                variant="about"
                serviceTag={`Dedicated ${location.city} Service • ${location.county}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story & Local Mission (Section 1: Dedicated Brand-Authority Experience) */}
      <section id="our-story" className="editorial-section" aria-labelledby="verified-intro-heading">
        <div className="container">
          <div className="editorial-split-layout">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Our Story • Serving {location.name}</span>
              </div>
              <h2 id="verified-intro-heading" className="section-title">
                {location.aboutContent.philosophyHeading}
              </h2>

              {BRAND_AUTHORITY_EXPERIENCE.ourStory.paragraphs.map((para, idx) => (
                <p key={`story-${idx}`} className="editorial-body-text">
                  {para}
                </p>
              ))}

              {location.aboutContent.philosophyParagraphs.map((para, idx) => (
                <p key={idx} className="editorial-body-text">
                  {para}
                </p>
              ))}

              {location.aboutContent.localCommitmentParagraphs.map((para, idx) => (
                <p key={`commit-${idx}`} className="editorial-body-text">
                  {para}
                </p>
              ))}

              <p className="editorial-body-text">
                Many residential cleaning companies leave homeowners guessing what “standard” or
                “deep” actually means. At Mojo Cleaning, we publish our exact{' '}
                <a href={checklistHref} className="inline-editorial-link">
                  56-point room-by-room checklist for {location.city}
                </a>{' '}
                online so you know every surface our specialists touch—while giving you 100%
                flexibility to skip unused rooms or prioritize the spaces your family uses most.
              </p>

              <div className="local-guidance-callout">
                <h3>Our Cleaning Standards for {location.city} Homes</h3>
                {BRAND_AUTHORITY_EXPERIENCE.cleaningStandards.paragraphs.map((para, idx) => (
                  <p key={`std-p-${idx}`} className="editorial-body-text" style={{ marginBottom: '0.65rem' }}>
                    {para}
                  </p>
                ))}
                <ul className="compact-check-list">
                  {location.aboutContent.standardsList.map((std) => (
                    <li key={std.title}>
                      <CheckCircleIcon size={15} className="text-coral" />
                      <span>
                        <strong>{std.title}:</strong> {std.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="verified-facts-card" aria-label="Verified company facts">
              <h3 className="verified-facts-title">
                {location.name} Service Facts at a Glance
              </h3>
              <dl className="verified-facts-dl">
                <div>
                  <dt>Official Legal Name</dt>
                  <dd>{BUSINESS_INFO.legalName}</dd>
                </div>
                <div>
                  <dt>Brand Positioning</dt>
                  <dd>Locally Operated • Personal Accountability</dd>
                </div>
                <div>
                  <dt>Active Service Area</dt>
                  <dd>
                    {location.fullStateName} ({location.county})
                  </dd>
                </div>
                <div>
                  <dt>Verified {location.city} ZIP Codes</dt>
                  <dd>{location.zipCodes.join(', ')}</dd>
                </div>
                <div>
                  <dt>Direct Phone &amp; Text</dt>
                  <dd>
                    <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phoneDisplay}</a>
                  </dd>
                </div>
                <div>
                  <dt>Official Email</dt>
                  <dd>
                    <a href={BUSINESS_INFO.emailHref}>{BUSINESS_INFO.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Office &amp; Scheduling Hours</dt>
                  <dd>
                    {BUSINESS_INFO.officeHours.weekdays} • {BUSINESS_INFO.officeHours.saturday}
                  </dd>
                </div>
                <div>
                  <dt>Service-Area Disclosure</dt>
                  <dd>{location.aboutContent.serviceAreaClarification}</dd>
                </div>
              </dl>

              <figure className="about-story-mini-showcase">
                <div className="about-story-mini-media">
                  <picture>
                    <source srcSet={withSiteBasePath('/images/team-pendant-care-640w.webp')} type="image/webp" />
                    <img
                      src={withSiteBasePath('/images/team-pendant-care.jpg')}
                      alt={`Mojo Cleaning specialist polishing glass pendant lighting in ${location.name}`}
                      width={640}
                      height={820}
                      loading="lazy"
                      className="about-story-mini-img"
                      style={{ objectPosition: 'center 42%' }}
                    />
                  </picture>
                </div>
                <figcaption className="about-story-mini-caption">
                  <MojoSparkle className="text-coral" size={14} />
                  <span>
                    Every {location.city} visit includes all professional supplies, HEPA vacuums &amp; our 48-Hour Happiness Guarantee.
                  </span>
                </figcaption>
              </figure>
            </aside>
          </div>
        </div>
      </section>

      {/* 3. Service Philosophy and Values */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Our Philosophy &amp; Six Core Pillars</span>
              </div>
              <h2 id="values-heading" className="section-title">
                Why {location.city} homeowners trust Mojo inside their homes.
              </h2>
            </div>
            <p className="section-subtitle">
              Inviting a cleaning team into your private living space requires real trust. Every
              Mojo Cleaning policy is designed to protect your finishes, your pets, and your peace
              of mind.
            </p>
          </div>

          <div className="pillars-grid">
            {BENEFIT_PILLARS.map((pillar) => (
              <article key={pillar.id} className="pillar-card">
                <div className="pillar-card-top">
                  <span className="pillar-icon-box" aria-hidden="true">
                    {renderPillarIcon(pillar.iconName)}
                  </span>
                  <span className="pillar-badge">{pillar.badge}</span>
                </div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What Customers Can Expect */}
      <section className="editorial-section" aria-labelledby="expectations-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>What to Expect on Cleaning Day in {location.city}</span>
              </div>
              <h2 id="expectations-heading" className="section-title">
                Clear communication from your first quote to our final walkthrough.
              </h2>
            </div>
            <p className="section-subtitle">
              No surprise fees, no rigid contracts that ignore your household preferences, and no
              wondering whether the team brought the right supplies.
            </p>
          </div>

          <div className="expectation-cards-grid">
            <article className="expectation-card">
              <span className="expectation-step-tag">Before We Arrive</span>
              <h3>Custom Scope &amp; Eco-Friendly Options</h3>
              <p>
                When you request a {location.city} quote, we review your home’s layout, flooring
                types, pets, and priority areas. If you want non-toxic, eco-friendly supplies or
                specific rooms skipped, we note it directly on your household checklist before
                dispatch.
              </p>
              <ul className="compact-check-list">
                <li>
                  <CheckCircleIcon size={15} className="text-coral" />
                  <span>Transparent quote confirmed before any appointment is booked</span>
                </li>
                <li>
                  <CheckCircleIcon size={15} className="text-coral" />
                  <span>Optional SMS appointment reminders</span>
                </li>
              </ul>
            </article>

            <article className="expectation-card">
              <span className="expectation-step-tag">During Your Clean</span>
              <h3>56-Point Room-by-Room Precision</h3>
              <p>
                Our background-checked specialists arrive at your {location.city} home with all
                equipment and follow our structured room sequence across your kitchen, bathrooms,
                bedrooms, and living areas—using clean microfiber cloths and surface-safe products.
              </p>
              <ul className="compact-check-list">
                <li>
                  <CheckCircleIcon size={15} className="text-coral" />
                  <span>24 Kitchen checkpoints, 17 Bathroom checkpoints, 15 Living/Bedroom tasks</span>
                </li>
                <li>
                  <CheckCircleIcon size={15} className="text-coral" />
                  <span>Respectful care around home offices, children’s rooms, and pets</span>
                </li>
              </ul>
            </article>

            <article className="expectation-card">
              <span className="expectation-step-tag">After Your Visit</span>
              <h3>Protected by the 48-Hour Happiness Guarantee</h3>
              <p>
                When you step through the door, your {location.city} home should feel calm, fresh,
                and genuinely restored. If any detail on your checklist was overlooked, let us know
                within 48 hours and our team returns to re-clean the spot at no additional charge.
              </p>
              <ul className="compact-check-list">
                <li>
                  <CheckCircleIcon size={15} className="text-coral" />
                  <span>Direct call, text, or email access to our team</span>
                </li>
                <li>
                  <CheckCircleIcon size={15} className="text-coral" />
                  <span>Simple feedback adjustments for recurring schedules</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 5. Meet the People Behind Mojo — Real Team-in-Action Gallery */}
      <section id="people-behind-mojo" className="editorial-section bg-warm-cream" aria-labelledby="team-gallery-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>{BRAND_AUTHORITY_EXPERIENCE.peopleBehindMojo.eyebrow}</span>
              </div>
              <h2 id="team-gallery-heading" className="section-title">
                {BRAND_AUTHORITY_EXPERIENCE.peopleBehindMojo.title}
              </h2>
            </div>
            <p className="section-subtitle">
              {BRAND_AUTHORITY_EXPERIENCE.peopleBehindMojo.paragraphs[0]} Here are our real
              specialists performing actual residential detail work for {location.name} homes.
            </p>
          </div>

          <div className="team-gallery-grid">
            {REAL_TEAM_ACTION_GALLERY.map((photo, index) => {
              const focalPositions = ['center 42%', 'center 58%', 'center 72%', 'center 45%'];
              const objectPosition = focalPositions[index % focalPositions.length];
              return (
                <figure
                  key={photo.id}
                  className={`team-photo-card team-photo-card-${(index % 4) + 1}`}
                >
                  <div className="team-photo-media">
                    <span className="team-photo-step-pill" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <picture>
                      {photo.webpMobile ? (
                        <source
                          media="(max-width: 640px)"
                          srcSet={withSiteBasePath(photo.webpMobile)}
                          type="image/webp"
                        />
                      ) : null}
                      <source srcSet={withSiteBasePath(photo.webp)} type="image/webp" />
                      <img
                        src={withSiteBasePath(photo.image)}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        loading="lazy"
                        className="team-photo-img"
                        style={{ objectPosition }}
                      />
                    </picture>
                  </div>
                  <figcaption className="team-photo-caption">
                    <strong>{photo.title}</strong>
                    <span>{photo.caption}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Our Commitment to the Community & Local Partners */}
      <section id="community-commitment" className="editorial-section" aria-labelledby="community-partner-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Our Commitment to {location.name} &amp; Local Partners</span>
              </div>
              <h2 id="community-partner-heading" className="section-title">
                Supporting {location.city} families, realtors, property managers, and builders.
              </h2>
            </div>
            <p className="section-subtitle">
              {BRAND_AUTHORITY_EXPERIENCE.communityCommitment.paragraphs[1]}
            </p>
          </div>

          <div className="expectation-cards-grid">
            {LOCAL_PARTNERSHIP_RESOURCES.map((partner) => (
              <article key={partner.id} className="expectation-card">
                <span className="expectation-step-tag">{partner.audience} in {location.city}</span>
                <h3>{partner.title}</h3>
                <p>{partner.summary}</p>
                <ul className="compact-check-list">
                  {partner.includedDeliverables.map((item) => (
                    <li key={item}>
                      <CheckCircleIcon size={15} className="text-coral" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6B. Complete Residential & Home Cleaning Services Suite */}
      <ResidentialServicesSuite location={location} compact />

      {/* 7. Location-Isolated Services & Neighborhoods Hub */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="about-explore-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>{location.name} Services &amp; Neighborhoods</span>
              </div>
              <h2 id="about-explore-heading" className="section-title">
                Explore our cleaning services and local coverage in {location.city}.
              </h2>
            </div>
            <p className="section-subtitle">
              Select any service below to review its room-by-room scope for {location.name} homes,
              or{' '}
              <a href={contactHref} className="inline-editorial-link">
                contact our {location.city} dispatch team
              </a>
              .
            </p>
          </div>

          <div className="discovery-pillars-grid">
            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                Residential Services Available in {location.name}
              </h3>
              <ul className="discovery-link-list">
                {availableServices.map((service) => (
                  <li key={service.id}>
                    <a
                      href={getLocationServiceDetailPath(location.id, service.slug)}
                      className="discovery-link-item"
                    >
                      <div>
                        <strong>
                          {service.name} in {location.city}
                        </strong>
                        <span>{service.shortDescription}</span>
                      </div>
                      <ArrowRightIcon size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                {location.city} Neighborhoods &amp; Communities Served
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

      {/* 7. Quote CTA */}
      <QuoteForm
        preselectedLocationId={location.id}
        contextKicker={`Work With ${location.name}’s Trusted Cleaning Team`}
        contextHeadline={`Ready to experience the Mojo standard in your ${location.city} home?`}
        contextSubheadline={`Share your ${location.name} home size, preferred service tier, and any custom room requests below. Our team will follow up promptly with your personalized quote.`}
      />
    </>
  );
};
