import React, { useEffect, useRef, useState } from 'react';
import type { LocationEntity } from '../data/entities';
import { getLocationChecklistPath, getLocationQuotePath } from '../utils/location-routing';
import { ArrowRightIcon, MojoSparkle } from './Icons';

export type MascotPose = 'wave' | 'checklist' | 'action' | 'welcome-open';

export type MascotAnimation =
  | 'wave-float'
  | 'step-bounce'
  | 'checklist-nod'
  | 'celebrate-hop'
  | 'scroll-up-hop';

interface MascotPoseConfig {
  webp: string;
  png: string;
  width: number;
  height: number;
  defaultAlt: string;
}

export const MASCOT_POSES: Record<MascotPose, MascotPoseConfig> = {
  wave: {
    webp: '/images/mascot-wave.webp',
    png: '/images/mascot-wave.png',
    width: 568,
    height: 583,
    defaultAlt: 'Mojo Cleaning Sparkle Mascot waving hello with a pink microfiber cloth',
  },
  checklist: {
    webp: '/images/mascot-checklist.webp',
    png: '/images/mascot-checklist.png',
    width: 566,
    height: 586,
    defaultAlt: 'Mojo Cleaning Sparkle Mascot holding the 56-point room checklist clipboard and giving a thumbs-up',
  },
  action: {
    webp: '/images/mascot-action.webp',
    png: '/images/mascot-action.png',
    width: 545,
    height: 572,
    defaultAlt: 'Mojo Cleaning Sparkle Mascot stepping into action with a shine spray bottle and microfiber cloth',
  },
  'welcome-open': {
    webp: '/images/mascot-welcome-open.webp',
    png: '/images/mascot-welcome-open.png',
    width: 625,
    height: 586,
    defaultAlt: 'Mojo Cleaning Sparkle Mascot welcoming you with open arms',
  },
};

interface MojoMascotFigureProps {
  pose?: MascotPose;
  animation?: MascotAnimation;
  size?: number;
  alt?: string;
  className?: string;
  eager?: boolean;
}

export const MojoMascotFigure: React.FC<MojoMascotFigureProps> = ({
  pose = 'wave',
  animation = 'wave-float',
  size = 86,
  alt,
  className = '',
  eager = false,
}) => {
  const config = MASCOT_POSES[pose];
  const aspectHeight = Math.round((size * config.height) / config.width);

  return (
    <span
      className={`mojo-mascot-figure mojo-mascot-anim-${animation} ${className}`}
      style={{ width: `${size}px`, height: `${aspectHeight}px` }}
    >
      <span className="mojo-mascot-sparkle-dot dot-1" aria-hidden="true">
        ✦
      </span>
      <span className="mojo-mascot-sparkle-dot dot-2" aria-hidden="true">
        ✦
      </span>
      <picture>
        <source srcSet={config.webp} type="image/webp" />
        <img
          src={config.png}
          alt={alt || config.defaultAlt}
          width={size}
          height={aspectHeight}
          loading={eager ? 'eager' : 'lazy'}
          className="mojo-mascot-img"
        />
      </picture>
    </span>
  );
};

interface HeroWelcomeMascotBadgeProps {
  location: LocationEntity;
  greeting?: string;
  subtext?: string;
  pose?: MascotPose;
}

export const HeroWelcomeMascotBadge: React.FC<HeroWelcomeMascotBadgeProps> = ({
  location,
  greeting,
  subtext,
  pose = 'wave',
}) => {
  const quoteHref = getLocationQuotePath(location.id);

  return (
    <div className="hero-mascot-welcome-bar" role="region" aria-label="Mojo Mascot Welcome">
      <div className="hero-mascot-avatar-wrap">
        <MojoMascotFigure
          pose={pose}
          animation="wave-float"
          size={64}
          eager
          alt={`Mojo Cleaning Mascot welcoming ${location.name} homeowners`}
        />
      </div>
      <div className="hero-mascot-welcome-copy">
        <div className="hero-mascot-speech-kicker">
          <MojoSparkle className="text-coral" size={12} />
          <span>Mojo Mascot Welcome • {location.name}</span>
        </div>
        <p className="hero-mascot-speech-title">
          {greeting || `Hi ${location.city}! Welcome to a cleaner home & a brighter mood!`}
        </p>
        <p className="hero-mascot-speech-sub">
          {subtext ||
            `Our insured, background-checked ${location.city} team brings all supplies & our 56-point room checklist.`}
        </p>
      </div>
      <a href={quoteHref} className="hero-mascot-quick-cta">
        <span>Fast Quote</span>
        <ArrowRightIcon size={13} />
      </a>
    </div>
  );
};

interface SectionMascotBannerProps {
  pose: MascotPose;
  animation?: MascotAnimation;
  kicker: string;
  headline: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  theme?: 'cream' | 'burgundy';
}

