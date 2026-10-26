import React from 'react';
import { BUSINESS_INFO } from '../config/business';
import { ArrowRightIcon, MapPinIcon, MojoSparkle, PhoneIcon } from '../components/Icons';
import { QuoteForm } from '../components/QuoteForm';
import type { LocationId } from '../data/entities';
import { LOCATIONS_BY_ID } from '../data/locations-data';
import {
  getAvailableServicesForLocation,
  getGlobalLocationsDirectoryPath,
  getLocationChecklistPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationServiceDetailPath,
} from '../utils/location-routing';

interface NotFoundPageProps {
  activeLocationId?: LocationId;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  activeLocationId = 'huntsville-al',
}) => {
  const location = LOCATIONS_BY_ID[activeLocationId] || LOCATIONS_BY_ID['huntsville-al'];
  const homeHref = getLocationHomePath(location.id);
  const quoteHref = getLocationQuotePath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);
  const locationsDirectoryHref = getGlobalLocationsDirectoryPath();
  const availableServices = getAvailableServicesForLocation(location.id);

  return (
    <>
      <section className="interior-hero not-found-section" aria-labelledby="not-found-heading">
        <div className="container">
          <div className="not-found-card">
            <div className="section-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>404 • Page Not Found</span>
            </div>

            <h1 id="not-found-heading" className="interior-hero-title">
              We couldn’t find that room on our checklist.
            </h1>

            <p className="interior-hero-lead">
              The page you requested could not be found or may have moved. Use the quick links below
              to explore Mojo Cleaning’s {location.name} residential services, our 56-point checklist,
              or request a custom quote.
            </p>

            <div className="interior-hero-actions" style={{ justifyContent: 'center' }}>
              <a href={homeHref} className="btn btn-primary btn-lg">
                <span>Return to {location.city} Homepage</span>
                <ArrowRightIcon size={17} />
              </a>
              <a href={quoteHref} className="btn btn-outline-dark btn-lg">
                <span>Request a Custom Quote</span>
              </a>
              <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-lg">
                <PhoneIcon size={17} />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>

            <div className="discovery-pillars-grid" style={{ marginTop: '2.5rem', textAlign: 'left' }}>
              <div className="discovery-panel">
                <h2 className="discovery-panel-title">
                  {location.name} Cleaning Services
                </h2>
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
                          <span>{svc.categoryLabel}</span>
                        </div>
                        <ArrowRightIcon size={15} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="discovery-panel">
                <h2 className="discovery-panel-title">
                  Helpful {location.city} Links
                </h2>
                <ul className="discovery-link-list">
                  <li>
                    <a href={checklistHref} className="discovery-link-item">
                      <div>
                        <strong>56-Point Room-by-Room Checklist</strong>
                        <span>Compare Standard, Deep &amp; Move-In/Out tasks</span>
                      </div>
                      <ArrowRightIcon size={15} />
                    </a>
                  </li>
                  <li>
                    <a href={locationsDirectoryHref} className="discovery-link-item">
                      <div>
                        <strong>
                          <MapPinIcon size={14} className="text-coral" /> See All Locations
                        </strong>
                        <span>Browse our verified North Alabama service area directory</span>
                      </div>
                      <ArrowRightIcon size={15} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteForm
        preselectedLocationId={location.id}
        contextKicker={`${location.name} Custom Cleaning Quote`}
        contextHeadline={`Request a House Cleaning Quote in ${location.city}`}
      />
    </>
  );
};
