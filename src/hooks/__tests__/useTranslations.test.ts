import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import {
  useCommonTranslations,
  useNamespaceTranslations,
  usePluralization,
  useInterpolation,
} from '../useTranslations';
import '../../test/i18n-setup';

describe('useTranslations hooks', () => {
  describe('useCommonTranslations', () => {
    it('should return structured common translations', () => {
      const { result } = renderHook(() => useCommonTranslations());

      expect(result.current.navigation.home).toBe('mocked_navigation.home');
      expect(result.current.buttons.startJourney).toBe(
        'mocked_buttons.startJourney'
      );
      expect(result.current.labels.language).toBe('mocked_labels.language');
      expect(result.current.status.completed).toBe('mocked_status.completed');
      expect(result.current.footer.tagline).toBe('mocked_footer.tagline');
    });

    it('should have all required navigation keys', () => {
      const { result } = renderHook(() => useCommonTranslations());

      expect(result.current.navigation).toHaveProperty('home');
      expect(result.current.navigation).toHaveProperty('features');
      expect(result.current.navigation).toHaveProperty('pricing');
      expect(result.current.navigation).toHaveProperty('roadmap');
      expect(result.current.navigation).toHaveProperty('community');
      expect(result.current.navigation).toHaveProperty('contact');
    });

    it('should have all required button keys', () => {
      const { result } = renderHook(() => useCommonTranslations());

      expect(result.current.buttons).toHaveProperty('startJourney');
      expect(result.current.buttons).toHaveProperty('watchDemo');
      expect(result.current.buttons).toHaveProperty('learnMore');
      expect(result.current.buttons).toHaveProperty('getStarted');
      expect(result.current.buttons).toHaveProperty('tryFree');
    });
  });

  describe('useNamespaceTranslations', () => {
    it('should return translation function and key builder for namespace', () => {
      const { result } = renderHook(() => useNamespaceTranslations('homepage'));

      expect(typeof result.current.t).toBe('function');
      expect(typeof result.current.key).toBe('function');

      expect(result.current.t('hero.title')).toBe('mocked_hero.title');
      expect(result.current.key('hero.title')).toBe('homepage:hero.title');
    });
  });

  describe('usePluralization', () => {
    it('should handle pluralization', () => {
      const { result } = renderHook(() => usePluralization());

      expect(typeof result.current.plural).toBe('function');

      const singular = result.current.plural('item', 1);
      const plural = result.current.plural('item', 5);

      expect(singular).toBe('item_singular');
      expect(plural).toBe('item_plural');
    });
  });

  describe('useInterpolation', () => {
    it('should handle interpolation', () => {
      const { result } = renderHook(() => useInterpolation());

      expect(typeof result.current.interpolate).toBe('function');

      const interpolated = result.current.interpolate('welcome', {
        name: 'John',
      });
      expect(interpolated).toBe('welcome_interpolated');
    });
  });
});
