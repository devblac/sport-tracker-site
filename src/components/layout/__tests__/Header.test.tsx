import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { Header } from '../Header';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { vi } from 'vitest';
import { beforeEach } from 'vitest';
import { describe } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';

// Mock localStorage for ThemeProvider
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia for ThemeProvider
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

const HeaderWrapper = ({ ...props }) => (
  <ThemeProvider>
    <Header {...props} />
  </ThemeProvider>
);

describe('Header', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    vi.clearAllMocks();
  });

  it('renders the LiftFire logo', () => {
    render(<HeaderWrapper />);
    expect(screen.getByText('LiftFire')).toBeInTheDocument();
  });

  it('renders default navigation items', () => {
    render(<HeaderWrapper />);
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Features').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pricing').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Roadmap').length).toBeGreaterThan(0);
  });

  it('renders custom navigation items', () => {
    const customNavItems = [
      { label: 'Custom 1', href: '/custom1' },
      { label: 'Custom 2', href: '/custom2' },
    ];

    render(<HeaderWrapper navItems={customNavItems} />);
    expect(screen.getAllByText('Custom 1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Custom 2').length).toBeGreaterThan(0);
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(<HeaderWrapper />);
    const themeToggles = screen.getAllByRole('button', { name: /switch to/i });
    expect(themeToggles.length).toBeGreaterThan(0);
  });

  it('renders CTA button on desktop', () => {
    render(<HeaderWrapper />);
    const ctaButtons = screen.getAllByText('Start Your Journey');
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it('shows mobile menu button on mobile', () => {
    render(<HeaderWrapper />);
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderWrapper />);

    const menuButton = screen.getByRole('button', { name: /open menu/i });

    // Initially closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    await user.click(menuButton);
    expect(
      screen.getByRole('button', { name: /close menu/i })
    ).toBeInTheDocument();
  });

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderWrapper />);

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    await user.click(menuButton);

    // Verify menu is open
    expect(
      screen.getByRole('button', { name: /close menu/i })
    ).toBeInTheDocument();

    // Click on a navigation link in the mobile menu
    const homeLinks = screen.getAllByText('Home');
    await user.click(homeLinks[1]); // Mobile menu link (second one)

    // Wait for the menu to close and check that the button shows "Open menu" again
    expect(
      screen.getByRole('button', { name: /open menu/i })
    ).toBeInTheDocument();
  });

  it('handles external links correctly', () => {
    const navItemsWithExternal = [
      { label: 'Internal', href: '/internal' },
      { label: 'External', href: 'https://external.com', external: true },
    ];

    render(<HeaderWrapper navItems={navItemsWithExternal} />);

    const externalLinks = screen.getAllByText('External');
    expect(externalLinks[0]).toHaveAttribute('target', '_blank');
    expect(externalLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');

    const internalLinks = screen.getAllByText('Internal');
    expect(internalLinks[0]).not.toHaveAttribute('target');
    expect(internalLinks[0]).not.toHaveAttribute('rel');
  });

  it('applies custom className', () => {
    const { container } = render(<HeaderWrapper className="custom-header" />);
    expect(container.firstChild).toHaveClass('custom-header');
  });

  it('has proper accessibility attributes', () => {
    render(<HeaderWrapper />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const navigations = screen.getAllByRole('navigation');
    expect(navigations.length).toBeGreaterThan(0);

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded');
    expect(menuButton).toHaveAttribute('aria-label');
  });
});
