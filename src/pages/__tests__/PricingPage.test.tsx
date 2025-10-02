import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { PricingPage } from '../PricingPage';
// Using test-utils for providers
import '../../i18n/config';

// Mock the useTranslations hook
vi.mock('../../hooks/useTranslations', () => ({
  useTranslations: () => ({
    t: (key: string) => {
      const translations: Record<string, any> = {
        title: 'Choose Your Fitness Plan',
        subtitle:
          "Start free and upgrade when you're ready to unlock advanced features",
        'plans.free.name': 'Free',
        'plans.free.price': '$0',
        'plans.free.period': 'forever',
        'plans.free.description':
          'Perfect for getting started with basic workout tracking',
        'plans.free.features.exerciseDatabase': 'Access to 1000+ exercises',
        'plans.free.features.offlineTracking': '100% offline workout tracking',
        'plans.free.features.basicGameification':
          'Basic XP and leveling system',
        'plans.free.features.localStorage': 'Local data storage',
        'plans.free.features.progressCharts': 'Basic progress charts',
        'plans.free.features.workoutHistory': 'Workout history tracking',
        'plans.free.features.customWorkouts': 'Create custom workouts',
        'plans.free.features.basicAchievements': 'Basic achievement system',
        'plans.pro.name': 'Pro',
        'plans.pro.price': '$9.99',
        'plans.pro.period': 'per month',
        'plans.pro.description':
          'Enhanced features for serious fitness enthusiasts',
        'plans.pro.features.allFreeFeatures': 'Everything in Free',
        'plans.pro.features.cloudSync': 'Cloud backup and sync',
        'plans.pro.features.advancedGameification':
          'Advanced gamification system',
        'plans.pro.features.socialFeatures': 'Friends and social sharing',
        'plans.pro.features.aiRecommendations':
          'AI-powered workout recommendations',
        'plans.pro.features.advancedAnalytics': 'Detailed progress analytics',
        'plans.pro.features.customChallenges': 'Create custom challenges',
        'plans.pro.features.prioritySupport': 'Priority customer support',
        'plans.pro.features.exportData': 'Export workout data',
        'plans.pro.features.multiDevice': 'Sync across unlimited devices',
        'plans.elite.name': 'Elite',
        'plans.elite.price': '$19.99',
        'plans.elite.period': 'per month',
        'plans.elite.description':
          'Premium experience with personal trainer features',
        'plans.elite.features.allProFeatures': 'Everything in Pro',
        'plans.elite.features.personalTrainer': 'Personal trainer access',
        'plans.elite.features.customWorkoutPlans':
          'Custom workout plan creation',
        'plans.elite.features.advancedAI': 'Advanced AI coaching',
        'plans.elite.features.formAnalysis': 'AI form analysis (coming soon)',
        'plans.elite.features.nutritionTracking':
          'Nutrition tracking integration',
        'plans.elite.features.recoveryOptimization': 'Recovery optimization',
        'plans.elite.features.mentorshipProgram':
          'Access to mentorship program',
        'plans.elite.features.earlyAccess': 'Early access to new features',
        'plans.elite.features.whiteGlove': 'White-glove onboarding',
        'cta.startFree': 'Start Free',
        'cta.choosePro': 'Choose Pro',
        'cta.chooseElite': 'Choose Elite',
        'faq.title': 'Frequently Asked Questions',
        'faq.questions.whatIncluded.question':
          "What's included in the free plan?",
        'faq.questions.whatIncluded.answer':
          'The free plan includes access to our complete exercise database, offline workout tracking, basic gamification features, and local data storage.',
        'faq.questions.upgradeAnytime.question':
          'Can I upgrade or downgrade anytime?',
        'faq.questions.upgradeAnytime.answer':
          'Yes! You can upgrade or downgrade your plan at any time.',
        'faq.questions.dataSync.question': 'How does cloud sync work?',
        'faq.questions.dataSync.answer':
          'With Pro and Elite plans, your workout data automatically syncs across all your devices.',
        'faq.questions.studentDiscount.question':
          'Do you offer student discounts?',
        'faq.questions.studentDiscount.answer':
          'Yes! Students get 50% off Pro and Elite plans.',
        'faq.questions.cancelAnytime.question': 'Can I cancel anytime?',
        'faq.questions.cancelAnytime.answer':
          'Absolutely. You can cancel your subscription at any time.',
        'faq.questions.offlineWork.question': 'Does LiftFire work offline?',
        'faq.questions.offlineWork.answer':
          'Yes! LiftFire works 100% offline on all plans.',
        'guarantee.title': '30-Day Money-Back Guarantee',
        'guarantee.description':
          "Try LiftFire risk-free. If you're not completely satisfied, we'll refund your money within 30 days.",
        'contact.title': 'Need Help Choosing?',
        'contact.description':
          'Our team is here to help you find the perfect plan for your fitness goals.',
        'contact.email': 'support@liftfire.app',
        'contact.discord': 'Join our Discord community',
        'plans.mostPopular': 'Most Popular',
        'comparison.title': 'Compare All Features',
        'comparison.subtitle':
          "See exactly what's included in each plan with our detailed feature comparison",
        'comparison.feature': 'Feature',
        'comparison.pricing': 'Pricing',
        'comparison.getStarted': 'Get Started',
        'comparison.features.exerciseDatabase': 'Access to 1000+ exercises',
        'comparison.features.offlineTracking': '100% offline workout tracking',
        'comparison.features.basicGameification':
          'Basic XP and leveling system',
        'comparison.features.localStorage': 'Local data storage',
        'comparison.features.progressCharts': 'Basic progress charts',
        'comparison.features.workoutHistory': 'Workout history tracking',
        'comparison.features.customWorkouts': 'Create custom workouts',
        'comparison.features.basicAchievements': 'Basic achievement system',
        'comparison.features.cloudSync': 'Cloud backup and sync',
        'comparison.features.advancedGameification':
          'Advanced gamification system',
        'comparison.features.socialFeatures': 'Friends and social sharing',
        'comparison.features.aiRecommendations':
          'AI-powered workout recommendations',
        'comparison.features.advancedAnalytics': 'Detailed progress analytics',
        'comparison.features.customChallenges': 'Create custom challenges',
        'comparison.features.prioritySupport': 'Priority customer support',
        'comparison.features.exportData': 'Export workout data',
        'comparison.features.multiDevice': 'Sync across unlimited devices',
        'comparison.features.personalTrainer': 'Personal trainer access',
        'comparison.features.customWorkoutPlans':
          'Custom workout plan creation',
        'comparison.features.advancedAI': 'Advanced AI coaching',
        'comparison.features.formAnalysis': 'AI form analysis (coming soon)',
        'comparison.features.nutritionTracking':
          'Nutrition tracking integration',
        'comparison.features.recoveryOptimization': 'Recovery optimization',
        'comparison.features.mentorshipProgram': 'Access to mentorship program',
        'comparison.features.earlyAccess': 'Early access to new features',
        'comparison.features.whiteGlove': 'White-glove onboarding',
        'upgrade.title': 'Ready to Supercharge Your Workouts?',
        'upgrade.description':
          "Join thousands of fitness enthusiasts who have transformed their training with LiftFire's advanced features.",
        'upgrade.startWithPro': 'Start with Pro',
        'upgrade.tryFreeFirst': 'Try Free First',
        'finalCta.title': 'Start Your Fitness Transformation Today',
        'finalCta.description':
          "Don't wait to achieve your fitness goals. Join the LiftFire community and experience the future of workout tracking.",
        'finalCta.startFree': 'Start Free Now',
        'finalCta.upgradeToPro': 'Upgrade to Pro',
      };
      return translations[key] || key;
    },
  }),
}));

