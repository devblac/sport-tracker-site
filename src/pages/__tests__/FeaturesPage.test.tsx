import { render, screen } from '../../test/test-utils';
import { describe, it, expect } from 'vitest';
import { FeaturesPage } from '../FeaturesPage';

describe('FeaturesPage', () => {
  it('renders the page title and subtitle', () => {
    render(<FeaturesPage />);
    expect(
      screen.getByText(/Discover everything that makes/)
    ).toBeInTheDocument();
    expect(screen.getByText(/LiftFire unbeatable/)).toBeInTheDocument();
  });

  it('displays feature cards', () => {
    render(<FeaturesPage />);
    // Check for core features
    expect(screen.getByText('Progressive Web App (PWA)')).toBeInTheDocument();
    expect(
      screen.getByText('1000+ Exercises at Your Fingertips')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Works Everywhere, Syncs Everywhere')
    ).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<FeaturesPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
