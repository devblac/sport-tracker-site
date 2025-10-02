import { render, screen } from '../../../test/test-utils';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders default footer sections', () => {
    render(<Footer />);

    // Check for default section titles
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('renders default footer links', () => {
    render(<Footer />);

    // Check for some default links
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Discord Server')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders custom sections', () => {
    const customSections = [
      {
        title: 'Custom Section',
        links: [
          { label: 'Custom Link 1', href: '/custom1' },
          { label: 'Custom Link 2', href: '/custom2' },
        ],
      },
    ];

    render(<Footer sections={customSections} />);

    expect(screen.getByText('Custom Section')).toBeInTheDocument();
    expect(screen.getByText('Custom Link 1')).toBeInTheDocument();
    expect(screen.getByText('Custom Link 2')).toBeInTheDocument();
    expect(screen.queryByText('Product')).not.toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);

    // Check for social media links by aria-label
    expect(screen.getByLabelText('Follow us on GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on Discord')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on Twitter')).toBeInTheDocument();
  });

  it('renders custom social links', () => {
    const customSocialLinks = [
      {
        name: 'Custom Social',
        href: 'https://custom.com',
        icon: ({ className }: { className?: string }) => (
          <div className={className} data-testid="custom-icon">
            Custom Icon
          </div>
        ),
      },
    ];

    render(<Footer socialLinks={customSocialLinks} />);

    expect(
      screen.getByLabelText('Follow us on Custom Social')
    ).toBeInTheDocument();
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('displays current year in copyright', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} LiftFire. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('handles external links correctly', () => {
    const sectionsWithExternal = [
      {
        title: 'Test Section',
        links: [
          { label: 'Internal Link', href: '/internal' },
          {
            label: 'External Link',
            href: 'https://external.com',
            external: true,
          },
        ],
      },
    ];

    render(<Footer sections={sectionsWithExternal} />);

    const externalLink = screen.getByText('External Link');
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');

    const internalLink = screen.getByText('Internal Link');
    expect(internalLink).not.toHaveAttribute('target');
    expect(internalLink).not.toHaveAttribute('rel');
  });

  it('applies custom className', () => {
    const { container } = render(<Footer className="custom-footer" />);
    expect(container.firstChild).toHaveClass('custom-footer');
  });

  it('has proper semantic structure', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    // Check for proper heading structure
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders LiftFire logo in footer', () => {
    render(<Footer />);

    // Check for the logo element (LF in a colored box)
    const logoText = screen.getByText('LF');
    expect(logoText).toBeInTheDocument();
    expect(logoText).toHaveClass('text-white', 'font-bold', 'text-sm');
  });

  it('social links open in new tab', () => {
    render(<Footer />);

    const socialLinks = [
      screen.getByLabelText('Follow us on GitHub'),
      screen.getByLabelText('Follow us on Discord'),
      screen.getByLabelText('Follow us on Twitter'),
    ];

    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