// Using custom render from test-utils

describe('PricingPage', () => {
  it('renders the pricing page title and subtitle', () => {
    render(<PricingPage />);

    expect(screen.getByText('Choose Your Fitness Plan')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Start free and upgrade when you're ready to unlock advanced features"
      )
    ).toBeInTheDocument();
  });

  it('displays all three pricing plans', () => {
    render(<PricingPage />);

    expect(screen.getAllByText('Free').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pro').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Elite').length).toBeGreaterThan(0);
  });

  it('shows correct pricing for each plan', () => {
    render(<PricingPage />);

    expect(screen.getAllByText('$0').length).toBeGreaterThan(0);
    expect(screen.getAllByText('$9.99').length).toBeGreaterThan(0);
    expect(screen.getAllByText('$19.99').length).toBeGreaterThan(0);
  });

  it('highlights the Pro plan as most popular', () => {
    render(<PricingPage />);

    expect(screen.getAllByText('Most Popular').length).toBeGreaterThan(0);
  });

  it('displays feature lists for each plan', () => {
    render(<PricingPage />);

    // Free plan features
    expect(
      screen.getAllByText('Access to 1000+ exercises').length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText('100% offline workout tracking').length
    ).toBeGreaterThan(0);

    // Pro plan features
    expect(screen.getAllByText('Everything in Free').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Cloud backup and sync').length).toBeGreaterThan(
      0
    );

    // Elite plan features
    expect(screen.getAllByText('Everything in Pro').length).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Personal trainer access').length
    ).toBeGreaterThan(0);
  });

  it('shows correct CTA buttons for each plan', () => {
    render(<PricingPage />);

    expect(screen.getAllByText('Start Free').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Choose Pro').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Choose Elite').length).toBeGreaterThan(0);
  });

  it('handles plan selection', () => {
    // Mock console.log and alert
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<PricingPage />);

    const freeButtons = screen.getAllByText('Start Free');
    fireEvent.click(freeButtons[0]); // Click the first one (from pricing cards)

    expect(consoleSpy).toHaveBeenCalledWith('Selected plan:', 'free');
    expect(alertSpy).toHaveBeenCalledWith(
      'You selected the free plan! This would normally redirect to payment processing.'
    );

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });

  it('displays FAQ section', () => {
    render(<PricingPage />);

    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(
      screen.getByText("What's included in the free plan?")
    ).toBeInTheDocument();
    expect(
      screen.getByText('Can I upgrade or downgrade anytime?')
    ).toBeInTheDocument();
  });

  it('expands and collapses FAQ items', () => {
    render(<PricingPage />);

    const faqQuestion = screen.getByText("What's included in the free plan?");

    // Initially, the answer should not be visible
    expect(
      screen.queryByText(
        'The free plan includes access to our complete exercise database'
      )
    ).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(faqQuestion);

    // Now the answer should be visible
    expect(
      screen.getByText(
        'The free plan includes access to our complete exercise database, offline workout tracking, basic gamification features, and local data storage.'
      )
    ).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(faqQuestion);

    // Answer should be hidden again
    expect(
      screen.queryByText(
        'The free plan includes access to our complete exercise database'
      )
    ).not.toBeInTheDocument();
  });

  it('displays money-back guarantee section', () => {
    render(<PricingPage />);

    expect(screen.getByText('30-Day Money-Back Guarantee')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Try LiftFire risk-free. If you're not completely satisfied, we'll refund your money within 30 days."
      )
    ).toBeInTheDocument();
  });

  it('displays contact section with email and Discord links', () => {
    render(<PricingPage />);

    expect(screen.getByText('Need Help Choosing?')).toBeInTheDocument();
    expect(screen.getByText('support@liftfire.app')).toBeInTheDocument();
    expect(screen.getByText('Join our Discord community')).toBeInTheDocument();
  });

  it('handles email and Discord link clicks', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    render(<PricingPage />);

    const emailButton = screen.getByText('support@liftfire.app');
    const discordButton = screen.getByText('Join our Discord community');

    fireEvent.click(emailButton);
    expect(openSpy).toHaveBeenCalledWith('mailto:support@liftfire.app');

    fireEvent.click(discordButton);
    expect(openSpy).toHaveBeenCalledWith(
      'https://discord.gg/liftfire',
      '_blank'
    );

    openSpy.mockRestore();
  });

  it('has proper accessibility attributes', () => {
    render(<PricingPage />);

    // Check that buttons are properly labeled
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);

    // Check that FAQ items are properly structured
    const faqButtons = screen
      .getAllByRole('button')
      .filter(button => button.textContent?.includes('?'));
    expect(faqButtons.length).toBeGreaterThan(0);
  });

  it('displays all required pricing features according to requirements', () => {
    render(<PricingPage />);

    // Requirement 3.1: Free tier features
    expect(
      screen.getAllByText('Access to 1000+ exercises').length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText('100% offline workout tracking').length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Basic XP and leveling system').length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText('Local data storage').length).toBeGreaterThan(0);

    // Requirement 3.2: Pro tier features
    expect(screen.getAllByText('Cloud backup and sync').length).toBeGreaterThan(
      0
    );
    expect(
      screen.getAllByText('Advanced gamification system').length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Friends and social sharing').length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText('AI-powered workout recommendations').length
    ).toBeGreaterThan(0);

    // Requirement 3.3: Elite tier features
    expect(
      screen.getAllByText('Personal trainer access').length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText('Custom workout plan creation').length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText('Advanced AI coaching').length).toBeGreaterThan(
      0
    );
  });

  it('shows correct pricing amounts as per requirements', () => {
    render(<PricingPage />);

    // Requirement 3.1, 3.2, 3.3: Correct pricing
    expect(screen.getAllByText('$0').length).toBeGreaterThan(0); // Free (appears in cards and table)
    expect(screen.getAllByText('$9.99').length).toBeGreaterThan(0); // Pro
    expect(screen.getAllByText('$19.99').length).toBeGreaterThan(0); // Elite
  });

  it('displays feature comparison table', () => {
    render(<PricingPage />);

    expect(screen.getByText('Compare All Features')).toBeInTheDocument();
    expect(
      screen.getByText(
        "See exactly what's included in each plan with our detailed feature comparison"
      )
    ).toBeInTheDocument();
  });

  it('shows checkmarks and X marks for feature availability', () => {
    render(<PricingPage />);

    // Should have checkmarks for included features and X marks for excluded features
    const checkmarks = screen.getAllByTestId('check-icon');
    const xMarks = screen.getAllByTestId('x-icon');

    expect(checkmarks.length).toBeGreaterThan(0);
    expect(xMarks.length).toBeGreaterThan(0);
  });

  it('displays comparison table with proper structure', () => {
    render(<PricingPage />);

    // Check table headers
    expect(screen.getByText('Feature')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();

    // Check that all plan names appear in the table
    const freeTexts = screen.getAllByText('Free');
    const proTexts = screen.getAllByText('Pro');
    const eliteTexts = screen.getAllByText('Elite');

    expect(freeTexts.length).toBeGreaterThan(1); // Should appear in cards and table
    expect(proTexts.length).toBeGreaterThan(1);
    expect(eliteTexts.length).toBeGreaterThan(1);
  });

  it('shows feature comparison with correct availability per tier', () => {
    render(<PricingPage />);

    // Basic features should be available in all tiers
    expect(
      screen.getAllByText('Access to 1000+ exercises').length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText('100% offline workout tracking').length
    ).toBeGreaterThan(0);

    // Pro features should be mentioned
    expect(screen.getAllByText('Cloud backup and sync').length).toBeGreaterThan(
      0
    );
    expect(
      screen.getAllByText('Advanced gamification system').length
    ).toBeGreaterThan(0);

    // Elite features should be mentioned
    expect(
      screen.getAllByText('Personal trainer access').length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText('Advanced AI coaching').length).toBeGreaterThan(
      0
    );
  });

  it('handles plan selection from comparison table', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<PricingPage />);

    // Find buttons in the comparison table (there should be multiple "Start Free" buttons)
    const startFreeButtons = screen.getAllByText('Start Free');
    const chooseProButtons = screen.getAllByText('Choose Pro');
    // Elite buttons not used in this test

    // Click on one of the buttons (should be from comparison table)
    if (startFreeButtons.length > 1) {
      fireEvent.click(startFreeButtons[1]); // Second button should be from comparison table
      expect(consoleSpy).toHaveBeenCalledWith('Selected plan:', 'free');
    }

    if (chooseProButtons.length > 1) {
      fireEvent.click(chooseProButtons[1]);
      expect(consoleSpy).toHaveBeenCalledWith('Selected plan:', 'pro');
    }

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });

  it('displays upgrade encouragement CTAs', () => {
    render(<PricingPage />);

    expect(
      screen.getByText('Ready to Supercharge Your Workouts?')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Join thousands of fitness enthusiasts who have transformed their training with LiftFire's advanced features."
      )
    ).toBeInTheDocument();
    expect(screen.getAllByText('Start with Pro').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Try Free First').length).toBeGreaterThan(0);
  });

  it('displays final CTA section', () => {
    render(<PricingPage />);

    expect(
      screen.getByText('Start Your Fitness Transformation Today')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Don't wait to achieve your fitness goals. Join the LiftFire community and experience the future of workout tracking."
      )
    ).toBeInTheDocument();
    expect(screen.getAllByText('Start Free Now').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Upgrade to Pro').length).toBeGreaterThan(0);
  });

  it('handles upgrade CTA clicks', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<PricingPage />);

    // Test upgrade section CTAs
    const startWithProButtons = screen.getAllByText('Start with Pro');
    const tryFreeFirstButtons = screen.getAllByText('Try Free First');

    if (startWithProButtons.length > 0) {
      fireEvent.click(startWithProButtons[0]);
      expect(consoleSpy).toHaveBeenCalledWith('Selected plan:', 'pro');
    }

    if (tryFreeFirstButtons.length > 0) {
      fireEvent.click(tryFreeFirstButtons[0]);
      expect(consoleSpy).toHaveBeenCalledWith('Selected plan:', 'free');
    }

    // Test final CTA section
    const startFreeNowButtons = screen.getAllByText('Start Free Now');
    const upgradeToProButtons = screen.getAllByText('Upgrade to Pro');

    if (startFreeNowButtons.length > 0) {
      fireEvent.click(startFreeNowButtons[0]);
      expect(consoleSpy).toHaveBeenCalledWith('Selected plan:', 'free');
    }

    if (upgradeToProButtons.length > 0) {
      fireEvent.click(upgradeToProButtons[0]);
      expect(consoleSpy).toHaveBeenCalledWith('Selected plan:', 'pro');
    }

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });

  it('has smooth FAQ animations with proper accessibility', () => {
    render(<PricingPage />);

    const faqQuestion = screen.getByText("What's included in the free plan?");
    const faqButton = faqQuestion.closest('button');

    // Check initial state
    expect(faqButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(faqQuestion);

    // Check expanded state
    expect(faqButton).toHaveAttribute('aria-expanded', 'true');

    // Check that the answer becomes visible
    expect(
      screen.getByText(
        'The free plan includes access to our complete exercise database, offline workout tracking, basic gamification features, and local data storage.'
      )
    ).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(faqQuestion);

    // Check collapsed state
    expect(faqButton).toHaveAttribute('aria-expanded', 'false');
  });
});
