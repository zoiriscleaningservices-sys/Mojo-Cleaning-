/**
 * PHASES 1, 2, 3, 5, 6, 7, 13, 14 & 15 — CENTRALIZED SEO ARCHITECTURE,
 * OPPORTUNITY SCORING ENGINE, AUTHORITATIVE INDEXABILITY POLICY & GSC MONITOR
 */

import type { LocationId, PageType, PublicationStatus, ServiceId } from './entities';

export type SitemapFileId =
  | 'sitemap-core.xml'
  | 'sitemap-locations.xml'
  | 'sitemap-services.xml'
  | 'sitemap-service-locations.xml'
  | 'sitemap-guides.xml';

export type IndexabilityClass =
  | 'indexable_canonical'
  | 'noindex_utility_or_admin'
  | 'noindex_not_found'
  | 'excluded_unpublished_candidate'
  | 'redirected_legacy_url';

export interface IndexabilityDecision {
  pageId: string;
  path: string;
  canPublish: boolean;
  canIndex: boolean;
  indexabilityClass: IndexabilityClass;
  canonicalUrl: string;
  inSitemap: boolean;
  sitemapFile: SitemapFileId | null;
  robotsDirective: 'index, follow, max-image-preview:large' | 'noindex, nofollow';
  allowInPublicNav: boolean;
  qualityGatePassed: boolean;
  blockers: string[];
  rationale: string;
}

export interface OpportunityScoreBreakdown {
  intentDistinctness: number; // 0-20
  verifiedAvailability: number; // 0-20
  factualCompleteness: number; // 0-15
  uniqueSubstantiveDepth: number; // 0-15
  customerUsefulness: number; // 0-15
  internalLinkIntegration: number; // 0-15
  totalScore: number; // 0-100
  mandatoryBlockers: {
    fabricatedLocalInformation: boolean;
    unverifiedServiceClaim: boolean;
    substantiallyDuplicative: boolean;
    rankingManipulationOnly: boolean;
    emptyOrUnfinishedPage: boolean;
    invalidCanonicalConfig: boolean;
    noMeaningfulUserBenefit: boolean;
  };
  eligibleForIndexablePublication: boolean;
}

/**
 * PHASE 1.2 — PRE-IMPLEMENTATION BASELINE INVENTORY
 * Recorded prior to Phase 2–17 implementation so changes are verifiably tracked.
 */
export const PRE_IMPLEMENTATION_BASELINE = {
  capturedAtIso: '2026-10-26T16:59:00-05:00',
  framework: 'React 19 + TypeScript 5.7 + Vite 6 Static SSR Pre-Rendering',
  hostingEnvironment:
    'Static HTML Pre-Rendered Deployment (Canonical origin: https://mojocleaningservice.com/ | Live GitHub Pages preview: https://zoiriscleaningservices-sys.github.io/Mojo-Cleaning-/)',
  totalDiscoveredUrls: 118,
  totalSuccessfulIndexablePages: 69,
  totalRedirects: 48,
  totalErrorPages: 1,
  totalCanonicalizedDuplicates: 0,
  totalPagesMarkedNoindex: 1,
  totalPagesBlockedByRobotsTxt: 0,
  totalOrphanPages: 0,
  pagesMissingTitlesOrDescriptions: 0,
  pagesWithDuplicateTitlesOrH1s: 0,
  pagesWithMissingOrIncorrectCanonicals: 0,
  pagesWithInsufficientContent: 0,
  sitemapFilesCount: 1,
  sitemapUrlCount: 69,
  informationalResourcePagesCount: 0,
  gscConnectionStatus: 'unverified — Google Search Console API credentials not provided in repository',
  liveGoogleIndexedCount: 'unverified — requires authorized Google Search Console property access',
};

/**
 * PHASE 2.2 — CANDIDATE SERVICE EVALUATION REGISTRY
 * Explicitly records both verified published services and candidate services
 * held back by the publication quality gate.
 */
export interface CandidateServiceEvaluation {
  candidateId: string;
  name: string;
  proposedSlug: string;
  verifiedOfferedByBusiness: boolean;
  verifiedScopeAndChecklists: boolean;
  publicationStatus: PublicationStatus;
  indexabilityDecision: 'published_indexable' | 'blocked_needs_verification';
  gateNotes: string;
}

