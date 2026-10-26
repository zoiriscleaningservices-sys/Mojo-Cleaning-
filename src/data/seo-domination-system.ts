/**
 * MOJO CLEANING — ADVANCED LOCAL SEO DOMINATION, COMPETITIVE INTELLIGENCE,
 * GBP AUTHORITY, REPUTATION, AI-SEARCH READINESS & MEASUREMENT SYSTEM
 *
 * All competitive observations, business facts, GBP rules, review workflows,
 * and AI-search answer modules in this file strictly distinguish between:
 * - "verified": Directly confirmed frommojocleaningservice.com or live SERP inspection (2026-10-25)
 * - "estimated": Clearly labeled industry/market estimates where private competitor data is unavailable
 * - "needs_owner_verification": Requires owner input or third-party account access (GSC, GA4, GBP)
 */

import type { LocationId, ServiceId } from './entities';

// ============================================================================
// 1. FAMILY-OWNED & LOCALLY ROOTED BRAND AUTHORITY SYSTEM (SECTION 1)
// ============================================================================

export interface BrandAuthoritySection {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bulletPoints?: { label: string; detail: string }[];
  verificationStatus: 'verified' | 'needs_owner_verification';
  verificationNote: string;
}

export const BRAND_AUTHORITY_EXPERIENCE: {
  ourStory: BrandAuthoritySection;
  cleaningStandards: BrandAuthoritySection;
  customerExpectations: BrandAuthoritySection;
  peopleBehindMojo: BrandAuthoritySection;
  communityCommitment: BrandAuthoritySection;
} = {
  ourStory: {
    id: 'our-story',
    eyebrow: 'Our Story • Locally Rooted in North Alabama',
    title: 'Built on a simple belief: A clean home creates a good mood.',
    paragraphs: [
      'Mojo Cleaning LLC was established in Huntsville, Alabama to give busy North Alabama households a dependable, personally accountable alternative to impersonal national cleaning franchises and unpredictable independent listings.',
      'Instead of treating residential cleaning as a rushed checklist race, our team built Mojo Cleaning around three commitments: clear room-by-room standards published openly online, vetted cleaning specialists who respect your home and privacy, and responsive local communication before and after every visit.',
      'Whether we are caring for a historic bungalow in Huntsville, a growing family home in Madison, a custom multi-story residence in Hampton Cove, a brand-new build in Owens Cross Roads, or an established property in Athens, every visit is approached with personal pride in the finished work.',
    ],
    bulletPoints: [
      {
        label: 'Personal Accountability',
        detail:
          'You communicate directly with our local North Alabama scheduling and quality team—never an out-of-state franchise call center.',
      },
      {
        label: 'Respect for Your Home & Time',
        detail:
          'We arrive within your scheduled window with every supply and HEPA/microfiber tool needed, following your household instructions for pets, alarms, and delicate surfaces.',
      },
      {
        label: 'Consistent Room-by-Room Standards',
        detail:
          'Every service tier follows our published 37-point, 47-point, or 56-point room checklist so quality never depends on guesswork.',
      },
    ],
    verificationStatus: 'verified',
    verificationNote:
      'Verified from official Mojo Cleaning brand identity ("A Clean Home. A Good Mood."), LLC registration context, and published service guarantees. Specific founder biography names or founding year require owner confirmation before publishing personal names.',
  },
  cleaningStandards: {
    id: 'our-cleaning-standards',
    eyebrow: 'Our Cleaning Standards • Zero Mystery Checklists',
    title: 'How we establish expectations, verify quality, and handle concerns.',
    paragraphs: [
      'Before our specialists ever step through your door, we confirm your exact service tier—37-Point Standard Recurring, 47-Point Deep Cleaning, 56-Point Move-In/Move-Out, or Multi-Pass Post-Construction—along with your custom household notes.',
      'During each visit, our team works systematically through your kitchen (up to 24 checkpoints), bathrooms (up to 17 checkpoints), and bedrooms and living areas (up to 15 checkpoints), using color-coded microfiber cloths and surface-appropriate products to prevent cross-contamination and protect natural stone, hardwood, and luxury vinyl plank flooring.',
      'If any task on your agreed checklist is ever overlooked, our 48-Hour Happiness Guarantee makes resolution effortless: notify us by phone, text, or email within 48 hours of completion and we return to re-clean the affected area at no additional cost.',
    ],
    bulletPoints: [
      {
        label: 'Pre-Visit Scope Lock',
        detail:
          'Your bedroom/bathroom count, priority rooms, skipped rooms, pet notes, and eco-friendly product requests are recorded on your household profile prior to dispatch.',
      },
      {
        label: 'Surface-Safe Product Protocol',
        detail:
          'All professional supplies and equipment are provided by Mojo Cleaning, with non-toxic, eco-friendly options available on request for children, pets, and sensitive finishes.',
      },
      {
        label: '48-Hour Happiness Guarantee',
        detail:
          'Report any missed checklist item within 48 hours of your appointment and our team schedules a complimentary spot re-clean.',
      },
    ],
    verificationStatus: 'verified',
    verificationNote:
      'Verified against Mojo Cleaning’s published 56-point room checklist, supply inclusion policy, and 48-Hour Happiness Guarantee.',
  },
  customerExpectations: {
    id: 'what-customers-can-expect',
    eyebrow: 'What Customers Can Expect • Step-by-Step Transparency',
    title: 'From your initial estimate to ongoing care—no hidden fees or surprises.',
    paragraphs: [
      '1. Requesting Your Quote: Submit your home details online or call/text (256) 418-8199. We evaluate your approximate square footage, bedroom and bathroom count, service tier, and any add-on requests (such as inside oven or inside refrigerator detailing) to provide a clear, customized quote.',
      '2. Scheduling & Reminders: Once you approve your quote, we lock in your preferred appointment window and send optional SMS/email reminders before arrival so you always know when to expect our team.',
      '3. Service Scope & Clear Boundaries: Our specialists bring all cleaning supplies and equipment. For technician safety and insurance compliance, we also clearly state what is excluded (such as exterior second-story windows, biohazards, carpet steam extraction, or moving heavy appliances) so expectations are 100% aligned.',
      '4. Post-Visit Follow-Up: After your clean is complete, we welcome your direct feedback and adjust your recurring profile whenever your household priorities change.',
    ],
    verificationStatus: 'verified',
    verificationNote:
      'Verified against Mojo Cleaning quote workflow, SMS consent policy, and service scope documentation.',
  },
  peopleBehindMojo: {
    id: 'meet-the-people-behind-mojo',
    eyebrow: 'Meet the People Behind Mojo • Vetted Residential Specialists',
    title: 'Real, background-checked professionals who take pride in their craft.',
    paragraphs: [
      'Every specialist wearing the Mojo Cleaning uniform completes a background check, hands-on training in our 56-point room-by-room system, and surface-safety instruction before being dispatched to North Alabama homes.',
      'The photographs throughout our website show real Mojo Cleaning team members performing actual detail work—polishing glass kitchen pendants, hand-scrubbing cabinetry, detailing stainless appliances, and removing high-reach construction dust.',
    ],
    verificationStatus: 'needs_owner_verification',
    verificationNote:
      'Team-in-action photography is 100% authentic and verified from official brand assets. Individual employee/owner names and biographies are withheld until explicit written permission is provided by the owner.',
  },
  communityCommitment: {
    id: 'our-commitment-to-the-community',
    eyebrow: 'Community & Local Partnerships • North Alabama',
    title: 'Supporting homeowners, relocating families, and local property professionals.',
    paragraphs: [
      'As a locally operated Huntsville and Madison County business, our reputation is built neighbor-to-neighbor across Huntsville, Madison, Hampton Cove, Owens Cross Roads, and Athens.',
      'Beyond recurring household care, we partner with North Alabama real estate agents, property managers, landlords, and custom home builders who need dependable, checklist-verified Move-In/Move-Out and Post-Construction turnovers that pass walk-through inspections on schedule.',
    ],
    verificationStatus: 'verified',
    verificationNote:
      'Reflects verified service capabilities across the 5 service areas without fabricating charitable sponsorships or unverified awards.',
  },
};

