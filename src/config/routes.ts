/**
 * PHASE 3 — COMPLETE MULTI-PAGE NAVIGATION & ROUTE CONFIGURATION
 */

export interface PrimaryNavItem {
  id: string;
  label: string;
  href: string;
  matchPrefix?: string;
}

export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'services', label: 'Services', href: '/services/', matchPrefix: '/services/' },
  { id: 'locations', label: 'Locations', href: '/locations/', matchPrefix: '/locations/' },
  { id: 'about', label: 'About', href: '/about/', matchPrefix: '/about/' },
  { id: 'reviews', label: 'Reviews', href: '/reviews/', matchPrefix: '/reviews/' },
  { id: 'faqs', label: 'FAQs', href: '/faqs/', matchPrefix: '/faqs/' },
  { id: 'contact', label: 'Contact', href: '/contact/', matchPrefix: '/contact/' },
];