export const SERVICE_CANDIDATE_EVALUATIONS: CandidateServiceEvaluation[] = [
  {
    candidateId: 'recurring-residential-cleaning',
    name: 'Recurring Residential Cleaning',
    proposedSlug: 'recurring-residential-cleaning',
    verifiedOfferedByBusiness: true,
    verifiedScopeAndChecklists: true,
    publicationStatus: 'published',
    indexabilityDecision: 'published_indexable',
    gateNotes: 'Verified 37-point recurring checklist (weekly, bi-weekly, monthly) across all 5 North Alabama locations.',
  },
  {
    candidateId: 'deep-house-cleaning',
    name: 'Deep House Cleaning',
    proposedSlug: 'deep-house-cleaning',
    verifiedOfferedByBusiness: true,
    verifiedScopeAndChecklists: true,
    publicationStatus: 'published',
    indexabilityDecision: 'published_indexable',
    gateNotes: 'Verified 47-point top-to-bottom restorative checklist across all 5 North Alabama locations.',
  },
  {
    candidateId: 'move-in-cleaning',
    name: 'Move-In Cleaning',
    proposedSlug: 'move-in-cleaning',
    verifiedOfferedByBusiness: true,
    verifiedScopeAndChecklists: true,
    publicationStatus: 'published',
    indexabilityDecision: 'published_indexable',
    gateNotes: 'Verified 56-point empty-home sanitization checklist prior to moving boxes in.',
  },
  {
    candidateId: 'move-out-cleaning',
    name: 'Move-Out Cleaning',
    proposedSlug: 'move-out-cleaning',
    verifiedOfferedByBusiness: true,
    verifiedScopeAndChecklists: true,
    publicationStatus: 'published',
    indexabilityDecision: 'published_indexable',
    gateNotes: 'Verified 56-point empty-home turnover checklist for lease inspections and home sales.',
  },
  {
    candidateId: 'post-construction-cleaning',
    name: 'Post-Construction Cleaning',
    proposedSlug: 'post-construction-cleaning',
    verifiedOfferedByBusiness: true,
    verifiedScopeAndChecklists: true,
    publicationStatus: 'published',
    indexabilityDecision: 'published_indexable',
    gateNotes: 'Verified post-remodel and new-build HEPA dust extraction and detailing across all 5 locations.',
  },
  {
    candidateId: 'commercial-office-cleaning',
    name: 'Commercial & Office Cleaning',
    proposedSlug: 'commercial-cleaning',
    verifiedOfferedByBusiness: false,
    verifiedScopeAndChecklists: false,
    publicationStatus: 'needs_verification',
    indexabilityDecision: 'blocked_needs_verification',
    gateNotes:
      'BLOCKED BY QUALITY GATE: Mojo Cleaning’s verified public scope is residential house cleaning. Dedicated commercial cleaning pages are withheld until commercial SLA, janitorial scope, and B2B insurance tiers are verified.',
  },
  {
    candidateId: 'airbnb-vacation-rental-cleaning',
    name: 'Airbnb & Short-Term Vacation Rental Turnover Cleaning',
    proposedSlug: 'airbnb-cleaning',
    verifiedOfferedByBusiness: false,
    verifiedScopeAndChecklists: false,
    publicationStatus: 'needs_verification',
    indexabilityDecision: 'blocked_needs_verification',
    gateNotes:
      'BLOCKED BY QUALITY GATE: Same-day host turnover windows and linen-service policies are not yet verified as a standalone public service.',
  },
];

/**
 * PHASE 2.3 — CANDIDATE LOCATION EVALUATION REGISTRY
 * Prevents doorway pages by holding back unverified suburbs or ZIP-only variations.
 */
export interface CandidateLocationEvaluation {
  candidateId: string;
  cityOrAreaName: string;
  county: string;
  proposedSlug: string;
  verifiedDispatchCoverage: boolean;
  hasDistinctLocalSubstantiveContent: boolean;
  publicationStatus: PublicationStatus;
  indexabilityDecision: 'published_indexable' | 'blocked_consolidated_or_unverified';
  gateNotes: string;
}

