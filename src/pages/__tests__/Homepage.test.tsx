import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HomePage } from '../Homepage';

// Mock the section components
vi.mock('../../components/sections/HeroSection', () => ({
  HeroSection: () => <div data-testid="hero-section">Hero Section</div>,
}));

vi.mock('../../components/sections/FeatureGrid', () => ({
  FeatureGrid: () => <div data-testid="feature-grid">Feature Grid</div>,
}));

vi.mock('../../components/sections/SocialProofSection', () => ({
  SocialProofSection: () => (
    <div data-testid="social-proof-section">Social Proof Section</div>
  ),
}));

describe('HomePage', () => {
  it('renders the hero section', () => {
    render(<HomePage />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('renders the feature grid section', () => {
    render(<HomePage />);

    expect(screen.getByTestId('feature-grid')).toBeInTheDocument();
  });

  it('renders the social proof section', () => {
    render(<HomePage />);

    expect(screen.getByTestId('social-proof-section')).toBeInTheDocument();
  });

  it('renders sections in the correct order', () => {
    render(<HomePage />);

    const heroSection = screen.getByTestId('hero-section');
    const featureGrid = screen.getByTestId('feature-grid');
    const socialProof = screen.getByTestId('social-proof-section');

    // Check that sections are in the correct order
    expect(
      heroSection.compareDocumentPosition(featureGrid) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      featureGrid.compareDocumentPosition(socialProof) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('has proper page structure', () => {
    render(<HomePage />);

    const pageContainer = screen.getByTestId('hero-section').parentElement;
    expect(pageContainer?.tagName.toLowerCase()).toBe('div');

    // Should contain all three sections
    expect(pageContainer?.children).toHaveLength(3);
  });
});
