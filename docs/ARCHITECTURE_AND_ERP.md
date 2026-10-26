# Mojo Cleaning — Multi-Page Website, Controlled Programmatic SEO & ERP-Ready Architecture

## 1. Verified Business Profile (`src/data/business-profile.ts`)

All business claims published on `https://mojocleaningservice.com/` are governed by `VERIFIED_BUSINESS_PROFILE` in [`src/data/business-profile.ts`](../src/data/business-profile.ts) and exported to [`docs/business-profile.json`](./business-profile.json):

| Field | Verified Value | Status | Source |
| :--- | :--- | :--- | :--- |
| **Display Name** | `Mojo Cleaning` | `verified` | Official website (`https://mojocleaningservice.com/`) |
| **Legal Entity Name** | `Mojo Cleaning LLC` | `verified` | Official Privacy Policy & Terms |
| **Preferred Canonical Domain** | `https://mojocleaningservice.com` | `verified` | Canonical `<link>` & live DNS |
| **Public Telephone** | `(256) 418-8199` (`+12564188199`, Call or Text) | `verified` | Official header, footer & contact page |
| **Public Email** | `hello@mojocleaningservice.com` | `verified` | Official footer & legal notices |
| **Operating Model** | Service-Area Business (SAB) in Huntsville, AL | `verified` | Dispatches directly to client homes; no public storefront address published |
| **Office & Scheduling Hours** | Mon – Fri: `8:00 AM – 6:00 PM`; Sat: By appointment | `verified` | Official contact & scheduling policy |
| **Verified Core Services (5)** | Recurring Cleaning, Deep Cleaning, Move-In Cleaning, Move-Out Cleaning, Post-Construction Cleaning | `verified` | Official navigation, service cards & 56-point checklist |
| **Verified Service Areas (5)** | Huntsville, AL; Madison, AL; Hampton Cove, AL; Owens Cross Roads, AL; Athens, AL | `verified` | Official service-area directory |
| **Published Guarantee** | 48-Hour Happiness Guarantee (free return re-clean of any missed spot) | `verified` | Official homepage & Terms |
| **CRM Integration** | LeadConnector / GoHighLevel Form ID `LMshydq3SzEFJgOrXehA` | `verified` | Live form widget on `mojocleaningservice.com` |

---

## 2. Complete Route Architecture (33 Published Indexable Routes + Custom 404)

### Main Pages (9 Routes)
- `/` — Homepage (12-part conversion flow + local discovery hub)
- `/about/` — About Mojo Cleaning (8-part flow)
- `/services/` — Services Overview & Interactive 56-Point Checklist Comparison (9-part flow)
- `/locations/` — Service Areas Directory & Interactive ZIP/City Coverage Lookup (6-part flow)
- `/reviews/` — Verified Client Reviews & 48-Hour Happiness Guarantee
- `/faqs/` — Searchable & Filterable FAQ Hub
- `/contact/` — Direct Contact & Custom Quote Request Hub
- `/privacy-policy/` — Privacy Policy & SMS Terms
- `/terms/` — Terms & Conditions of Service

### Dedicated Service Pages (5 Routes — 13-Part Flow Each)
- `/services/recurring-cleaning/`
- `/services/deep-cleaning/`
- `/services/move-in-cleaning/`
- `/services/move-out-cleaning/`
- `/services/post-construction-cleaning/`

### Dedicated Location Pages (5 Routes — 11-Part Flow Each)
- `/locations/huntsville-al/`
- `/locations/madison-al/`
- `/locations/hampton-cove-al/`
- `/locations/owens-cross-roads-al/`
- `/locations/athens-al/`