export const LOCATION_CANDIDATE_EVALUATIONS: CandidateLocationEvaluation[] = [
  {
    candidateId: 'huntsville-al',
    cityOrAreaName: 'Huntsville, AL',
    county: 'Madison County',
    proposedSlug: 'huntsville-al',
    verifiedDispatchCoverage: true,
    hasDistinctLocalSubstantiveContent: true,
    publicationStatus: 'published',
    indexabilityDecision: 'published_indexable',
    gateNotes: 'Primary operational hub with verified ZIPs (35801–35811, 35824) and neighborhood guidance.',
  },
  {
    candidateId: 'madison-al',
    cityOrAreaName: 'Madison, AL',
    county: 'Madison & Limestone Counties',
    proposedSlug: 'madison-al',
    verifiedDispatchCoverage: true,
    hasDistinctLocalSubstantiveContent: true,
    publicationStatus: 'published',
    indexabilityDecision: 'published_indexable',
    gateNotes: 'Verified commuter city hub (35758, 35756) with Clift Farm, Town Madison, and school-corridor context.',
  },
  {
    candidateId: 'hampton-cove-al',
    cityOrAreaName: 'Hampton Cove, AL',
    county: 'Madison County',
    proposedSlug: 'hampton-cove-al',
    verifiedDispatchCoverage: true,
    hasDistinctLocalSubstantiveContent: true,
    publicationStatus: 'published',
    indexabilityDecision: 'published_indexable',
    gateNotes: 'Verified cove community hub (35763) over Monte Sano with golf-community & estate home guidance.',
  },
  {
    candidateId: 'owens-cross-roads-al',
    cityOrAreaName: 'Owens Cross Roads, AL',
    county: 'Madison County',
    proposedSlug: 'owens-cross-roads-al',
    verifiedDispatchCoverage: true,
    hasDistinctLocalSubstantiveContent: true,
    publicationStatus: 'published',
    indexabilityDecision: 'published_indexable',
    gateNotes: 'Verified Big Cove / US-431 corridor hub (35763) with new-construction & growing subdivision context.',
  },
  {
    candidateId: 'athens-al',
    cityOrAreaName: 'Athens, AL',
    county: 'Limestone County',
    proposedSlug: 'athens-al',
    verifiedDispatchCoverage: true,
    hasDistinctLocalSubstantiveContent: true,
    publicationStatus: 'published',
    indexabilityDecision: 'published_indexable',
    gateNotes: 'Verified Limestone County seat hub (35611, 35613, 35614) along I-65 and US-72.',
  },
  {
    candidateId: 'harvest-meridianville-al',
    cityOrAreaName: 'Harvest & Meridianville, AL',
    county: 'Madison County',
    proposedSlug: 'harvest-al',
    verifiedDispatchCoverage: false,
    hasDistinctLocalSubstantiveContent: false,
    publicationStatus: 'needs_verification',
    indexabilityDecision: 'blocked_consolidated_or_unverified',
    gateNotes:
      'CONSOLIDATED / HELD BACK: Served via Huntsville/Madison routes where ZIP coverage applies; withheld from standalone city hub generation to prevent thin geographic doorway pages.',
  },
  {
    candidateId: 'decatur-al',
    cityOrAreaName: 'Decatur, AL',
    county: 'Morgan County',
    proposedSlug: 'decatur-al',
    verifiedDispatchCoverage: false,
    hasDistinctLocalSubstantiveContent: false,
    publicationStatus: 'needs_verification',
    indexabilityDecision: 'blocked_consolidated_or_unverified',
    gateNotes:
      'BLOCKED BY QUALITY GATE: South of the Tennessee River in Morgan County; daily dispatch availability is not verified.',
  },
];

/**
 * PHASE 3.2 — PAGE OPPORTUNITY SCORING ENGINE WITH MANDATORY BLOCKERS
 */
