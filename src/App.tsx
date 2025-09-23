import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { PageLayout } from './components/layout/PageLayout';
import { AccessibilityAudit } from './components/AccessibilityAudit';
import { initializePerformanceMonitoring } from './utils/performance';
import { initializeAccessibility } from './utils/accessibility';
import muiTheme from './theme/muiTheme';
import './i18n/config';

// Lazy load pages for better performance
const HomePage = React.lazy(() =>
  import('./pages/HomePage').then(module => ({ default: module.HomePage }))
);
const FeaturesPage = React.lazy(() =>
  import('./pages/FeaturesPage').then(module => ({
    default: module.FeaturesPage,
  }))
);
const PricingPage = React.lazy(() =>
  import('./pages/PricingPage').then(module => ({
    default: module.PricingPage,
  }))
);
const RoadmapPage = React.lazy(() => import('./pages/RoadmapPage'));
const CommunityPage = React.lazy(() => import('./pages/CommunityPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// Loading component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    initializePerformanceMonitoring();

    // Initialize accessibility features
    initializeAccessibility({
      announcePageChanges: true,
      manageFocus: true,
      enableKeyboardNavigation: true,
    });
  }, []);

  return (
    <HelmetProvider>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ThemeProvider>
          <LanguageProvider>
            <Router>
              <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                <PageLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/features" element={<FeaturesPage />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/roadmap" element={<RoadmapPage />} />
                      <Route path="/community" element={<CommunityPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                  </Suspense>
                </PageLayout>
                {process.env.NODE_ENV === 'development' && (
                  <AccessibilityAudit enabled={true} />
                )}
              </div>
            </Router>
          </LanguageProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </HelmetProvider>
  );
}

export default App;
