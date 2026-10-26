/**
 * SECTION 3, 4, 13 & 14 — LOCATION-ISOLATED ROUTE REGISTRY, CANONICAL NORMALIZATION & SCHEMA.ORG GRAPH
 * Generates all 69 indexable routes (5 locations × 13 isolated pages + /, /locations/, /privacy-policy/, /terms/)
 * plus custom 404 and complete legacy 301 redirect mappings.
 */

import { GENERAL_BUSINESS_FAQS, VERIFIED_BUSINESS_PROFILE } from './business-profile';
import type { BreadcrumbItem, FaqEntity, LocationEntity, PageEntity } from './entities';
import { DEFAULT_LOCATION_ID, LOCATIONS_BY_ID, LOCATIONS_DATA } from './locations-data';
import {
  PUBLISHED_SERVICE_LOCATIONS_BY_PATH,
  getLocationServiceEntity,
} from './service-locations-data';
import {
  getAvailableServicesForLocation,
  getLocationAboutPath,
  getLocationChecklistPath,
  getLocationContactPath,
  getLocationFaqsPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationReviewsPath,
  getLocationServiceDetailPath,
  getLocationServicesPath,
} from '../utils/location-routing';

export const SITE_ORIGIN = 'https://mojocleaningservice.com';

export function normalizeRoutePath(rawPath: string): string {
  const withoutHashOrQuery = rawPath.split('#')[0].split('?')[0].trim();
  if (!withoutHashOrQuery || withoutHashOrQuery === '/') {
    return '/';
  }
  const withLeadingSlash = withoutHashOrQuery.startsWith('/')
    ? withoutHashOrQuery
    : `/${withoutHashOrQuery}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

function buildLegacyRedirects(): Record<string, string> {
  const redirects: Record<string, string> = {
    '/cleaning-checklist/': '/huntsville-al/checklist/',
    '/contact_us/': '/huntsville-al/contact/',
    '/Contact_us/': '/huntsville-al/contact/',
    '/terms-and-conditions/': '/terms/',
    '/about/': '/huntsville-al/about/',
    '/services/': '/huntsville-al/services/',
    '/reviews/': '/huntsville-al/reviews/',
    '/faqs/': '/huntsville-al/faqs/',
    '/contact/': '/huntsville-al/contact/',
    '/request-a-quote/': '/huntsville-al/request-a-quote/',
    '/checklist/': '/huntsville-al/checklist/',
    '/services/recurring-cleaning/': '/huntsville-al/services/recurring-residential-cleaning/',
    '/services/recurring-residential-cleaning/':
      '/huntsville-al/services/recurring-residential-cleaning/',
    '/services/deep-cleaning/': '/huntsville-al/services/deep-house-cleaning/',
    '/services/deep-house-cleaning/': '/huntsville-al/services/deep-house-cleaning/',
    '/services/move-in-cleaning/': '/huntsville-al/services/move-in-cleaning/',
    '/services/move-out-cleaning/': '/huntsville-al/services/move-out-cleaning/',
    '/services/post-construction-cleaning/':
      '/huntsville-al/services/post-construction-cleaning/',
  };

  for (const loc of LOCATIONS_DATA) {
    redirects[`/locations/${loc.slug}/`] = `/${loc.slug}/`;
    redirects[`/locations/${loc.slug}/recurring-cleaning/`] =
      `/${loc.slug}/services/recurring-residential-cleaning/`;
    redirects[`/locations/${loc.slug}/deep-cleaning/`] =
      `/${loc.slug}/services/deep-house-cleaning/`;
    redirects[`/locations/${loc.slug}/move-in-cleaning/`] =
      `/${loc.slug}/services/move-in-cleaning/`;
    redirects[`/locations/${loc.slug}/move-out-cleaning/`] =
      `/${loc.slug}/services/move-out-cleaning/`;
    redirects[`/locations/${loc.slug}/post-construction-cleaning/`] =
      `/${loc.slug}/services/post-construction-cleaning/`;
    redirects[`/${loc.slug}/services/recurring-cleaning/`] =
      `/${loc.slug}/services/recurring-residential-cleaning/`;
    redirects[`/${loc.slug}/services/deep-cleaning/`] =
      `/${loc.slug}/services/deep-house-cleaning/`;
  }

  return redirects;
}

export const LEGACY_REDIRECTS: Record<string, string> = buildLegacyRedirects();

function buildOrganizationSchema(activeLoc?: LocationEntity): Record<string, unknown> {
  return {
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'ProfessionalService'],
    '@id': `${SITE_ORIGIN}/#organization`,
    name: VERIFIED_BUSINESS_PROFILE.businessName.value,
    legalName: VERIFIED_BUSINESS_PROFILE.legalName.value,
    url: activeLoc ? `${SITE_ORIGIN}/${activeLoc.slug}/` : `${SITE_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/mojo-logo.png`,
      width: 500,
      height: 250,
    },
    image: `${SITE_ORIGIN}/images/hero-interior.jpg`,
    telephone: VERIFIED_BUSINESS_PROFILE.telephoneE164.value,
    email: VERIFIED_BUSINESS_PROFILE.email.value,
    description: activeLoc
      ? `Insured and bonded residential house cleaning service serving ${activeLoc.fullStateName} (${activeLoc.zipCodes.join(', ')}). Offering recurring, deep, move-in, move-out, and post-construction cleaning backed by a 48-Hour Happiness Guarantee.`
      : 'Insured and bonded residential house cleaning service in North Alabama. Offering recurring, deep, move-in, move-out, and post-construction cleaning backed by a 48-Hour Happiness Guarantee.',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: activeLoc
      ? {
          '@type': 'City',
          name: activeLoc.city,
          containedInPlace: {
            '@type': 'State',
            name: 'Alabama',
          },
        }
      : LOCATIONS_DATA.map((loc) => ({
          '@type': 'City',
          name: loc.city,
          containedInPlace: {
            '@type': 'State',
            name: 'Alabama',
          },
        })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: VERIFIED_BUSINESS_PROFILE.telephoneE164.value,
      email: VERIFIED_BUSINESS_PROFILE.email.value,
      contactType: 'customer service',
      areaServed: 'US-AL',
      availableLanguage: ['English'],
    },
  };
}