// ============================================================================
// 2. LOCAL SEARCH COMPETITIVE INTELLIGENCE SYSTEM (SECTION 2)
// ============================================================================

export interface CompetitorProfile {
  id: string;
  name: string;
  domain: string;
  businessType: 'national_franchise' | 'local_independent_or_regional';
  citiesObserved: LocationId[];
  queryCategoriesObserved: string[];
  observationDate: string;
  searchEnvironment: string;
  apparentStrengths: string[];
  verifiedWeaknesses: string[];
  contentGaps: string[];
  mojoDifferentiationAdvantage: string;
}

export const NORTH_ALABAMA_COMPETITORS: CompetitorProfile[] = [
  {
    id: 'two-maids-huntsville',
    name: 'Two Maids (Huntsville)',
    domain: 'twomaidscleaning.com',
    businessType: 'national_franchise',
    citiesObserved: ['huntsville-al', 'madison-al', 'hampton-cove-al', 'owens-cross-roads-al'],
    queryCategoriesObserved: [
      'house cleaning Huntsville AL',
      'cleaning service Huntsville Alabama',
      'house cleaning Hampton Cove AL',
    ],
    observationDate: '2026-10-25',
    searchEnvironment: 'Google Organic & Local Pack / Maps (US - Alabama)',
    apparentStrengths: [
      'Physical commercial office address in Huntsville (2225 Drake Ave SW) supporting Huntsville Maps proximity',
      'High national domain authority and established franchise review volume',
      'Clear messaging that supplies and equipment are included',
    ],
    verifiedWeaknesses: [
      'Franchise template copy shared across hundreds of U.S. franchise locations',
      'Suburban communities (Hampton Cove, Owens Cross Roads) are listed as secondary bullet points rather than having isolated, full-featured local experiences',
      'Lacks an interactive, side-by-side 37/47/56-point task comparison table with explicit exclusions on every local service page',
    ],
    contentGaps: [
      'No neighborhood-specific preparation checklists for historic Huntsville homes vs. new-build subdivisions',
      'No transparent pricing-factor matrix explaining how square footage, pets, and buildup affect quotes',
    ],
    mojoDifferentiationAdvantage:
      'Mojo Cleaning provides a strictly isolated 13-page local experience per community, a transparent 56-point room-by-room comparison table, and direct local accountability without national franchise scripting.',
  },
  {
    id: 'the-cleaning-authority-huntsville',
    name: 'The Cleaning Authority - Huntsville',
    domain: 'thecleaningauthority.com',
    businessType: 'national_franchise',
    citiesObserved: ['huntsville-al', 'madison-al'],
    queryCategoriesObserved: [
      'house cleaning Huntsville AL',
      'recurring house cleaning Madison AL',
      'residential cleaning Huntsville AL',
    ],
    observationDate: '2026-10-25',
    searchEnvironment: 'Google Organic & Local Pack (US - Alabama)',
    apparentStrengths: [
      'Strong domain authority and recognizable branded "Detail-Clean Rotation System"',
      'Addresses regional seasonal pollen and dust in general marketing copy',
    ],
    verifiedWeaknesses: [
      'Rotational cleaning model rotates deep-cleaning tasks across visits rather than delivering a clear, static 37-point or 47-point scope every time',
      'National corporate template structure mixes nearby cities in footer/sidebar links',
    ],
    contentGaps: [
      'Does not publish dedicated post-construction or empty-home 56-point turnover guides tailored to Madison and Owens Cross Roads builders/landlords',
    ],
    mojoDifferentiationAdvantage:
      'Mojo Cleaning allows homeowners to choose an exact 37-point Standard or 47-point Deep checklist for their entire active home on visit one—plus 100% custom room skipping.',
  },
  {
    id: 'molly-maid-huntsville-decatur-athens',
    name: 'Molly Maid of Huntsville, Decatur and Athens',
    domain: 'mollymaid.com',
    businessType: 'national_franchise',
    citiesObserved: ['huntsville-al', 'madison-al', 'athens-al'],
    queryCategoriesObserved: [
      'house cleaning Huntsville AL',
      'maid service Madison Alabama',
      'house cleaning Athens AL',
    ],
    observationDate: '2026-10-25',
    searchEnvironment: 'Google Organic & AI Overview Citations (US - Alabama)',
    apparentStrengths: [
      'High national brand recognition and Neighborly franchise network authority',
      'Broad multi-county territory coverage across Madison and Limestone counties',
    ],
    verifiedWeaknesses: [
      'Combines Huntsville, Decatur, and Athens into shared franchise hub pages, diluting hyper-local relevance for Athens (35611/35613) and Madison (35756/35757/35758)',
      'Generic national stock photography rather than authentic local team-in-action photography',
    ],
    contentGaps: [
      'Minimal Limestone County / Athens-specific neighborhood and rural-corridor dust guidance',
      'No self-service room-by-room task comparison between recurring and move-out tiers',
    ],
    mojoDifferentiationAdvantage:
      'Mojo Cleaning gives Athens (`/athens-al/`) and Madison (`/madison-al/`) completely isolated 13-page local websites with authentic team photography and local ZIP code verification.',
  },
  {
    id: 'bear-brothers-cleaning',
    name: 'Bear Brothers Cleaning',
    domain: 'bearbroscleaning.com',
    businessType: 'local_independent_or_regional',
    citiesObserved: ['huntsville-al', 'madison-al', 'athens-al'],
    queryCategoriesObserved: [
      'house cleaning Huntsville AL',
      'deep cleaning Madison AL',
      'move-out cleaning Athens AL',
    ],
    observationDate: '2026-10-25',
    searchEnvironment: 'Google Organic & Local Pack (US - Alabama)',
    apparentStrengths: [
      'Modern booking-oriented website with clear text/call contact options',
      'Visible across Huntsville, Madison, and Athens organic results',
    ],
    verifiedWeaknesses: [
      'Multi-city expansion template structure across multiple regional markets',
      'Less granular technical explanation of post-construction HEPA fine-dust passes and surface-specific care',
    ],
    contentGaps: [
      'Limited dedicated content for Hampton Cove (35763) and Owens Cross Roads (35763) custom homes',
    ],
    mojoDifferentiationAdvantage:
      'Mojo Cleaning pairs modern conversion UX with deeper answer-first educational guides, explicit 56-point room tables, and dedicated Hampton Cove and Owens Cross Roads hubs.',
  },
  {
    id: 'rosie-cleans-alabama',
    name: 'Rosie Cleans',
    domain: 'rosiecleansalabama.com',
    businessType: 'local_independent_or_regional',
    citiesObserved: ['huntsville-al', 'hampton-cove-al', 'owens-cross-roads-al'],
    queryCategoriesObserved: [
      'family-owned cleaning company Huntsville AL',
      'house cleaning Hampton Cove AL',
      'house cleaning Owens Cross Roads AL',
    ],
    observationDate: '2026-10-25',
    searchEnvironment: 'Google Organic (US - Alabama)',
    apparentStrengths: [
      'Clear local family-owned and veteran-founded positioning',
      'Mentions Hampton Cove and Owens Cross Roads coverage and online booking',
    ],
    verifiedWeaknesses: [
      'Does not isolate each service area into a full 13-page standalone local website with dedicated local checklist, FAQ, and service detail URLs',
    ],
    contentGaps: [
      'Fewer standalone answer-first educational sections comparing 37/47/56-point scopes and post-construction protocols',
    ],
    mojoDifferentiationAdvantage:
      'Mojo Cleaning delivers a full 13-page isolated experience for both `/hampton-cove-al/` and `/owens-cross-roads-al/`, complete with local 56-point checklist pages and answer-first service guides.',
  },
  {
    id: 'the-valley-clean-team',
    name: 'The Valley Clean Team',
    domain: 'thevalleycleanteam.com',
    businessType: 'local_independent_or_regional',
    citiesObserved: ['hampton-cove-al', 'owens-cross-roads-al', 'athens-al'],
    queryCategoriesObserved: [
      'house cleaning Hampton Cove AL',
      'house cleaning Owens Cross Roads AL',
      'cleaning service Athens AL',
    ],
    observationDate: '2026-10-25',
    searchEnvironment: 'Google Organic (US - Alabama)',
    apparentStrengths: [
      'Hyper-local name recognition in the Hampton Cove / Big Cove valley',
      'Highlights square-footage pricing tiers for standard, deep, and move-in/out cleans',
    ],
    verifiedWeaknesses: [
      'Smaller site architecture without isolated 5-service × 5-city programmatic depth or comprehensive JSON-LD entity graphs',
    ],
    contentGaps: [
      'Limited technical guides on post-renovation drywall dust removal and landlord/realtor turnover preparation',
    ],
    mojoDifferentiationAdvantage:
      'Mojo Cleaning combines hyper-local Hampton Cove & Big Cove relevance with enterprise-grade technical SEO, fast pre-rendered HTML, and a 48-Hour Happiness Guarantee.',
  },
  {
    id: 'rocket-maids',
    name: 'Rocket Maids',
    domain: 'therocketmaids.com',
    businessType: 'local_independent_or_regional',
    citiesObserved: ['huntsville-al', 'madison-al', 'athens-al'],
    queryCategoriesObserved: [
      'maid service Madison Alabama',
      'house cleaning Athens AL',
      'eco-friendly house cleaning Huntsville AL',
    ],
    observationDate: '2026-10-25',
    searchEnvironment: 'Google Organic (US - Alabama)',
    apparentStrengths: [
      'Regional "Rocket City" branding and eco-friendly / online booking messaging',
    ],
    verifiedWeaknesses: [
      'Single-experience website structure without isolated city navigation for Madison, Athens, Hampton Cove, and Owens Cross Roads',
    ],
    contentGaps: [
      'Lacks detailed room-by-room exclusions and B2B property-turnover resources',
    ],
    mojoDifferentiationAdvantage:
      'Mojo Cleaning offers eco-friendly supply options on request while providing deeper service documentation and isolated local navigation.',
  },
  {
    id: 'tcl-cleaning-services-athens',
    name: 'TCL Cleaning Services (The Cleaning Ladies)',
    domain: 'tclcleaningservices.com',
    businessType: 'local_independent_or_regional',
    citiesObserved: ['athens-al'],
    queryCategoriesObserved: [
      'house cleaning Athens AL',
      'cleaning service Athens Alabama',
    ],
    observationDate: '2026-10-25',
    searchEnvironment: 'Google Organic & Local Pack (Athens, AL)',
    apparentStrengths: [
      'Established local presence in Athens and Limestone County since 2011',
    ],
    verifiedWeaknesses: [
      'Legacy website structure with limited answer-first content formatting, schema markup, and service-specific landing depth',
    ],
    contentGaps: [
      'Missing interactive room-by-room 56-point checklist and dedicated move-in, move-out, and post-construction guides for new Athens subdivisions',
    ],
    mojoDifferentiationAdvantage:
      'Mojo Cleaning’s dedicated `/athens-al/` experience provides 13 fast, mobile-first pages tailored specifically to Limestone County (`35611, 35613`) homeowners.',
  },
];

