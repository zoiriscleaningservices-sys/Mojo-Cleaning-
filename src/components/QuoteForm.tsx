import React, { useEffect, useMemo, useState } from 'react';
import { BUSINESS_INFO, type ServiceItem } from '../config/business';
import type { LocationId, ServiceId } from '../data/entities';
import { LOCATIONS_BY_ID } from '../data/locations-data';
import {
  CheckCircleIcon,
  ClockCheckIcon,
  MailIcon,
  MojoSparkle,
  PhoneIcon,
  ShieldCheckIcon,
} from './Icons';
import { MojoMascotFigure } from './MojoMascot';

export type SelectableServiceKey = ServiceId | ServiceItem['id'] | string;

export function normalizeServiceKey(key?: SelectableServiceKey): ServiceId {
  switch (key) {
    case 'recurring':
    case 'recurring-cleaning':
    case 'recurring-residential-cleaning':
      return 'recurring-residential-cleaning';
    case 'deep':
    case 'deep-cleaning':
    case 'deep-house-cleaning':
      return 'deep-house-cleaning';
    case 'move-in-cleaning':
      return 'move-in-cleaning';
    case 'move-in-out':
    case 'move-out-cleaning':
      return 'move-out-cleaning';
    case 'post-construction':
    case 'post-construction-cleaning':
      return 'post-construction-cleaning';
    default:
      return 'recurring-residential-cleaning';
  }
}

export function mapServiceIdToLegacyId(id: ServiceId): ServiceItem['id'] {
  switch (id) {
    case 'recurring-residential-cleaning':
      return 'recurring';
    case 'deep-house-cleaning':
      return 'deep';
    case 'move-in-cleaning':
    case 'move-out-cleaning':
      return 'move-in-out';
    case 'post-construction-cleaning':
      return 'post-construction';
  }
}

interface QuoteFormProps {
  selectedServiceId?: SelectableServiceKey;
  onSelectServiceId?: (id: ServiceItem['id']) => void;
  preselectedLocationId?: LocationId;
  contextKicker?: string;
  contextHeadline?: string;
  contextSubheadline?: string;
}

const GHL_FORM_ID = 'LMshydq3SzEFJgOrXehA';
const GHL_IFRAME_ID = 'inline-LMshydq3SzEFJgOrXehA';
const GHL_FORM_NAME = 'Golden Grove Website Form';
const GHL_WIDGET_URL = 'https://api.leadconnectorhq.com/widget/form/LMshydq3SzEFJgOrXehA';
const GHL_EMBED_SCRIPT_URL = 'https://link.msgsndr.com/js/form_embed.js';

function ensureGhlEmbedScriptLoaded() {
  if (typeof document === 'undefined') return;
  const existingDynamic = document.querySelector('script[data-mojo-form-embed="true"]');
  if (existingDynamic) {
    existingDynamic.remove();
  }
  const script = document.createElement('script');
  script.src = GHL_EMBED_SCRIPT_URL;
  script.async = true;
  script.setAttribute('data-mojo-form-embed', 'true');
  document.body.appendChild(script);
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  preselectedLocationId = 'huntsville-al',
  contextKicker,
  contextHeadline,
  contextSubheadline,
}) => {
  const preselectedLocation = useMemo(
    () => LOCATIONS_BY_ID[preselectedLocationId] || LOCATIONS_BY_ID['huntsville-al'],
    [preselectedLocationId]
  );

  const [iframeHeight, setIframeHeight] = useState<number>(680);

  useEffect(() => {
    ensureGhlEmbedScriptLoaded();

    const handleMessage = (event: MessageEvent) => {
      let payload = event.data;
      if (Array.isArray(payload)) return;
      if (typeof payload === 'string') {
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }
      if (typeof payload !== 'object' || !payload) return;
      const record = payload as Record<string, unknown>;
      const rawHeight =
        record.height ?? record.frameHeight ?? record.iframeHeight ?? record.h;
      if (typeof rawHeight === 'number' && rawHeight > 0) {
        setIframeHeight(Math.max(483, Math.ceil(rawHeight)));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [preselectedLocationId]);

  return (
    <section id="quote" className="quote-section" aria-labelledby="quote-heading">
      <div className="quote-glow quote-glow-left" aria-hidden="true" />
      <div className="quote-glow quote-glow-right" aria-hidden="true" />

      <div className="container">
        <div className="quote-grid">
          {/* Left Column: Reassurance, Promo Offer & Direct Contact */}
          <div className="quote-info-col">
            <div className="quote-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>{contextKicker || `${preselectedLocation.name} Custom Quote`}</span>
            </div>

            <h2 id="quote-heading" className="quote-title">
              {contextHeadline ||
                `Ready for a ${preselectedLocation.name} home that feels like a deep breath?`}
            </h2>

            <p className="quote-lead">
              {contextSubheadline ||
                `Tell us a little about your ${preselectedLocation.name} home and the type of clean you are looking for. Our team reviews every request and follows up promptly with a transparent, customized quote.`}
            </p>

            {/* Direct Contact Channels */}
            <div className="quote-direct-channels">
              <h3 className="quote-direct-heading">Prefer to reach out directly?</h3>

              <a href={BUSINESS_INFO.phoneHref} className="quote-channel-item">
                <span className="quote-channel-icon">
                  <PhoneIcon size={18} />
                </span>
                <div>
                  <strong>Call or Text {BUSINESS_INFO.phoneDisplay}</strong>
                  <span>{BUSINESS_INFO.officeHours.weekdays}</span>
                </div>
              </a>

              <a href={BUSINESS_INFO.emailHref} className="quote-channel-item">
                <span className="quote-channel-icon">
                  <MailIcon size={18} />
                </span>
                <div>
                  <strong>{BUSINESS_INFO.email}</strong>
                  <span>Serving {preselectedLocation.fullStateName}</span>
                </div>
              </a>
            </div>

            <ul className="quote-reassurance-list">
              <li>
                <ShieldCheckIcon size={17} className="text-coral" />
                <span>100% Insured, bonded &amp; background-checked team</span>
              </li>
              <li>
                <ClockCheckIcon size={17} className="text-coral" />
                <span>Backed by our 48-Hour Happiness Guarantee</span>
              </li>
              <li>
                <CheckCircleIcon size={17} className="text-coral" />
                <span>No obligation—appointment is booked only after you confirm</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Official LeadConnector / Golden Grove Website Form Embed */}
          <div className="quote-form-col">
            <div className="quote-card">
              <div className="quote-card-header">
                <div className="quote-card-header-left">
                  <MojoMascotFigure
                    pose="welcome-open"
                    animation="celebrate-hop"
                    size={62}
                    alt={`Mojo Cleaning Mascot welcoming your ${preselectedLocation.name} quote request`}
                  />
                  <div>
                    <span className="quote-card-kicker">
                      {preselectedLocation.name} • {preselectedLocation.county}
                    </span>
                    <h3 className="quote-card-title">
                      {preselectedLocation.name} Cleaning Quote Request
                    </h3>
                  </div>
                </div>
              </div>

              <div
                className="ghl-embed-container"
                style={{
                  minHeight: `${iframeHeight}px`,
                  height: `${iframeHeight}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                <iframe
                  src={GHL_WIDGET_URL}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '0px',
                  }}
                  id={GHL_IFRAME_ID}
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name={GHL_FORM_NAME}
                  data-height="483"
                  data-layout-iframe-id={GHL_IFRAME_ID}
                  data-form-id={GHL_FORM_ID}
                  data-cookie-consent="true"
                  data-cookie-consent-provider="auto"
                  title={GHL_FORM_NAME}
                  className="ghl-iframe"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
