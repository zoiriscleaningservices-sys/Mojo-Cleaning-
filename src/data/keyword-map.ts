/**
 * SECTION 3.D, 5, 13 & 14 — MASTER LOCAL SEO KEYWORD INTELLIGENCE DATABASE & PAGE BLUEPRINTS
 * Maps every indexable route across the 5 isolated location experiences
 * (plus root, /locations/, and legal pages) to a unique primary search intent,
 * non-fabricated keyword intelligence metadata, and complete Section 5 SEO Page Blueprint.
 */

import type { KeywordMapEntry, PageBlueprint } from './entities';
import { LOCATIONS_BY_ID, LOCATIONS_DATA } from './locations-data';
import { PUBLISHED_PAGES } from './page-registry';
import { PUBLISHED_SERVICE_LOCATIONS } from './service-locations-data';
import { SERVICES_BY_ID } from './services-data';
import {
  getLocationAboutPath,
  getLocationChecklistPath,
  getLocationContactPath,
  getLocationFaqsPath,
  getLocationHomePath,
  getLocationQuotePath,
  getLocationReviewsPath,
  getLocationServicesPath,
} from '../utils/location-routing';

function enrichKeywordEntry(raw: KeywordMapEntry): KeywordMapEntry {
  const loc = raw.locationId ? LOCATIONS_BY_ID[raw.locationId] : undefined;
  const svc = raw.serviceId ? SERVICES_BY_ID[raw.serviceId] : undefined;

  const isCoreRevenue =
    raw.pageType === 'location_home' ||
    raw.pageType === 'location_services' ||
    raw.pageType === 'location_service_detail' ||
    raw.pageType === 'location_quote';

  const isHighIntentSupport =
    raw.pageType === 'locations_directory' ||
    raw.pageType === 'location_checklist' ||
    raw.pageType === 'location_contact';

  return {
    ...raw,
    exactQuery: raw.primaryQuery,
    normalizedTopic: svc
      ? `${svc.name} — ${loc ? loc.name : 'North Alabama'}`
      : loc
        ? `${raw.pageType.replace('location_', '').toUpperCase()} — ${loc.name}`
        : raw.primaryQuery,
    primaryIntent: raw.primarySearchIntent,
    relatedService: svc ? svc.name : 'All Verified Residential Cleaning Services',
    relatedLocation: loc
      ? `${loc.fullStateName} (${loc.zipCodes.join(', ')})`
      : 'All 5 Verified North Alabama Service Areas',
    intendedLandingPage: raw.targetUrl,
    searchVolume: null,
    searchVolumeSourceAndDate:
      'Not fabricated — requires authorized Google Search Console or paid keyword tool export (Audit Date: 2026-10-25)',
    competitionEstimate:
      raw.intentCategory === 'service_location' || raw.intentCategory === 'location'
        ? 'High local SERP competition (national franchises + regional independents observed 2026-10-25)'
        : 'Moderate local SERP competition (observed 2026-10-25)',
    commercialRelevance: isCoreRevenue
      ? 'high'
      : isHighIntentSupport
        ? 'medium'
        : 'supporting',
    currentRanking:
      'Baseline established 2026-10-25 (live rank tracking pending Google Search Console authorization)',
    currentImpressions: null,
    currentClicks: null,
    existingPage: true,
    recommendedAction:
      raw.pageType === 'legal' ? 'maintain_compliance' : 'preserve_and_strengthen',
    priority: isCoreRevenue
      ? 'P1_core_revenue'
      : isHighIntentSupport
        ? 'P2_high_intent'
        : 'P3_trust_and_support',
    confidenceLevel: 'high_verified_service_and_area',
  };
}

