import { vi } from 'vitest';

// Mock react-i18next
export const mockUseTranslation = vi.fn(() => ({
  t: (key: string, options?: any) => {
    if (options?.count !== undefined) {
      return `${key}_${options.count > 1 ? 'plural' : 'singular'}`;
    }
    if (options && typeof options === 'object') {
      return `${key}_interpolated`;
    }
    return `mocked_${key}`;
  },
  i18n: {
    language: 'en',
    changeLanguage: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock('react-i18next', () => ({
  useTranslation: mockUseTranslation,
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));

// Mock other i18n dependencies
vi.mock('i18next-browser-languagedetector', () => ({
  default: {
    type: 'languageDetector',
    init: vi.fn(),
    detect: vi.fn(() => 'en'),
    cacheUserLanguage: vi.fn(),
  },
}));

vi.mock('i18next-http-backend', () => ({
  default: {
    type: 'backend',
    init: vi.fn(),
    read: vi.fn(),
  },
}));

vi.mock('i18next', () => ({
  default: {
    use: vi.fn().mockReturnThis(),
    init: vi.fn().mockResolvedValue(undefined),
    changeLanguage: vi.fn().mockResolvedValue(undefined),
    language: 'en',
  },
}));
