/**
 * PHASE 15 & PHASE 16 — PUBLIC ERP SERVICE BOUNDARY & ORGANIC ATTRIBUTION
 * Separates UI components from business lookup logic, ZIP verification,
 * organic landing-page attribution, and backend lead submission.
 */

import type { LocationEntity, LocationId, PageType, ServiceEntity, ServiceId } from '../data/entities';
import { LOCATIONS_BY_ID, LOCATIONS_DATA } from '../data/locations-data';
import { SERVICE_LOCATIONS_DATA } from '../data/service-locations-data';
import { SERVICES_BY_ID } from '../data/services-data';
import type { ErpServiceAvailability, SeoOrganicAttributionSession } from './types';

const ATTRIBUTION_STORAGE_KEY = 'mojo_organic_attribution_v2';

export function recordOrganicLandingSession(path: string, pageType: PageType): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (existing) return;

    const params = new URLSearchParams(window.location.search);
    const session: SeoOrganicAttributionSession = {
      firstLandingPath: path,
      firstLandingPageType: pageType,
      enteredAtIso: new Date().toISOString(),
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
      referrer: document.referrer || undefined,
    };
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage errors in restricted browsing modes
  }
}

export function getOrganicLandingSession(
  fallbackPath: string,
  fallbackPageType: PageType
): SeoOrganicAttributionSession {
  if (typeof window === 'undefined') {
    return {
      firstLandingPath: fallbackPath,
      firstLandingPageType: fallbackPageType,
      enteredAtIso: new Date().toISOString(),
    };
  }
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as SeoOrganicAttributionSession;
    }
  } catch {
    // Fallback below
  }
  return {
    firstLandingPath: fallbackPath,
    firstLandingPageType: fallbackPageType,
    enteredAtIso: new Date().toISOString(),
  };
}

export function getServiceAvailability(
  serviceId: ServiceId,
  locationId: LocationId
): ErpServiceAvailability {
  const location = LOCATIONS_BY_ID[locationId];
  const matrixMatch = SERVICE_LOCATIONS_DATA.find(
    (item) => item.serviceId === serviceId && item.locationId === locationId
  );

  return {
    serviceId,
    locationId,
    isAvailable: Boolean(matrixMatch?.isAvailable ?? location?.availableServiceIds.includes(serviceId)),
    supportedZipCodes: location?.zipCodes || [],
    weekdayWindow: 'Monday – Friday: 8:00 AM – 6:00 PM',
    saturdayByAppointment: true,
  };
}

export function getAvailableServicesForLocation(locationId: LocationId): ServiceEntity[] {
  const location = LOCATIONS_BY_ID[locationId];
  if (!location) return [];
  return location.availableServiceIds
    .map((id) => SERVICES_BY_ID[id])
    .filter((s): s is ServiceEntity => Boolean(s));
}

export function checkZipOrCityCoverage(rawQuery: string): {
  matched: boolean;
  locations: LocationEntity[];
  message: string;
} {
  const q = rawQuery.trim().toLowerCase();
  if (!q) {
    return {
      matched: true,
      locations: LOCATIONS_DATA,
      message: 'Showing all 5 verified Huntsville & Madison County service areas.',
    };
  }

  const matches = LOCATIONS_DATA.filter((loc) => {
    const inCity = loc.city.toLowerCase().includes(q) || loc.name.toLowerCase().includes(q);
    const inZips = loc.zipCodes.some((z) => z.toLowerCase().includes(q));
    const inNeighborhoods = loc.neighborhoods.some((n) => n.toLowerCase().includes(q));
    return inCity || inZips || inNeighborhoods;
  });

  if (matches.length > 0) {
    return {
      matched: true,
      locations: matches,
      message: `Confirmed! Mojo Cleaning actively serves ${matches.map((m) => m.name).join(', ')}.`,
    };
  }

  return {
    matched: false,
    locations: [],
    message:
      'We may still serve your nearby Madison or Limestone County neighborhood—call or text (256) 418-8199 or submit your ZIP code in our quote form to confirm.',
  };
}
