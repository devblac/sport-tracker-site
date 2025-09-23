import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { FeaturesPage } from '../FeaturesPage';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import '../../test/i18n-setup';

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

// Mock the useTranslations hook
vi.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key: string) => {
      const translations: Record<string, any> = {
        title: 'Powerful Features for Every Fitness Journey',
        subtitle:
          'Discover all the tools and features that make LiftFire the ultimate gym companion',
        'categories.core': 'Core Features',
        'categories.gamification': 'Gamification',
        'categories.social': 'Social Features',
        'categories.ai': 'AI & Analytics',
        'categories.technical': 'Technical Excellence',
        'core.exerciseDatabase.title': '1000+ Exercise Database',
        'core.exerciseDatabase.description':
          'Comprehensive database with detailed instructions',
        'core.exerciseDatabase.status': 'completed',
        'core.offlineTracking.title': '100% Offline Functionality',
        'core.offlineTracking.description':
          'Track workouts without internet connection',
        'core.offlineTracking.status': 'completed',
        'core.workoutPlans.title': 'Custom Workout Plans',
        'core.workoutPlans.description': 'Create personalized workout routines',
        'core.workoutPlans.status': 'in-progress',
        'core.progressTracking.title': 'Progress Analytics',
        'core.progressTracking.description': 'Detailed charts and statistics',
        'core.progressTracking.status': 'completed',
        'gamification.xpSystem.title': 'XP & Leveling System',
        'gamification.xpSystem.description':
          'Earn experience points for workouts',
        'gamification.xpSystem.status': 'completed',
        'gamification.achievements.title': 'Achievements & Badges',
        'gamification.achievements.description':
          'Unlock special badges for milestones',
        'gamification.achievements.status': 'completed',
        'gamification.streaks.title': 'Workout Streaks',
        'gamification.streaks.description':
          'Maintain workout streaks for rewards',
        'gamification.streaks.status': 'completed',
        'gamification.challenges.title': 'Personal Challenges',
        'gamification.challenges.description':
          'Set and complete fitness challenges',
        'gamification.challenges.status': 'in-progress',
        'social.friends.title': 'Gym Friends',
        'social.friends.description': 'Add friends and share workouts',
        'social.friends.status': 'in-progress',
        'social.leaderboards.title': 'Leaderboards',
        'social.leaderboards.description': 'Compete with friends and community',
        'social.leaderboards.status': 'planned',
        'social.sharing.title': 'Achievement Sharing',
        'social.sharing.description': 'Share achievements on social media',
        'social.sharing.status': 'planned',
        'social.mentorship.title': 'Mentorship Program',
        'social.mentorship.description': 'Connect with experienced users',
        'social.mentorship.status': 'planned',
        'ai.plateauDetection.title': 'Plateau Detection',
        'ai.plateauDetection.description':
          'AI identifies when you hit plateaus',
        'ai.plateauDetection.status': 'planned',
        'ai.recommendations.title': 'Personalized Recommendations',
        'ai.recommendations.description':
          'Get workout suggestions based on progress',
        'ai.recommendations.status': 'planned',
        'ai.formAnalysis.title': 'Form Analysis',
        'ai.formAnalysis.description': 'AI-powered form checking using camera',
        'ai.formAnalysis.status': 'planned',
        'ai.recovery.title': 'Recovery Optimization',
        'ai.recovery.description': 'Smart recommendations for rest days',
        'ai.recovery.status': 'planned',
        'technical.pwa.title': 'Progressive Web App',
        'technical.pwa.description':
          'Install on any device, works like native app',
        'technical.pwa.status': 'completed',
        'technical.performance.title': 'Lightning Fast Performance',
        'technical.performance.description':
          'Optimized for speed with <2s load times',
        'technical.performance.status': 'completed',
        'technical.security.title': 'Privacy & Security',
        'technical.security.description':
          'Your data is encrypted and stored securely',
        'technical.security.status': 'completed',
        'technical.accessibility.title': 'Accessibility Compliant',
        'technical.accessibility.description':
          'WCAG 2.1 AA compliant for users with disabilities',
        'technical.accessibility.status': 'completed',
        'techStack.title': 'Built with Modern Technology',
        'techStack.subtitle':
          'LiftFire uses cutting-edge technology to deliver the best possible experience',
        'techStack.frontend': 'React 19 + TypeScript',
        'techStack.backend': 'Supabase + PostgreSQL',
        'techStack.offline': 'IndexedDB + Service Workers',
        'techStack.ui': 'Tailwind CSS + Framer Motion',
        'techStack.testing': 'Vitest + React Testing Library',
        'techStack.deployment': 'Netlify + GitHub Actions',
      };
      return translations[key] || key;
    },
  }),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <LanguageProvider>{component}</LanguageProvider>
    </ThemeProvider>
  );
};

