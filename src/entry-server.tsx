import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import {
  LEGACY_REDIRECTS,
  NOT_FOUND_PAGE,
  PUBLISHED_PAGES,
  resolvePageByPath,
} from './data/page-registry';

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

export { PUBLISHED_PAGES, NOT_FOUND_PAGE, LEGACY_REDIRECTS };