export interface CompetitorOpportunityRow {
  cityId: LocationId;
  cityName: string;
  primaryServiceFocus: string;
  searchIntent: string;
  targetQueries: string[];
  visibleCompetitors: string[];
  competitorWeaknessesVerified: string[];
  missingCustomerInformation: string[];
  recommendedMojoAction: string;
  implementedUrls: string[];
  priority: 'P0 - Critical' | 'P1 - High' | 'P2 - Medium';
  measurementMethod: string;
}

export const COMPETITOR_OPPORTUNITY_MATRIX: CompetitorOpportunityRow[] = [
  {
    cityId: 'huntsville-al',
    cityName: 'Huntsville, AL',
    primaryServiceFocus: 'Recurring Residential & Deep House Cleaning',
    searchIntent:
      'Homeowners in Twickenham, Five Points, Blossomwood, Jones Valley, and South Huntsville comparing trustworthy recurring and kickoff deep cleaning teams.',
    targetQueries: [
      'house cleaning Huntsville AL',
      'house cleaning service Huntsville AL',
      'deep cleaning Huntsville AL',
      'recurring house cleaning Huntsville AL',
      'insured house cleaners Huntsville AL',
    ],
    visibleCompetitors: [
      'Two Maids (Huntsville)',
      'The Cleaning Authority - Huntsville',
      'Molly Maid',
      'Bear Brothers Cleaning',
      'Rosie Cleans',
    ],
    competitorWeaknessesVerified: [
      'Franchises rely on rotational cleaning or generic national copy without showing exact task differences between 37-point recurring and 47-point deep cleans.',
      'Few competitors explain how historic hardwood/millwork in Twickenham/Five Points is protected differently from modern surfaces.',
    ],
    missingCustomerInformation: [
      'Side-by-side 37 vs. 47 vs. 56-point checklist comparison',
      'Explicit list of what is excluded so homeowners are never surprised on cleaning day',
      'Transparent explanation of what factors affect quote pricing in Huntsville',
    ],
    recommendedMojoAction:
      'Maintain Huntsville as the primary headquarters hub with answer-first service summaries, home-preparation steps, and pricing-factor tables on every `/huntsville-al/services/*` page.',
    implementedUrls: [
      '/huntsville-al/',
      '/huntsville-al/services/recurring-residential-cleaning/',
      '/huntsville-al/services/deep-house-cleaning/',
      '/huntsville-al/checklist/',
    ],
    priority: 'P0 - Critical',
    measurementMethod:
      'Track GSC impressions/clicks for Huntsville service queries + `/huntsville-al/` quote submissions and phone calls.',
  },
  {
    cityId: 'madison-al',
    cityName: 'Madison, AL',
    primaryServiceFocus: 'Bi-Weekly Family Recurring, Move-Out & New-Build Cleaning',
    searchIntent:
      'Dual-income families and relocating households in Clift Farm, Town Madison, Bridgefield, and Dublin (`35756, 35757, 35758`) seeking reliable bi-weekly upkeep or 56-point move-in/move-out turnovers.',
    targetQueries: [
      'house cleaning Madison AL',
      'recurring house cleaning Madison AL',
      'move-out cleaning Madison AL',
      'move-in cleaning Madison AL',
      'post-construction cleaning Madison AL',
    ],
    visibleCompetitors: [
      'Rocket Maids',
      'The Cleaning Authority - Huntsville',
      'MaidPro (Madison)',
      'Molly Maid',
      'The Housekeepers Inc.',
    ],
    competitorWeaknessesVerified: [
      'Most competitors send Madison visitors to Huntsville-centric navigation or generic franchise pages.',
      'Lack of specific guidance on red-clay construction dust in Clift Farm/Town Madison and 56-point lease/closing inspection checklists.',
    ],
    missingCustomerInformation: [
      'Isolated Madison navigation that keeps users inside `/madison-al/`',
      'Empty-home utility & preparation checklist for Move-In and Move-Out appointments',
    ],
    recommendedMojoAction:
      'Enforce 100% Madison location isolation across all 13 `/madison-al/*` routes and highlight the 56-point turnover checklist for Madison relocations and property managers.',
    implementedUrls: [
      '/madison-al/',
      '/madison-al/services/recurring-residential-cleaning/',
      '/madison-al/services/move-out-cleaning/',
      '/madison-al/services/move-in-cleaning/',
      '/madison-al/checklist/',
    ],
    priority: 'P0 - Critical',
    measurementMethod:
      'Track `/madison-al/` organic landing sessions, service-pill preselection on `/madison-al/request-a-quote/`, and qualified Madison leads.',
  },
  {
    cityId: 'hampton-cove-al',
    cityName: 'Hampton Cove, AL',
    primaryServiceFocus: 'Custom Home Deep Detailing & Recurring Estate Upkeep',
    searchIntent:
      'Homeowners in Hampton Cove, McMullen Cove, and Big Cove (`35763`) with larger square footage, high ceilings, natural stone counters, and custom glass fixtures seeking meticulous, insured care.',
    targetQueries: [
      'house cleaning Hampton Cove AL',
      'deep cleaning Hampton Cove AL',
      'recurring house cleaning Hampton Cove AL',
      'custom home cleaning 35763',
    ],
    visibleCompetitors: [
      'The Valley Clean Team',
      'Rosie Cleans',
      'House Happy Cleaners',
      'Two Maids (Huntsville)',
    ],
    competitorWeaknessesVerified: [
      'National franchises treat Hampton Cove as a minor footnote on Huntsville pages.',
      'Local competitors rarely detail surface-safety protocols for custom stone, glass pendants, and multi-bathroom layouts.',
    ],
    missingCustomerInformation: [
      'Dedicated Hampton Cove website experience (`/hampton-cove-al/`)',
      'Clear explanation of how large-home layouts and unused guest suites can be customized or skipped',
    ],
    recommendedMojoAction:
      'Provide a complete 13-page `/hampton-cove-al/` experience emphasizing custom room skipping, natural stone/hardwood care, and the 47-point Deep Clean reset.',
    implementedUrls: [
      '/hampton-cove-al/',
      '/hampton-cove-al/services/deep-house-cleaning/',
      '/hampton-cove-al/services/recurring-residential-cleaning/',
      '/hampton-cove-al/checklist/',
    ],
    priority: 'P1 - High',
    measurementMethod:
      'Track organic visibility for `Hampton Cove` / `35763` queries and quote conversions originating from `/hampton-cove-al/*`.',
  },
  {
    cityId: 'owens-cross-roads-al',
    cityName: 'Owens Cross Roads, AL',
    primaryServiceFocus: 'Post-Construction Dust Removal, Move-In & Recurring Cleaning',
    searchIntent:
      'Homeowners and builders in fast-growing Owens Cross Roads (`35763`) needing multi-pass drywall dust removal after construction/renovation or ongoing recurring upkeep.',
    targetQueries: [
      'house cleaning Owens Cross Roads AL',
      'post-construction cleaning Owens Cross Roads AL',
      'move-in cleaning Owens Cross Roads AL',
      'deep cleaning Owens Cross Roads AL',
    ],
    visibleCompetitors: [
      'The Valley Clean Team',
      'Rosie Cleans',
      'Walls Cleaning Service',
      'The Maids of Huntsville',
    ],
    competitorWeaknessesVerified: [
      'Very few competitors publish a dedicated `/owens-cross-roads-al/services/post-construction-cleaning/` page explaining how fine gypsum dust is removed without scratching new glass or cabinetry.',
    ],
    missingCustomerInformation: [
      'Multi-pass HEPA vacuum + damp microfiber protocol for new builds',
      'Pre-clean readiness checklist for builders and new homeowners',
    ],
    recommendedMojoAction:
      'Position `/owens-cross-roads-al/` with strong post-construction, move-in, and recurring residential guides tailored to southeast Madison County.',
    implementedUrls: [
      '/owens-cross-roads-al/',
      '/owens-cross-roads-al/services/post-construction-cleaning/',
      '/owens-cross-roads-al/services/move-in-cleaning/',
      '/owens-cross-roads-al/services/recurring-residential-cleaning/',
    ],
    priority: 'P1 - High',
    measurementMethod:
      'Track impressions and quote requests on `/owens-cross-roads-al/*` routes.',
  },
  {
    cityId: 'athens-al',
    cityName: 'Athens, AL',
    primaryServiceFocus: 'Recurring Residential, Deep Cleaning & Move-In/Move-Out Turnovers',
    searchIntent:
      'Homeowners, landlords, and relocating families across Athens and Limestone County (`35611, 35613`) looking for a dependable, insured cleaning company with transparent checklists.',
    targetQueries: [
      'house cleaning Athens AL',
      'cleaning service Athens Alabama',
      'deep cleaning Athens AL',
      'move-out cleaning Athens AL',
    ],
    visibleCompetitors: [
      'TCL Cleaning Services',
      'Bear Brothers Cleaning',
      'The Valley Clean Team',
      'MaidPro',
      'Molly Maid',
    ],
    competitorWeaknessesVerified: [
      'Franchises bundle Athens into multi-city Decatur/Huntsville pages; older local sites lack modern mobile quote flows and answer-first FAQ hubs.',
    ],
    missingCustomerInformation: [
      'Dedicated Athens 56-point checklist and Limestone County ZIP verification (`35611, 35613`)',
      'Answer-first comparison of Standard vs. Deep vs. Move-Out cleaning for Athens homes',
    ],
    recommendedMojoAction:
      'Deliver a standalone 13-page `/athens-al/` experience with Limestone County neighborhood relevance and mobile-first quote conversion.',
    implementedUrls: [
      '/athens-al/',
      '/athens-al/services/recurring-residential-cleaning/',
      '/athens-al/services/deep-house-cleaning/',
      '/athens-al/services/move-out-cleaning/',
    ],
    priority: 'P1 - High',
    measurementMethod:
      'Track `/athens-al/` organic impressions, clicks, and Limestone County quote submissions.',
  },
];

