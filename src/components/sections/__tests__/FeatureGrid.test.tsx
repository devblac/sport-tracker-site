import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FeatureGrid } from '../FeatureGrid';

// Mock the useTranslations hook
vi.mock('../../../hooks/useTranslations', () => ({
  useTranslations: vi.fn(() => ({
    t: vi.fn((key: string, _options?: { returnObjects?: boolean }) => {
      const translations: Record<string, string | string[]> = {
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
  it('renders main content', () => {
    render(<FeatureGrid />);

    // Check title and subtitle
    expect(screen.getByText('Why Choose LiftFire?')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Everything you need for a complete fitness tracking experience'
      )
    ).toBeInTheDocument();

    // Check feature cards
    expect(screen.getByText('100% Offline Functionality')).toBeInTheDocument();
    expect(screen.getByText('Gamified Experience')).toBeInTheDocument();
    expect(screen.getByText('Social Features')).toBeInTheDocument();

    // Check feature icons
    expect(screen.getByTestId('wifi-icon')).toBeInTheDocument();
    expect(screen.getByTestId('trophy-icon')).toBeInTheDocument();
    expect(screen.getByTestId('users-icon')).toBeInTheDocument();

    // Check one benefit from each feature
    expect(screen.getByText('Works in any gym, anywhere')).toBeInTheDocument();
    expect(screen.getByText('Earn XP for every workout')).toBeInTheDocument();
    expect(screen.getByText('Add gym friends')).toBeInTheDocument();
  });
});