function buildCompleteKeywordMap(): KeywordMapEntry[] {
  const entries: KeywordMapEntry[] = [
    {
      targetUrl: '/',
      pageType: 'location_home',
      locationId: 'huntsville-al',
      intentCategory: 'brand',
      primarySearchIntent:
        'Discover Mojo Cleaning and enter the Huntsville residential cleaning experience',
      primaryQuery: 'mojo cleaning service',
      secondaryQueries: ['mojo cleaning huntsville', 'mojocleaningservice.com'],
      supportingUrls: ['/huntsville-al/', '/huntsville-al/services/', '/locations/'],
      contentGapAddressed:
        'Flagship brand gateway establishing Mojo Cleaning’s 56-point standard and 48-Hour Happiness Guarantee.',
      demandRationale: 'Serves direct brand and homepage navigational queries.',
    },
    {
      targetUrl: '/locations/',
      pageType: 'locations_directory',
      intentCategory: 'location',
      primarySearchIntent:
        'Select a verified North Alabama service area to enter its dedicated Mojo Cleaning experience',
      primaryQuery: 'mojo cleaning service areas north alabama',
      secondaryQueries: [
        'house cleaning locations huntsville madison al',
        'residential cleaning zip codes 35801 35758 35763 35613',
      ],
      supportingUrls: LOCATIONS_DATA.map((l) => l.urlPath),
      contentGapAddressed:
        'Global visual location directory connecting visitors to Huntsville, Madison, Hampton Cove, Owens Cross Roads, and Athens.',
      demandRationale:
        'Allows homeowners to verify coverage and select their isolated community experience.',
    },
    {
      targetUrl: '/privacy-policy/',
      pageType: 'legal',
      intentCategory: 'informational_faq',
      primarySearchIntent: 'Review Mojo Cleaning LLC privacy policy and SMS terms',
      primaryQuery: 'mojo cleaning privacy policy',
      secondaryQueries: ['mojo cleaning sms terms'],
      supportingUrls: ['/huntsville-al/'],
      contentGapAddressed: 'Published privacy and SMS consent disclosures.',
      demandRationale: 'Compliance and customer transparency.',
    },
    {
      targetUrl: '/terms/',
      pageType: 'legal',
      intentCategory: 'informational_faq',
      primarySearchIntent: 'Review Mojo Cleaning LLC service terms and conditions',
      primaryQuery: 'mojo cleaning terms and conditions',
      secondaryQueries: ['mojo cleaning guarantee policy terms'],
      supportingUrls: ['/huntsville-al/'],
      contentGapAddressed: 'Published residential service terms and 48-Hour Guarantee policy.',
      demandRationale: 'Compliance and customer transparency.',
    },
  ];

  for (const loc of LOCATIONS_DATA) {
    const homePath = getLocationHomePath(loc.id);
    const aboutPath = getLocationAboutPath(loc.id);
    const servicesPath = getLocationServicesPath(loc.id);
    const checklistPath = getLocationChecklistPath(loc.id);
    const reviewsPath = getLocationReviewsPath(loc.id);
    const faqsPath = getLocationFaqsPath(loc.id);
    const contactPath = getLocationContactPath(loc.id);
    const quotePath = getLocationQuotePath(loc.id);

    entries.push(
      {
        targetUrl: homePath,
        pageType: 'location_home',
        locationId: loc.id,
        intentCategory: 'location',
        primarySearchIntent: loc.seo.primaryIntent,
        primaryQuery: loc.seo.primaryQuery,
        secondaryQueries: loc.seo.secondaryQueries,
        supportingUrls: [servicesPath, checklistPath, aboutPath, quotePath],
        contentGapAddressed: `Dedicated ${loc.name} homepage with local neighborhood coverage, services, checklist, reviews, FAQs, and quote form.`,
        demandRationale: `Primary local landing page for homeowners searching for house cleaning in ${loc.fullStateName}.`,
      },
      {
        targetUrl: aboutPath,
        pageType: 'location_about',
        locationId: loc.id,
        intentCategory: 'comparison_trust',
        primarySearchIntent: `Learn about Mojo Cleaning’s insured house cleaners and standards in ${loc.name}`,
        primaryQuery: `insured cleaning company ${loc.city.toLowerCase()} al`,
        secondaryQueries: [
          `bonded cleaning company ${loc.city.toLowerCase()} al`,
          `reliable house cleaning service ${loc.city.toLowerCase()} al`,
          `professional residential cleaners ${loc.city.toLowerCase()} al`,
        ],
        supportingUrls: [homePath, reviewsPath, quotePath],
        contentGapAddressed: `Explains Mojo Cleaning’s philosophy, 56-point standard, and service-area operation in ${loc.name}.`,
        demandRationale: `Addresses local trust and vetting questions for ${loc.city} homeowners.`,
      },
      {
        targetUrl: servicesPath,
        pageType: 'location_services',
        locationId: loc.id,
        intentCategory: 'general_service',
        primarySearchIntent: `Compare all residential cleaning services available in ${loc.name}`,
        primaryQuery: `cleaning services ${loc.city.toLowerCase()} al`,
        secondaryQueries: [
          `residential cleaning ${loc.city.toLowerCase()} al`,
          `home cleaning service ${loc.city.toLowerCase()} al`,
          `house cleaning services near me`,
          `cleaning services near me`,
        ],
        supportingUrls: [homePath, checklistPath, quotePath],
        contentGapAddressed: `Complete catalog of verified cleaning services offered in ${loc.name}.`,
        demandRationale: `Helps ${loc.city} homeowners compare recurring, deep, move-in/out, and post-construction cleans.`,
      },
      {
        targetUrl: checklistPath,
        pageType: 'location_checklist',
        locationId: loc.id,
        intentCategory: 'informational_faq',
        primarySearchIntent: `Inspect the 56-point room-by-room house cleaning checklist for ${loc.name}`,
        primaryQuery: `house cleaning checklist ${loc.city.toLowerCase()} al`,
        secondaryQueries: [
          `56 point cleaning checklist ${loc.city.toLowerCase()}`,
          `what is included in deep cleaning ${loc.city.toLowerCase()} al`,
        ],
        supportingUrls: [servicesPath, quotePath],
        contentGapAddressed: `Interactive 37-task Standard, 47-task Deep, and 56-task Move-In/Out checklist for ${loc.name}.`,
        demandRationale: `Answers detailed scope questions before booking in ${loc.name}.`,
      },
      {
        targetUrl: reviewsPath,
        pageType: 'location_reviews',
        locationId: loc.id,
        intentCategory: 'comparison_trust',
        primarySearchIntent: `Read verified client reviews and 48-hour guarantee details for ${loc.name}`,
        primaryQuery: `mojo cleaning reviews ${loc.city.toLowerCase()} al`,
        secondaryQueries: [
          `reliable house cleaning service ${loc.city.toLowerCase()} al`,
          `professional residential cleaners ${loc.city.toLowerCase()} al`,
        ],
        supportingUrls: [homePath, aboutPath, quotePath],
        contentGapAddressed: `Authentic verified testimonials and transparent 48-Hour Happiness Guarantee for ${loc.name}.`,
        demandRationale: `Validates social proof and service guarantee in ${loc.name}.`,
      },
      {
        targetUrl: faqsPath,
        pageType: 'location_faqs',
        locationId: loc.id,
        intentCategory: 'informational_faq',
        primarySearchIntent: `Find answers to house cleaning FAQs and pricing factors in ${loc.name}`,
        primaryQuery: `house cleaning cost ${loc.city.toLowerCase()} al`,
        secondaryQueries: [
          `house cleaning prices ${loc.city.toLowerCase()} al`,
          `deep cleaning cost ${loc.city.toLowerCase()} al`,
          `move-out cleaning cost ${loc.city.toLowerCase()} al`,
        ],
        supportingUrls: [servicesPath, checklistPath, contactPath],
        contentGapAddressed: `Location-specific and general residential cleaning FAQs for ${loc.name}.`,
        demandRationale: `Resolves pre-booking questions about pricing factors, supplies, pets, access, and scheduling in ${loc.name}.`,
      },
      {
        targetUrl: contactPath,
        pageType: 'location_contact',
        locationId: loc.id,
        intentCategory: 'cost_quote',
        primarySearchIntent: `Contact Mojo Cleaning for residential service in ${loc.name}`,
        primaryQuery: `contact mojo cleaning ${loc.city.toLowerCase()} al`,
        secondaryQueries: [`mojo cleaning phone number ${loc.city.toLowerCase()}`],
        supportingUrls: [homePath, quotePath],
        contentGapAddressed: `Direct phone, SMS, email, office hours, and ZIP coverage for ${loc.name}.`,
        demandRationale: `Direct contact destination for ${loc.city} residents.`,
      },
      {
        targetUrl: quotePath,
        pageType: 'location_quote',
        locationId: loc.id,
        intentCategory: 'cost_quote',
        primarySearchIntent: `Request a custom house cleaning quote in ${loc.name}`,
        primaryQuery: `residential cleaning quote ${loc.city.toLowerCase()} al`,
        secondaryQueries: [
          `house cleaning estimate ${loc.city.toLowerCase()} al`,
          `house cleaning cost ${loc.city.toLowerCase()} al`,
          `house cleaning prices ${loc.city.toLowerCase()} al`,
        ],
        supportingUrls: [servicesPath, checklistPath],
        contentGapAddressed: `Dedicated quote request page with ${loc.name} preselected.`,
        demandRationale: `High-conversion bottom-of-funnel quote request page for ${loc.name}.`,
      }
    );
  }

  for (const sl of PUBLISHED_SERVICE_LOCATIONS) {
    const service = SERVICES_BY_ID[sl.serviceId];
    entries.push({
      targetUrl: sl.urlPath,
      pageType: 'location_service_detail',
      locationId: sl.locationId,
      serviceId: sl.serviceId,
      intentCategory: 'service_location',
      primarySearchIntent: sl.seo.primaryIntent,
      primaryQuery: sl.seo.primaryQuery,
      secondaryQueries: sl.seo.secondaryQueries,
      supportingUrls: [
        getLocationHomePath(sl.locationId),
        getLocationServicesPath(sl.locationId),
        getLocationChecklistPath(sl.locationId),
        getLocationQuotePath(sl.locationId, sl.serviceId),
      ],
      contentGapAddressed: `Dedicated ${service.name} page for ${sl.locationId} with room-by-room scope, local customer guidance, FAQs, and preselected quote form.`,
      demandRationale: `Targets high-intent local searches for ${service.shortName} in ${sl.locationId}.`,
    });
  }

  return entries.map(enrichKeywordEntry);
}

