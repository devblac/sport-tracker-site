/**
 * Utility functions for checking color contrast ratios for accessibility compliance
 */

// Convert hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    throw new Error('Invalid hex color format');
  }

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

// Check if contrast ratio meets WCAG standards
export function meetsWCAGStandard(
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(color1, color2);

  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  } else {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  }
}

// Brand color contrast validation
export const brandColorContrasts = {
  light: {
    // Primary blue on white background
    primaryOnWhite: getContrastRatio('#3b82f6', '#ffffff'),
    // Secondary purple on white background
    secondaryOnWhite: getContrastRatio('#8b5cf6', '#ffffff'),
    // Text colors on white
    textOnWhite: getContrastRatio('#111827', '#ffffff'),
    mutedTextOnWhite: getContrastRatio('#6b7280', '#ffffff'),
  },
  dark: {
    // Primary blue on dark background
    primaryOnDark: getContrastRatio('#3b82f6', '#030712'),
    // Secondary purple on dark background
    secondaryOnDark: getContrastRatio('#8b5cf6', '#030712'),
    // Text colors on dark
    textOnDark: getContrastRatio('#f9fafb', '#030712'),
    mutedTextOnDark: getContrastRatio('#9ca3af', '#030712'),
  },
};

// Validate all brand color combinations
export function validateBrandAccessibility(): {
  light: Record<string, { ratio: number; passes: boolean }>;
  dark: Record<string, { ratio: number; passes: boolean }>;
} {
  const results = {
    light: {} as Record<string, { ratio: number; passes: boolean }>,
    dark: {} as Record<string, { ratio: number; passes: boolean }>,
  };

  // Test light theme combinations
  Object.entries(brandColorContrasts.light).forEach(([key, ratio]) => {
    results.light[key] = {
      ratio: Math.round(ratio * 100) / 100,
      passes: ratio >= 4.5, // WCAG AA standard for normal text
    };
  });

  // Test dark theme combinations
  Object.entries(brandColorContrasts.dark).forEach(([key, ratio]) => {
    results.dark[key] = {
      ratio: Math.round(ratio * 100) / 100,
      passes: ratio >= 4.5, // WCAG AA standard for normal text
    };
  });

  return results;
}
