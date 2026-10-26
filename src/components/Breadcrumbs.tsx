import React from 'react';
import type { BreadcrumbItem } from '../data/entities';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark';
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, variant = 'light' }) => {
  if (!items || items.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`breadcrumb-nav ${variant === 'dark' ? 'breadcrumb-dark' : 'breadcrumb-light'}`}
    >
      <ol className="breadcrumb-list">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.href} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <a href={item.href} className="breadcrumb-link">
                    {item.label}
                  </a>
                  <span className="breadcrumb-sep" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