function buildWebSiteSchema(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: `${SITE_ORIGIN}/`,
    name: 'Mojo Cleaning',
    publisher: {
      '@id': `${SITE_ORIGIN}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

function buildBreadcrumbSchema(
  canonicalUrl: string,
  breadcrumbs: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.label,
      item: `${SITE_ORIGIN}${crumb.href}`,
    })),
  };
}

function buildWebPageSchema(
  canonicalUrl: string,
  title: string,
  metaDescription: string
): Record<string, unknown> {
  return {
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description: metaDescription,
    isPartOf: {
      '@id': `${SITE_ORIGIN}/#website`,
    },
    about: {
      '@id': `${SITE_ORIGIN}/#organization`,
    },
    breadcrumb: {
      '@id': `${canonicalUrl}#breadcrumb`,
    },
    inLanguage: 'en-US',
  };
}

function buildFaqSchema(canonicalUrl: string, faqs: FaqEntity[]): Record<string, unknown> | null {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function createAllPages(): PageEntity[] {
  const siteSchema = buildWebSiteSchema();
  const pages: PageEntity[] = [];

  // 1. Root Flagship Gateway (/) — operates in primary Huntsville isolated context
  const defaultLoc = LOCATIONS_BY_ID[DEFAULT_LOCATION_ID];
  {
    const path = '/';
    const canonicalUrl = `${SITE_ORIGIN}/`;
    const title = 'House Cleaning Service in Huntsville, AL | Mojo Cleaning';
    const metaDescription =
      'Discover professional residential house cleaning in Huntsville, AL from Mojo Cleaning. Explore our 56-point room-by-room checklist, 48-hour guarantee, and request a quote.';
    const h1 = 'Residential House Cleaning in Huntsville, Alabama';
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Mojo Cleaning', href: '/huntsville-al/' }];
    const graph: Record<string, unknown>[] = [
      buildOrganizationSchema(defaultLoc),
      siteSchema,
      buildWebPageSchema(canonicalUrl, title, metaDescription),
      buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
    ];
    const faqSchema = buildFaqSchema(canonicalUrl, defaultLoc.faqs);
    if (faqSchema) graph.push(faqSchema);

    pages.push({
      path,
      pageType: 'location_home',
      locationId: defaultLoc.id,
      title,
      metaDescription,
      canonicalUrl,
      h1,
      robots: 'index, follow',
      publicationStatus: 'published',
      breadcrumbs,
      jsonLd: [{ '@context': 'https://schema.org', '@graph': graph }],
    });
  }

  // 2. Global Location Directory (/locations/)
  {
    const path = '/locations/';
    const canonicalUrl = `${SITE_ORIGIN}${path}`;
    const title = 'Service Areas Directory | North Alabama House Cleaning | Mojo Cleaning';
    const metaDescription =
      'Select your community to enter Mojo Cleaning’s dedicated residential cleaning experience for Huntsville, Madison, Hampton Cove, Owens Cross Roads, or Athens, AL.';
    const h1 = 'North Alabama House Cleaning Service Areas';
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'All Service Locations', href: '/locations/' }];
    const graph: Record<string, unknown>[] = [
      buildOrganizationSchema(),
      siteSchema,
      buildWebPageSchema(canonicalUrl, title, metaDescription),
      buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
    ];

    pages.push({
      path,
      pageType: 'locations_directory',
      title,
      metaDescription,
      canonicalUrl,
      h1,
      robots: 'index, follow',
      publicationStatus: 'published',
      breadcrumbs,
      jsonLd: [{ '@context': 'https://schema.org', '@graph': graph }],
    });
  }

  // 3. Global Legal Pages (/privacy-policy/ and /terms/)
  {
    const legalPages: {
      path: string;
      slug: 'privacy-policy' | 'terms';
      title: string;
      metaDescription: string;
      h1: string;
      label: string;
    }[] = [
      {
        path: '/privacy-policy/',
        slug: 'privacy-policy',
        title: 'Privacy Policy & SMS Terms | Mojo Cleaning LLC',
        metaDescription:
          'Read Mojo Cleaning LLC’s privacy policy governing quote requests, customer contact information, and optional SMS appointment notifications.',
        h1: 'Privacy Policy',
        label: 'Privacy Policy',
      },
      {
        path: '/terms/',
        slug: 'terms',
        title: 'Terms & Conditions of Service | Mojo Cleaning LLC',
        metaDescription:
          'Review Mojo Cleaning LLC’s residential cleaning service terms, home access guidelines, rescheduling policy, and 48-Hour Happiness Guarantee.',
        h1: 'Terms and Conditions',
        label: 'Terms & Conditions',
      },
    ];

    for (const lp of legalPages) {
      const canonicalUrl = `${SITE_ORIGIN}${lp.path}`;
      const breadcrumbs: BreadcrumbItem[] = [
        { label: defaultLoc.name, href: getLocationHomePath(defaultLoc.id) },
        { label: lp.label, href: lp.path },
      ];
      pages.push({
        path: lp.path,
        pageType: 'legal',
        locationId: defaultLoc.id,
        legalSlug: lp.slug,
        title: lp.title,
        metaDescription: lp.metaDescription,
        canonicalUrl,
        h1: lp.h1,
        robots: 'index, follow',
        publicationStatus: 'published',
        breadcrumbs,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@graph': [
              buildOrganizationSchema(defaultLoc),
              siteSchema,
              buildWebPageSchema(canonicalUrl, lp.title, lp.metaDescription),
              buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
            ],
          },
        ],
      });
    }
  }

  // 4. Per-Location Isolated Experience Pages (5 locations × 13 routes = 65 routes)
  for (const loc of LOCATIONS_DATA) {
    const locOrgSchema = buildOrganizationSchema(loc);
    const homePath = getLocationHomePath(loc.id);
    const aboutPath = getLocationAboutPath(loc.id);
    const servicesPath = getLocationServicesPath(loc.id);
    const checklistPath = getLocationChecklistPath(loc.id);
    const reviewsPath = getLocationReviewsPath(loc.id);
    const faqsPath = getLocationFaqsPath(loc.id);
    const contactPath = getLocationContactPath(loc.id);
    const quotePath = getLocationQuotePath(loc.id);

    // 4a. Location Homepage (/{loc}/)
    {
      const canonicalUrl = `${SITE_ORIGIN}${homePath}`;
      const breadcrumbs: BreadcrumbItem[] = [{ label: loc.name, href: homePath }];
      const graph: Record<string, unknown>[] = [
        locOrgSchema,
        siteSchema,
        buildWebPageSchema(canonicalUrl, loc.seo.title, loc.seo.metaDescription),
        buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
      ];
      const faqSchema = buildFaqSchema(canonicalUrl, loc.faqs);
      if (faqSchema) graph.push(faqSchema);

      pages.push({
        path: homePath,
        pageType: 'location_home',
        locationId: loc.id,
        title: loc.seo.title,
        metaDescription: loc.seo.metaDescription,
        canonicalUrl,
        h1: loc.homepageContent.heroHeadline,
        robots: 'index, follow',
        publicationStatus: 'published',
        breadcrumbs,
        jsonLd: [{ '@context': 'https://schema.org', '@graph': graph }],
      });
    }

    // 4b. Location About Page (/{loc}/about/)
    {
      const canonicalUrl = `${SITE_ORIGIN}${aboutPath}`;
      const title = `About Mojo Cleaning in ${loc.name} | Insured House Cleaners`;
      const metaDescription = `Learn how Mojo Cleaning LLC serves ${loc.fullStateName} (${loc.zipCodes.join(', ')}) with background-checked house cleaners, a 56-point checklist, and a 48-hour guarantee.`;
      const breadcrumbs: BreadcrumbItem[] = [
        { label: loc.name, href: homePath },
        { label: `About Mojo Cleaning (${loc.city})`, href: aboutPath },
      ];
      pages.push({
        path: aboutPath,
        pageType: 'location_about',
        locationId: loc.id,
        title,
        metaDescription,
        canonicalUrl,
        h1: loc.aboutContent.heroHeadline,
        robots: 'index, follow',
        publicationStatus: 'published',
        breadcrumbs,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@graph': [
              locOrgSchema,
              siteSchema,
              buildWebPageSchema(canonicalUrl, title, metaDescription),
              buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
            ],
          },
        ],
      });
    }

    // 4c. Location Services Overview Page (/{loc}/services/)
    {
      const canonicalUrl = `${SITE_ORIGIN}${servicesPath}`;
      const title = `Cleaning Services in ${loc.name} | Mojo Cleaning`;
      const metaDescription = `Compare all verified Mojo Cleaning residential cleaning services in ${loc.fullStateName}: Recurring Cleaning, 47-Point Deep Cleaning, Move-In/Out & Post-Construction.`;
      const h1 = `Cleaning Services in ${loc.fullStateName}`;
      const breadcrumbs: BreadcrumbItem[] = [
        { label: loc.name, href: homePath },
        { label: `${loc.city} Cleaning Services`, href: servicesPath },
      ];
      pages.push({
        path: servicesPath,
        pageType: 'location_services',
        locationId: loc.id,
        title,
        metaDescription,
        canonicalUrl,
        h1,
        robots: 'index, follow',
        publicationStatus: 'published',
        breadcrumbs,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@graph': [
              locOrgSchema,
              siteSchema,
              buildWebPageSchema(canonicalUrl, title, metaDescription),
              buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
            ],
          },
        ],
      });
    }

    // 4d. Location Individual Service Pages (/{loc}/services/{serviceSlug}/)
    const availableServices = getAvailableServicesForLocation(loc.id);
    for (const service of availableServices) {
      const detailPath = getLocationServiceDetailPath(loc.id, service.id);
      const combo = getLocationServiceEntity(loc.id, service.id);
      if (!combo) continue;

      const canonicalUrl = `${SITE_ORIGIN}${detailPath}`;
      const breadcrumbs: BreadcrumbItem[] = [
        { label: loc.name, href: homePath },
        { label: 'Services', href: servicesPath },
        { label: service.name, href: detailPath },
      ];
      const serviceSchema: Record<string, unknown> = {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: combo.headline,
        serviceType: service.name,
        description: combo.seo.metaDescription,
        url: canonicalUrl,
        provider: {
          '@id': `${SITE_ORIGIN}/#organization`,
        },
        areaServed: {
          '@type': 'City',
          name: loc.city,
          containedInPlace: {
            '@type': 'State',
            name: 'Alabama',
          },
        },
      };
      const faqSchema = buildFaqSchema(canonicalUrl, [...combo.faqs, ...service.faqs.slice(0, 2)]);
      const graph: Record<string, unknown>[] = [
        locOrgSchema,
        siteSchema,
        buildWebPageSchema(canonicalUrl, combo.seo.title, combo.seo.metaDescription),
        buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
        serviceSchema,
      ];
      if (faqSchema) graph.push(faqSchema);

      pages.push({
        path: detailPath,
        pageType: 'location_service_detail',
        locationId: loc.id,
        serviceId: service.id,
        serviceLocationId: combo.id,
        title: combo.seo.title,
        metaDescription: combo.seo.metaDescription,
        canonicalUrl,
        h1: combo.headline,
        robots: 'index, follow',
        publicationStatus: 'published',
        breadcrumbs,
        jsonLd: [{ '@context': 'https://schema.org', '@graph': graph }],
      });
    }

    // 4e. Location 56-Point Cleaning Checklist Page (/{loc}/checklist/)
    {
      const canonicalUrl = `${SITE_ORIGIN}${checklistPath}`;
      const title = `56-Point House Cleaning Checklist in ${loc.name} | Mojo Cleaning`;
      const metaDescription = `Compare Mojo Cleaning’s room-by-room 56-point residential checklist in ${loc.name}: 37-task Recurring Standard, 47-task Deep Clean & 56-task Move-In/Out reset.`;
      const h1 = `56-Point House Cleaning Checklist in ${loc.fullStateName}`;
      const breadcrumbs: BreadcrumbItem[] = [
        { label: loc.name, href: homePath },
        { label: '56-Point Cleaning Checklist', href: checklistPath },
      ];
      pages.push({
        path: checklistPath,
        pageType: 'location_checklist',
        locationId: loc.id,
        title,
        metaDescription,
        canonicalUrl,
        h1,
        robots: 'index, follow',
        publicationStatus: 'published',
        breadcrumbs,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@graph': [
              locOrgSchema,
              siteSchema,
              buildWebPageSchema(canonicalUrl, title, metaDescription),
              buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
            ],
          },
        ],
      });
    }

    // 4f. Location Reviews Page (/{loc}/reviews/)
    {
      const canonicalUrl = `${SITE_ORIGIN}${reviewsPath}`;
      const title = `Client Reviews & 48-Hour Guarantee in ${loc.name} | Mojo Cleaning`;
      const metaDescription = `Read verified client testimonials and see how Mojo Cleaning backs every residential appointment in ${loc.fullStateName} with our 48-Hour Happiness Guarantee.`;
      const h1 = `Client Reviews & 48-Hour Guarantee in ${loc.fullStateName}`;
      const breadcrumbs: BreadcrumbItem[] = [
        { label: loc.name, href: homePath },
        { label: 'Client Reviews', href: reviewsPath },
      ];
      pages.push({
        path: reviewsPath,
        pageType: 'location_reviews',
        locationId: loc.id,
        title,
        metaDescription,
        canonicalUrl,
        h1,
        robots: 'index, follow',
        publicationStatus: 'published',
        breadcrumbs,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@graph': [
              locOrgSchema,
              siteSchema,
              buildWebPageSchema(canonicalUrl, title, metaDescription),
              buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
            ],
          },
        ],
      });
    }

    // 4g. Location FAQs Page (/{loc}/faqs/)
    {
      const canonicalUrl = `${SITE_ORIGIN}${faqsPath}`;
      const title = `House Cleaning FAQs in ${loc.name} | Pricing & Service Guide | Mojo Cleaning`;
      const metaDescription = `Answers to common questions about house cleaning in ${loc.fullStateName} (${loc.zipCodes.join(', ')}): pricing factors, supplies, pet-safe options, and quotes.`;
      const h1 = `House Cleaning Questions Answered in ${loc.fullStateName}`;
      const breadcrumbs: BreadcrumbItem[] = [
        { label: loc.name, href: homePath },
        { label: 'FAQs', href: faqsPath },
      ];
      const combinedFaqs = [...loc.faqs, ...GENERAL_BUSINESS_FAQS];
      const faqSchema = buildFaqSchema(canonicalUrl, combinedFaqs);
      const graph: Record<string, unknown>[] = [
        locOrgSchema,
        siteSchema,
        buildWebPageSchema(canonicalUrl, title, metaDescription),
        buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
      ];
      if (faqSchema) graph.push(faqSchema);

      pages.push({
        path: faqsPath,
        pageType: 'location_faqs',
        locationId: loc.id,
        title,
        metaDescription,
        canonicalUrl,
        h1,
        robots: 'index, follow',
        publicationStatus: 'published',
        breadcrumbs,
        jsonLd: [{ '@context': 'https://schema.org', '@graph': graph }],
      });
    }

    // 4h. Location Contact Page (/{loc}/contact/)
    {
      const canonicalUrl = `${SITE_ORIGIN}${contactPath}`;
      const title = `Contact Mojo Cleaning in ${loc.name} | Call (256) 418-8199`;
      const metaDescription = `Contact Mojo Cleaning for residential cleaning in ${loc.fullStateName} (${loc.zipCodes.join(', ')}). Call or text (256) 418-8199, email our team, or request a quote.`;
      const h1 = `Contact Mojo Cleaning in ${loc.fullStateName}`;
      const breadcrumbs: BreadcrumbItem[] = [
        { label: loc.name, href: homePath },
        { label: 'Contact', href: contactPath },
      ];
      pages.push({
        path: contactPath,
        pageType: 'location_contact',
        locationId: loc.id,
        title,
        metaDescription,
        canonicalUrl,
        h1,
        robots: 'index, follow',
        publicationStatus: 'published',
        breadcrumbs,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@graph': [
              locOrgSchema,
              siteSchema,
              buildWebPageSchema(canonicalUrl, title, metaDescription),
              buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
            ],
          },
        ],
      });
    }

    // 4i. Location Request a Quote Page (/{loc}/request-a-quote/)
    {
      const canonicalUrl = `${SITE_ORIGIN}${quotePath}`;
      const title = `Request a House Cleaning Quote in ${loc.name} | Mojo Cleaning`;
      const metaDescription = `Request your custom residential cleaning quote in ${loc.fullStateName} (${loc.zipCodes.join(', ')}). Insured & bonded team backed by our 48-Hour Happiness Guarantee.`;
      const h1 = `Request a House Cleaning Quote in ${loc.fullStateName}`;
      const breadcrumbs: BreadcrumbItem[] = [
        { label: loc.name, href: homePath },
        { label: 'Request a Quote', href: quotePath },
      ];
      pages.push({
        path: quotePath,
        pageType: 'location_quote',
        locationId: loc.id,
        title,
        metaDescription,
        canonicalUrl,
        h1,
        robots: 'index, follow',
        publicationStatus: 'published',
        breadcrumbs,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@graph': [
              locOrgSchema,
              siteSchema,
              buildWebPageSchema(canonicalUrl, title, metaDescription),
              buildBreadcrumbSchema(canonicalUrl, breadcrumbs),
            ],
          },
        ],
      });
    }
  }

  return pages;
}

