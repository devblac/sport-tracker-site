import { render, screen } from '../../../test/test-utils';
import { describe, it, expect } from 'vitest';
import { PageLayout } from '../PageLayout';

describe('PageLayout', () => {
  it('renders basic layout with content', () => {
    render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    );

    // Check content
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // Check header and footer
    expect(screen.getAllByText('LF')[0]).toBeInTheDocument();
    expect(screen.getByText('LiftFire')).toBeInTheDocument();
    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} LiftFire. All rights reserved.`
      )
    ).toBeInTheDocument();
  });

  it('handles meta tags', () => {
    render(
      <PageLayout
        meta={{
          title: 'Custom Page Title',
          description: 'Custom page description',
          keywords: 'custom, keywords',
        }}
      >
        <div>Content</div>
      </PageLayout>
    );

    // Check meta tags
    const title = document.title;
    const description = document.querySelector('meta[name="description"]');
    const keywords = document.querySelector('meta[name="keywords"]');

    expect(title).toBe('Custom Page Title | LiftFire');
    expect(description).toHaveAttribute('content', 'Custom page description');
    expect(keywords).toHaveAttribute('content', 'custom, keywords');
  });

  it('has proper semantic structure', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
