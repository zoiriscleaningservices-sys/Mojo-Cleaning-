import React from 'react';
import type { ServiceItem } from '../config/business';
import type { LocationEntity, ServiceId } from '../data/entities';
import { withSiteBasePath } from '../data/page-registry';
import {
  getLocationQuotePath,
  getLocationServiceDetailPath,
} from '../utils/location-routing';
import { ArrowRightIcon, CheckCircleIcon, MojoSparkle } from './Icons';
import { SectionMascotBanner } from './MojoMascot';
import { mapServiceIdToLegacyId } from './QuoteForm';

export interface ShowcaseResidentialService {
  id: string;
  number: string;
  name: string;
  shortName: string;
  badge: string;
  checklistLabel: string;
  summary: string;
  highlights: string[];
  linkedServiceId: ServiceId;
  image: {
    src: string;
    webp: string;
    webpMobile?: string;
    alt: string;
    objectPosition: string;
  };
}

export const AVAILABLE_RESIDENTIAL_SERVICES: ShowcaseResidentialService[] = [
  {
    id: 'recurring-residential-cleaning',
    number: '01',
    name: 'Recurring Residential Cleaning',
    shortName: 'Recurring Cleaning',
    badge: 'Most Popular • Weekly, Bi-Weekly & Monthly',
    checklistLabel: '37-Point Maintenance',
    summary:
      'Consistent weekly, bi-weekly, or monthly home cleaning that keeps kitchens, bathrooms, bedrooms, and floors spotless year-round.',
    highlights: [
      '37-point kitchen, bathroom, bedroom & living area checklist',
      'All supplies, microfiber cloths & HEPA vacuums provided',
      'Flexible scheduling with zero long-term contracts',
    ],
    linkedServiceId: 'recurring-residential-cleaning',
    image: {
      src: '/images/team-living-room.jpg',
      webp: '/images/team-living-room.webp',
      webpMobile: '/images/team-living-room-640w.webp',
      alt: 'Two Mojo Cleaning specialists vacuuming the living room and sanitizing the kitchen island',
      objectPosition: 'center 58%',
    },
  },
  {
    id: 'deep-house-cleaning',
    number: '02',
    name: 'Deep House Cleaning',
    shortName: 'Deep Cleaning',
    badge: '47-Point Intensive Reset',
    checklistLabel: '47-Point Deep Detail',
    summary:
      'Top-to-bottom hand detailing for homes needing extra care on baseboards, doors, cabinet exteriors, light fixtures, and tile grout.',
    highlights: [
      'Hand-wiped baseboards, doors, frames, sills & switch plates',
      'Kitchen & bath cabinet exteriors and range hood degreasing',
      'Intensive shower glass, track & bathroom tile grout scrubbing',
    ],
    linkedServiceId: 'deep-house-cleaning',
    image: {
      src: '/images/team-pendant-care.jpg',
      webp: '/images/team-pendant-care.webp',
      webpMobile: '/images/team-pendant-care-640w.webp',
      alt: 'Mojo Cleaning specialist hand-polishing glass kitchen pendant light fixtures',
      objectPosition: 'center 42%',
    },
  },
  {
    id: 'move-in-cleaning',
    number: '03',
    name: 'Move-In House Cleaning',
    shortName: 'Move-In Cleaning',
    badge: 'New Home Sanitization',
    checklistLabel: '56-Point Empty Home',
    summary:
      'Complete vacant-home sanitization before your moving truck unloads so you unpack dishes and linens straight onto spotless shelves.',
    highlights: [
      'Inside all kitchen cabinets, drawers, pantry & vanity shelves',
      'Full interior cleaning of the oven, refrigerator & freezer',
      'Closet shelving, wet-wiped window blinds, baseboards & floors',
    ],
    linkedServiceId: 'move-in-cleaning',
    image: {
      src: '/images/team-cabinet-detail.jpg',
      webp: '/images/team-cabinet-detail.webp',
      webpMobile: '/images/team-cabinet-detail-640w.webp',
      alt: 'Mojo Cleaning specialist detailing inside lower kitchen cabinets with protective gloves',
      objectPosition: 'center 72%',
    },
  },
  {
    id: 'move-out-cleaning',
    number: '04',
    name: 'Move-Out & Turnover Cleaning',
    shortName: 'Move-Out Cleaning',
    badge: 'Lease-End & Closing Ready',
    checklistLabel: '56-Point Turnover',
    summary:
      'Inspection-ready empty-home turnover cleaning for tenants, home sellers, landlords, and property managers.',
    highlights: [
      'All 56 checklist points including inside oven, fridge & cabinets',
      'Itemized completion receipt for landlords & closing walk-throughs',
      'Protected by our 48-Hour Happiness Guarantee',
    ],
    linkedServiceId: 'move-out-cleaning',
    image: {
      src: '/images/team-living-room.jpg',
      webp: '/images/team-living-room.webp',
      webpMobile: '/images/team-living-room-640w.webp',
      alt: 'Mojo Cleaning specialists sanitizing kitchen surfaces and floors for a move-out turnover',
      objectPosition: 'center 34%',
    },
  },
  {
    id: 'post-construction-cleaning',
    number: '05',
    name: 'Post-Construction Cleaning',
    shortName: 'Post-Construction',
    badge: 'After-Build & Remodel Care',
    checklistLabel: 'HEPA Dust Protocol',
    summary:
      'Multi-pass HEPA dust extraction and surface detailing after kitchen/bath renovations, room additions, or new home builds.',
    highlights: [
      'High-reach dusting of overhead panels, fans, vents & lighting',
      'Removes fine drywall and sawdust haze from trim & cabinetry',
      'Scratch-free glass, stone countertop & multi-pass floor care',
    ],
    linkedServiceId: 'post-construction-cleaning',
    image: {
      src: '/images/team-post-construction.jpg',
      webp: '/images/team-post-construction.webp',
      webpMobile: '/images/team-post-construction-640w.webp',
      alt: 'Mojo Cleaning specialist using a high-reach duster to remove post-construction dust',
      objectPosition: 'center 45%',
    },
  },
  {
    id: 'standard-one-time-cleaning',
    number: '06',
    name: 'One-Time Standard Home Cleaning',
    shortName: 'One-Time Clean',
    badge: 'Single-Visit Home Refresh',
    checklistLabel: '37-Point Standard',
    summary:
      'A thorough single-visit house cleaning covering kitchens, bathrooms, bedrooms, and living spaces whenever your home needs a fresh reset.',
    highlights: [
      'Countertops, sinks, stovetop, microwave inside/out & mirrors',
      'Showers, tubs, toilets, dusting & whole-home floor care',
      'Ideal before guests arrive or after a busy work month',
    ],
    linkedServiceId: 'recurring-residential-cleaning',
    image: {
      src: '/images/team-pendant-care.jpg',
      webp: '/images/team-pendant-care.webp',
      webpMobile: '/images/team-pendant-care-640w.webp',
      alt: 'Mojo Cleaning specialist hand-polishing kitchen fixtures during a one-time home clean',
      objectPosition: 'center 52%',
    },
  },
  {
    id: 'apartment-condo-townhome-cleaning',
    number: '07',
    name: 'Apartment, Condo & Townhome Cleaning',
    shortName: 'Apartment & Townhome',
    badge: 'Single & Multi-Level Residences',
    checklistLabel: 'Custom Unit Scope',
    summary:
      'Professional residential cleaning sized for apartments, condominiums, lofts, and townhomes—from routine upkeep to lease-end turnovers.',
    highlights: [
      'Tailored to 1-bedroom, 2-bedroom, and 3+ bedroom floor plans',
      'Quiet, respectful HEPA equipment for shared-entry buildings',
      'Available for recurring care, deep cleans, or move-out resets',
    ],
    linkedServiceId: 'recurring-residential-cleaning',
    image: {
      src: '/images/team-living-room.jpg',
      webp: '/images/team-living-room.webp',
      webpMobile: '/images/team-living-room-640w.webp',
      alt: 'Mojo Cleaning specialists vacuuming and detailing an open-concept residence',
      objectPosition: 'center 68%',
    },
  },
  {
    id: 'seasonal-pre-listing-cleaning',
    number: '08',
    name: 'Seasonal & Pre-Listing Home Cleaning',
    shortName: 'Seasonal & Staging',
    badge: 'Spring Reset & Real Estate Prep',
    checklistLabel: '47-Point Showcase',
    summary:
      'Showroom-level residential detailing for spring/fall refreshes, holiday hosting preparation, real estate photography, and open houses.',
    highlights: [
      'Ceiling fans, window sills, blinds, baseboards & door frames',
      'Polished glass, chrome/brass fixtures & stainless appliances',
      'Eco-friendly, non-toxic & pet-safe supplies available on request',
    ],
    linkedServiceId: 'deep-house-cleaning',
    image: {
      src: '/images/team-post-construction.jpg',
      webp: '/images/team-post-construction.webp',
      webpMobile: '/images/team-post-construction-640w.webp',
      alt: 'Mojo Cleaning specialist detailing overhead vents and high surfaces for a seasonal reset',
      objectPosition: 'center 38%',
    },
  },
  {
    id: 'interior-appliance-cabinet-detailing',
    number: '09',
    name: 'Appliance & Cabinet Interior Detailing',
    shortName: 'Interior Add-Ons',
    badge: 'Custom Room & Kitchen Add-Ons',
    checklistLabel: 'Custom Detailing',
    summary:
      'Targeted interior detailing for ovens, refrigerators, kitchen and bathroom cabinetry, pantries, walk-in closets, and window blinds.',
    highlights: [
      'Inside oven degreasing and inside refrigerator/freezer sanitation',
      'Inside kitchen & bath cabinets, drawers, pantries & closets',
      'Can be added to any Recurring or Deep Cleaning appointment',
    ],
    linkedServiceId: 'deep-house-cleaning',
    image: {
      src: '/images/team-cabinet-detail.jpg',
      webp: '/images/team-cabinet-detail.webp',
      webpMobile: '/images/team-cabinet-detail-640w.webp',
      alt: 'Mojo Cleaning specialist sanitizing interior kitchen cabinet shelves',
      objectPosition: 'center 68%',
    },
  },
];