export const SectionMascotBanner: React.FC<SectionMascotBannerProps> = ({
  pose,
  animation = 'wave-float',
  kicker,
  headline,
  description,
  ctaLabel,
  ctaHref,
  theme = 'cream',
}) => {
  return (
    <div className={`section-mascot-banner is-${theme}`}>
      <div className="section-mascot-char">
        <MojoMascotFigure pose={pose} animation={animation} size={82} />
      </div>
      <div className="section-mascot-content">
        <div className="section-mascot-kicker">
          <MojoSparkle className="text-coral" size={12} />
          <span>{kicker}</span>
        </div>
        <strong className="section-mascot-headline">{headline}</strong>
        <p className="section-mascot-desc">{description}</p>
      </div>
      {ctaLabel && ctaHref ? (
        <a href={ctaHref} className="btn btn-primary btn-sm section-mascot-cta">
          <span>{ctaLabel}</span>
          <ArrowRightIcon size={14} />
        </a>
      ) : null}
    </div>
  );
};

interface MojoScrollMascotCompanionProps {
  location: LocationEntity;
}

export const MojoScrollMascotCompanion: React.FC<MojoScrollMascotCompanionProps> = ({
  location,
}) => {
  const [scrollStage, setScrollStage] = useState<'top' | 'services' | 'checklist' | 'quote'>('top');
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [bubbleOpen, setBubbleOpen] = useState<boolean>(true);
  const [isCheering, setIsCheering] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastScrollY.current;
      if (Math.abs(delta) > 8) {
        setScrollDirection(delta < 0 && y > 420 ? 'up' : 'down');
        lastScrollY.current = y;
      }

      if (y < 280) {
        setScrollStage('top');
      } else if (y < 1450) {
        setScrollStage('services');
      } else if (y < 2550) {
        setScrollStage('checklist');
      } else {
        setScrollStage('quote');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerCheer = () => {
    setIsCheering(true);
    setBubbleOpen(true);
    window.setTimeout(() => setIsCheering(false), 750);
  };

  const quoteHref = getLocationQuotePath(location.id);
  const checklistHref = getLocationChecklistPath(location.id);

  const getCompanionState = (): {
    pose: MascotPose;
    animation: MascotAnimation;
    badge: string;
    message: string;
    actionLabel: string;
    actionHref: string;
  } => {
    if (scrollDirection === 'up') {
      return {
        pose: 'welcome-open',
        animation: 'scroll-up-hop',
        badge: `Heading Back Up • ${location.city}`,
        message: `Need a quick ${location.city} house cleaning estimate or want to jump to the top?`,
        actionLabel: 'Request Quote',
        actionHref: quoteHref,
      };
    }

    switch (scrollStage) {
      case 'services':
        return {
          pose: 'action',
          animation: 'step-bounce',
          badge: `Sparkle In Action • ${location.city}`,
          message: `We bring all supplies & HEPA vacuums to every ${location.city} appointment!`,
          actionLabel: 'Get a Quote',
          actionHref: quoteHref,
        };
      case 'checklist':
        return {
          pose: 'checklist',
          animation: 'checklist-nod',
          badge: '56-Point Room Standard',
          message: `Every kitchen, bath & bedroom is checked off with our 48-Hour Guarantee!`,
          actionLabel: '56-Point List',
          actionHref: checklistHref,
        };
      case 'quote':
        return {
          pose: 'welcome-open',
          animation: 'celebrate-hop',
          badge: `Ready When You Are!`,
          message: `Tell us about your ${location.city} home—we'll send a custom quote right over!`,
          actionLabel: 'Jump to Form',
          actionHref: '#quote',
        };
      case 'top':
      default:
        return {
          pose: 'wave',
          animation: 'wave-float',
          badge: `Welcome to Mojo • ${location.city}`,
          message: `Hi there! Scroll down to explore our ${location.city} residential cleaning services!`,
          actionLabel: 'Fast Quote',
          actionHref: quoteHref,
        };
    }
  };

  const state = getCompanionState();

  return (
    <aside
      className={`mojo-scroll-companion ${bubbleOpen ? 'is-expanded' : 'is-compact'} ${
        isCheering ? 'is-cheering' : ''
      }`}
      aria-label="Mojo Cleaning Interactive Mascot Guide"
    >
      <button
        type="button"
        className="mojo-companion-avatar-btn"
        onClick={triggerCheer}
        aria-label="Wave hello to the Mojo Cleaning Mascot"
        title="Click to make Mojo wave!"
      >
        <MojoMascotFigure
          pose={state.pose}
          animation={state.animation}
          size={68}
          alt={`Mojo Cleaning Mascot — ${state.badge}`}
        />
      </button>

      {bubbleOpen ? (
        <div className="mojo-companion-bubble">
          <div className="mojo-companion-bubble-top">
            <span className="mojo-companion-badge">
              <MojoSparkle className="text-coral" size={11} />
              <span>{state.badge}</span>
            </span>
            <button
              type="button"
              className="mojo-companion-close"
              onClick={() => setBubbleOpen(false)}
              aria-label="Minimize mascot message"
              title="Minimize message"
            >
              ×
            </button>
          </div>

          <p className="mojo-companion-msg">{state.message}</p>

          <div className="mojo-companion-actions">
            <a href={state.actionHref} className="mojo-companion-cta">
              <span>{state.actionLabel}</span>
              <ArrowRightIcon size={12} />
            </a>
            {scrollStage !== 'top' ? (
              <button
                type="button"
                className="mojo-companion-top-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                ↑ Top
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="mojo-companion-reopen-pill"
          onClick={() => setBubbleOpen(true)}
          aria-label="Open Mojo Mascot welcome tip"
        >
          <span>Hi {location.city}!</span>
        </button>
      )}
    </aside>
  );
};
