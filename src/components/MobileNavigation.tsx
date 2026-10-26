import React, { useEffect, useState } from 'react';
import { BUSINESS_INFO } from '../config/business';
import type { NavigationConfiguration } from '../data/entities';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  MailIcon,
  MapPinIcon,
  MojoSparkle,
  PhoneIcon,
} from './Icons';

interface MobileNavigationProps {
  isOpen: boolean;
  currentPath: string;
  nav: NavigationConfiguration;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  currentPath,
  nav,
  onClose,
}) => {
  const [servicesExpanded, setServicesExpanded] = useState<boolean>(() =>
    currentPath.includes('/services/')
  );

  useEffect(() => {
    if (currentPath.includes('/services/')) {
      setServicesExpanded(true);
    }
  }, [currentPath]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-navigation-drawer"
      className={`mobile-nav-drawer ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="mobile-nav-backdrop" onClick={onClose} aria-hidden="true" />

      <nav
        className="mobile-nav-panel"
        aria-label={`${nav.locationName} Mobile Navigation`}
      >
        <div className="mobile-nav-top-note">
          <MapPinIcon className="text-coral" size={14} />
          <span>
            Active Location: <strong>{nav.locationName}</strong>
          </span>
        </div>

        <ul className="mobile-nav-list">
          {nav.primaryItems.map((item, idx) => {
            const isServicesItem = item.id === 'services';
            const isCurrent =
              item.id === 'home'
                ? currentPath === nav.homeHref || currentPath === '/'
                : isServicesItem
                  ? currentPath.startsWith(nav.servicesHref)
                  : currentPath === item.href;

            if (isServicesItem) {
              return (
                <li key={item.id} className="mobile-nav-item mobile-nav-item-accordion">
                  <div className="mobile-nav-accordion-header">
                    <a
                      href={item.href}
                      className={`mobile-nav-link ${isCurrent ? 'is-active' : ''}`}
                      aria-current={currentPath === item.href ? 'page' : undefined}
                      onClick={onClose}
                    >
                      <span className="mobile-nav-index">0{idx + 1}</span>
                      <span>{item.label}</span>
                    </a>
                    <button
                      type="button"
                      className={`mobile-services-expand-btn ${servicesExpanded ? 'is-expanded' : ''}`}
                      onClick={() => setServicesExpanded((prev) => !prev)}
                      aria-expanded={servicesExpanded}
                      aria-controls="mobile-services-submenu"
                      aria-label={
                        servicesExpanded
                          ? `Collapse ${nav.locationCity} services list`
                          : `Expand ${nav.locationCity} services list`
                      }
                    >
                      <ChevronDownIcon size={18} />
                    </button>
                  </div>

                  <div
                    id="mobile-services-submenu"
                    className={`mobile-services-submenu ${servicesExpanded ? 'is-expanded' : ''}`}
                    hidden={!servicesExpanded}
                  >
                    <ul className="mobile-services-sublist">
                      {nav.serviceDropdownItems.map((srv) => {
                        const isSrvActive = currentPath === srv.href;
                        return (
                          <li key={srv.id}>
                            <a
                              href={srv.href}
                              className={`mobile-service-sublink ${isSrvActive ? 'is-active' : ''}`}
                              aria-current={isSrvActive ? 'page' : undefined}
                              onClick={onClose}
                            >
                              <div>
                                <strong>{srv.label}</strong>
                                <span>{srv.checklistLabel}</span>
                              </div>
                              <ArrowRightIcon size={14} />
                            </a>
                          </li>
                        );
                      })}
                      <li>
                        <a
                          href={nav.servicesHref}
                          className="mobile-service-overview-link"
                          onClick={onClose}
                        >
                          <span>View All {nav.locationCity} Services</span>
                          <ArrowRightIcon size={14} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.id} className="mobile-nav-item">
                <a
                  href={item.href}
                  className={`mobile-nav-link ${isCurrent ? 'is-active' : ''}`}
                  aria-current={isCurrent ? 'page' : undefined}
                  onClick={onClose}
                >
                  <span className="mobile-nav-index">0{idx + 1}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mobile-nav-cta-group">
          <a
            href={nav.quoteHref}
            className="btn btn-primary btn-full mobile-nav-quote-btn"
            onClick={onClose}
          >
            <span>Request a Quote ({nav.locationCity})</span>
            <MojoSparkle size={15} />
          </a>

          <div className="mobile-nav-contact-row">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="mobile-nav-contact-chip"
              onClick={onClose}
            >
              <PhoneIcon size={15} />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <a
              href={BUSINESS_INFO.emailHref}
              className="mobile-nav-contact-chip"
              onClick={onClose}
            >
              <MailIcon size={15} />
              <span>Email Team</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
