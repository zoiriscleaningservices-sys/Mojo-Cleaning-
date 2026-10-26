export interface ServiceItem {
  id: 'recurring' | 'deep' | 'move-in-out' | 'post-construction';
  number: string;
  badge: string;
  tag: string;
  name: string;
  shortName: string;
  ghlOptionValue: string;
  summary: string;
  benefit: string;
  frequencyNote: string;
  highlights: string[];
  image: {
    webp640: string;
    webp1280: string;
    jpg: string;
    alt: string;
    width: number;
    height: number;
  };
  ctaLabel: string;
}

export interface ChecklistTask {
  task: string;
  standard: boolean;
  deep: boolean;
  moveInOut: boolean;
  addOnNote?: string;
}

export interface ChecklistRoom {
  id: 'kitchen' | 'bathrooms' | 'bedrooms';
  name: string;
  count: number;
  summary: string;
  tasks: ChecklistTask[];
}

export interface BenefitPillar {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: 'shield' | 'userCheck' | 'clock' | 'sparkles' | 'leaf' | 'sliders';
}

export interface TeamActionPhoto {
  id: string;
  title: string;
  caption: string;
  webp640: string;
  webp1080: string;
  jpg: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
  iconName: 'home' | 'clipboard' | 'sparkle';
}

export interface VerifiedTestimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  serviceType: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface ServiceAreaCommunity {
  name: string;
  countyOrRegion: string;
  description: string;
  zipExamples: string;
  isPrimary?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Services & Supplies' | 'Scheduling & Quotes' | 'Trust & Policies';
}

