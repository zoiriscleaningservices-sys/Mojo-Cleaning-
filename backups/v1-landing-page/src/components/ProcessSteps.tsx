import React from 'react';
import { PROCESS_STEPS, type ProcessStep } from '../config/business';
import {
  ArrowRightIcon,
  ClipboardStepIcon,
  HomeStepIcon,
  MojoSparkle,
} from './Icons';

const renderStepIcon = (iconName: ProcessStep['iconName']) => {
  switch (iconName) {
    case 'home':
      return <HomeStepIcon size={24} />;
    case 'clipboard':
      return <ClipboardStepIcon size={24} />;
    case 'sparkle':
    default:
      return <MojoSparkle size={22} />;
  }
};

export const ProcessSteps: React.FC = () => {
  return (
    <section id="how-it-works" className="process-section" aria-labelledby="process-heading">
      <div className="container">
        <div className="section-header-centered">
          <div className="section-eyebrow">
            <MojoSparkle className="text-coral" size={14} />
            <span>How It Works</span>
          </div>
          <h2 id="process-heading" className="section-title">
            Three steps to your exhale.
          </h2>
          <p className="section-subtitle">
            No complicated walk-throughs or pushy sales calls. Here is how we take you from a busy
            to-do list to a freshly cleaned home.
          </p>
        </div>

        <ol className="process-steps-grid">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.number} className="process-step-card">
              <div className="process-step-top">
                <span className="process-step-number" aria-hidden="true">
                  {step.number}
                </span>
                <span className="process-step-icon-box">{renderStepIcon(step.iconName)}</span>
              </div>

              {index < PROCESS_STEPS.length - 1 ? (
                <div className="process-step-connector" aria-hidden="true">
                  <ArrowRightIcon size={18} />
                </div>
              ) : null}

              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.description}</p>
              <p className="process-step-note">{step.detail}</p>
            </li>
          ))}
        </ol>

        <div className="process-bottom-cta">
          <p>
            Ready to start Step 01? Tell us about your home and we will prepare your customized
            quote.
          </p>
          <a href="#quote" className="btn btn-primary">
            <span>Start Your Quote Request</span>
            <ArrowRightIcon size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
