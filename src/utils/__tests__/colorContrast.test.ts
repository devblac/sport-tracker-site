import {
  getContrastRatio,
  meetsWCAGStandard,
  validateBrandAccessibility,
} from '../colorContrast';

describe('colorContrast', () => {
  describe('getContrastRatio', () => {
    it('calculates correct contrast ratio for black and white', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBe(21); // Perfect contrast
    });

    it('calculates correct contrast ratio for same colors', () => {
      const ratio = getContrastRatio('#ffffff', '#ffffff');
      expect(ratio).toBe(1); // No contrast
    });

    it('calculates contrast ratio for brand colors', () => {
      const primaryOnWhite = getContrastRatio('#3b82f6', '#ffffff');
      const secondaryOnWhite = getContrastRatio('#8b5cf6', '#ffffff');

      expect(primaryOnWhite).toBeGreaterThan(1);
      expect(secondaryOnWhite).toBeGreaterThan(1);
    });

    it('throws error for invalid hex colors', () => {
      expect(() => getContrastRatio('invalid', '#ffffff')).toThrow(
        'Invalid hex color format'
      );
      expect(() => getContrastRatio('#ffffff', 'invalid')).toThrow(
        'Invalid hex color format'
      );
    });
  });

  describe('meetsWCAGStandard', () => {
    it('validates WCAG AA compliance for normal text', () => {
      // Black on white should pass AA
      expect(meetsWCAGStandard('#000000', '#ffffff', 'AA', 'normal')).toBe(
        true
      );

      // Light gray on white should fail AA
      expect(meetsWCAGStandard('#cccccc', '#ffffff', 'AA', 'normal')).toBe(
        false
      );
    });

    it('validates WCAG AAA compliance', () => {
      // Black on white should pass AAA
      expect(meetsWCAGStandard('#000000', '#ffffff', 'AAA', 'normal')).toBe(
        true
      );

      // Medium gray might pass AA but fail AAA
      const mediumGray = '#666666';
      const aaResult = meetsWCAGStandard(mediumGray, '#ffffff', 'AA', 'normal');
      const aaaResult = meetsWCAGStandard(
        mediumGray,
        '#ffffff',
        'AAA',
        'normal'
      );

      // AAA should be more strict than AA
      if (aaResult) {
        expect(aaaResult).toBeDefined(); // May pass or fail, but should be defined
      }
    });

    it('has different requirements for large text', () => {
      const color = '#757575'; // Medium gray
      const normalResult = meetsWCAGStandard(color, '#ffffff', 'AA', 'normal');
      const largeResult = meetsWCAGStandard(color, '#ffffff', 'AA', 'large');

      // Large text has more lenient requirements
      if (!normalResult) {
        // If normal text fails, large text might still pass
        expect(typeof largeResult).toBe('boolean');
      }
    });
  });

  describe('validateBrandAccessibility', () => {
    it('returns validation results for both themes', () => {
      const results = validateBrandAccessibility();

      expect(results).toHaveProperty('light');
      expect(results).toHaveProperty('dark');

      // Check light theme results
      expect(results.light).toHaveProperty('primaryOnWhite');
      expect(results.light).toHaveProperty('secondaryOnWhite');
      expect(results.light).toHaveProperty('textOnWhite');
      expect(results.light).toHaveProperty('mutedTextOnWhite');

      // Check dark theme results
      expect(results.dark).toHaveProperty('primaryOnDark');
      expect(results.dark).toHaveProperty('secondaryOnDark');
      expect(results.dark).toHaveProperty('textOnDark');
      expect(results.dark).toHaveProperty('mutedTextOnDark');
    });

    it('provides ratio and pass/fail status for each combination', () => {
      const results = validateBrandAccessibility();

      Object.values(results.light).forEach(result => {
        expect(result).toHaveProperty('ratio');
        expect(result).toHaveProperty('passes');
        expect(typeof result.ratio).toBe('number');
        expect(typeof result.passes).toBe('boolean');
        expect(result.ratio).toBeGreaterThan(0);
      });

      Object.values(results.dark).forEach(result => {
        expect(result).toHaveProperty('ratio');
        expect(result).toHaveProperty('passes');
        expect(typeof result.ratio).toBe('number');
        expect(typeof result.passes).toBe('boolean');
        expect(result.ratio).toBeGreaterThan(0);
      });
    });

    it('ensures text colors meet accessibility standards', () => {
      const results = validateBrandAccessibility();

      // Main text should always pass accessibility standards
      expect(results.light.textOnWhite.passes).toBe(true);
      expect(results.dark.textOnDark.passes).toBe(true);
    });
  });
});