export const BUSINESS_INFO = {
  name: 'Mojo Cleaning',
  legalName: 'Mojo Cleaning LLC',
  tagline: 'A Clean Home. A Good Mood.',
  heroHeadline: 'Come home to a good mood.',
  domain: 'https://mojocleaningservice.com',
  canonicalUrl: 'https://mojocleaningservice.com/',
  phoneDisplay: '(256) 418-8199',
  phoneRaw: '+12564188199',
  phoneHref: 'tel:+12564188199',
  smsHref: 'sms:+12564188199',
  email: 'hello@mojocleaningservice.com',
  emailHref: 'mailto:hello@mojocleaningservice.com',
  primaryCity: 'Huntsville',
  primaryState: 'Alabama',
  primaryStateCode: 'AL',
  primaryRegionLabel: 'Huntsville & Madison County, AL',
  isServiceAreaBusiness: true, // Verified: operates as a service-area business without a public retail storefront
  officeHours: {
    weekdays: 'Mon – Fri: 8:00 AM – 6:00 PM',
    saturday: 'Saturday cleaning by appointment',
    sunday: 'Closed Sundays',
  },
  ghlIntegration: {
    formId: 'LMshydq3SzEFJgOrXehA',
    formName: 'Golden Grove Website Form',
    widgetUrl: 'https://api.leadconnectorhq.com/widget/form/LMshydq3SzEFJgOrXehA',
    embedScriptUrl: 'https://link.msgsndr.com/js/form_embed.js',
  },
  googleMaps: {
    // Centered on verified Huntsville & Madison County, AL service area
    embedUrl:
      'https://www.google.com/maps?q=Huntsville,+AL&z=11&output=embed',
    externalUrl:
      'https://www.google.com/maps/place/Huntsville,+AL/',
    coordinates: {
      latitude: 34.7304,
      longitude: -86.5861,
    },
  },
  verifiedClaims: [
    'Insured & Bonded Residential Cleaning',
    '48-Hour Happiness Guarantee',
    'Vetted, Background-Checked Team',
    'All Supplies & Equipment Provided',
    'Eco-Friendly, Pet-Safe Options Available on Request',
    'Customizable 56-Point Room-by-Room Checklists',
  ],
} as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'recurring',
    number: '01',
    badge: 'Keep the good mood going',
    tag: 'Most Popular',
    name: 'Recurring Cleaning',
    shortName: 'Recurring Cleaning',
    ghlOptionValue: 'Recurring House Cleaning',
    summary:
      'Consistent, dependable upkeep for your kitchen, bathrooms, bedrooms, and living areas—available on a weekly, bi-weekly, or monthly schedule.',
    benefit:
      'Takes routine scrubbing and dusting off your weekend to-do list so your home feels welcoming every single week.',
    frequencyNote: 'Confirmed scheduling options: Weekly, Bi-Weekly, or Monthly visits.',
    highlights: [
      'Kitchen countertops, backsplash, stovetop, sink & inside/outside microwave',
      'Bathroom mirrors, showers, tubs, sinks, toilets & floor sanitization',
      'Dusting ceiling fans, furniture, lamps, window sills & ledges',
      'Vacuuming carpets/rugs, sweeping & mopping hard floors, and making beds',
    ],
    image: {
      webp640: '/images/team-living-room-640w.webp',
      webp1280: '/images/team-living-room.webp',
      jpg: '/images/team-living-room.jpg',
      alt: 'Bright, freshly cleaned living room in a Huntsville home maintained with recurring cleaning service',
      width: 1280,
      height: 714,
    },
    ctaLabel: 'Request Recurring Quote',
  },
  {
    id: 'deep',
    number: '02',
    badge: 'A little extra love',
    tag: 'Seasonal & First-Visit Reset',
    name: 'Deep Cleaning',
    shortName: 'Deep Cleaning',
    ghlOptionValue: 'Deep Cleaning',
    summary:
      'An intensive, top-to-bottom refresh designed for areas that accumulate built-up dust, grease, and everyday wear over time.',
    benefit:
      'Restores neglected woodwork, tile grout, cabinet fronts, and fixtures—ideal for seasonal resets, hosting, or your first Mojo visit.',
    frequencyNote: 'Includes all 37 Standard Checklist items plus 10 intensive detail tasks.',
    highlights: [
      'Hand-wiping baseboards, doors, door frames, window sills & window frames',
      'Cleaning all kitchen cabinet fronts, hardware pulls, and oven hood vent',
      'Scrubbing bathroom tile grout and disinfecting all light switches & door knobs',
      'Optional inside-oven and inside-refrigerator detailing available upon request',
    ],
    image: {
      webp640: '/images/team-pendant-care-640w.webp',
      webp1280: '/images/team-pendant-care.webp',
      jpg: '/images/team-pendant-care.jpg',
      alt: 'Sparkling master bathroom with spotless glass shower, brass fixtures, and marble vanity after a deep clean',
      width: 1280,
      height: 714,
    },
    ctaLabel: 'Request Deep Clean Quote',
  },
  {
    id: 'move-in-out',
    number: '03',
    badge: 'On to your next chapter',
    tag: 'Turnkey Transition',
    name: 'Move-In & Move-Out Cleaning',
    shortName: 'Move-In / Move-Out',
    ghlOptionValue: 'Move In/Move Out Cleaning',
    summary:
      'Our complete 56-point empty-home reset covering inside appliances, cabinetry, drawers, closets, pantries, and window blinds.',
    benefit:
      'Helps sellers, tenants, and new homeowners hand over keys with confidence or unpack into a truly fresh, sanitized space.',
    frequencyNote: 'Includes all Standard & Deep Clean items plus 9 full-interior transition tasks.',
    highlights: [
      'Full interior cleaning of refrigerator, oven, kitchen cabinets & drawers',
      'Sweeping pantry floors and wiping down pantry & closet shelving',
      'Inside bathroom vanities and medicine cabinets cleaned and sanitized',
      'Wet-wiping window blinds, shutters, doors, frames, and baseboards throughout',
    ],
    image: {
      webp640: '/images/team-cabinet-detail-640w.webp',
      webp1280: '/images/team-cabinet-detail.webp',
      jpg: '/images/team-cabinet-detail.jpg',
      alt: 'Sunlit, freshly cleaned empty home interior with gleaming hardwood floors ready for move-in day',
      width: 1280,
      height: 714,
    },
    ctaLabel: 'Request Move-In/Out Quote',
  },
  {
    id: 'post-construction',
    number: '04',
    badge: 'The finishing touch',
    tag: 'Post-Build & Remodel Care',
    name: 'Post-Construction Cleaning',
    shortName: 'Post-Construction',
    ghlOptionValue: 'Deep Cleaning',
    summary:
      'Specialized post-renovation and post-build detailing that removes fine settling dust from high corners, millwork, cabinetry, and fixtures.',
    benefit:
      'Turns a newly remodeled kitchen, bath, or custom home build from a dusty jobsite into a livable, polished room ready to enjoy.',
    frequencyNote: 'Tailored to residential remodels, additions, and new-build handovers (excludes hazardous material remediation).',
    highlights: [
      'High-reach dusting of overhead corners, ceiling fans, vents & pendant lighting',
      'Detailed removal of fine drywall and sawdust residue from millwork & trim',
      'Inside & outside cabinet, drawer, countertop, and backsplash polishing',
      'Multi-pass floor vacuuming and damp mopping for hardwood, tile, and stone',
    ],
    image: {
      webp640: '/images/team-post-construction-640w.webp',
      webp1280: '/images/team-post-construction.webp',
      jpg: '/images/team-post-construction.jpg',
      alt: 'Newly renovated custom kitchen and dining space gleaming after post-construction dust removal',
      width: 1280,
      height: 714,
    },
    ctaLabel: 'Request Post-Construction Quote',
  },
];

