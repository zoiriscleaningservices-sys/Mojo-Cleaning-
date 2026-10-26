import React, { useMemo, useState } from 'react';
import { BUSINESS_INFO } from '../config/business';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockCheckIcon,
  MojoSparkle,
  ShieldCheckIcon,
} from '../components/Icons';
import { QuoteForm } from '../components/QuoteForm';
import { HeroWelcomeMascotBadge } from '../components/MojoMascot';
import type { FaqEntity, LocationEntity } from '../data/entities';
import { GENERAL_BUSINESS_FAQS } from '../data/business-profile';
import { GUIDE_ARTICLES_DATA } from '../data/guides-data';
import {
  getAvailableServicesForLocation,
  getLocationChecklistPath,
  getLocationFaqsPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationServiceDetailPath,
} from '../utils/location-routing';

type FaqFilter = 'all' | FaqEntity['category'];

const CATEGORY_LABELS: Record<FaqFilter, string> = {
  all: 'All Questions',
  location: 'Local Coverage',
  general: 'General & Supplies',
  service: 'Service Checklists',
  service_location: 'Local Services',
  pricing_booking: 'Pricing & Booking',
  guarantee_trust: 'Trust & 48-Hour Guarantee',
};

interface FaqsPageProps {
  location: LocationEntity;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ location }) => {
  const [selectedCategory, setSelectedCategory] = useState<FaqFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const availableServices = useMemo(
    () => getAvailableServicesForLocation(location.id),
    [location.id]
  );

  // Combine location-specific FAQs + general FAQs + available service FAQs
  const allFaqs = useMemo(() => {
    const serviceSpecific = availableServices.flatMap((svc) => svc.faqs);
    return [...location.faqs, ...GENERAL_BUSINESS_FAQS, ...serviceSpecific];
  }, [location.faqs, availableServices]);

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((item) => {
      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;
      const qLower = searchTerm.trim().toLowerCase();
      if (!qLower) return matchesCat;
      return (
        matchesCat &&
        (item.question.toLowerCase().includes(qLower) ||
          item.answer.toLowerCase().includes(qLower))
      );
    });
  }, [allFaqs, selectedCategory, searchTerm]);

  const homeHref = getLocationHomePath(location.id);
  const faqsHref = getLocationFaqsPath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);
  const quoteHref = getLocationQuotePath(location.id);

  const breadcrumbs = [
    { label: location.name, href: homeHref },
    { label: `Frequently Asked Questions`, href: faqsHref },
  ];

  const categories: FaqFilter[] = [
    'all',
    'location',
    'general',
    'service',
    'pricing_booking',
    'guarantee_trust',
  ];

  return (
    <>
      {/* 1. Location-Specific FAQ Hero */}
      <section className="interior-hero" aria-labelledby="faqs-hero-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>{location.name} FAQs • Clear Answers, Zero Guesswork</span>
              </div>

              <h1 id="faqs-hero-heading" className="interior-hero-title">
                House Cleaning Questions Answered in {location.fullStateName}
              </h1>

              <p className="interior-hero-lead">
                Find straightforward answers about our {location.name} dispatch coverage, 56-point
                room-by-room checklists, supplies, eco-friendly and pet-safe options, custom quote
                pricing, insurance, and our 48-Hour Happiness Guarantee.
              </p>

              <div className="zip-checker-card">
                <label htmlFor="faq-search-input" className="zip-checker-label">
                  Search {location.city} Questions by Keyword:
                </label>
                <div className="zip-checker-row">
                  <input
                    id="faq-search-input"
                    type="search"
                    className="form-input"
                    placeholder="e.g., supplies, pets, deep clean, oven, 48-hour guarantee..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm ? (
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
              </div>

              <ul className="interior-hero-trust-strip" aria-label="FAQ highlights">
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>Insured &amp; Bonded Team</span>
                </li>
                <li>
                  <CheckCircleIcon size={16} className="text-coral" />
                  <span>We Bring All Supplies</span>
                </li>
                <li>
                  <ClockCheckIcon size={16} className="text-coral" />
                  <span>48-Hour Happiness Guarantee</span>
                </li>
              </ul>
            </div>

            <div className="interior-hero-media">
              <div style={{ marginBottom: '12px' }}>
                <HeroWelcomeMascotBadge
                  location={location}
                  pose="wave"
                  greeting={`Have a question about cleaning in ${location.city}?`}
                  subtext="Browse our answers below or reach out to our friendly local dispatch team anytime!"
                />
              </div>
              <aside className="verified-facts-card" aria-label="Quick help box">
                <h2 className="verified-facts-title">Need Direct Assistance in {location.city}?</h2>
                <p className="editorial-body-text">
                  Our team is happy to answer questions about your specific {location.name} home
                  layout, specialty stone/hardwood finishes, or move-in/move-out timelines.
                </p>
                <dl className="verified-facts-dl">
                  <div>
                    <dt>Call or Text</dt>
                    <dd>
                      <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phoneDisplay}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={BUSINESS_INFO.emailHref}>{BUSINESS_INFO.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Verified {location.city} ZIP Codes</dt>
                    <dd>{location.zipCodes.join(', ')}</dd>
                  </div>
                  <div>
                    <dt>Office Hours</dt>
                    <dd>
                      {BUSINESS_INFO.officeHours.weekdays} • {BUSINESS_INFO.officeHours.saturday}
                    </dd>
                  </div>
                </dl>
                <div style={{ marginTop: '1.25rem' }}>
                  <a href={quoteHref} className="btn btn-primary btn-full">
                    <span>Request a {location.city} Quote</span>
                    <ArrowRightIcon size={16} />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filterable FAQ Directory */}
      <section className="editorial-section" aria-labelledby="faq-directory-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Browse by Topic</span>
              </div>
              <h2 id="faq-directory-heading" className="section-title">
                {location.name} frequently asked questions ({filteredFaqs.length})
              </h2>
            </div>

            <div className="checklist-room-tabs" role="tablist" aria-label="Filter FAQs by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`checklist-tab-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{CATEGORY_LABELS[cat]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="faq-cards-grid">
            {filteredFaqs.map((faq) => (
              <article key={faq.id} className="faq-static-card">
                <span className="faq-category-tag">{CATEGORY_LABELS[faq.category]}</span>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Related Service Guides in This Location ONLY */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="faq-guides-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Detailed {location.name} Service Guides</span>
              </div>
              <h2 id="faq-guides-heading" className="section-title">
                Explore {location.city} room checklists and service options.
              </h2>
            </div>
          </div>

          <div className="discovery-pillars-grid">
            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                {location.name} Cleaning Service Guides
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
                        <span>{svc.shortDescription}</span>
                      </div>
                      <ArrowRightIcon size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                {location.city} 56-Point Checklist &amp; Homeowner Guides
              </h3>
              <p className="discovery-panel-desc">
                Want to see every task included across Kitchen (24 tasks), Bathrooms (17 tasks), and
                Bedrooms &amp; Living Rooms (15 tasks), or read our pricing &amp; comparison guides?
              </p>
              <ul className="discovery-link-list" style={{ marginTop: '1rem' }}>
                {GUIDE_ARTICLES_DATA.map((guide) => (
                  <li key={guide.id}>
                    <a href={guide.urlPath} className="discovery-link-item">
                      <div>
                        <strong>{guide.categoryLabel}</strong>
                        <span>{guide.h1}</span>
                      </div>
                      <ArrowRightIcon size={15} />
                    </a>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={checklistHref} className="btn btn-outline-dark">
                  <span>Open 56-Point Checklist</span>
                  <ArrowRightIcon size={15} />
                </a>
                <a href="/guides/" className="btn btn-coral">
                  <span>All Homeowner Guides</span>
                  <ArrowRightIcon size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quote Request Form */}
      <QuoteForm
        preselectedLocationId={location.id}
        contextKicker={`Still Have Questions About Your ${location.city} Home?`}
        contextHeadline={`Send us a note or request your custom ${location.city} cleaning quote.`}
      />
    </>
  );
};
