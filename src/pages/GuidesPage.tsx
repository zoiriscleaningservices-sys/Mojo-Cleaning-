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
import { HeroWelcomeMascotBadge } from '../components/MojoMascot';
import { QuoteForm } from '../components/QuoteForm';
import type { LocationEntity } from '../data/entities';
import {
  GUIDE_ARTICLES_BY_SLUG,
  GUIDE_ARTICLES_DATA,
  type GuideArticleEntity,
  type GuideSlug,
} from '../data/guides-data';
import { LOCATIONS_BY_ID, LOCATIONS_DATA } from '../data/locations-data';
import { withSiteBasePath } from '../data/page-registry';
import { SERVICES_BY_ID } from '../data/services-data';
import {
  getLocationChecklistPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationServiceDetailPath,
  getLocationServicesPath,
} from '../utils/location-routing';

interface GuidesHubPageProps {
  activeLocation: LocationEntity;
}

export const GuidesHubPage: React.FC<GuidesHubPageProps> = ({ activeLocation }) => {
  const breadcrumbs = [
    { label: activeLocation.name, href: getLocationHomePath(activeLocation.id) },
    { label: 'Cleaning Guides & Resources', href: '/guides/' },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <div style={{ marginBottom: '1rem' }}>
                <HeroWelcomeMascotBadge
                  location={activeLocation}
                  pose="checklist"
                  greeting="Welcome to our Homeowner Resource Library!"
                  subtext="Transparent guides on pricing factors, 37/47/56-point scopes, move-out walkthroughs, and post-construction dust removal."
                />
              </div>
              <div className="eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Verified Homeowner Guides • Huntsville &amp; North Alabama</span>
              </div>
              <h1 className="page-hero-title">
                North Alabama Residential Cleaning Guides &amp; Homeowner Resources
              </h1>
              <p className="page-hero-lead">
                Practical, fact-checked guides written by the Mojo Cleaning team to help homeowners,
                tenants, property managers, and builders across Huntsville, Madison, Hampton Cove,
                Owens Cross Roads, and Athens choose the right cleaning scope.
              </p>
              <div className="page-hero-actions">
                <a
                  href={getLocationQuotePath(activeLocation.id)}
                  className="btn btn-coral btn-lg"
                >
                  <span>Request a Custom Quote</span>
                  <ArrowRightIcon size={18} />
                </a>
                <a
                  href={getLocationChecklistPath(activeLocation.id)}
                  className="btn btn-outline-dark btn-lg"
                >
                  <span>Explore 56-Point Checklist</span>
                </a>
              </div>
            </div>

            <aside className="page-hero-card">
              <h3>What You’ll Find in Our Guides</h3>
              <ul className="hero-card-list">
                <li>
                  <CheckCircleIcon className="text-coral" size={18} />
                  <span>
                    <strong>Pricing &amp; Estimate Drivers:</strong> How square footage, bathroom
                    count, and checklist depth determine your written quote
                  </span>
                </li>
                <li>
                  <CheckCircleIcon className="text-coral" size={18} />
                  <span>
                    <strong>Scope Comparisons:</strong> Side-by-side breakdown of 37-Point Recurring
                    vs. 47-Point Deep vs. 56-Point Move-In/Out cleans
                  </span>
                </li>
                <li>
                  <CheckCircleIcon className="text-coral" size={18} />
                  <span>
                    <strong>Walkthrough &amp; Post-Build Prep:</strong> How to prepare for lease
                    inspections, real estate closings, and drywall dust removal
                  </span>
                </li>
                <li>
                  <ShieldCheckIcon className="text-coral" size={18} />
                  <span>
                    <strong>48-Hour Happiness Guarantee:</strong> Every service is backed by our
                    written re-clean promise
                  </span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container">
          <div className="section-header text-center">
            <div className="eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>Published Resource Articles ({GUIDE_ARTICLES_DATA.length} Guides)</span>
            </div>
            <h2 className="section-title">
              Explore Cleaning Pricing, Scope Comparisons &amp; Walkthrough Guides
            </h2>
            <p className="section-subtitle">
              Each guide answers a specific residential cleaning question with verified task lists
              and direct links to local services.
            </p>
          </div>

          <div className="service-detail-cards-grid">
            {GUIDE_ARTICLES_DATA.map((guide) => (
              <article key={guide.id} className="service-overview-card">
                <div className="service-overview-content">
                  <div className="service-overview-meta">
                    <span className="badge-pill">{guide.categoryLabel}</span>
                    <span className="checklist-pill">{guide.readTimeLabel}</span>
                  </div>
                  <h2>
                    <a href={guide.urlPath}>{guide.h1}</a>
                  </h2>
                  <p className="service-tagline">{guide.eyebrow}</p>
                  <p className="service-desc">{guide.summaryLead}</p>

                  <div className="service-ideal-box">
                    <strong>Key Takeaways Covered:</strong>
                    <ul>
                      {guide.keyTakeaways.map((item) => (
                        <li key={item}>
                          <CheckCircleIcon className="text-coral" size={15} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-overview-actions">
                    <a href={guide.urlPath} className="btn btn-coral">
                      <span>Read Complete Guide</span>
                      <ArrowRightIcon size={16} />
                    </a>
                    <a
                      href={getLocationQuotePath(activeLocation.id)}
                      className="btn btn-outline-dark"
                    >
                      <span>Get a Quote</span>
                    </a>
                  </div>
                </div>

                <div className="service-overview-media">
                  <a href={guide.urlPath} tabIndex={-1} aria-hidden="true">
                    <picture>
                      {guide.heroImage.webpMobile ? (
                        <source
                          media="(max-width: 640px)"
                          srcSet={withSiteBasePath(guide.heroImage.webpMobile)}
                          type="image/webp"
                        />
                      ) : null}
                      <source srcSet={withSiteBasePath(guide.heroImage.webp)} type="image/webp" />
                      <img
                        src={withSiteBasePath(guide.heroImage.src)}
                        alt={guide.heroImage.alt}
                        width={guide.heroImage.width}
                        height={guide.heroImage.height}
                        loading="lazy"
                        className="rounded-photo shadow-lg"
                      />
                    </picture>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-plum text-cream">
        <div className="container">
          <div className="section-header text-center">
            <div className="eyebrow eyebrow-light">
              <MapPinIcon className="text-gold" size={14} />
              <span>Local Service Areas &amp; Core Checklists</span>
            </div>
            <h2 className="section-title text-cream">
              Connect Guides to Your North Alabama Community
            </h2>
            <p className="section-subtitle text-cream-muted">
              Select your community below to view local service availability, neighborhood coverage,
              and our room-by-room 56-point checklist.
            </p>
          </div>

          <div className="criteria-cards-grid">
            {LOCATIONS_DATA.map((loc) => (
              <div key={loc.id} className="criteria-card">
                <span className="criteria-num">{loc.county}</span>
                <h3>
                  <a href={getLocationHomePath(loc.id)} style={{ color: 'inherit' }}>
                    {loc.fullStateName}
                  </a>
                </h3>
                <p>
                  Verified ZIP codes: <strong>{loc.zipCodes.join(', ')}</strong>. Explore{' '}
                  <a href={getLocationServicesPath(loc.id)} className="text-gold">
                    {loc.city} cleaning services
                  </a>{' '}
                  or review the{' '}
                  <a href={getLocationChecklistPath(loc.id)} className="text-gold">
                    {loc.city} 56-point checklist
                  </a>
                  .
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteForm preselectedLocationId={activeLocation.id} />
    </>
  );
};

interface GuideArticlePageProps {
  guideSlug: GuideSlug;
  activeLocation: LocationEntity;
}

export const GuideArticlePage: React.FC<GuideArticlePageProps> = ({
  guideSlug,
  activeLocation,
}) => {
  const guide: GuideArticleEntity =
    GUIDE_ARTICLES_BY_SLUG[guideSlug] || GUIDE_ARTICLES_DATA[0];

  const breadcrumbs = [
    { label: activeLocation.name, href: getLocationHomePath(activeLocation.id) },
    { label: 'Cleaning Guides', href: '/guides/' },
    { label: guide.categoryLabel, href: guide.urlPath },
  ];

  const otherGuides = GUIDE_ARTICLES_DATA.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <article>
        <header className="page-hero">
          <div className="container">
            <Breadcrumbs items={breadcrumbs} />
            <div className="page-hero-grid">
              <div className="page-hero-copy">
                <div style={{ marginBottom: '1rem' }}>
                  <HeroWelcomeMascotBadge
                    location={activeLocation}
                    pose="checklist"
                    greeting={`${guide.categoryLabel} • ${guide.readTimeLabel}`}
                    subtext={`Verified by ${guide.authorName} • Last updated ${guide.lastModified}`}
                  />
                </div>
                <div className="eyebrow">
                  <MojoSparkle className="text-coral" size={14} />
                  <span>{guide.eyebrow}</span>
                </div>
                <h1 className="page-hero-title">{guide.h1}</h1>
                <p className="page-hero-lead">{guide.summaryLead}</p>
                <div className="page-hero-actions">
                  <a
                    href={getLocationQuotePath(activeLocation.id)}
                    className="btn btn-coral btn-lg"
                  >
                    <span>Request Your Custom Quote</span>
                    <ArrowRightIcon size={18} />
                  </a>
                  <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-lg">
                    <PhoneIcon size={18} />
                    <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <aside className="page-hero-card">
                <h3>Key Takeaways at a Glance</h3>
                <ul className="hero-card-list">
                  {guide.keyTakeaways.map((point) => (
                    <li key={point}>
                      <CheckCircleIcon className="text-coral" size={18} />
                      <span>{point}</span>
                    </li>
                  ))}
                  <li>
                    <ClockCheckIcon className="text-coral" size={18} />
                    <span>
                      Backed by our <strong>48-Hour Happiness Guarantee</strong>
                    </span>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </header>

        <section className="section bg-cream">
          <div className="container">
            <div className="two-col-asymmetric">
              <div className="prose-stack">
                {guide.sections.map((sec) => (
                  <div key={sec.id} id={sec.id} style={{ marginBottom: '2.25rem' }}>
                    <h2 className="section-title">{sec.heading}</h2>
                    {sec.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                    {sec.bulletPoints && sec.bulletPoints.length > 0 ? (
                      <ul className="check-list-grid" style={{ marginTop: '1rem' }}>
                        {sec.bulletPoints.map((bp) => (
                          <li key={bp}>
                            <CheckCircleIcon className="text-coral" size={18} />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}

                {guide.comparisonTable ? (
                  <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <h2 className="section-title">{guide.comparisonTable.caption}</h2>
                    <div className="checklist-table-wrapper">
                      <table className="checklist-comparison-table">
                        <thead>
                          <tr>
                            <th>Service Feature / Scope Area</th>
                            <th>{guide.comparisonTable.colAHeader}</th>
                            <th>{guide.comparisonTable.colBHeader}</th>
                            <th>Operational Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          {guide.comparisonTable.rows.map((row) => (
                            <tr key={row.feature}>
                              <td>
                                <strong>{row.feature}</strong>
                              </td>
                              <td>{row.optionA}</td>
                              <td>{row.optionB}</td>
                              <td>{row.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>

              <aside className="Trust-card-stack">
                <div className="info-box">
                  <h3>Related Cleaning Services in {activeLocation.name}</h3>
                  <p>
                    Explore the exact room-by-room scope and request an estimate for the services
                    discussed in this guide:
                  </p>
                  <ul className="check-list-compact" style={{ marginTop: '0.85rem' }}>
                    {guide.relatedServiceIds.map((svcId) => {
                      const svc = SERVICES_BY_ID[svcId];
                      if (!svc) return null;
                      const detailHref = getLocationServiceDetailPath(activeLocation.id, svc.id);
                      return (
                        <li key={svc.id}>
                          <CheckCircleIcon className="text-coral" size={16} />
                          <a href={detailHref}>
                            <strong>{svc.name}</strong> ({svc.checklistPointsLabel}) in{' '}
                            {activeLocation.city}
                          </a>
                        </li>
                      );
                    })}
                    <li>
                      <CheckCircleIcon className="text-coral" size={16} />
                      <a href={getLocationChecklistPath(activeLocation.id)}>
                        <strong>Complete 56-Point Room-by-Room Checklist</strong>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="info-box info-box-warm">
                  <h3>Verified Communities Covered</h3>
                  <p>
                    Mojo Cleaning provides insured residential cleaning across these verified North
                    Alabama communities:
                  </p>
                  <ul className="check-list-compact" style={{ marginTop: '0.85rem' }}>
                    {guide.relatedLocationIds.map((locId) => {
                      const loc = LOCATIONS_BY_ID[locId];
                      if (!loc) return null;
                      return (
                        <li key={loc.id}>
                          <MapPinIcon className="text-coral" size={16} />
                          <a href={getLocationHomePath(loc.id)}>
                            <strong>{loc.fullStateName}</strong> (ZIPs: {loc.zipCodes.join(', ')})
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {guide.faqs.length > 0 ? (
          <section className="section bg-cream-alt">
            <div className="container">
              <div className="section-header text-center">
                <div className="eyebrow">
                  <MojoSparkle className="text-coral" size={14} />
                  <span>Guide FAQs</span>
                </div>
                <h2 className="section-title">Common Questions About {guide.categoryLabel}</h2>
              </div>
              <div className="faq-accordion-list">
                {guide.faqs.map((faq) => (
                  <details key={faq.id} className="faq-details-item" open>
                    <summary className="faq-summary">
                      <span>{faq.question}</span>
                      <span className="faq-icon" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section bg-cream">
          <div className="container">
            <div className="section-header text-center">
              <div className="eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Continue Exploring</span>
              </div>
              <h2 className="section-title">More Homeowner Cleaning Guides</h2>
            </div>
            <div className="related-cards-grid">
              {otherGuides.map((other) => (
                <a key={other.id} href={other.urlPath} className="related-service-card">
                  <span className="badge-pill">{other.categoryLabel}</span>
                  <h3>{other.h1}</h3>
                  <p>{other.metaDescription}</p>
                  <span className="link-arrow">
                    Read Guide <ArrowRightIcon size={15} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </article>

      <QuoteForm preselectedLocationId={activeLocation.id} />
    </>
  );
};
