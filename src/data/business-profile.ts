/**
 * PHASE 1 & PHASE 5 — VERIFIED BUSINESS PROFILE & SOURCE RECORD
 * Every fact in this module has been audited against the live official website
 * (https://mojocleaningservice.com/), its route bundles, and its active CRM configuration.
 */

import type { FaqEntity, ReviewEntity, VerifiedFact } from './entities';

export interface BusinessProfileRecord {
  businessName: VerifiedFact<string>;
  legalName: VerifiedFact<string>;
  domain: VerifiedFact<string>;
  preferredHostname: VerifiedFact<string>;
  telephoneDisplay: VerifiedFact<string>;
  telephoneHref: VerifiedFact<string>;
  telephoneE164: VerifiedFact<string>;
  email: VerifiedFact<string>;
  emailHref: VerifiedFact<string>;
  operatingAddressPolicy: VerifiedFact<string>;
  primaryCity: VerifiedFact<string>;
  primaryState: VerifiedFact<string>;
  primaryCounty: VerifiedFact<string>;
  businessHours: VerifiedFact<{
    weekdays: string;
    saturday: string;
    sunday: string;
    schemaOpeningHours: string[];
  }>;
  verifiedServices: VerifiedFact<string[]>;
  verifiedServiceAreas: VerifiedFact<string[]>;
  quoteFormIntegration: VerifiedFact<{
    provider: string;
    formId: string;
    formName: string;
    embedUrl: string;
    scriptUrl: string;
    prefillQueryKeys: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      cleaningType: string;
    };
  }>;
  guaranteesAndPolicies: VerifiedFact<{
    happinessGuaranteeHours: number;
    happinessGuaranteeTitle: string;
    happinessGuaranteePolicy: string;
    insuredAndBonded: boolean;
    backgroundCheckedStaff: boolean;
    suppliesAndEquipmentProvided: boolean;
    ecoFriendlyAvailableOnRequest: boolean;
    customizableRoomChecklist: boolean;
  }>;
  socialProfiles: VerifiedFact<string[]>;
  aggregateRatingClaim: VerifiedFact<null>;
  legacyUrlPreservation: VerifiedFact<
    {
      legacyPath: string;
      destinationPath: string;
      reason: string;
    }[]
  >;
}

