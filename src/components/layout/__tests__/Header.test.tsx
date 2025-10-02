import { render, screen } from '../../../test/test-utils';
import { describe, it, expect } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  it('renders the LiftFire logo', () => {
    render(<Header />);
    expect(screen.getByText('LF')).toBeInTheDocument();
    expect(screen.getByText('LiftFire')).toBeInTheDocument();
  });

  it('renders default navigation items', () => {
    render(<Header />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Roadmap')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders custom navigation items', () => {
    const customNavItems = [
      { label: 'Custom 1', href: '/custom1' },
      { label: 'Custom 2', href: '/custom2' },
    ];

    render(<Header navItems={customNavItems} />);
    expect(screen.getByText('Custom 1')).toBeInTheDocument();
    expect(screen.getByText('Custom 2')).toBeInTheDocument();
    expect(screen.queryByText('Features')).not.toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: /language/i })
    ).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<Header />);
    expect(
      screen.getByRole('link', { name: /get started/i })
    ).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
