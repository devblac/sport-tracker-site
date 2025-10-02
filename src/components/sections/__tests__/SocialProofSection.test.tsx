import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SocialProofSection } from '../SocialProofSection';
import { useTranslations } from '../../../hooks/useTranslations';

// Mock the useTranslations hook
vi.mock('../../../hooks/useTranslations');

const mockTestimonials = [
  {
    quote:
      'LiftFire has completely transformed how I approach my workouts. The gamification keeps me motivated every single day.',
    author: 'Sarah Chen',
    role: 'Fitness Enthusiast',
  },
  {
    quote:
      'Finally, a gym tracker that works offline! Perfect for my basement gym setup.',
    author: 'Mike Rodriguez',
    role: 'Home Gym Owner',
  },
  {
    quote:
      'The social features are amazing. My gym buddies and I love competing on the leaderboards.',
    author: 'Alex Thompson',
    role: 'Personal Trainer',
  },
];

const mockTranslations = {
  'homepage:socialProof.title': 'Trusted by Fitness Enthusiasts Worldwide',
  'homepage:socialProof.stats.users': '10,000+ Active Users',
  'homepage:socialProof.stats.workouts': '1M+ Workouts Tracked',
  'homepage:socialProof.stats.satisfaction': '95% User Satisfaction',
  'homepage:socialProof.stats.languages': 'Available in 12 Languages',
  'homepage:socialProof.testimonials.title': 'What Our Users Say',
  'homepage:socialProof.testimonials.items': mockTestimonials,
};

const mockT = vi.fn((key: string, options?: any) => {
  if (options?.returnObjects) {
    return mockTranslations[key as keyof typeof mockTranslations];
  }
  return mockTranslations[key as keyof typeof mockTranslations] || key;
});

describe('SocialProofSection', () => {
  beforeEach(() => {
    vi.mocked(useTranslations).mockReturnValue({ t: mockT });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the social proof section with title', () => {
    render(<SocialProofSection />);

    expect(
      screen.getByText('Trusted by Fitness Enthusiasts Worldwide')
    ).toBeInTheDocument();
  });

  it('displays all statistics with correct values', () => {
    render(<SocialProofSection />);

    expect(screen.getByText('10,000+ Active Users')).toBeInTheDocument();
    expect(screen.getByText('1M+ Workouts Tracked')).toBeInTheDocument();
    expect(screen.getByText('95% User Satisfaction')).toBeInTheDocument();
    expect(screen.getByText('Available in 12 Languages')).toBeInTheDocument();
  });

  it('displays testimonials section title', () => {
    render(<SocialProofSection />);

    expect(screen.getByText('What Our Users Say')).toBeInTheDocument();
  });

  it('displays the first testimonial by default', () => {
    render(<SocialProofSection />);

    expect(
      screen.getByText(/LiftFire has completely transformed/)
    ).toBeInTheDocument();
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Fitness Enthusiast')).toBeInTheDocument();
  });

  it('shows navigation buttons for testimonials', () => {
    render(<SocialProofSection />);

    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
    expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument();
  });

  it('shows dot indicators for testimonials', () => {
    render(<SocialProofSection />);

    const dots = screen.getAllByLabelText(/Go to testimonial/);
    expect(dots).toHaveLength(3);
  });

  it('navigates to next testimonial when next button is clicked', async () => {
    render(<SocialProofSection />);

    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);

    await waitFor(
      () => {
        expect(
          screen.getByText(/Finally, a gym tracker that works offline/)
        ).toBeInTheDocument();
        expect(screen.getByText('Mike Rodriguez')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });

  it('navigates to previous testimonial when previous button is clicked', async () => {
    render(<SocialProofSection />);

    // First go to next testimonial
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);

    await waitFor(
      () => {
        expect(screen.getByText('Mike Rodriguez')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Then go back to previous
    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton);

    await waitFor(
      () => {
        expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });

  it('navigates to specific testimonial when dot is clicked', () => {
    render(<SocialProofSection />);

    const thirdDot = screen.getByLabelText('Go to testimonial 3');
    fireEvent.click(thirdDot);

    // Check that the third testimonial content is present
    expect(
      screen.getByText(/The social features are amazing/)
    ).toBeInTheDocument();
    expect(screen.getByText('Alex Thompson')).toBeInTheDocument();
  });

  it('has navigation buttons that can be clicked', () => {
    render(<SocialProofSection />);

    const nextButton = screen.getByLabelText('Next testimonial');
    const prevButton = screen.getByLabelText('Previous testimonial');

    // Buttons should be clickable
    expect(nextButton).toBeEnabled();
    expect(prevButton).toBeEnabled();

    // Click next button
    fireEvent.click(nextButton);

    // Should show second testimonial content
    expect(
      screen.getByText(/Finally, a gym tracker that works offline/)
    ).toBeInTheDocument();
  });

  it('handles touch events on testimonial container', () => {
    render(<SocialProofSection />);

    const testimonialContainer = screen
      .getByText('Sarah Chen')
      .closest('[class*="relative h-"]');
    expect(testimonialContainer).toBeInTheDocument();

    // Should handle touch events without errors
    fireEvent.touchStart(testimonialContainer!, {
      targetTouches: [{ clientX: 100 }],
    });

    fireEvent.touchMove(testimonialContainer!, {
      targetTouches: [{ clientX: 40 }],
    });

    fireEvent.touchEnd(testimonialContainer!);

    // Component should still be rendered
    expect(testimonialContainer).toBeInTheDocument();
  });

  it('wraps around testimonials correctly', () => {
    render(<SocialProofSection />);

    // Navigate to last testimonial
    const thirdDot = screen.getByLabelText('Go to testimonial 3');
    fireEvent.click(thirdDot);

    expect(screen.getByText('Alex Thompson')).toBeInTheDocument();

    // Click next to wrap around
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);

    // Should show first testimonial
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });

  it('wraps around to last testimonial when going previous from first', () => {
    render(<SocialProofSection />);

    // Should start with first testimonial
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();

    // Click previous to wrap around to last
    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton);

    // Should show last testimonial
    expect(screen.getByText('Alex Thompson')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<SocialProofSection />);

    expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
    expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to testimonial 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to testimonial 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to testimonial 3')).toBeInTheDocument();
  });

  it('displays user avatars with initials', () => {
    render(<SocialProofSection />);

    // Should show first letter of first testimonial author
    expect(screen.getByText('S')).toBeInTheDocument(); // Sarah Chen
  });

  it('applies correct styling for active testimonial dot', () => {
    render(<SocialProofSection />);

    const firstDot = screen.getByLabelText('Go to testimonial 1');
    const secondDot = screen.getByLabelText('Go to testimonial 2');

    // First dot should be active (have gradient background)
    expect(firstDot).toHaveClass(
      'bg-gradient-to-r',
      'from-blue-500',
      'to-purple-600'
    );
    expect(secondDot).not.toHaveClass('bg-gradient-to-r');
  });
});