export const CLEANING_CHECKLIST: ChecklistRoom[] = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    count: 24,
    summary: 'Sanitized prep surfaces, gleaming appliances, degreased hoods, and spotless cabinetry.',
    tasks: [
      { task: 'Clean cobwebs from lights, sills & corners', standard: true, deep: true, moveInOut: true },
      { task: 'Clean and sanitize all countertops', standard: true, deep: true, moveInOut: true },
      { task: 'Clean counters and full backsplash', standard: true, deep: true, moveInOut: true },
      { task: 'Dust all light fixtures, ceiling fans & blades', standard: true, deep: true, moveInOut: true },
      { task: 'Clean inside and outside of microwave', standard: true, deep: true, moveInOut: true },
      { task: 'Clean stove burners, stovetop, front & control panels', standard: true, deep: true, moveInOut: true },
      { task: 'Clean & dry sink, counters, faucet & soap dish', standard: true, deep: true, moveInOut: true },
      { task: 'Clean kitchen table and chairs', standard: true, deep: true, moveInOut: true },
      { task: 'Dust windows, sills, and ledges', standard: true, deep: true, moveInOut: true },
      { task: 'Take out trash and replace liner', standard: true, deep: true, moveInOut: true },
      { task: 'Sweep and mop kitchen floors', standard: true, deep: true, moveInOut: true },
      { task: 'Clean front of all cabinets and hardware handles', standard: false, deep: true, moveInOut: true },
      { task: 'Degrease and clean oven hood vent', standard: false, deep: true, moveInOut: true },
      { task: 'Wet-wipe window sills and window frames', standard: false, deep: true, moveInOut: true },
      { task: 'Dust doors and door frames', standard: false, deep: true, moveInOut: true },
      { task: 'Dust and wet-wipe baseboards', standard: false, deep: true, moveInOut: true },
      { task: 'Dust & disinfect light switches and door knobs', standard: false, deep: true, moveInOut: true },
      {
        task: 'Clean inside refrigerator',
        standard: false,
        deep: false,
        moveInOut: true,
        addOnNote: 'Available as an add-on for Standard or Deep cleans upon request',
      },
      {
        task: 'Clean inside oven',
        standard: false,
        deep: false,
        moveInOut: true,
        addOnNote: 'Available as an add-on for Standard or Deep cleans upon request',
      },
      { task: 'Clean inside all cabinets and drawers', standard: false, deep: false, moveInOut: true },
      { task: 'Sweep pantry floor and wipe down pantry shelves', standard: false, deep: false, moveInOut: true },
      { task: 'Wet-wipe doors and door frames completely', standard: false, deep: false, moveInOut: true },
      { task: 'Wet-wipe blinds and shutters', standard: false, deep: false, moveInOut: true },
    ],
  },
  {
    id: 'bathrooms',
    name: 'Bathrooms',
    count: 17,
    summary: 'Streak-free glass, scrubbed tile & grout, disinfected fixtures, and fresh floors.',
    tasks: [
      { task: 'Clean all cobwebs and dust shelving', standard: true, deep: true, moveInOut: true },
      { task: 'Clean and buff all mirrors and glass', standard: true, deep: true, moveInOut: true },
      { task: 'Clean countertops and backsplash', standard: true, deep: true, moveInOut: true },
      { task: 'Dust light fixtures and clean/dry sink(s)', standard: true, deep: true, moveInOut: true },
      { task: 'Clean & dry shower door, track, and glass enclosure', standard: true, deep: true, moveInOut: true },
      { task: 'Clean & sanitize inside and outside of toilet', standard: true, deep: true, moveInOut: true },
      { task: 'Wipe down exterior cabinet fronts', standard: true, deep: true, moveInOut: true },
      { task: 'Dust & wipe window sills, frames, and ledges', standard: true, deep: true, moveInOut: true },
      { task: 'Empty bathroom garbage cans', standard: true, deep: true, moveInOut: true },
      { task: 'Sweep/vacuum and mop bathroom floors', standard: true, deep: true, moveInOut: true },
      { task: 'Dust and wet-wipe doors and door frames', standard: false, deep: true, moveInOut: true },
      { task: 'Scrub shower and floor tile grout', standard: false, deep: true, moveInOut: true },
      { task: 'Dust and wet-wipe baseboards', standard: false, deep: true, moveInOut: true },
      { task: 'Clean inside vanity cabinets and drawers', standard: false, deep: false, moveInOut: true },
      { task: 'Clean inside medicine cabinet', standard: false, deep: false, moveInOut: true },
      { task: 'Dust and wipe window blinds', standard: false, deep: false, moveInOut: true },
    ],
  },
  {
    id: 'bedrooms',
    name: 'Bedrooms & Common Rooms',
    count: 15,
    summary: 'Dust-free fans and furniture, neat beds and throws, clean trim, and vacuumed/mopped floors.',
    tasks: [
      { task: 'Clear cobwebs and dust open shelves', standard: true, deep: true, moveInOut: true },
      { task: 'Dust ceiling fans and fan blades', standard: true, deep: true, moveInOut: true },
      { task: 'Clean and buff mirrors and glass decor', standard: true, deep: true, moveInOut: true },
      { task: 'Dust furniture, lamps, lampshades & hanging lights', standard: true, deep: true, moveInOut: true },
      { task: 'Clean window sills, window frames & chair rails', standard: true, deep: true, moveInOut: true },
      { task: 'Clean all light switches and door knobs', standard: true, deep: true, moveInOut: true },
      { task: 'Make beds & change sheets (when clean linens are set out)', standard: true, deep: true, moveInOut: true },
      { task: 'Tidy rooms, fold blankets, and arrange pillows', standard: true, deep: true, moveInOut: true },
      { task: 'Empty bedroom and living area wastebaskets', standard: true, deep: true, moveInOut: true },
      { task: 'Vacuum carpets/rugs and mop hard floors', standard: true, deep: true, moveInOut: true },
      { task: 'Dust and wet-wipe doors and door frames', standard: false, deep: true, moveInOut: true },
      { task: 'Dust and wet-wipe all baseboards', standard: false, deep: true, moveInOut: true },
      { task: 'Clean walk-in and reach-in closet areas & shelves', standard: false, deep: false, moveInOut: true },
      { task: 'Dust and wet-wipe all window blinds', standard: false, deep: false, moveInOut: true },
    ],
  },
];

