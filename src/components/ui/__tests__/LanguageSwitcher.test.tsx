import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';
// LanguageProvider is mocked in vi.mock below
import '../../../test/i18n-setup';

// Mock the language context
const mockChangeLanguage = vi.fn();
const mockLanguageContext = {
  currentLanguage: 'en',
  languageConfig: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    rtl: false,
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'en-US',
  },
  supportedLanguages: [
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
  ],
  changeLanguage: mockChangeLanguage,
  isLoading: false,
  error: null,
};

vi.mock('../../../contexts/LanguageContext', () => ({
  useLanguage: () => mockLanguageContext,
  LanguageProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('dropdown variant', () => {
    it('renders with default dropdown variant', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('displays current language flag and name', () => {
      render(<LanguageSwitcher />);

      expect(screen.getByText('🇺🇸')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
    });

    it('opens dropdown when clicked', async () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('shows all supported languages in dropdown', async () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('English')).toBeInTheDocument();
        expect(screen.getByText('Español')).toBeInTheDocument();
        expect(screen.getByText('🇺🇸')).toBeInTheDocument();
        expect(screen.getByText('🇲🇽')).toBeInTheDocument();
      });
    });

    it('calls changeLanguage when selecting different language', async () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        const spanishOption = screen.getByRole('option', { name: /español/i });
        fireEvent.click(spanishOption);
      });

      expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    });

    it('shows current language as selected', async () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        const englishOption = screen.getByRole('option', { name: /english/i });
        expect(englishOption).toHaveAttribute('aria-selected', 'true');
        expect(englishOption).toHaveTextContent('✓');
      });
    });

    it('closes dropdown when clicking outside', async () => {
      render(
        <div>
          <LanguageSwitcher />
          <div data-testid="outside">Outside element</div>
        </div>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      fireEvent.mouseDown(screen.getByTestId('outside'));

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('hides label when showLabel is false', () => {
      render(<LanguageSwitcher showLabel={false} />);

      expect(screen.getByText('🇺🇸')).toBeInTheDocument();
      expect(screen.queryByText('English')).not.toBeInTheDocument();
    });
  });

  describe('button variant', () => {
    it('renders as button variant', () => {
      render(<LanguageSwitcher variant="button" />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveAttribute('aria-expanded');
      expect(button).not.toHaveAttribute('aria-haspopup');
    });

    it('cycles through languages when clicked', async () => {
      render(<LanguageSwitcher variant="button" />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockChangeLanguage).toHaveBeenCalledWith('es');
    });

    it('displays current language flag', () => {
      render(<LanguageSwitcher variant="button" />);

      expect(screen.getByText('🇺🇸')).toBeInTheDocument();
    });

    it('shows language name when showLabel is true', () => {
      render(<LanguageSwitcher variant="button" showLabel={true} />);

      expect(screen.getByText('English')).toBeInTheDocument();
    });

    it('hides language name when showLabel is false', () => {
      render(<LanguageSwitcher variant="button" showLabel={false} />);

      expect(screen.queryByText('English')).not.toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('disables button when loading', () => {
      const loadingContext = { ...mockLanguageContext, isLoading: true };
      vi.mocked(
        require('../../../contexts/LanguageContext').useLanguage
      ).mockReturnValue(loadingContext);

      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label');
      expect(button.getAttribute('aria-label')).toContain('English');
    });

    it('has proper ARIA attributes for dropdown', async () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      await waitFor(() => {
        const listbox = screen.getByRole('listbox');
        expect(listbox).toHaveAttribute('aria-label');

        const options = screen.getAllByRole('option');
        options.forEach(option => {
          expect(option).toHaveAttribute('aria-selected');
        });
      });
    });
  });

  describe('custom styling', () => {
    it('applies custom className', () => {
      render(<LanguageSwitcher className="custom-class" />);

      const container = screen.getByRole('button').closest('div');
      expect(container).toHaveClass('custom-class');
    });
  });
});