export const PUBLISHED_PAGES: PageEntity[] = createAllPages();

export const PUBLISHED_PAGES_BY_PATH: Record<string, PageEntity> = PUBLISHED_PAGES.reduce(
  (acc, page) => {
    acc[page.path] = page;
    return acc;
  },
  {} as Record<string, PageEntity>
);

export const NOT_FOUND_PAGE: PageEntity = {
  path: '/404/',
  pageType: 'not_found',
  locationId: DEFAULT_LOCATION_ID,
  title: 'Page Not Found (404) | Mojo Cleaning',
  metaDescription:
    'The page you requested could not be found. Return to your Mojo Cleaning neighborhood experience or browse our service areas directory.',
  canonicalUrl: `${SITE_ORIGIN}/404/`,
  h1: 'We couldn’t find that room on our checklist.',
  robots: 'noindex, nofollow',
  publicationStatus: 'unpublished',
  breadcrumbs: [
    { label: 'Huntsville, AL', href: '/huntsville-al/' },
    { label: 'Page Not Found (404)', href: '/404/' },
  ],
  jsonLd: [],
};

export function resolvePageByPath(rawPath: string): {
  page: PageEntity;
  isNotFound: boolean;
  redirectTo?: string;
} {
  const normalized = normalizeRoutePath(rawPath);

  if (LEGACY_REDIRECTS[normalized]) {
    const dest = LEGACY_REDIRECTS[normalized];
    const destPage = PUBLISHED_PAGES_BY_PATH[normalizeRoutePath(dest)] ?? PUBLISHED_PAGES_BY_PATH['/'];
    return {
      page: destPage,
      isNotFound: false,
      redirectTo: dest,
    };
  }

  const found = PUBLISHED_PAGES_BY_PATH[normalized];
  if (found && found.publicationStatus === 'published') {
    return {
      page: found,
      isNotFound: false,
    };
  }

  return {
    page: NOT_FOUND_PAGE,
    isNotFound: true,
  };
}

export { PUBLISHED_SERVICE_LOCATIONS_BY_PATH };