export const BENEFIT_PILLARS: BenefitPillar[] = [
  {
    id: 'insured-bonded',
    title: 'Insured & Bonded Peace of Mind',
    description:
      'Every visit is backed by full liability insurance and bonding so your home, finishes, and personal belongings are protected.',
    badge: 'Protected Care',
    iconName: 'shield',
  },
  {
    id: 'vetted-team',
    title: 'Vetted, Background-Checked Team',
    description:
      'Our cleaning specialists are background-checked, trained on Mojo’s room-by-room standards, and treat your home with quiet respect.',
    badge: 'People You Can Trust',
    iconName: 'userCheck',
  },
  {
    id: 'supplies-provided',
    title: 'We Arrive Fully Equipped',
    description:
      'We bring our own professional-grade supplies, microfiber systems, and vacuums—one less household chore for you to stock or manage.',
    badge: 'Zero Prep Burden',
    iconName: 'sparkles',
  },
  {
    id: 'eco-friendly',
    title: 'Eco-Friendly & Pet-Safe Options',
    description:
      'Have dogs, cats, young children, or scent sensitivities? Non-toxic, eco-friendly products are always available upon request.',
    badge: 'Greener Clean',
    iconName: 'leaf',
  },
  {
    id: 'customizable',
    title: '100% Flexible Room Checklists',
    description:
      'Want us to skip a home office, spend extra time on the master bath, or add inside-fridge detailing? We tailor our checklist to your priorities.',
    badge: 'Tailored to You',
    iconName: 'sliders',
  },
  {
    id: 'happiness-guarantee',
    title: '48-Hour Happiness Policy',
    description:
      'If any spot is missed, simply let our Huntsville team know within 48 hours and we will return to re-clean the area at no extra cost.',
    badge: 'Guaranteed',
    iconName: 'clock',
  },
];