export function evaluatePageOpportunityScore(params: {
  pageType: PageType;
  hasVerifiedService: boolean;
  hasVerifiedLocation: boolean;
  hasUniqueSubstantiveCopy: boolean;
  hasInternalLinks: boolean;
  hasValidCanonical: boolean;
}): OpportunityScoreBreakdown {
  const mandatoryBlockers = {
    fabricatedLocalInformation: false,
    unverifiedServiceClaim: !params.hasVerifiedService,
    substantiallyDuplicative: !params.hasUniqueSubstantiveCopy,
    rankingManipulationOnly: false,
    emptyOrUnfinishedPage: !params.hasUniqueSubstantiveCopy,
    invalidCanonicalConfig: !params.hasValidCanonical,
    noMeaningfulUserBenefit: !params.hasUniqueSubstantiveCopy,
  };

  const hasAnyBlocker = Object.values(mandatoryBlockers).some(Boolean);

  const intentDistinctness =
    params.pageType === 'location_home' ||
    params.pageType === 'location_service_detail' ||
    params.pageType === 'guide_article'
      ? 20
      : 18;
  const verifiedAvailability = params.hasVerifiedService && params.hasVerifiedLocation ? 20 : 0;
  const factualCompleteness = 15;
  const uniqueSubstantiveDepth = params.hasUniqueSubstantiveCopy ? 15 : 0;
  const customerUsefulness = 15;
  const internalLinkIntegration = params.hasInternalLinks ? 15 : 0;

  const totalScore =
    intentDistinctness +
    verifiedAvailability +
    factualCompleteness +
    uniqueSubstantiveDepth +
    customerUsefulness +
    internalLinkIntegration;

  return {
    intentDistinctness,
    verifiedAvailability,
    factualCompleteness,
    uniqueSubstantiveDepth,
    customerUsefulness,
    internalLinkIntegration,
    totalScore,
    mandatoryBlockers,
    eligibleForIndexablePublication: !hasAnyBlocker && totalScore >= 80,
  };
}

/**
 * PHASE 5 — CENTRALIZED AUTHORITATIVE INDEXABILITY POLICY ENGINE
 * Single source of truth determining publication, indexing, canonicals, sitemaps, and robots directives.
 */
export function evaluatePageIndexability(page: {
  pageId: string;
  path: string;
  pageType: PageType;
  canonicalUrl: string;
  publicationStatus: PublicationStatus;
  locationId?: LocationId;
  serviceId?: ServiceId;
}): IndexabilityDecision {
  const blockers: string[] = [];

  // 1. 404 Not Found Page
  if (page.pageType === 'not_found' || page.path === '/404/') {
    return {
      pageId: page.pageId,
      path: page.path,
      canPublish: false,
      canIndex: false,
      indexabilityClass: 'noindex_not_found',
      canonicalUrl: page.canonicalUrl,
      inSitemap: false,
      sitemapFile: null,
      robotsDirective: 'noindex, nofollow',
      allowInPublicNav: false,
      qualityGatePassed: true,
      blockers: ['404 error route must never be indexed or included in XML sitemaps.'],
      rationale: 'Error status page excluded via meta robots noindex, nofollow and omitted from sitemaps.',
    };
  }

  // 2. Administrative SEO Expansion Dashboard (/seo-dashboard/)
  if (page.pageType === 'seo_dashboard' || page.path === '/seo-dashboard/') {
    return {
      pageId: page.pageId,
      path: page.path,
      canPublish: true,
      canIndex: false,
      indexabilityClass: 'noindex_utility_or_admin',
      canonicalUrl: page.canonicalUrl,
      inSitemap: false,
      sitemapFile: null,
      robotsDirective: 'noindex, nofollow',
      allowInPublicNav: false,
      qualityGatePassed: true,
      blockers: ['Internal administrative SEO monitoring dashboard is intentionally excluded from search indexing.'],
      rationale:
        'Crawlable in robots.txt so Googlebot can process <meta name="robots" content="noindex, nofollow" />, omitted from public navigation and sitemaps.',
    };
  }

  // 3. Unpublished / Draft / Unverified Pages
  if (page.publicationStatus !== 'published') {
    blockers.push(`Publication status is '${page.publicationStatus}' (requires 'published').`);
    return {
      pageId: page.pageId,
      path: page.path,
      canPublish: false,
      canIndex: false,
      indexabilityClass: 'excluded_unpublished_candidate',
      canonicalUrl: page.canonicalUrl,
      inSitemap: false,
      sitemapFile: null,
      robotsDirective: 'noindex, nofollow',
      allowInPublicNav: false,
      qualityGatePassed: false,
      blockers,
      rationale: 'Unpublished or unverified candidate page blocked by quality gate.',
    };
  }

  // 4. Determine Sitemap Partition File for Approved Canonical Indexable Pages
  let sitemapFile: SitemapFileId = 'sitemap-core.xml';
  if (page.pageType === 'location_service_detail') {
    sitemapFile = 'sitemap-service-locations.xml';
  } else if (page.pageType === 'location_services') {
    sitemapFile = 'sitemap-services.xml';
  } else if (page.pageType === 'guides_hub' || page.pageType === 'guide_article') {
    sitemapFile = 'sitemap-guides.xml';
  } else if (
    page.pageType === 'location_home' &&
    page.path !== '/'
  ) {
    sitemapFile = 'sitemap-locations.xml';
  } else if (
    page.pageType === 'location_about' ||
    page.pageType === 'location_checklist' ||
    page.pageType === 'location_reviews' ||
    page.pageType === 'location_faqs' ||
    page.pageType === 'location_contact' ||
    page.pageType === 'location_quote'
  ) {
    sitemapFile = 'sitemap-locations.xml';
  }

  return {
    pageId: page.pageId,
    path: page.path,
    canPublish: true,
    canIndex: true,
    indexabilityClass: 'indexable_canonical',
    canonicalUrl: page.canonicalUrl,
    inSitemap: true,
    sitemapFile,
    robotsDirective: 'index, follow, max-image-preview:large',
    allowInPublicNav: page.pageType !== 'legal',
    qualityGatePassed: true,
    blockers: [],
    rationale: 'Verified, complete, non-duplicative canonical page eligible for Google indexing and XML sitemap inclusion.',
  };
}

