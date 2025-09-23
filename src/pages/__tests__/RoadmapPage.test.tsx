import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RoadmapPage from '../RoadmapPage';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import '../../test/i18n-setup';

// Mock the useTranslations hook
vi.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key: string, options?: any) => {
      // Mock translation data
      const translations: Record<string, any> = {
        title: 'LiftFire Development Roadmap',
        subtitle:
          'Our journey to build the ultimate fitness tracking experience',
        'intro.title': 'Building the Future of Fitness Tracking',
        'intro.description':
          'We are committed to continuous improvement and innovation.',
        'intro.philosophy':
          'Our development philosophy focuses on user feedback.',
        'quarters.q4-2023.title': 'Q4 2023 - Foundation',
        'quarters.q4-2023.theme': 'Core Infrastructure & MVP',
        'quarters.q4-2023.status': 'completed',
        'quarters.q4-2023.description':
          'Establishing the foundation with essential workout tracking features',
        'quarters.q4-2023.features': [
          'Basic workout tracking system',
          'Exercise database (500+ exercises)',
          'Offline functionality with IndexedDB',
        ],
        'quarters.q4-2023.successMetrics': [
          '100% offline functionality achieved',
          'Sub-2s load times',
          'PWA installable on all devices',
        ],
        'quarters.q1-2024.title': 'Q1 2024 - Gamification',
        'quarters.q1-2024.theme': 'XP System & User Engagement',
        'quarters.q1-2024.status': 'completed',
        'quarters.q1-2024.description':
          'Adding gamification elements to make fitness tracking more engaging',
        'quarters.q1-2024.features': [
          'XP and leveling system',
          'Achievement badges',
          'Workout streaks',
        ],
        'quarters.q1-2024.successMetrics': [
          '40% increase in user retention',
          'Average 5-day workout streaks',
          '1000+ exercises available',
        ],
        'quarters.q2-2024.title': 'Q2 2024 - Social Features',
        'quarters.q2-2024.theme': 'Community & Sharing',
        'quarters.q2-2024.status': 'in-progress',
        'quarters.q2-2024.description':
          'Building community features to connect fitness enthusiasts',
        'quarters.q2-2024.features': [
          'Friend system and social connections',
          'Workout sharing and achievements',
          'Community challenges',
        ],
        'quarters.q2-2024.successMetrics': [
          '50% of users add at least one friend',
          '30% increase in workout frequency',
          '1000+ community challenges completed',
        ],
        'quarters.q3-2024.title': 'Q3 2024 - AI Integration',
        'quarters.q3-2024.theme': 'Smart Recommendations & Analytics',
        'quarters.q3-2024.status': 'planned',
        'quarters.q3-2024.description':
          'Introducing AI-powered features for personalized fitness guidance',
        'quarters.q3-2024.features': [
          'AI workout recommendations',
          'Plateau detection and suggestions',
          'Personalized training plans',
        ],
        'quarters.q3-2024.successMetrics': [
          '85% accuracy in plateau detection',
          '60% of users follow AI recommendations',
          '25% improvement in user progress',
        ],
        'quarters.q4-2024.title': 'Q4 2024 - Advanced Features',
        'quarters.q4-2024.theme': 'Premium Experience & Coaching',
        'quarters.q4-2024.status': 'planned',
        'quarters.q4-2024.description':
          'Premium features for serious fitness enthusiasts and professionals',
        'quarters.q4-2024.features': [
          'Personal trainer integration',
          'Advanced form analysis (camera-based)',
          'Nutrition tracking integration',
        ],
        'quarters.q4-2024.successMetrics': [
          '500+ certified trainers on platform',
          'Form analysis accuracy >90%',
          'Integration with 10+ wearable devices',
        ],
        'longTerm.title': '2025+ Vision',
        'longTerm.description':
          'Our long-term vision extends beyond simple workout tracking.',
        'longTerm.goals': [
          {
            title: 'AI Fitness Coach',
            description:
              'Advanced AI that understands your goals and preferences',
            timeline: '2025 H1',
          },
          {
            title: 'Virtual Reality Integration',
            description: 'VR workout experiences and form analysis',
            timeline: '2025 H2',
          },
          {
            title: 'Health Ecosystem',
            description:
              'Integration with healthcare providers and nutritionists',
            timeline: '2025-2026',
          },
          {
            title: 'Global Fitness Community',
            description: 'Worldwide challenges and competitions',
            timeline: '2026+',
          },
        ],
        'community.title': 'Community Input',
        'community.description':
          'We actively listen to our community and incorporate user feedback.',
        'community.ways': [
          'Feature request voting system',
          'Monthly community surveys',
          'Beta testing programs',
          'Discord community discussions',
          'User interview sessions',
        ],
        'community.cta.title': 'Have a Feature Idea?',
        'community.cta.description':
          'Join our Discord community or email us your suggestions.',
        'community.cta.discord': 'Join Discord',
        'community.cta.email': 'Send Feedback',
        'updates.title': 'Stay Updated',
        'updates.subtitle':
          'Never miss important updates and new feature releases',
        'updates.newsletter.title': 'Development Newsletter',
        'updates.newsletter.description':
          'Monthly updates on development progress',
        'updates.newsletter.cta': 'Subscribe to Updates',
        'updates.social.title': 'Follow Our Journey',
        'updates.social.description':
          'Get real-time updates on our social media channels',
        'updates.social.platforms': [
          'Twitter',
          'Instagram',
          'LinkedIn',
          'YouTube',
        ],
      };

      if (options?.returnObjects) {
        return translations[key] || [];
      }
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

describe('RoadmapPage', () => {
  it('renders the main title and subtitle', () => {
    renderWithProviders(<RoadmapPage />);

    expect(
      screen.getByText('LiftFire Development Roadmap')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Our journey to build the ultimate fitness tracking experience'
      )
    ).toBeInTheDocument();
  });

  it('renders the introduction section', () => {
    renderWithProviders(<RoadmapPage />);

    expect(
      screen.getByText('Building the Future of Fitness Tracking')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We are committed to continuous improvement and innovation.'
      )
    ).toBeInTheDocument();
  });

  it('renders all quarterly milestones', () => {
    renderWithProviders(<RoadmapPage />);

    expect(screen.getByText('Q4 2023 - Foundation')).toBeInTheDocument();
    expect(screen.getByText('Q1 2024 - Gamification')).toBeInTheDocument();
    expect(screen.getByText('Q2 2024 - Social Features')).toBeInTheDocument();
    expect(screen.getByText('Q3 2024 - AI Integration')).toBeInTheDocument();
    expect(screen.getByText('Q4 2024 - Advanced Features')).toBeInTheDocument();
  });

  it('displays correct status indicators for each quarter', () => {
    renderWithProviders(<RoadmapPage />);

    // Check for status themes
    expect(screen.getByText('Core Infrastructure & MVP')).toBeInTheDocument();
    expect(screen.getByText('XP System & User Engagement')).toBeInTheDocument();
    expect(screen.getByText('Community & Sharing')).toBeInTheDocument();
    expect(
      screen.getByText('Smart Recommendations & Analytics')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Premium Experience & Coaching')
    ).toBeInTheDocument();
  });

  it('renders features and success metrics for quarters', () => {
    renderWithProviders(<RoadmapPage />);

    // Check for some key features
    expect(
      screen.getByText('Basic workout tracking system')
    ).toBeInTheDocument();
    expect(screen.getByText('XP and leveling system')).toBeInTheDocument();
    expect(
      screen.getByText('Friend system and social connections')
    ).toBeInTheDocument();

    // Check for success metrics
    expect(
      screen.getByText('100% offline functionality achieved')
    ).toBeInTheDocument();
    expect(
      screen.getByText('40% increase in user retention')
    ).toBeInTheDocument();
  });

  it('renders long-term vision section with enhanced features', () => {
    renderWithProviders(<RoadmapPage />);

    expect(screen.getByText('2025+ Vision')).toBeInTheDocument();
    expect(screen.getByText('AI Fitness Coach')).toBeInTheDocument();
    expect(screen.getByText('Virtual Reality Integration')).toBeInTheDocument();
    expect(screen.getByText('Health Ecosystem')).toBeInTheDocument();
    expect(screen.getByText('Global Fitness Community')).toBeInTheDocument();
    expect(screen.getByText('Our Ultimate Vision')).toBeInTheDocument();
    expect(screen.getByText('Join the Journey')).toBeInTheDocument();
  });

  it('renders community input section with enhanced features', () => {
    renderWithProviders(<RoadmapPage />);

    expect(screen.getAllByText('Community Input')).toHaveLength(2); // Navigation and section heading
    expect(
      screen.getByText('Feature request voting system')
    ).toBeInTheDocument();
    expect(screen.getByText('Join Discord')).toBeInTheDocument();
    expect(screen.getByText('Send Feedback')).toBeInTheDocument();
    expect(screen.getByText('2.5K+')).toBeInTheDocument();
    expect(screen.getByText('Discord Members')).toBeInTheDocument();
    expect(screen.getByText('150+')).toBeInTheDocument();
    expect(screen.getByText('Feature Requests')).toBeInTheDocument();
  });

  it('renders stay updated section', () => {
    renderWithProviders(<RoadmapPage />);

    expect(screen.getAllByText('Stay Updated')).toHaveLength(2); // Navigation and section heading
    expect(screen.getByText('Development Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Follow Our Journey')).toBeInTheDocument();
    expect(screen.getByText('Subscribe to Updates')).toBeInTheDocument();
  });

  it('renders social media platform buttons', () => {
    renderWithProviders(<RoadmapPage />);

    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('YouTube')).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    renderWithProviders(<RoadmapPage />);

    // Check for proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('LiftFire Development Roadmap');

    // Check for multiple h2 headings
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings.length).toBeGreaterThan(0);
  });

  it('displays timeline with proper visual indicators and navigation', () => {
    renderWithProviders(<RoadmapPage />);

    // The component should render Key Features and Success Metrics sections
    const keyFeaturesHeadings = screen.getAllByText('Key Features');
    const successMetricsHeadings = screen.getAllByText('Success Metrics');

    expect(keyFeaturesHeadings.length).toBeGreaterThan(0);
    expect(successMetricsHeadings.length).toBeGreaterThan(0);

    // Check for navigation menu (each appears twice - in nav and section)
    expect(screen.getAllByText('Development Timeline')).toHaveLength(2);
    expect(
      screen.getAllByText('Long-term Vision').length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Community Input')).toHaveLength(2);
    expect(screen.getAllByText('Stay Updated')).toHaveLength(2);
  });

  it('renders enhanced visual elements and interactive features', () => {
    renderWithProviders(<RoadmapPage />);

    // Check for enhanced visual badges
    expect(screen.getByText('Future Vision')).toBeInTheDocument();
    expect(screen.getByText('Community Driven')).toBeInTheDocument();
    expect(screen.getByText('Stay Connected')).toBeInTheDocument();

    // Check for interactive buttons
    expect(screen.getByText('Share Your Vision')).toBeInTheDocument();

    // Check for community stats
    expect(screen.getByText('2.5K+')).toBeInTheDocument();
    expect(screen.getByText('150+')).toBeInTheDocument();
  });
});
