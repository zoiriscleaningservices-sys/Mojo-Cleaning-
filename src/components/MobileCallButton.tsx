import React from 'react';
import { BUSINESS_INFO } from '../config/business';
import { MojoSparkle, PhoneIcon } from './Icons';

export const MobileCallButton: React.FC = () => {
  return (
    <div
      className="mobile-sticky-bar"
      role="region"
      aria-label="Quick Mobile Call and Quote Actions"
    >
      <a
        href={BUSINESS_INFO.phoneHref}
        className="mobile-sticky-call-btn"
        aria-label={`Call Mojo Cleaning at ${BUSINESS_INFO.phoneDisplay}`}
      >
        <PhoneIcon size={17} />
        <div>
          <span className="mobile-sticky-sub">Call or Text</span>
          <strong className="mobile-sticky-num">{BUSINESS_INFO.phoneDisplay}</strong>
        </div>
      </a>

      <a href="#quote" className="mobile-sticky-quote-btn">
        <span>Get a Quote</span>
        <MojoSparkle size={14} />
      </a>
    </div>
  );
};
