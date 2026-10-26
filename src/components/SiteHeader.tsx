import React, { useEffect, useRef, useState } from 'react';
import { BUSINESS_INFO } from '../config/business';
import type { LocationId } from '../data/entities';
import { withSiteBasePath } from '../data/page-registry';
import { buildLocationNavigation } from '../utils/location-routing';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  MapPinIcon,
  MojoSparkle,
  PhoneIcon,
} from './Icons';
import { MobileNavigation } from './MobileNavigation';

interface SiteHeaderProps {
  currentPath: string;
  activeLocationId: LocationId;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ currentPath, activeLocationId }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownContainerRef = useRef<HTMLLIElement | null>(null);

  const nav = buildLocationNavigation(activeLocationId);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [currentPath, activeLocationId]);

  useEffect(() => {
    if (!servicesDropdownOpen) return;

    const handleDocumentClick = (e: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [servicesDropdownOpen]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <div className="announcement-bar" role="region" aria-label="Active Location & Guarantee">
        <div className="container announcement-inner">
          <span className="announcement-item">
            <MapPinIcon className="text-coral" size={13} />
            <strong>Mojo Cleaning — {nav.locationName}</strong>
          </span>
          <span className="announcement-divider announcement-hide-xs" aria-hidden="true">
            •
          </span>
          <span className="announcement-item announcement-hide-xs">
            Insured &amp; Bonded • 48-Hour Happiness Guarantee
          </span>
          <span className="announcement-divider announcement-hide-sm" aria-hidden="true">
            •
          </span>
          <span className="announcement-item announcement-hide-sm">
            56-Point Residential Checklist Standard
          </span>
          <a href={BUSINESS_INFO.phoneHref} className="announcement-phone">
            <PhoneIcon size={13} />
            <span>{BUSINESS_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <div className="header-brand-cluster">
            <a
              href={nav.homeHref}
              className="brand-logo-link"
              aria-label={`Mojo Cleaning ${nav.locationName} — Return to ${nav.locationCity} homepage`}
            >
              <picture>
                <source srcSet={withSiteBasePath('/images/mojo-logo.webp')} type="image/webp" />
                <img
                  src={withSiteBasePath('/mojo-logo.png')}
                  alt="Mojo Cleaning"
                  width={150}
                  height={75}
                  className="brand-logo-img"
                  fetchPriority="high"
                />
              </picture>
            </a>
            <span className="header-location-pill" aria-label={`Active location: ${nav.locationName}`}>
              <MapPinIcon size={12} className="text-coral" />
              <span>{nav.locationName}</span>
            </span>
          </div>

          <nav className="desktop-nav" aria-label={`${nav.locationName} Primary Navigation`}>
            <ul className="desktop-nav-list">
              {nav.primaryItems.map((item) => {
                const isServices = item.id === 'services';
                const isActive =
                  item.id === 'home'
                    ? currentPath === nav.homeHref || currentPath === '/'
                    : isServices
                      ? currentPath.startsWith(nav.servicesHref)
                      : currentPath === item.href;

                if (isServices && item.hasDropdown && item.dropdownItems) {
                  return (
                    <li
                      key={item.id}
                      ref={dropdownContainerRef}
                      className={`desktop-nav-dropdown-wrapper ${servicesDropdownOpen ? 'is-open' : ''}`}
                    >
                      <div className="desktop-nav-dropdown-trigger-group">
                        <a
                          href={item.href}
                          className={`desktop-nav-link ${isActive ? 'is-active' : ''}`}
                          aria-current={currentPath === item.href ? 'page' : undefined}
                        >
                          {item.label}
                        </a>
                        <button
                          type="button"
                          className={`desktop-dropdown-toggle-btn ${servicesDropdownOpen ? 'is-open' : ''}`}
                          aria-expanded={servicesDropdownOpen}
                          aria-haspopup="true"
                          aria-controls="desktop-services-dropdown-menu"
                          aria-label={`${nav.locationCity} cleaning services menu`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setServicesDropdownOpen((prev) => !prev);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              setServicesDropdownOpen(true);
                            }
                          }}
                        >
                          <ChevronDownIcon size={14} />
                        </button>
                      </div>

                      <div
                        id="desktop-services-dropdown-menu"
                        className={`desktop-dropdown-panel ${servicesDropdownOpen ? 'is-open' : ''}`}
                        role="region"
                        aria-label={`${nav.locationName} Available Cleaning Services`}
                      >
                        <div className="dropdown-panel-header">
                          <span className="dropdown-panel-eyebrow">
                            {nav.locationName} • Verified Services
                          </span>
                          <a href={nav.servicesHref} className="dropdown-panel-overview-link">
                            <span>All {nav.locationCity} Services</span>
                            <ArrowRightIcon size={13} />
                          </a>
                        </div>

                        <ul className="dropdown-services-list">
                          {item.dropdownItems.map((srv) => {
                            const isSrvCurrent = currentPath === srv.href;
                            return (
                              <li key={srv.id}>
                                <a
                                  href={srv.href}
                                  className={`dropdown-service-item ${isSrvCurrent ? 'is-active' : ''}`}
                                  aria-current={isSrvCurrent ? 'page' : undefined}
                                >
                                  <div className="dropdown-service-item-text">
                                    <strong>{srv.label}</strong>
                                    <span>{srv.checklistLabel}</span>
                                  </div>
                                  <ArrowRightIcon size={14} className="dropdown-item-arrow" />
                                </a>
                              </li>
                            );
                          })}
                        </ul>

                        <div className="dropdown-panel-footer">
                          <a href={nav.checklistHref} className="dropdown-footer-checklist-link">
                            <span>Inspect 56-Point Room-by-Room Checklist</span>
                            <ArrowRightIcon size={13} />
                          </a>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`desktop-nav-link ${isActive ? 'is-active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="header-phone-link"
              aria-label={`Call Mojo Cleaning at ${BUSINESS_INFO.phoneDisplay}`}
            >
              <PhoneIcon size={15} />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <a href={nav.quoteHref} className="btn btn-primary header-quote-btn">
              <span>Request a Quote</span>
              <MojoSparkle size={13} />
            </a>

            <button
              type="button"
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="hamburger-box" aria-hidden="true">
                <span className="hamburger-line line-1" />
                <span className="hamburger-line line-2" />
                <span className="hamburger-line line-3" />
              </span>
              <span className="mobile-menu-label">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>

        <MobileNavigation
          isOpen={mobileMenuOpen}
          currentPath={currentPath}
          nav={nav}
          onClose={() => setMobileMenuOpen(false)}
        />
      </header>
    </>
  );
};