export const KEYWORD_MAP: KeywordMapEntry[] = buildCompleteKeywordMap();

export function buildAllPageBlueprints(): PageBlueprint[] {
  const kwByUrl = new Map(KEYWORD_MAP.map((k) => [k.targetUrl, k]));

  return PUBLISHED_PAGES.map((page) => {
    const kw = kwByUrl.get(page.path);
    const loc = page.locationId ? LOCATIONS_BY_ID[page.locationId] : undefined;
    const svc = page.serviceId ? SERVICES_BY_ID[page.serviceId] : undefined;
    const activeLocSlug = loc?.slug || 'huntsville-al';
    const quoteHref = `/${activeLocSlug}/request-a-quote/${svc ? `?service=${svc.slug}` : ''}`;

    const schemaTypes =
      page.jsonLd && page.jsonLd[0] && Array.isArray((page.jsonLd[0] as { '@graph'?: unknown[] })['@graph'])
        ? ((page.jsonLd[0] as { '@graph': { '@type': string | string[] }[] })['@graph'] || []).flatMap(
            (n) => (Array.isArray(n['@type']) ? n['@type'] : [n['@type']])
          )
        : ['LocalBusiness', 'WebSite', 'WebPage', 'BreadcrumbList'];

    return {
      url: page.path,
      pageType: page.pageType,
      primaryTargetTopic: kw?.normalizedTopic || page.title,
      secondaryTopics: kw?.secondaryQueries || [],
      targetIntent: kw?.primarySearchIntent || 'Local residential cleaning discovery and quote conversion',
      targetAudience: loc
        ? `Homeowners, renters, landlords, real estate agents, and builders in ${loc.fullStateName} (${loc.zipCodes.join(', ')})`
        : 'North Alabama homeowners, renters, property managers, and builders',
      coreQuestionAnswered: svc && loc
        ? `What is included in ${svc.name} in ${loc.name}, which ${loc.city} neighborhoods are covered, and how do I request a custom quote?`
        : loc
          ? `What residential cleaning services does Mojo Cleaning offer in ${loc.name} and what standards protect my home?`
          : 'Which North Alabama communities does Mojo Cleaning serve and how are services structured?',
      uniqueValueProposition:
        'Locally operated residential cleaning with a published 56-point room-by-room checklist, background-checked and insured specialists, eco-friendly options on request, and a 48-Hour Happiness Guarantee.',
      requiredSections:
        page.pageType === 'location_service_detail'
          ? [
              '1. Location + Service Hero with Trust Strip & Preselected Quote CTA',
              '2. Answer-First Direct Summary Block',
              '3. Why Local Homeowners Choose Mojo & Ideal Household Scenarios',
              '4. Local Customer Guidance & Neighborhoods Served',
              '5. Verified Room-by-Room Checklist Scope',
              '6. Included Highlights, Exclusions/Boundaries & Preparation Tips',
              '7. 3-Step Booking Process & Related Services in Same Location',
              '8. Location-Specific Service FAQs & Preselected Quote Form',
            ]
          : [
              '1. Clear Primary H1 & Local Value Proposition Above the Fold',
              '2. Verified Service / Checklist / Trust Proof Blocks',
              '3. Strict Location-Isolated Internal Navigation Links',
              '4. Conversion-Ready Quote Form & Click-to-Call Phone Action',
            ],
      internalLinksOut: kw?.supportingUrls || [`/${activeLocSlug}/`, '/locations/'],
      internalLinksInFrom:
        page.path === '/'
          ? ['/locations/']
          : page.path === '/locations/'
            ? LOCATIONS_DATA.map((l) => l.urlPath)
            : [`/${activeLocSlug}/`, `/${activeLocSlug}/services/`],
      conversionGoal: `Submit a verified residential cleaning quote request (${quoteHref}) or call (256) 418-8199`,
      primaryCta: `Request Quote (${quoteHref})`,
      secondaryCta: 'Call (256) 418-8199 (tel:+12564188199)',
      titleTagFormula: page.title,
      metaDescriptionFormula: page.metaDescription,
      h1Formula: page.h1,
      schemaTypes,
      contentQualityRequirements: [
        '100% unique title, meta description, canonical URL, and H1',
        'Zero cross-location link leaks outside active location context',
        'Zero fabricated ratings, review counts, or unverified claims',
        'Logical H1 -> H2 -> H3 heading hierarchy with >= 220 words of substantive copy',
      ],
      publicationStatus: page.publicationStatus,
    };
  });
}

