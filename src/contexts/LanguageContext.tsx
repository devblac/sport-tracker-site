import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, defaultLanguage } from '../i18n/config';
import { getLanguageFromPath, isLanguageSupported } from '../i18n/utils';
import { LanguageRouter } from '../utils/routing';
import type { LanguageConfig } from '../i18n/config';

interface LanguageContextType {
  currentLanguage: string;
  languageConfig: LanguageConfig;
  supportedLanguages: LanguageConfig[];
  changeLanguage: (language: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get current language configuration
  const currentLanguage = i18n.language || defaultLanguage;
  const languageConfig =
    supportedLanguages.find(lang => lang.code === currentLanguage) ||
    supportedLanguages.find(lang => lang.code === defaultLanguage)!;

  // Initialize language router and sync with i18n
  useEffect(() => {
    const router = LanguageRouter.getInstance();
    router.init();

    const pathLanguage = getLanguageFromPath(window.location.pathname);

    if (pathLanguage !== currentLanguage && isLanguageSupported(pathLanguage)) {
      i18n.changeLanguage(pathLanguage);
    }

    // Listen for route changes
    const handleRouteChange = (event: CustomEvent) => {
      const { language } = event.detail;
      if (language !== currentLanguage && isLanguageSupported(language)) {
        i18n.changeLanguage(language);
      }
    };

    window.addEventListener(
      'languageRouteChange',
      handleRouteChange as EventListener
    );

    return () => {
      window.removeEventListener(
        'languageRouteChange',
        handleRouteChange as EventListener
      );
    };
  }, [currentLanguage, i18n]);

  // Update document language and direction
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = languageConfig.rtl ? 'rtl' : 'ltr';
  }, [currentLanguage, languageConfig.rtl]);

  // Change language function
  const changeLanguage = async (language: string): Promise<void> => {
    if (!isLanguageSupported(language)) {
      setError(`Language "${language}" is not supported`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await i18n.changeLanguage(language);

      // Store language preference
      localStorage.setItem('i18nextLng', language);

      // Update URL with language routing
      const router = LanguageRouter.getInstance();
      router.changeLanguage(language);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to change language'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    languageConfig,
    supportedLanguages,
    changeLanguage,
    isLoading,
    error,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
