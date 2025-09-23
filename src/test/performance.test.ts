import { describe, it, expect, vi } from 'vitest';
import { debounce, throttle, preloadImage } from '../utils/performance';

describe('Performance Utils', () => {
  describe('Debounce', () => {
    it('should debounce function calls', async () => {
      const mockFn = vi.fn();
      const debouncedFn = debounce(mockFn, 100);

      // Call multiple times quickly
      debouncedFn();
      debouncedFn();
      debouncedFn();

      // Should not have been called yet
      expect(mockFn).not.toHaveBeenCalled();

      // Wait for debounce delay
      await new Promise(resolve => setTimeout(resolve, 150));

      // Should have been called once
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Throttle', () => {
    it('should throttle function calls', async () => {
      const mockFn = vi.fn();
      const throttledFn = throttle(mockFn, 100);

      // Call multiple times quickly
      throttledFn();
      throttledFn();
      throttledFn();

      // Should have been called once immediately
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Wait for throttle period
      await new Promise(resolve => setTimeout(resolve, 150));

      // Call again
      throttledFn();

      // Should have been called again
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('Image Preloading', () => {
    it('should preload images successfully', async () => {
      // Mock Image constructor
      const mockImage = {
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
        src: '',
      };

      global.Image = vi.fn(() => mockImage) as any;

      const preloadPromise = preloadImage('test-image.jpg');

      // Simulate successful load
      if (mockImage.onload) {
        mockImage.onload();
      }

      await expect(preloadPromise).resolves.toBeUndefined();
      expect(mockImage.src).toBe('test-image.jpg');
    });

    it('should handle image preload errors', async () => {
      const mockImage = {
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
        src: '',
      };

      global.Image = vi.fn(() => mockImage) as any;

      const preloadPromise = preloadImage('invalid-image.jpg');

      // Simulate error
      if (mockImage.onerror) {
        mockImage.onerror();
      }

      await expect(preloadPromise).rejects.toBeUndefined();
    });
  });
});