// ============================================================================
// 3. GOOGLE BUSINESS PROFILE (GBP) AUTHORITY PROGRAM (SECTION 4)
// ============================================================================

export const GBP_AUTHORITY_PROGRAM = {
  auditDate: '2026-10-25',
  accountAccessStatus: 'requires_owner_authorization' as const,
  accountAccessNote:
    'Direct Google Business Profile dashboard access requires owner/manager authorization in Google Business Profile Manager. Do not assume website changes alone resolve any profile-level verification or suspension state.',
  verifiedNapConfiguration: {
    businessName: 'Mojo Cleaning',
    legalEntityName: 'Mojo Cleaning LLC',
    namePolicyRule:
      'Use the exact real-world business name ("Mojo Cleaning"). Never stuff cities or keywords (e.g., "Mojo Cleaning Huntsville Deep Cleaning") into the GBP business name.',
    primaryPhone: '(256) 418-8199',
    primaryWebsiteUrl: 'https://mojocleaningservice.com/',
    businessModel: 'Service-Area Business (SAB) — Mobile residential cleaning teams travel to client homes',
    addressDisplayRule:
      'Because Mojo Cleaning dispatches mobile teams to customer residences rather than serving walk-in customers at a retail storefront, configure GBP as a Service-Area Business (hide street address if no staffed customer-facing signage exists) and never create fake branch profiles in Madison, Hampton Cove, Owens Cross Roads, or Athens.',
    primaryCategory: 'House cleaning service',
    recommendedAdditionalCategories: ['Cleaning service'],
    verifiedServiceAreas: [
      'Huntsville, AL, USA',
      'Madison, AL, USA',
      'Hampton Cove, Huntsville, AL, USA',
      'Owens Cross Roads, AL, USA',
      'Athens, AL, USA',
    ],
    verifiedHours: {
      mondayToFriday: '08:00 - 18:00',
      saturday: 'By appointment (confirm exact GBP saturday toggle with owner)',
      sunday: 'Closed',
    },
  },
  statusRemediationProtocol: [
    {
      status: 'Verified & Active',
      action:
        'Audit NAP consistency, confirm primary category ("House cleaning service"), populate all 5 verified service areas, add the 5 core services with 37/47/56-point descriptions, upload authentic team-in-action photos, and respond to all reviews within 24–48 hours.',
    },
    {
      status: 'Pending Verification',
      action:
        'Complete Google’s official video or document verification showing official Mojo Cleaning LLC registration, branded equipment/uniforms, and work vehicle/dispatch readiness.',
    },
    {
      status: 'Suspended or Disabled',
      action:
        'Inspect the exact policy notice in GBP Appeals tool, ensure the business name has zero keyword stuffing, ensure the street address is hidden if operating as a residential-origin SAB, gather official Alabama LLC registration + utility/insurance documentation, and submit a single official reinstatement appeal. Never create duplicate profiles.',
    },
  ],
};