export const PAGE_BLUEPRINTS: PageBlueprint[] = buildAllPageBlueprints();

// ============================================================================
// SECTION 1 & 2 — VERIFIED KEYWORD DATABASE (ALL 8 GROUPS × 5 LOCATIONS = 220 RECORDS)
// Organized by service, location, and search intent with non-fabricated metrics.
// ============================================================================

export interface VerifiedKeywordRecord {
  keyword: string;
  location: string;
  searchIntent: 'Commercial' | 'Transactional / Quote' | 'Local / Near-Me' | 'Informational / Trust';
  serviceCategory:
    | 'Core Cleaning'
    | 'Near-Me'
    | 'Recurring Cleaning'
    | 'Deep Cleaning'
    | 'Move-In / Move-Out Cleaning'
    | 'Post-Construction Cleaning'
    | 'Pricing & Estimate'
    | 'Brand & Trust';
  estimatedMonthlySearches: string;
  dataSource: string;
  dateCollected: string;
  currentRanking: string;
  currentImpressions: number | null;
  currentClicks: number | null;
  relevantPage: string;
  priority: 'P1 - Core Commercial' | 'P2 - High-Intent Service/Quote' | 'P3 - Trust & Informational';
  confidenceLevel:
    | 'High (Verified Service & Approved Location)'
    | 'Pending Owner Verification (Family-Owned Positioning)';
}

