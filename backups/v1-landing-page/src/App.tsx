import React, { useEffect, useState } from 'react';
import type { ServiceItem } from './config/business';
import type { ActivePageView } from './config/routes';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { GuaranteeSection } from './components/GuaranteeSection';
import { HeroSection } from './components/HeroSection';
import { IntroAnimation } from './components/IntroAnimation';
import { LegalView } from './components/LegalView';
import { MobileCallButton } from './components/MobileCallButton';
import { ProcessSteps } from './components/ProcessSteps';
import { QuoteForm } from './components/QuoteForm';
import { ReviewSection } from './components/ReviewSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { ServiceGrid } from './components/ServiceGrid';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';

interface AppProps {
  initialView?: ActivePageView;
}

export const App: React.FC<AppProps> = ({ initialView = 'home' }) => {
  const [activeView, setActiveView] = useState<ActivePageView>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('privacy-policy')) return 'privacy-policy';
      if (path.includes('terms-and-conditions')) return 'terms-and-conditions';
    }
    return initialView;
  });

  const [selectedServiceId, setSelectedServiceId] = useState<ServiceItem['id']>('recurring');

  const handleViewChange = (nextView: ActivePageView) => {
    setActiveView(nextView);
    if (typeof window !== 'undefined' && window.history?.pushState) {
      const targetUrl =
        nextView === 'home'
          ? '/'
          : nextView === 'privacy-policy'
            ? '/privacy-policy'
            : '/terms-and-conditions';
      try {
        window.history.pushState({ view: nextView }, '', targetUrl);
      } catch {
        // Ignore history pushState restriction in file:// or sandboxed contexts
      }
    }
  };

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('privacy-policy')) {
        setActiveView('privacy-policy');
      } else if (path.includes('terms-and-conditions')) {
        setActiveView('terms-and-conditions');
      } else {
        setActiveView('home');
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <div className="site-shell">
      <IntroAnimation />

      <SiteHeader activeView={activeView} onChangeView={handleViewChange} />

      <main id="main-content" className="site-main">
        {activeView === 'home' ? (
          <>
            <HeroSection />
            <ServiceGrid onSelectService={setSelectedServiceId} />
            <AboutSection />
            <ProcessSteps />
            <GuaranteeSection />
            <ReviewSection />
            <ServiceAreaSection />
            <FAQSection />
            <QuoteForm
              selectedServiceId={selectedServiceId}
              onSelectServiceId={setSelectedServiceId}
              onOpenLegalView={handleViewChange}
            />
          </>
        ) : (
          <LegalView
            view={activeView}
            onReturnHome={() => handleViewChange('home')}
            onSwitchView={handleViewChange}
          />
        )}
      </main>

      <SiteFooter
        onSelectService={setSelectedServiceId}
        onChangeView={handleViewChange}
      />

      <MobileCallButton />
    </div>
  );
};

export default App;
