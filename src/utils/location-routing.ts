/**
 * SECTION 4, 7, 8 & 14 — LOCATION-AWARE ROUTING & NAVIGATION UTILITY
 * Centralizes all route generation and validates every service link against
 * the active location's availableServiceIds list so cross-location link leakage
 * is architecturally impossible.
 */

import type {
  LocationEntity,
  LocationId,
  NavigationConfiguration,
  NavigationDropdownItem,
  ServiceEntity,
  ServiceId,
} from '../data/entities';
import { DEFAULT_LOCATION_ID, LOCATIONS_BY_ID, LOCATIONS_DATA } from '../data/locations-data';
import { SERVICES_BY_ID } from '../data/services-data';

const VALID_LOCATION_IDS = new Set<string>(LOCATIONS_DATA.map((l) => l.id));

export function isValidLocationId(value: string | undefined | null): value is LocationId {
  return Boolean(value && VALID_LOCATION_IDS.has(value));
}

export function extractLocationIdFromPath(rawPath: string): LocationId | null {
  const clean = rawPath
    .split('#')[0]
    .split('?')[0]
    .trim()
    .replace(/^\/Mojo-Cleaning-(?=\/|$)/i, '');
  const segments = clean.split('/').filter(Boolean);
  if (segments.length === 0) {
    return null;
  }
  const firstSegment = segments[0];
  if (isValidLocationId(firstSegment)) {
    return firstSegment;
  }
  return null;
}

export function resolveActiveLocationId(
  rawPath: string,
  fallbackLocationId: LocationId = DEFAULT_LOCATION_ID
): LocationId {
  const extracted = extractLocationIdFromPath(rawPath);
  return extracted ?? fallbackLocationId;
}

export function getLocationEntity(locationId: LocationId): LocationEntity {
  return LOCATIONS_BY_ID[locationId] ?? LOCATIONS_BY_ID[DEFAULT_LOCATION_ID];
}

export function isServiceAvailableInLocation(
  locationId: LocationId,
  serviceId: ServiceId
): boolean {
  const location = getLocationEntity(locationId);
  return location.availableServiceIds.includes(serviceId);
}

export function getAvailableServicesForLocation(locationId: LocationId): ServiceEntity[] {
  const location = getLocationEntity(locationId);
  return location.availableServiceIds
    .map((serviceId) => SERVICES_BY_ID[serviceId])
    .filter((s): s is ServiceEntity => Boolean(s));
}

export function getGlobalLocationsDirectoryPath(): string {
  return '/locations/';
}

export function getLocationHomePath(locationId: LocationId): string {
  const loc = getLocationEntity(locationId);
  return `/${loc.slug}/`;
}

export function getLocationAboutPath(locationId: LocationId): string {
  const loc = getLocationEntity(locationId);
  return `/${loc.slug}/about/`;
}

export function getLocationServicesPath(locationId: LocationId): string {
  const loc = getLocationEntity(locationId);
  return `/${loc.slug}/services/`;
}

export function getLocationServiceDetailPath(
  locationId: LocationId,
  serviceId: ServiceId
): string {
  const loc = getLocationEntity(locationId);
  if (!loc.availableServiceIds.includes(serviceId)) {
    // Fallback to the location's services overview if a service is not offered in that location
    return getLocationServicesPath(loc.id);
  }
  const service = SERVICES_BY_ID[serviceId];
  return `/${loc.slug}/services/${service.slug}/`;
}

export function getLocationChecklistPath(locationId: LocationId): string {
  const loc = getLocationEntity(locationId);
  return `/${loc.slug}/checklist/`;
}

export function getLocationReviewsPath(locationId: LocationId): string {
  const loc = getLocationEntity(locationId);
  return `/${loc.slug}/reviews/`;
}

export function getLocationFaqsPath(locationId: LocationId): string {
  const loc = getLocationEntity(locationId);
  return `/${loc.slug}/faqs/`;
}

export function getLocationContactPath(locationId: LocationId): string {
  const loc = getLocationEntity(locationId);
  return `/${loc.slug}/contact/`;
}

export function getLocationQuotePath(
  locationId: LocationId,
  preselectedServiceId?: ServiceId
): string {
  const loc = getLocationEntity(locationId);
  const base = `/${loc.slug}/request-a-quote/`;
  if (preselectedServiceId && loc.availableServiceIds.includes(preselectedServiceId)) {
    return `${base}?service=${preselectedServiceId}`;
  }
  return base;
}

export function buildLocationNavigation(locationId: LocationId): NavigationConfiguration {
  const loc = getLocationEntity(locationId);
  const availableServices = getAvailableServicesForLocation(loc.id);

  const homeHref = getLocationHomePath(loc.id);
  const aboutHref = getLocationAboutPath(loc.id);
  const servicesHref = getLocationServicesPath(loc.id);
  const checklistHref = getLocationChecklistPath(loc.id);
  const reviewsHref = getLocationReviewsPath(loc.id);
  const faqsHref = getLocationFaqsPath(loc.id);
  const contactHref = getLocationContactPath(loc.id);
  const quoteHref = getLocationQuotePath(loc.id);
  const allLocationsHref = getGlobalLocationsDirectoryPath();

  const serviceDropdownItems: NavigationDropdownItem[] = availableServices.map((service) => ({
    id: service.id,
    label: service.name,
    shortLabel: service.shortName,
    badge: service.badge,
    checklistLabel: service.checklistPointsLabel,
    href: getLocationServiceDetailPath(loc.id, service.id),
  }));

  return {
    locationId: loc.id,
    locationName: loc.name,
    locationCity: loc.city,
    homeHref,
    aboutHref,
    servicesHref,
    checklistHref,
    reviewsHref,
    faqsHref,
    contactHref,
    quoteHref,
    allLocationsHref,
    primaryItems: [
      { id: 'home', label: 'Home', href: homeHref },
      { id: 'about', label: 'About', href: aboutHref },
      {
        id: 'services',
        label: 'Services',
        href: servicesHref,
        hasDropdown: true,
        dropdownItems: serviceDropdownItems,
      },
      { id: 'checklist', label: '56-Point Checklist', href: checklistHref },
      { id: 'reviews', label: 'Reviews', href: reviewsHref },
      { id: 'faqs', label: 'FAQs', href: faqsHref },
      { id: 'contact', label: 'Contact', href: contactHref },
    ],
    serviceDropdownItems,
    footerExploreItems: [
      { label: 'Home', href: homeHref },
      { label: 'About Mojo Cleaning', href: aboutHref },
      { label: 'Services Overview', href: servicesHref },
      { label: '56-Point Cleaning Checklist', href: checklistHref },
      { label: 'Client Reviews', href: reviewsHref },
      { label: 'FAQs', href: faqsHref },
      { label: 'Contact', href: contactHref },
      { label: 'Request a Quote', href: quoteHref },
    ],
    footerServiceItems: availableServices.map((s) => ({
      label: s.name,
      href: getLocationServiceDetailPath(loc.id, s.id),
    })),
  };
}