function buildVerifiedKeywordDatabase(): VerifiedKeywordRecord[] {
  const records: VerifiedKeywordRecord[] = [];
  const dateCollected = '2026-10-25';
  const defaultSource =
    'Observed Google SERP Intent & Competitor Analysis (2026-10-25); Google Keyword Planner / GSC integration ready';
  const defaultSearchEst =
    'Estimate Pending Authorized Google Keyword Planner / GSC Export (Never Fabricated)';
  const defaultRanking =
    'Baseline Audit 2026-10-25 (Live GSC Rank Tracking Pending Account Connection)';

  for (const loc of LOCATIONS_DATA) {
    const city = loc.city;
    const slug = loc.slug;
    const locLabel = loc.fullStateName;

    // 1. Core cleaning keywords (7 per city)
    const coreKeywords = [
      `house cleaning ${city} AL`,
      `house cleaning service ${city} AL`,
      `cleaning services ${city} AL`,
      `residential cleaning ${city} AL`,
      `home cleaning service ${city} AL`,
      `house cleaners ${city} AL`,
      `professional house cleaning ${city} AL`,
    ];
    for (const kw of coreKeywords) {
      records.push({
        keyword: kw,
        location: locLabel,
        searchIntent: 'Commercial',
        serviceCategory: 'Core Cleaning',
        estimatedMonthlySearches: defaultSearchEst,
        dataSource: defaultSource,
        dateCollected,
        currentRanking: defaultRanking,
        currentImpressions: null,
        currentClicks: null,
        relevantPage:
          kw.toLowerCase().startsWith('cleaning services')
            ? `/${slug}/services/`
            : `/${slug}/`,
        priority: 'P1 - Core Commercial',
        confidenceLevel: 'High (Verified Service & Approved Location)',
      });
    }

    // 2. Near-me keywords (5 per city — used naturally in content; no separate near-me pages)
    const nearMeKeywords = [
      'house cleaning near me',
      'house cleaners near me',
      'cleaning services near me',
      'house cleaning services near me',
      'residential cleaning near me',
    ];
    for (const kw of nearMeKeywords) {
      records.push({
        keyword: kw,
        location: locLabel,
        searchIntent: 'Local / Near-Me',
        serviceCategory: 'Near-Me',
        estimatedMonthlySearches: defaultSearchEst,
        dataSource: defaultSource,
        dateCollected,
        currentRanking: defaultRanking,
        currentImpressions: null,
        currentClicks: null,
        relevantPage: kw.includes('services') ? `/${slug}/services/` : `/${slug}/`,
        priority: 'P1 - Core Commercial',
        confidenceLevel: 'High (Verified Service & Approved Location)',
      });
    }

    // 3. Recurring cleaning keywords (5 per city — weekly, biweekly, monthly all verified)
    const recurringKeywords = [
      `recurring house cleaning ${city} AL`,
      `weekly house cleaning ${city} AL`,
      `biweekly house cleaning ${city} AL`,
      `monthly house cleaning ${city} AL`,
      `regular house cleaning service ${city} AL`,
    ];
    for (const kw of recurringKeywords) {
      records.push({
        keyword: kw,
        location: locLabel,
        searchIntent: 'Commercial',
        serviceCategory: 'Recurring Cleaning',
        estimatedMonthlySearches: defaultSearchEst,
        dataSource: defaultSource,
        dateCollected,
        currentRanking: defaultRanking,
        currentImpressions: null,
        currentClicks: null,
        relevantPage: `/${slug}/services/recurring-residential-cleaning/`,
        priority: 'P1 - Core Commercial',
        confidenceLevel: 'High (Verified Service & Approved Location)',
      });
    }

    // 4. Deep-cleaning keywords (5 per city)
    const deepKeywords = [
      `deep cleaning ${city} AL`,
      `deep house cleaning ${city} AL`,
      `deep cleaning service ${city} AL`,
      `one-time deep cleaning ${city} AL`,
      `detailed house cleaning ${city} AL`,
    ];
    for (const kw of deepKeywords) {
      records.push({
        keyword: kw,
        location: locLabel,
        searchIntent: 'Commercial',
        serviceCategory: 'Deep Cleaning',
        estimatedMonthlySearches: defaultSearchEst,
        dataSource: defaultSource,
        dateCollected,
        currentRanking: defaultRanking,
        currentImpressions: null,
        currentClicks: null,
        relevantPage: `/${slug}/services/deep-house-cleaning/`,
        priority: 'P1 - Core Commercial',
        confidenceLevel: 'High (Verified Service & Approved Location)',
      });
    }

    // 5. Move-in and move-out keywords (6 per city)
    const moveInKeywords = [
      `move-in cleaning ${city} AL`,
      `move-in house cleaning ${city} AL`,
    ];
    for (const kw of moveInKeywords) {
      records.push({
        keyword: kw,
        location: locLabel,
        searchIntent: 'Commercial',
        serviceCategory: 'Move-In / Move-Out Cleaning',
        estimatedMonthlySearches: defaultSearchEst,
        dataSource: defaultSource,
        dateCollected,
        currentRanking: defaultRanking,
        currentImpressions: null,
        currentClicks: null,
        relevantPage: `/${slug}/services/move-in-cleaning/`,
        priority: 'P1 - Core Commercial',
        confidenceLevel: 'High (Verified Service & Approved Location)',
      });
    }

    const moveOutKeywords = [
      `move-out cleaning ${city} AL`,
      `move-out cleaning service ${city} AL`,
      `move-out house cleaning ${city} AL`,
      `rental turnover cleaning ${city} AL`,
    ];
    for (const kw of moveOutKeywords) {
      records.push({
        keyword: kw,
        location: locLabel,
        searchIntent: 'Commercial',
        serviceCategory: 'Move-In / Move-Out Cleaning',
        estimatedMonthlySearches: defaultSearchEst,
        dataSource: defaultSource,
        dateCollected,
        currentRanking: defaultRanking,
        currentImpressions: null,
        currentClicks: null,
        relevantPage: `/${slug}/services/move-out-cleaning/`,
        priority: 'P1 - Core Commercial',
        confidenceLevel: 'High (Verified Service & Approved Location)',
      });
    }

    // 6. Post-construction keywords (4 per city)
    const postConstructionKeywords = [
      `post-construction cleaning ${city} AL`,
      `post-construction cleaning service ${city} AL`,
      `renovation cleaning ${city} AL`,
      `after-construction cleaning ${city} AL`,
    ];
    for (const kw of postConstructionKeywords) {
      records.push({
        keyword: kw,
        location: locLabel,
        searchIntent: 'Commercial',
        serviceCategory: 'Post-Construction Cleaning',
        estimatedMonthlySearches: defaultSearchEst,
        dataSource: defaultSource,
        dateCollected,
        currentRanking: defaultRanking,
        currentImpressions: null,
        currentClicks: null,
        relevantPage: `/${slug}/services/post-construction-cleaning/`,
        priority: 'P1 - Core Commercial',
        confidenceLevel: 'High (Verified Service & Approved Location)',
      });
    }

    // 7. Pricing and estimate keywords (6 per city)
    const pricingKeywords: { kw: string; target: string }[] = [
      { kw: `house cleaning cost ${city} AL`, target: `/${slug}/faqs/` },
      { kw: `house cleaning prices ${city} AL`, target: `/${slug}/faqs/` },
      { kw: `deep cleaning cost ${city} AL`, target: `/${slug}/services/deep-house-cleaning/` },
      { kw: `move-out cleaning cost ${city} AL`, target: `/${slug}/services/move-out-cleaning/` },
      { kw: `residential cleaning quote ${city} AL`, target: `/${slug}/request-a-quote/` },
      { kw: `house cleaning estimate ${city} AL`, target: `/${slug}/request-a-quote/` },
    ];
    for (const item of pricingKeywords) {
      records.push({
        keyword: item.kw,
        location: locLabel,
        searchIntent: 'Transactional / Quote',
        serviceCategory: 'Pricing & Estimate',
        estimatedMonthlySearches: defaultSearchEst,
        dataSource: defaultSource,
        dateCollected,
        currentRanking: defaultRanking,
        currentImpressions: null,
        currentClicks: null,
        relevantPage: item.target,
        priority: 'P2 - High-Intent Service/Quote',
        confidenceLevel: 'High (Verified Service & Approved Location)',
      });
    }

    // 8. Brand and trust keywords (6 per city)
    const trustKeywords: {
      kw: string;
      target: string;
      confidence: VerifiedKeywordRecord['confidenceLevel'];
    }[] = [
      {
        kw: `family-owned cleaning company ${city} AL`,
        target: `/${slug}/about/`,
        confidence: 'Pending Owner Verification (Family-Owned Positioning)',
      },
      {
        kw: `family-owned house cleaning ${city} AL`,
        target: `/${slug}/about/`,
        confidence: 'Pending Owner Verification (Family-Owned Positioning)',
      },
      {
        kw: `insured cleaning company ${city} AL`,
        target: `/${slug}/about/`,
        confidence: 'High (Verified Service & Approved Location)',
      },
      {
        kw: `bonded cleaning company ${city} AL`,
        target: `/${slug}/about/`,
        confidence: 'High (Verified Service & Approved Location)',
      },
      {
        kw: `reliable house cleaning service ${city} AL`,
        target: `/${slug}/reviews/`,
        confidence: 'High (Verified Service & Approved Location)',
      },
      {
        kw: `professional residential cleaners ${city} AL`,
        target: `/${slug}/about/`,
        confidence: 'High (Verified Service & Approved Location)',
      },
    ];
    for (const item of trustKeywords) {
      records.push({
        keyword: item.kw,
        location: locLabel,
        searchIntent: 'Informational / Trust',
        serviceCategory: 'Brand & Trust',
        estimatedMonthlySearches: defaultSearchEst,
        dataSource: defaultSource,
        dateCollected,
        currentRanking: defaultRanking,
        currentImpressions: null,
        currentClicks: null,
        relevantPage: item.target,
        priority: 'P3 - Trust & Informational',
        confidenceLevel: item.confidence,
      });
    }
  }

  return records;
}