### Controlled Programmatic Service-Plus-Location Pages (14 Published Routes — 11-Part Flow Each)
- `/locations/huntsville-al/recurring-cleaning/`
- `/locations/huntsville-al/deep-cleaning/`
- `/locations/huntsville-al/move-in-cleaning/`
- `/locations/huntsville-al/move-out-cleaning/`
- `/locations/huntsville-al/post-construction-cleaning/`
- `/locations/madison-al/recurring-cleaning/`
- `/locations/madison-al/deep-cleaning/`
- `/locations/madison-al/move-out-cleaning/`
- `/locations/hampton-cove-al/recurring-cleaning/`
- `/locations/hampton-cove-al/deep-cleaning/`
- `/locations/owens-cross-roads-al/post-construction-cleaning/`
- `/locations/owens-cross-roads-al/recurring-cleaning/`
- `/locations/athens-al/deep-cleaning/`
- `/locations/athens-al/recurring-cleaning/`

### Unpublished / Consolidated Matrix Combinations (11 Held Back by Gatekeeper)
In [`src/data/service-locations-data.ts`](../src/data/service-locations-data.ts), all 25 `(5 services × 5 locations)` combinations are modeled. Only the **14 combinations** that pass `evaluateServiceLocationPublication()` with distinct local housing guidance, neighborhood spotlights, and 4+ unique local FAQs are set to `publicationStatus: 'published'`. The remaining **11 combinations** are held in `draft` or `needs_review` status with explicit `consolidationTargetPath` pointers to prevent thin city-swap doorway pages from entering `sitemap.xml` or being indexed.

---

## 3. Automated SEO Audit Pipeline (`scripts/seo-audit.mjs`)

Every `npm run build` executes [`scripts/seo-audit.mjs`](../scripts/seo-audit.mjs) and writes [`docs/seo-audit-report.json`](./seo-audit-report.json). The audit verifies:
1. **Unique `<title>` tags** across all 33 published routes (`33 / 33` unique).
2. **Unique `<meta name="description">` tags** across all 33 published routes (`33 / 33` unique).
3. **Unique `<h1>` headings** (`1` per page, `33 / 33` unique).
4. **Self-referencing `<link rel="canonical">`** on every published route.
5. **Correct `<meta name="robots">`** (`index, follow` on all 33 published routes; `noindex, nofollow` on `dist/404.html`).
6. **Zero broken internal links** and **zero orphan pages** across the entire internal link graph.
7. **3-Gram Jaccard Content Similarity Guard**: Verifies that no two service, location, or service-location pages exceed `55%` shingle overlap (current max similarity: `42.77%`).
8. **Schema.org JSON-LD Validation**: Validates `@graph` syntax and entity references (`LocalBusiness`, `HomeAndConstructionBusiness`, `ProfessionalService`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage`).

---

## 4. ERP-Ready Domain Models & Service Boundary (`src/erp/`)

The public website is decoupled from future internal ERP operations via [`src/erp/types.ts`](../src/erp/types.ts) and [`src/erp/service-boundary.ts`](../src/erp/service-boundary.ts):
- **Core ERP Entities Defined**:
  - `ErpLeadRecord` & `SeoOrganicAttributionSession` (captures `firstLandingPath`, `firstLandingPageType`, `sourcePagePath`, `utmSource`, `utmMedium`, `utmCampaign`, and `referrer`).
  - `ErpCustomerAccount`, `ErpPropertyProfile` (square footage tier, bedrooms/bathrooms, flooring surfaces, pet notes, access instructions), `ErpQuoteEstimate`, `ErpWorkOrder`, `ErpCrewAssignment`, `ErpRoomChecklistVerification`, `ErpInvoiceSummary`, and `ErpGuaranteeFollowUpTicket` (48-Hour Happiness Guarantee resolution workflow).
- **Security Boundary**:
  - No private CRM tokens, employee schedules, or customer records are exposed in client-side bundles.
  - Quote submissions post to `POST /api/quote` ([`functions/api/quote.ts`](../functions/api/quote.ts)), which validates input, filters honeypot spam, records organic landing-page attribution, and forwards to GoHighLevel (`GHL_WEBHOOK_URL`) or renders the pre-populated LeadConnector widget (`LMshydq3SzEFJgOrXehA`).
