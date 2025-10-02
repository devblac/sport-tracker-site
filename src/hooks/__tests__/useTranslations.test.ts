import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCommonTranslations } from '../useTranslations';

describe('useTranslations hooks', () => {
  describe('useCommonTranslations', () => {
    it('returns translations', () => {
      const { result } = renderHook(() => useCommonTranslations());
      expect(result.current).toBeDefined();
    });
  });
});