export const VERIFIED_BUSINESS_PROFILE: BusinessProfileRecord = {
  businessName: {
    value: 'Mojo Cleaning',
    status: 'verified',
    source: 'https://mojocleaningservice.com/ (Header, Hero, Title, Footer)',
    verifiedDate: '2026-10-25',
  },
  legalName: {
    value: 'Mojo Cleaning LLC',
    status: 'verified',
    source: 'https://mojocleaningservice.com/privacy-policy & /terms-and-conditions',
    verifiedDate: '2026-10-25',
  },
  domain: {
    value: 'https://mojocleaningservice.com',
    status: 'verified',
    source: 'Live HTTPS production origin behind Cloudflare CDN',
    verifiedDate: '2026-10-25',
  },
  preferredHostname: {
    value: 'mojocleaningservice.com',
    status: 'verified',
    source: 'Canonical link tag on https://mojocleaningservice.com/',
    verifiedDate: '2026-10-25',
  },
  telephoneDisplay: {
    value: '(256) 418-8199',
    status: 'verified',
    source: 'https://mojocleaningservice.com/ & /Contact_us & /privacy-policy',
    verifiedDate: '2026-10-25',
    notes: 'Supports both voice calls and SMS text inquiries.',
  },
  telephoneHref: {
    value: 'tel:+12564188199',
    status: 'verified',
    source: 'https://mojocleaningservice.com/',
    verifiedDate: '2026-10-25',
  },
  telephoneE164: {
    value: '+1-256-418-8199',
    status: 'verified',
    source: 'https://mojocleaningservice.com/',
    verifiedDate: '2026-10-25',
  },
  email: {
    value: 'hello@mojocleaningservice.com',
    status: 'verified',
    source: 'https://mojocleaningservice.com/ & /Contact_us & /privacy-policy',
    verifiedDate: '2026-10-25',
  },
  emailHref: {
    value: 'mailto:hello@mojocleaningservice.com',
    status: 'verified',
    source: 'https://mojocleaningservice.com/',
    verifiedDate: '2026-10-25',
  },
  operatingAddressPolicy: {
    value:
      'Operates as an on-site residential Service-Area Business (SAB) based in Huntsville, Alabama. No public walk-in street address is published; teams travel directly to customer homes.',
    status: 'verified',
    source: 'https://mojocleaningservice.com/privacy-policy ("Huntsville, Alabama")',
    verifiedDate: '2026-10-25',
    notes: 'Per strict accuracy rules, no street address is invented.',
  },
  primaryCity: {
    value: 'Huntsville',
    status: 'verified',
    source: 'https://mojocleaningservice.com/',
    verifiedDate: '2026-10-25',
  },
  primaryState: {
    value: 'Alabama',
    status: 'verified',
    source: 'https://mojocleaningservice.com/',
    verifiedDate: '2026-10-25',
  },
  primaryCounty: {
    value: 'Madison County',
    status: 'verified',
    source: 'https://mojocleaningservice.com/ ("Huntsville, Madison, and surrounding Madison County areas")',
    verifiedDate: '2026-10-25',
  },
  businessHours: {
    value: {
      weekdays: 'Monday – Friday: 8:00 AM – 6:00 PM',
      saturday: 'Saturday: Cleaning by appointment',
      sunday: 'Sunday: Closed',
      schemaOpeningHours: ['Mo-Fr 08:00-18:00'],
    },
    status: 'verified',
    source: 'https://mojocleaningservice.com/Contact_us (routes-DMe07cbf.js)',
    verifiedDate: '2026-10-25',
  },
  verifiedServices: {
    value: [
      'Recurring Cleaning',
      'Deep Cleaning',
      'Move-In Cleaning',
      'Move-Out Cleaning',
      'Post-Construction Cleaning',
    ],
    status: 'verified',
    source: 'https://mojocleaningservice.com/ & /cleaning-checklist',
    verifiedDate: '2026-10-25',
  },
  verifiedServiceAreas: {
    value: [
      'Huntsville, AL',
      'Madison, AL',
      'Hampton Cove, AL',
      'Owens Cross Roads, AL',
      'Athens, AL',
    ],
    status: 'verified',
    source: 'https://mojocleaningservice.com/ (Hero, About, Service Areas, Meta Description)',
    verifiedDate: '2026-10-25',
  },
  quoteFormIntegration: {
    value: {
      provider: 'LeadConnector / GoHighLevel',
      formId: 'LMshydq3SzEFJgOrXehA',
      formName: 'Mojo WebSite Form Template',
      embedUrl: 'https://api.leadconnectorhq.com/widget/form/LMshydq3SzEFJgOrXehA',
      scriptUrl: 'https://link.msgsndr.com/js/form_embed.js',
      prefillQueryKeys: {
        firstName: 'name',
        lastName: 'last_name',
        phone: 'phone',
        email: 'email',
        cleaningType: 'type_of_cleaning_(meta)',
      },
    },
    status: 'verified',
    source: 'https://mojocleaningservice.com/assets/GhlFormEmbed-DtbQJ0Wg.js',
    verifiedDate: '2026-10-25',
  },
  guaranteesAndPolicies: {
    value: {
      happinessGuaranteeHours: 48,
      happinessGuaranteeTitle: '48-Hour Happiness Guarantee',
      happinessGuaranteePolicy:
        'If any area on your checklist is missed or you are not completely satisfied, contact Mojo Cleaning within 48 hours of service completion and our team will return to re-clean the affected area at no extra cost.',
      insuredAndBonded: true,
      backgroundCheckedStaff: true,
      suppliesAndEquipmentProvided: true,
      ecoFriendlyAvailableOnRequest: true,
      customizableRoomChecklist: true,
    },
    status: 'verified',
    source: 'https://mojocleaningservice.com/ & /cleaning-checklist & /terms-and-conditions',
    verifiedDate: '2026-10-25',
  },
  socialProfiles: {
    value: [],
    status: 'needs_verification',
    source: 'Audited https://mojocleaningservice.com/ HTML & JS bundles; no social URLs linked on official site',
    verifiedDate: '2026-10-25',
    notes: 'Omitted from footer and Schema sameAs until official profile URLs are confirmed by owner.',
  },
  aggregateRatingClaim: {
    value: null,
    status: 'needs_verification',
    source: 'Official site publishes 3 verified client testimonials but no third-party review count',
    verifiedDate: '2026-10-25',
    notes: 'No AggregateRating schema or unverified review count is published.',
  },
  legacyUrlPreservation: {
    value: [
      {
        legacyPath: '/cleaning-checklist',
        destinationPath: '/huntsville-al/checklist/',
        reason: 'Preserves search equity and bookmarks from previous /cleaning-checklist route',
      },
      {
        legacyPath: '/Contact_us',
        destinationPath: '/huntsville-al/contact/',
        reason: 'Normalizes legacy mixed-case /Contact_us route to canonical Huntsville contact page',
      },
      {
        legacyPath: '/terms-and-conditions',
        destinationPath: '/terms/',
        reason: 'Preserves legacy /terms-and-conditions URL while supporting canonical /terms/',
      },
      {
        legacyPath: '/about/',
        destinationPath: '/huntsville-al/about/',
        reason: 'Migrates legacy global /about/ route to primary Huntsville location experience',
      },
      {
        legacyPath: '/services/',
        destinationPath: '/huntsville-al/services/',
        reason: 'Migrates legacy global /services/ route to primary Huntsville location experience',
      },
      {
        legacyPath: '/reviews/',
        destinationPath: '/huntsville-al/reviews/',
        reason: 'Migrates legacy global /reviews/ route to primary Huntsville location experience',
      },
      {
        legacyPath: '/faqs/',
        destinationPath: '/huntsville-al/faqs/',
        reason: 'Migrates legacy global /faqs/ route to primary Huntsville location experience',
      },
      {
        legacyPath: '/contact/',
        destinationPath: '/huntsville-al/contact/',
        reason: 'Migrates legacy global /contact/ route to primary Huntsville location experience',
      },
    ],
    status: 'verified',
    source: 'https://mojocleaningservice.com/assets/routes-DMe07cbf.js',
    verifiedDate: '2026-10-25',
  },
};

