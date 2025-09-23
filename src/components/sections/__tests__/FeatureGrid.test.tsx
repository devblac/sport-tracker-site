import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FeatureGrid } from '../FeatureGrid';

// Mock the useTranslations hook
vi.mock('../../../hooks/useTranslations', () => ({
  useTranslations: vi.fn(() => ({
    t: vi.fn((key: string, options?: { returnObjects?: boolean }) => {
      const translations: Record<string, any> = {
        'features.title': 'Why Choose LiftFire?',
        'features.subtitle':
          'Everything you need for a complete fitness tracking experience',
        'features.offline.title': '100% Offline Functionality',
        'features.offline.description':
          "Track your workouts even without internet. Your data syncs automatically when you're back online.",
        'features.offline.benefits': [
          'Works in any gym, anywhere',
          'No data usage concerns',
          'Lightning-fast performance',
        ],
        'features.gamification.title': 'Gamified Experience',
        'features.gamification.description':
          'Turn your fitness journey into an engaging game with XP, levels, achievements, and streaks.',
        'features.gamification.benefits': [
          'Earn XP for every workout',
          'Unlock achievements and badges',
          'Maintain workout streaks',
        ],
        'features.social.title': 'Social Features',
        'features.social.description':
          'Connect with gym friends, share achievements, and participate in challenges together.',
        'features.social.benefits': [
          'Add gym friends',
          'Share workout achievements',
          'Join community challenges',
        ],
      };

      return translations[key] || key;
    }),
  })),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Wifi: ({ className }: { className?: string }) => (
    <div className={className} data-testid="wifi-icon">
      Wifi Icon
    </div>
  ),
  Trophy: ({ className }: { className?: string }) => (
    <div className={className} data-testid="trophy-icon">
      Trophy Icon
    </div>
  ),
  Users: ({ className }: { className?: string }) => (
    <div className={className} data-testid="users-icon">
      Users Icon
    </div>
  ),
  Sparkles: ({ className }: { className?: string }) => (
    <div className={className} data-testid="sparkles-icon">
      Sparkles Icon
    </div>
  ),
  CheckCircle: ({ className }: { className?: string }) => (
    <div className={className} data-testid="check-circle-icon">
      Check Icon
    </div>
  ),
  Zap: ({ className }: { className?: string }) => (
    <div className={className} data-testid="zap-icon">
      Zap Icon
    </div>
  ),
  Shield: ({ className }: { className?: string }) => (
    <div className={className} data-testid="shield-icon">
      Shield Icon
    </div>
  ),
}));

describe('FeatureGrid', () => {
  it('renders the section title and subtitle', () => {
    render(<FeatureGrid />);

    expect(screen.getByText('Why Choose LiftFire?')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Everything you need for a complete fitness tracking experience'
      )
    ).toBeInTheDocument();
  });

  it('renders all three feature cards', () => {
    render(<FeatureGrid />);

    // Check for feature titles
    expect(screen.getByText('100% Offline Functionality')).toBeInTheDocument();
    expect(screen.getByText('Gamified Experience')).toBeInTheDocument();
    expect(screen.getByText('Social Features')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<FeatureGrid />);

    expect(
      screen.getByText(/Track your workouts even without internet/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Turn your fitness journey into an engaging game/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Connect with gym friends, share achievements/)
    ).toBeInTheDocument();
  });

  it('renders feature icons', () => {
    render(<FeatureGrid />);

    expect(screen.getByTestId('wifi-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trophy-icon')).toBeInTheDocument();
    expect(screen.getByTestId('users-icon')).toBeInTheDocument();
  });

  it('renders all feature benefits', () => {
    render(<FeatureGrid />);

    // Offline benefits
    expect(screen.getByText('Works in any gym, anywhere')).toBeInTheDocument();
    expect(screen.getByText('No data usage concerns')).toBeInTheDocument();
    expect(screen.getByText('Lightning-fast performance')).toBeInTheDocument();

    // Gamification benefits
    expect(screen.getByText('Earn XP for every workout')).toBeInTheDocument();
    expect(
      screen.getByText('Unlock achievements and badges')
    ).toBeInTheDocument();
    expect(screen.getByText('Maintain workout streaks')).toBeInTheDocument();

    // Social benefits
    expect(screen.getByText('Add gym friends')).toBeInTheDocument();
    expect(screen.getByText('Share workout achievements')).toBeInTheDocument();
    expect(screen.getByText('Join community challenges')).toBeInTheDocument();
  });

  it('has proper responsive grid classes', () => {
    render(<FeatureGrid />);

    const gridContainer = screen
      .getByText('Why Choose LiftFire?')
      .closest('section')
      ?.querySelector('.grid');
    expect(gridContainer).toHaveClass(
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3'
    );
  });

  it('applies hover effects to feature cards', () => {
    render(<FeatureGrid />);

    const featureCards = screen.getAllByText(
      /100% Offline Functionality|Gamified Experience|Social Features/
    );
    featureCards.forEach(card => {
      const cardElement = card.closest('[class*="group"]');
      expect(cardElement).toBeInTheDocument();
    });
  });

  it('has proper semantic structure', () => {
    render(<FeatureGrid />);

    // Should be wrapped in a section
    const section = screen.getByText('Why Choose LiftFire?').closest('section');
    expect(section).toBeInTheDocument();

    // Should have proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toHaveTextContent('Why Choose LiftFire?');

    const featureHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(featureHeadings).toHaveLength(3);
  });

  it('has accessible icon containers', () => {
    render(<FeatureGrid />);

    // Look for the actual icon container elements
    const iconContainers = document.querySelectorAll('[class*="w-16 h-16"]');
    expect(iconContainers.length).toBeGreaterThanOrEqual(3);

    // Check that icon containers have proper dimensions
    const firstContainer = iconContainers[0];
    expect(firstContainer).toHaveClass('w-16', 'h-16');
  });

  it('renders benefit lists with proper structure', () => {
    render(<FeatureGrid />);

    const benefitLists = document.querySelectorAll('[class*="space-y-3"]');
    expect(benefitLists.length).toBeGreaterThanOrEqual(3);

    // Check for benefit items with check icons
    const checkIcons = screen.getAllByTestId('check-circle-icon');
    expect(checkIcons.length).toBeGreaterThanOrEqual(9); // 3 benefits per feature * 3 features
  });

  it('has proper spacing and layout classes', () => {
    render(<FeatureGrid />);

    const section = screen.getByText('Why Choose LiftFire?').closest('section');
    expect(section).toHaveClass('py-24', 'bg-gradient-to-b');

    const titleContainer = screen
      .getByText('Why Choose LiftFire?')
      .closest('.text-center');
    expect(titleContainer).toHaveClass('mb-16');

    const grid = document.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });
});
