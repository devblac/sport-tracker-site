import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../LanguageContext';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: vi.fn().mockResolvedValue(undefined),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));

// Mock i18next-browser-languagedetector
vi.mock('i18next-browser-languagedetector', () => ({
  default: {
    type: 'languageDetector',
    init: vi.fn(),
    detect: vi.fn(() => 'en'),
    cacheUserLanguage: vi.fn(),
  },
}));

// Mock i18next-http-backend
vi.mock('i18next-http-backend', () => ({
  default: {
    type: 'backend',
    init: vi.fn(),
    read: vi.fn(),
  },
}));

// Mock i18next
vi.mock('i18next', () => ({
  default: {
    use: vi.fn().mockReturnThis(),
    init: vi.fn().mockResolvedValue(undefined),
    changeLanguage: vi.fn().mockResolvedValue(undefined),
    language: 'en',
  },
}));

// Test component that uses the language context
const TestComponent = () => {
  const {
    currentLanguage,
    languageConfig,
    supportedLanguages,
    changeLanguage,
    isLoading,
    error,
  } = useLanguage();

  return (
    <div>
      <div data-testid="current-language">{currentLanguage}</div>
      <div data-testid="language-name">{languageConfig.name}</div>
      <div data-testid="supported-count">{supportedLanguages.length}</div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <div data-testid="error">{error || 'no-error'}</div>
      <button
        data-testid="change-language"
        onClick={() => changeLanguage('es')}
      >
        Change to Spanish
      </button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();

    // Reset document attributes
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  });

  it('should provide language context values', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    expect(screen.getByTestId('language-name')).toHaveTextContent('English');
    expect(screen.getByTestId('supported-count')).toHaveTextContent('2');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('no-error');
  });

  it('should update document language attribute', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('should handle language change', async () => {
    const { useTranslation } = await import('react-i18next');
    const mockChangeLanguage = vi.fn().mockResolvedValue(undefined);

    vi.mocked(useTranslation).mockReturnValue({
      i18n: {
        language: 'en',
        changeLanguage: mockChangeLanguage,
      },
    } as any);

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const changeButton = screen.getByTestId('change-language');

    await act(async () => {
      changeButton.click();
    });

    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
  });

  it('should handle unsupported language change', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const { changeLanguage } = useLanguage();

    await act(async () => {
      await changeLanguage('fr');
    });

    // Should show error for unsupported language
    await waitFor(() => {
      expect(screen.getByTestId('error')).not.toHaveTextContent('no-error');
    });
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within a LanguageProvider');

    consoleSpy.mockRestore();
  });
});
