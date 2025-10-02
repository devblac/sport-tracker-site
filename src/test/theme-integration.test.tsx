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
    document.documentElement.className = '';
  });

  it('toggles between light and dark themes', async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue('light');

    render(<ThemeIntegrationTest />);
    expect(document.documentElement).toHaveClass('light');

    const themeToggle = screen.getByRole('button', {
      name: /switch to dark theme/i,
    });
    await user.click(themeToggle);

    expect(document.documentElement).toHaveClass('dark');
  });

  it('renders theme-aware components', () => {
    render(<ThemeIntegrationTest />);

    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByTestId('primary-btn')).toBeInTheDocument();
    expect(screen.getByTestId('ghost-btn')).toBeInTheDocument();
  });
});