export const TEAM_ACTION_PHOTOS: TeamActionPhoto[] = [
  {
    id: 'pendant-care',
    title: 'Fixture & High-Touch Detailing',
    caption: 'Hand-polishing glass kitchen pendants, islands, and delicate lighting fixtures.',
    webp640: '/images/team-pendant-care-640w.webp',
    webp1080: '/images/team-pendant-care.webp',
    jpg: '/images/team-pendant-care.jpg',
    alt: 'Mojo Cleaning specialist hand-cleaning a glass pendant light fixture in a Huntsville kitchen',
    width: 1080,
    height: 1383,
  },
  {
    id: 'living-room-care',
    title: 'Whole-Room Team Coordination',
    caption: 'Simultaneous kitchen island sanitization and living room rug & floor care.',
    webp640: '/images/team-living-room-640w.webp',
    webp1080: '/images/team-living-room.webp',
    jpg: '/images/team-living-room.jpg',
    alt: 'Two Mojo Cleaning team members vacuuming a bright living room and wiping a marble kitchen island',
    width: 1080,
    height: 1440,
  },
  {
    id: 'cabinet-detail',
    title: 'Deep Cabinet & Interior Scrubbing',
    caption: 'Reaching inside lower cabinetry, lazy Susans, drawers, and appliance edges.',
    webp640: '/images/team-cabinet-detail-640w.webp',
    webp1080: '/images/team-cabinet-detail.webp',
    jpg: '/images/team-cabinet-detail.jpg',
    alt: 'Mojo Cleaning specialist wearing gloves detailing the inside of lower kitchen cabinets',
    width: 1080,
    height: 1440,
  },
  {
    id: 'post-construction-reach',
    title: 'Post-Construction High Reach',
    caption: 'Removing fine construction and renovation dust from overhead panels and trim.',
    webp640: '/images/team-post-construction-640w.webp',
    webp1080: '/images/team-post-construction.webp',
    jpg: '/images/team-post-construction.jpg',
    alt: 'Mojo Cleaning specialist using an extension pole duster to clean high post-construction surfaces',
    width: 1080,
    height: 1440,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Tell us about your space',
    description:
      'Share your home’s approximate size, the type of clean you are considering, and any special requests—like pet-safe products, inside-oven care, or rooms to skip.',
    detail: 'Takes under 2 minutes online or by phone at (256) 418-8199.',
    iconName: 'home',
  },
  {
    number: '02',
    title: 'Get your custom quote',
    description:
      'Our Huntsville team reviews your property details and follows up promptly with a clear, customized quote and available appointment windows that fit your routine.',
    detail: 'Transparent pricing tailored to your rooms—never a generic guess.',
    iconName: 'clipboard',
  },
  {
    number: '03',
    title: 'Come home to Mojo',
    description:
      'Once your appointment is confirmed, our insured, background-checked team arrives with every supply needed and leaves your home fresh, calm, and sparkling.',
    detail: 'Backed on every visit by our 48-Hour Happiness Guarantee.',
    iconName: 'sparkle',
  },
];