// ============================================================================
// 4. COMPLIANT CUSTOMER REVIEW & REPUTATION SYSTEM (SECTION 5)
// ============================================================================

export interface ReviewResponseTemplate {
  scenario: string;
  keyRules: string[];
  templateText: string;
}

export const COMPLIANT_REVIEW_SYSTEM = {
  compliancePrinciples: [
    'Send polite, neutral review invitations after a service is confirmed complete—never gate reviews or divert unhappy clients away from public platforms.',
    'Never offer cash, gift cards, or discounts in exchange for leaving a review.',
    'Never fabricate testimonials, star ratings, or city attributions when a reviewer’s exact location is unknown.',
    'Never inject self-serving AggregateRating schema on LocalBusiness pages where prohibited by Google Review Snippet guidelines.',
    'Protect customer privacy in public replies—never disclose home addresses, lock codes, or private billing details.',
  ],
  postServiceWorkflowSteps: [
    {
      stepNumber: 1,
      title: 'Confirm Service Completion & Quality Check',
      detail:
        'Verify the cleaning team has completed the 37-point, 47-point, or 56-point checklist and the visit is marked complete in dispatch records.',
    },
    {
      stepNumber: 2,
      title: 'Send Neutral Same-Day Follow-Up & 48-Hour Guarantee Reminder',
      detail:
        'Thank the homeowner for welcoming Mojo Cleaning into their home, remind them of the 48-Hour Happiness Guarantee if anything needs a touch-up, and provide a direct, neutral link to share honest feedback.',
    },
    {
      stepNumber: 3,
      title: 'Log Invitation & Monitor Response',
      detail:
        'Record that the review invitation was sent (max 1 polite reminder if no response) and respond personally to every published review.',
    },
    {
      stepNumber: 4,
      title: 'Feed Operational Insights Back to Cleaning Checklists',
      detail:
        'Review customer comments monthly to identify praised team habits or recurring friction points.',
    },
  ],
  responsePlaybook: [
    {
      scenario: 'Positive Review (5 Stars)',
      keyRules: [
        'Thank the customer by first name',
        'Reference the general service value (e.g., recurring care or deep clean reset) without exposing private address details',
        'Reinforce team pride',
      ],
      templateText:
        'Thank you so much, [Customer First Name]! Our team loved caring for your home, and we are thrilled that the kitchen and bathroom detailing made your week easier. Thank you for trusting Mojo Cleaning—we look forward to seeing you on your next scheduled visit!',
    },
    {
      scenario: 'Complaint About a Missed Area (48-Hour Guarantee Activation)',
      keyRules: [
        'Respond promptly and empathetically without defensiveness',
        'Immediately offer the 48-Hour Happiness Guarantee free spot re-clean',
        'Move specific scheduling logistics to direct phone/email',
      ],
      templateText:
        'Thank you for sharing this feedback, [Customer First Name]. We hold our team to a strict room-by-room checklist, and we are sorry we missed that detail during your visit. Every Mojo Cleaning appointment is backed by our 48-Hour Happiness Guarantee—we have reached out directly (or please call/text us at (256) 418-8199) so we can send our team back out to re-clean that area for you free of charge.',
    },
    {
      scenario: 'Scheduling or Arrival Window Concern',
      keyRules: [
        'Acknowledge the value of the homeowner’s time',
        'Explain how dispatch notifications are being improved',
      ],
      templateText:
        'Hi [Customer First Name], thank you for your honest feedback. We know how important reliable arrival windows are for your schedule, and we apologize for the delay on your appointment day. We have reviewed our dispatch routing for your area and would love to speak with you directly at (256) 418-8199 to make this right.',
    },
    {
      scenario: 'Pricing or Scope Misunderstanding',
      keyRules: [
        'Remain calm, respectful, and transparent',
        'Reference how 37-point Standard, 47-point Deep, and 56-point Move-Out scopes differ without arguing publicly',
      ],
      templateText:
        'Thank you for reaching out, [Customer First Name]. We always want our service scope and quote estimates to be 100% clear before we begin. Please give our management team a call at (256) 418-8199 so we can review your visit notes together and ensure you are taken care of.',
    },
  ] as ReviewResponseTemplate[],
};

// ============================================================================
// 5. GOOGLE AI OVERVIEWS & ANSWER-FIRST CUSTOMER EDUCATION (SECTIONS 6, 7 & 9)
// ============================================================================

export interface ServiceAnswerFirstGuide {
  serviceId: ServiceId;
  directAnswerSummary: string;
  preparationSteps: { step: string; detail: string }[];
  pricingFactors: { factor: string; impactExplanation: string }[];
  idealCustomerProfiles: string[];
}