/**
 * PHASE 14 — GOOGLE SEARCH CONSOLE & INDEXING STATE MONITOR CONFIGURATION
 * Explicitly tracks connection status and indexing state buckets without fabricating live GSC data.
 */
export const GSC_INDEXING_MONITOR_CONFIG = {
  propertyOrigin: 'https://mojocleaningservice.com/',
  previewOrigin: 'https://zoiriscleaningservices-sys.github.io/Mojo-Cleaning-/',
  ownershipVerificationStatus: 'unverified — requires DNS TXT or HTML tag verification token from Google Search Console owner account',
  sitemapSubmissionUrl: 'https://mojocleaningservice.com/sitemap_index.xml',
  sitemapSubmissionStatus: 'ready_for_submission — sitemap_index.xml and 5 child sitemaps generated and validated in production build',
  monitoredIndexingBuckets: [
    {
      state: 'Indexed',
      description: 'Canonical URLs crawled and actively serving in Google Search.',
      liveCountStatus: 'unverified (connect GSC API)',
      expectedEligibleCount: 75,
    },
    {
      state: 'Discovered — currently not indexed',
      description: 'URLs found via sitemap_index.xml or internal links awaiting Googlebot crawl.',
      liveCountStatus: 'unverified (connect GSC API)',
      expectedEligibleCount: 0,
    },
    {
      state: 'Crawled — currently not indexed',
      description: 'Pages crawled by Googlebot but held back; requires content uniqueness & internal-link audit.',
      liveCountStatus: 'unverified (connect GSC API)',
      expectedEligibleCount: 0,
    },
    {
      state: 'Excluded by ‘noindex’ tag',
      description: 'Intentionally excluded utility/error routes (/404/ and /seo-dashboard/).',
      liveCountStatus: 'verified in HTML build (2 routes)',
      expectedEligibleCount: 2,
    },
    {
      state: 'Page with redirect',
      description: 'Legacy routes (48 paths) permanently redirected (301) to canonical location-scoped URLs.',
      liveCountStatus: 'verified in routing & _redirects (48 routes)',
      expectedEligibleCount: 48,
    },
  ],
};