export const VERIFIED_TESTIMONIALS: VerifiedTestimonial[] = [
  {
    id: 'sarah-m',
    quote:
      'Mojo Cleaning has been a lifesaver for our family in Madison. Walking in on Friday afternoon to a pristine, fresh home is truly the best feeling all week!',
    author: 'Sarah M.',
    location: 'Madison, AL',
    serviceType: 'Bi-Weekly Recurring Clean',
    sourceLabel: 'Published Client Review • mojocleaningservice.com',
    sourceUrl: 'https://mojocleaningservice.com/#reviews',
  },
  {
    id: 'david-l',
    quote:
      'We booked a deep clean prior to listing our house. They got into every corner and the baseboards looked brand new. Super friendly and punctual.',
    author: 'David L.',
    location: 'Huntsville, AL',
    serviceType: 'Pre-Listing Deep Clean',
    sourceLabel: 'Published Client Review • mojocleaningservice.com',
    sourceUrl: 'https://mojocleaningservice.com/#reviews',
  },
  {
    id: 'jessica-t',
    quote:
      'I love that they offer eco-friendly supplies since we have two dogs. Their 48-hour guarantee gives complete peace of mind, though we never needed it!',
    author: 'Jessica T.',
    location: 'South Huntsville, AL',
    serviceType: 'Recurring Residential Clean',
    sourceLabel: 'Published Client Review • mojocleaningservice.com',
    sourceUrl: 'https://mojocleaningservice.com/#reviews',
  },
];