export const SERVICE_ANSWER_FIRST_GUIDES: Record<ServiceId, ServiceAnswerFirstGuide> = {
  'recurring-residential-cleaning': {
    serviceId: 'recurring-residential-cleaning',
    directAnswerSummary:
      'Recurring residential cleaning with Mojo Cleaning covers our 37-point room-by-room maintenance checklist across your kitchen (24 tasks), bathrooms (17 tasks), and bedrooms/living areas (15 tasks) on a weekly, bi-weekly, or monthly schedule. We bring all supplies and equipment, allow you to skip unused rooms, and back every visit with our 48-Hour Happiness Guarantee.',
    preparationSteps: [
      {
        step: 'Clear Everyday Clutter from Countertops & Floors',
        detail:
          'Picking up mail, toys, clothing, and dishes allows our specialists to spend 100% of their time sanitizing and polishing your actual surfaces.',
      },
      {
        step: 'Secure Pets or Share Pet Instructions',
        detail:
          'Let us know where friendly pets will be resting or if certain doors should remain closed while we bring equipment in and out.',
      },
      {
        step: 'Note Any Skipped Rooms or Priority Areas',
        detail:
          'If a guest bedroom or home office is closed off, tell us in advance so we can focus on high-traffic kitchens, baths, and family rooms.',
      },
      {
        step: 'Request Eco-Friendly Supplies if Preferred',
        detail:
          'We bring all standard professional supplies automatically; just let us know if you prefer our non-toxic, eco-friendly product option.',
      },
    ],
    pricingFactors: [
      {
        factor: 'Visit Frequency (Weekly, Bi-Weekly, or Monthly)',
        impactExplanation:
          'Weekly and bi-weekly recurring schedules have lower soil buildup between visits and qualify for our best ongoing per-visit rates compared to monthly or one-time cleans.',
      },
      {
        factor: 'Active Square Footage & Bathroom Count',
        impactExplanation:
          'Kitchens and bathrooms require the highest density of sanitization checkpoints (41 of our 56 total checklist points). Skipping unused bedrooms lowers active scope.',
      },
      {
        factor: 'Pets & High-Traffic Flooring Types',
        impactExplanation:
          'Heavy pet hair or multi-level hardwood/tile staircases require additional HEPA vacuuming and damp mopping time.',
      },
    ],
    idealCustomerProfiles: [
      'Busy dual-income households and families who want weekends free from scrubbing bathrooms and mopping floors',
      'Remote professionals who want a quiet, dust-free home office and kitchen every two weeks',
      'Homeowners who want consistent maintenance after an initial 47-point Deep Clean reset',
    ],
  },
  'deep-house-cleaning': {
    serviceId: 'deep-house-cleaning',
    directAnswerSummary:
      'A Deep House Cleaning includes every task in our 37-point Standard Clean plus 10 intensive detail tasks (47 total checkpoints)—specifically hand-wiping baseboards, window blinds, ceiling fan blades, door frames, window sills, cabinet exteriors, and removing heavy bathroom soap scum and kitchen grease buildup.',
    preparationSteps: [
      {
        step: 'Clear Baseboard Perimeters & Window Sills',
        detail:
          'Moving small floor items, shoes, and decor slightly away from walls and window sills gives our team unobstructed access for hand-wiping baseboards and blinds.',
      },
      {
        step: 'Specify Optional Inside-Appliance Add-Ons',
        detail:
          'Standard 47-point deep cleans cover appliance exteriors; let us know when requesting your quote if you want inside-oven or inside-refrigerator detailing added.',
      },
      {
        step: 'Identify Delicate Stone or Specialty Finishes',
        detail:
          'Point out unsealed marble, butcher block, or specialty fixtures so our specialists apply the exact pH-neutral product required.',
      },
      {
        step: 'Confirm Entry & Parking Access',
        detail:
          'Our team arrives with full deep-detail supplies, extension dusters, and vacuums—clear driveway access speeds up setup.',
      },
    ],
    pricingFactors: [
      {
        factor: 'Time Since Last Professional Clean',
        impactExplanation:
          'Homes that have not had baseboards, blinds, and bathroom tile hand-scrubbed in 6+ months require more detail labor than recently maintained homes.',
      },
      {
        factor: 'Total Trim, Blinds & Bathroom Fixtures',
        impactExplanation:
          'Deep cleaning adds 10 vertical and high-reach detail tasks (baseboards, blinds, ceiling fans, door frames, heavy tub/tile buildup) across every active room.',
      },
      {
        factor: 'Optional Interior Appliance Add-Ons',
        impactExplanation:
          'Adding inside-oven or inside-refrigerator scrubbing is priced transparently as a line-item option.',
      },
    ],
    idealCustomerProfiles: [
      'First-time Mojo Cleaning clients kicking off a bi-weekly or monthly recurring schedule',
      'Homeowners preparing for holiday guests, family gatherings, or seasonal spring/fall resets',
      'Sellers preparing an occupied residence for real estate listing photography and showings',
    ],
  },
  'move-in-cleaning': {
    serviceId: 'move-in-cleaning',
    directAnswerSummary:
      'Move-In Cleaning covers our complete 56-point empty-home checklist—combining all 47 Deep Cleaning tasks plus 9 interior storage tasks (sanitizing inside empty kitchen cabinets, drawers, pantry shelves, bathroom vanities, medicine cabinets, and bedroom closets) before your moving boxes arrive.',
    preparationSteps: [
      {
        step: 'Schedule After the Home Is Completely Empty',
        detail:
          'Book your Move-In Clean after the previous occupant’s belongings are out and before your movers unload furniture or kitchen boxes.',
      },
      {
        step: 'Verify Electricity, Running Water & Hot Water Are Active',
        detail:
          'Our team requires active lighting, electrical outlets for HEPA vacuums, and hot running water to sanitize kitchen and bathroom interiors thoroughly.',
      },
      {
        step: 'Schedule After Any Painting or Flooring Work Finishes',
        detail:
          'Ensure painters, floor installers, or handymen have completely finished and exited so new dust does not settle on freshly sanitized shelves.',
      },
      {
        step: 'Share Lockbox, Keypad, or Realtor Access Codes',
        detail:
          'You do not need to be present on-site—simply provide your lockbox or smart-lock code and we will text you when your new home is move-in ready.',
      },
    ],
    pricingFactors: [
      {
        factor: 'Empty Status & Cabinet/Closet Volume',
        impactExplanation:
          'Our 56-point Move-In checklist includes wiping the interiors of all empty cabinets, drawers, closets, and pantry shelves.',
      },
      {
        factor: 'Previous Occupant Condition',
        impactExplanation:
          'Homes left with heavy kitchen grease, pet dander, or neglected bathrooms require additional sanitization time.',
      },
      {
        factor: 'Inside Oven & Inside Refrigerator Requests',
        impactExplanation:
          'If kitchen appliances are conveying with the home, we can include full interior appliance sanitization in your move-in quote.',
      },
    ],
    idealCustomerProfiles: [
      'Homebuyers closing on a house who want every shelf, drawer, and bathroom sanitized before unpacking',
      'Relocating families moving into a North Alabama rental home or townhome',
      'Real estate agents gifting a verified 56-point move-in clean to buyer clients at closing',
    ],
  },
  'move-out-cleaning': {
    serviceId: 'move-out-cleaning',
    directAnswerSummary:
      'Move-Out Cleaning follows our 56-point empty-home turnover checklist—cleaning inside every empty cabinet, drawer, closet, and pantry shelf, hand-wiping baseboards, blinds, ceiling fans, and door frames, and deep-sanitizing kitchens and bathrooms to satisfy landlord lease inspections and real estate closing walk-throughs.',
    preparationSteps: [
      {
        step: 'Remove All Furniture, Boxes & Personal Items First',
        detail:
          'Ensure movers have loaded all furniture and all cabinets, drawers, and closets are completely emptied before our arrival window.',
      },
      {
        step: 'Keep Electricity & Water Connected Through Cleaning Day',
        detail:
          'Do not shut off power or water until after our 56-point turnover clean and any landlord walk-through are complete.',
      },
      {
        step: 'Share Your Landlord or Property Manager Checklist',
        detail:
          'If your lease requires specific items (such as inside oven, inside refrigerator, or garage sweeping), send it with your quote request so we align your scope.',
      },
      {
        step: 'Remove Bulk Trash & Moving Debris',
        detail:
          'We remove normal cleaning trash, but large moving boxes, discarded furniture, or bulk debris should be removed prior to cleaning.',
      },
    ],
    pricingFactors: [
      {
        factor: 'Total Square Footage & Number of Baths/Kitchens',
        impactExplanation:
          'Move-out turnovers require top-to-bottom 56-point detailing across all rooms, trims, and interior cabinetry.',
      },
      {
        factor: 'Lease Inspection Add-Ons (Inside Oven / Fridge)',
        impactExplanation:
          'Many North Alabama property managers require interior oven and refrigerator cleaning for security deposit return; we include these on request.',
      },
      {
        factor: 'Overall Buildup Level',
        impactExplanation:
          'Heavy lime scale, soap scum, or grease buildup is evaluated transparently so we dispatch the right crew size to meet your move-out deadline.',
      },
    ],
    idealCustomerProfiles: [
      'Tenants vacating a rental home or townhome who want a thorough 56-point clean for their final landlord inspection',
      'Home sellers vacating prior to buyer final walk-through and closing',
      'Property managers and landlords turning over single-family rentals between tenants',
    ],
  },
  'post-construction-cleaning': {
    serviceId: 'post-construction-cleaning',
    directAnswerSummary:
      'Post-Construction and Renovation Cleaning removes fine drywall gypsum dust, sawdust, cabinet millwork residue, and builder smudges using a multi-pass HEPA vacuum and damp-microfiber detailing sequence across high ledges, light fixtures, trim, inside cabinets, bathrooms, and hard floors.',
    preparationSteps: [
      {
        step: 'Confirm All Sanding, Painting & Trade Work Is 100% Complete',
        detail:
          'Active sanding or sawing releases airborne drywall dust for hours; schedule your post-construction clean after contractors have finished and exited.',
      },
      {
        step: 'Ensure Bulk Construction Debris & Lumber Scraps Are Removed',
        detail:
          'Contractors should haul away scrap drywall, lumber, paint cans, and cardboard boxes so our specialists can focus on fine-dust removal and sanitization.',
      },
      {
        step: 'Verify Power, Lighting & Hot Water Are Operational',
        detail:
          'Full lighting is essential for spotting translucent drywall haze on cabinetry, glass, and tile.',
      },
      {
        step: 'Identify Newly Sealed Floors or Fresh Paint Curing Zones',
        detail:
          'Let us know if hardwood floors were recently site-finished or if walls were painted within the last 48 hours so we use dry/damp protocols accordingly.',
      },
    ],
    pricingFactors: [
      {
        factor: 'Scope of Renovation vs. Whole-Home New Build',
        impactExplanation:
          'A single kitchen/bath remodel is scoped differently than a full-home new build, though airborne drywall dust often migrates into adjacent rooms.',
      },
      {
        factor: 'Drywall Dust Density & High-Ceiling Fixtures',
        impactExplanation:
          'Removing fine gypsum dust without streaking requires multiple dry-vacuum and damp-microfiber passes with frequent water/cloth changes.',
      },
      {
        factor: 'Interior Cabinetry & Window Track Detailing',
        impactExplanation:
          'Sawdust inside newly installed custom kitchen and bath cabinetry and window tracks is detailed shelf-by-shelf.',
      },
    ],
    idealCustomerProfiles: [
      'Homeowners completing a kitchen remodel, bathroom renovation, or room addition',
      'Buyers moving into a newly constructed home in North Alabama growth corridors',
      'Custom home builders and remodelers needing a reliable final presentation clean before homeowner handoff',
    ],
  },
};

