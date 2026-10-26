import React, { useState } from 'react';
import {
  BUSINESS_INFO,
  CLEANING_CHECKLIST,
  type ChecklistRoom,
} from '../config/business';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockCheckIcon,
  MojoSparkle,
  ShieldCheckIcon,
} from '../components/Icons';
import { QuoteForm, type SelectableServiceKey } from '../components/QuoteForm';
import { AvailableServicesCatalog } from '../components/AvailableServicesCatalog';
import { HeroTeamShowcase } from '../components/HeroTeamShowcase';
import { ResidentialServicesSuite } from '../components/ResidentialServicesSuite';
import type { LocationEntity } from '../data/entities';
import {
  HOW_TO_EVALUATE_CLEANING_COMPANY,
  LOCAL_PARTNERSHIP_RESOURCES,
} from '../data/seo-domination-system';
import {
  getLocationChecklistPath,
  getLocationFaqsPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationServicesPath,
} from '../utils/location-routing';

interface ServicesIndexPageProps {
  location: LocationEntity;
}

export const ServicesIndexPage: React.FC<ServicesIndexPageProps> = ({ location }) => {
  const [selectedServiceId, setSelectedServiceId] =
    useState<SelectableServiceKey>('recurring-residential-cleaning');
  const [activeRoom, setActiveRoom] = useState<ChecklistRoom['id']>('kitchen');
  const [checklistExpanded, setChecklistExpanded] = useState<boolean>(false);

  const currentRoom =
    CLEANING_CHECKLIST.find((r) => r.id === activeRoom) || CLEANING_CHECKLIST[0];
  const visibleTasks = checklistExpanded
    ? currentRoom.tasks
    : currentRoom.tasks.slice(0, 10);

  const homeHref = getLocationHomePath(location.id);
  const servicesHref = getLocationServicesPath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);
  const faqsHref = getLocationFaqsPath(location.id);
  const quoteHref = getLocationQuotePath(location.id);

  const breadcrumbs = [
    { label: location.name, href: homeHref },
    { label: `Cleaning Services in ${location.city}`, href: servicesHref },
  ];

  return (
    <>
      {/* 1. Location-Specific Services Hero */}
      <section className="interior-hero" aria-labelledby="services-hero-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>
                  {location.name} Cleaning Services • {location.county}
                </span>
              </div>

              <h1 id="services-hero-heading" className="interior-hero-title">
                Cleaning Services in {location.fullStateName}
              </h1>

              <p className="interior-hero-lead">
                From weekly and biweekly recurring house cleaning in {location.city} to intensive
                47-point deep cleans, 56-point empty-home move-in/move-out resets, and
                post-construction dust removal—compare every Mojo Cleaning service offered in{' '}
                {location.name}.
              </p>

              <div className="interior-hero-actions">
                <a href={quoteHref} className="btn btn-primary btn-lg">
                  <span>Request a {location.city} Quote</span>
                  <ArrowRightIcon size={17} />
                </a>
                <a href={checklistHref} className="btn btn-outline-dark btn-lg">
                  <span>View 56-Point Checklist</span>
                </a>
              </div>

              <ul className="interior-hero-trust-strip" aria-label="Service highlights">
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>All Supplies &amp; Equipment Provided</span>
                </li>
                <li>
                  <CheckCircleIcon size={16} className="text-coral" />
                  <span>Eco-Friendly &amp; Pet-Safe Options</span>
                </li>
                <li>
                  <ClockCheckIcon size={16} className="text-coral" />
                  <span>48-Hour Happiness Guarantee</span>
                </li>
              </ul>
            </div>

            <div className="interior-hero-media">
              <HeroTeamShowcase location={location} variant="services" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Detailed Previews for All Approved Services in This Location */}
      <section className="editorial-section" aria-labelledby="service-categories-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Available Residential &amp; Home Cleaning Services in {location.name}</span>
              </div>
              <h2 id="service-categories-heading" className="section-title">
                Available Residential Cleaning Services in {location.city}
              </h2>
            </div>
            <p className="section-subtitle">
              Every {location.name} residence has different rhythms. Whether you want effortless
              weekly upkeep, a top-to-bottom reset before hosting, or a turnkey handover for a real
              estate closing, compare every residential and home cleaning service offered in{' '}
              {location.city}.
            </p>
          </div>

          <AvailableServicesCatalog location={location} />
        </div>
      </section>

      {/* 2B. Complete Residential & Home Cleaning Services Menu */}
      <ResidentialServicesSuite location={location} />

      {/* 3. Interactive 56-Point Room-by-Room Checklist Comparison */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="comparison-heading">
        <div className="container">
          <div id="checklist-explorer" className="checklist-explorer-card">
            <div className="checklist-header">
              <div>
                <div className="section-eyebrow">
                  <MojoSparkle className="text-coral" size={13} />
                  <span>Total Transparency • 56 Verified Tasks in {location.name}</span>
                </div>
                <h2 id="comparison-heading" className="checklist-title">
                  Room-by-Room Cleaning Checklist Comparison
                </h2>
                <p className="checklist-subtitle">
                  Compare what is included across Standard (Recurring), Deep, and Move-In /
                  Move-Out cleans in {location.name}. You can also open our dedicated{' '}
                  <a href={checklistHref} className="inline-editorial-link">
                    {location.city} 56-Point Cleaning Checklist page
                  </a>
                  .
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
                      id={`services-tab-${room.id}`}
                      aria-selected={isSelected}
                      aria-controls={`services-panel-${room.id}`}
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
              id={`services-panel-${currentRoom.id}`}
              role="tabpanel"
              aria-labelledby={`services-tab-${currentRoom.id}`}
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
                  {currentRoom.tasks.length > 10 ? (
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
                    <span>Full {location.city} 56-Point Checklist</span>
                    <ArrowRightIcon size={14} />
                  </a>
                </div>

                <a
                  href="#quote"
                  className="checklist-custom-cta"
                  onClick={() => setSelectedServiceId('deep-house-cleaning')}
                >
                  <span>Need a custom {location.city} checklist? Request a quote</span>
                  <ArrowRightIcon size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Location-Specific Service FAQs */}
      <section className="editorial-section" aria-labelledby="services-faq-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>{location.name} Service Questions</span>
              </div>
              <h2 id="services-faq-heading" className="section-title">
                Cleaning Services Questions Answered
              </h2>
            </div>
            <p className="section-subtitle">
              Have another question? Browse our{' '}
              <a href={faqsHref} className="inline-editorial-link">
                complete {location.city} FAQ hub
              </a>{' '}
              or call <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phoneDisplay}</a>.
            </p>
          </div>

          <div className="faq-cards-grid">
            {location.faqs.map((faq) => (
              <article key={faq.id} className="faq-static-card">
                <span className="faq-category-tag">{location.name}</span>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4B. How to Evaluate a Residential Cleaning Company & B2B Turnover Resources */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="evaluate-company-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Homeowner &amp; Property Professional Guide • {location.name}</span>
              </div>
              <h2 id="evaluate-company-heading" className="section-title">
                How to Evaluate a Residential Cleaning Company
              </h2>
            </div>
            <p className="section-subtitle">
              Whether you are hiring a weekly cleaner for your {location.city} residence or
              coordinating a lease turnover, use these five criteria to compare any cleaning
              provider.
            </p>
          </div>

          <div className="expectation-cards-grid">
            {HOW_TO_EVALUATE_CLEANING_COMPANY.map((crit) => (
              <article key={crit.number} className="expectation-card">
                <span className="expectation-step-tag">Question {crit.number}</span>
                <h3>{crit.question}</h3>
                <p>{crit.whyItMatters}</p>
                <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>
                  Mojo Standard: {crit.mojoStandard}
                </p>
              </article>
            ))}
          </div>

          <div className="local-guidance-callout" style={{ marginTop: '2rem' }}>
            <h3>
              Turnover &amp; Handoff Cleaning for Realtors, Landlords &amp; Builders
            </h3>
            <div className="expectation-cards-grid" style={{ marginTop: '1rem' }}>
              {LOCAL_PARTNERSHIP_RESOURCES.map((res) => (
                <div key={res.id}>
                  <strong>{res.audience}:</strong>
                  <p style={{ marginTop: '0.25rem' }}>{res.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quote Form */}
      <QuoteForm
        selectedServiceId={selectedServiceId}
        preselectedLocationId={location.id}
        contextKicker={`Compare & Request Your ${location.name} Quote`}
        contextHeadline={`Request a Cleaning Quote in ${location.city}`}
      />
    </>
  );
};
