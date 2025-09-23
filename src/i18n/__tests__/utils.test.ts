import { describe, it, expect } from 'vitest';
import {
  getLanguageConfig,
  isLanguageSupported,
  getLanguageFromPath,
  removeLanguageFromPath,
  addLanguageToPath,
  getLocalizedPath,
  formatDate,
  formatNumber,
  formatCurrency,
  getTranslationKey,
  createKeyBuilder,
} from '../utils';

describe('i18n utils', () => {
  describe('getLanguageConfig', () => {
    it('should return correct config for supported language', () => {
      const config = getLanguageConfig('es');
      expect(config.code).toBe('es');
      expect(config.name).toBe('Español');
      expect(config.flag).toBe('🇲🇽');
    });

    it('should return default config for unsupported language', () => {
      const config = getLanguageConfig('fr');
      expect(config.code).toBe('en');
      expect(config.name).toBe('English');
    });
  });

  describe('isLanguageSupported', () => {
    it('should return true for supported languages', () => {
      expect(isLanguageSupported('en')).toBe(true);
      expect(isLanguageSupported('es')).toBe(true);
    });

    it('should return false for unsupported languages', () => {
      expect(isLanguageSupported('fr')).toBe(false);
      expect(isLanguageSupported('de')).toBe(false);
    });
  });

  describe('getLanguageFromPath', () => {
    it('should extract language from path', () => {
      expect(getLanguageFromPath('/es/features')).toBe('es');
      expect(getLanguageFromPath('/es/')).toBe('es');
      expect(getLanguageFromPath('/es')).toBe('es');
    });

    it('should return default language for paths without language prefix', () => {
      expect(getLanguageFromPath('/features')).toBe('en');
      expect(getLanguageFromPath('/')).toBe('en');
      expect(getLanguageFromPath('')).toBe('en');
    });

    it('should return default language for unsupported language in path', () => {
      expect(getLanguageFromPath('/fr/features')).toBe('en');
    });
  });

  describe('removeLanguageFromPath', () => {
    it('should remove language prefix from path', () => {
      expect(removeLanguageFromPath('/es/features')).toBe('/features');
      expect(removeLanguageFromPath('/es/pricing/pro')).toBe('/pricing/pro');
      expect(removeLanguageFromPath('/es/')).toBe('/');
      expect(removeLanguageFromPath('/es')).toBe('/');
    });

    it('should return original path if no language prefix', () => {
      expect(removeLanguageFromPath('/features')).toBe('/features');
      expect(removeLanguageFromPath('/')).toBe('/');
    });
  });

  describe('addLanguageToPath', () => {
    it('should add language prefix to path', () => {
      expect(addLanguageToPath('/features', 'es')).toBe('/es/features');
      expect(addLanguageToPath('/pricing/pro', 'es')).toBe('/es/pricing/pro');
      expect(addLanguageToPath('/', 'es')).toBe('/es/');
    });

    it('should not add prefix for default language', () => {
      expect(addLanguageToPath('/features', 'en')).toBe('/features');
      expect(addLanguageToPath('/pricing', 'en')).toBe('/pricing');
    });
  });

  describe('getLocalizedPath', () => {
    it('should convert path to target language', () => {
      expect(getLocalizedPath('/es/features', 'en')).toBe('/features');
      expect(getLocalizedPath('/features', 'es')).toBe('/es/features');
      expect(getLocalizedPath('/es/pricing', 'es')).toBe('/es/pricing');
    });
  });

  describe('formatDate', () => {
    it('should format date according to language config', () => {
      const date = new Date('2024-01-15');
      const enFormat = formatDate(date, 'en');
      const esFormat = formatDate(date, 'es');

      expect(enFormat).toBeTruthy();
      expect(esFormat).toBeTruthy();
      // Note: Exact format depends on browser/system locale implementation
    });
  });

  describe('formatNumber', () => {
    it('should format number according to language config', () => {
      const number = 1234.56;
      const enFormat = formatNumber(number, 'en');
      const esFormat = formatNumber(number, 'es');

      expect(enFormat).toBeTruthy();
      expect(esFormat).toBeTruthy();
    });
  });

  describe('formatCurrency', () => {
    it('should format currency according to language config', () => {
      const amount = 9.99;
      const enFormat = formatCurrency(amount, 'USD', 'en');
      const esFormat = formatCurrency(amount, 'USD', 'es');

      expect(enFormat).toContain('9.99');
      expect(esFormat).toBeTruthy();
    });
  });

  describe('getTranslationKey', () => {
    it('should create namespaced translation key', () => {
      expect(getTranslationKey('common', 'buttons.save')).toBe(
        'common:buttons.save'
      );
      expect(getTranslationKey('homepage', 'hero.title')).toBe(
        'homepage:hero.title'
      );
    });
  });

  describe('createKeyBuilder', () => {
    it('should create key builder function for namespace', () => {
      const buildKey = createKeyBuilder('common');
      expect(buildKey('buttons.save')).toBe('common:buttons.save');
      expect(buildKey('navigation.home')).toBe('common:navigation.home');
    });
  });
});