export const SERVICE_AREAS: ServiceAreaCommunity[] = [
  {
    name: 'Huntsville, AL',
    countyOrRegion: 'Primary Hub • Madison County',
    description:
      'Serving Downtown Huntsville, Twickenham, Blossomwood, Monte Sano, Jones Valley, South Huntsville, Providence, and surrounding neighborhoods.',
    zipExamples: '35801, 35802, 35803, 35805, 35806, 35811',
    isPrimary: true,
  },
  {
    name: 'Madison, AL',
    countyOrRegion: 'Madison & Limestone County',
    description:
      'Full recurring, deep, and move-in/move-out coverage across Clift Farm, Town Madison, Rainbow Mountain, and family neighborhoods throughout Madison.',
    zipExamples: '35756, 35757, 35758',
  },
  {
    name: 'Hampton Cove, AL',
    countyOrRegion: 'Southeast Huntsville Corridor',
    description:
      'Dedicated residential cleaning for golf-course communities, family estates, and new builds over the mountain in Hampton Cove and McMullen Cove.',
    zipExamples: '35763',
  },
  {
    name: 'Owens Cross Roads, AL',
    countyOrRegion: 'Eastern Madison County',
    description:
      'Reliable scheduled housekeeping, seasonal deep cleans, and post-construction detailing for growing communities in Owens Cross Roads.',
    zipExamples: '35763',
  },
  {
    name: 'Athens & Surrounding Areas',
    countyOrRegion: 'Greater North Alabama Metro',
    description:
      'Serving Athens and nearby Madison County / Limestone County communities. Reach out with your ZIP code to confirm scheduling availability.',
    zipExamples: '35611, 35613 & nearby Madison County ZIPs',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'areas-served',
    category: 'Scheduling & Quotes',
    question: 'What areas does Mojo Cleaning serve?',
    answer:
      'Mojo Cleaning serves homeowners and residents across Huntsville, Madison, Hampton Cove, Owens Cross Roads, Athens, and surrounding communities in Madison County, Alabama. If you live in a nearby North Alabama neighborhood, send us your ZIP code in the quote form or call (256) 418-8199 and our team will gladly confirm coverage.',
  },
  {
    id: 'cleaning-types',
    category: 'Services & Supplies',
    question: 'What types of cleaning services are available?',
    answer:
      'We offer four core residential cleaning services: Recurring Cleaning (weekly, bi-weekly, or monthly maintenance), Deep Cleaning (intensive detailing including baseboards, cabinet fronts, oven hood vents, door frames, and bathroom tile grout), Move-In / Move-Out Cleaning (full empty-home reset including inside oven, fridge, cabinets, drawers, closets, and blinds), and Post-Construction Cleaning (removing fine renovation and build dust).',
  },
  {
    id: 'supplies-equipment',
    category: 'Services & Supplies',
    question: 'Do I need to provide cleaning supplies or equipment?',
    answer:
      'No—our team arrives fully equipped with our own top-tier cleaning products, microfiber cloths, mops, and vacuums. If you prefer eco-friendly, non-toxic, pet-safe cleaning supplies, simply let us know when requesting your quote and we will pack them for your visit at no extra hassle.',
  },
  {
    id: 'request-quote',
    category: 'Scheduling & Quotes',
    question: 'How do I request a quote and book an appointment?',
    answer:
      'Complete the quote request form on this page or call/text us at (256) 418-8199. Tell us which service you are interested in and share a few details about your home. Our Huntsville team reviews your request and follows up promptly with transparent pricing and available appointment times. Submitting a quote form does not lock you into an appointment until you approve your custom quote.',
  },
  {
    id: 'recurring-options',
    category: 'Scheduling & Quotes',
    question: 'Is recurring cleaning available, and can I customize my checklist?',
    answer:
      'Yes! We offer weekly, bi-weekly, and monthly recurring cleaning schedules. While our 56-point checklist provides a thorough baseline for kitchens, bathrooms, bedrooms, and common areas, it is 100% flexible—you can ask us to skip unused rooms, focus extra care on high-traffic areas, or add tasks like inside-refrigerator or inside-oven cleaning.',
  },
  {
    id: 'deep-vs-standard',
    category: 'Services & Supplies',
    question: 'What is the difference between a Standard Clean and a Deep Clean?',
    answer:
      'A Standard Clean focuses on essential routine maintenance across your kitchen, bathrooms, bedrooms, and living areas (countertops, sinks, toilets, showers, mirrors, stovetop, microwave inside/out, dusting surfaces/fans, and vacuuming/mopping floors). A Deep Clean adds intensive hand-detailing for areas that build up grime over time, including wiping baseboards, doors and door frames, window sills/frames, kitchen cabinet fronts and handles, the oven hood vent, disinfecting switches/knobs, and scrubbing bathroom tile grout.',
  },
  {
    id: 'move-in-out-included',
    category: 'Services & Supplies',
    question: 'What is included in a Move-In or Move-Out Cleaning?',
    answer:
      'Our Move-In / Move-Out Cleaning is designed for real estate transitions, lease handovers, and settling into a new home. It includes everything in both our Standard and Deep cleans plus full interior detailing: cleaning inside the refrigerator, inside the oven, inside all kitchen and bathroom cabinets and drawers, inside the medicine cabinet, sweeping and wiping pantry and closet shelves, and wet-wiping window blinds and shutters.',
  },
  {
    id: 'before-appointment',
    category: 'Scheduling & Quotes',
    question: 'What should I do before my cleaning appointment?',
    answer:
      'To help our specialists focus 100% of their time on deep surface care and sanitizing, we recommend lightly picking up personal items, clothing, or toys from floors and countertops before we arrive. If you would like us to change bed linens, simply leave a fresh set of sheets out on the bed. For pets, let us know in advance so we can keep gates/doors secure and use pet-safe products.',
  },
  {
    id: 'insured-bonded',
    category: 'Trust & Policies',
    question: 'Is Mojo Cleaning insured, bonded, and background-checked?',
    answer:
      'Yes. Mojo Cleaning LLC is fully insured and bonded, and every cleaning specialist on our team undergoes vetting and background checks before entering a client’s home. Your property and peace of mind are protected on every visit.',
  },
  {
    id: 'satisfaction-policy',
    category: 'Trust & Policies',
    question: 'How does the 48-Hour Happiness Guarantee work?',
    answer:
      'We stand behind every clean with our 48-Hour Happiness Guarantee. If any area of your home was overlooked or does not meet the agreed checklist standards, contact us at (256) 418-8199 or hello@mojocleaningservice.com within 48 hours of your appointment and our team will return to re-clean the spot at no additional charge.',
  },
];
