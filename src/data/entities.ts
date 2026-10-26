/**
 * SECTION 14 — REUSABLE LOCATION-AWARE CONTENT MODEL & ENTITY DEFINITIONS
 * Single source of truth for Business, Location, Service, LocationService,
 * LocationPage, FAQ, Review, QuoteRequest, NavigationConfiguration, and SEOConfiguration.
 */

export type PublicationStatus =
  | 'draft'
  | 'needs_verification'
  | 'ready_for_review'
  | 'needs_review'
  | 'approved'
  | 'published'
  | 'unpublished'
  | 'archived';

export type VerificationStatus = 'verified' | 'needs_verification' | 'not_applicable';

export interface VerifiedFact<T> {
  value: T;
  status: VerificationStatus;
  source: string;
  verifiedDate: string;
  notes?: string;
}

export interface ImageAsset {
  src: string;
  webp: string;
  webpMobile?: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface SEOConfiguration {
  title: string;
  metaDescription: string;
  canonicalPath: string;
  primaryIntent: string;
  primaryQuery: string;
  secondaryQueries: string[];
  ogType?: 'website' | 'article';
  robots?: 'index, follow' | 'noindex, nofollow';
}

export type SeoMetadata = SEOConfiguration;

export type ServiceId =
  | 'recurring-residential-cleaning'
  | 'deep-house-cleaning'
  | 'move-in-cleaning'
  | 'move-out-cleaning'
  | 'post-construction-cleaning';

export type LocationId =
  | 'huntsville-al'
  | 'madison-al'
  | 'hampton-cove-al'
  | 'owens-cross-roads-al'
  | 'athens-al';

export interface FaqEntity {
  id: string;
  question: string;
  answer: string;
  category:
    | 'general'
    | 'service'
    | 'location'
    | 'service_location'
    | 'pricing_booking'
    | 'guarantee_trust';
  serviceId?: ServiceId;
  locationId?: LocationId;
  publicationStatus: PublicationStatus;
}

export interface ReviewEntity {
  id: string;
  author: string;
  locationLabel: string;
  locationId?: LocationId;
  serviceLabel: string;
  serviceId?: ServiceId;
  quote: string;
  sourceLabel: string;
  sourceUrl: string;
  verificationStatus: VerificationStatus;
}

export interface ServiceScopeRoom {
  roomName: string;
  includedItems: string[];
}

export interface ServiceProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface ServiceEntity {
  id: ServiceId;
  slug: ServiceId;
  urlPath: string;
  name: string;
  shortName: string;
  checklistPointsLabel: string;
  categoryLabel: string;
  badge: string;
  tagline: string;
  shortDescription: string;
  longDescription: string[];
  idealFor: string[];
  scopeByRoom: ServiceScopeRoom[];
  includedHighlights: string[];
  excludedOrConfirmationItems: string[];
  benefits: {
    title: string;
    description: string;
  }[];
  preparationTips: string[];
  howItWorks: ServiceProcessStep[];
  cadenceOptions: string[];
  relatedServiceIds: ServiceId[];
  availableLocationIds: LocationId[];
  heroImage: ImageAsset;
  secondaryImage: ImageAsset;
  quoteFormValue: string;
  ghlMetaValue: string;
  faqs: FaqEntity[];
  seo: SEOConfiguration;
  publicationStatus: PublicationStatus;
}

export interface LocationHomepageContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroSupportingNote: string;
  valuePropHeading: string;
  valuePropLead: string;
  valuePropPillars: {
    title: string;
    description: string;
    metricOrBadge: string;
  }[];
  aboutPreviewHeading: string;
  aboutPreviewParagraphs: string[];
  aboutDistinctiveNote: string;
  serviceSectionHeading: string;
  serviceSectionIntro: string;
  checklistPreviewHeading: string;
  checklistPreviewLead: string;
  reviewsSectionHeading: string;
  reviewsSectionNote: string;
  faqSectionHeading: string;
  quoteSectionHeading: string;
  quoteSectionLead: string;
}

export interface LocationAboutContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroLead: string;
  philosophyHeading: string;
  philosophyParagraphs: string[];
  localCommitmentHeading: string;
  localCommitmentParagraphs: string[];
  standardsList: {
    title: string;
    detail: string;
  }[];
  serviceAreaClarification: string;
}

export interface LocationEntity {
  id: LocationId;
  slug: LocationId;
  urlPath: string;
  name: string;
  fullStateName: string;
  city: string;
  state: string;
  stateAbbr: string;
  county: string;
  regionLabel: string;
  isPrimaryHub: boolean;
  verifiedServiceArea: boolean;
  zipCodes: string[];
  neighborhoods: string[];
  directoryCardSummary: string;
  shortSummary: string;
  localIntroduction: string[];
  localHousingContext: string;
  commuteAndLifestyleContext: string;
  serviceAvailabilityNote: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  latitude: number;
  longitude: number;
  availableServiceIds: ServiceId[];
  nearbyLocationIds: LocationId[];
  heroImage: ImageAsset;
  secondaryImage: ImageAsset;
  homepageContent: LocationHomepageContent;
  aboutContent: LocationAboutContent;
  faqs: FaqEntity[];
  seo: SEOConfiguration;
  publicationStatus: PublicationStatus;
}

export interface LocationServiceEntity {
  id: string;
  serviceId: ServiceId;
  locationId: LocationId;
  urlPath: string;
  isAvailable: boolean;
  publicationStatus: PublicationStatus;
  headline: string;
  subheadline: string;
  introParagraphs: string[];
  localCustomerGuidance: string;
  neighborhoodSpotlight: string[];
  whyLocalHomeownersChoose: {
    title: string;
    detail: string;
  }[];
  includedSummary: string[];
  localSchedulingNote: string;
  image: ImageAsset;
  faqs: FaqEntity[];
  seo: SEOConfiguration;
}