describe('FeaturesPage', () => {
  it('renders the page title and subtitle', () => {
    renderWithProviders(<FeaturesPage />);

    expect(
      screen.getByText('Powerful Features for Every Fitness Journey')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Discover all the tools and features that make LiftFire the ultimate gym companion'
      )
    ).toBeInTheDocument();
  });

  it('displays all category filter buttons', () => {
    renderWithProviders(<FeaturesPage />);

    expect(screen.getByText('All Features')).toBeInTheDocument();
    expect(screen.getByText('Core Features')).toBeInTheDocument();
    expect(screen.getByText('Gamification')).toBeInTheDocument();
    expect(screen.getByText('Social Features')).toBeInTheDocument();
    expect(screen.getByText('AI & Analytics')).toBeInTheDocument();
    expect(screen.getByText('Technical Excellence')).toBeInTheDocument();
  });

  it('displays feature cards with status badges', () => {
    renderWithProviders(<FeaturesPage />);

    // Check for some key features
    expect(screen.getByText('1000+ Exercise Database')).toBeInTheDocument();
    expect(screen.getByText('100% Offline Functionality')).toBeInTheDocument();
    expect(screen.getByText('XP & Leveling System')).toBeInTheDocument();

    // Check for status badges
    expect(screen.getAllByText('Completed')).toHaveLength(10); // 10 completed features
    expect(screen.getAllByText('In Progress')).toHaveLength(3); // 3 in-progress features
    expect(screen.getAllByText('Planned')).toHaveLength(7); // 7 planned features
  });

  it('filters features by category', async () => {
    renderWithProviders(<FeaturesPage />);

    // Click on Core Features filter
    fireEvent.click(screen.getByText('Core Features'));

    await waitFor(() => {
      // Should show core features
      expect(screen.getByText('1000+ Exercise Database')).toBeInTheDocument();
      expect(
        screen.getByText('100% Offline Functionality')
      ).toBeInTheDocument();

      // Should not show gamification features
      expect(
        screen.queryByText('XP & Leveling System')
      ).not.toBeInTheDocument();
    });
  });

  it('expands and collapses feature details', async () => {
    renderWithProviders(<FeaturesPage />);

    // Find the first feature card's expand button
    const expandButtons = screen.getAllByRole('button');
    const firstExpandButton = expandButtons.find(
      button => button.querySelector('svg') // Looking for chevron icon
    );

    expect(firstExpandButton).toBeInTheDocument();

    // Initially, detailed benefits should not be visible
    expect(screen.queryByText('Key Benefits')).not.toBeInTheDocument();

    // Click to expand
    if (firstExpandButton) {
      fireEvent.click(firstExpandButton);

      await waitFor(() => {
        expect(screen.getByText('Key Benefits')).toBeInTheDocument();
      });
    }
  });

  it('displays development progress summary', () => {
    renderWithProviders(<FeaturesPage />);

    expect(screen.getByText('Development Progress')).toBeInTheDocument();
    expect(screen.getByText('Completed Features')).toBeInTheDocument();
    expect(screen.getByText('In Development')).toBeInTheDocument();
    expect(screen.getByText('Planned Features')).toBeInTheDocument();

    // Check the counts
    expect(screen.getByText('10')).toBeInTheDocument(); // 10 completed
    expect(screen.getByText('3')).toBeInTheDocument(); // 3 in progress
    expect(screen.getByText('7')).toBeInTheDocument(); // 7 planned
  });

  it('shows correct status badge colors and icons', () => {
    renderWithProviders(<FeaturesPage />);

    const completedBadges = screen.getAllByText('Completed');
    const inProgressBadges = screen.getAllByText('In Progress');
    const plannedBadges = screen.getAllByText('Planned');

    expect(completedBadges.length).toBeGreaterThan(0);
    expect(inProgressBadges.length).toBeGreaterThan(0);
    expect(plannedBadges.length).toBeGreaterThan(0);

    // Check that badges have appropriate styling classes
    completedBadges.forEach(badge => {
      expect(badge.closest('div')).toHaveClass('bg-green-100');
    });

    inProgressBadges.forEach(badge => {
      expect(badge.closest('div')).toHaveClass('bg-yellow-100');
    });

    plannedBadges.forEach(badge => {
      expect(badge.closest('div')).toHaveClass('bg-red-100');
    });
  });

  it('maintains filter state when expanding features', async () => {
    renderWithProviders(<FeaturesPage />);

    // Filter to gamification features
    fireEvent.click(screen.getByText('Gamification'));

    await waitFor(() => {
      expect(screen.getByText('XP & Leveling System')).toBeInTheDocument();
      expect(
        screen.queryByText('1000+ Exercise Database')
      ).not.toBeInTheDocument();
    });

    // Expand a feature
    const expandButtons = screen.getAllByRole('button');
    const expandButton = expandButtons.find(
      button =>
        button.querySelector('svg') &&
        button.getAttribute('class')?.includes('flex-shrink-0')
    );

    if (expandButton) {
      fireEvent.click(expandButton);

      await waitFor(() => {
        // Should still be filtered to gamification
        expect(screen.getByText('XP & Leveling System')).toBeInTheDocument();
        expect(
          screen.queryByText('1000+ Exercise Database')
        ).not.toBeInTheDocument();
      });
    }
  });

  it('has accessible expand/collapse buttons', () => {
    renderWithProviders(<FeaturesPage />);

    const expandButtons = screen.getAllByRole('button');
    const featureExpandButtons = expandButtons.filter(
      button =>
        button.querySelector('svg') &&
        button.getAttribute('class')?.includes('flex-shrink-0')
    );

    featureExpandButtons.forEach(button => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  it('displays technical specifications section', () => {
    renderWithProviders(<FeaturesPage />);

    // Check for tech stack title
    expect(
      screen.getByText('Built with Modern Technology')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'LiftFire uses cutting-edge technology to deliver the best possible experience'
      )
    ).toBeInTheDocument();

    // Check for tech stack components
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Offline Storage')).toBeInTheDocument();
    expect(screen.getByText('UI Framework')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('Deployment')).toBeInTheDocument();

    // Check for tech stack values
    expect(screen.getByText('React 19 + TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Supabase + PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('IndexedDB + Service Workers')).toBeInTheDocument();
    expect(
      screen.getByText('Tailwind CSS + Framer Motion')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Vitest + React Testing Library')
    ).toBeInTheDocument();
    expect(screen.getByText('Netlify + GitHub Actions')).toBeInTheDocument();
  });

  it('displays performance metrics', () => {
    renderWithProviders(<FeaturesPage />);

    // Check for performance metrics
    expect(screen.getByText('<2s')).toBeInTheDocument();
    expect(screen.getByText('Load Time')).toBeInTheDocument();

    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('Uptime')).toBeInTheDocument();

    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('Offline Capable')).toBeInTheDocument();

    expect(screen.getByText('90+')).toBeInTheDocument();
    expect(screen.getByText('Lighthouse Score')).toBeInTheDocument();
  });
});
