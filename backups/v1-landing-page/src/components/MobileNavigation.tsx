import React, { useEffect } from 'react';
import { BUSINESS_INFO } from '../config/business';
import { MOBILE_NAV_ITEMS } from '../config/routes';
import { MojoSparkle, PhoneIcon, MailIcon } from './Icons';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHomeIfNeeded: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  onNavigateHomeIfNeeded,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 960) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    onNavigateHomeIfNeeded();
    onClose();
  };

  return (
    <div
      id="mobile-navigation-drawer"
      className={`mobile-nav-drawer ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="mobile-nav-backdrop" onClick={onClose} aria-hidden="true" />
      <nav className="mobile-nav-panel" aria-label="Mobile Navigation">
        <div className="mobile-nav-top-note">
          <MojoSparkle className="text-coral" size={14} />
          <span>{BUSINESS_INFO.tagline}</span>
        </div>

        <ul className="mobile-nav-list">
          {MOBILE_NAV_ITEMS.map((item, idx) => (
            <li key={item.id} className="mobile-nav-item">
              <a
                href={item.href}
                className="mobile-nav-link"
                onClick={handleLinkClick}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="mobile-nav-index">0{idx + 1}</span>
                <span className="mobile-nav-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-nav-cta-group">
          <a
            href="#quote"
            className="btn btn-primary btn-full"
            onClick={handleLinkClick}
            tabIndex={isOpen ? 0 : -1}
          >
            <span>Get a Quote</span>
            <MojoSparkle size={15} />
          </a>

          <div className="mobile-nav-contact-row">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="mobile-nav-contact-chip"
              tabIndex={isOpen ? 0 : -1}
            >
              <PhoneIcon size={15} />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <a
              href={BUSINESS_INFO.emailHref}
              className="mobile-nav-contact-chip"
              tabIndex={isOpen ? 0 : -1}
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
