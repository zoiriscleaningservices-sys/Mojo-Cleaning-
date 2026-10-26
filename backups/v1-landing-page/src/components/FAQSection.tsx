import React, { useState } from 'react';
import { BUSINESS_INFO, FAQ_ITEMS, type FAQItem } from '../config/business';
import { ArrowRightIcon, MojoSparkle, PhoneIcon } from './Icons';

const CATEGORIES: Array<'All' | FAQItem['category']> = [
  'All',
  'Services & Supplies',
  'Scheduling & Quotes',
  'Trust & Policies',
];

export const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | FAQItem['category']>('All');

  const filteredFaqs =
    selectedCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="faqs" className="faq-section" aria-labelledby="faq-heading">
      <div className="container">
        <div className="faq-layout">
          {/* Left Sticky Intro & Direct Help Column */}
          <div className="faq-intro-col">
            <div className="section-eyebrow">
              <MojoSparkle className="text-coral" size={14} />
              <span>Frequently Asked Questions</span>
            </div>

            <h2 id="faq-heading" className="section-title">
              Curious about the clean?
            </h2>

            <p className="faq-lead">
              Everything you need to know about our Huntsville service areas, 56-point room
              checklists, eco-friendly supply options, and our 48-hour happiness guarantee.
            </p>

            <div className="faq-category-pills" role="group" aria-label="Filter FAQ topics">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`faq-filter-pill ${selectedCategory === cat ? 'is-active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="faq-direct-card">
              <strong>Have a question about your specific property?</strong>
              <p>
                Our Huntsville office team is available {BUSINESS_INFO.officeHours.weekdays} to
                walk through custom checklists or scheduling.
              </p>
              <div className="faq-direct-actions">
                <a href={BUSINESS_INFO.phoneHref} className="btn btn-outline-dark btn-sm">
                  <PhoneIcon size={14} />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
                <a href="#quote" className="btn btn-primary btn-sm">
                  <span>Ask in Your Quote</span>
                  <ArrowRightIcon size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Accessible Native <details> Accordion List */}
          <div className="faq-accordion-col">
            {filteredFaqs.map((item, idx) => (
              <details
                key={item.id}
                className="faq-details-item"
                open={idx === 0}
              >
                <summary className="faq-summary">
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-toggle-indicator" aria-hidden="true">
                    <span className="faq-plus-horizontal" />
                    <span className="faq-plus-vertical" />
                  </span>
                </summary>
                <div className="faq-answer-body">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
