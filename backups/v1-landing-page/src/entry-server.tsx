import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { ActivePageView } from './config/routes';

export function renderPage(view: ActivePageView = 'home'): string {
  return renderToString(
    <React.StrictMode>
      <App initialView={view} />
    </React.StrictMode>
  );
}
