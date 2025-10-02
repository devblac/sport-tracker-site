import { render, screen, fireEvent } from '../../../test/test-utils';
import { describe, it, expect } from 'vitest';
import { LanguageSwitcher } from '../LanguageSwitcher';

describe('LanguageSwitcher', () => {
  describe('dropdown variant', () => {
    it('renders with default dropdown variant', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button', { name: /language/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('displays current language flag and name', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button', { name: /language/i });
      expect(button).toHaveTextContent(/🇺🇸/);
      expect(button).toHaveTextContent(/English/);
    });

    it('opens dropdown when clicked', async () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button', { name: /language/i });
      fireEvent.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('displays all supported languages in dropdown', async () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button', { name: /language/i });
      fireEvent.click(button);

      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('Español')).toBeInTheDocument();
    });
  });

  describe('button variant', () => {
    it('renders with button variant', () => {
      render(<LanguageSwitcher variant="button" />);

      const button = screen.getByRole('button', { name: /language/i });
      expect(button).toBeInTheDocument();
      expect(button).not.toHaveAttribute('aria-expanded');
      expect(button).not.toHaveAttribute('aria-haspopup');
    });

    it('displays current language flag', () => {
      render(<LanguageSwitcher variant="button" />);

      const button = screen.getByRole('button', { name: /language/i });
      expect(button).toHaveTextContent(/🇺🇸/);
    });
  });

  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button', { name: /language/i });
      expect(button).toHaveAttribute('aria-label');
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('aria-haspopup');
    });

    it('indicates current language selection', () => {
      render(<LanguageSwitcher />);

      const button = screen.getByRole('button', { name: /language/i });
      fireEvent.click(button);

      const englishOption = screen.getByText('English');
      expect(englishOption.closest('[role="option"]')).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });
  });
});
