import React, { useState } from 'react';
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
import { QuoteForm } from '../components/QuoteForm';
import { LOCATIONS_DATA } from '../data/locations-data';
import { checkZipOrCityCoverage } from '../erp/service-boundary';
import {
  getAvailableServicesForLocation,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationServiceDetailPath,
} from '../utils/location-routing';

export const LocationsIndexPage: React.FC = () => {
  const [lookupQuery, setLookupQuery] = useState('');
  const coverageResult = lookupQuery.trim() ? checkZipOrCityCoverage(lookupQuery) : null;

  const breadcrumbs = [
    { label: 'Mojo Cleaning Home', href: '/' },
    { label: 'All Service Locations', href: '/locations/' },
  ];

  return (
    <>
      {/* 1. Locations Directory Hero */}
      <section className="interior-hero" aria-labelledby="locations-hero-heading">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="interior-hero-grid">
            <div className="interior-hero-copy">
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Verified Service Area Directory • Madison &amp; Limestone County, AL</span>
              </div>

              <h1 id="locations-hero-heading" className="interior-hero-title">
                North Alabama House Cleaning Service Areas
              </h1>

              <p className="interior-hero-lead">
                Mojo Cleaning is locally rooted in Huntsville, Alabama, dispatching insured,
                background-checked residential cleaning specialists directly to homes across five
                verified North Alabama service areas. Select your community below to explore local
                services, room-by-room checklists, FAQs, and custom quote requests tailored to your
                area.
              </p>

              {/* Interactive ZIP / City Coverage Finder */}
              <div className="zip-checker-card">
                <label htmlFor="zip-lookup-input" className="zip-checker-label">
                  Check Your ZIP Code or Community Coverage:
                </label>
                <div className="zip-checker-row">
                  <input
                    id="zip-lookup-input"
                    type="text"
                    className="form-input"
                    placeholder="Enter ZIP (e.g., 35801, 35758, 35763, 35611) or city name..."
                    value={lookupQuery}
                    onChange={(e) => setLookupQuery(e.target.value)}
                  />
                  <a href={ BUSINESS_INFO.phoneHref } className="btn btn-outline-dark">
                    <PhoneIcon size={15} />
                    <span>{BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
                {coverageResult ? (
                  <div
                    className={`zip-checker-result ${coverageResult.matched ? 'is-covered' : 'is-pending'}`}
                    role="status"
                    aria-live="polite"
                  >
                    <p>{coverageResult.message}</p>
                    {coverageResult.locations[0] ? (
                      <a
                        href={getLocationHomePath(coverageResult.locations[0].id)}
                        className="inline-editorial-link"
                      >
                        Explore {coverageResult.locations[0].city} Experience →
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <ul className="interior-hero-trust-strip" aria-label="Service-Area Business transparency">
                <li>
                  <ShieldCheckIcon size={16} className="text-coral" />
                  <span>Mobile Service-Area Teams (We Travel to Your Home)</span>
                </li>
                <li>
                  <CheckCircleIcon size={16} className="text-coral" />
                  <span>All Supplies &amp; Equipment Included</span>
                </li>
                <li>
                  <ClockCheckIcon size={16} className="text-coral" />
                  <span>48-Hour Happiness Guarantee</span>
                </li>
              </ul>
            </div>

            <div className="interior-hero-media">
              <div className="map-frame-card">
                <div className="map-card-topbar">
                  <div className="map-topbar-title">
                    <MapPinIcon size={16} className="text-coral" />
                    <span>North Alabama Service Region</span>
                  </div>
                  <span className="map-sab-badge">5 Verified Communities</span>
                </div>

                <div className="map-iframe-container">
                  <iframe
                    src={BUSINESS_INFO.googleMaps.embedUrl}
                    title="Mojo Cleaning Service Area Map — Huntsville, Madison, Hampton Cove, Owens Cross Roads, and Athens, Alabama"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="service-area-iframe"
                    allowFullScreen
                  />
                </div>

                <div className="map-card-footer">
                  <p className="map-footer-note">
                    <strong>Transparent Service-Area Disclosure:</strong> Mojo Cleaning LLC is
                    headquartered in Huntsville, AL and operates as an on-site residential
                    Service-Area Business (SAB). Our mobile teams travel directly to homes in each
                    verified community below rather than operating separate walk-in retail offices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Location Directory Cards */}
      <section className="editorial-section" aria-labelledby="verified-cities-heading">
        <div className="container">
          <div className="section-header-split">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Select Your Service Area</span>
              </div>
              <h2 id="verified-cities-heading" className="section-title">
                All 5 verified Mojo Cleaning service areas.
              </h2>
            </div>
            <p className="section-subtitle">
              Selecting a community opens its dedicated website experience—including local services,
              neighborhood coverage, 56-point room checklists, FAQs, and quote requests.
            </p>
          </div>

          <div className="locations-directory-grid">
            {LOCATIONS_DATA.map((loc) => {
              const locServices = getAvailableServicesForLocation(loc.id);
              const homeHref = getLocationHomePath(loc.id);
              const quoteHref = getLocationQuotePath(loc.id);

              return (
                <article
                  key={loc.id}
                  className={`location-hub-card location-directory-visual-card ${loc.isPrimaryHub ? 'is-primary' : ''}`}
                >
                  <div className="location-card-media-wrap">
                    <a href={homeHref} tabIndex={-1} aria-hidden="true">
                      <picture>
                        {loc.heroImage.webpMobile ? (
                          <source
                            media="(max-width: 640px)"
                            srcSet={loc.heroImage.webpMobile}
                            type="image/webp"
                          />
                        ) : null}
                        <source srcSet={loc.heroImage.webp} type="image/webp" />
                        <img
                          src={loc.heroImage.src}
                          alt={loc.heroImage.alt}
                          width={loc.heroImage.width}
                          height={loc.heroImage.height}
                          loading="lazy"
                          className="location-card-photo"
                        />
                      </picture>
                    </a>
                    <div className="location-card-badges">
                      <span className="community-region-pill">
                        {loc.county} • {loc.regionLabel}
                      </span>
                      <span className="location-sab-pill">
                        {loc.isPrimaryHub ? 'Primary Dispatch Hub' : 'Verified Service Area'}
                      </span>
                    </div>
                  </div>

                  <div className="location-hub-body">
                    <div className="location-hub-header">
                      <h3 className="location-hub-title">
                        <a href={homeHref}>
                          <MapPinIcon size={18} className="text-coral" />
                          <span>{loc.fullStateName}</span>
                        </a>
                      </h3>
                    </div>

                    <p className="location-hub-desc">{loc.directoryCardSummary}</p>

                    <div className="location-hub-meta">
                      <div>
                        <strong>Verified ZIP Codes:</strong> {loc.zipCodes.join(', ')}
                      </div>
                      <div>
                        <strong>Communities &amp; Corridors:</strong>{' '}
                        {loc.neighborhoods.slice(0, 5).join(', ')}
                      </div>
                      <div className="location-sab-note">{loc.serviceAvailabilityNote}</div>
                    </div>

                    <div className="location-hub-sublinks">
                      <span className="sublinks-label">
                        Key Services Offered in {loc.city}:
                      </span>
                      <div className="discovery-chip-grid">
                        {locServices.map((svc) => (
                          <a
                            key={svc.id}
                            href={getLocationServiceDetailPath(loc.id, svc.slug)}
                            className="discovery-location-chip"
                          >
                            <span>{svc.shortName}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="location-hub-footer">
                      <a href={homeHref} className="btn btn-primary">
                        <span>Explore {loc.city}</span>
                        <ArrowRightIcon size={16} />
                      </a>
                      <a href={quoteHref} className="btn btn-outline-dark">
                        <span>Request {loc.city} Quote</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Quote Form */}
      <QuoteForm
        preselectedLocationId="huntsville-al"
        contextKicker="North Alabama Residential Cleaning Quote"
        contextHeadline="Request a House Cleaning Quote in Your Area"
        contextSubheadline="Serving Huntsville, Madison, Hampton Cove, Owens Cross Roads, and Athens, Alabama. Complete the quote form below and our team will follow up promptly."
      />
    </>
  );
};
