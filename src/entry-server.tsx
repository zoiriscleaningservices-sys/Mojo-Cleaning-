import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import {
  LEGACY_REDIRECTS,
  NOT_FOUND_PAGE,
  PUBLISHED_PAGES,
  resolvePageByPath,
} from './data/page-registry';
import { VERIFIED_BUSINESS_PROFILE } from './data/business-profile';
import {
  CTR_OPTIMIZATION_SYSTEM,
  KEYWORD_MAP,
  PAGE_BLUEPRINTS,
  VERIFIED_KEYWORD_DATABASE,
} from './data/keyword-map';
import {
  evaluateServiceLocationPublication,
  PUBLISHED_SERVICE_LOCATIONS,
  SERVICE_LOCATIONS_DATA,
} from './data/service-locations-data';
import {
  AI_SEARCH_VISIBILITY_BASELINE,
  BRAND_AUTHORITY_EXPERIENCE,
  COMPLIANT_REVIEW_SYSTEM,
  COMPETITOR_OPPORTUNITY_MATRIX,
  GBP_AUTHORITY_PROGRAM,
  HOW_TO_EVALUATE_CLEANING_COMPANY,
  LOCAL_PARTNERSHIP_RESOURCES,
  MEASUREMENT_AND_MONTHLY_REVIEW_CADENCE,
  NORTH_ALABAMA_COMPETITORS,
  SERVICE_ANSWER_FIRST_GUIDES,
} from './data/seo-domination-system';

export function renderPageByPath(routePath: string): {
  html: string;
  page: ReturnType<typeof resolvePageByPath>['page'];
} {
  const { page } = resolvePageByPath(routePath);
  const html = renderToString(
    <React.StrictMode>
      <App initialPath={routePath} />
    </React.StrictMode>
  );
  return { html, page };
}

export {
  PUBLISHED_PAGES,
  NOT_FOUND_PAGE,
  LEGACY_REDIRECTS,
  VERIFIED_BUSINESS_PROFILE,
  KEYWORD_MAP,
  PAGE_BLUEPRINTS,
  VERIFIED_KEYWORD_DATABASE,
  CTR_OPTIMIZATION_SYSTEM,
  SERVICE_LOCATIONS_DATA,
  PUBLISHED_SERVICE_LOCATIONS,
  evaluateServiceLocationPublication,
  BRAND_AUTHORITY_EXPERIENCE,
  NORTH_ALABAMA_COMPETITORS,
  COMPETITOR_OPPORTUNITY_MATRIX,
  GBP_AUTHORITY_PROGRAM,
  COMPLIANT_REVIEW_SYSTEM,
  SERVICE_ANSWER_FIRST_GUIDES,
  HOW_TO_EVALUATE_CLEANING_COMPANY,
  LOCAL_PARTNERSHIP_RESOURCES,
  AI_SEARCH_VISIBILITY_BASELINE,
  MEASUREMENT_AND_MONTHLY_REVIEW_CADENCE,
};
