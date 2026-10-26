import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CheckCircleIcon, MojoSparkle, ShieldCheckIcon } from '../components/Icons';
import type { LocationEntity } from '../data/entities';
import {
  INDEXABLE_PAGES,
  LEGACY_REDIRECTS,
  NOT_FOUND_PAGE,
  PUBLISHED_PAGES,
} from '../data/page-registry';
import {
  GSC_INDEXING_MONITOR_CONFIG,
  LOCATION_CANDIDATE_EVALUATIONS,
  PRE_IMPLEMENTATION_BASELINE,
  SERVICE_CANDIDATE_EVALUATIONS,
} from '../data/seo-architecture';
import { getLocationHomePath } from '../utils/location-routing';

interface SeoDashboardPageProps {
  activeLocation: LocationEntity;
}

export const SeoDashboardPage: React.FC<SeoDashboardPageProps> = ({ activeLocation }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const allRegistryPages = [...PUBLISHED_PAGES, NOT_FOUND_PAGE];
  const redirectCount = Object.keys(LEGACY_REDIRECTS).length;
  const totalGeneratedUrls = allRegistryPages.length + redirectCount;
  const totalPublishedPages = PUBLISHED_PAGES.length;
  const totalIndexablePages = INDEXABLE_PAGES.length;
  const totalNoindexPages = allRegistryPages.filter((p) => p.robots.startsWith('noindex')).length;
  const heldBackCandidatesCount =
    SERVICE_CANDIDATE_EVALUATIONS.filter((s) => s.publicationStatus !== 'published').length +
    LOCATION_CANDIDATE_EVALUATIONS.filter((l) => l.publicationStatus !== 'published').length;

  const filteredPages = allRegistryPages.filter((p) => {
    const matchesType = filterType === 'all' || p.pageType === filterType;
    const matchesSearch =
      !searchTerm.trim() ||
      p.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.primaryTargetQuery || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const breadcrumbs = [
    { label: activeLocation.name, href: getLocationHomePath(activeLocation.id) },
    { label: 'SEO Governance Dashboard', href: '/seo-dashboard/' },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />
          <div className="page-hero-copy" style={{ maxWidth: '900px' }}>
            <div className="eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>Administrative SEO Governance • Meta Robots: noindex, nofollow</span>
            </div>
            <h1 className="page-hero-title">
              SEO Architecture, Page Registry &amp; Indexability Governance Dashboard
            </h1>
            <p className="page-hero-lead">
              Authoritative technical SEO inventory for <strong>Mojo Cleaning</strong> (
              <code>https://mojocleaningservice.com/</code>). This administrative view separates
              generated URLs, published pages, technically indexable canonical pages, XML sitemap
              submissions, and live Google Search Console indexing metrics.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <ShieldCheckIcon className="text-coral" size={14} />
              <span>Phase 15 — Non-Interchangeable SEO &amp; Indexing Measurements</span>
            </div>
            <h2 className="section-title">
              Authoritative Page Inventory &amp; Indexability Summary
            </h2>
            <p className="section-subtitle">
              Per Google indexing governance rules, generated URLs, published pages, sitemap
              submissions, and Google-indexed URLs are distinct metrics and are never conflated.
            </p>
          </div>

          <div className="criteria-cards-grid" style={{ marginBottom: '2.5rem' }}>
            <div className="info-box">
              <span className="badge-pill">1. Generated URLs</span>
              <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{totalGeneratedUrls}</h3>
              <p>
                Includes {totalPublishedPages} published routes, 1 custom 404 route (
                <code>/404/</code>), and {redirectCount} legacy 301 redirect rules.
              </p>
            </div>

            <div className="info-box">
              <span className="badge-pill">2. Published Pages</span>
              <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{totalPublishedPages}</h3>
              <p>
                Includes {totalIndexablePages} public customer-facing pages and 1 administrative
                dashboard (<code>/seo-dashboard/</code>).
              </p>
            </div>

            <div className="info-box">
              <span className="badge-pill">3. Technically Indexable Pages</span>
              <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{totalIndexablePages}</h3>
              <p>
                Pages passing all quality gates with <code>index, follow</code>, self-referencing
                canonical URLs, and 0 duplicate titles/H1s.
              </p>
            </div>

            <div className="info-box">
              <span className="badge-pill">4. Intentionally Non-Indexable</span>
              <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
                {totalNoindexPages} Routes + {heldBackCandidatesCount} Held Candidates
              </h3>
              <p>
                <code>/404/</code> and <code>/seo-dashboard/</code> carry{' '}
                <code>noindex, nofollow</code>; {heldBackCandidatesCount} unverified service/city
                candidates are blocked from publication.
              </p>
            </div>

            <div className="info-box">
              <span className="badge-pill">5. URLs in XML Sitemaps</span>
              <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{totalIndexablePages}</h3>
              <p>
                Partitioned across <code>sitemap_index.xml</code> into 5 child sitemaps (Core,
                Locations, Services, Service-Locations, Guides).
              </p>
            </div>

            <div className="info-box info-box-warm">
              <span className="badge-pill">6. Google Indexed / Impressions / Leads</span>
              <h3 style={{ fontSize: '1.25rem', margin: '0.5rem 0' }}>
                Unverified (Requires Live GSC / CRM Auth)
              </h3>
              <p>
                Google Search Console live indexed count, search impressions, and organic lead
                counts remain labeled <strong>unverified</strong> until property credentials are
                connected.
              </p>
            </div>
          </div>

          {/* Baseline vs. Post-Implementation Comparison */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title">
              Phase 1.2 vs. Phase 18 — Baseline Audit vs. Current Implementation
            </h2>
            <div className="checklist-table-wrapper">
              <table className="checklist-comparison-table">
                <thead>
                  <tr>
                    <th>SEO Architecture Metric</th>
                    <th>Pre-Implementation Baseline</th>
                    <th>Current Verified Implementation</th>
                    <th>Verification Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Total Discovered / Generated URLs</strong>
                    </td>
                    <td>{PRE_IMPLEMENTATION_BASELINE.totalDiscoveredUrls}</td>
                    <td>{totalGeneratedUrls}</td>
                    <td>Verified in Page Registry &amp; Pre-Render Build</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Eligible Indexable Canonical Pages</strong>
                    </td>
                    <td>{PRE_IMPLEMENTATION_BASELINE.totalSuccessfulIndexablePages}</td>
                    <td>{totalIndexablePages}</td>
                    <td>Verified in Production HTML &amp; Sitemap Suite</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Informational &amp; Comparison Guides</strong>
                    </td>
                    <td>{PRE_IMPLEMENTATION_BASELINE.informationalResourcePagesCount}</td>
                    <td>6 (1 Hub + 5 Editorial Guides with Article Schema)</td>
                    <td>
                      Verified under <code>/guides/</code> &amp; <code>sitemap-guides.xml</code>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>XML Sitemap Architecture</strong>
                    </td>
                    <td>1 flat sitemap.xml ({PRE_IMPLEMENTATION_BASELINE.sitemapUrlCount} URLs)</td>
                    <td>
                      <code>sitemap_index.xml</code> + 5 segmented child sitemaps (
                      {totalIndexablePages} URLs)
                    </td>
                    <td>Programmatically validated XML &amp; canonical match</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Pages Marked noindex</strong>
                    </td>
                    <td>{PRE_IMPLEMENTATION_BASELINE.totalPagesMarkedNoindex} (/404/)</td>
                    <td>{totalNoindexPages} (/404/ and /seo-dashboard/)</td>
                    <td>Verified in compiled HTML &amp; excluded from sitemaps</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Duplicate Titles / H1s / Orphan Pages</strong>
                    </td>
                    <td>0</td>
                    <td>0 Duplicate Titles, 0 Duplicate H1s, 0 Orphan Indexable Pages</td>
                    <td>
                      Verified by <code>scripts/seo-test-suite.mjs</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Candidate Services & Locations Held Back by Anti-Doorway Quality Gate */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title">
              Phase 2 &amp; Phase 3.2 — Anti-Doorway Quality Gate (Candidate Evaluations)
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              Candidate services and geographic areas are evaluated before publication. Unverified
              services or cities without distinct local operational proof are blocked from indexable
              publication.
            </p>
            <div className="checklist-table-wrapper">
              <table className="checklist-comparison-table">
                <thead>
                  <tr>
                    <th>Candidate Type</th>
                    <th>Name &amp; Proposed Slug</th>
                    <th>Verified Availability</th>
                    <th>Publication Decision</th>
                    <th>Quality Gate Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICE_CANDIDATE_EVALUATIONS.map((svc) => (
                    <tr key={svc.candidateId}>
                      <td>Service Candidate</td>
                      <td>
                        <strong>{svc.name}</strong> (<code>/{svc.proposedSlug}/</code>)
                      </td>
                      <td>{svc.verifiedOfferedByBusiness ? 'Verified' : 'Unverified'}</td>
                      <td>
                        <span className="badge-pill">{svc.indexabilityDecision}</span>
                      </td>
                      <td>{svc.gateNotes}</td>
                    </tr>
                  ))}
                  {LOCATION_CANDIDATE_EVALUATIONS.map((loc) => (
                    <tr key={loc.candidateId}>
                      <td>Location Candidate</td>
                      <td>
                        <strong>{loc.cityOrAreaName}</strong> (<code>/{loc.proposedSlug}/</code>)
                      </td>
                      <td>{loc.verifiedDispatchCoverage ? 'Verified' : 'Unverified'}</td>
                      <td>
                        <span className="badge-pill">{loc.indexabilityDecision}</span>
                      </td>
                      <td>{loc.gateNotes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Google Search Console Monitoring Table */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 className="section-title">
              Phase 14 — Google Search Console Indexing State Classifications
            </h2>
            <div className="checklist-table-wrapper">
              <table className="checklist-comparison-table">
                <thead>
                  <tr>
                    <th>GSC Indexing State Bucket</th>
                    <th>Technical Description</th>
                    <th>Expected Build Count</th>
                    <th>Live Google Search Console Status</th>
                  </tr>
                </thead>
                <tbody>
                  {GSC_INDEXING_MONITOR_CONFIG.monitoredIndexingBuckets.map((bucket) => (
                    <tr key={bucket.state}>
                      <td>
                        <strong>{bucket.state}</strong>
                      </td>
                      <td>{bucket.description}</td>
                      <td>{bucket.expectedEligibleCount}</td>
                      <td>{bucket.liveCountStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Authoritative Page Registry Table */}
          <div>
            <h2 className="section-title">
              Phase 2.5 — Authoritative Page Registry ({filteredPages.length} of{' '}
              {allRegistryPages.length} Routes Shown)
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '1rem',
                alignItems: 'center',
              }}
            >
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by path, title, or target query..."
                aria-label="Filter pages by path, title, or query"
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(59,15,24,0.25)',
                  minWidth: '280px',
                }}
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                aria-label="Filter by page type"
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(59,15,24,0.25)',
                }}
              >
                <option value="all">All Page Types ({allRegistryPages.length})</option>
                <option value="location_home">Location Homepages (6)</option>
                <option value="location_services">Location Services Hubs (5)</option>
                <option value="location_service_detail">Service-Location Pages (25)</option>
                <option value="location_checklist">Checklist Pages (5)</option>
                <option value="location_about">About Pages (5)</option>
                <option value="location_reviews">Reviews Pages (5)</option>
                <option value="location_faqs">FAQ Pages (5)</option>
                <option value="location_contact">Contact Pages (5)</option>
                <option value="location_quote">Quote Pages (5)</option>
                <option value="guides_hub">Guides Hub (1)</option>
                <option value="guide_article">Guide Articles (5)</option>
                <option value="locations_directory">Locations Directory (1)</option>
                <option value="legal">Legal Pages (2)</option>
                <option value="seo_dashboard">Admin SEO Dashboard (1)</option>
                <option value="not_found">404 Error Page (1)</option>
              </select>
            </div>

            <div className="checklist-table-wrapper">
              <table className="checklist-comparison-table">
                <thead>
                  <tr>
                    <th>Route Path</th>
                    <th>Page Type</th>
                    <th>Primary Target Query</th>
                    <th>Robots Directive</th>
                    <th>Sitemap File</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPages.map((page) => (
                    <tr key={page.path}>
                      <td>
                        <a href={page.path}>
                          <code>{page.path}</code>
                        </a>
                      </td>
                      <td>
                        <span className="badge-pill">{page.pageType}</span>
                      </td>
                      <td>{page.primaryTargetQuery || '—'}</td>
                      <td>
                        <code>{page.robots}</code>
                      </td>
                      <td>
                        <code>{page.sitemapFile || 'excluded'}</code>
                      </td>
                      <td>
                        {page.opportunityScore ? (
                          <span>
                            <CheckCircleIcon className="text-coral" size={14} />{' '}
                            {page.opportunityScore}/100
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