export type ServiceLocationEntity = LocationServiceEntity;

export type SearchIntentCategory =
  | 'brand'
  | 'general_service'
  | 'service'
  | 'location'
  | 'service_location'
  | 'cost_quote'
  | 'comparison_trust'
  | 'informational_faq';

export type PageType =
  | 'location_home'
  | 'location_about'
  | 'location_services'
  | 'location_service_detail'
  | 'location_checklist'
  | 'location_reviews'
  | 'location_faqs'
  | 'location_contact'
  | 'location_quote'
  | 'locations_directory'
  | 'guides_hub'
  | 'guide_article'
  | 'seo_dashboard'
  | 'legal'
  | 'not_found';

export interface NavigationDropdownItem {
  id: ServiceId;
  label: string;
  shortLabel: string;
  badge: string;
  checklistLabel: string;
  href: string;
}

export interface NavigationLinkItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: NavigationDropdownItem[];
}

export interface NavigationConfiguration {
  locationId: LocationId;
  locationName: string;
  locationCity: string;
  homeHref: string;
  aboutHref: string;
  servicesHref: string;
  checklistHref: string;
  reviewsHref: string;
  faqsHref: string;
  contactHref: string;
  quoteHref: string;
  allLocationsHref: string;
  primaryItems: NavigationLinkItem[];
  serviceDropdownItems: NavigationDropdownItem[];
  footerExploreItems: { label: string; href: string }[];
  footerServiceItems: { label: string; href: string }[];
}

export interface KeywordMapEntry {
  targetUrl: string;
  pageType: PageType;
  locationId?: LocationId;
  serviceId?: ServiceId;
  intentCategory: SearchIntentCategory;
  primarySearchIntent: string;
  primaryQuery: string;
  secondaryQueries: string[];
  supportingUrls: string[];
  contentGapAddressed: string;
  demandRationale: string;
  // Section 3.D Master Local SEO Keyword Intelligence Database fields
  exactQuery?: string;
  normalizedTopic?: string;
  primaryIntent?: string;
  relatedService?: string;
  relatedLocation?: string;
  intendedLandingPage?: string;
  searchVolume?: number | null;
  searchVolumeSourceAndDate?: string;
  competitionEstimate?: string;
  commercialRelevance?: 'high' | 'medium' | 'supporting';
  currentRanking?: string;
  currentImpressions?: number | null;
  currentClicks?: number | null;
  existingPage?: boolean;
  recommendedAction?:
    | 'preserve_and_strengthen'
    | 'create_dedicated_page'
    | 'maintain_compliance';
  priority?: 'P1_core_revenue' | 'P2_high_intent' | 'P3_trust_and_support';
  confidenceLevel?: 'high_verified_service_and_area' | 'medium_long_tail';
}

export interface PageBlueprint {
  url: string;
  pageType: PageType;
  primaryTargetTopic: string;
  secondaryTopics: string[];
  targetIntent: string;
  targetAudience: string;
  coreQuestionAnswered: string;
  uniqueValueProposition: string;
  requiredSections: string[];
  internalLinksOut: string[];
  internalLinksInFrom: string[];
  conversionGoal: string;
  primaryCta: string;
  secondaryCta: string;
  titleTagFormula: string;
  metaDescriptionFormula: string;
  h1Formula: string;
  schemaTypes: string[];
  contentQualityRequirements: string[];
  publicationStatus: PublicationStatus;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface PageEntity {
  pageId?: string;
  path: string;
  pageType: PageType;
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  canonicalTarget?: string;
  h1: string;
  robots: 'index, follow' | 'index, follow, max-image-preview:large' | 'noindex, nofollow';
  publicationStatus: PublicationStatus;
  indexabilityStatus?: 'indexable_canonical' | 'noindex_utility_or_admin' | 'noindex_not_found' | 'excluded_unpublished_candidate' | 'redirected_legacy_url';
  sitemapEligibility?: boolean;
  sitemapFile?: string | null;
  primarySearchIntent?: SearchIntentCategory;
  primaryTargetQuery?: string;
  relatedQueryGroup?: string[];
  contentSource?: string;
  contentVerificationStatus?: VerificationStatus;
  lastModified?: string;
  lastQualityReviewDate?: string;
  internalLinkStatus?: 'linked_in_navigation_and_body' | 'linked_in_body' | 'linked_in_footer' | 'unlinked_admin';
  duplicateContentReviewStatus?: 'verified_distinct' | 'flagged_overlap';
  opportunityScore?: number;
  breadcrumbs: BreadcrumbItem[];
  locationId?: LocationId;
  serviceId?: ServiceId;
  serviceLocationId?: string;
  guideSlug?: string;
  legalSlug?: 'privacy-policy' | 'terms';
  jsonLd: Record<string, unknown>[];
}

export interface QuoteLeadAttribution {
  sourcePagePath: string;
  pageType: PageType;
  activeLocationId?: LocationId;
  preselectedService?: string;
  preselectedLocation?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}

export interface QuoteRequestEntity {
  referenceId: string;
  submittedAtIso: string;
  fullName: string;
  phone: string;
  email: string;
  service: string;
  locationOrZip: string;
  homeSize?: string;
  frequency?: string;
  preferredDate?: string;
  details: string;
  smsConsent: boolean;
  promoCode?: string;
  attribution: QuoteLeadAttribution;
  crmFormId: string;
  status: 'received' | 'forwarded_to_crm' | 'pending_review';
}