export const VERIFIED_REVIEWS: ReviewEntity[] = [
  {
    id: 'review-sarah-madison',
    author: 'Sarah M.',
    locationLabel: 'Madison, AL',
    locationId: 'madison-al',
    serviceLabel: 'Bi-Weekly Recurring Clean',
    serviceId: 'recurring-residential-cleaning',
    quote:
      'Mojo Cleaning has been a lifesaver for our family in Madison. Walking in on Friday afternoon to a pristine, fresh home is truly the best feeling all week!',
    sourceLabel: 'Published Client Testimonial on mojocleaningservice.com',
    sourceUrl: 'https://mojocleaningservice.com/',
    verificationStatus: 'verified',
  },
  {
    id: 'review-david-huntsville',
    author: 'David L.',
    locationLabel: 'Huntsville, AL',
    locationId: 'huntsville-al',
    serviceLabel: 'Pre-Listing Deep Clean',
    serviceId: 'deep-house-cleaning',
    quote:
      'We booked a deep clean prior to listing our house. They got into every corner and the baseboards looked brand new. Super friendly and punctual.',
    sourceLabel: 'Published Client Testimonial on mojocleaningservice.com',
    sourceUrl: 'https://mojocleaningservice.com/',
    verificationStatus: 'verified',
  },
  {
    id: 'review-jessica-south-huntsville',
    author: 'Jessica T.',
    locationLabel: 'South Huntsville, AL',
    locationId: 'huntsville-al',
    serviceLabel: 'Recurring Residential Clean',
    serviceId: 'recurring-residential-cleaning',
    quote:
      'I love that they offer eco-friendly supplies since we have two dogs. Their 48-hour guarantee gives complete peace of mind, though we never needed it!',
    sourceLabel: 'Published Client Testimonial on mojocleaningservice.com',
    sourceUrl: 'https://mojocleaningservice.com/',
    verificationStatus: 'verified',
  },
];

