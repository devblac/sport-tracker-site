import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
  rtl: boolean;
  dateFormat: string;
  numberFormat: string;
}

export const supportedLanguages: LanguageConfig[] = [
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
];

export const defaultLanguage = 'en';
export const fallbackLanguage = 'en';

// Language detection configuration
const detectionOptions = {
  order: ['path', 'localStorage', 'navigator', 'htmlTag'],
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
  checkWhitelist: true,
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: fallbackLanguage,
    debug: import.meta.env.DEV,

    // Language detection
    detection: detectionOptions,

    // Supported languages
    supportedLngs: supportedLanguages.map(lang => lang.code),
    nonExplicitSupportedLngs: true,

    // Backend configuration for loading translations
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Default namespace
    defaultNS: 'common',
    ns: ['common', 'homepage', 'features', 'pricing', 'roadmap'],

    // React i18next options
    react: {
      useSuspense: false,
    },

    // Pluralization
    pluralSeparator: '_',
    contextSeparator: '_',

    // Fallback behavior
    fallbackNS: 'common',

    // Load behavior
    load: 'languageOnly', // Load only language code, not region
    preload: [defaultLanguage],

    // Key separator
    keySeparator: '.',
    nsSeparator: ':',
  });

export default i18n;
