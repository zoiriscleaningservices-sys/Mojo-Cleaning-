import React from 'react';
import type { ServiceItem } from '../config/business';
import { ArrowRightIcon, CheckCircleIcon, MojoSparkle } from './Icons';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onSelectService: (serviceId: ServiceItem['id']) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  onSelectService,
}) => {
  const isFeatured = index === 0 || index === 1;

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

        <h3 className="service-card-title">{service.name}</h3>

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

          <a href="#checklist-explorer" className="service-checklist-jump">
            Compare room tasks
          </a>
        </div>
      </div>
    </article>
  );
};
