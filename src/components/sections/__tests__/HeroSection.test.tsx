import React from 'react';
import { render, screen } from '../../../test/test-utils';
import { describe, it, expect } from 'vitest';
import { HeroSection } from '../HeroSection';

describe('HeroSection', () => {
  it('renders main content', () => {
    render(<HeroSection />);

    // Check main headline
    expect(
      screen.getByText(/Train smarter, stay consistent, and/)
    ).toBeInTheDocument();
    expect(screen.getByText(/level up every session/)).toBeInTheDocument();

    // Check subheadline
    expect(
      screen.getByText(/LiftFire is the gamified workout companion/)
    ).toBeInTheDocument();

    // Check CTA links
    expect(
      screen.getByRole('link', { name: /Join the waitlist/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Watch feature tour/i })
    ).toBeInTheDocument();

    // Check feature cards
    expect(screen.getByText('Offline-first logging')).toBeInTheDocument();
    expect(screen.getByText('AI coaching cues')).toBeInTheDocument();
    expect(screen.getByText('Progress you can feel')).toBeInTheDocument();

    // Check stats
    expect(screen.getByText('10,000+ lifters')).toBeInTheDocument();
    expect(screen.getByText('4.9/5')).toBeInTheDocument();
  });

  it('renders phone preview card', () => {
    render(<HeroSection />);

    // Check card header
    expect(screen.getByText('Session · Upper push')).toBeInTheDocument();
    expect(screen.getByText('Offline mode')).toBeInTheDocument();

    // Check welcome message
    expect(screen.getByText('Welcome back, Alex')).toBeInTheDocument();
    expect(screen.getByText('Ready to crush your goals?')).toBeInTheDocument();

    // Check stats
    expect(screen.getByText('Workout streak')).toBeInTheDocument();
    expect(screen.getByText('12 days')).toBeInTheDocument();
    expect(screen.getByText('XP earned')).toBeInTheDocument();
    expect(screen.getByText('3,240')).toBeInTheDocument();
    expect(screen.getByText('Crew challenge')).toBeInTheDocument();
    expect(screen.getByText('+18%')).toBeInTheDocument();

    // Check AI insight
    expect(screen.getByText('AI insight')).toBeInTheDocument();
    expect(
      screen.getByText(/You hit a 4-week volume PR on bench/)
    ).toBeInTheDocument();
  });
});
