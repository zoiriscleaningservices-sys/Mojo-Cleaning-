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
  PhoneIcon,
  ShieldCheckIcon,
} from '../components/Icons';
import { QuoteForm } from '../components/QuoteForm';
import { HeroWelcomeMascotBadge } from '../components/MojoMascot';
import type { LocationEntity } from '../data/entities';
import {
  getAvailableServicesForLocation,
  getLocationChecklistPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationServiceDetailPath,
  getLocationServicesPath,
} from '../utils/location-routing';

interface ChecklistPageProps {
  location: LocationEntity;
}

export const ChecklistPage: React.FC<ChecklistPageProps> = ({ location }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<'all' | ChecklistRoom['id']>('all');

  const homeHref = getLocationHomePath(location.id);
  const servicesHref = getLocationServicesPath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);
  const quoteHref = getLocationQuotePath(location.id);
  const availableServices = getAvailableServicesForLocation(location.id);

  const breadcrumbs = [
    { label: location.name, href: homeHref },
    { label: '56-Point Cleaning Checklist', href: checklistHref },
  ];

  const displayedRooms =
    selectedRoomId === 'all'
      ? CLEANING_CHECKLIST
      : CLEANING_CHECKLIST.filter((r) => r.id === selectedRoomId);

  return (
    <>
      {/* 1. Checklist Hero */}
      <section className="interior-hero" aria-labelledby="checklist-hero-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>
                  {location.name} • 56-Point Room-by-Room Standard
                </span>
              </div>

              <h1 id="checklist-hero-heading" className="interior-hero-title">
                56-Point House Cleaning Checklist in {location.fullStateName}
              </h1>

              <p className="interior-hero-lead">
                No mystery checklists or vague promises. Compare every single surface we clean across
                your kitchen (24 tasks), bathrooms (17 tasks), and bedrooms &amp; living areas (15
                tasks) for Standard Recurring (37 points), Deep Cleaning (47 points), and
                Move-In/Move-Out (56 points) appointments in {location.name}.
              </p>

              <div className="interior-hero-actions">
                <a href={quoteHref} className="btn btn-primary btn-lg">
                  <span>Request a Custom {location.city} Quote</span>
                  <ArrowRightIcon size={17} />
                </a>
                <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-lg">
                  <PhoneIcon size={17} />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <ul className="interior-hero-trust-strip" aria-label="Checklist highlights">
                <li>
                  <CheckCircleIcon size={16} className="text-coral" />
                  <span>37 Standard • 47 Deep • 56 Move-In/Out Checkpoints</span>
                </li>
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>100% Customizable to Your {location.city} Home</span>
                </li>
                <li>
                  <ClockCheckIcon size={16} className="text-coral" />
                  <span>Backed by Our 48-Hour Happiness Guarantee</span>
                </li>
              </ul>
            </div>

            <div className="interior-hero-media">
              <div style={{ marginBottom: '12px' }}>
                <HeroWelcomeMascotBadge
                  location={location}
                  pose="checklist"
                  greeting={`56 Verified Room Checkpoints in ${location.city}!`}
                  subtext="Every task is checked off across Kitchen, Bathrooms, Bedrooms & Living Areas."
                />
              </div>
              <aside className="verified-facts-card" aria-label="Checklist tier summary">
                <h2 className="verified-facts-title">How Our 3 Checklist Tiers Compare</h2>
                <dl className="verified-facts-dl">
                  <div>
                    <dt>Standard / Recurring Clean (37 Points)</dt>
                    <dd>
                      Designed for weekly, bi-weekly, or monthly upkeep in {location.city}. Covers
                      all routine sanitization, dusting, floors, countertops, mirrors, and exterior
                      appliance care.
                    </dd>
                  </div>
                  <div>
                    <dt>Deep House Cleaning (47 Points)</dt>
                    <dd>
                      Includes all 37 Standard tasks plus 10 intensive detail tasks: hand-washed
                      baseboards, blinds, ceiling fan blades, door frames, window sills, and heavy
                      soap-scum removal.
                    </dd>
                  </div>
                  <div>
                    <dt>Move-In / Move-Out Clean (56 Points)</dt>
                    <dd>
                      Includes all 47 Deep Clean tasks plus 9 empty-home interior tasks: inside
                      cabinets, drawers, closets, pantry shelves, and detailed trim/wall spot care.
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Complete Interactive 56-Point Room-by-Room Matrix */}
      <section className="editorial-section" aria-labelledby="full-checklist-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Complete 56-Task Breakdown</span>
              </div>
              <h2 id="full-checklist-heading" className="section-title">
                Inspect every task by room and service tier.
              </h2>
            </div>

            <div className="checklist-room-tabs" role="tablist" aria-label="Filter checklist by room">
              <button
                type="button"
                role="tab"
                aria-selected={selectedRoomId === 'all'}
                className={`checklist-tab-btn ${selectedRoomId === 'all' ? 'is-active' : ''}`}
                onClick={() => setSelectedRoomId('all')}
              >
                <span>All Rooms</span>
                <span className="checklist-tab-count">56</span>
              </button>
              {CLEANING_CHECKLIST.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedRoomId === room.id}
                  className={`checklist-tab-btn ${selectedRoomId === room.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedRoomId(room.id)}
                >
                  <span>{room.name}</span>
                  <span className="checklist-tab-count">{room.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="checklist-rooms-stack" style={{ display: 'grid', gap: '2rem' }}>
            {displayedRooms.map((room) => (
              <div key={room.id} className="checklist-explorer-card">
                <div className="checklist-room-summary-bar">
                  <div>
                    <strong>
                      {room.name} ({room.count} Checkpoints)
                    </strong>{' '}
                    — {room.summary}
                  </div>
                  <span className="checklist-custom-badge">
                    Included for {location.name} Homes
                  </span>
                </div>

                <div className="checklist-scroll-container">
                  <table className="checklist-table">
                    <thead>
                      <tr>
                        <th scope="col" className="col-task">
                          {room.name} Task
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
                      {room.tasks.map((item) => (
                        <tr key={item.task}>
                          <th scope="row" className="cell-task">
                            <span>{item.task}</span>
                            {item.addOnNote ? (
                              <span className="task-addon-pill">★ {item.addOnNote}</span>
                            ) : null}
                          </th>
                          <td className="cell-tier">
                            {item.standard ? (
                              <span
                                className="tier-included"
                                aria-label="Included in Standard Clean"
                              >
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Explore Services in This Location */}
      <section className="editorial-section bg-warm-cream" aria-labelledby="checklist-services-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Choose Your {location.name} Service</span>
              </div>
              <h2 id="checklist-services-heading" className="section-title">
                Book the checklist tier that matches your {location.city} home.
              </h2>
            </div>
            <p className="section-subtitle">
              Explore our dedicated {location.name} service pages or{' '}
              <a href={servicesHref} className="inline-editorial-link">
                return to the {location.city} services overview
              </a>
              .
            </p>
          </div>

          <div className="discovery-pillars-grid">
            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                Services Offered in {location.name}
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
                        <span>{svc.checklistPointsLabel}</span>
                      </div>
                      <ArrowRightIcon size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="discovery-panel">
              <h3 className="discovery-panel-title">
                100% Customizable for Your Household
              </h3>
              <p className="discovery-panel-desc">
                Want to add inside-oven or inside-refrigerator cleaning to a routine visit, skip an
                unused guest bedroom, or request eco-friendly supplies for your {location.city}{' '}
                home? Note your preferences in our quote form below.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <a href={quoteHref} className="btn btn-primary">
                  <span>Request a Tailored {location.city} Quote</span>
                  <ArrowRightIcon size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quote Form */}
      <QuoteForm
        preselectedLocationId={location.id}
        contextKicker={`${location.name} 56-Point Checklist Quote`}
        contextHeadline={`Ready to book your ${location.city} clean?`}
      />
    </>
  );
};
