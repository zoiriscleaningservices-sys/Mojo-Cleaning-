import React from 'react';
import type { LocationEntity, ServiceId } from '../data/entities';
import { getLocationChecklistPath } from '../utils/location-routing';
import { ArrowRightIcon, MojoSparkle, ShieldCheckIcon } from './Icons';
import { HeroWelcomeMascotBadge } from './MojoMascot';

interface HeroTeamShowcaseProps {
  location: LocationEntity;
  variant?: 'home' | 'about' | 'services' | 'service-detail';
  serviceId?: ServiceId;
  serviceTag?: string;
}

export const HeroTeamShowcase: React.FC<HeroTeamShowcaseProps> = ({
  location,
  variant = 'home',
  serviceId,
  serviceTag,
}) => {
  const checklistHref = getLocationChecklistPath(location.id);

  // Select primary and secondary real worker photos so there are no duplicates in the bento grid
  const getPhotos = () => {
    if (variant === 'services' || serviceId === 'deep-house-cleaning') {
      return {
        primary: {
          src: '/images/team-pendant-care.jpg',
          webp: '/images/team-pendant-care.webp',
          webpMobile: '/images/team-pendant-care-640w.webp',
          alt: `Mojo Cleaning specialist polishing glass kitchen pendant lighting in ${location.name}`,
          objectPosition: 'center 42%',
          tag: serviceTag || '47-Point Deep & 56-Point Turnover Care',
        },
        sub1: {
          src: '/images/team-living-room-640w.webp',
          fallback: '/images/team-living-room.jpg',
          alt: `Two Mojo Cleaning specialists caring for a ${location.name} kitchen and living room`,
          objectPosition: 'center 58%',
          title: 'Kitchen & Living Room Care',
          subtitle: '37-Point Recurring Standard',
        },
        sub2: {
          src: '/images/team-cabinet-detail-640w.webp',
          fallback: '/images/team-cabinet-detail.jpg',
          alt: `Mojo Cleaning specialist detailing inside lower kitchen cabinetry in ${location.name}`,
          objectPosition: 'center 72%',
          title: 'Interior Cabinet & Detail Care',
          subtitle: 'Deep & Move-In/Out Standards',
        },
      };
    }

    if (serviceId === 'move-in-cleaning' || serviceId === 'move-out-cleaning') {
      return {
        primary: {
          src: '/images/team-cabinet-detail.jpg',
          webp: '/images/team-cabinet-detail.webp',
          webpMobile: '/images/team-cabinet-detail-640w.webp',
          alt: `Mojo Cleaning specialist detailing inside lower kitchen cabinetry in ${location.name}`,
          objectPosition: 'center 72%',
          tag: serviceTag || `56-Point Empty-Home Turnover in ${location.city}`,
        },
        sub1: {
          src: '/images/team-living-room-640w.webp',
          fallback: '/images/team-living-room.jpg',
          alt: `Two Mojo Cleaning specialists caring for a ${location.name} residence`,
          objectPosition: 'center 58%',
          title: 'Full Room-by-Room Sanitization',
          subtitle: 'Kitchens, Baths & Living Areas',
        },
        sub2: {
          src: '/images/team-pendant-care-640w.webp',
          fallback: '/images/team-pendant-care.jpg',
          alt: `Mojo Cleaning specialist polishing glass lighting fixtures in ${location.name}`,
          objectPosition: 'center 42%',
          title: 'Fixtures, Blinds & Appliances',
          subtitle: 'Inspection-Ready Handover',
        },
      };
    }

    if (serviceId === 'post-construction-cleaning') {
      return {
        primary: {
          src: '/images/team-post-construction.jpg',
          webp: '/images/team-post-construction.webp',
          webpMobile: '/images/team-post-construction-640w.webp',
          alt: `Mojo Cleaning specialist using a high-reach duster for post-construction cleaning in ${location.name}`,
          objectPosition: 'center 45%',
          tag: serviceTag || `Multi-Stage HEPA Dust Removal in ${location.city}`,
        },
        sub1: {
          src: '/images/team-cabinet-detail-640w.webp',
          fallback: '/images/team-cabinet-detail.jpg',
          alt: `Mojo Cleaning specialist wiping interior cabinet shelves in ${location.name}`,
          objectPosition: 'center 72%',
          title: 'Interior Millwork & Drawers',
          subtitle: 'Drywall & Sawdust Extraction',
        },
        sub2: {
          src: '/images/team-pendant-care-640w.webp',
          fallback: '/images/team-pendant-care.jpg',
          alt: `Mojo Cleaning specialist polishing new glass pendant lighting in ${location.name}`,
          objectPosition: 'center 42%',
          title: 'Scratch-Safe Glass & Fixture Care',
          subtitle: 'Move-In Ready Presentation',
        },
      };
    }

    // Default ('home', 'about', 'recurring-residential-cleaning')
    return {
      primary: {
        src: '/images/team-living-room.jpg',
        webp: '/images/team-living-room.webp',
        webpMobile: '/images/team-living-room-640w.webp',
        alt: `Two Mojo Cleaning specialists caring for an open-concept living room and kitchen in ${location.name}`,
        objectPosition: 'center 58%',
        tag: serviceTag || `Vetted ${location.city} Residential Specialists`,
      },
      sub1: {
        src: '/images/team-cabinet-detail-640w.webp',
        fallback: '/images/team-cabinet-detail.jpg',
        alt: `Mojo Cleaning specialist detailing inside lower kitchen cabinetry in ${location.name}`,
        objectPosition: 'center 72%',
        title: 'Interior Cabinet & Detail Care',
        subtitle: 'Deep & Move-In/Out Standards',
      },
      sub2: {
        src: '/images/team-pendant-care-640w.webp',
        fallback: '/images/team-pendant-care.jpg',
        alt: `Mojo Cleaning specialist polishing glass kitchen pendant lighting in ${location.name}`,
        objectPosition: 'center 42%',
        title: 'Fixture & High-Touch Detailing',
        subtitle: 'All Supplies & Equipment Included',
      },
    };
  };

  const photos = getPhotos();

  return (
    <div className="hero-modern-bento">
      {/* Welcoming Animated Mascot Banner */}
      <HeroWelcomeMascotBadge location={location} />

      {/* Top Main Photo: Real Team Working */}
      <figure className="hero-bento-main">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet={photos.primary.webpMobile}
            type="image/webp"
          />
          <source srcSet={photos.primary.webp} type="image/webp" />
          <img
            src={photos.primary.src}
            alt={photos.primary.alt}
            width={1080}
            height={1440}
            className="hero-bento-img"
            style={{ objectPosition: photos.primary.objectPosition }}
            fetchPriority="high"
          />
        </picture>
        <figcaption className="hero-bento-overlay-bar">
          <div className="hero-bento-overlay-left">
            <MojoSparkle className="text-coral" size={14} />
            <span>{photos.primary.tag}</span>
          </div>
          <span className="hero-bento-overlay-loc">
            {location.name} • {location.county}
          </span>
        </figcaption>
      </figure>

      {/* Bottom Two-Column Specialist Action Strip */}
      <div className="hero-bento-subgrid">
        <figure className="hero-bento-subcard">
          <picture>
            <source srcSet={photos.sub1.src} type="image/webp" />
            <img
              src={photos.sub1.fallback}
              alt={photos.sub1.alt}
              width={640}
              height={853}
              loading="eager"
              className="hero-bento-subimg"
              style={{ objectPosition: photos.sub1.objectPosition }}
            />
          </picture>
          <figcaption className="hero-bento-subcaption">
            <strong>{photos.sub1.title}</strong>
            <span>{photos.sub1.subtitle}</span>
          </figcaption>
        </figure>

        <figure className="hero-bento-subcard">
          <picture>
            <source srcSet={photos.sub2.src} type="image/webp" />
            <img
              src={photos.sub2.fallback}
              alt={photos.sub2.alt}
              width={640}
              height={853}
              loading="eager"
              className="hero-bento-subimg"
              style={{ objectPosition: photos.sub2.objectPosition }}
            />
          </picture>
          <figcaption className="hero-bento-subcaption">
            <strong>{photos.sub2.title}</strong>
            <span>{photos.sub2.subtitle}</span>
          </figcaption>
        </figure>
      </div>

      {/* Clean Bottom Assurance Bar */}
      <div className="hero-bento-assurance-bar">
        <div className="hero-bento-assurance-text">
          <ShieldCheckIcon size={16} className="text-coral" />
          <span>Insured &amp; Bonded • 56-Point Room Checklist</span>
        </div>
        <a href={checklistHref} className="hero-bento-assurance-link">
          <span>Inspect Checklist</span>
          <ArrowRightIcon size={13} />
        </a>
      </div>
    </div>
  );
};