export interface BuyerEvaluationCriterion {
  number: string;
  question: string;
  whyItMatters: string;
  mojoStandard: string;
}

export const HOW_TO_EVALUATE_CLEANING_COMPANY: BuyerEvaluationCriterion[] = [
  {
    number: '01',
    question: 'Do they publish an exact room-by-room checklist before you book?',
    whyItMatters:
      'Vague terms like "standard clean" or "deep clean" cause frustration when a cleaner skips baseboards, ceiling fans, or cabinet interiors.',
    mojoStandard:
      'We publish our complete 37-point Standard, 47-point Deep, and 56-point Move-In/Move-Out checklists openly online—plus explicit exclusions.',
  },
  {
    number: '02',
    question: 'Are the company and its technicians insured, bonded, and background-checked?',
    whyItMatters:
      'Uninsured independent cleaners leave homeowners financially exposed to accidental surface damage or on-site liability.',
    mojoStandard:
      'Mojo Cleaning LLC is fully insured and bonded, and every cleaning specialist is vetted and background-checked prior to dispatch.',
  },
  {
    number: '03',
    question: 'Do they bring their own professional supplies, HEPA vacuums, and microfiber cloths?',
    whyItMatters:
      'Using a homeowner’s worn mop or cross-contaminating cloths between bathrooms and kitchens spreads bacteria and scratches finishes.',
    mojoStandard:
      'We bring all supplies and equipment to every appointment, use clean microfiber cloths, and offer non-toxic, eco-friendly product options on request.',
  },
  {
    number: '04',
    question: 'What happens if a checklist item is accidentally missed?',
    whyItMatters:
      'Many providers offer no recourse once the payment is processed.',
    mojoStandard:
      'Every visit is protected by our 48-Hour Happiness Guarantee: notify us within 48 hours and our team returns to re-clean the spot free of charge.',
  },
  {
    number: '05',
    question: 'Can you customize your clean or skip unused rooms without rigid contracts?',
    whyItMatters:
      'Some national franchises lock clients into rigid rotational scripts or charge for guest bedrooms that are never used.',
    mojoStandard:
      'You can customize your checklist, skip unused rooms, or adjust your weekly, bi-weekly, or monthly schedule at any time.',
  },
];

// ============================================================================
// 6. LOCAL AUTHORITY & B2B PARTNERSHIP RESOURCES (SECTION 9)
// ============================================================================

export interface LocalPartnerResource {
  id: string;
  audience: string;
  title: string;
  summary: string;
  includedDeliverables: string[];
}

