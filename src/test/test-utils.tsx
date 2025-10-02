import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import {
  BrowserRouter,
  MemoryRouter,
  MemoryRouterProps,
} from 'react-router-dom';
// Mock react-helmet-async
vi.mock('react-helmet-async');
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Mock translations
const mockTranslations = {
  en: {
    common: {
      navigation: {
        home: 'Home',
        features: 'Features',
        pricing: 'Pricing',
        roadmap: 'Roadmap',
        community: 'Community',
        contact: 'Contact',
      },
      buttons: {
        startJourney: 'Start Your Journey',
        watchDemo: 'Watch Demo',
        learnMore: 'Learn More',
        getStarted: 'Get Started',
        tryFree: 'Try Free',
        upgrade: 'Upgrade',
        download: 'Download',
      },
      labels: {
        language: 'Language',
        theme: 'Theme',
      },
      seo: {
        defaultTitle: 'LiftFire - Transform Your Fitness Journey',
        defaultDescription:
          'Gamified gym tracker with offline functionality, social features, and AI insights. Track workouts, earn XP, and connect with the fitness community.',
        defaultKeywords:
          'gym tracker,fitness app,workout tracker,gamified fitness,offline gym app,PWA fitness,social fitness',
        homePage: {
          title: 'Transform Your Fitness Journey with LiftFire',
          description: 'The gamified gym tracker that works 100% offline.',
        },
      },
    },
  },
};

// Initialize i18next
i18next.use(initReactI18next).init({
  debug: false,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'homepage', 'features', 'pricing', 'roadmap'],
  defaultNS: 'common',
  resources: mockTranslations,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Mock theme context
export const mockThemeContext = {
  theme: 'light',
  setTheme: vi.fn(),
  toggleTheme: vi.fn(),
};

// Mock language context
export const mockLanguageContext = {
  currentLanguage: 'en',
  languageConfig: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    rtl: false,
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'en-US',
  },
  supportedLanguages: [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      rtl: false,
      dateFormat: 'MM/DD/YYYY',
      numberFormat: 'en-US',
    },
    {
      code: 'es',
      name: 'Español',
      flag: '🇲🇽',
      rtl: false,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'es-MX',
    },
  ],
  changeLanguage: vi.fn(),
  isLoading: false,
  error: null,
};

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
});

// Mock providers
const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
const MockLanguageProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

// Mock contexts
vi.mock('../contexts/ThemeContext', () => ({
  useTheme: () => mockThemeContext,
  ThemeProvider: MockThemeProvider,
}));

vi.mock('../contexts/LanguageContext', () => ({
  useLanguage: () => mockLanguageContext,
  LanguageProvider: MockLanguageProvider,
}));

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  routerProps?: Omit<MemoryRouterProps, 'children'>;
}

const AllTheProviders = ({
  children,
  route = '/',
  routerProps = {},
}: {
  children: React.ReactNode;
  route?: string;
  routerProps?: Omit<MemoryRouterProps, 'children'>;
}) => {
  const Router = route === '/' ? BrowserRouter : MemoryRouter;
  const routerProps2 =
    route === '/' ? {} : { initialEntries: [route], ...routerProps };

  return (
    <Router {...routerProps2}>
      <MockThemeProvider>
        <MockLanguageProvider>{children}</MockLanguageProvider>
      </MockThemeProvider>
    </Router>
  );
};

const customRender = (
  ui: React.ReactElement,
  { route, routerProps, ...options }: CustomRenderOptions = {}
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders route={route} routerProps={routerProps}>
        {children}
      </AllTheProviders>
    ),
    ...options,
  });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
