import {
  getLanguageFromPath,
  removeLanguageFromPath,
  addLanguageToPath,
  isLanguageSupported,
} from '../i18n/utils';
import { defaultLanguage } from '../i18n/config';

/**
 * Router utility for handling language-based routing
 */
export class LanguageRouter {
  private static instance: LanguageRouter;
  private currentPath: string = '/';
  private currentLanguage: string = defaultLanguage;

  private constructor() {
    this.updateFromCurrentLocation();
  }

  static getInstance(): LanguageRouter {
    if (!LanguageRouter.instance) {
      LanguageRouter.instance = new LanguageRouter();
    }
    return LanguageRouter.instance;
  }

  /**
   * Update internal state from current browser location
   */
  updateFromCurrentLocation(): void {
    this.currentPath = window.location.pathname;
    this.currentLanguage = getLanguageFromPath(this.currentPath);
  }

  /**
   * Get the current language from the URL
   */
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * Get the current path without language prefix
   */
  getCurrentPath(): string {
    return removeLanguageFromPath(this.currentPath);
  }

  /**
   * Navigate to a path with the current language
   */
  navigate(path: string, language?: string): void {
    const targetLanguage = language || this.currentLanguage;
    const localizedPath = addLanguageToPath(path, targetLanguage);

    // Update browser history
    window.history.pushState({}, '', localizedPath);

    // Update internal state
    this.currentPath = localizedPath;
    this.currentLanguage = targetLanguage;

    // Dispatch custom event for components to listen to
    window.dispatchEvent(
      new CustomEvent('languageRouteChange', {
        detail: { path: localizedPath, language: targetLanguage },
      })
    );
  }

  /**
   * Change language while staying on the same page
   */
  changeLanguage(newLanguage: string): void {
    if (!isLanguageSupported(newLanguage)) {
      console.warn(`Language "${newLanguage}" is not supported`);
      return;
    }

    const currentCleanPath = removeLanguageFromPath(this.currentPath);
    const newLocalizedPath = addLanguageToPath(currentCleanPath, newLanguage);

    // Update browser history
    window.history.pushState({}, '', newLocalizedPath);

    // Update internal state
    this.currentPath = newLocalizedPath;
    this.currentLanguage = newLanguage;

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent('languageRouteChange', {
        detail: { path: newLocalizedPath, language: newLanguage },
      })
    );
  }

  /**
   * Get localized URL for a given path and language
   */
  getLocalizedUrl(path: string, language: string): string {
    return addLanguageToPath(path, language);
  }

  /**
   * Handle browser back/forward navigation
   */
  handlePopState(): void {
    this.updateFromCurrentLocation();

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent('languageRouteChange', {
        detail: { path: this.currentPath, language: this.currentLanguage },
      })
    );
  }

  /**
   * Initialize router with event listeners
   */
  init(): void {
    // Listen for browser back/forward navigation
    window.addEventListener('popstate', () => {
      this.handlePopState();
    });

    // Handle initial page load
    this.updateFromCurrentLocation();
  }

  /**
   * Get all available routes for the current page in different languages
   */
  getAlternateLanguageUrls(): Record<string, string> {
    const currentCleanPath = removeLanguageFromPath(this.currentPath);
    const alternates: Record<string, string> = {};

    // Add current language
    alternates[this.currentLanguage] = this.currentPath;

    // Add other supported languages
    import('../i18n/config').then(({ supportedLanguages }) => {
      supportedLanguages.forEach((lang: any) => {
        if (lang.code !== this.currentLanguage) {
          alternates[lang.code] = addLanguageToPath(
            currentCleanPath,
            lang.code
          );
        }
      });
    });

    // For now, manually add known supported languages
    const knownLanguages = ['en', 'es'];
    knownLanguages.forEach(langCode => {
      if (langCode !== this.currentLanguage) {
        alternates[langCode] = addLanguageToPath(currentCleanPath, langCode);
      }
    });

    return alternates;
  }
}

/**
 * Hook for using the language router in React components
 */
export const useLanguageRouter = () => {
  const router = LanguageRouter.getInstance();

  return {
    currentLanguage: router.getCurrentLanguage(),
    currentPath: router.getCurrentPath(),
    navigate: (path: string, language?: string) =>
      router.navigate(path, language),
    changeLanguage: (language: string) => router.changeLanguage(language),
    getLocalizedUrl: (path: string, language: string) =>
      router.getLocalizedUrl(path, language),
    getAlternateLanguageUrls: () => router.getAlternateLanguageUrls(),
  };
};

/**
 * Initialize the language router
 */
export const initializeLanguageRouter = (): LanguageRouter => {
  const router = LanguageRouter.getInstance();
  router.init();
  return router;
};
