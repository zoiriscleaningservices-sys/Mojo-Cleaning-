import React from 'react';
import type { LocationEntity } from '../data/entities';
import {
  getLocationChecklistPath,
  getLocationQuotePath,
} from '../utils/location-routing';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  MojoSparkle,
  ShieldCheckIcon,
} from './Icons';

interface ResidentialServicesSuiteProps {
  location: LocationEntity;
  compact?: boolean;
}

export const RESIDENTIAL_ADDON_OPTIONS = [
  {
    name: 'Inside Oven Deep Degreasing',
    detail: 'Racks, interior walls & glass door',
  },
  {
    name: 'Inside Refrigerator & Freezer',
    detail: 'Shelves, crisper bins & door seals',
  },
  {
    name: 'Inside Cabinets, Pantry & Drawers',
    detail: 'Vacuumed & damp-wiped shelves',
  },
  {
    name: 'Window Blinds & Shutters',
    detail: 'Individual slat dusting or wet-wiping',
  },
  {
    name: 'Baseboard & Door Frame Hand-Scrub',
    detail: 'Full perimeter woodwork detailing',
  },
  {
    name: 'Bed Stripping & Fresh Linen Change',
    detail: 'Fresh sheets neatly remade on request',
  },
  {
    name: 'Eco-Friendly & Non-Toxic Formulas',
    detail: 'Plant-based options for kids & pets',
  },
  {
    name: 'Multi-Pet Hair & Dander HEPA Care',
    detail: 'Upholstery, rugs & stair edges',
  },
] as const;

export const RESIDENTIAL_PROPERTY_TYPES = [
  'Single-Family Residences & Estates',
  'Historic Homes & Custom Millwork',
  'Townhomes, Patio Homes & Condos',
  'Apartments & Luxury Lofts',
  'Long-Term & Short-Term Rental Turnovers',
  'New-Build & Remodeled Homes',
] as const;

export const ResidentialServicesSuite: React.FC<ResidentialServicesSuiteProps> = ({
  location,
  compact = false,
}) => {
  const quoteHref = getLocationQuotePath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);

  return (
    <section
      id="residential-home-cleaning-addons"
      className={`editorial-section ${compact ? '' : 'bg-warm-cream'}`}
      aria-labelledby="residential-addons-heading"
    >
      <div className="container">
        <div className="modern-addons-panel">
          <div className="modern-addons-header">
            <div>
              <div className="section-eyebrow">
                <MojoSparkle className="text-coral" size={14} />
                <span>Tailored Residential Care • {location.name}</span>
              </div>
              <h2 id="residential-addons-heading" className="section-title">
                Custom Interior Add-Ons &amp; Residential Property Types in {location.city}
              </h2>
            </div>
            <p className="section-subtitle">
              Customize any {location.name} house cleaning visit with interior appliance, cabinet,
              or blind detailing. We bring all professional supplies and HEPA equipment to every
              residential property type across {location.county}.
            </p>
          </div>

          <div className="modern-property-pills-row" aria-label="Residential property types served">
            {RESIDENTIAL_PROPERTY_TYPES.map((propType) => (
              <span key={propType} className="modern-property-pill">
                <ShieldCheckIcon size={14} className="text-coral" />
                <span>{propType}</span>
              </span>
            ))}
          </div>

          <div className="modern-addons-grid">
            {RESIDENTIAL_ADDON_OPTIONS.map((addon) => (
              <div key={addon.name} className="modern-addon-chip">
                <CheckCircleIcon size={16} className="text-coral" />
                <div>
                  <strong>{addon.name}</strong>
                  <span>{addon.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="modern-addons-footer">
            <p>
              <strong>100% Flexible Scope:</strong> Skip unused guest rooms, prioritize high-traffic
              kitchens and bathrooms, or combine any add-on above with your {location.city} quote.
            </p>
            <div className="modern-addons-actions">
              <a href={quoteHref} className="btn btn-primary btn-sm">
                <span>Customize Your {location.city} Quote</span>
                <ArrowRightIcon size={14} />
              </a>
              <a href={checklistHref} className="btn btn-outline-dark btn-sm">
                <span>56-Point Room Checklist</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
