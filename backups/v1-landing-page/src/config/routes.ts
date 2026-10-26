/**
 * Scalable Route & Page Architecture for Mojo Cleaning.
 * Supports current landing page sections, full interactive legal & checklist views,
 * and future multi-page expansion without rebuilding the application.
 */

export type ActivePageView = 'home' | 'privacy-policy' | 'terms-and-conditions';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  sectionId?: string;
}

export interface FuturePageBlueprint {
  slug: string;
  title: string;
  status: 'live' | 'section-integrated' | 'planned';
  anchorTarget?: string;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#top', sectionId: 'top' },
  { id: 'services', label: 'Services', href: '#services', sectionId: 'services' },
  { id: 'why-mojo', label: 'Why Mojo', href: '#why-mojo', sectionId: 'why-mojo' },
  { id: 'reviews', label: 'Reviews', href: '#reviews', sectionId: 'reviews' },
  { id: 'faqs', label: 'FAQs', href: '#faqs', sectionId: 'faqs' },
];

export const MOBILE_NAV_ITEMS: NavItem[] = [
  { id: 'services', label: 'Services', href: '#services', sectionId: 'services' },
  { id: 'why-mojo', label: 'Why Mojo', href: '#why-mojo', sectionId: 'why-mojo' },
  { id: 'reviews', label: 'Reviews', href: '#reviews', sectionId: 'reviews' },
  { id: 'faqs', label: 'FAQs', href: '#faqs', sectionId: 'faqs' },
];

export const SITE_ARCHITECTURE_PAGES: FuturePageBlueprint[] = [
  { slug: '/', title: 'Home', status: 'live', anchorTarget: '#top' },
  { slug: '/about', title: 'About', status: 'section-integrated', anchorTarget: '#why-mojo' },
  { slug: '/services', title: 'Services', status: 'section-integrated', anchorTarget: '#services' },
  { slug: '/services/recurring-cleaning', title: 'Recurring Cleaning', status: 'section-integrated', anchorTarget: '#service-recurring' },
  { slug: '/services/deep-cleaning', title: 'Deep Cleaning', status: 'section-integrated', anchorTarget: '#service-deep' },
  { slug: '/services/move-in-cleaning', title: 'Move-In Cleaning', status: 'section-integrated', anchorTarget: '#service-move-in-out' },
  { slug: '/services/move-out-cleaning', title: 'Move-Out Cleaning', status: 'section-integrated', anchorTarget: '#service-move-in-out' },
  { slug: '/services/post-construction-cleaning', title: 'Post-Construction Cleaning', status: 'section-integrated', anchorTarget: '#service-post-construction' },
  { slug: '/cleaning-checklist', title: '56-Point Cleaning Checklist', status: 'section-integrated', anchorTarget: '#checklist-explorer' },
  { slug: '/service-areas', title: 'Service Areas', status: 'section-integrated', anchorTarget: '#service-areas' },
  { slug: '/reviews', title: 'Reviews', status: 'section-integrated', anchorTarget: '#reviews' },
  { slug: '/faqs', title: 'Frequently Asked Questions', status: 'section-integrated', anchorTarget: '#faqs' },
  { slug: '/contact', title: 'Contact & Quote Request', status: 'section-integrated', anchorTarget: '#quote' },
  { slug: '/privacy-policy', title: 'Privacy Policy', status: 'live' },
  { slug: '/terms-and-conditions', title: 'Terms and Conditions', status: 'live' },
];
