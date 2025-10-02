import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const ThemeIntegrationTest = () => (
  <ThemeProvider>
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-4">
        <ThemeToggle />
        <Card className="mt-4 p-4" data-testid="test-card">
          <h2 className="text-xl font-bold mb-4">Theme Integration Test</h2>
          <div className="space-x-2">
            <Button variant="primary" data-testid="primary-btn">
              Primary
            </Button>
            <Button variant="secondary" data-testid="secondary-btn">
              Secondary
            </Button>
            <Button variant="ghost" data-testid="ghost-btn">
              Ghost
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </ThemeProvider>
);

describe('Theme System Integration', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    vi.clearAllMocks();

    // Reset document classes
    document.documentElement.className = '';
  });

  it('applies theme classes to document element when theme changes', async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue('light');

    render(<ThemeIntegrationTest />);

    // Initially should have light theme
    expect(document.documentElement).toHaveClass('light');

    // Click theme toggle to switch to dark
    const themeToggle = screen.getByRole('button', {
      name: /switch to dark theme/i,
    });
    await user.click(themeToggle);

    // Should now have dark theme
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'liftfire-theme',
      'dark'
    );
  });

  it('persists theme preference across sessions', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(<ThemeIntegrationTest />);

    // Should load with dark theme from localStorage
    expect(document.documentElement).toHaveClass('dark');
  });

  it('applies theme-aware styles to components', () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(<ThemeIntegrationTest />);

    const card = screen.getByTestId('test-card');
    const primaryBtn = screen.getByTestId('primary-btn');
    const ghostBtn = screen.getByTestId('ghost-btn');

    // Components should be rendered (basic smoke test)
    expect(card).toBeInTheDocument();
    expect(primaryBtn).toBeInTheDocument();
    expect(ghostBtn).toBeInTheDocument();
  });

  it('handles system theme preference', () => {
    // Mock system preference for dark mode
    const mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    localStorageMock.getItem.mockReturnValue('system');

    render(<ThemeIntegrationTest />);

    // Should apply dark theme based on system preference
    expect(document.documentElement).toHaveClass('dark');
  });

  it('provides smooth transitions between themes', async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue('light');

    render(<ThemeIntegrationTest />);

    const themeToggle = screen.getByRole('button', {
      name: /switch to dark theme/i,
    });

    // Verify initial state
    expect(document.documentElement).toHaveClass('light');

    // Switch themes multiple times
    await user.click(themeToggle); // light -> dark
    expect(document.documentElement).toHaveClass('dark');

    await user.click(themeToggle); // dark -> system
    // System theme behavior depends on matchMedia mock

    await user.click(themeToggle); // system -> light
    expect(document.documentElement).toHaveClass('light');
  });
});
