import React from 'react';
import { BUSINESS_INFO, SERVICE_AREAS } from '../config/business';
import {
  ArrowRightIcon,
  ClockCheckIcon,
  MapPinIcon,
  MojoSparkle,
  PhoneIcon,
} from './Icons';

export const ServiceAreaSection: React.FC = () => {
  return (
    <section
      id="service-areas"
      className="service-area-section"
      aria-labelledby="service-area-heading"
    >
      <div className="container">
        <div className="section-header-split">
          <div>
            <div className="section-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>Where We Operate</span>
            </div>
            <h2 id="service-area-heading" className="section-title">
              Good Mojo, close to home.
            </h2>
          </div>

          <p className="section-subtitle">
            {BUSINESS_INFO.name} is locally based in {BUSINESS_INFO.primaryCity},{' '}
            {BUSINESS_INFO.primaryState}, providing on-site residential cleaning throughout
            Huntsville, Madison, and surrounding Madison County communities.
          </p>
        </div>

        <div className="service-area-layout">
          {/* Left Communities & Hours List */}
          <div className="service-area-list-col">
            <div className="communities-grid" role="list" aria-label="Confirmed Service Areas">
              {SERVICE_AREAS.map((area) => (
                <article
                  key={area.name}
                  role="listitem"
                  className={`community-card ${area.isPrimary ? 'is-primary' : ''}`}
                >
                  <div className="community-card-header">
                    <div className="community-name-group">
                      <MapPinIcon size={17} className="text-coral" />
                      <h3 className="community-name">{area.name}</h3>
                    </div>
                    <span className="community-region-pill">{area.countyOrRegion}</span>
                  </div>
                  <p className="community-desc">{area.description}</p>
                  <span className="community-zips">Key ZIP areas: {area.zipExamples}</span>
                </article>
              ))}
            </div>

            <div className="service-hours-card">
              <div className="service-hours-item">
                <ClockCheckIcon size={20} className="text-coral" />
                <div>
                  <strong>Scheduling &amp; Office Hours</strong>
                  <span>
                    {BUSINESS_INFO.officeHours.weekdays} • {BUSINESS_INFO.officeHours.saturday}
                  </span>
                </div>
              </div>

              <div className="service-coverage-actions">
                <a href="#quote" className="btn btn-primary btn-sm">
                  <span>Confirm Your Address</span>
                  <ArrowRightIcon size={14} />
                </a>
                <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-sm">
                  <PhoneIcon size={14} />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Responsive Google Map Column */}
          <div className="service-area-map-col">
            <div className="map-frame-card">
              <div className="map-card-topbar">
                <div className="map-topbar-title">
                  <MapPinIcon size={16} className="text-coral" />
                  <span>Huntsville &amp; Madison County Service Region</span>
                </div>
                <span className="map-sab-badge">On-Site Residential Service</span>
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
                  We travel directly to your home with all supplies and equipment. Don’t see your
                  neighborhood listed? Ask us about nearby North Alabama coverage.
                </p>
                <a
                  href={BUSINESS_INFO.googleMaps.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-external-link"
                >
                  <span>Open Huntsville Service Area in Google Maps</span>
                  <ArrowRightIcon size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