interface AvailableServicesCatalogProps {
  location: LocationEntity;
  onSelectServiceId?: (id: ServiceItem['id']) => void;
}

export const AvailableServicesCatalog: React.FC<AvailableServicesCatalogProps> = ({
  location,
  onSelectServiceId,
}) => {
  const quoteHref = getLocationQuotePath(location.id);

  return (
    <>
      <SectionMascotBanner
        pose="action"
        animation="step-bounce"
        kicker={`Mojo Sparkle Mascot • ${location.name} Service Guide`}
        headline={`Welcome! Choose the residential cleaning tier that fits your ${location.city} home.`}
        description={`Our insured ${location.city} specialists arrive with every spray, microfiber system, and HEPA vacuum needed—whether you want recurring maintenance, a 47-point deep clean, or a 56-point move-in/move-out turnover.`}
        ctaLabel={`Request ${location.city} Quote`}
        ctaHref={quoteHref}
      />

      <div className="available-services-modern-grid">
        {AVAILABLE_RESIDENTIAL_SERVICES.map((service) => {
          const serviceDetailHref = getLocationServiceDetailPath(
            location.id,
            service.linkedServiceId
          );
          const serviceQuoteHref = `${quoteHref}?service=${service.linkedServiceId}`;

          return (
            <article key={service.id} className="modern-service-card">
              <a
                href={serviceDetailHref}
                className="modern-service-media"
                tabIndex={-1}
                aria-hidden="true"
              >
                <picture>
                  {service.image.webpMobile ? (
                    <source
                      media="(max-width: 640px)"
                      srcSet={withSiteBasePath(service.image.webpMobile)}
                      type="image/webp"
                    />
                  ) : null}
                  <source srcSet={withSiteBasePath(service.image.webp)} type="image/webp" />
                  <img
                    src={withSiteBasePath(service.image.src)}
                    alt={`${service.name} in ${location.name} — ${service.image.alt}`}
                    width={960}
                    height={640}
                    loading="lazy"
                    className="modern-service-img"
                    style={{ objectPosition: service.image.objectPosition }}
                  />
                </picture>
                <div className="modern-service-badges">
                  <span className="modern-service-num">{service.number}</span>
                  <span className="modern-service-scope-pill">{service.checklistLabel}</span>
                </div>
              </a>

              <div className="modern-service-body">
                <div className="modern-service-eyebrow">
                  <MojoSparkle className="text-coral" size={12} />
                  <span>{service.badge}</span>
                </div>

                <h3 className="modern-service-title">
                  <a href={serviceDetailHref}>
                    {service.name} in {location.city}
                  </a>
                </h3>

                <p className="modern-service-summary">{service.summary}</p>

                <ul className="modern-service-list">
                  {service.highlights.map((item) => (
                    <li key={item}>
                      <CheckCircleIcon size={15} className="text-coral" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="modern-service-footer">
                  <a href={serviceDetailHref} className="btn btn-primary btn-sm">
                    <span>View Details</span>
                    <ArrowRightIcon size={14} />
                  </a>
                  <a
                    href={serviceQuoteHref}
                    className="btn btn-outline-dark btn-sm"
                    onClick={() =>
                      onSelectServiceId?.(mapServiceIdToLegacyId(service.linkedServiceId))
                    }
                  >
                    <span>Request Quote</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};
