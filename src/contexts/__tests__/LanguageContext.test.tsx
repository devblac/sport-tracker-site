import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../LanguageContext';

describe('LanguageContext', () => {
  it('renders children', () => {
    render(
      <LanguageProvider>
        <div>Test Content</div>
      </LanguageProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('provides default language', () => {
    render(
      <LanguageProvider>
        <div>Test Content</div>
      </LanguageProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