export const VERIFIED_KEYWORD_DATABASE: VerifiedKeywordRecord[] = buildVerifiedKeywordDatabase();

// ============================================================================
// SECTION 12 — CLICK-THROUGH RATE (CTR) DIAGNOSTIC & IMPROVEMENT SYSTEM
// ============================================================================

export interface CtrWorkflowStep {
  stepNumber: number;
  title: string;
  diagnosticAction: string;
  implementationRule: string;
}

export const CTR_OPTIMIZATION_SYSTEM: CtrWorkflowStep[] = [
  {
    stepNumber: 1,
    title: 'Inspect Exact Queries Generating Impressions',
    diagnosticAction:
      'In Google Search Console -> Performance -> Search Results, filter by the specific page URL and sort queries by Impressions descending where CTR is below site benchmark (< 3.5% for non-brand local queries).',
    implementationRule:
      'Identify whether impressions come from general house cleaning queries, specific service queries (deep, recurring, move-in/out, post-construction), or pricing/FAQ queries.',
  },
  {
    stepNumber: 2,
    title: 'Compare Title & Meta Description to Competing SERP Results',
    diagnosticAction:
      'Inspect live Google SERP results for the primary query in the target Alabama city (Huntsville, Madison, Hampton Cove, Owens Cross Roads, or Athens).',
    implementationRule:
      'Differentiate from generic directories (Angi, Yelp, Thumbtack) by highlighting verified Mojo Cleaning facts: 56-point checklist, 48-Hour Happiness Guarantee, and insured local teams.',
  },
  {
    stepNumber: 3,
    title: 'Confirm the Page Matches the Searcher’s Intent',
    diagnosticAction:
      'Verify that the ranking URL is the right destination for the query (e.g., deep-cleaning queries map to /{loc}/services/deep-house-cleaning/, not the general homepage).',
    implementationRule:
      'If a page is receiving impressions for a different service intent, strengthen internal anchor links pointing to the dedicated service page.',
  },
  {
    stepNumber: 4,
    title: 'Rewrite the Title for Clarity and Relevance',
    diagnosticAction:
      'Ensure the primary service and verified city appear clearly at the start of the <title> tag within 45–65 characters.',
    implementationRule:
      'Follow the verified pattern: "[Service] in [City], AL | Mojo Cleaning" without keyword stuffing or listing multiple cities.',
  },
  {
    stepNumber: 5,
    title: 'Rewrite the Meta Description to Highlight Real Customer Benefits',
    diagnosticAction:
      'Craft a 135–165 character meta description that summarizes the page’s exact scope and includes a clear quote invitation.',
    implementationRule:
      'Never use fake urgency, unverified discounts, or exaggerated superiority claims.',
  },
  {
    stepNumber: 6,
    title: 'Improve the Visible H1 and Opening Section',
    diagnosticAction:
      'Ensure the visible <h1> and above-the-fold hero copy immediately confirm the searcher landed on the exact service and Alabama city they clicked for.',
    implementationRule:
      'Include a prominent Request a Quote button and secondary click-to-call action above the fold so clicks convert into engaged visits.',
  },
  {
    stepNumber: 7,
    title: 'Re-Test Performance Over a Defined 28-Day Measurement Period',
    diagnosticAction:
      'Record the date of the title/description update and compare 28-day post-change Impressions, Clicks, CTR, and Average Position against the prior 28-day baseline in Google Search Console.',
    implementationRule:
      'Retain snippet improvements that lift CTR and qualified quote submissions; iterate further if impressions grow without proportional click growth.',
  },
];
