/**
 * SECTION 3, 12, 13 & 14 — LOCATION-SPECIFIC SERVICE PAGES (25 VERIFIED ROUTES)
 * Every verified service offered in each of the 5 locations has its own complete,
 * isolated service page at /{locationSlug}/services/{serviceSlug}/ with original
 * copy, local customer guidance, neighborhood context, FAQs, and unique SEO metadata.
 */

import type { LocationId, LocationServiceEntity, ServiceId } from './entities';
import { LOCATIONS_DATA } from './locations-data';
import { SERVICES_BY_ID } from './services-data';

export const SERVICE_LOCATIONS_DATA: LocationServiceEntity[] = [
  // =========================================================================
  // 1. HUNTSVILLE, AL — 5 ISOLATED SERVICE PAGES (/huntsville-al/services/*)
  // =========================================================================
  {
    id: 'huntsville-al__recurring-residential-cleaning',
    serviceId: 'recurring-residential-cleaning',
    locationId: 'huntsville-al',
    urlPath: '/huntsville-al/services/recurring-residential-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Recurring House Cleaning in Huntsville, Alabama',
    subheadline:
      'Weekly, bi-weekly, and monthly home maintenance tailored for Blossomwood, Twickenham, Five Points, Jones Valley, South Huntsville, and Village of Providence households.',
    introParagraphs: [
      'Between weekday commutes to Cummings Research Park, Redstone Arsenal, or the Huntsville Hospital Medical District and busy evenings with family, keeping up with a multi-bedroom Huntsville home shouldn’t steal your entire Saturday. Mojo Cleaning provides consistent weekly, bi-weekly, and monthly recurring residential cleaning across Huntsville, AL.',
      'Every recurring visit follows our 37-task Standard Maintenance Checklist—sanitizing kitchen countertops and appliances, scrubbing showers and vanities, dusting ceiling fans and historic baseboards, and vacuuming and mopping all floors with our own supplies and HEPA equipment.',
    ],
    localCustomerGuidance:
      'For historic homes in Twickenham, Old Town, and Five Points (35801), our teams use damp microfiber floor care and pH-neutral solutions on original hardwoods. For larger family layouts in Jones Valley, Blossomwood, and South Huntsville (35802, 35803), we customize room priorities so high-traffic kitchens, mudrooms, and primary baths receive extra care.',
    neighborhoodSpotlight: [
      'Twickenham, Old Town & Five Points (35801)',
      'Blossomwood & Monte Sano Foothills (35801)',
      'Jones Valley, Valley Hill & Hampton Ridge (35802)',
      'South Huntsville & English Village (35803)',
      'Village of Providence & Research Park Corridor (35806)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Consistent Weekday Arrival Windows',
        detail:
          'Choose a recurring weekday slot that fits your work-from-home or Redstone Arsenal / Research Park schedule.',
      },
      {
        title: 'Pet-Friendly & Eco-Conscious Options',
        detail:
          'We happily work around friendly dogs and cats and offer non-toxic, eco-friendly products on request.',
      },
      {
        title: 'Protected by Our 48-Hour Guarantee',
        detail:
          'If any task on your Huntsville recurring checklist is missed, notify us within 48 hours for a complimentary re-clean.',
      },
    ],
    includedSummary: [
      '16 Kitchen tasks: countertops, backsplash, microwave inside/out, stovetop, sink, appliance exteriors, floors',
      '12 Bathroom tasks: showers, tubs, toilets, vanities, mirrors, fixtures, and sanitized floors',
      '9 Bedroom & Living tasks: furniture dusting, ceiling fans, window sills, bed making, vacuuming & mopping',
    ],
    localSchedulingNote:
      'Available Monday – Friday (8:00 AM – 6:00 PM) and Saturdays by appointment across all Huntsville ZIP codes (35801–35811).',
    image: {
      src: '/images/service-recurring.jpg',
      webp: '/images/service-recurring.webp',
      webpMobile: '/images/service-recurring-640w.webp',
      alt: 'Freshly cleaned Huntsville living room with hardwood floors after bi-weekly recurring cleaning',
      width: 1280,
      height: 714,
      caption: 'Weekly, bi-weekly, and monthly recurring house cleaning across Huntsville, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-hsv-rec-1',
        question: 'What is the most popular recurring cleaning frequency in Huntsville, AL?',
        answer:
          'Bi-weekly (every two weeks) is our most requested schedule among Huntsville families, while households with multiple pets or frequent entertaining often choose weekly service.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hsv-rec-2',
        question: 'Can my Huntsville recurring team change bed sheets during their visit?',
        answer:
          'Yes! Making beds is included in every recurring visit, and if you leave a fresh set of sheets stacked on the bed, our team will gladly strip and remake it.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hsv-rec-3',
        question: 'How do you handle keypad or smart-lock entry for Huntsville commuters?',
        answer:
          'Most of our clients working at Research Park, the Medical District, or Redstone Arsenal provide a recurring smart-lock code or garage keypad code stored securely in their booking profile.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Recurring House Cleaning in Huntsville, AL | Mojo Cleaning',
      metaDescription:
        'Explore weekly, biweekly, and monthly recurring house cleaning in Huntsville, AL with Mojo Cleaning. Insured 37-point home maintenance and 48-hour guarantee.',
      canonicalPath: '/huntsville-al/services/recurring-residential-cleaning/',
      primaryIntent: 'Book recurring weekly, biweekly, or monthly house cleaning in Huntsville, AL',
      primaryQuery: 'recurring house cleaning huntsville al',
      secondaryQueries: [
        'weekly house cleaning huntsville al',
        'biweekly house cleaning huntsville al',
        'monthly house cleaning huntsville al',
        'regular house cleaning service huntsville al',
      ],
    },
  },
  {
    id: 'huntsville-al__deep-house-cleaning',
    serviceId: 'deep-house-cleaning',
    locationId: 'huntsville-al',
    urlPath: '/huntsville-al/services/deep-house-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Deep House Cleaning in Huntsville, Alabama',
    subheadline:
      '47-point top-to-bottom residential deep cleaning for seasonal refreshes, first-time resets, and pre-listing home preparation across Huntsville.',
    introParagraphs: [
      'When routine wiping isn’t enough to tackle spring tree pollen on Monte Sano and Blossomwood window sills, kitchen cooking film on cabinet fronts, or buildup along baseboards and shower tracks, Mojo Cleaning’s 47-point Deep House Cleaning service resets your Huntsville home from top to bottom.',
      'Our insured Huntsville specialists perform all 37 standard maintenance tasks plus 10 intensive detail tasks—hand-wiping baseboards, interior doors and door frames, kitchen and bathroom cabinet exteriors, switch plates, ceiling fan blades, and tile grout lines.',
    ],
    localCustomerGuidance:
      'Huntsville homeowners frequently schedule a Deep Clean in early spring after oak and pine pollen season, prior to hosting Thanksgiving or December holidays, or before listing a residence in Jones Valley, Blossomwood, or Five Points for sale.',
    neighborhoodSpotlight: [
      'Monte Sano & Blossomwood (High-Canopy Residential Areas)',
      'Twickenham & Historic Five Points Millwork Homes',
      'Jones Valley & South Huntsville Family Residences',
      'Village of Providence & Research Park Homes',
    ],
    whyLocalHomeownersChoose: [
      {
        title: '47-Point Hand-Detailed Standard',
        detail:
          'We hand-wipe baseboards, cabinet doors, door frames, and light switches rather than running a feather duster over them.',
      },
      {
        title: 'Pre-Listing & Open-House Favorite',
        detail:
          'As praised by Huntsville homeowner David L., our pre-listing deep cleans leave baseboards and corners looking brand new for buyer walk-throughs.',
      },
      {
        title: 'Seamless Transition to Recurring Care',
        detail:
          'Once your Huntsville home is deep cleaned, you can lock in lower bi-weekly or monthly maintenance rates.',
      },
    ],
    includedSummary: [
      '20 Kitchen tasks including exterior cabinet doors, range hood degreasing, doors/frames, and baseboards',
      '15 Bathroom tasks including shower glass/grout scrubbing, vanity fronts, baseboards, and fixtures',
      '12 Bedroom & Living tasks including hand-wiped baseboards, interior doors, ceiling fans, and floor edging',
    ],
    localSchedulingNote:
      'One-time Deep Cleans and Kickoff Deep Cleans are available Monday – Friday across Huntsville (35801–35811).',
    image: {
      src: '/images/service-deep.jpg',
      webp: '/images/service-deep.webp',
      webpMobile: '/images/service-deep-640w.webp',
      alt: 'Deep cleaned master bathroom with frameless glass shower and brass fixtures in Huntsville, AL',
      width: 1280,
      height: 714,
      caption: '47-point deep house cleaning across Huntsville, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-hsv-deep-1',
        question: 'Can I book a one-time Deep Clean in Huntsville before putting my house on the market?',
        answer:
          'Yes! Pre-listing Deep Cleans are one of our most popular Huntsville services. We focus heavily on baseboards, cabinet fronts, glass, fixtures, and floors so your listing photos and showings shine.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hsv-deep-2',
        question: 'Can I add inside-oven or inside-refrigerator cleaning to my Huntsville Deep Clean?',
        answer:
          'Absolutely. Just mention inside-oven or inside-refrigerator care in your quote request and we will include those interior appliance tasks in your Huntsville appointment.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hsv-deep-3',
        question: 'Can I customize which rooms are included in my Huntsville Deep Clean?',
        answer:
          'Yes. Every Huntsville Deep Clean can be tailored to your floor plan—skip unused rooms or add interior oven and refrigerator detailing.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Deep House Cleaning in Huntsville, AL | Mojo Cleaning',
      metaDescription:
        'Learn what is included in Mojo Cleaning’s 47-point deep house cleaning service in Huntsville, AL, and request a personalized quote for your home.',
      canonicalPath: '/huntsville-al/services/deep-house-cleaning/',
      primaryIntent: 'Book a one-time or seasonal deep cleaning service in Huntsville, AL',
      primaryQuery: 'deep house cleaning huntsville al',
      secondaryQueries: [
        'deep cleaning huntsville al',
        'deep cleaning service huntsville al',
        'one-time deep cleaning huntsville al',
        'detailed house cleaning huntsville al',
        'deep cleaning cost huntsville al',
      ],
    },
  },
  {
    id: 'huntsville-al__move-in-cleaning',
    serviceId: 'move-in-cleaning',
    locationId: 'huntsville-al',
    urlPath: '/huntsville-al/services/move-in-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Move-In Cleaning in Huntsville, Alabama',
    subheadline:
      'Full 56-point empty-home sanitization—inside cabinets, drawers, closets, oven, and refrigerator—before you unpack in Huntsville.',
    introParagraphs: [
      'Relocating to Huntsville for a role at Redstone Arsenal, Cummings Research Park, or the Medical District—or moving across town into a new home in Blossomwood, South Huntsville, or Providence—is hectic enough without scrubbing kitchen drawers on moving day.',
      'Mojo Cleaning’s Move-In Cleaning service in Huntsville, AL covers all 56 tasks on our Master Checklist while your new home is empty. We clean inside every kitchen cabinet, drawer, pantry shelf, bathroom vanity, and closet shelf, plus the interior of the oven and refrigerator, window blinds, baseboards, and floors.',
    ],
    localCustomerGuidance:
      'We recommend booking your Huntsville Move-In Clean for the day after closing or key pickup and the day before your moving truck unloads. Ensure water and Huntsville Utilities power are active so our team has full lighting and hot water.',
    neighborhoodSpotlight: [
      'Research Park & Village of Providence Relocations (35806)',
      'Blossomwood, Twickenham & Five Points Closings (35801)',
      'Jones Valley & South Huntsville Family Moves (35802, 35803)',
      'Northeast Huntsville & New-Home Corridors (35811)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Every Shelf & Drawer Sanitized',
        detail:
          'Unpack dishes, silverware, and clothing straight into freshly wiped cabinets, drawers, and closets.',
      },
      {
        title: 'Inside Oven & Fridge Included',
        detail:
          'No extra add-on fees required—interior oven and refrigerator detailing are built into every Move-In Clean.',
      },
      {
        title: 'Flexible Closing-Date Coordination',
        detail:
          'If your Huntsville closing or key handoff shifts by a day, our dispatch office works with you to adjust your slot.',
      },
    ],
    includedSummary: [
      '24 Kitchen tasks including inside all cabinets, drawers, pantry shelves, oven interior, and fridge interior',
      '17 Bathroom tasks including inside vanity cabinets/drawers, medicine cabinets, shower descaling, and blinds',
      '15 Bedroom & Living tasks including closet shelves, wet-wiped window blinds, baseboards, doors, and floors',
    ],
    localSchedulingNote:
      'Available across all Huntsville ZIP codes; book 5–10 days before closing for preferred arrival windows.',
    image: {
      src: '/images/service-move.jpg',
      webp: '/images/service-move.webp',
      webpMobile: '/images/service-move-640w.webp',
      alt: 'Vacant Huntsville home interior with spotless oak floors and sanitized kitchen cabinets ready for move-in',
      width: 1280,
      height: 714,
      caption: '56-point empty-home Move-In Cleaning across Huntsville, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-hsv-movein-1',
        question: 'Can you access our new Huntsville home via realtor lockbox or keypad?',
        answer:
          'Yes! If you are still in transit to Huntsville on cleaning day, simply share your keypad or lockbox code and our insured team will lock up securely when finished.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hsv-movein-2',
        question: 'Are inside cabinets, oven, and refrigerator included in the Huntsville Move-In Clean?',
        answer:
          'Yes—all 56 points on our checklist, including inside kitchen cabinets and drawers, inside bathroom vanities, closet shelving, inside oven, and inside refrigerator, are included.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hsv-movein-3',
        question: 'What if the previous owner left dust inside the window blinds?',
        answer:
          'Wet hand-wiping of window blinds and shutters across the home is included in every 56-point Move-In Clean.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-In Cleaning in Huntsville, AL | Mojo Cleaning',
      metaDescription:
        'Explore our 56-point empty-home move-in cleaning in Huntsville, AL. Inside cabinets, drawers, closets, oven, and fridge sanitized before you unpack.',
      canonicalPath: '/huntsville-al/services/move-in-cleaning/',
      primaryIntent: 'Book a pre-move-in house cleaning service in Huntsville, AL',
      primaryQuery: 'move-in cleaning huntsville al',
      secondaryQueries: [
        'move-in house cleaning huntsville al',
        'move in cleaning service huntsville al',
        'new home cleaning before move in huntsville al',
      ],
    },
  },
  {
    id: 'huntsville-al__move-out-cleaning',
    serviceId: 'move-out-cleaning',
    locationId: 'huntsville-al',
    urlPath: '/huntsville-al/services/move-out-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Move-Out Cleaning in Huntsville, Alabama',
    subheadline:
      'Inspection-ready 56-point move-out cleaning for tenants, home sellers, landlords, and realtors across Huntsville.',
    introParagraphs: [
      'Whether you are turning in keys on a lease near Downtown Huntsville or the Village of Providence, or preparing a home in South Huntsville or Blossomwood for a buyer’s final closing walk-through, our 56-point Move-Out Cleaning service handles the heavy scrubbing after the movers pull away.',
      'We clean inside and outside of every kitchen cabinet, drawer, bathroom vanity, oven, and refrigerator, wipe closet shelves and window blinds, hand-detail baseboards and doors, and mop all floors wall-to-wall.',
    ],
    localCustomerGuidance:
      'Schedule your Huntsville Move-Out Clean for after all furniture and boxes are removed, and keep Huntsville Utilities electricity and water connected through the day of service. We provide itemized receipts for property managers and closing packets.',
    neighborhoodSpotlight: [
      'Downtown Huntsville & MidCity / Research Park Rentals (35801, 35805, 35806)',
      'South Huntsville & Jones Valley Home Sales (35802, 35803)',
      'Single-Family Turnovers Across All Huntsville ZIPs',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Lease & Deposit Protection',
        detail:
          'Addresses the exact interior oven, fridge, blind, and baseboard items checked on Huntsville landlord inspection forms.',
      },
      {
        title: 'Itemized Completion Receipt',
        detail:
          'Provided immediately upon completion for your property manager or real estate agent.',
      },
      {
        title: '48-Hour Walk-Through Guarantee',
        detail:
          'If your landlord or buyer flags any checklist item within 48 hours, we return to re-clean that spot at no cost.',
      },
    ],
    includedSummary: [
      'All 56 Master Checklist points across Kitchen, Bathrooms, Closets & Living Spaces',
      'Inside oven, inside refrigerator/freezer, and inside all cabinets, drawers, and closets',
      'Wet-wiped window blinds, hand-wiped baseboards, interior doors, and full floor sanitation',
    ],
    localSchedulingNote:
      'Weekday and Saturday-by-appointment turnover slots available across Huntsville (35801–35811).',
    image: {
      src: '/images/team-cabinet-detail.jpg',
      webp: '/images/team-cabinet-detail.webp',
      webpMobile: '/images/team-cabinet-detail-640w.webp',
      alt: 'Mojo Cleaning specialist detailing the interior of kitchen cabinets during a Huntsville move-out clean',
      width: 960,
      height: 1280,
      caption: 'Inspection-ready cabinet, appliance, and floor turnover cleaning in Huntsville.',
    },
    faqs: [
      {
        id: 'faq-sl-hsv-moveout-1',
        question: 'Will my Huntsville property manager accept a Mojo Cleaning receipt as proof of professional move-out cleaning?',
        answer:
          'Yes. We provide an itemized invoice and receipt detailing our 56-point Move-Out turnover scope, including interior oven, refrigerator, and cabinet cleaning.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hsv-moveout-2',
        question: 'Do you partner with Huntsville realtors and property managers for recurring turnovers?',
        answer:
          'Yes! We work directly with Huntsville real estate agents, listing coordinators, and property managers to turn over properties quickly between occupants.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hsv-moveout-3',
        question: 'What if movers finish late in the afternoon—can we book for the next morning?',
        answer:
          'Yes, scheduling your Move-Out Clean for the morning after your moving truck departs ensures the home is 100% vacant so our team can work without obstruction.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-Out Cleaning in Huntsville, AL | Mojo Cleaning',
      metaDescription:
        'Book inspection-ready 56-point move-out cleaning in Huntsville, AL. Inside oven, fridge, cabinets, closets & baseboards with itemized receipts and guarantee.',
      canonicalPath: '/huntsville-al/services/move-out-cleaning/',
      primaryIntent: 'Hire an inspection-ready move-out cleaning service in Huntsville, AL',
      primaryQuery: 'move-out cleaning huntsville al',
      secondaryQueries: [
        'move-out cleaning service huntsville al',
        'move-out house cleaning huntsville al',
        'rental turnover cleaning huntsville al',
        'move-out cleaning cost huntsville al',
      ],
    },
  },
  {
    id: 'huntsville-al__post-construction-cleaning',
    serviceId: 'post-construction-cleaning',
    locationId: 'huntsville-al',
    urlPath: '/huntsville-al/services/post-construction-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Post-Construction Cleaning in Huntsville, Alabama',
    subheadline:
      'Specialized HEPA drywall dust extraction and fixture detailing after kitchen/bath remodels and custom home builds in Huntsville.',
    introParagraphs: [
      'From historic home additions and kitchen remodels in Blossomwood, Five Points, and Twickenham to newly built residences in Northeast and South Huntsville, construction projects leave behind ultra-fine drywall dust that settles on every horizontal and vertical surface.',
      'Mojo Cleaning’s Post-Construction Cleaning service in Huntsville, AL uses a multi-pass HEPA dry-capture and damp microfiber protocol to remove sheetrock dust from inside new cabinetry, drawers, closet shelves, light fixtures, window sills, baseboards, and hardwood or LVP floors.',
    ],
    localCustomerGuidance:
      'Whether you are a Huntsville homeowner finishing a master bathroom renovation or a custom builder preparing a newly completed home for buyer walk-through, our insured specialists detail the space without scratching new glass, stone, or hardware.',
    neighborhoodSpotlight: [
      'Blossomwood, Five Points & Twickenham Remodels (35801)',
      'Jones Valley & Monte Sano Custom Renovations (35802)',
      'Northeast & South Huntsville New Builds (35803, 35811)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Multi-Pass HEPA Dust Removal',
        detail:
          'Captures fine gypsum and sawdust from cabinet hinges, vents, and floor seams without leaving chalky streaks.',
      },
      {
        title: 'Single-Room Remodel or Whole-Home Scope',
        detail:
          'Book for a newly remodeled kitchen/bath zone or an entire newly constructed Huntsville residence.',
      },
      {
        title: 'Insured & Builder-Friendly',
        detail:
          'Full liability coverage and reliable scheduling for contractor handoffs and homeowner move-ins.',
      },
    ],
    includedSummary: [
      'Overhead-to-floor HEPA vacuuming and microfiber detailing of fixtures, vents, doors, and trim',
      'Interior and exterior cleaning of newly installed kitchen cabinets, vanities, drawers, and closets',
      'Scratch-safe polishing of new countertops, mirrors, shower glass, and multi-pass floor mopping',
    ],
    localSchedulingNote:
      'Available across Huntsville (35801–35811); schedule once sanding, painting, and grouting are complete.',
    image: {
      src: '/images/service-post-construction.jpg',
      webp: '/images/service-post-construction.webp',
      webpMobile: '/images/service-post-construction-640w.webp',
      alt: 'Newly renovated kitchen in Huntsville, AL with oak cabinets and quartz counters after post-construction cleaning',
      width: 1280,
      height: 714,
      caption: 'After-remodel and post-construction detailing across Huntsville, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-hsv-post-1',
        question: 'Can you clean just the remodeled rooms of our Huntsville house (plus adjacent dusty hallways)?',
        answer:
          'Yes! Many Huntsville clients hire us after a kitchen or bathroom remodel. We detail the newly renovated rooms plus any adjacent living spaces where drywall dust migrated.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hsv-post-2',
        question: 'Do you remove manufacturer stickers from new windows and appliances?',
        answer:
          'Yes—upon request, our specialists carefully remove manufacturer labels and adhesive residue from new appliances, mirrors, and plumbing fixtures using scratch-safe techniques.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hsv-post-3',
        question: 'Do contractors need to remove lumber and trash before Mojo Cleaning arrives?',
        answer:
          'Yes. Rough construction debris, scrap lumber, and paint cans should be cleared first so our team can focus 100% on fine dust extraction and surface sanitization.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'huntsville-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Post-Construction Cleaning in Huntsville, AL | Mojo Cleaning',
      metaDescription:
        'Specialized post-construction & renovation cleaning in Huntsville, AL. Multi-pass HEPA drywall dust removal, cabinet interiors, and scratch-safe floor care.',
      canonicalPath: '/huntsville-al/services/post-construction-cleaning/',
      primaryIntent: 'Hire a post-construction or post-remodel cleaning company in Huntsville, AL',
      primaryQuery: 'post-construction cleaning huntsville al',
      secondaryQueries: [
        'post-construction cleaning service huntsville al',
        'renovation cleaning huntsville al',
        'after-construction cleaning huntsville al',
      ],
    },
  },

  // =========================================================================
  // 2. MADISON, AL — 5 ISOLATED SERVICE PAGES (/madison-al/services/*)
  // =========================================================================
  {
    id: 'madison-al__recurring-residential-cleaning',
    serviceId: 'recurring-residential-cleaning',
    locationId: 'madison-al',
    urlPath: '/madison-al/services/recurring-residential-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Recurring House Cleaning in Madison, Alabama',
    subheadline:
      'Dependable weekly, bi-weekly, and monthly home care for busy families in Clift Farm (35757), Town Madison (35756), and Rainbow Mountain / Hughes Road (35758).',
    introParagraphs: [
      'As Madison client Sarah M. shared, “Walking in on Friday afternoon to a pristine, fresh home is truly the best feeling all week.” Mojo Cleaning’s Recurring Residential Cleaning service in Madison, AL gives dual-career households and busy families their weekends back.',
      'Our insured teams serve all three Madison ZIP codes (35756, 35757, and 35758) on weekly, bi-weekly, and monthly schedules—completing 37 room-by-room tasks across your kitchen, bathrooms, bedrooms, bonus rooms, and living areas with our own supplies and HEPA vacuums.',
    ],
    localCustomerGuidance:
      'Many Madison homes feature two stories, 3 to 5 bedrooms, and upstairs bonus rooms. You can include every room on every visit or customize your recurring plan to focus on main-floor living zones and active family bedrooms.',
    neighborhoodSpotlight: [
      'Clift Farm & Highway 72 Corridor (35757)',
      'Town Madison & Zierdt Road Communities (35756)',
      'Rainbow Mountain, Hughes Road & Mill Creek (35758)',
      'County Line Road & West Madison Subdivisions (35756)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Trusted by Madison Families',
        detail:
          'Vetted, background-checked specialists who treat family homes and pets with care.',
      },
      {
        title: 'Custom Multi-Bedroom Plans',
        detail:
          'Include upstairs bonus rooms every visit or rotate guest bedrooms to fit your household routine.',
      },
      {
        title: '48-Hour Happiness Guarantee',
        detail:
          'Every recurring visit in Madison is backed by our free 48-hour spot re-clean promise.',
      },
    ],
    includedSummary: [
      '37-point recurring checklist covering Kitchen, Bathrooms, Bedrooms, Bonus Rooms & Living Areas',
      'All cleaning solutions, microfiber cloths, mops, and HEPA vacuums brought by our team',
      'Optional non-toxic, eco-friendly product line available for households with pets and young children',
    ],
    localSchedulingNote:
      'Weekly, bi-weekly, and monthly slots available Monday – Friday across 35756, 35757, and 35758.',
    image: {
      src: '/images/service-recurring.jpg',
      webp: '/images/service-recurring.webp',
      webpMobile: '/images/service-recurring-640w.webp',
      alt: 'Pristine family living room in Madison, AL after a bi-weekly recurring clean by Mojo Cleaning',
      width: 1280,
      height: 714,
      caption: 'Bi-weekly and weekly recurring home care across Madison, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-mad-rec-1',
        question: 'Do you serve all three Madison, AL ZIP codes (35756, 35757, 35758) for recurring cleaning?',
        answer:
          'Yes! Our recurring teams are in 35756, 35757, and 35758 every week—covering Clift Farm, Town Madison, Rainbow Mountain, Hughes Road, and County Line Road neighborhoods.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-mad-rec-2',
        question: 'Can we request pet-safe cleaning products for our Madison home?',
        answer:
          'Absolutely. Just check or note eco-friendly / pet-safe preferences in your quote request and our team will use gentle, non-toxic formulas.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-mad-rec-3',
        question: 'What happens if our regular cleaning day falls on a holiday?',
        answer:
          'Our office reaches out in advance whenever a major holiday falls on your normal cleaning day to reschedule your Madison visit to the nearest convenient weekday.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Recurring House Cleaning in Madison, AL | Mojo Cleaning',
      metaDescription:
        'Dependable weekly, biweekly, and monthly recurring house cleaning in Madison, AL (35756, 35757, 35758). Serving Clift Farm, Town Madison & Rainbow Mountain.',
      canonicalPath: '/madison-al/services/recurring-residential-cleaning/',
      primaryIntent: 'Book recurring weekly or biweekly house cleaning in Madison, AL',
      primaryQuery: 'recurring house cleaning madison al',
      secondaryQueries: [
        'weekly house cleaning madison al',
        'biweekly house cleaning madison al',
        'monthly house cleaning madison al',
        'regular house cleaning service madison al',
      ],
    },
  },
  {
    id: 'madison-al__deep-house-cleaning',
    serviceId: 'deep-house-cleaning',
    locationId: 'madison-al',
    urlPath: '/madison-al/services/deep-house-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Deep House Cleaning in Madison, Alabama',
    subheadline:
      '47-point top-to-bottom deep cleaning for multi-bedroom family homes across Madison, Clift Farm, Town Madison, and Rainbow Mountain.',
    introParagraphs: [
      'In active Madison households, baseboards, stair railings, ceiling fans, kitchen cabinet fronts, and multi-bathroom showers collect buildup that a quick weekend tidy can’t reach. Mojo Cleaning’s 47-point Deep House Cleaning service in Madison, AL delivers a thorough top-to-bottom reset.',
      'Whether you are kicking off bi-weekly recurring service, preparing your home near Hughes Road or County Line Road for real estate listing photos, or resetting the house before family visits, our insured specialists hand-detail every room.',
    ],
    localCustomerGuidance:
      'For larger two-story Madison homes with 2.5 to 4 bathrooms and upstairs bonus spaces, our coordinated two-specialist team tackles ceiling fans, baseboards, door frames, and exterior cabinetry systematically in a single visit.',
    neighborhoodSpotlight: [
      'Rainbow Mountain & Hughes Road Family Homes (35758)',
      'Clift Farm & Highway 72 Subdivisions (35757)',
      'County Line Road & Heritage Plantation (35756)',
      'Town Madison & Zierdt Road Residences (35756)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Complete 47-Point Detail Scope',
        detail:
          'Includes hand-wiped baseboards, interior doors, switch plates, and exterior kitchen/bath cabinetry.',
      },
      {
        title: 'Multi-Bathroom Descaling & Scrubbing',
        detail:
          'Eliminates soap scum and hard-water spots from glass shower doors, tile grout, and tubs.',
      },
      {
        title: '48-Hour Happiness Guarantee',
        detail:
          'Every Madison Deep Clean is backed by our 48-hour free spot re-clean guarantee.',
      },
    ],
    includedSummary: [
      'All 37 Standard tasks plus 10 Deep Clean detail tasks across Kitchen, Baths & Living Areas',
      'Hand-wiped baseboards, doors, door frames, window sills, and light switches',
      'Exterior kitchen and bathroom cabinet door detailing and range-hood degreasing',
    ],
    localSchedulingNote:
      'Available across Madison ZIP codes 35756, 35757, and 35758 Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/service-deep.jpg',
      webp: '/images/service-deep.webp',
      webpMobile: '/images/service-deep-640w.webp',
      alt: 'Spotless master bathroom in a Madison, AL home after a 47-point Mojo Deep Clean',
      width: 1280,
      height: 714,
      caption: '47-point Deep House Cleaning in Madison, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-mad-deep-1',
        question: 'How long does a Deep Clean take for a 3- or 4-bedroom house in Madison, AL?',
        answer:
          'For a typical 2,200 to 3,200 sq. ft. home in Madison, our two-specialist team generally completes the 47-point Deep Clean in 3.5 to 5.5 hours.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-mad-deep-2',
        question: 'Does the Madison Deep Clean include wiping down baseboards and cabinet fronts?',
        answer:
          'Yes! Hand-wiping baseboards throughout the home and wiping the exterior fronts of kitchen and bathroom cabinets are core parts of our 47-point Deep Clean.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-mad-deep-3',
        question: 'Can we start bi-weekly recurring service after our Madison Deep Clean?',
        answer:
          'Yes—most of our recurring Madison clients start with a 47-point Deep Clean to establish a spotless baseline and then transition onto a bi-weekly maintenance schedule.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Deep House Cleaning in Madison, AL | Mojo Cleaning',
      metaDescription:
        'Explore our 47-point deep house cleaning in Madison, AL (35756, 35757, 35758). Hand-wiped baseboards, cabinet doors, showers & grout with a 48-hour guarantee.',
      canonicalPath: '/madison-al/services/deep-house-cleaning/',
      primaryIntent: 'Book a one-time or seasonal deep house cleaning in Madison, AL',
      primaryQuery: 'deep house cleaning madison al',
      secondaryQueries: [
        'deep cleaning madison al',
        'deep cleaning service madison al',
        'one-time deep cleaning madison al',
        'detailed house cleaning madison al',
        'deep cleaning cost madison al',
      ],
    },
  },
  {
    id: 'madison-al__move-in-cleaning',
    serviceId: 'move-in-cleaning',
    locationId: 'madison-al',
    urlPath: '/madison-al/services/move-in-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Move-In Cleaning in Madison, Alabama',
    subheadline:
      '56-point empty-home sanitization for families closing on homes in Clift Farm, Town Madison, Rainbow Mountain, and County Line Road (35756, 35757, 35758).',
    introParagraphs: [
      'Moving your family into a house in Madison—whether you are relocating for a corporate transfer, a military PCS assignment, or moving into the Madison City Schools district—should start with clean shelves and sanitized appliances.',
      'Mojo Cleaning’s 56-point Move-In Cleaning service in Madison, AL details your new residence while it is vacant. We vacuum and wet-wipe inside every kitchen cabinet, drawer, and pantry shelf, sanitize inside the oven and refrigerator, clean inside bathroom vanities and bedroom closets, wet-wipe window blinds, and detail every baseboard and floor.',
    ],
    localCustomerGuidance:
      'Schedule your Madison Move-In Clean for the window after closing/key handoff and before your moving truck unloads. Ensure water and electricity are active at the property so our two-specialist team can complete all 56 tasks.',
    neighborhoodSpotlight: [
      'Clift Farm & Highway 72 New Closings (35757)',
      'Town Madison & Zierdt Road Relocations (35756)',
      'Rainbow Mountain, Hughes Road & Mill Creek Homes (35758)',
      'County Line Road & Heritage Plantation Subdivisions (35756)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Inside Cabinets, Drawers & Closets Included',
        detail:
          'Unpack kitchenware and family clothing directly onto sanitized shelves without wiping a single drawer yourself.',
      },
      {
        title: 'Oven & Refrigerator Interiors Sanitized',
        detail:
          'Both major kitchen appliances are deep-cleaned inside and out as standard on our 56-point Move-In checklist.',
      },
      {
        title: 'Smart-Lock & Lockbox Coordination',
        detail:
          'Still traveling to Madison on cleaning day? Share your keypad or realtor lockbox code for seamless access.',
      },
    ],
    includedSummary: [
      '24 Kitchen tasks: inside all cabinets/drawers, pantry shelves, inside oven, inside fridge, counters & floors',
      '17 Bathroom tasks: inside vanity cabinets/drawers, showers, tubs, tile grout, toilets, mirrors & blinds',
      '15 Bedroom & Living tasks: closet shelving, wet-wiped blinds, hand-wiped baseboards, doors & floors',
    ],
    localSchedulingNote:
      'Available across Madison ZIP codes 35756, 35757, and 35758 Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/service-move.jpg',
      webp: '/images/service-move.webp',
      webpMobile: '/images/service-move-640w.webp',
      alt: 'Empty sunlit kitchen and hardwood floors in a Madison, AL home ready for move-in day',
      width: 1280,
      height: 714,
      caption: '56-point empty-home Move-In Cleaning across Madison, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-mad-movein-1',
        question: 'Does the Madison Move-In Clean include inside all kitchen cabinets and bathroom vanities?',
        answer:
          'Yes! Our 56-point Move-In standard includes vacuuming and wet-wiping the interior of all kitchen cabinets, drawers, pantry shelves, bathroom vanities, medicine cabinets, and bedroom closets.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-mad-movein-2',
        question: 'What if our Madison closing date changes by a day or two?',
        answer:
          'We understand real estate closings can shift. Let our dispatch team know as soon as your closing timeline updates and we will adjust your Madison Move-In Clean window.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-mad-movein-3',
        question: 'Can we bundle a Madison Move-In Clean with bi-weekly recurring service?',
        answer:
          'Yes—many Madison homeowners book a 56-point Move-In Clean before unpacking and then start bi-weekly recurring maintenance two weeks later.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-In Cleaning in Madison, AL | Mojo Cleaning',
      metaDescription:
        'Book 56-point empty-home move-in cleaning in Madison, AL (35756, 35757, 35758). Inside cabinets, drawers, closets, oven & fridge sanitized before you unpack.',
      canonicalPath: '/madison-al/services/move-in-cleaning/',
      primaryIntent: 'Book an empty-home move-in cleaning service in Madison, AL',
      primaryQuery: 'move-in cleaning madison al',
      secondaryQueries: [
        'move-in house cleaning madison al',
        'move in cleaning service madison al',
        'new home pre move in clean 35758 35756',
      ],
    },
  },
  {
    id: 'madison-al__move-out-cleaning',
    serviceId: 'move-out-cleaning',
    locationId: 'madison-al',
    urlPath: '/madison-al/services/move-out-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Move-Out Cleaning in Madison, Alabama',
    subheadline:
      '56-point empty-home turnover cleaning for PCS transfers, lease-end inspections, and home sales across Madison (35756, 35757, 35758).',
    introParagraphs: [
      'With frequent corporate relocations, military PCS moves, and family home sales across Madison, turning over a property in spotless condition is essential for protecting your security deposit or ensuring a smooth buyer walk-through.',
      'Mojo Cleaning’s 56-point Move-Out and Turnover Cleaning service in Madison, AL handles the entire empty-home reset—cleaning inside all kitchen cabinets, drawers, and pantry shelves, inside the oven and refrigerator, inside bathroom vanities and closets, wet-wiping window blinds, and detailing baseboards and floors.',
    ],
    localCustomerGuidance:
      'Whether you are moving out of a rental near Town Madison or Zierdt Road and need an itemized receipt for your property manager, or selling a family residence along County Line Road (35756) or Hughes Road (35758), our team coordinates directly around your moving truck schedule.',
    neighborhoodSpotlight: [
      'Town Madison & Zierdt Road Rentals & Townhomes (35756)',
      'County Line Road & West Madison Relocations (35756)',
      'Clift Farm & Highway 72 Closings (35757)',
      'Rainbow Mountain & Hughes Road Home Sales (35758)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'PCS & Lease Inspection Ready',
        detail:
          'Meets strict property management turnover standards with itemized receipt documentation.',
      },
      {
        title: 'Includes Inside Oven, Fridge & Cabinets',
        detail:
          'All 9 interior transition tasks are built into our 56-point Move-Out checklist.',
      },
      {
        title: '48-Hour Walk-Through Guarantee',
        detail:
          'Protected by a free 48-hour spot re-clean if any checklist item is noted during inspection.',
      },
    ],
    includedSummary: [
      'Complete 56-point empty-home checklist (Kitchen, Bathrooms, Closets & Living Spaces)',
      'Inside oven, inside refrigerator/freezer, and inside all cabinets, drawers, and closets',
      'Wet-wiped window blinds, hand-wiped baseboards, doors, frames, and wall-to-wall floor care',
    ],
    localSchedulingNote:
      'Serving all Madison ZIP codes (35756, 35757, 35758) for Move-Out and property turnover appointments.',
    image: {
      src: '/images/service-move.jpg',
      webp: '/images/service-move.webp',
      webpMobile: '/images/service-move-640w.webp',
      alt: 'Vacant Madison, AL home with spotless kitchen cabinets and hardwood floors after move-out cleaning',
      width: 1280,
      height: 714,
      caption: '56-point Move-Out turnover cleaning in Madison, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-mad-move-1',
        question: 'Do you provide receipts for Madison property managers and military PCS move-outs?',
        answer:
          'Yes! We provide an itemized invoice and completion receipt confirming all 56 turnover checklist tasks—including inside the oven, refrigerator, and cabinets—were completed.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-mad-move-2',
        question: 'What if our landlord or buyer notes a missed checklist item during the Madison walk-through?',
        answer:
          'Every Madison Move-Out Clean is backed by our 48-Hour Happiness Guarantee. Contact us within 48 hours of service completion and our team will return to re-clean that spot at no cost.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-mad-move-3',
        question: 'What utilities need to stay on for our Madison Move-Out Clean?',
        answer:
          'Please keep electricity and running water active through the completion of your appointment so our team has full lighting, hot water, and power for HEPA vacuums.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-Out Cleaning in Madison, AL | Mojo Cleaning',
      metaDescription:
        'Inspection-ready 56-point move-out house cleaning in Madison, AL (35756, 35757, 35758). Inside oven, fridge, cabinets, closets & blinds with itemized receipts.',
      canonicalPath: '/madison-al/services/move-out-cleaning/',
      primaryIntent: 'Book a move-out or lease-end turnover cleaning service in Madison, AL',
      primaryQuery: 'move-out cleaning madison al',
      secondaryQueries: [
        'move-out cleaning service madison al',
        'move-out house cleaning madison al',
        'rental turnover cleaning madison al',
        'move-out cleaning cost madison al',
      ],
    },
  },
  {
    id: 'madison-al__post-construction-cleaning',
    serviceId: 'post-construction-cleaning',
    locationId: 'madison-al',
    urlPath: '/madison-al/services/post-construction-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Post-Construction Cleaning in Madison, Alabama',
    subheadline:
      'HEPA drywall dust extraction and new-finish detailing for custom builds and home renovations across Madison (35756, 35757, 35758).',
    introParagraphs: [
      'Whether you have just completed a kitchen or master bath remodel in Rainbow Mountain or Mill Creek (35758) or are preparing to move into a newly built home in Clift Farm (35757), Town Madison, or along County Line Road (35756), fine drywall and sawdust particles settle into every hinge, vent, and floor seam.',
      'Mojo Cleaning’s Post-Construction and Renovation Cleaning service in Madison, AL uses a systematic dry-to-wet HEPA vacuuming and microfiber detailing sequence to remove construction haze from cabinets, closets, fixtures, baseboards, and floors without scratching brand-new surfaces.',
    ],
    localCustomerGuidance:
      'Book your Madison Post-Construction Clean once contractors have completed sanding, grouting, and painting and rough debris has been removed. We serve both single-room residential remodels and whole-home new builds.',
    neighborhoodSpotlight: [
      'Clift Farm & Highway 72 New Construction (35757)',
      'County Line Road & West Madison New Subdivisions (35756)',
      'Town Madison & Zierdt Road Builds (35756)',
      'Rainbow Mountain & Hughes Road Kitchen/Bath Remodels (35758)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Dry-to-Wet HEPA Dust Extraction',
        detail:
          'Prevents fine sheetrock dust from turning into chalky residue on new Madison cabinetry and LVP/hardwood floors.',
      },
      {
        title: 'Scratch-Safe Care for New Finishes',
        detail:
          'Protects quartz islands, frameless shower glass, and matte-black or brushed-brass hardware.',
      },
      {
        title: 'Backed by Our 48-Hour Guarantee',
        detail:
          'Walk through your remodeled or newly built Madison home with complete confidence.',
      },
    ],
    includedSummary: [
      'High-to-low HEPA vacuuming and microfiber dusting of fans, vents, recessed lighting, and trim',
      'Interior and exterior detailing of new kitchen cabinets, drawers, vanities, and closet shelves',
      'Sanitization of sinks, tubs, toilets, and appliances plus multi-pass damp microfiber floor care',
    ],
    localSchedulingNote:
      'Available across Madison ZIP codes 35756, 35757, and 35758 Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/service-post-construction.jpg',
      webp: '/images/service-post-construction.webp',
      webpMobile: '/images/service-post-construction-640w.webp',
      alt: 'Newly built open-concept kitchen in Madison, AL after post-construction detailing',
      width: 1280,
      height: 714,
      caption: 'Post-construction and after-remodel detailing across Madison, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-mad-post-1',
        question: 'Can you detail a brand-new home in Clift Farm or County Line Road before our movers arrive?',
        answer:
          'Yes! We frequently perform final Post-Construction and Move-In cleans for newly built homes in 35756 and 35757 so all drywall dust is removed from cabinets, closets, and floors prior to move-in.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-mad-post-2',
        question: 'Can we book Post-Construction Cleaning for a kitchen or bathroom remodel in Madison?',
        answer:
          'Absolutely. We tailor our scope to the remodeled rooms and any adjacent living spaces affected by construction dust.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-mad-post-3',
        question: 'Do your Madison teams bring their own HEPA vacuums and microfiber supplies?',
        answer:
          'Yes—our insured specialists arrive with all commercial HEPA vacuums, clean microfiber cloths, and surface-safe cleaning solutions.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'madison-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Post-Construction Cleaning in Madison, AL | Mojo Cleaning',
      metaDescription:
        'Professional post-construction & renovation cleaning in Madison, AL (35756, 35757, 35758). Fine HEPA drywall dust extraction, cabinet interiors & floor care.',
      canonicalPath: '/madison-al/services/post-construction-cleaning/',
      primaryIntent: 'Book post-construction or after-remodel house cleaning in Madison, AL',
      primaryQuery: 'post-construction cleaning madison al',
      secondaryQueries: [
        'post-construction cleaning service madison al',
        'renovation cleaning madison al',
        'after-construction cleaning madison al',
      ],
    },
  },

  // =========================================================================
  // 3. HAMPTON COVE, AL — 5 ISOLATED SERVICE PAGES (/hampton-cove-al/services/*)
  // =========================================================================
  {
    id: 'hampton-cove-al__recurring-residential-cleaning',
    serviceId: 'recurring-residential-cleaning',
    locationId: 'hampton-cove-al',
    urlPath: '/hampton-cove-al/services/recurring-residential-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Recurring House Cleaning in Hampton Cove, Alabama',
    subheadline:
      'Scheduled weekly, bi-weekly, and monthly residential care for custom homes and golf-course communities in Hampton Cove and McMullen Cove (35763).',
    introParagraphs: [
      'Homeowners in Hampton Cove and McMullen Cove (35763) take pride in spacious, light-filled residences—from custom homes along the Robert Trent Jones Golf Trail to gated estates tucked beneath Monte Sano and Little Mountain.',
      'Mojo Cleaning provides unhurried, detail-oriented weekly, bi-weekly, and monthly recurring residential cleaning across Hampton Cove. Our insured teams coordinate gate entry seamlessly, bring all professional supplies and equipment, and follow a customized room-by-room plan tailored to your home’s finishes.',
    ],
    localCustomerGuidance:
      'Have unused upstairs guest suites or a formal dining room that only needs monthly dusting while your main kitchen, hearth room, and primary bath need weekly or bi-weekly care? We customize your Hampton Cove checklist to match how your family actually lives.',
    neighborhoodSpotlight: [
      'Hampton Cove Golf & Lake Neighborhoods (35763)',
      'McMullen Cove Gated Communities (35763)',
      'Little Mountain, Cove Creek & Deford Mill Estates (35763)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Gate-Access & Alarm Coordination',
        detail:
          'Seamless entry procedures for gated enclaves in McMullen Cove and Hampton Cove.',
      },
      {
        title: 'Careful With Stone, Glass & Hardwood',
        detail:
          'Non-abrasive microfiber care for quartz/marble islands, pendant lighting, and wide-plank floors.',
      },
      {
        title: '100% Customizable Room Scope',
        detail:
          'Prioritize high-traffic living zones and rotate secondary guest bedrooms as needed.',
      },
    ],
    includedSummary: [
      '37-point recurring standard across Kitchens, Baths, Primary Suites & Living Areas',
      'Hand-polished fixtures, sanitized stone/quartz prep surfaces, and thorough floor care',
      'Backed on every visit by our 48-Hour Happiness Guarantee',
    ],
    localSchedulingNote:
      'Weekly, bi-weekly, and monthly recurring routes operate across Hampton Cove (35763) Monday – Friday.',
    image: {
      src: '/images/hero-interior.jpg',
      webp: '/images/hero-interior.webp',
      webpMobile: '/images/hero-interior-640w.webp',
      alt: 'Spacious open-concept living room and kitchen in Hampton Cove, AL cared for by Mojo Cleaning',
      width: 1280,
      height: 714,
      caption: 'Tailored weekly and bi-weekly recurring care in Hampton Cove & McMullen Cove.',
    },
    faqs: [
      {
        id: 'faq-sl-hc-rec-1',
        question: 'How do your teams handle gate passes in McMullen Cove or Hampton Cove?',
        answer:
          'You can add Mojo Cleaning to your community gate guest list or share your entry code in your client profile so our team arrives right on schedule.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hc-rec-2',
        question: 'Can your team use a specific cleaner on our marble or soapstone counters?',
        answer:
          'Yes. While we bring our own full kit of surface-safe supplies, if you have a specialty stone conditioner you want used on a specific island or vanity, just leave it on the counter and let us know.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hc-rec-3',
        question: 'Do you follow the same room-by-room standards on every Hampton Cove visit?',
        answer:
          'Yes—every visit follows your customized 37-point room-by-room profile and is backed by our 48-Hour Happiness Guarantee.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Recurring House Cleaning in Hampton Cove, AL | Mojo Cleaning',
      metaDescription:
        'Weekly, biweekly, and monthly recurring house cleaning in Hampton Cove & McMullen Cove, AL (35763). Custom room checklists, insured specialists & 48-hour guarantee.',
      canonicalPath: '/hampton-cove-al/services/recurring-residential-cleaning/',
      primaryIntent: 'Book recurring house cleaning in Hampton Cove or McMullen Cove, AL',
      primaryQuery: 'recurring house cleaning hampton cove al',
      secondaryQueries: [
        'weekly house cleaning hampton cove al',
        'biweekly house cleaning hampton cove al',
        'monthly house cleaning hampton cove al',
        'regular house cleaning service hampton cove al',
      ],
    },
  },
  {
    id: 'hampton-cove-al__deep-house-cleaning',
    serviceId: 'deep-house-cleaning',
    locationId: 'hampton-cove-al',
    urlPath: '/hampton-cove-al/services/deep-house-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Deep House Cleaning in Hampton Cove, Alabama',
    subheadline:
      '47-point top-to-bottom detailing for custom cabinetry, glass pendant lighting, frameless showers, and woodwork in Hampton Cove & McMullen Cove (35763).',
    introParagraphs: [
      'Custom homes in Hampton Cove and McMullen Cove feature architectural details that deserve careful hand work—coffered trim, wide baseboards, glass pendant lights over expansive kitchen islands, double ovens, and multi-head frameless glass showers.',
      'Mojo Cleaning’s 47-point Deep House Cleaning service in Hampton Cove (35763) gives every surface the time it requires. Our specialists hand-wipe baseboards, interior doors, door frames, and kitchen/bath cabinet exteriors, polish overhead glass fixtures, and scrub tile grout and shower enclosures.',
    ],
    localCustomerGuidance:
      'Ideal as an initial kickoff clean before starting bi-weekly service in Hampton Cove, prior to golf-tournament or holiday entertaining, or when preparing an estate in McMullen Cove for listing.',
    neighborhoodSpotlight: [
      'McMullen Cove Custom Estates (35763)',
      'Hampton Cove Golf Course & Lakefront Homes (35763)',
      'Sutton Road & Eastern Mountain Foothills (35763)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Overhead Pendant & Fixture Polishing',
        detail:
          'We hand-polish glass kitchen pendants, reachable chandelier arms, and ceiling fan blades.',
      },
      {
        title: 'Cabinet Exterior & Millwork Detailing',
        detail:
          'Hand-wiped upper and lower cabinet fronts, baseboards, window sills, and solid-core doors.',
      },
      {
        title: 'Insured, Bonded & Guaranteed',
        detail:
          'Full liability protection and our 48-Hour Happiness Guarantee on every Deep Clean.',
      },
    ],
    includedSummary: [
      'All 47 Deep Clean checklist items across Kitchens, Bathrooms, Bedrooms & Living Areas',
      'Hand-wiped baseboards, cabinet exteriors, doors, frames, and switch plates',
      'Optional inside-oven, inside-refrigerator, and blind wet-wiping add-ons available',
    ],
    localSchedulingNote:
      'Available Monday – Friday and Saturdays by appointment across Hampton Cove (35763).',
    image: {
      src: '/images/team-pendant-care.jpg',
      webp: '/images/team-pendant-care.webp',
      webpMobile: '/images/team-pendant-care-640w.webp',
      alt: 'Mojo Cleaning specialist hand-polishing a glass kitchen pendant light fixture in Hampton Cove',
      width: 960,
      height: 1280,
      caption: 'Hand-detailing glass pendants, custom cabinetry, and trim in Hampton Cove.',
    },
    faqs: [
      {
        id: 'faq-sl-hc-deep-1',
        question: 'Does your Hampton Cove Deep Clean include wiping kitchen cabinet exteriors and baseboards?',
        answer:
          'Yes—wiping all exterior kitchen and bathroom cabinet doors/drawers and hand-wiping baseboards and doors throughout the home are included in our 47-point Deep Clean.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hc-deep-2',
        question: 'Can we add inside-oven or inside-refrigerator detailing to our Hampton Cove Deep Clean?',
        answer:
          'Yes! Mention inside-oven or inside-refrigerator care in your quote request and we will include those interior tasks in your Hampton Cove appointment.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hc-deep-3',
        question: 'How do I get an accurate quote for a 3,500+ sq. ft. home in Hampton Cove?',
        answer:
          'Simply select the 4+ Bed / 3+ Bath (2,400–3,500+ sq. ft.) option in our quote form and note your approximate square footage and bathroom count—our dispatch office will prepare a tailored quote promptly.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Deep House Cleaning in Hampton Cove, AL | Mojo Cleaning',
      metaDescription:
        'Explore our 47-point deep house cleaning in Hampton Cove & McMullen Cove, AL (35763). Custom cabinetry, baseboards, frameless glass showers & fixtures detailed.',
      canonicalPath: '/hampton-cove-al/services/deep-house-cleaning/',
      primaryIntent: 'Book a 47-point deep house cleaning service in Hampton Cove, AL',
      primaryQuery: 'deep house cleaning hampton cove al',
      secondaryQueries: [
        'deep cleaning hampton cove al',
        'deep cleaning service hampton cove al',
        'one-time deep cleaning hampton cove al',
        'detailed house cleaning hampton cove al',
        'deep cleaning cost hampton cove al',
      ],
    },
  },
  {
    id: 'hampton-cove-al__move-in-cleaning',
    serviceId: 'move-in-cleaning',
    locationId: 'hampton-cove-al',
    urlPath: '/hampton-cove-al/services/move-in-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Move-In Cleaning in Hampton Cove, Alabama',
    subheadline:
      '56-point empty-home sanitization for custom residences and gated estates in Hampton Cove and McMullen Cove (35763).',
    introParagraphs: [
      'Closing on a residence in Hampton Cove or McMullen Cove (35763) is a milestone. Before your moving truck crosses over Cecil Ashburn Drive, let Mojo Cleaning sanitize every cabinet shelf, butler’s pantry drawer, appliance interior, and master bath suite.',
      'Our 56-point Move-In Cleaning service in Hampton Cove is performed while the home is vacant—covering inside all kitchen cabinetry and drawers, inside the oven and refrigerator, inside bathroom vanities, all walk-in closet shelving, wet-wiped plantation shutters and blinds, baseboards, and wide-plank floors.',
    ],
    localCustomerGuidance:
      'Coordinate your Hampton Cove Move-In Clean for the window between closing and moving-truck arrival. Share your McMullen Cove or Hampton Cove gate access instructions and keypad code when requesting your quote.',
    neighborhoodSpotlight: [
      'McMullen Cove Gated Estates (35763)',
      'Hampton Cove Golf & Lake Communities (35763)',
      'Cove Creek, Little Mountain & Sutton Road Residences (35763)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Chef’s Kitchen & Butler’s Pantry Detailing',
        detail:
          'Every cabinet interior, cutlery drawer, pantry shelf, oven, and refrigerator is sanitized before you unpack.',
      },
      {
        title: 'Walk-In Closet & Master Suite Reset',
        detail:
          'Built-in closet shelving, shoe racks, and vanity drawers are wiped clean so your wardrobe goes straight into place.',
      },
      {
        title: 'Plantation Shutter & Blind Care',
        detail:
          'Includes careful hand-wiping of shutters, window blinds, sills, and wide baseboards.',
      },
    ],
    includedSummary: [
      'All 56 Master Checklist points across Kitchens, Bathrooms, Closets & Living Spaces',
      'Inside all kitchen cabinets, drawers, butler’s pantries, oven interior, and fridge interior',
      'Inside all bathroom vanities, medicine cabinets, and walk-in closet built-ins',
    ],
    localSchedulingNote:
      'Available across Hampton Cove and McMullen Cove (35763) Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/service-move.jpg',
      webp: '/images/service-move.webp',
      webpMobile: '/images/service-move-640w.webp',
      alt: 'Empty custom kitchen and hardwood floors in Hampton Cove, AL sanitized for move-in',
      width: 1280,
      height: 714,
      caption: '56-point Move-In Cleaning for Hampton Cove and McMullen Cove residences.',
    },
    faqs: [
      {
        id: 'faq-sl-hc-movein-1',
        question: 'Does the Hampton Cove Move-In Clean include inside walk-in closets and butler’s pantries?',
        answer:
          'Yes! All pantry shelving, kitchen cabinets and drawers, bathroom vanities, and walk-in closet shelves are wiped and sanitized as part of our 56-point Move-In Clean.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hc-movein-2',
        question: 'Can your team clean double ovens and large built-in refrigerators in Hampton Cove homes?',
        answer:
          'Yes—interior oven and refrigerator cleaning are included in our 56-point Move-In standard. Just note if your kitchen has double ovens or sub-zero/built-in units when requesting your quote.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hc-movein-3',
        question: 'How do we arrange gate entry if we haven’t moved into Hampton Cove yet?',
        answer:
          'Simply share your temporary gate code or call-box instructions in your quote request and our team will coordinate directly with you or your real estate agent.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-In Cleaning in Hampton Cove, AL | Mojo Cleaning',
      metaDescription:
        'Book 56-point empty-home move-in cleaning in Hampton Cove & McMullen Cove, AL (35763). Inside cabinets, butler’s pantries, closets, oven & fridge sanitized.',
      canonicalPath: '/hampton-cove-al/services/move-in-cleaning/',
      primaryIntent: 'Book a pre-move-in house cleaning service in Hampton Cove, AL',
      primaryQuery: 'move-in cleaning hampton cove al',
      secondaryQueries: [
        'move-in house cleaning hampton cove al',
        'move in cleaning mcmullen cove 35763',
        'empty home cleaning hampton cove al',
      ],
    },
  },
  {
    id: 'hampton-cove-al__move-out-cleaning',
    serviceId: 'move-out-cleaning',
    locationId: 'hampton-cove-al',
    urlPath: '/hampton-cove-al/services/move-out-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Move-Out Cleaning in Hampton Cove, Alabama',
    subheadline:
      'Inspection-ready 56-point empty-home turnover detailing for home sales and property transitions in Hampton Cove & McMullen Cove (35763).',
    introParagraphs: [
      'When selling or turning over a residence in Hampton Cove or McMullen Cove (35763), buyers expect immaculate cabinetry, gleaming stone countertops, spotless appliances, and dust-free baseboards during the final walk-through.',
      'Mojo Cleaning’s 56-point Move-Out and Turnover Cleaning service in Hampton Cove handles the complete post-moving reset—cleaning inside and outside of all kitchen cabinets, drawers, vanities, closets, oven, and refrigerator, wet-wiping shutters and blinds, and detailing all floors.',
    ],
    localCustomerGuidance:
      'Book your Hampton Cove Move-Out Clean for after the movers finish loading. Keep utilities (electricity and hot water) active through completion. We provide itemized receipts for closing documentation or property management requirements.',
    neighborhoodSpotlight: [
      'Hampton Cove Golf & Lakefront Home Closings (35763)',
      'McMullen Cove Estate Turnovers (35763)',
      'Eastern Valley & Sutton Road Property Sales (35763)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Buyer Walk-Through & Closing Ready',
        detail:
          'Leaves kitchens, master baths, closets, and hardwood floors in showcase condition for the new owners.',
      },
      {
        title: 'Complete 56-Point Interior Scope',
        detail:
          'Includes inside oven, inside refrigerator, and inside all cabinets, drawers, and closets.',
      },
      {
        title: '48-Hour Happiness Guarantee',
        detail:
          'If any checklist item is noted during the buyer or agent walk-through within 48 hours, we return to spot-clean for free.',
      },
    ],
    includedSummary: [
      '24 Kitchen tasks including inside/outside cabinets, drawers, pantry shelves, oven, and refrigerator',
      '17 Bathroom tasks including inside/outside vanities, frameless glass showers, tubs, toilets & mirrors',
      '15 Bedroom & Living tasks including walk-in closet shelving, blinds/shutters, baseboards & floors',
    ],
    localSchedulingNote:
      'Serving Hampton Cove and McMullen Cove (35763) Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/team-cabinet-detail.jpg',
      webp: '/images/team-cabinet-detail.webp',
      webpMobile: '/images/team-cabinet-detail-640w.webp',
      alt: 'Mojo Cleaning specialist detailing inside kitchen base cabinets during a Hampton Cove move-out clean',
      width: 960,
      height: 1280,
      caption: '56-point Move-Out turnover cleaning in Hampton Cove (35763).',
    },
    faqs: [
      {
        id: 'faq-sl-hc-moveout-1',
        question: 'Do you provide a professional cleaning receipt for our Hampton Cove real estate closing?',
        answer:
          'Yes. Upon completion, we provide an itemized receipt confirming our 56-point Move-Out turnover clean was performed.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hc-moveout-2',
        question: 'Does the house need to be vacant before you begin the Hampton Cove Move-Out Clean?',
        answer:
          'Yes—scheduling after all furniture and boxes are loaded allows our team to clean inside every cabinet, drawer, and closet and mop all floors wall-to-wall.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hc-moveout-3',
        question: 'What if our closing walk-through is the morning after the clean?',
        answer:
          'Every Move-Out Clean is covered by our 48-Hour Happiness Guarantee, giving you and your real estate agent complete peace of mind for the walk-through.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-Out Cleaning in Hampton Cove, AL | Mojo Cleaning',
      metaDescription:
        'Inspection-ready 56-point move-out cleaning in Hampton Cove & McMullen Cove, AL (35763). Inside oven, fridge, cabinets & closets with a 48-hour guarantee.',
      canonicalPath: '/hampton-cove-al/services/move-out-cleaning/',
      primaryIntent: 'Book a move-out or closing turnover house cleaning in Hampton Cove, AL',
      primaryQuery: 'move-out cleaning hampton cove al',
      secondaryQueries: [
        'move-out cleaning service hampton cove al',
        'move-out house cleaning hampton cove al',
        'rental turnover cleaning hampton cove al',
        'move-out cleaning cost hampton cove al',
      ],
    },
  },
  {
    id: 'hampton-cove-al__post-construction-cleaning',
    serviceId: 'post-construction-cleaning',
    locationId: 'hampton-cove-al',
    urlPath: '/hampton-cove-al/services/post-construction-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Post-Construction Cleaning in Hampton Cove, Alabama',
    subheadline:
      'Fine drywall dust extraction and scratch-safe fixture detailing after custom home builds and luxury remodels in Hampton Cove & McMullen Cove (35763).',
    introParagraphs: [
      'Custom home builds and high-end kitchen or primary bath renovations in Hampton Cove and McMullen Cove (35763) involve fine stone cutting, custom millwork sanding, and drywall finishing that leave ultra-fine dust across every surface.',
      'Mojo Cleaning’s Post-Construction Cleaning service in Hampton Cove uses a disciplined HEPA dry-vacuum and multi-pass damp microfiber protocol to remove construction dust from custom cabinetry interiors, coffered trim, glass pendant fixtures, frameless showers, and wide-plank hardwood flooring.',
    ],
    localCustomerGuidance:
      'Schedule your Hampton Cove Post-Construction Clean after contractors complete sanding, painting, and grouting. Our team works carefully around custom stone, brass/matte-black hardware, and designer lighting.',
    neighborhoodSpotlight: [
      'McMullen Cove Custom Builds & Additions (35763)',
      'Hampton Cove Kitchen & Master Bath Renovations (35763)',
      'Little Mountain & Eastern Corridor Custom Estates (35763)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Safe for Custom Stone, Millwork & Glass',
        detail:
          'Dry HEPA capture followed by clean, non-abrasive microfiber detailing prevents scratching on new finishes.',
      },
      {
        title: 'Inside All Custom Cabinetry & Built-Ins',
        detail:
          'Removes sawdust and sheetrock powder from inside every drawer glide, hinge, and closet shelf.',
      },
      {
        title: 'Insured, Bonded & Guaranteed',
        detail:
          'Backed by full liability insurance and our 48-Hour Happiness Guarantee.',
      },
    ],
    includedSummary: [
      'High-to-low HEPA dust extraction across fans, lighting, vents, millwork, doors, and baseboards',
      'Full interior and exterior detailing of newly installed kitchen, butler’s pantry, bath, and closet cabinetry',
      'Multi-pass damp microfiber floor care to eliminate chalky drywall haze on hardwood, tile, and stone',
    ],
    localSchedulingNote:
      'Available across Hampton Cove and McMullen Cove (35763) for homeowners, interior designers, and custom builders.',
    image: {
      src: '/images/service-post-construction.jpg',
      webp: '/images/service-post-construction.webp',
      webpMobile: '/images/service-post-construction-640w.webp',
      alt: 'Custom remodeled kitchen in Hampton Cove, AL after post-construction dust detailing',
      width: 1280,
      height: 714,
      caption: 'Post-construction and after-remodel detailing in Hampton Cove (35763).',
    },
    faqs: [
      {
        id: 'faq-sl-hc-post-1',
        question: 'Can we book Post-Construction Cleaning after a kitchen or bathroom remodel in Hampton Cove?',
        answer:
          'Yes! Whether you renovated a master suite, remodeled a chef’s kitchen, or built a custom home in McMullen Cove, we tailor the scope to your project.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hc-post-2',
        question: 'How do you protect new marble, quartz, and hardwood floors from scratching during dust removal?',
        answer:
          'We never wipe dry construction grit with a wet rag first. Instead, we capture loose silica and gypsum particles with HEPA brush attachments before damp-polishing with fresh microfiber cloths.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-hc-post-3',
        question: 'Do you coordinate gate access for builder or homeowner walk-throughs in McMullen Cove?',
        answer:
          'Yes—simply provide your gate entry code or builder lockbox instructions when submitting your quote request.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'hampton-cove-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Post-Construction Cleaning in Hampton Cove, AL | Mojo Cleaning',
      metaDescription:
        'Custom home post-construction & renovation cleaning in Hampton Cove & McMullen Cove, AL (35763). HEPA dust removal & scratch-safe fixture detailing.',
      canonicalPath: '/hampton-cove-al/services/post-construction-cleaning/',
      primaryIntent: 'Hire a post-construction or remodel cleaning service in Hampton Cove, AL',
      primaryQuery: 'post-construction cleaning hampton cove al',
      secondaryQueries: [
        'post-construction cleaning service hampton cove al',
        'renovation cleaning hampton cove al',
        'after-construction cleaning hampton cove al',
      ],
    },
  },

  // =========================================================================
  // 4. OWENS CROSS ROADS, AL — 5 ISOLATED SERVICE PAGES (/owens-cross-roads-al/services/*)
  // =========================================================================
  {
    id: 'owens-cross-roads-al__recurring-residential-cleaning',
    serviceId: 'recurring-residential-cleaning',
    locationId: 'owens-cross-roads-al',
    urlPath: '/owens-cross-roads-al/services/recurring-residential-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Recurring House Cleaning in Owens Cross Roads, Alabama',
    subheadline:
      'Consistent weekly, bi-weekly, and monthly residential cleaning across Owens Cross Roads and Big Cove (35763).',
    introParagraphs: [
      'Skip the weekend chore list after a full week of work and family activities. Mojo Cleaning provides reliable weekly, bi-weekly, and monthly recurring residential cleaning for homeowners throughout Owens Cross Roads, AL (35763).',
      'Because ongoing neighborhood construction in the eastern valley can kick up extra outdoor dust, our recurring teams pay close attention to window sills, ceiling fans, kitchen islands, and LVP/hardwood floors on every visit.',
    ],
    localCustomerGuidance:
      'Choose a weekly, bi-weekly, or monthly schedule that fits your household. All supplies, HEPA vacuums, and microfiber systems are provided by our insured team.',
    neighborhoodSpotlight: [
      'Owens Cross Roads Family Subdivisions (35763)',
      'Big Cove & Taylor Road Corridor (35763)',
      'Nature’s Cove & US-431 Valley Communities (35763)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Reliable Eastern Valley Routing',
        detail:
          'Dedicated weekday routes serving the 35763 valley corridor.',
      },
      {
        title: 'Supplies & HEPA Vacuums Included',
        detail:
          'Captures fine valley dust and pet hair without you lifting a finger.',
      },
      {
        title: '48-Hour Happiness Guarantee',
        detail:
          'Free return spot re-clean within 48 hours if any checklist detail is missed.',
      },
    ],
    includedSummary: [
      '37-point recurring checklist covering Kitchen, Bathrooms, Bedrooms & Living Areas',
      'Sanitized countertops, sinks, showers, toilets, and polished fixtures',
      'Thorough vacuuming and damp microfiber mopping of all floors',
    ],
    localSchedulingNote:
      'Available Monday – Friday (8:00 AM – 6:00 PM) and Saturdays by appointment across Owens Cross Roads (35763).',
    image: {
      src: '/images/service-recurring.jpg',
      webp: '/images/service-recurring.webp',
      webpMobile: '/images/service-recurring-640w.webp',
      alt: 'Clean, sunlit living room in Owens Cross Roads, AL maintained with bi-weekly recurring cleaning',
      width: 1280,
      height: 714,
      caption: 'Dependable recurring home care across Owens Cross Roads, AL (35763).',
    },
    faqs: [
      {
        id: 'faq-sl-ocr-rec-1',
        question: 'Are there any extra travel charges for recurring cleaning in Owens Cross Roads (35763)?',
        answer:
          'No. Owens Cross Roads is a core verified service area for Mojo Cleaning, with no extra travel surcharges.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ocr-rec-2',
        question: 'Can I book a one-time Deep Clean in Owens Cross Roads before starting bi-weekly service?',
        answer:
          'Yes! Starting with a 47-point Deep Clean is a great way to hand-detail baseboards, doors, and cabinet fronts before moving onto a bi-weekly maintenance plan.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ocr-rec-3',
        question: 'Do you offer eco-friendly cleaning products in Owens Cross Roads?',
        answer:
          'Yes—non-toxic, pet-safe cleaning products are always available upon request.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Recurring House Cleaning in Owens Cross Roads, AL | Mojo Cleaning',
      metaDescription:
        'Weekly, biweekly, and monthly recurring house cleaning in Owens Cross Roads & Big Cove, AL (35763). Insured team, supplies included & 48-hour guarantee.',
      canonicalPath: '/owens-cross-roads-al/services/recurring-residential-cleaning/',
      primaryIntent: 'Book recurring house cleaning in Owens Cross Roads, AL',
      primaryQuery: 'recurring house cleaning owens cross roads al',
      secondaryQueries: [
        'weekly house cleaning owens cross roads al',
        'biweekly house cleaning owens cross roads al',
        'monthly house cleaning owens cross roads al',
        'regular house cleaning service owens cross roads al',
      ],
    },
  },
  {
    id: 'owens-cross-roads-al__deep-house-cleaning',
    serviceId: 'deep-house-cleaning',
    locationId: 'owens-cross-roads-al',
    urlPath: '/owens-cross-roads-al/services/deep-house-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Deep House Cleaning in Owens Cross Roads, Alabama',
    subheadline:
      '47-point top-to-bottom deep cleaning for baseboards, cabinet exteriors, showers, and LVP/hardwood floors in Owens Cross Roads (35763).',
    introParagraphs: [
      'In growing Owens Cross Roads subdivisions along US-431, Taylor Road, and Big Cove (35763), outdoor red clay dust, seasonal valley pollen, and everyday family cooking can leave baseboards, window sills, and shower glass needing a thorough reset.',
      'Mojo Cleaning’s 47-point Deep House Cleaning service in Owens Cross Roads combines all 37 standard tasks with 10 intensive hand-detailing tasks—wiping exterior kitchen and bathroom cabinetry, scrubbing baseboards and interior doors, sanitizing switch plates, and descaling bathroom tile and glass.',
    ],
    localCustomerGuidance:
      'Book our 47-point Deep Clean in Owens Cross Roads as a seasonal refresh, before hosting family events, prior to listing your home for sale, or as the kickoff visit for bi-weekly recurring care.',
    neighborhoodSpotlight: [
      'Nature’s Cove & Taylor Road Subdivisions (35763)',
      'Big Cove & US-431 Corridor Homes (35763)',
      'Flint River & Eastern Valley Residences (35763)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: '47-Point Hand-Wiped Detail Standard',
        detail:
          'Baseboards, interior doors, door frames, and cabinet fronts are hand-wiped room by room.',
      },
      {
        title: 'HEPA Dust & Red-Clay Grit Removal',
        detail:
          'Commercial HEPA vacuums and microfiber pads leave LVP, tile, and hardwood floors spotless.',
      },
      {
        title: '48-Hour Happiness Guarantee',
        detail:
          'Every Owens Cross Roads Deep Clean is backed by our complimentary 48-hour spot re-clean guarantee.',
      },
    ],
    includedSummary: [
      '20 Kitchen tasks: cabinet exteriors, range hood degreasing, countertops, backsplash, sink & baseboards',
      '15 Bathroom tasks: shower glass/grout scrubbing, vanity fronts, toilets, mirrors & baseboards',
      '12 Bedroom & Living tasks: hand-wiped baseboards, interior doors, ceiling fans, sills & floors',
    ],
    localSchedulingNote:
      'Available across Owens Cross Roads (35763) Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/service-deep.jpg',
      webp: '/images/service-deep.webp',
      webpMobile: '/images/service-deep-640w.webp',
      alt: 'Gleaming master bathroom in Owens Cross Roads, AL after a 47-point Deep Clean',
      width: 1280,
      height: 714,
      caption: '47-point Deep House Cleaning in Owens Cross Roads (35763).',
    },
    faqs: [
      {
        id: 'faq-sl-ocr-deep-1',
        question: 'What is included in an Owens Cross Roads Deep Clean vs. a Standard Clean?',
        answer:
          'Our Deep Clean includes all 37 Standard tasks plus 10 intensive detail tasks: hand-wiping baseboards, interior doors and frames, exterior kitchen and bathroom cabinet fronts, switch plates, and deeper shower/kitchen degreasing.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ocr-deep-2',
        question: 'Can we add inside-oven or inside-refrigerator cleaning to our Owens Cross Roads Deep Clean?',
        answer:
          'Yes! Just note inside-oven or inside-refrigerator care in your quote request and we will include it in your appointment.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ocr-deep-3',
        question: 'Is every Owens Cross Roads Deep Clean covered by the 48-Hour Guarantee?',
        answer:
          'Yes—if any task on our 47-point Deep Clean checklist is missed, contact us within 48 hours and our team will return to re-clean it at no cost.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Deep House Cleaning in Owens Cross Roads, AL | Mojo Cleaning',
      metaDescription:
        'Book a 47-point deep house cleaning in Owens Cross Roads & Big Cove, AL (35763). Hand-wiped baseboards, cabinet fronts, showers & floors with a 48-hour guarantee.',
      canonicalPath: '/owens-cross-roads-al/services/deep-house-cleaning/',
      primaryIntent: 'Book a one-time or seasonal deep house cleaning in Owens Cross Roads, AL',
      primaryQuery: 'deep house cleaning owens cross roads al',
      secondaryQueries: [
        'deep cleaning owens cross roads al',
        'deep cleaning service owens cross roads al',
        'one-time deep cleaning owens cross roads al',
        'detailed house cleaning owens cross roads al',
        'deep cleaning cost owens cross roads al',
      ],
    },
  },
  {
    id: 'owens-cross-roads-al__move-in-cleaning',
    serviceId: 'move-in-cleaning',
    locationId: 'owens-cross-roads-al',
    urlPath: '/owens-cross-roads-al/services/move-in-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Move-In Cleaning in Owens Cross Roads, Alabama',
    subheadline:
      '56-point empty-home sanitization—inside cabinets, drawers, closets, oven, and fridge—for buyers moving into Owens Cross Roads (35763).',
    introParagraphs: [
      'Moving into a home in Owens Cross Roads or Big Cove (35763) should start with fresh, sanitized cabinets and gleaming floors—not hours of wiping out kitchen drawers and pantry shelves while unpacking boxes.',
      'Mojo Cleaning’s 56-point Move-In Cleaning service in Owens Cross Roads details the entire vacant residence prior to move-in day. We clean inside all kitchen cabinets, drawers, and pantry shelves, inside the oven and refrigerator, inside bathroom vanities and bedroom closets, and wet-wipe all window blinds, baseboards, and floors.',
    ],
    localCustomerGuidance:
      'Schedule your Owens Cross Roads Move-In Clean for the window after closing and before your moving truck unloads. Ensure water and electricity are active at the property.',
    neighborhoodSpotlight: [
      'Nature’s Cove & Taylor Road New Closings (35763)',
      'Big Cove & US-431 Family Subdivisions (35763)',
      'Flint River & Eastern Valley Moves (35763)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Sanitized Cabinet, Pantry & Closet Interiors',
        detail:
          'Every shelf and drawer is vacuumed and wet-wiped so you can unpack immediately.',
      },
      {
        title: 'Inside Oven & Refrigerator Included',
        detail:
          'Full interior appliance sanitization is included automatically in our 56-point Move-In checklist.',
      },
      {
        title: '48-Hour Happiness Guarantee',
        detail:
          'Start life in your Owens Cross Roads home backed by our 48-hour re-clean guarantee.',
      },
    ],
    includedSummary: [
      'All 56 Master Checklist tasks across Kitchen, Bathrooms, Closets & Living Spaces',
      'Inside all kitchen cabinets, drawers, pantry shelves, oven interior, and fridge interior',
      'Inside bathroom vanities, medicine cabinets, closet shelves, wet-wiped blinds & baseboards',
    ],
    localSchedulingNote:
      'Serving all of Owens Cross Roads (35763) Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/service-move.jpg',
      webp: '/images/service-move.webp',
      webpMobile: '/images/service-move-640w.webp',
      alt: 'Empty sunlit home interior in Owens Cross Roads, AL sanitized for move-in day',
      width: 1280,
      height: 714,
      caption: '56-point Move-In Cleaning in Owens Cross Roads, AL (35763).',
    },
    faqs: [
      {
        id: 'faq-sl-ocr-movein-1',
        question: 'Should we book Move-In Cleaning or Post-Construction Cleaning for a brand-new build in Owens Cross Roads?',
        answer:
          'Both cover inside cabinets, closets, and appliances! If the home was previously lived in, choose our 56-point Move-In Clean; if it is brand-new construction with fine drywall dust, choose our Post-Construction Clean.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ocr-movein-2',
        question: 'Are inside the oven and refrigerator included in the Owens Cross Roads Move-In Clean?',
        answer:
          'Yes—cleaning inside the oven and inside the refrigerator/freezer are standard parts of our 56-point Move-In checklist.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ocr-movein-3',
        question: 'Can we share a keypad or lockbox code for our Owens Cross Roads Move-In Clean?',
        answer:
          'Yes! Share your keypad or realtor lockbox instructions when booking and our team will lock up securely when finished.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-In Cleaning in Owens Cross Roads, AL | Mojo Cleaning',
      metaDescription:
        '56-point empty-home move-in cleaning in Owens Cross Roads & Big Cove, AL (35763). Inside cabinets, drawers, closets, oven & fridge sanitized before you unpack.',
      canonicalPath: '/owens-cross-roads-al/services/move-in-cleaning/',
      primaryIntent: 'Book a pre-move-in house cleaning service in Owens Cross Roads, AL',
      primaryQuery: 'move-in cleaning owens cross roads al',
      secondaryQueries: [
        'move-in house cleaning owens cross roads al',
        'move in house cleaning 35763',
        'new home pre move in clean big cove al',
      ],
    },
  },
  {
    id: 'owens-cross-roads-al__move-out-cleaning',
    serviceId: 'move-out-cleaning',
    locationId: 'owens-cross-roads-al',
    urlPath: '/owens-cross-roads-al/services/move-out-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Move-Out Cleaning in Owens Cross Roads, Alabama',
    subheadline:
      'Inspection-ready 56-point empty-home turnover cleaning for sellers, tenants, and property managers in Owens Cross Roads (35763).',
    introParagraphs: [
      'Moving out of a home in Owens Cross Roads or Big Cove (35763) takes enough effort without spending your final evening scrubbing the oven, refrigerator, and baseboards.',
      'Mojo Cleaning’s 56-point Move-Out and Turnover Cleaning service in Owens Cross Roads leaves your vacant property ready for final buyer walk-throughs or lease-end inspections—cleaning inside and outside of all cabinets, drawers, closets, oven, and fridge, wet-wiping window blinds, and mopping all floors.',
    ],
    localCustomerGuidance:
      'Schedule your Owens Cross Roads Move-Out Clean once all furniture and boxes are removed, and keep electricity and water active through the day of service. Itemized receipts are provided upon completion.',
    neighborhoodSpotlight: [
      'Owens Cross Roads & US-431 Home Sales (35763)',
      'Big Cove & Taylor Road Rental & Lease Turnovers (35763)',
      'Nature’s Cove & Eastern Valley Property Transitions (35763)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Complete 56-Point Turnover Standard',
        detail:
          'Covers inside oven, inside refrigerator, inside all cabinets/drawers/closets, blinds, and baseboards.',
      },
      {
        title: 'Itemized Receipt for Leases & Closings',
        detail:
          'Documentation provided for property managers, landlords, or real estate closing packets.',
      },
      {
        title: '48-Hour Walk-Through Guarantee',
        detail:
          'Protected by a complimentary 48-hour spot re-clean if any checklist item is flagged.',
      },
    ],
    includedSummary: [
      '24 Kitchen tasks including inside/outside cabinets, drawers, pantry shelves, oven & refrigerator',
      '17 Bathroom tasks including inside/outside vanities, showers, tubs, toilets, mirrors & blinds',
      '15 Bedroom & Living tasks including closet shelves, wet-wiped blinds, baseboards, doors & floors',
    ],
    localSchedulingNote:
      'Available across Owens Cross Roads (35763) Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/team-cabinet-detail.jpg',
      webp: '/images/team-cabinet-detail.webp',
      webpMobile: '/images/team-cabinet-detail-640w.webp',
      alt: 'Mojo Cleaning specialist detailing inside kitchen cabinets during an Owens Cross Roads move-out clean',
      width: 960,
      height: 1280,
      caption: 'Inspection-ready 56-point Move-Out Cleaning in Owens Cross Roads (35763).',
    },
    faqs: [
      {
        id: 'faq-sl-ocr-moveout-1',
        question: 'Do you provide an itemized receipt for Owens Cross Roads lease inspections or home sales?',
        answer:
          'Yes! We provide an itemized invoice and completion receipt confirming all 56 Move-Out checklist tasks were completed.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ocr-moveout-2',
        question: 'Does the house need to be empty before you start the Move-Out Clean?',
        answer:
          'Yes, having all furniture, boxes, and food items removed allows our team to clean inside every cabinet, drawer, closet, and appliance and mop all floors.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ocr-moveout-3',
        question: 'What if a buyer or landlord points out a missed spot within 48 hours?',
        answer:
          'Contact us within 48 hours of service completion and our team will return to re-clean the affected area at no extra charge under our 48-Hour Happiness Guarantee.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-Out Cleaning in Owens Cross Roads, AL | Mojo Cleaning',
      metaDescription:
        'Inspection-ready 56-point move-out cleaning in Owens Cross Roads & Big Cove, AL (35763). Inside oven, fridge, cabinets, closets & baseboards with receipt.',
      canonicalPath: '/owens-cross-roads-al/services/move-out-cleaning/',
      primaryIntent: 'Book a move-out or lease-end turnover house cleaning in Owens Cross Roads, AL',
      primaryQuery: 'move-out cleaning owens cross roads al',
      secondaryQueries: [
        'move-out cleaning service owens cross roads al',
        'move-out house cleaning owens cross roads al',
        'rental turnover cleaning owens cross roads al',
        'move-out cleaning cost owens cross roads al',
      ],
    },
  },
  {
    id: 'owens-cross-roads-al__post-construction-cleaning',
    serviceId: 'post-construction-cleaning',
    locationId: 'owens-cross-roads-al',
    urlPath: '/owens-cross-roads-al/services/post-construction-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Post-Construction Cleaning in Owens Cross Roads, Alabama',
    subheadline:
      'New-build and after-remodel drywall dust extraction for growing communities across Owens Cross Roads and Big Cove (35763).',
    introParagraphs: [
      'Owens Cross Roads (35763) is home to some of eastern Madison County’s most active new-construction neighborhoods and custom home builds. Even after builders finish their final sweep, fine sheetrock dust, red clay grit, and sawdust linger inside kitchen drawers, closet shelving, window tracks, and floor seams.',
      'Mojo Cleaning’s Post-Construction and Renovation Cleaning service in Owens Cross Roads uses HEPA dry-capture followed by multi-pass damp microfiber detailing to eliminate construction haze from top to bottom—so you can move into your brand-new home without breathing or wiping jobsite dust.',
    ],
    localCustomerGuidance:
      'Book your Owens Cross Roads Post-Construction Clean for the window after final builder punch-list touch-ups and before your moving truck unloads. We detail both builder-grade and custom-built single-family residences.',
    neighborhoodSpotlight: [
      'New-Build Subdivisions Along US-431 & Taylor Road (35763)',
      'Big Cove & Nature’s Cove Communities (35763)',
      'Custom Acreage & Valley Homes in Eastern Madison County (35763)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Inside All New Cabinets, Drawers & Closets',
        detail:
          'We vacuum and damp-wipe every shelf and drawer glide so no sawdust touches your dishes or clothes.',
      },
      {
        title: 'Eliminates LVP & Hardwood Haze',
        detail:
          'Multi-pass microfiber floor care removes chalky drywall residue that single-pass mopping leaves behind.',
      },
      {
        title: 'Scratch-Safe Fixture & Glass Care',
        detail:
          'Protects brand-new mirrors, matte-black/brass plumbing hardware, and stainless appliances.',
      },
    ],
    includedSummary: [
      'High-to-low HEPA vacuuming and microfiber wiping of fans, fixtures, vents, doors, and trim',
      'Full interior and exterior cabinet, drawer, vanity, and closet shelf dust removal',
      'Bathroom and kitchen sanitization plus multi-pass floor detailing',
    ],
    localSchedulingNote:
      'Serving homeowners, custom builders, and realtors across Owens Cross Roads (35763).',
    image: {
      src: '/images/team-post-construction.jpg',
      webp: '/images/team-post-construction.webp',
      webpMobile: '/images/team-post-construction-640w.webp',
      alt: 'Mojo Cleaning specialist detailing newly installed cabinetry and stainless refrigerator in Owens Cross Roads, AL',
      width: 960,
      height: 1280,
      caption: 'New-build and post-renovation detailing across Owens Cross Roads (35763).',
    },
    faqs: [
      {
        id: 'faq-sl-ocr-post-1',
        question: 'My new build in Owens Cross Roads was already “builder cleaned,” why is there still dust?',
        answer:
          'A standard builder rough clean focuses on removing large debris and sweeping floors, but fine airborne drywall dust continues to settle inside cabinets, on door tops, and across floors for days. Our Post-Construction Clean performs detailed HEPA and damp microfiber extraction so the home is truly move-in ready.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ocr-post-2',
        question: 'Does this service also sanitize the bathrooms and kitchen so we can unpack immediately?',
        answer:
          'Yes! We combine post-construction dust extraction with full residential sanitization of sinks, toilets, showers, counters, and appliance interiors.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ocr-post-3',
        question: 'Can we transition to recurring bi-weekly cleaning after moving into Owens Cross Roads?',
        answer:
          'Absolutely—many of our Owens Cross Roads recurring clients first met us through their new-build Move-In or Post-Construction clean.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'owens-cross-roads-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Post-Construction Cleaning in Owens Cross Roads, AL | Mojo Cleaning',
      metaDescription:
        'New-build and post-construction house cleaning in Owens Cross Roads, AL (35763). HEPA drywall dust extraction, inside-cabinet detailing & floor care.',
      canonicalPath: '/owens-cross-roads-al/services/post-construction-cleaning/',
      primaryIntent: 'Book new-build or post-construction cleaning in Owens Cross Roads, AL',
      primaryQuery: 'post-construction cleaning owens cross roads al',
      secondaryQueries: [
        'post-construction cleaning service owens cross roads al',
        'renovation cleaning owens cross roads al',
        'after-construction cleaning owens cross roads al',
      ],
    },
  },

  // =========================================================================
  // 5. ATHENS, AL — 5 ISOLATED SERVICE PAGES (/athens-al/services/*)
  // =========================================================================
  {
    id: 'athens-al__recurring-residential-cleaning',
    serviceId: 'recurring-residential-cleaning',
    locationId: 'athens-al',
    urlPath: '/athens-al/services/recurring-residential-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Recurring House Cleaning in Athens, Alabama',
    subheadline:
      'Weekly, bi-weekly, and monthly residential cleaning for homeowners across Athens and eastern Limestone County (35611, 35613).',
    introParagraphs: [
      'Enjoy your weekends in Athens without spending Saturday morning vacuuming stairs and scrubbing bathrooms. Mojo Cleaning delivers dependable weekly, bi-weekly, and monthly recurring residential cleaning across Athens, AL (35611 and 35613).',
      'Our insured, background-checked specialists arrive with every cleaning solution, microfiber cloth, and vacuum needed to complete our 37-point recurring checklist—and every visit is backed by our 48-Hour Happiness Guarantee.',
    ],
    localCustomerGuidance:
      'Ideal for households commuting along US-72 or I-65 as well as families in Canebrake, Lindsay Lane, and Historic Downtown Athens.',
    neighborhoodSpotlight: [
      'East Athens & US-72 Subdivisions (35613)',
      'Canebrake & Lindsay Lane Corridor (35613)',
      'Downtown Athens & Historic Neighborhoods (35611)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'No Long-Term Contracts',
        detail:
          'Flexible weekly, bi-weekly, or monthly scheduling that adapts to your Athens household.',
      },
      {
        title: 'All Supplies & Equipment Provided',
        detail:
          'Our specialists bring professional supplies, vacuums, and optional pet-safe eco-friendly formulas.',
      },
      {
        title: '48-Hour Happiness Guarantee',
        detail:
          'Complimentary return spot re-clean within 48 hours if anything on your checklist is overlooked.',
      },
    ],
    includedSummary: [
      '37-point recurring maintenance across Kitchen, Bathrooms, Bedrooms & Common Rooms',
      'Sanitized countertops, appliances, sinks, showers, tubs, and toilets',
      'Dusting of fans, sills, and furniture plus complete floor vacuuming and mopping',
    ],
    localSchedulingNote:
      'Weekday recurring slots available across Athens (35611, 35613).',
    image: {
      src: '/images/service-recurring.jpg',
      webp: '/images/service-recurring.webp',
      webpMobile: '/images/service-recurring-640w.webp',
      alt: 'Sunlit family living room in Athens, AL cared for on a bi-weekly recurring schedule',
      width: 1280,
      height: 714,
      caption: 'Weekly, bi-weekly, and monthly recurring house cleaning in Athens, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-ath-rec-1',
        question: 'What recurring cleaning frequencies are available in Athens, AL?',
        answer:
          'We offer weekly, bi-weekly (every two weeks), and monthly recurring schedules across Athens (35611 and 35613).',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ath-rec-2',
        question: 'Can we customize which rooms are cleaned during our Athens recurring visit?',
        answer:
          'Yes! Every checklist is 100% customizable—you can skip unused guest bedrooms or request extra focus on high-traffic kitchens and living areas.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ath-rec-3',
        question: 'How do we get started with recurring cleaning in Athens?',
        answer:
          'Submit a quick quote request online or call/text (256) 418-8199 with your home size and preferred frequency.',
        category: 'service_location',
        serviceId: 'recurring-residential-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Recurring House Cleaning in Athens, AL | Mojo Cleaning',
      metaDescription:
        'Dependable weekly, biweekly, and monthly recurring house cleaning in Athens, AL (35611, 35613). Insured specialists, supplies included & 48-hour guarantee.',
      canonicalPath: '/athens-al/services/recurring-residential-cleaning/',
      primaryIntent: 'Book recurring weekly or biweekly house cleaning in Athens, AL',
      primaryQuery: 'recurring house cleaning athens al',
      secondaryQueries: [
        'weekly house cleaning athens al',
        'biweekly house cleaning athens al',
        'monthly house cleaning athens al',
        'regular house cleaning service athens al',
      ],
    },
  },
  {
    id: 'athens-al__deep-house-cleaning',
    serviceId: 'deep-house-cleaning',
    locationId: 'athens-al',
    urlPath: '/athens-al/services/deep-house-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Deep House Cleaning in Athens, Alabama',
    subheadline:
      '47-point top-to-bottom residential deep cleaning across East Athens (35613), Canebrake, and Historic Downtown Athens (35611).',
    introParagraphs: [
      'Whether you live in an established home near Historic Downtown Athens (35611), a golf-course residence in Canebrake, or a newer family subdivision along Lindsay Lane and US-72 in East Athens (35613), Mojo Cleaning’s 47-point Deep House Cleaning service restores every room to a fresh baseline.',
      'Our insured specialists travel directly to your Athens home with all professional supplies and equipment—hand-wiping baseboards, interior doors, door frames, and kitchen/bath cabinet exteriors while scrubbing showers, tile grout, appliances, and floors.',
    ],
    localCustomerGuidance:
      'Athens homeowners book our 47-point Deep Clean for seasonal spring/fall resets, pre-holiday family gatherings, real estate listing prep, or as the kickoff visit for bi-weekly recurring service.',
    neighborhoodSpotlight: [
      'East Athens, Lindsay Lane & US-72 Corridor (35613)',
      'Canebrake Golf Community & Surrounding Estates (35613)',
      'Historic Downtown Athens & The Square (35611)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: '47 Verified Deep-Clean Tasks',
        detail:
          'Covers baseboards, interior doors, switch plates, cabinet fronts, and deep bath/kitchen sanitation.',
      },
      {
        title: 'All Supplies & Equipment Included',
        detail:
          'We arrive fully equipped with commercial HEPA vacuums, microfiber cloths, and optional eco-friendly products.',
      },
      {
        title: '48-Hour Happiness Guarantee',
        detail:
          'Every Athens appointment is protected by our complimentary 48-hour spot re-clean policy.',
      },
    ],
    includedSummary: [
      '20 Kitchen tasks including exterior cabinetry, range hood degreasing, baseboards, and appliances',
      '15 Bathroom tasks including shower glass/grout scrubbing, vanity exteriors, and baseboards',
      '12 Bedroom & Living tasks including hand-wiped baseboards, doors, ceiling fans, and floors',
    ],
    localSchedulingNote:
      'Serving Athens ZIP codes 35611 and 35613 Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/service-deep.jpg',
      webp: '/images/service-deep.webp',
      webpMobile: '/images/service-deep-640w.webp',
      alt: 'Freshly deep-cleaned master bathroom with marble vanity and glass shower in Athens, AL',
      width: 1280,
      height: 714,
      caption: '47-point Deep House Cleaning across Athens, AL (35611 & 35613).',
    },
    faqs: [
      {
        id: 'faq-sl-ath-deep-1',
        question: 'Do you cover both 35613 (East Athens) and 35611 for Deep Cleaning?',
        answer:
          'Yes! Our teams serve residential properties across both 35613 and 35611 in Athens, Alabama.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ath-deep-2',
        question: 'Can we add inside-oven or inside-fridge cleaning to our Athens Deep Clean?',
        answer:
          'Yes—simply mention inside-oven or inside-refrigerator cleaning in your quote request and we will include it in your custom quote.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ath-deep-3',
        question: 'Do you also offer Move-In and Move-Out cleaning in Athens, AL?',
        answer:
          'Yes. If you are moving into or out of a vacant home in Athens, we offer our full 56-point Move-In and Move-Out turnover cleans.',
        category: 'service_location',
        serviceId: 'deep-house-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Deep House Cleaning in Athens, AL | Mojo Cleaning',
      metaDescription:
        'Book a 47-point deep house cleaning in Athens, AL (35611, 35613). Hand-wiped baseboards, cabinet fronts, showers & floors. Insured & 48-hour guaranteed.',
      canonicalPath: '/athens-al/services/deep-house-cleaning/',
      primaryIntent: 'Book a one-time or seasonal deep house cleaning in Athens, AL',
      primaryQuery: 'deep house cleaning athens al',
      secondaryQueries: [
        'deep cleaning athens al',
        'deep cleaning service athens al',
        'one-time deep cleaning athens al',
        'detailed house cleaning athens al',
        'deep cleaning cost athens al',
      ],
    },
  },
  {
    id: 'athens-al__move-in-cleaning',
    serviceId: 'move-in-cleaning',
    locationId: 'athens-al',
    urlPath: '/athens-al/services/move-in-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Move-In Cleaning in Athens, Alabama',
    subheadline:
      '56-point empty-home sanitization—inside cabinets, drawers, closets, oven, and fridge—for buyers moving into Athens (35611 & 35613).',
    introParagraphs: [
      'Moving into a home in East Athens (35613), Canebrake, or Historic Downtown Athens (35611) should feel like a fresh chapter—not a weekend spent scrubbing out cabinets and appliances before you can unpack.',
      'Mojo Cleaning’s 56-point Move-In Cleaning service in Athens, AL details your vacant residence from top to bottom. We vacuum and wet-wipe inside every kitchen cabinet, drawer, and pantry shelf, sanitize inside the oven and refrigerator, wipe inside bathroom vanities and bedroom closets, and detail window blinds, baseboards, and floors.',
    ],
    localCustomerGuidance:
      'Book your Athens Move-In Clean for the window between closing/key pickup and moving-truck arrival. Make sure water and electricity are active at the property.',
    neighborhoodSpotlight: [
      'East Athens, Lindsay Lane & US-72 Closings (35613)',
      'Canebrake & I-65 Corridor Moves (35613)',
      'Historic Downtown Athens Residences (35611)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Unpack Into Sanitized Cabinets & Closets',
        detail:
          'Every kitchen shelf, cutlery drawer, vanity cabinet, and closet shelf is wiped clean prior to unpacking.',
      },
      {
        title: 'Inside Oven & Refrigerator Included',
        detail:
          'Both major kitchen appliances are sanitized inside and out as part of the 56-point Move-In standard.',
      },
      {
        title: '48-Hour Happiness Guarantee',
        detail:
          'Backed by our complimentary 48-hour spot re-clean promise.',
      },
    ],
    includedSummary: [
      '24 Kitchen tasks: inside all cabinets/drawers, pantry shelves, inside oven, inside fridge, counters & floors',
      '17 Bathroom tasks: inside vanity cabinets/drawers, showers, tubs, toilets, mirrors & blinds',
      '15 Bedroom & Living tasks: closet shelves, wet-wiped window blinds, baseboards, doors & floors',
    ],
    localSchedulingNote:
      'Available across Athens ZIP codes 35611 and 35613 Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/service-move.jpg',
      webp: '/images/service-move.webp',
      webpMobile: '/images/service-move-640w.webp',
      alt: 'Empty sunlit home interior in Athens, AL freshly sanitized for move-in day',
      width: 1280,
      height: 714,
      caption: '56-point Move-In Cleaning across Athens, AL (35611 & 35613).',
    },
    faqs: [
      {
        id: 'faq-sl-ath-movein-1',
        question: 'Does the Athens Move-In Clean include inside all cabinets, closets, oven, and fridge?',
        answer:
          'Yes! All 56 tasks on our Master Checklist—including inside kitchen cabinets and drawers, pantry shelves, bathroom vanities, bedroom closets, oven interior, and refrigerator interior—are included.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ath-movein-2',
        question: 'Can we share a keypad or lockbox code if we are relocating to Athens from out of town?',
        answer:
          'Absolutely. Share your smart-lock or realtor lockbox instructions when requesting your quote and our insured team will secure the home upon completion.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ath-movein-3',
        question: 'How far ahead should we schedule a Move-In Clean in Athens (35611 / 35613)?',
        answer:
          'We recommend reaching out 5 to 10 days before your target closing or lease start date so we can reserve your ideal window before movers arrive.',
        category: 'service_location',
        serviceId: 'move-in-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-In Cleaning in Athens, AL | Mojo Cleaning',
      metaDescription:
        '56-point empty-home move-in cleaning in Athens, AL (35611, 35613). Inside cabinets, drawers, closets, oven & fridge sanitized before you unpack.',
      canonicalPath: '/athens-al/services/move-in-cleaning/',
      primaryIntent: 'Book a pre-move-in house cleaning service in Athens, AL',
      primaryQuery: 'move-in cleaning athens al',
      secondaryQueries: [
        'move-in house cleaning athens al',
        'move in house cleaning east athens 35613',
        'empty home cleaning athens alabama',
      ],
    },
  },
  {
    id: 'athens-al__move-out-cleaning',
    serviceId: 'move-out-cleaning',
    locationId: 'athens-al',
    urlPath: '/athens-al/services/move-out-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Move-Out Cleaning in Athens, Alabama',
    subheadline:
      'Inspection-ready 56-point empty-home turnover cleaning for tenants, home sellers, and landlords across Athens (35611 & 35613).',
    introParagraphs: [
      'Whether you are completing a lease-end move-out in East Athens (35613) or preparing a home near Historic Downtown Athens (35611) or Canebrake for a buyer’s closing walk-through, Mojo Cleaning’s 56-point Move-Out and Turnover Cleaning service handles every detail after the moving truck leaves.',
      'We clean inside and outside of all kitchen cabinets, drawers, pantry shelves, bathroom vanities, oven, and refrigerator, wipe down closet shelving and window blinds, hand-detail baseboards and doors, and mop all floors.',
    ],
    localCustomerGuidance:
      'Schedule your Athens Move-Out Clean after all furniture and boxes are removed, and keep electricity and water connected through the completion of service. Itemized receipts are available for landlords and closing packets.',
    neighborhoodSpotlight: [
      'East Athens & Lindsay Lane Rentals & Home Sales (35613)',
      'Canebrake & US-72 Corridor Turnovers (35613)',
      'Downtown Athens & 35611 Residential Closings',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Inspection & Walk-Through Ready',
        detail:
          'Covers inside oven, inside fridge, cabinet interiors, blinds, and baseboards checked by landlords and buyers.',
      },
      {
        title: 'Itemized Receipt Provided',
        detail:
          'Clear documentation confirming a professional 56-point turnover clean was completed.',
      },
      {
        title: '48-Hour Walk-Through Guarantee',
        detail:
          'If any checklist item is noted within 48 hours, our team returns to re-clean that area for free.',
      },
    ],
    includedSummary: [
      'All 56 Master Checklist points across Kitchen, Bathrooms, Closets & Living Areas',
      'Inside oven, inside refrigerator/freezer, and inside all cabinets, drawers, and closets',
      'Wet-wiped window blinds, hand-wiped baseboards, interior doors, and wall-to-wall floor care',
    ],
    localSchedulingNote:
      'Serving Athens ZIP codes 35611 and 35613 Monday – Friday and Saturdays by appointment.',
    image: {
      src: '/images/team-cabinet-detail.jpg',
      webp: '/images/team-cabinet-detail.webp',
      webpMobile: '/images/team-cabinet-detail-640w.webp',
      alt: 'Mojo Cleaning specialist detailing inside kitchen base cabinets during an Athens move-out clean',
      width: 960,
      height: 1280,
      caption: '56-point Move-Out turnover cleaning in Athens, AL (35611 & 35613).',
    },
    faqs: [
      {
        id: 'faq-sl-ath-moveout-1',
        question: 'Do you provide a cleaning receipt for Athens landlords or property managers?',
        answer:
          'Yes! Upon completion of your Athens Move-Out Clean, we provide an itemized receipt confirming our 56-point turnover standard (including inside oven, fridge, and cabinets) was completed.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ath-moveout-2',
        question: 'Does the property need to be completely empty for an Athens Move-Out Clean?',
        answer:
          'Yes—scheduling after all furniture, boxes, and food items are removed allows our specialists to detail inside every cabinet, drawer, closet, and appliance.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ath-moveout-3',
        question: 'Is our Athens Move-Out Clean backed by the 48-Hour Happiness Guarantee?',
        answer:
          'Yes. If your landlord, property manager, or buyer flags any checklist item within 48 hours, contact us and we will return to spot-clean at no charge.',
        category: 'service_location',
        serviceId: 'move-out-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Move-Out Cleaning in Athens, AL | Mojo Cleaning',
      metaDescription:
        'Inspection-ready 56-point move-out cleaning in Athens, AL (35611, 35613). Inside oven, fridge, cabinets, closets & baseboards. Itemized receipts & guarantee.',
      canonicalPath: '/athens-al/services/move-out-cleaning/',
      primaryIntent: 'Book an inspection-ready move-out cleaning service in Athens, AL',
      primaryQuery: 'move-out cleaning athens al',
      secondaryQueries: [
        'move-out cleaning service athens al',
        'move-out house cleaning athens al',
        'rental turnover cleaning athens al',
        'move-out cleaning cost athens al',
      ],
    },
  },
  {
    id: 'athens-al__post-construction-cleaning',
    serviceId: 'post-construction-cleaning',
    locationId: 'athens-al',
    urlPath: '/athens-al/services/post-construction-cleaning/',
    isAvailable: true,
    publicationStatus: 'published',
    headline: 'Post-Construction Cleaning in Athens, Alabama',
    subheadline:
      'HEPA drywall dust extraction and new-home detailing for subdivisions and remodels across East Athens (35613) and Downtown Athens (35611).',
    introParagraphs: [
      'With rapid new-home construction along Lindsay Lane, Huntsville-Brownsferry Road, and the US-72 corridor in East Athens (35613) as well as historic home renovations near Downtown Athens (35611), fine drywall and sawdust particles often coat new cabinets, window sills, and LVP/hardwood floors.',
      'Mojo Cleaning’s Post-Construction and Renovation Cleaning service in Athens, AL uses a systematic dry-to-wet HEPA vacuuming and microfiber detailing protocol to remove construction dust from inside cabinets, drawers, closets, lighting fixtures, baseboards, and floors.',
    ],
    localCustomerGuidance:
      'Schedule your Athens Post-Construction Clean after contractors complete sanding, painting, and grouting and rough debris is cleared. Ideal for new-build buyers before unpacking or homeowners finishing a kitchen/bath remodel.',
    neighborhoodSpotlight: [
      'East Athens & Lindsay Lane New-Build Subdivisions (35613)',
      'Huntsville-Brownsferry & I-65 Corridor New Homes (35613)',
      'Historic Downtown Athens Home Remodels (35611)',
    ],
    whyLocalHomeownersChoose: [
      {
        title: 'Multi-Pass HEPA Dust Removal',
        detail:
          'Eliminates fine sheetrock dust from cabinet hinges, drawer glides, vents, and floor seams.',
      },
      {
        title: 'Scratch-Safe New-Finish Detailing',
        detail:
          'Protects brand-new stone counters, mirrors, glass showers, and hardware.',
      },
      {
        title: 'Ready for Immediate Move-In',
        detail:
          'Combines post-construction dust extraction with full kitchen and bath sanitization.',
      },
    ],
    includedSummary: [
      'Overhead-to-floor HEPA vacuuming and microfiber detailing of fans, vents, fixtures, doors & trim',
      'Full interior and exterior cleaning of new kitchen cabinets, drawers, vanities, and closet shelves',
      'Sanitization of bathrooms, kitchen surfaces, and multi-pass microfiber floor mopping',
    ],
    localSchedulingNote:
      'Serving homeowners, custom builders, and realtors across Athens (35611 & 35613).',
    image: {
      src: '/images/service-post-construction.jpg',
      webp: '/images/service-post-construction.webp',
      webpMobile: '/images/service-post-construction-640w.webp',
      alt: 'Newly constructed kitchen in Athens, AL after post-construction dust detailing',
      width: 1280,
      height: 714,
      caption: 'New-build and after-remodel post-construction cleaning in Athens, AL.',
    },
    faqs: [
      {
        id: 'faq-sl-ath-post-1',
        question: 'Can you detail a brand-new build in East Athens (35613) before our moving truck arrives?',
        answer:
          'Yes! We frequently detail newly built homes in 35613 and 35611—removing fine drywall dust from inside every cabinet, drawer, and closet shelf so you can unpack immediately.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ath-post-2',
        question: 'Can we book Post-Construction Cleaning for a single-room remodel in Athens?',
        answer:
          'Yes. Whether you remodeled a kitchen, updated bathrooms, or finished a whole-home renovation in Athens, we tailor the quote to your project.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
      {
        id: 'faq-sl-ath-post-3',
        question: 'Is your Athens Post-Construction Clean backed by the 48-Hour Guarantee?',
        answer:
          'Yes—every appointment is protected by our 48-Hour Happiness Guarantee.',
        category: 'service_location',
        serviceId: 'post-construction-cleaning',
        locationId: 'athens-al',
        publicationStatus: 'published',
      },
    ],
    seo: {
      title: 'Post-Construction Cleaning in Athens, AL | Mojo Cleaning',
      metaDescription:
        'New-build & renovation post-construction house cleaning in Athens, AL (35611, 35613). HEPA drywall dust extraction, cabinet interiors & floor care.',
      canonicalPath: '/athens-al/services/post-construction-cleaning/',
      primaryIntent: 'Book post-construction or new-build house cleaning in Athens, AL',
      primaryQuery: 'post-construction cleaning athens al',
      secondaryQueries: [
        'post-construction cleaning service athens al',
        'renovation cleaning athens al',
        'after-construction cleaning athens al',
      ],
    },
  },
];

