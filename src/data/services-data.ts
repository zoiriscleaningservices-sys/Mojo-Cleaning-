/**
 * SECTION 12 & 14 — VERIFIED SERVICE ENTITIES
 * Canonical service definitions for Mojo Cleaning:
 * 1. Recurring Residential Cleaning (recurring-residential-cleaning)
 * 2. Deep House Cleaning (deep-house-cleaning)
 * 3. Move-In House Cleaning (move-in-cleaning)
 * 4. Move-Out and Turnover Cleaning (move-out-cleaning)
 * 5. Post-Construction and Renovation Cleaning (post-construction-cleaning)
 */

import type { ServiceEntity, ServiceId } from './entities';

export const SERVICES_DATA: ServiceEntity[] = [
  {
    id: 'recurring-residential-cleaning',
    slug: 'recurring-residential-cleaning',
    urlPath: '/huntsville-al/services/recurring-residential-cleaning/',
    name: 'Recurring Residential Cleaning',
    shortName: 'Recurring Cleaning',
    checklistPointsLabel: '37-Point Maintenance Checklist',
    categoryLabel: 'Scheduled Maintenance Care',
    badge: 'Most Popular • Weekly, Bi-Weekly & Monthly',
    tagline: 'Keep the good mood going—every single week.',
    shortDescription:
      'Consistent weekly, bi-weekly, or monthly home care that keeps kitchens sanitized, bathrooms gleaming, and floors spotless so your weekends belong to you.',
    longDescription: [
      'A truly calm home isn’t the result of a frantic Saturday afternoon cleanup—it comes from a dependable rhythm. Mojo Cleaning’s Recurring Residential Cleaning service is designed for households that want their living spaces cared for consistently on a weekly, bi-weekly, or monthly schedule.',
      'Each recurring visit follows our 37-task Standard Maintenance Checklist across your kitchen, bathrooms, bedrooms, and common living rooms. We sanitize prep surfaces, polish fixtures, remove dust before it settles on sills and ceiling fans, and vacuum and mop all hard and carpeted floors using our own professional equipment.',
      'Because every household has its own routine, your recurring plan is 100% adaptable. Whether you want us to focus extra attention on a high-traffic mudroom, use pet-safe eco-friendly solutions around your dogs, or rotate specialty add-ons like inside-refrigerator care, our insured specialists keep notes on your preferences for every visit.',
    ],
    idealFor: [
      'Busy professionals and commuters who want their weekends back',
      'Growing families balancing school, activities, and everyday household routines',
      'Pet owners seeking consistent hair, dander, and floor maintenance with optional eco-friendly products',
      'Homeowners who have completed an initial Deep Clean and want to preserve that fresh baseline effortlessly',
    ],
    scopeByRoom: [
      {
        roomName: 'Kitchen (16 Recurring Tasks)',
        includedItems: [
          'Sanitize and wipe all countertops and full backsplash area',
          'Clean inside and outside of microwave oven',
          'Degrease stove burners, stovetop, front panels, and control knobs',
          'Clean and polish exterior of range hood, refrigerator, dishwasher, and oven',
          'Scrub, sanitize, and dry kitchen sink, faucet, and soap dish',
          'Wipe down kitchen table, chairs, barstools, and island surfaces',
          'Dust overhead light fixtures, pendant globes, ceiling fans, and window sills',
          'Empty trash and recycling bins, replace liners, and vacuum/mop all flooring',
        ],
      },
      {
        roomName: 'Bathrooms (12 Recurring Tasks)',
        includedItems: [
          'Scrub and sanitize showers, tiled walls, glass enclosures, and bathtubs',
          'Clean, disinfect, and polish toilets inside, outside, and around base',
          'Sanitize vanity countertops, sinks, soap dishes, and polish chrome/brass fixtures',
          'Clean and streak-free polish all vanity mirrors and glass surfaces',
          'Dust towel bars, paper holders, light fixtures, and window sills',
          'Empty bathroom wastebaskets, shake out bath mats, and scrub/mop floors',
        ],
      },
      {
        roomName: 'Bedrooms & Common Living Rooms (9 Recurring Tasks)',
        includedItems: [
          'Remove cobwebs from corners, crown molding, and window frames',
          'Dust all furniture surfaces, bookshelves, nightstands, and decor items',
          'Dust ceiling fan blades, lampshades, and accessible light fixtures',
          'Dust window sills, ledges, and tidy throw blankets/pillows',
          'Make beds neatly (and change linens when fresh sheets are left on the bed)',
          'Vacuum all carpets, area rugs, stairs, and mop hardwood/LVP/tile floors',
        ],
      },
    ],
    includedHighlights: [
      'All 37 Standard Checklist tasks across Kitchen, Bathrooms, Bedrooms & Living Areas',
      'All professional cleaning supplies, microfiber systems, and HEPA-filter vacuums provided',
      'Consistent arrival windows with advance text/email reminders',
      'Backed on every visit by our 48-Hour Happiness Guarantee',
    ],
    excludedOrConfirmationItems: [
      'Interior of oven, interior of refrigerator, and interior of closed cabinets (available anytime as requested add-ons)',
      'Hand-washing individual window blind slats and full baseboard scrubbing (included in Deep & Move-In/Out cleans, or rotatable on request)',
      'Exterior second-story windows, biohazard cleanup, or heavy hoarding remediation',
    ],
    benefits: [
      {
        title: 'Predictable Household Rhythm',
        description:
          'Lock in your preferred day and cadence—weekly, bi-weekly, or monthly—with reliable communication from our dispatch team.',
      },
      {
        title: 'Zero Supply Management',
        description:
          'Never worry about running out of sprays, microfiber cloths, or vacuum bags; our team arrives self-sufficient.',
      },
      {
        title: 'Pet & Family Friendly',
        description:
          'Non-toxic, eco-friendly cleaning formulas are available upon request at no complicated upcharge.',
      },
    ],
    preparationTips: [
      'Clear everyday personal items (mail, toys, clothing) from countertops and floors so our team can focus 100% of their time on deep surface sanitation.',
      'Leave fresh bed linens stacked on top of any bed you would like stripped and remade.',
      'Share keypad, smart lock, or pet-gate instructions in advance so arrival is seamless whether you are home or away.',
    ],
    howItWorks: [
      {
        stepNumber: '01',
        title: 'Request Your Recurring Quote',
        description:
          'Tell us your home’s bedroom/bathroom count and whether you prefer weekly, bi-weekly, or monthly visits.',
      },
      {
        stepNumber: '02',
        title: 'Customize Your Room Priorities',
        description:
          'We confirm your transparent per-visit rate and note any special surface, pet, or room-skip instructions.',
      },
      {
        stepNumber: '03',
        title: 'Enjoy Effortless Consistency',
        description:
          'Our insured specialists arrive on schedule and keep your home in a perpetual good mood.',
      },
    ],
    cadenceOptions: ['Weekly Service', 'Bi-Weekly Service (Most Popular)', 'Monthly Maintenance'],
    relatedServiceIds: ['deep-house-cleaning', 'move-in-cleaning', 'move-out-cleaning'],
    availableLocationIds: [
      'huntsville-al',
      'madison-al',
      'hampton-cove-al',
      'owens-cross-roads-al',
      'athens-al',
    ],
    heroImage: {
      src: '/images/team-living-room.jpg',
      webp: '/images/team-living-room.webp',
      webpMobile: '/images/team-living-room-640w.webp',
      alt: 'Sunlit living room with freshly vacuumed area rug, oak floors, and tidy linen sofa after recurring residential cleaning',
      width: 1280,
      height: 714,
      caption: 'Weekly, bi-weekly, and monthly recurring care tailored to how you live.',
    },
    secondaryImage: {
      src: '/images/team-living-room.jpg',
      webp: '/images/team-living-room.webp',
      webpMobile: '/images/team-living-room-640w.webp',
      alt: 'Mojo Cleaning specialists working together in an open-concept living room and kitchen',
      width: 960,
      height: 1280,
      caption: 'Our insured specialists bring every supply, microfiber cloth, and vacuum needed.',
    },
    quoteFormValue: 'Recurring Cleaning',
    ghlMetaValue: 'Recurring Cleaning (Weekly / Bi-Weekly / Monthly)',
    faqs: [
      {
        id: 'faq-rec-1',
        question: 'Do I have to sign a long-term contract for recurring cleaning?',
        answer:
          'No. Mojo Cleaning earns your trust visit by visit. You can adjust your cleaning frequency, pause service for family vacations, or cancel with simple advance notice.',
        category: 'service',
        serviceId: 'recurring-residential-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-rec-2',
        question: 'Should I book a Deep Clean before starting recurring service?',
        answer:
          'If your home has not been professionally cleaned within the past 30 to 60 days, we recommend starting with an initial 47-point Deep Clean so our team can hand-wipe baseboards, doors, and buildup before maintaining your home at the recurring rate.',
        category: 'service',
        serviceId: 'recurring-residential-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-rec-3',
        question: 'What is the difference between weekly, bi-weekly, and monthly cleaning?',
        answer:
          'All three follow our 37-point recurring checklist, but weekly and bi-weekly visits prevent dust and soap-scum buildup fastest—making bi-weekly our most popular choice for local households.',
        category: 'service',
        serviceId: 'recurring-residential-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-rec-4',
        question: 'Can I add inside-oven or inside-fridge cleaning to a single recurring visit?',
        answer:
          'Absolutely. Just text or email our office at least 24 hours before your scheduled visit and we will add interior appliance or cabinet detailing to that appointment.',
        category: 'service',
        serviceId: 'recurring-residential-cleaning',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Recurring Residential Cleaning Service | Mojo Cleaning',
      metaDescription:
        'Dependable weekly, bi-weekly, and monthly residential cleaning. Insured team, 37-point recurring checklist & 48-hour happiness guarantee.',
      canonicalPath: '/huntsville-al/services/recurring-residential-cleaning/',
      primaryIntent: 'Hire a recurring weekly, bi-weekly, or monthly residential cleaning service',
      primaryQuery: 'recurring house cleaning service',
      secondaryQueries: [
        'bi-weekly maid service',
        'weekly house cleaning',
        'monthly home cleaning service',
        'recurring residential cleaning',
      ],
    },
    publicationStatus: 'published',
  },
  {
    id: 'deep-house-cleaning',
    slug: 'deep-house-cleaning',
    urlPath: '/huntsville-al/services/deep-house-cleaning/',
    name: 'Deep House Cleaning',
    shortName: 'Deep Cleaning',
    checklistPointsLabel: '47-Point Deep Detail Checklist',
    categoryLabel: 'Top-to-Bottom Detail Reset',
    badge: '47-Point Intensive Standard',
    tagline: 'A little extra love for every corner, trim & fixture.',
    shortDescription:
      'An intensive top-to-bottom home reset that includes all 37 standard tasks plus 10 hand-detailed deep cleaning tasks—baseboards, doors, cabinet exteriors, grout, and buildup removal.',
    longDescription: [
      'Over months of busy living, even a tidy home accumulates detail buildup that routine wiping misses—kitchen grease film on range hoods and cabinet doors, dust along baseboards and door frames, soap residue in shower tracks, and smudges around light switches.',
      'Mojo Cleaning’s Deep House Cleaning service is a comprehensive 47-point top-to-bottom reset. It includes every task from our Standard Cleaning checklist plus 10 intensive hand-detailing tasks across your kitchen, bathrooms, bedrooms, and living areas.',
      'Homeowners book our Deep Clean as a first-visit reset before starting bi-weekly recurring service, prior to hosting holiday guests or family events, during spring/fall seasonal refreshes, or before photographing a home for the real estate market.',
    ],
    idealFor: [
      'First-time Mojo Cleaning clients establishing a pristine baseline before recurring service',
      'Seasonal spring or autumn refreshes and pre-holiday hosting preparation',
      'Homeowners preparing a residence for real estate listing photography and open houses',
      'Busy households that need a one-time top-to-bottom reset after a hectic season',
    ],
    scopeByRoom: [
      {
        roomName: 'Kitchen Deep Detailing (20 Included Tasks)',
        includedItems: [
          'All 16 Standard Kitchen tasks plus intensive degreasing of range hood and stove drip pans',
          'Hand-wipe exterior of all upper and lower kitchen cabinet doors and drawer fronts',
          'Wipe down kitchen doors, door frames, and sanitize light switches and outlets',
          'Hand-wipe kitchen baseboards and scrub floor edges/corners',
          'Polish stainless steel appliances, backsplash tile grout lines, and pendant fixtures',
        ],
      },
      {
        roomName: 'Bathroom Deep Detailing (15 Included Tasks)',
        includedItems: [
          'All 12 Standard Bathroom tasks plus detailed tile grout and shower door track scrubbing',
          'Hand-wipe exterior of bathroom vanity cabinets and drawer fronts',
          'Wipe down bathroom doors, frames, and sanitize switches and doorknobs',
          'Hand-wipe bathroom baseboards, vents, and behind-toilet floor edges',
        ],
      },
      {
        roomName: 'Bedrooms & Living Areas Deep Detailing (12 Included Tasks)',
        includedItems: [
          'All 9 Standard Bedroom & Common Room tasks plus hand-wiping baseboards throughout',
          'Wipe down interior doors, door frames, window frames, and sanitizing light switches',
          'Detail ceiling fan blades, air return vents, and accessible crown/chair-rail trim',
          'Edge-vacuum carpets and thoroughly mop beneath accessible furniture',
        ],
      },
    ],
    includedHighlights: [
      '47 verified tasks across Kitchen, Bathrooms, Bedrooms, and Living Spaces',
      'Full exterior cabinet and vanity door hand-wiping in kitchens and baths',
      'Hand-wiped baseboards, interior doors, door frames, and sanitized switch plates',
      'Intensive shower glass, tile grout, and kitchen range-hood degreasing',
    ],
    excludedOrConfirmationItems: [
      'Full interior cleaning of empty or stocked cabinets, drawers, pantry shelves, oven interior, and refrigerator interior (available as Deep Clean add-ons or included automatically in Move-In/Move-Out cleans)',
      'Wet hand-wiping of individual window blind slats (available as an add-on or in Move-In/Out cleans)',
      'Carpet steam extraction or exterior pressure washing',
      'Does not promise removal of permanent stains, hard-water glass etching, or restoration of damaged surfaces beyond professional residential cleaning capabilities',
    ],
    benefits: [
      {
        title: 'Visible Trim & Baseboard Transformation',
        description:
          'Hand-wiping baseboards, door frames, and cabinet fronts immediately brightens the entire room.',
      },
      {
        title: 'Sanitized High-Touch Surfaces',
        description:
          'Every doorknob, switch plate, faucet handle, and appliance pull is disinfected and polished.',
      },
      {
        title: 'Flexible One-Time or Kickoff Booking',
        description:
          'Book as a standalone one-time refresh or use it as the foundation for discounted recurring care.',
      },
    ],
    preparationTips: [
      'Declutter kitchen counters, bathroom vanities, and floor edges so our specialists can reach every baseboard and backsplash tile.',
      'Let us know in your quote request if you would like to include inside-oven or inside-refrigerator detailing.',
      'Point out any delicate antique finishes or natural stone counters during booking so we select the ideal pH-neutral cleaner.',
    ],
    howItWorks: [
      {
        stepNumber: '01',
        title: 'Share Your Home & Priority Areas',
        description:
          'Submit your approximate square footage, bed/bath count, and any requested interior add-ons.',
      },
      {
        stepNumber: '02',
        title: 'Receive a Transparent Deep Clean Quote',
        description:
          'We provide a clear quote covering our 47-point Deep Clean standard and schedule your preferred date.',
      },
      {
        stepNumber: '03',
        title: 'Walk Into a Reset Home',
        description:
          'Our team details your home from ceiling fans down to baseboards, backed by our 48-Hour Guarantee.',
      },
    ],
    cadenceOptions: [
      'One-Time Deep Reset',
      'Initial Kickoff Clean (Before Recurring)',
      'Seasonal Quarterly / Semi-Annual Deep Clean',
    ],
    relatedServiceIds: [
      'recurring-residential-cleaning',
      'move-out-cleaning',
      'post-construction-cleaning',
    ],
    availableLocationIds: [
      'huntsville-al',
      'madison-al',
      'hampton-cove-al',
      'owens-cross-roads-al',
      'athens-al',
    ],
    heroImage: {
      src: '/images/team-pendant-care.jpg',
      webp: '/images/team-pendant-care.webp',
      webpMobile: '/images/team-pendant-care-640w.webp',
      alt: 'Gleaming marble master bathroom with frameless glass shower, brass fixtures, and soaking tub after a Mojo Deep Clean',
      width: 1280,
      height: 714,
      caption: '47-point top-to-bottom detailing for kitchens, bathrooms, trim, and baseboards.',
    },
    secondaryImage: {
      src: '/images/team-pendant-care.jpg',
      webp: '/images/team-pendant-care.webp',
      webpMobile: '/images/team-pendant-care-640w.webp',
      alt: 'Mojo Cleaning specialist polishing an overhead glass pendant light fixture during a deep clean',
      width: 960,
      height: 1280,
      caption: 'Hand-detailing overhead lighting, cabinetry, and trim.',
    },
    quoteFormValue: 'Deep Cleaning',
    ghlMetaValue: 'Deep Cleaning',
    faqs: [
      {
        id: 'faq-deep-1',
        question: 'How is a Deep Clean different from a Standard Recurring Clean?',
        answer:
          'A Standard Clean maintains surfaces with 37 core tasks, whereas our Deep Clean expands to 47 tasks—adding hand-wiped baseboards, exterior kitchen and bathroom cabinet doors, interior doors and frames, light switch plates, and heavier degreasing/descaling in kitchens and showers.',
        category: 'service',
        serviceId: 'deep-house-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-deep-2',
        question: 'How long does a Deep Clean take?',
        answer:
          'Depending on your home’s square footage, bathroom count, and condition, a Deep Clean typically takes between 3 and 6 hours with a coordinated two-specialist team.',
        category: 'service',
        serviceId: 'deep-house-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-deep-3',
        question: 'Does Deep Cleaning include inside the oven and refrigerator?',
        answer:
          'Inside-oven and inside-refrigerator cleaning are included automatically in Move-In and Move-Out cleans, and can be added to any Deep Clean upon request when submitting your quote.',
        category: 'service',
        serviceId: 'deep-house-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-deep-4',
        question: 'Can I customize my Deep Clean checklist or skip unused rooms?',
        answer:
          'Yes! While our 47-point Deep Clean checklist sets a thorough baseline, you can ask our team to skip unused guest rooms or focus extra detail time on high-traffic kitchens and bathrooms.',
        category: 'service',
        serviceId: 'deep-house-cleaning',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Deep House Cleaning Service | Mojo Cleaning',
      metaDescription:
        '47-point deep house cleaning. Hand-wiped baseboards, cabinet fronts, tile grout & fixtures. Get a custom quote.',
      canonicalPath: '/huntsville-al/services/deep-house-cleaning/',
      primaryIntent: 'Book a thorough one-time or seasonal deep house cleaning service',
      primaryQuery: 'deep house cleaning service',
      secondaryQueries: [
        'one time deep clean',
        'spring cleaning service',
        'pre listing house cleaning',
      ],
    },
    publicationStatus: 'published',
  },
  {
    id: 'move-in-cleaning',
    slug: 'move-in-cleaning',
    urlPath: '/huntsville-al/services/move-in-cleaning/',
    name: 'Move-In Cleaning',
    shortName: 'Move-In Cleaning',
    checklistPointsLabel: '56-Point Empty-Home Checklist',
    categoryLabel: 'New Home Sanitization Reset',
    badge: 'Full 56-Point Empty-Home Standard',
    tagline: 'Unpack into a home that is truly yours from shelf one.',
    shortDescription:
      'Complete 56-point empty-home sanitization before your moving truck arrives—including inside kitchen cabinets, drawers, pantry shelves, oven, refrigerator, vanities, closets, and blinds.',
    longDescription: [
      'Moving into a new home should feel exciting—not like an exhausting weekend of scrubbing someone else’s cabinet crumbs and bathroom drawers before you can unpack a single box.',
      'Mojo Cleaning’s Move-In Cleaning service executes our complete 56-point empty-home checklist from top to bottom while the property is vacant. We sanitize the inside of every kitchen cabinet, drawer, pantry shelf, bathroom vanity, medicine cabinet, and bedroom closet shelf so your dishes, linens, and wardrobe go directly onto spotless surfaces.',
      'We also deep-clean the interior of the oven and refrigerator, wet-wipe window blinds and shutters, hand-wipe all baseboards and doors, and sanitize every bathroom and floor so your family walks into a genuinely fresh start.',
    ],
    idealFor: [
      'Homebuyers closing on a single-family house or townhome',
      'Relocating families moving into the area for career or military transfers',
      'Tenants and homeowners who want every cabinet, drawer, and appliance interior sanitized prior to move-in day',
      'New-build buyers who want construction dust removed from closets and cabinetry before unpacking',
    ],
    scopeByRoom: [
      {
        roomName: 'Kitchen Interior & Exterior Reset (24 Included Tasks)',
        includedItems: [
          'Vacuum and wet-wipe the inside of all kitchen cabinets and drawers',
          'Deep clean inside of oven, oven racks, and glass door',
          'Clean and sanitize inside of refrigerator, freezer drawers, and door seals',
          'Sweep pantry floor and wipe down all pantry shelving',
          'Wet-wipe window blinds/shutters, baseboards, doors, frames, and all 20 Deep Clean tasks',
        ],
      },
      {
        roomName: 'Bathrooms Sanitization Reset (17 Included Tasks)',
        includedItems: [
          'Clean and sanitize inside all bathroom vanity cabinets, drawers, and medicine cabinets',
          'Descaling and disinfecting of showers, tubs, tile grout, toilets, and sinks',
          'Wet-wipe bathroom window blinds/shutters, baseboards, doors, and frames',
          'Polish mirrors, chrome/brass fixtures, exhaust vents, and scrub floors',
        ],
      },
      {
        roomName: 'Bedrooms, Closets & Living Areas (15 Included Tasks)',
        includedItems: [
          'Wipe down all bedroom, hallway, and linen closet shelving and rods',
          'Wet-wipe window blinds and shutters across all bedrooms and living areas',
          'Hand-wipe baseboards, doors, door frames, window sills, and switch plates',
          'Vacuum all carpet edges, stairs, and mop all hardwood, LVP, and tile flooring',
        ],
      },
    ],
    includedHighlights: [
      'All 56 tasks on the Mojo Cleaning Master Checklist (Standard + Deep + Interior Transition)',
      'Inside all kitchen cabinets, drawers, pantry shelves, bathroom vanities, and closet shelves',
      'Inside oven and inside refrigerator/freezer cleaning included as standard',
      'Wet-wiped window blinds, baseboards, interior doors, and switch plates throughout',
    ],
    excludedOrConfirmationItems: [
      'Home should be vacant (free of furniture and moving boxes) so our team can access all cabinet, drawer, and closet interiors',
      'Utilities (electricity and running hot water) must be active on the day of the clean',
      'Garage floor degreasing or exterior window washing requires advance confirmation',
      'Covers residential cleaning and sanitization only; does not include property inspection, pest control, junk disposal, or mechanical/structural repairs',
    ],
    benefits: [
      {
        title: 'Unpack Straight Into Clean Cabinets',
        description:
          'Put away dishes, silverware, pantry goods, and folded clothes without wiping a single shelf yourself.',
      },
      {
        title: 'Appliances Sanitized Inside & Out',
        description:
          'Both the refrigerator/freezer and oven interiors are detailed and ready for your first meal.',
      },
      {
        title: 'Coordinated Around Closing & Movers',
        description:
          'We work with your closing schedule to clean in the window between key handoff and moving-truck arrival.',
      },
    ],
    preparationTips: [
      'Schedule your Move-In Clean for the window after closing/key handoff and before your moving truck unloads.',
      'Confirm that water and electricity are turned on at the property.',
      'Share lockbox or keypad entry instructions so our team can begin promptly on arrival.',
    ],
    howItWorks: [
      {
        stepNumber: '01',
        title: 'Book Your Pre-Move Window',
        description:
          'Share your new address or ZIP code, square footage, and target date between closing and unloading.',
      },
      {
        stepNumber: '02',
        title: 'Full 56-Point Empty-Home Reset',
        description:
          'Our insured team details every cabinet interior, appliance interior, bathroom, closet, and floor.',
      },
      {
        stepNumber: '03',
        title: 'Unpack With Complete Peace of Mind',
        description:
          'Move into a sanitized, fresh-smelling home backed by our 48-Hour Happiness Guarantee.',
      },
    ],
    cadenceOptions: ['One-Time Pre-Move-In Reset', 'Move-In + Bi-Weekly Recurring Bundle'],
    relatedServiceIds: [
      'move-out-cleaning',
      'post-construction-cleaning',
      'recurring-residential-cleaning',
    ],
    availableLocationIds: [
      'huntsville-al',
      'madison-al',
      'hampton-cove-al',
      'owens-cross-roads-al',
      'athens-al',
    ],
    heroImage: {
      src: '/images/team-cabinet-detail.jpg',
      webp: '/images/team-cabinet-detail.webp',
      webpMobile: '/images/team-cabinet-detail-640w.webp',
      alt: 'Empty, sunlit home interior with gleaming white oak floors and freshly cleaned kitchen cabinetry ready for move-in',
      width: 1280,
      height: 714,
      caption: 'All 56 checklist points—including inside cabinets, drawers, closets, oven, and fridge.',
    },
    secondaryImage: {
      src: '/images/team-cabinet-detail.jpg',
      webp: '/images/team-cabinet-detail.webp',
      webpMobile: '/images/team-cabinet-detail-640w.webp',
      alt: 'Mojo Cleaning specialist wiping the interior shelves of kitchen base cabinets during a move-in clean',
      width: 960,
      height: 1280,
      caption: 'Every cabinet shelf and drawer interior is wiped and sanitized before you unpack.',
    },
    quoteFormValue: 'Move-In & Move-Out Cleaning',
    ghlMetaValue: 'Move-In Cleaning',
    faqs: [
      {
        id: 'faq-movein-1',
        question: 'What is included in a Move-In Clean that isn’t in a regular Deep Clean?',
        answer:
          'Our Move-In Clean adds 9 full-interior tasks on top of the 47-point Deep Clean—specifically cleaning inside all kitchen cabinets and drawers, inside the refrigerator and oven, inside bathroom vanities and medicine cabinets, pantry and closet shelving, and wet-wiping window blinds.',
        category: 'service',
        serviceId: 'move-in-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-movein-2',
        question: 'Can you clean if moving boxes are already stacked in one room or the garage?',
        answer:
          'Yes! While an empty home allows 100% floor and closet access, if boxes are neatly staged in a garage or single corner, our team will clean around that staged area and detail every accessible cabinet, drawer, appliance, and room.',
        category: 'service',
        serviceId: 'move-in-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-movein-3',
        question: 'How far in advance should I schedule a Move-In Clean?',
        answer:
          'We recommend reaching out 5 to 10 days before your closing or lease start date, especially near the end of the month. If your closing date shifts, let us know as soon as possible and we will adjust your slot.',
        category: 'service',
        serviceId: 'move-in-cleaning',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-In Cleaning Service | Mojo Cleaning',
      metaDescription:
        '56-point move-in house cleaning. Inside cabinets, drawers, closets, oven & fridge sanitized before you unpack.',
      canonicalPath: '/huntsville-al/services/move-in-cleaning/',
      primaryIntent: 'Book an empty-home move-in cleaning service before unpacking',
      primaryQuery: 'move in cleaning service',
      secondaryQueries: ['move in house cleaning', 'new home pre move in cleaning'],
    },
    publicationStatus: 'published',
  },
  {
    id: 'move-out-cleaning',
    slug: 'move-out-cleaning',
    urlPath: '/huntsville-al/services/move-out-cleaning/',
    name: 'Move-Out and Turnover Cleaning',
    shortName: 'Move-Out Cleaning',
    checklistPointsLabel: '56-Point Turnover Checklist',
    categoryLabel: 'Lease-End, Sale & Turnover Reset',
    badge: 'Inspection-Ready 56-Point Standard',
    tagline: 'Hand over the keys with total confidence.',
    shortDescription:
      'Inspection-ready 56-point empty-home turnover cleaning for renters protecting security deposits, sellers preparing for final walk-throughs, and property managers.',
    longDescription: [
      'Moving out takes every ounce of energy you have—packing boxes, coordinating movers, transferring utilities, and managing closing or lease deadlines. The last thing you want after the final box is loaded onto the truck is to spend six hours scrubbing an oven, wiping cabinet interiors, and detailing baseboards.',
      'Mojo Cleaning’s Move-Out and Turnover Cleaning service covers our full 56-point empty-home checklist so you can hand over the keys with confidence. We clean inside and outside of all kitchen cabinets, drawers, and bathroom vanities, detail the interior of the oven and refrigerator, wipe down closet and pantry shelves, wet-wipe window blinds, scrub bathrooms, and leave all floors spotless.',
      'Whether you are a tenant completing a lease inspection, a homeowner preparing for a buyer’s final walk-through, or a landlord/realtor turning over a property between occupants, every Move-Out Clean is backed by our 48-Hour Happiness Guarantee.',
    ],
    idealFor: [
      'Tenants and relocating personnel completing lease-end move-out inspections',
      'Home sellers fulfilling contract broom-clean or professional turnover expectations before closing',
      'Real estate agents and property managers preparing vacant homes for immediate market readiness',
      'Landlords resetting single-family rental properties between long-term residents',
    ],
    scopeByRoom: [
      {
        roomName: 'Kitchen Turnover Standard (24 Included Tasks)',
        includedItems: [
          'Clean inside and outside of all kitchen cabinets, drawers, and pantry shelves',
          'Deep degrease inside of oven, stovetop, burners, range hood, and microwave',
          'Clean and sanitize inside and outside of refrigerator and freezer',
          'Sanitize countertops, backsplash, sink, disposal area, baseboards, and floors',
        ],
      },
      {
        roomName: 'Bathrooms Turnover Standard (17 Included Tasks)',
        includedItems: [
          'Wipe and sanitize inside and outside of all vanity cabinets, drawers, and medicine cabinets',
          'Scrub and descale showers, tubs, glass doors, tile grout, toilets, and sinks',
          'Wet-wipe bathroom blinds, baseboards, doors, frames, mirrors, and floors',
        ],
      },
      {
        roomName: 'Bedrooms, Closets & Living Areas (15 Included Tasks)',
        includedItems: [
          'Wipe down all bedroom and hallway closet shelves, ledges, and window sills',
          'Wet-wipe window blinds/shutters, interior doors, frames, and baseboards throughout',
          'Dust ceiling fans, light fixtures, air vents, and remove cobwebs from corners',
          'Vacuum all carpeted rooms/stairs and mop all hard flooring prior to lockup',
        ],
      },
    ],
    includedHighlights: [
      'Complete 56-point inspection-ready checklist (Kitchen, Bathrooms, Closets & Living Areas)',
      'Inside oven, inside refrigerator, and inside all cabinets, drawers, and closets included',
      'Itemized invoice/receipt provided for landlords, property managers, or closing documentation',
      'Backed by our 48-Hour Happiness Guarantee for walk-through peace of mind',
    ],
    excludedOrConfirmationItems: [
      'Property must be completely vacated of furniture, trash, and personal belongings prior to arrival',
      'Power and water must remain connected through the completion of the cleaning appointment',
      'Wall patching, painting, or carpet steam cleaning are not included',
      'While our 56-point turnover standard prepares the property for inspection and includes a 48-Hour Guarantee on checklist items, final lease acceptance or security deposit return is determined by your landlord or property manager',
    ],
    benefits: [
      {
        title: 'Inspection & Walk-Through Ready',
        description:
          'Covers the exact interior appliance, cabinet, baseboard, and blind details that landlords and buyers inspect.',
      },
      {
        title: 'Professional Receipt Documentation',
        description:
          'Need proof of professional cleaning for your lease agreement or closing packet? We provide clear documentation.',
      },
      {
        title: '48-Hour Re-Clean Protection',
        description:
          'If a property manager or buyer notes any missed checklist item within 48 hours, we return to spot-clean for free.',
      },
    ],
    preparationTips: [
      'Book your Move-Out Clean for after the movers have finished loading all furniture and boxes.',
      'Keep electricity and water utilities active until the day after your clean is completed.',
      'Defrost the freezer if needed and remove all food items from the refrigerator and pantry prior to our arrival.',
    ],
    howItWorks: [
      {
        stepNumber: '01',
        title: 'Request Your Move-Out Quote',
        description:
          'Let us know your property’s square footage, bed/bath count, and move-out / key-return deadline.',
      },
      {
        stepNumber: '02',
        title: '56-Point Vacant Property Clean',
        description:
          'Once your movers finish, our team details every appliance, cabinet, closet, bathroom, and floor.',
      },
      {
        stepNumber: '03',
        title: 'Turn In Keys With Confidence',
        description:
          'Receive your completion confirmation and receipt, backed by our 48-Hour Happiness Guarantee.',
      },
    ],
    cadenceOptions: ['One-Time Move-Out Turnover', 'Realtor / Property Manager Recurring Partner'],
    relatedServiceIds: [
      'move-in-cleaning',
      'deep-house-cleaning',
      'post-construction-cleaning',
    ],
    availableLocationIds: [
      'huntsville-al',
      'madison-al',
      'hampton-cove-al',
      'owens-cross-roads-al',
      'athens-al',
    ],
    heroImage: {
      src: '/images/team-cabinet-detail.jpg',
      webp: '/images/team-cabinet-detail.webp',
      webpMobile: '/images/team-cabinet-detail-640w.webp',
      alt: 'Spotless vacant home interior with polished hardwood floors and empty kitchen after move-out cleaning',
      width: 1280,
      height: 714,
      caption: 'Inspection-ready 56-point move-out cleaning for leases, sales, and property turnovers.',
    },
    secondaryImage: {
      src: '/images/team-cabinet-detail.jpg',
      webp: '/images/team-cabinet-detail.webp',
      webpMobile: '/images/team-cabinet-detail-640w.webp',
      alt: 'Mojo Cleaning team member scrubbing inside kitchen base cabinets for a move-out turnover',
      width: 960,
      height: 1280,
      caption: 'Interior cabinets, drawers, oven, and refrigerator cleaned to inspection standards.',
    },
    quoteFormValue: 'Move-In & Move-Out Cleaning',
    ghlMetaValue: 'Move-Out Cleaning',
    faqs: [
      {
        id: 'faq-moveout-1',
        question: 'Do you provide a cleaning receipt for my landlord or property manager?',
        answer:
          'Yes. Upon completion of your Move-Out Clean, we can provide an itemized receipt confirming that a professional 56-point turnover clean (including inside oven, refrigerator, and cabinets) was completed.',
        category: 'service',
        serviceId: 'move-out-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-moveout-2',
        question: 'What if my landlord or buyer points out a missed spot during the walk-through?',
        answer:
          'Every Move-Out Clean is protected by our 48-Hour Happiness Guarantee. If any item on our 56-point checklist is flagged within 48 hours of service completion, contact us and we will return to re-clean that area at no extra cost.',
        category: 'service',
        serviceId: 'move-out-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-moveout-3',
        question: 'Does the house need to be completely empty for a Move-Out Clean?',
        answer:
          'Yes, for a true Move-Out Clean we ask that all furniture, boxes, and food items be removed so our specialists can clean inside every cabinet, drawer, closet, and appliance and mop all floors wall-to-wall.',
        category: 'service',
        serviceId: 'move-out-cleaning',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-Out and Turnover Cleaning Service | Mojo Cleaning',
      metaDescription:
        'Inspection-ready 56-point move-out cleaning. Inside oven, fridge, cabinets, closets & baseboards. 48-hour guarantee.',
      canonicalPath: '/huntsville-al/services/move-out-cleaning/',
      primaryIntent: 'Book an inspection-ready move-out or lease-end house cleaning service',
      primaryQuery: 'move out cleaning service',
      secondaryQueries: ['move out house cleaning', 'lease end cleaning service'],
    },
    publicationStatus: 'published',
  },
  {
    id: 'post-construction-cleaning',
    slug: 'post-construction-cleaning',
    urlPath: '/huntsville-al/services/post-construction-cleaning/',
    name: 'Post-Construction and Renovation Cleaning',
    shortName: 'Post-Construction Cleaning',
    checklistPointsLabel: 'Multi-Pass HEPA Dust & Detail Protocol',
    categoryLabel: 'After-Build & Remodel Detailing',
    badge: 'Fine Drywall & Sawdust Extraction',
    tagline: 'From jobsite dust to showcase-ready living.',
    shortDescription:
      'Specialized multi-pass dust extraction and surface detailing after kitchen/bath remodels, room additions, or custom home builds.',
    longDescription: [
      'Even after contractors sweep up heavy debris, a newly built or remodeled home is coated in fine drywall dust and sawdust that settles inside cabinet hinges, on top of pendant lights, along window tracks, and across newly installed hardwood or luxury vinyl plank floors.',
      'Wiping post-construction dust with an ordinary wet rag only turns drywall particles into a chalky film—or worse, scratches brand-new fixtures and glass. Mojo Cleaning’s Post-Construction and Renovation Cleaning service uses a systematic dry-to-wet HEPA vacuuming and microfiber detailing protocol designed specifically for newly finished residential spaces.',
      'Whether you have just completed a kitchen or master bath renovation, finished a room addition, or are preparing a newly built custom home for move-in, our insured specialists remove the construction haze so your craftsmanship shines.',
    ],
    idealFor: [
      'Homeowners completing kitchen, bathroom, or whole-home remodeling projects',
      'Custom home builders and residential contractors needing final showcase/walk-through detailing',
      'New-construction buyers preparing a newly built house before move-in day',
      'Interior designers and realtors preparing newly renovated properties for photography or occupancy',
    ],
    scopeByRoom: [
      {
        roomName: 'High-to-Low Drywall Dust Extraction',
        includedItems: [
          'HEPA vacuuming and microfiber dusting of ceiling fans, recessed light trims, pendant fixtures, and vents',
          'Detailed wiping of interior doors, door tops, window frames, sills, ledges, and baseboards',
          'Vacuuming and damp-wiping inside and outside of newly installed cabinets, drawers, and closet shelves',
        ],
      },
      {
        roomName: 'Kitchen & Bath New-Fixture Detailing',
        includedItems: [
          'Careful removal of manufacturer stickers/labels from new appliances, mirrors, and plumbing fixtures (upon request)',
          'Scratch-safe polishing of stone countertops, tile backsplashes, frameless shower glass, and brass/matte-black hardware',
          'Sanitizing sinks, tubs, toilets, and appliance interiors/exteriors so spaces are ready for immediate use',
        ],
      },
      {
        roomName: 'Multi-Pass Floor & Threshold Care',
        includedItems: [
          'Thorough vacuuming of carpet edges, baseboards, and closet corners to remove settled construction grit',
          'Multi-pass microfiber damp mopping of hardwood, LVP, and tile floors to eliminate chalky drywall haze',
        ],
      },
    ],
    includedHighlights: [
      'Multi-pass HEPA vacuum and microfiber dust capture across ceilings, trim, cabinets, and floors',
      'Interior and exterior detailing of new kitchen cabinetry, bathroom vanities, and closet built-ins',
      'Scratch-safe care for new quartz, marble, matte-black/brass fixtures, and hardwood flooring',
      'Insured and bonded specialists experienced with residential remodels and custom builds',
    ],
    excludedOrConfirmationItems: [
      'Hauling away large construction lumber, drywall scraps, or dumpster debris (contractors should complete rough debris removal first)',
      'Scraping heavy cured paint overspray, stucco, or mortar off exterior brick or high exterior glass without prior on-site confirmation',
      'Active trades should be finished in the zones being detailed so dust does not immediately resettle',
      'Covers non-hazardous residential drywall and sawdust detailing only; does not include hazardous-material abatement (asbestos, lead paint, or mold remediation)',
    ],
    benefits: [
      {
        title: 'Eliminates Chalky Drywall Haze',
        description:
          'Our dry-capture-then-damp-polish sequence prevents fine sheetrock dust from streaking cabinets and floors.',
      },
      {
        title: 'Protects Brand-New Finishes',
        description:
          'We use clean, non-abrasive microfiber cloths and surface-safe cleaners on new stone, glass, and hardware.',
      },
      {
        title: 'Ready for Immediate Move-In',
        description:
          'Combines construction dust extraction with full residential sanitization so you can unpack right away.',
      },
    ],
    preparationTips: [
      'Ensure all sanding, painting, grouting, and contractor punch-list work is complete before your scheduled clean.',
      'Confirm that electricity, lighting, and running hot water are active at the property.',
      'Let us know if your project was a single-room remodel (e.g., kitchen + adjacent living room) or a whole-home build.',
    ],
    howItWorks: [
      {
        stepNumber: '01',
        title: 'Tell Us About Your Build or Remodel',
        description:
          'Share the square footage or remodeled rooms, finish types, and target completion/walk-through date.',
      },
      {
        stepNumber: '02',
        title: 'Multi-Pass Dust & Detail Execution',
        description:
          'Our team performs high-to-low HEPA dust removal, cabinet/drawer detailing, and multi-pass floor care.',
      },
      {
        stepNumber: '03',
        title: 'Showcase-Ready Final Walk-Through',
        description:
          'Enjoy your newly renovated space completely free of jobsite dust, backed by our 48-Hour Guarantee.',
      },
    ],
    cadenceOptions: [
      'Single-Room / Zone Remodel Clean',
      'Whole-Home New-Build Final Clean',
      'Builder / Contractor Partner Scheduling',
    ],
    relatedServiceIds: [
      'move-in-cleaning',
      'deep-house-cleaning',
      'recurring-residential-cleaning',
    ],
    availableLocationIds: [
      'huntsville-al',
      'madison-al',
      'hampton-cove-al',
      'owens-cross-roads-al',
      'athens-al',
    ],
    heroImage: {
      src: '/images/team-post-construction.jpg',
      webp: '/images/team-post-construction.webp',
      webpMobile: '/images/team-post-construction-640w.webp',
      alt: 'Newly renovated kitchen with custom oak cabinetry, quartz island, and spotless hardwood floors after post-construction cleaning',
      width: 1280,
      height: 714,
      caption: 'Specialized drywall dust extraction and fixture detailing after renovations and new builds.',
    },
    secondaryImage: {
      src: '/images/team-post-construction.jpg',
      webp: '/images/team-post-construction.webp',
      webpMobile: '/images/team-post-construction-640w.webp',
      alt: 'Mojo Cleaning specialist detailing newly installed cabinetry and stainless steel refrigerator after construction',
      width: 960,
      height: 1280,
      caption: 'Post-construction detailing of new cabinetry, countertops, and appliances.',
    },
    quoteFormValue: 'Post-Construction Cleaning',
    ghlMetaValue: 'Post-Construction Cleaning',
    faqs: [
      {
        id: 'faq-postcon-1',
        question: 'Why does a remodeled home need a specialized Post-Construction Clean instead of a standard clean?',
        answer:
          'Sanding drywall, cutting trim, and installing tile create ultra-fine silica and gypsum dust that settles inside cabinet hinges, air vents, window tracks, and floor grain. Our Post-Construction Clean uses HEPA dry-capture followed by multi-pass damp microfiber detailing so dust is removed without scratching new surfaces.',
        category: 'service',
        serviceId: 'post-construction-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-postcon-2',
        question: 'Can I book a Post-Construction Clean for just a kitchen or bathroom remodel?',
        answer:
          'Yes! Whether you remodeled a single master bathroom, updated a kitchen and living area, or built a brand-new custom home, we tailor the scope and quote to the exact zones affected by construction dust.',
        category: 'service',
        serviceId: 'post-construction-cleaning',
        publicationStatus: 'published',
      },
      {
        id: 'faq-postcon-3',
        question: 'Do you work with custom home builders and remodeling contractors?',
        answer:
          'Yes. We partner with homeowners, interior designers, remodelers, and custom builders to deliver reliable final walk-through cleans.',
        category: 'service',
        serviceId: 'post-construction-cleaning',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Post-Construction and Renovation Cleaning | Mojo Cleaning',
      metaDescription:
        'Professional post-construction and after-remodel residential cleaning. Fine drywall dust removal & cabinet detailing.',
      canonicalPath: '/huntsville-al/services/post-construction-cleaning/',
      primaryIntent: 'Hire a post-construction or post-renovation residential cleaning service',
      primaryQuery: 'post construction cleaning service',
      secondaryQueries: ['after remodel cleaning service', 'new construction house cleaning'],
    },
    publicationStatus: 'published',
  },
];

export const SERVICES_BY_ID: Record<ServiceId, ServiceEntity> = SERVICES_DATA.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<ServiceId, ServiceEntity>
);
