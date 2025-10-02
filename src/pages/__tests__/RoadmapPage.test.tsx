import { render, screen } from '../../test/test-utils';
import { describe, it, expect } from 'vitest';
import { RoadmapPage } from '../RoadmapPage';

describe('RoadmapPage', () => {
  it('renders the main title and subtitle', () => {
    render(<RoadmapPage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByText('Our Journey Ahead: The LiftFire Roadmap')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "See what's next for LiftFire. Our future plans, upcoming features, and long-term vision."
      )
    ).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<RoadmapPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
