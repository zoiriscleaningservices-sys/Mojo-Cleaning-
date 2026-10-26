import React, { useEffect, useState } from 'react';
import { BUSINESS_INFO } from '../config/business';
import { PRIMARY_NAV_ITEMS, type ActivePageView } from '../config/routes';
import { MojoSparkle, PhoneIcon } from './Icons';
import { MobileNavigation } from './MobileNavigation';

interface SiteHeaderProps {
  activeView: ActivePageView;
  onChangeView: (view: ActivePageView) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ activeView, onChangeView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('top');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (activeView !== 'home') return;
    const sectionIds = ['top', 'services', 'why-mojo', 'reviews', 'faqs', 'quote'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeView]);

  const handleReturnHome = () => {
    if (activeView !== 'home') {
      onChangeView('home');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <div className="announcement-bar" role="region" aria-label="Service Area & Guarantee">
        <div className="container announcement-inner">
          <span className="announcement-item">
            <MojoSparkle className="text-coral" size={13} />
            <strong>{BUSINESS_INFO.tagline}</strong>
          </span>
          <span className="announcement-divider" aria-hidden="true">•</span>
          <span className="announcement-item announcement-hide-xs">
            Serving {BUSINESS_INFO.primaryRegionLabel}
          </span>
          <span className="announcement-divider announcement-hide-sm" aria-hidden="true">•</span>
          <span className="announcement-item announcement-hide-sm">
            Insured &amp; Bonded • 48-Hour Happiness Guarantee
          </span>
          <a href={BUSINESS_INFO.phoneHref} className="announcement-phone">
            <PhoneIcon size={13} />
            <span>{BUSINESS_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <a
            href="#top"
            className="brand-logo-link"
            onClick={handleReturnHome}
            aria-label="Mojo Cleaning — Return to homepage"
          >
            <picture>
              <source srcSet="/images/mojo-logo.webp" type="image/webp" />
              <img
                src="/mojo-logo.png"
                alt="Mojo Cleaning"
                width={156}
                height={78}
                className="brand-logo-img"
                fetchPriority="high"
              />
            </picture>
          </a>

          <nav className="desktop-nav" aria-label="Primary Navigation">
            <ul className="desktop-nav-list">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const isActive =
                  activeView === 'home' &&
                  (activeSection === item.sectionId ||
                    (item.id === 'home' && activeSection === 'top'));
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={handleReturnHome}
                      className={`desktop-nav-link ${isActive ? 'is-active' : ''}`}
                      aria-current={isActive ? 'location' : undefined}
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
              <PhoneIcon size={16} />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <a
              href="#quote"
              onClick={handleReturnHome}
              className="btn btn-primary header-quote-btn"
            >
              <span>Get a Quote</span>
              <MojoSparkle size={14} />
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
          onClose={() => setMobileMenuOpen(false)}
          onNavigateHomeIfNeeded={handleReturnHome}
        />
      </header>
    </>
  );
};