export function evaluateServiceLocationPublication(entry: LocationServiceEntity): {
  approvedForIndex: boolean;
  reason: string;
} {
  const loc = LOCATIONS_DATA.find((l) => l.id === entry.locationId);
  const service = SERVICES_BY_ID[entry.serviceId];
  if (!loc || !service) {
    return { approvedForIndex: false, reason: 'Invalid location or service entity.' };
  }
  if (!loc.availableServiceIds.includes(entry.serviceId)) {
    return {
      approvedForIndex: false,
      reason: `Service ${entry.serviceId} is not offered in ${loc.name}.`,
    };
  }
  if (!entry.isAvailable || entry.publicationStatus !== 'published') {
    return {
      approvedForIndex: false,
      reason: entry.publicationStatus,
    };
  }
  if (
    entry.introParagraphs.length < 2 ||
    entry.faqs.length < 2 ||
    !entry.seo.title ||
    !entry.seo.metaDescription
  ) {
    return {
      approvedForIndex: false,
      reason: 'Insufficient unique content or metadata.',
    };
  }
  return {
    approvedForIndex: true,
    reason: 'Verified service in location with full bespoke content and metadata.',
  };
}

export const PUBLISHED_SERVICE_LOCATIONS: LocationServiceEntity[] = SERVICE_LOCATIONS_DATA.filter(
  (entry) => evaluateServiceLocationPublication(entry).approvedForIndex
);

export const PUBLISHED_SERVICE_LOCATIONS_BY_PATH: Record<string, LocationServiceEntity> =
  PUBLISHED_SERVICE_LOCATIONS.reduce(
    (acc, entry) => {
      acc[entry.urlPath] = entry;
      return acc;
    },
    {} as Record<string, LocationServiceEntity>
  );

export function getLocationServiceEntity(
  locationId: LocationId,
  serviceId: ServiceId
): LocationServiceEntity | undefined {
  return PUBLISHED_SERVICE_LOCATIONS.find(
    (item) => item.locationId === locationId && item.serviceId === serviceId
  );
}
