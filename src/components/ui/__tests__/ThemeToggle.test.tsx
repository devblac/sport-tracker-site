import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';

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
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const ThemeToggleWrapper = ({
  defaultTheme = 'light',
}: {
  defaultTheme?: 'light' | 'dark' | 'system';
}) => (
  <ThemeProvider defaultTheme={defaultTheme}>
    <ThemeToggle />
  </ThemeProvider>
);

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    vi.clearAllMocks();
  });

  it('renders theme toggle button', () => {
    render(<ThemeToggleWrapper />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
  });

  it('cycles through themes when clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggleWrapper />);
    const button = screen.getByRole('button');

    // Initial state: light theme
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');

    // Click to switch to dark
    await user.click(button);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'liftfire-theme',
      'dark'
    );

    // Click to switch to system
    await user.click(button);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'liftfire-theme',
      'system'
    );

    // Click to switch back to light
    await user.click(button);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'liftfire-theme',
      'light'
    );
  });

  it('renders dropdown variant', () => {
    render(
      <ThemeProvider>
        <ThemeToggle variant="dropdown" />
      </ThemeProvider>
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('system'); // default theme
  });

  it('changes theme via dropdown', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeToggle variant="dropdown" />
      </ThemeProvider>
    );

    const select = screen.getByRole('combobox');

    await user.selectOptions(select, 'dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'liftfire-theme',
      'dark'
    );
  });

  it('applies custom className', () => {
    render(
      <ThemeProvider>
        <ThemeToggle className="custom-class" />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('shows correct title attribute', () => {
    render(<ThemeToggleWrapper defaultTheme="dark" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Current theme: dark');
  });
});
