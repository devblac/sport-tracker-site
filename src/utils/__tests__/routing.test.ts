import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  LanguageRouter,
  useLanguageRouter,
  initializeLanguageRouter,
} from '../routing';

// Mock window.location and history
const mockLocation = {
  pathname: '/',
  search: '',
  hash: '',
  href: 'http://localhost/',
};

const mockHistory = {
  pushState: vi.fn(),
  replaceState: vi.fn(),
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

Object.defineProperty(window, 'history', {
  value: mockHistory,
  writable: true,
});

// Mock addEventListener and removeEventListener
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();
const mockDispatchEvent = vi.fn();

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  writable: true,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true,
});

Object.defineProperty(window, 'dispatchEvent', {
  value: mockDispatchEvent,
  writable: true,
});

describe('LanguageRouter', () => {
  let router: LanguageRouter;

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.pathname = '/';

    // Reset singleton instance
    (LanguageRouter as any).instance = undefined;
    router = LanguageRouter.getInstance();
  });

  describe('getInstance', () => {
    it('returns singleton instance', () => {
      const router1 = LanguageRouter.getInstance();
      const router2 = LanguageRouter.getInstance();

      expect(router1).toBe(router2);
    });
  });

  describe('getCurrentLanguage', () => {
    it('returns default language for root path', () => {
      mockLocation.pathname = '/';
      router.updateFromCurrentLocation();

      expect(router.getCurrentLanguage()).toBe('en');
    });

    it('returns language from path', () => {
      mockLocation.pathname = '/es/features';
      router.updateFromCurrentLocation();

      expect(router.getCurrentLanguage()).toBe('es');
    });

    it('returns default language for unsupported language', () => {
      mockLocation.pathname = '/fr/features';
      router.updateFromCurrentLocation();

      expect(router.getCurrentLanguage()).toBe('en');
    });
  });

  describe('getCurrentPath', () => {
    it('returns clean path without language prefix', () => {
      mockLocation.pathname = '/es/features/pricing';
      router.updateFromCurrentLocation();

      expect(router.getCurrentPath()).toBe('/features/pricing');
    });

    it('returns original path when no language prefix', () => {
      mockLocation.pathname = '/features/pricing';
      router.updateFromCurrentLocation();

      expect(router.getCurrentPath()).toBe('/features/pricing');
    });
  });

  describe('navigate', () => {
    it('navigates to path with current language', () => {
      router.navigate('/features');

      expect(mockHistory.pushState).toHaveBeenCalledWith({}, '', '/features');
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'languageRouteChange',
          detail: { path: '/features', language: 'en' },
        })
      );
    });

    it('navigates to path with specified language', () => {
      router.navigate('/features', 'es');

      expect(mockHistory.pushState).toHaveBeenCalledWith(
        {},
        '',
        '/es/features'
      );
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'languageRouteChange',
          detail: { path: '/es/features', language: 'es' },
        })
      );
    });
  });

  describe('changeLanguage', () => {
    it('changes language while staying on same page', () => {
      mockLocation.pathname = '/features';
      router.updateFromCurrentLocation();

      router.changeLanguage('es');

      expect(mockHistory.pushState).toHaveBeenCalledWith(
        {},
        '',
        '/es/features'
      );
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'languageRouteChange',
          detail: { path: '/es/features', language: 'es' },
        })
      );
    });

    it('handles language change from localized path', () => {
      mockLocation.pathname = '/es/pricing';
      router.updateFromCurrentLocation();

      router.changeLanguage('en');

      expect(mockHistory.pushState).toHaveBeenCalledWith({}, '', '/pricing');
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'languageRouteChange',
          detail: { path: '/pricing', language: 'en' },
        })
      );
    });

    it('warns for unsupported language', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      router.changeLanguage('fr');

      expect(consoleSpy).toHaveBeenCalledWith('Language "fr" is not supported');
      expect(mockHistory.pushState).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('getLocalizedUrl', () => {
    it('returns localized URL for non-default language', () => {
      const url = router.getLocalizedUrl('/features', 'es');
      expect(url).toBe('/es/features');
    });

    it('returns clean URL for default language', () => {
      const url = router.getLocalizedUrl('/features', 'en');
      expect(url).toBe('/features');
    });
  });

  describe('init', () => {
    it('sets up event listeners', () => {
      router.init();

      expect(mockAddEventListener).toHaveBeenCalledWith(
        'popstate',
        expect.any(Function)
      );
    });
  });

  describe('handlePopState', () => {
    it('updates from current location and dispatches event', () => {
      mockLocation.pathname = '/es/about';

      router.handlePopState();

      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'languageRouteChange',
          detail: { path: '/es/about', language: 'es' },
        })
      );
    });
  });

  describe('getAlternateLanguageUrls', () => {
    it('returns alternate URLs for all supported languages', () => {
      mockLocation.pathname = '/features';
      router.updateFromCurrentLocation();

      const alternates = router.getAlternateLanguageUrls();

      expect(alternates).toHaveProperty('en', '/features');
      expect(alternates).toHaveProperty('es', '/es/features');
    });

    it('returns alternate URLs from localized path', () => {
      mockLocation.pathname = '/es/pricing';
      router.updateFromCurrentLocation();

      const alternates = router.getAlternateLanguageUrls();

      expect(alternates).toHaveProperty('en', '/pricing');
      expect(alternates).toHaveProperty('es', '/es/pricing');
    });
  });
});

describe('useLanguageRouter', () => {
  it('returns router methods and current state', () => {
    const routerHook = useLanguageRouter();

    expect(routerHook).toHaveProperty('currentLanguage');
    expect(routerHook).toHaveProperty('currentPath');
    expect(routerHook).toHaveProperty('navigate');
    expect(routerHook).toHaveProperty('changeLanguage');
    expect(routerHook).toHaveProperty('getLocalizedUrl');
    expect(routerHook).toHaveProperty('getAlternateLanguageUrls');

    expect(typeof routerHook.navigate).toBe('function');
    expect(typeof routerHook.changeLanguage).toBe('function');
    expect(typeof routerHook.getLocalizedUrl).toBe('function');
    expect(typeof routerHook.getAlternateLanguageUrls).toBe('function');
  });
});

describe('initializeLanguageRouter', () => {
  it('initializes and returns router instance', () => {
    const router = initializeLanguageRouter();

    expect(router).toBeInstanceOf(LanguageRouter);
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'popstate',
      expect.any(Function)
    );
  });
});