export const LOCAL_PARTNERSHIP_RESOURCES: LocalPartnerResource[] = [
  {
    id: 'realtor-listing-closing-prep',
    audience: 'Real Estate Agents & Brokers',
    title: 'Pre-Listing Deep Clean & 56-Point Closing Turnover Protocol',
    summary:
      'Help sellers showcase spotless kitchens, baseboards, and glass for listing photography, or gift buyers a sanitized 56-point empty-home clean prior to move-in.',
    includedDeliverables: [
      '47-Point Pre-Listing Deep Clean for occupied homes preparing for market photos',
      '56-Point Empty-Home Move-In/Move-Out Clean including inside cabinets, drawers, and closets',
      'Direct lockbox/keypad coordination and completion confirmation for listing agents',
    ],
  },
  {
    id: 'property-manager-landlord-turnover',
    audience: 'Property Managers & Single-Family Landlords',
    title: 'Standardized 56-Point Tenant Turnover Inspection Clean',
    summary:
      'Eliminate tenant move-in complaints with a repeatable 56-point empty-property turnover standard across Huntsville, Madison, Hampton Cove, Owens Cross Roads, and Athens.',
    includedDeliverables: [
      'Full interior cabinet, drawer, closet, and pantry sanitization between leases',
      'Optional interior oven and refrigerator detailing for lease compliance',
      'Backed by our 48-Hour Happiness Guarantee for property manager walk-throughs',
    ],
  },
  {
    id: 'builder-remodeler-handoff',
    audience: 'Custom Builders & Remodeling Contractors',
    title: 'Post-Construction Fine-Dust Removal & Homeowner Handoff Clean',
    summary:
      'Turn dusty job sites into move-in-ready residences with our multi-pass HEPA vacuum and damp-microfiber detailing sequence.',
    includedDeliverables: [
      'Drywall gypsum dust removal from high ledges, vents, fans, and millwork',
      'Sawdust extraction from inside newly installed kitchen and bath cabinetry',
      'Safe fixture, mirror, and glass polishing without scratching new surfaces',
    ],
  },
];

// ============================================================================
// 7. AI-SEARCH VISIBILITY BASELINE & MEASUREMENT DASHBOARD SPEC (SECTION 11)
// ============================================================================

export interface AiSearchBaselineEntry {
  query: string;
  dateTested: string;
  platform: 'Google Search / AI Overviews' | 'Bing / Microsoft Copilot';
  marketLocation: string;
  aiAnswerObserved: boolean;
  competitorsMentionedInSerpOrSummary: string[];
  mojoTargetCitationUrl: string;
  answerReadinessStatus: 'implemented_on_site';
  notes: string;
}

export const AI_SEARCH_VISIBILITY_BASELINE: AiSearchBaselineEntry[] = [
  {
    query: 'What is included in a deep house cleaning in Huntsville AL?',
    dateTested: '2026-10-25',
    platform: 'Google Search / AI Overviews',
    marketLocation: 'Huntsville, AL',
    aiAnswerObserved: true,
    competitorsMentionedInSerpOrSummary: [
      'Two Maids (Huntsville)',
      'The Cleaning Authority - Huntsville',
      'Bear Brothers Cleaning',
    ],
    mojoTargetCitationUrl: 'https://mojocleaningservice.com/huntsville-al/services/deep-house-cleaning/',
    answerReadinessStatus: 'implemented_on_site',
    notes:
      'Page now leads with a direct 47-point answer summary comparing Standard (37-point) vs. Deep (47-point) tasks plus explicit exclusions and pricing factors.',
  },
  {
    query: 'What is the difference between standard cleaning and deep cleaning?',
    dateTested: '2026-10-25',
    platform: 'Google Search / AI Overviews',
    marketLocation: 'North Alabama (Huntsville / Madison)',
    aiAnswerObserved: true,
    competitorsMentionedInSerpOrSummary: ['Molly Maid', 'The Cleaning Authority'],
    mojoTargetCitationUrl: 'https://mojocleaningservice.com/huntsville-al/checklist/',
    answerReadinessStatus: 'implemented_on_site',
    notes:
      'Every location checklist page (`/{loc}/checklist/`) and services hub (`/{loc}/services/`) presents a structured 37 vs. 47 vs. 56-point comparison table in crawlable HTML.',
  },
  {
    query: 'What is included in move-out cleaning in Madison AL?',
    dateTested: '2026-10-25',
    platform: 'Google Search / AI Overviews',
    marketLocation: 'Madison, AL',
    aiAnswerObserved: true,
    competitorsMentionedInSerpOrSummary: ['Rocket Maids', 'MaidPro', 'Molly Maid'],
    mojoTargetCitationUrl: 'https://mojocleaningservice.com/madison-al/services/move-out-cleaning/',
    answerReadinessStatus: 'implemented_on_site',
    notes:
      'Includes answer-first 56-point turnover summary, 9 empty-cabinet/closet checkpoints, and landlord walk-through preparation checklist.',
  },
  {
    query: 'House cleaning Hampton Cove and Owens Cross Roads AL',
    dateTested: '2026-10-25',
    platform: 'Bing / Microsoft Copilot',
    marketLocation: 'Southeast Madison County, AL (35763)',
    aiAnswerObserved: true,
    competitorsMentionedInSerpOrSummary: [
      'The Valley Clean Team',
      'Rosie Cleans',
      'Two Maids (Huntsville)',
    ],
    mojoTargetCitationUrl: 'https://mojocleaningservice.com/hampton-cove-al/',
    answerReadinessStatus: 'implemented_on_site',
    notes:
      'Dedicated `/hampton-cove-al/` and `/owens-cross-roads-al/` isolated hubs provide specific 35763 ZIP verification, custom-home and post-construction guides.',
  },
  {
    query: 'House cleaning services Athens AL',
    dateTested: '2026-10-25',
    platform: 'Google Search / AI Overviews',
    marketLocation: 'Athens / Limestone County, AL',
    aiAnswerObserved: true,
    competitorsMentionedInSerpOrSummary: [
      'TCL Cleaning Services',
      'Bear Brothers Cleaning',
      'MaidPro',
      'Molly Maid',
    ],
    mojoTargetCitationUrl: 'https://mojocleaningservice.com/athens-al/',
    answerReadinessStatus: 'implemented_on_site',
    notes:
      'Dedicated `/athens-al/` 13-page isolated experience serving 35611 and 35613.',
  },
];

export const MEASUREMENT_AND_MONTHLY_REVIEW_CADENCE = {
  requiredExternalIntegrations: [
    {
      system: 'Google Search Console (GSC)',
      status: 'requires_owner_dns_or_html_verification',
      purpose:
        'Submit https://mojocleaningservice.com/sitemap.xml (69 indexable routes), monitor index coverage, and track impressions, clicks, CTR, and average position by location prefix (`/huntsville-al/`, `/madison-al/`, `/hampton-cove-al/`, `/owens-cross-roads-al/`, `/athens-al/`).',
    },
    {
      system: 'Google Analytics 4 (GA4) / Lead Attribution',
      status: 'on_site_attribution_active_ga4_tag_optional',
      purpose:
        'On-site ERP boundary (`src/erp/service-boundary.ts`) already captures `landingPage`, `locationId`, `serviceId`, `utm_source`, `utm_medium`, `utm_campaign`, and quote reference IDs on every quote submission.',
    },
    {
      system: 'Google Business Profile Insights',
      status: 'requires_owner_gbp_access',
      purpose:
        'Track monthly GBP calls, website clicks, direction/service-area impressions, review growth, and 100% review response coverage.',
    },
  ],
  monthlyReviewChecklist: [
    '1. Compare GSC impressions and clicks across all 5 isolated location prefixes (`/huntsville-al/`, `/madison-al/`, `/hampton-cove-al/`, `/owens-cross-roads-al/`, `/athens-al/`).',
    '2. Identify high-impression, low-CTR service pages and refine `<title>` / `<meta name="description">` based on real query phrasing.',
    '3. Compare quote form conversion rates by landing page and preselected service tier.',
    '4. Audit Google Business Profile status, Q&A, new customer reviews, and competitor review velocity across the 5 target cities.',
    '5. Review new customer questions from phone/text/form inquiries and add verified answers to the relevant location FAQ and service pages.',
    '6. Re-run `npm run build` and `npm run qa` (16-Point SEO Quality Gate + Playwright E2E suite) before publishing any content update.',
  ],
};
