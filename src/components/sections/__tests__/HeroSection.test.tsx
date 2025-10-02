import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { HeroSection } from '../HeroSection';
import { LanguageProvider } from '../../../contexts/LanguageContext';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock window.matchMedia
beforeAll(() => {
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
});

// Types for mocked components
interface MockMotionComponentProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  animate?: Record<string, unknown>;
  initial?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  variants?: Record<string, unknown>;
}

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: MockMotionComponentProps) => (
      <div {...props}>{children}</div>
    ),
    section: ({ children, ...props }: MockMotionComponentProps) => (
      <section {...props}>{children}</section>
    ),
    svg: ({ children, ...props }: MockMotionComponentProps) => (
      <svg {...props}>{children}</svg>
    ),
  },
}));

// Mock useTranslations hook
vi.mock('../../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'hero.headline': 'Transform Your Fitness Journey with LiftFire',
        'hero.subheadline':
          'The gamified gym tracker that works 100% offline. Track workouts, earn XP, unlock achievements, and connect with friends - all while keeping your data secure.',
        'hero.primaryCTA': 'Start Your Journey',
        'hero.secondaryCTA': 'Watch Demo',
        'hero.trustIndicator': 'Join 10,000+ fitness enthusiasts',
      };
      return translations[key] || key;
    },
  }),
}));

// Types for mocked UI components
interface MockButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'outline'
    | 'gradient'
    | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children?: React.ReactNode;
}

interface MockContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

interface MockTypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small' | 'span';
  children?: React.ReactNode;
}

// Mock UI components
vi.mock('../../ui/Button', () => ({
  Button: ({
    children,
    onClick,
    variant,
    className,
    ...props
  }: MockButtonProps) => (
    <button
      onClick={onClick}
      className={`${variant === 'primary' ? 'bg-blue-600' : 'bg-purple-600'} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  ),
}));

vi.mock('../../ui/Container', () => ({
  Container: ({ children, className, ...props }: MockContainerProps) => (
    <div className={`container mx-auto px-4 ${className || ''}`} {...props}>
      {children}
    </div>
  ),
}));

vi.mock('../../ui/Typography', () => ({
  Typography: ({
    children,
    variant,
    className,
    ...props
  }: MockTypographyProps) => {
    const Tag =
      variant === 'h1'
        ? 'h1'
        : variant === 'h6'
          ? 'h6'
          : variant === 'small'
            ? 'small'
            : 'p';
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  },
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <LanguageProvider>{component}</LanguageProvider>
    </ThemeProvider>
  );
};

describe('HeroSection', () => {
  it('renders hero section with main headline', () => {
    renderWithProviders(<HeroSection />);

    expect(
      screen.getByText('Transform Your Fitness Journey with LiftFire')
    ).toBeInTheDocument();
  });

  it('displays subheadline with key value propositions', () => {
    renderWithProviders(<HeroSection />);

    const subheadline = screen.getByText(
      /The gamified gym tracker that works 100% offline/
    );
    expect(subheadline).toBeInTheDocument();
    expect(subheadline).toHaveTextContent(
      'Track workouts, earn XP, unlock achievements'
    );
  });

  it('shows trust indicator with user count', () => {
    renderWithProviders(<HeroSection />);

    expect(
      screen.getByText('Join 10,000+ fitness enthusiasts')
    ).toBeInTheDocument();
  });

  it('renders primary CTA button', () => {
    renderWithProviders(<HeroSection />);

    const primaryButton = screen.getByRole('button', {
      name: /Start Your Journey/i,
    });
    expect(primaryButton).toBeInTheDocument();
    // Check for gradient variant instead of specific background color
    expect(primaryButton).toHaveClass('group', 'shadow-2xl');
  });

  it('renders secondary CTA button', () => {
    renderWithProviders(<HeroSection />);

    const secondaryButton = screen.getByRole('button', { name: /Watch Demo/i });
    expect(secondaryButton).toBeInTheDocument();
  });

  it('displays feature preview cards', () => {
    renderWithProviders(<HeroSection />);

    expect(screen.getByText('100% Offline')).toBeInTheDocument();
    expect(screen.getByText('Gamified')).toBeInTheDocument();
    expect(screen.getByText('Privacy First')).toBeInTheDocument();
  });

  it('handles primary CTA click', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    renderWithProviders(<HeroSection />);

    const primaryButton = screen.getByRole('button', {
      name: /Start Your Journey/i,
    });
    fireEvent.click(primaryButton);

    expect(consoleSpy).toHaveBeenCalledWith('Start Your Journey clicked');
    consoleSpy.mockRestore();
  });

  it('handles secondary CTA click', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    renderWithProviders(<HeroSection />);

    const secondaryButton = screen.getByRole('button', { name: /Watch Demo/i });
    fireEvent.click(secondaryButton);

    expect(consoleSpy).toHaveBeenCalledWith('Watch Demo clicked');
    consoleSpy.mockRestore();
  });

  it('has proper responsive classes', () => {
    renderWithProviders(<HeroSection />);

    const headline = screen.getByText(
      'Transform Your Fitness Journey with LiftFire'
    );
    expect(headline).toHaveClass(
      'text-4xl',
      'sm:text-5xl',
      'md:text-6xl',
      'lg:text-7xl'
    );
  });

  it('includes scroll indicator', () => {
    renderWithProviders(<HeroSection />);

    // Check for scroll indicator structure
    const scrollIndicator = document.querySelector('.absolute.bottom-8');
    expect(scrollIndicator).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<HeroSection />);

    // Check that the section element exists
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();

    // Check that buttons are properly accessible
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeVisible();
    });
  });

  it('applies gradient background classes correctly', () => {
    renderWithProviders(<HeroSection />);

    const section = document.querySelector('section');
    expect(section).toHaveClass(
      'bg-gradient-to-br',
      'from-slate-900',
      'via-blue-900',
      'to-purple-900'
    );
  });

  it('has proper semantic structure', () => {
    renderWithProviders(<HeroSection />);

    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent(
      'Transform Your Fitness Journey with LiftFire'
    );
  });
});
