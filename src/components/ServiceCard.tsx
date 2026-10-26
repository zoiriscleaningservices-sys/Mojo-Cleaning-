import React from 'react';
import type { ServiceItem } from '../config/business';
import { ArrowRightIcon, CheckCircleIcon, MojoSparkle } from './Icons';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onSelectService: (serviceId: ServiceItem['id']) => void;
}

const SERVICE_DETAIL_LINKS: Record<
  ServiceItem['id'],
  Array<{ label: string; href: string }>
> = {
  recurring: [{ label: 'Explore Recurring Cleaning Scope', href: '/services/recurring-cleaning/' }],
  deep: [{ label: 'Explore Deep Cleaning Scope', href: '/services/deep-cleaning/' }],
  'move-in-out': [
    { label: 'Move-In Cleaning Guide', href: '/services/move-in-cleaning/' },
    { label: 'Move-Out Cleaning Guide', href: '/services/move-out-cleaning/' },
  ],
  'post-construction': [
    {
      label: 'Explore Post-Construction Scope',
      href: '/services/post-construction-cleaning/',
    },
  ],
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  onSelectService,
}) => {
  const isFeatured = index === 0 || index === 1;
  const detailLinks = SERVICE_DETAIL_LINKS[service.id] || [];

  const handleQuoteClick = () => {
    onSelectService(service.id);
  };

  return (
    <article
      id={`service-${service.id}`}
      className={`service-card service-card-variant-${index + 1} ${isFeatured ? 'is-featured' : ''}`}
    >
      <div className="service-card-media">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet={service.image.webp640}
            type="image/webp"
          />
          <source srcSet={service.image.webp1280} type="image/webp" />
          <img
            src={service.image.jpg}
            alt={service.image.alt}
            width={service.image.width}
            height={service.image.height}
            loading="lazy"
            className="service-card-img"
          />
        </picture>

        <div className="service-card-media-overlay">
          <span className="service-number-pill">{service.number}</span>
          <span className="service-tag-pill">{service.tag}</span>
        </div>
      </div>

      <div className="service-card-body">
        <div className="service-card-eyebrow">
          <MojoSparkle className="text-coral" size={13} />
          <span>{service.badge}</span>
        </div>

        <h3 className="service-card-title">
          <a href={detailLinks[0]?.href || '/services/'}>{service.name}</a>
        </h3>

        <p className="service-card-summary">{service.summary}</p>

        <div className="service-benefit-callout">
          <strong>Why homeowners choose it:</strong> {service.benefit}
        </div>

        <p className="service-frequency-note">{service.frequencyNote}</p>

        <ul className="service-highlights-list" aria-label={`Included in ${service.name}`}>
          {service.highlights.map((item) => (
            <li key={item} className="service-highlight-item">
              <CheckCircleIcon className="service-check-icon" size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="service-card-footer">
          <a
            href="#quote"
            className="btn btn-primary service-card-cta"
            onClick={handleQuoteClick}
          >
            <span>{service.ctaLabel}</span>
            <ArrowRightIcon size={16} />
          </a>

          <div className="service-card-sublinks">
            {detailLinks.map((link) => (
              <a key={link.href} href={link.href} className="service-checklist-jump">
                {link.label} →
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
