import React, { useEffect, useState } from 'react';
import { BUSINESS_INFO } from '../config/business';
import { MojoSparkle } from './Icons';

export const IntroAnimation: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    try {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const alreadySeen = sessionStorage.getItem('mojo_intro_seen') === '1';

      if (reducedMotion || alreadySeen) {
        setDismissed(true);
        return;
      }

      sessionStorage.setItem('mojo_intro_seen', '1');
      const isMobile = window.innerWidth < 768;
      const holdMs = isMobile ? 650 : 1050;
      const exitMs = isMobile ? 320 : 480;

      const exitTimer = window.setTimeout(() => {
        setExiting(true);
      }, holdMs);

      const removeTimer = window.setTimeout(() => {
        setDismissed(true);
      }, holdMs + exitMs);

      return () => {
        window.clearTimeout(exitTimer);
        window.clearTimeout(removeTimer);
      };
    } catch {
      setDismissed(true);
    }
  }, []);

  if (dismissed) {
    return null;
  }

  return (
    <div
      className={`mojo-intro-overlay ${exiting ? 'is-exiting' : ''}`}
      role="region"
      aria-label="Mojo Cleaning Brand Introduction"
    >
      <div className="mojo-intro-ambient" aria-hidden="true" />
      <div className="mojo-intro-stage">
        <div className="mojo-intro-logo-plaque">
          <MojoSparkle className="mojo-intro-sparkle" size={20} />
          <picture>
            <source srcSet="/images/mojo-logo.webp" type="image/webp" />
            <img
              src="/mojo-logo.png"
              alt={BUSINESS_INFO.name}
              width={220}
              height={110}
              className="mojo-intro-logo-img"
            />
          </picture>
        </div>

        <div className="mojo-intro-accent-line" aria-hidden="true" />

        <p className="mojo-intro-statement">A CLEAN HOME. A GOOD MOOD.</p>
        <p className="mojo-intro-sub">Huntsville &amp; Madison County, Alabama</p>
      </div>

      <button
        type="button"
        className="mojo-intro-skip"
        onClick={() => setDismissed(true)}
        aria-label="Skip opening animation"
      >
        Skip Intro
      </button>
    </div>
  );
};