export const REAL_TEAM_ACTION_GALLERY = [
  {
    id: 'pendant-care',
    title: 'Fixture & Glass Pendant Detailing',
    caption: 'Hand-polishing glass kitchen pendant lighting and overhead fixtures.',
    image: '/images/team-pendant-care.jpg',
    webp: '/images/team-pendant-care.webp',
    webpMobile: '/images/team-pendant-care-640w.webp',
    alt: 'Mojo Cleaning specialist hand-polishing a glass pendant light fixture above a kitchen island in Huntsville, AL',
    width: 960,
    height: 1280,
  },
  {
    id: 'living-room-team',
    title: 'Coordinated Multi-Specialist Care',
    caption: 'Two vetted specialists working systematically through open-concept living and kitchen zones.',
    image: '/images/team-living-room.jpg',
    webp: '/images/team-living-room.webp',
    webpMobile: '/images/team-living-room-640w.webp',
    alt: 'Two Mojo Cleaning specialists vacuuming an area rug and wiping a waterfall marble kitchen island in a Huntsville home',
    width: 960,
    height: 1280,
  },
  {
    id: 'cabinet-detail',
    title: 'Base Cabinetry & Interior Scrubbing',
    caption: 'Detailed interior and exterior cabinet care for deep and move-in/move-out resets.',
    image: '/images/team-cabinet-detail.jpg',
    webp: '/images/team-cabinet-detail.webp',
    webpMobile: '/images/team-cabinet-detail-640w.webp',
    alt: 'Mojo Cleaning team member detailing the interior shelves of dark wood kitchen base cabinets',
    width: 960,
    height: 1280,
  },
  {
    id: 'post-construction-care',
    title: 'Post-Construction & Appliance Detailing',
    caption: 'Removing fine drywall dust from cabinetry, stainless appliances, and newly installed floors.',
    image: '/images/team-post-construction.jpg',
    webp: '/images/team-post-construction.webp',
    webpMobile: '/images/team-post-construction-640w.webp',
    alt: 'Mojo Cleaning specialist detailing newly installed kitchen cabinets and stainless steel refrigerator after renovation',
    width: 960,
    height: 1280,
  },
];

