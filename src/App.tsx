import React, { useEffect, useMemo, useState } from 'react';
import type { ServiceItem } from './config/business';
import { LegalView } from './components/LegalView';
import { MobileCallButton } from './components/MobileCallButton';
import { MojoScrollMascotCompanion } from './components/MojoMascot';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import type { LocationId } from './data/entities';
import { LOCATIONS_BY_ID } from './data/locations-data';
import { normalizeRoutePath, resolvePageByPath } from './data/page-registry';
import { SERVICE_LOCATIONS_DATA } from './data/service-locations-data';
import { SERVICES_BY_ID } from './data/services-data';
import { recordOrganicLandingSession } from './erp/service-boundary';
import { AboutPage } from './pages/AboutPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { ContactPage } from './pages/ContactPage';
import { FaqsPage } from './pages/FaqsPage';
import { HomePage } from './pages/HomePage';
import { LocationsIndexPage } from './pages/LocationsIndexPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ServiceLocationPage } from './pages/ServiceLocationPage';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { resolveActiveLocationId } from './utils/location-routing';

interface AppProps {
  initialPath?: string;
}

export const App: React.FC<AppProps> = ({ initialPath }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (initialPath) {
      return normalizeRoutePath(initialPath);
    }
    if (typeof window !== 'undefined') {
      return normalizeRoutePath(window.location.pathname);
    }
    return '/';
  });

  const [queryString, setQueryString] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.search || '';
    }
    return '';
  });

  const [selectedServiceId, setSelectedServiceId] = useState<ServiceItem['id']>('recurring');
  const [persistedLocationId, setPersistedLocationId] = useState<LocationId>(() =>
    resolveActiveLocationId(initialPath || (typeof window !== 'undefined' ? window.location.pathname : '/'), 'huntsville-al')
  );

  const resolved = useMemo(() => resolvePageByPath(currentPath), [currentPath]);
  const currentPage = resolved.page;

  const activeLocationId: LocationId = currentPage.locationId || persistedLocationId || 'huntsville-al';
  const activeLocation = LOCATIONS_BY_ID[activeLocationId] || LOCATIONS_BY_ID['huntsville-al'];

  // Keep persistedLocationId synced whenever user visits a location-scoped route
  useEffect(() => {
    if (currentPage.locationId && currentPage.locationId !== persistedLocationId) {
      setPersistedLocationId(currentPage.locationId);
    }
  }, [currentPage.locationId, persistedLocationId]);

  // Handle legacy route redirects in client-side navigation
  useEffect(() => {
    if (resolved.redirectTo && resolved.redirectTo !== currentPath) {
      setCurrentPath(resolved.redirectTo);
      if (typeof window !== 'undefined') {
        try {
          window.history.replaceState({ path: resolved.redirectTo }, '', resolved.redirectTo);
        } catch {
          // Ignore sandboxed history errors
        }
      }
    }
  }, [resolved.redirectTo, currentPath]);

  const queryService = useMemo(() => {
    if (!queryString) return undefined;
    const params = new URLSearchParams(queryString);
    return params.get('service') || undefined;
  }, [queryString]);

  const navigateTo = (targetHref: string) => {
    const [urlWithoutHash, hashPart] = targetHref.split('#');
    const [rawPath, rawSearch] = (urlWithoutHash || '/').split('?');
    const nextPath = normalizeRoutePath(rawPath || '/');
    const nextSearch = rawSearch ? `?${rawSearch}` : '';

    setCurrentPath(nextPath);
    setQueryString(nextSearch);

    if (typeof window !== 'undefined') {
      try {
        const nextUrl = `${nextPath}${nextSearch}${hashPart ? `#${hashPart}` : ''}`;
        window.history.pushState({ path: nextPath }, '', nextUrl);
      } catch {
        // Ignore history pushState restriction in sandboxed contexts
      }

      if (hashPart) {
        window.setTimeout(() => {
          const el = document.getElementById(hashPart);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    }
  };

  // Sync browser history back/forward + intercept internal route links for clean SPA + SSR experience
  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizeRoutePath(window.location.pathname));
      setQueryString(window.location.search || '');
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('tel:') ||
        href.startsWith('sms:') ||
        href.startsWith('mailto:') ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      if (href.startsWith('/')) {
        event.preventDefault();
        navigateTo(href);
      }
    };

    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onDocumentClick);
    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  // Update <head> metadata, canonical, robots, and Schema.org JSON-LD on route change + record ERP attribution
  useEffect(() => {
    recordOrganicLandingSession(currentPage.path, currentPage.pageType);
    if (typeof document === 'undefined') return;

    document.title = currentPage.title;

    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaTag('meta[name="description"]', 'name', 'description', currentPage.metaDescription);
    setMetaTag('meta[name="robots"]', 'name', 'robots', currentPage.robots);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', currentPage.title);
    setMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      currentPage.metaDescription
    );
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentPage.canonicalUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', currentPage.title);
    setMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      currentPage.metaDescription
    );

    let canonicalEl = document.head.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', currentPage.canonicalUrl);

    const schemaEl = document.getElementById('mojo-schema-ld') as HTMLScriptElement | null;
    if (schemaEl && currentPage.jsonLd[0]) {
      schemaEl.textContent = JSON.stringify(currentPage.jsonLd[0]);
    }
  }, [currentPage]);

  const renderMainView = () => {
    switch (currentPage.pageType) {
      case 'location_home':
        return (
          <HomePage
            location={activeLocation}
            selectedServiceId={queryService || selectedServiceId}
            onSelectServiceId={setSelectedServiceId}
            customH1={currentPage.h1}
          />
        );
      case 'location_about':
        return <AboutPage location={activeLocation} />;
      case 'location_services':
        return <ServicesIndexPage location={activeLocation} />;
      case 'location_service_detail': {
        const combo = SERVICE_LOCATIONS_DATA.find((c) => c.urlPath === currentPage.path);
        const service = currentPage.serviceId ? SERVICES_BY_ID[currentPage.serviceId] : undefined;
        if (combo && service) {
          return (
            <ServiceLocationPage
              combo={combo}
              service={service}
              location={activeLocation}
            />
          );
        }
        return <NotFoundPage activeLocationId={activeLocation.id} />;
      }
      case 'location_checklist':
        return <ChecklistPage location={activeLocation} />;
      case 'location_reviews':
        return <ReviewsPage location={activeLocation} />;
      case 'location_faqs':
        return <FaqsPage location={activeLocation} />;
      case 'location_contact':
        return <ContactPage location={activeLocation} />;
      case 'location_quote':
        return (
          <RequestQuotePage
            location={activeLocation}
            selectedServiceId={queryService || selectedServiceId}
          />
        );
      case 'locations_directory':
        return <LocationsIndexPage />;
      case 'legal':
        return (
          <LegalView
            view={currentPage.legalSlug === 'terms' ? 'terms' : 'privacy-policy'}
            activeLocationId={activeLocation.id}
          />
        );
      case 'not_found':
      default:
        return <NotFoundPage activeLocationId={activeLocation.id} />;
    }
  };

  return (
    <div className="site-shell">
      <SiteHeader currentPath={currentPage.path} activeLocationId={activeLocation.id} />

      <main id="main-content" className="site-main">
        {renderMainView()}
      </main>

      <SiteFooter activeLocationId={activeLocation.id} />

      <MojoScrollMascotCompanion location={activeLocation} />

      <MobileCallButton />
    </div>
  );
};

export default App;
