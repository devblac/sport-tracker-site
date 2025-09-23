import { supportedLanguages, defaultLanguage } from './config';
import type { LanguageConfig } from './config';

/**
 * Get language configuration by language code
 */
export const getLanguageConfig = (code: string): LanguageConfig => {
  return (
    supportedLanguages.find(lang => lang.code === code) ||
    supportedLanguages.find(lang => lang.code === defaultLanguage)!
  );
};

/**
 * Check if a language code is supported
 */
export const isLanguageSupported = (code: string): boolean => {
  return supportedLanguages.some(lang => lang.code === code);
};

/**
 * Extract language code from pathname
 */
export const getLanguageFromPath = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  const potentialLang = segments[0];

  if (potentialLang && isLanguageSupported(potentialLang)) {
    return potentialLang;
  }

  return defaultLanguage;
};

/**
 * Remove language prefix from pathname
 */
export const removeLanguageFromPath = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  const potentialLang = segments[0];

  if (potentialLang && isLanguageSupported(potentialLang)) {
    return '/' + segments.slice(1).join('/');
  }

  return pathname;
};

/**
 * Add language prefix to pathname
 */
export const addLanguageToPath = (
  pathname: string,
  language: string
): string => {
  if (language === defaultLanguage) {
    return pathname;
  }

  const cleanPath = removeLanguageFromPath(pathname);
  return `/${language}${cleanPath}`;
};

/**
 * Get localized pathname for a given language
 */
export const getLocalizedPath = (
  pathname: string,
  targetLanguage: string
): string => {
  const cleanPath = removeLanguageFromPath(pathname);
  return addLanguageToPath(cleanPath, targetLanguage);
};

/**
 * Format date according to language configuration
 */
export const formatDate = (date: Date, language: string): string => {
  const config = getLanguageConfig(language);
  return new Intl.DateTimeFormat(config.numberFormat).format(date);
};

/**
 * Format number according to language configuration
 */
export const formatNumber = (number: number, language: string): string => {
  const config = getLanguageConfig(language);
  return new Intl.NumberFormat(config.numberFormat).format(number);
};

/**
 * Format currency according to language configuration
 */
export const formatCurrency = (
  amount: number,
  currency: string,
  language: string
): string => {
  const config = getLanguageConfig(language);
  return new Intl.NumberFormat(config.numberFormat, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Get translation key with namespace
 */
export const getTranslationKey = (namespace: string, key: string): string => {
  return `${namespace}:${key}`;
};

/**
 * Create translation key builder for a namespace
 */
export const createKeyBuilder = (namespace: string) => {
  return (key: string) => getTranslationKey(namespace, key);
};