export const GENERAL_BUSINESS_FAQS: FaqEntity[] = [
  {
    id: 'faq-gen-cost-huntsville',
    question: 'How much does house cleaning cost in Huntsville, AL?',
    answer:
      'House cleaning prices in Huntsville and our surrounding North Alabama service areas are customized to your home rather than a one-size-fits-all flat fee. Your quote is based on your home’s square footage, number of bedrooms and bathrooms, current condition, the service tier selected (37-point Recurring, 47-point Deep Cleaning, 56-point Move-In/Move-Out, or Post-Construction), your visit frequency (weekly, biweekly, or monthly), and any optional add-ons like inside-oven or inside-refrigerator cleaning.',
    category: 'pricing_booking',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-deep-included',
    question: 'What is included in a deep house cleaning?',
    answer:
      'Our 47-point Deep House Cleaning includes all 37 tasks from our Standard Maintenance checklist (sanitizing kitchen countertops, backsplash, microwave inside/out, stovetop, appliance exteriors, sinks, showers, tubs, toilets, mirrors, dusting, and vacuuming/mopping all floors) plus 10 intensive hand-detailing tasks: hand-wiping baseboards, interior doors and door frames, kitchen and bathroom cabinet exteriors, light switch plates, ceiling fan blades, window sills, and scrubbing bathroom tile grout and kitchen grease buildup.',
    category: 'service',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-standard-vs-deep',
    question: 'What is the difference between regular cleaning and deep cleaning?',
    answer:
      'Regular (Standard Recurring) cleaning covers 37 essential maintenance tasks designed to keep kitchens, bathrooms, living spaces, and floors consistently fresh on a weekly, biweekly, or monthly schedule. Deep cleaning expands the scope to 47 tasks by adding top-to-bottom hand-detailing—including hand-wiping baseboards, exterior kitchen and vanity cabinet doors, interior doors and frames, switch plates, and removing heavier soap scum and cooking film.',
    category: 'service',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-frequency',
    question: 'How often should I schedule house cleaning?',
    answer:
      'Most families with children, pets, or busy work commutes choose biweekly (every two weeks) house cleaning to keep bathrooms sanitized and dust and allergens controlled. High-traffic households and homes with multiple pets often prefer weekly service, while smaller or low-traffic households frequently choose monthly recurring maintenance after an initial 47-point Deep Clean reset.',
    category: 'service',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-moveout-included',
    question: 'What does move-out cleaning include?',
    answer:
      'Our 56-point Move-Out Cleaning (and Move-In Cleaning) covers every task in our 47-point Deep Clean plus 9 empty-home interior tasks: vacuuming and wet-wiping inside all kitchen cabinets, drawers, and pantry shelves, cleaning inside the oven and inside the refrigerator/freezer, sanitizing inside bathroom vanities and medicine cabinets, wiping bedroom closet shelves, and wet-wiping window blinds and shutters. We also provide itemized completion receipts for landlords, property managers, and real estate closings.',
    category: 'service',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-prep-before-appointment',
    question: 'What should I do before a cleaning appointment?',
    answer:
      'For recurring or deep cleaning visits, simply pick up everyday surface clutter (such as mail, toys, and clothing) from floors and countertops so our specialists can dedicate 100% of their time to scrubbing and sanitizing surfaces, and share any pet or keypad access instructions. For Move-In, Move-Out, or Post-Construction cleans, ensure the property is vacant of furniture/debris and that electricity and hot running water remain turned on.',
    category: 'general',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-how-to-quote',
    question: 'How do I request a house cleaning quote?',
    answer:
      'You can request a custom house cleaning estimate in under two minutes using the online quote form on any page of our website, or by calling or texting our local scheduling team at (256) 418-8199. Share your city or ZIP code, approximate home size, bedroom/bathroom count, and preferred service tier, and we will follow up promptly with transparent pricing.',
    category: 'pricing_booking',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-areas-served',
    question: 'What areas does Mojo Cleaning serve?',
    answer:
      'Mojo Cleaning serves five verified residential service areas across Madison County and Limestone County in North Alabama: Huntsville, AL (35801, 35802, 35803, 35805, 35806, 35810, 35811), Madison, AL (35756, 35757, 35758), Hampton Cove, AL (35763), Owens Cross Roads, AL (35763), and Athens, AL (35611, 35613).',
    category: 'location',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-family-owned',
    question: 'Is Mojo Cleaning family-owned?',
    answer:
      'Mojo Cleaning LLC is a locally operated residential cleaning company headquartered in Huntsville, Alabama—not an out-of-state corporate franchise. Every client communicates directly with our local North Alabama team, and every appointment is backed by personal accountability and our 48-Hour Happiness Guarantee. (Specific founder or family biography details are published only upon direct owner verification.)',
    category: 'guarantee_trust',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-offers-recurring',
    question: 'Does Mojo Cleaning offer recurring house cleaning?',
    answer:
      'Yes. We offer flexible weekly, biweekly (every two weeks), and monthly recurring house cleaning across all five of our North Alabama service areas with no long-term contracts required. Each visit follows our 37-point maintenance checklist and can be customized to prioritize the rooms your household uses most.',
    category: 'service',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-supplies',
    question: 'Do I need to provide cleaning supplies or vacuum equipment?',
    answer:
      'No. Mojo Cleaning brings all professional-grade cleaning products, sanitized microfiber cloths, mops, and HEPA-filter vacuums to every appointment. If you have a specialty stone surface product or prefer eco-friendly, pet-safe solutions, simply let us know and we will gladly accommodate.',
    category: 'general',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-home-during-clean',
    question: 'Do I need to be home while Mojo Cleaning services my house?',
    answer:
      'Not at all. Most of our clients provide a keypad code, smart lock access, or lockbox instructions so they can return to a freshly cleaned home. You are also completely welcome to remain at home while we work.',
    category: 'general',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-guarantee',
    question: 'How does the 48-Hour Happiness Guarantee work?',
    answer:
      'Your peace of mind is built into every visit. If any task on your cleaning checklist was overlooked or does not meet your expectations, call, text, or email us within 48 hours of your appointment and our team will return to re-clean the affected area at no extra charge.',
    category: 'guarantee_trust',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-insured-vetted',
    question: 'Are your cleaners insured, bonded, and background-checked?',
    answer:
      'Yes. Mojo Cleaning LLC is fully insured and bonded, and every cleaning specialist undergoes background screening and structured training on our 56-point room-by-room checklist before entering client homes.',
    category: 'guarantee_trust',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-pets',
    question: 'What if I have dogs, cats, or pet-safe product preferences?',
    answer:
      'We love pets and care for many pet-friendly households across our North Alabama service areas. Just note your pets’ names and any gate/crate instructions in your quote request, and ask for our non-toxic, eco-friendly product line if you prefer gentler formulas.',
    category: 'general',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-reschedule',
    question: 'What is your rescheduling or cancellation policy?',
    answer:
      'Life happens—if you need to reschedule or cancel an upcoming visit, we ask for at least 24 to 48 hours’ advance notice by phone, text, or email so we can adjust our dispatch schedule smoothly.',
    category: 'pricing_booking',
    publicationStatus: 'published',
  },
  {
    id: 'faq-gen-custom-checklist',
    question: 'Can I customize which rooms or tasks are included in my clean?',
    answer:
      'Yes. While our 56-point checklist sets a thorough baseline across kitchens, bathrooms, bedrooms, and living areas, every cleaning plan is 100% customizable. You can skip unused guest rooms, prioritize high-traffic kitchens, or add specialty interior tasks.',
    category: 'general',
    publicationStatus: 'published',
  },
];
