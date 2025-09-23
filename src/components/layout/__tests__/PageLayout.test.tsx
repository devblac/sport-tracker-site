import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../contexts/ThemeContext';
import { PageLayout } from '../PageLayout';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { vi } from 'vitest';
import { beforeEach } from 'vitest';
import { describe } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';

// Mock localStorage for ThemeProvider
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia for ThemeProvider
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const PageLayoutWrapper = ({ children, ...props }: any) => (
  <ThemeProvider>
    <PageLayout {...props}>{children}</PageLayout>
  </ThemeProvider>
);

describe('PageLayout', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    vi.clearAllMocks();

    // Reset document title and meta tags
    document.title = '';
    document
      .querySelectorAll(
        'meta[name="description"], meta[name="keywords"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]'
      )
      .forEach(el => el.remove());
  });

  it('renders children content', () => {
    render(
      <PageLayoutWrapper>
        <div>Test Content</div>
      </PageLayoutWrapper>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders header and footer by default', () => {
    render(
      <PageLayoutWrapper>
        <div>Content</div>
      </PageLayoutWrapper>
    );

    // Check for header (LiftFire logo)
    expect(screen.getByText('LiftFire')).toBeInTheDocument();

    // Check for footer (copyright)
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} LiftFire. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('can exclude header when includeHeader is false', () => {
    render(
      <PageLayoutWrapper includeHeader={false}>
        <div>Content</div>
      </PageLayoutWrapper>
    );

    expect(screen.queryByText('LiftFire')).not.toBeInTheDocument();
  });

  it('can exclude footer when includeFooter is false', () => {
    render(
      <PageLayoutWrapper includeFooter={false}>
        <div>Content</div>
      </PageLayoutWrapper>
    );

    const currentYear = new Date().getFullYear();
    expect(
      screen.queryByText(`© ${currentYear} LiftFire. All rights reserved.`)
    ).not.toBeInTheDocument();
  });

  it('sets document title with meta', () => {
    render(
      <PageLayoutWrapper meta={{ title: 'Custom Page Title' }}>
        <div>Content</div>
      </PageLayoutWrapper>
    );

    expect(document.title).toBe('Custom Page Title | LiftFire');
  });

  it('sets document title without appending LiftFire if already included', () => {
    render(
      <PageLayoutWrapper meta={{ title: 'LiftFire - Custom Page' }}>
        <div>Content</div>
      </PageLayoutWrapper>
    );

    expect(document.title).toBe('LiftFire - Custom Page');
  });

  it('sets meta description', () => {
    render(
      <PageLayoutWrapper meta={{ description: 'Custom page description' }}>
        <div>Content</div>
      </PageLayoutWrapper>
    );

    const descriptionMeta = document.querySelector('meta[name="description"]');
    expect(descriptionMeta).toHaveAttribute(
      'content',
      'Custom page description'
    );
  });

  it('sets meta keywords', () => {
    render(
      <PageLayoutWrapper
        meta={{ keywords: ['keyword1', 'keyword2', 'keyword3'] }}
      >
        <div>Content</div>
      </PageLayoutWrapper>
    );

    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    expect(keywordsMeta).toHaveAttribute(
      'content',
      'keyword1, keyword2, keyword3'
    );
  });

  it('sets Open Graph meta tags', () => {
    render(
      <PageLayoutWrapper
        meta={{
          ogImage: 'https://example.com/image.jpg',
          ogType: 'article',
        }}
      >
        <div>Content</div>
      </PageLayoutWrapper>
    );

    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    expect(ogImageMeta).toHaveAttribute(
      'content',
      'https://example.com/image.jpg'
    );

    const ogTypeMeta = document.querySelector('meta[property="og:type"]');
    expect(ogTypeMeta).toHaveAttribute('content', 'article');
  });

  it('sets Twitter Card meta tags', () => {
    render(
      <PageLayoutWrapper meta={{ twitterCard: 'summary_large_image' }}>
        <div>Content</div>
      </PageLayoutWrapper>
    );

    const twitterCardMeta = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCardMeta).toHaveAttribute('content', 'summary_large_image');
  });

  it('sets canonical URL', () => {
    render(
      <PageLayoutWrapper meta={{ canonicalUrl: 'https://liftfire.app/page' }}>
        <div>Content</div>
      </PageLayoutWrapper>
    );

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    expect(canonicalLink).toHaveAttribute('href', 'https://liftfire.app/page');
  });

  it('uses default meta values when not provided', () => {
    render(
      <PageLayoutWrapper>
        <div>Content</div>
      </PageLayoutWrapper>
    );

    expect(document.title).toBe('LiftFire - Transform Your Fitness Journey');

    const descriptionMeta = document.querySelector('meta[name="description"]');
    expect(descriptionMeta?.getAttribute('content')).toContain(
      'LiftFire is a gamified gym tracker'
    );
  });

  it('passes props to header and footer', () => {
    const customNavItems = [{ label: 'Custom Nav', href: '/custom' }];
    const customSections = [{ title: 'Custom Section', links: [] }];

    render(
      <PageLayoutWrapper
        headerProps={{ navItems: customNavItems }}
        footerProps={{ sections: customSections }}
      >
        <div>Content</div>
      </PageLayoutWrapper>
    );

    expect(screen.getAllByText('Custom Nav').length).toBeGreaterThan(0);
    expect(screen.getByText('Custom Section')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <PageLayoutWrapper className="custom-layout">
        <div>Content</div>
      </PageLayoutWrapper>
    );

    expect(container.firstChild).toHaveClass('custom-layout');
  });

  it('has proper semantic structure', () => {
    render(
      <PageLayoutWrapper>
        <div>Content</div>
      </PageLayoutWrapper>
    );

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent('Content');
  });
});
