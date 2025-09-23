import { render, screen } from '@testing-library/react';
import { Heading, Text } from '../Typography';

describe('Heading', () => {
  it('renders with default props (h1)', () => {
    render(<Heading>Default Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl');
  });

  it('renders different heading levels', () => {
    const { rerender } = render(<Heading level={1}>H1 Heading</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    rerender(<Heading level={2}>H2 Heading</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();

    rerender(<Heading level={3}>H3 Heading</Heading>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();

    rerender(<Heading level={4}>H4 Heading</Heading>);
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();

    rerender(<Heading level={5}>H5 Heading</Heading>);
    expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();

    rerender(<Heading level={6}>H6 Heading</Heading>);
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });

  it('applies correct size classes for each level', () => {
    const { rerender } = render(<Heading level={1}>H1</Heading>);
    expect(screen.getByRole('heading')).toHaveClass(
      'text-4xl',
      'md:text-5xl',
      'lg:text-6xl'
    );

    rerender(<Heading level={2}>H2</Heading>);
    expect(screen.getByRole('heading')).toHaveClass(
      'text-3xl',
      'md:text-4xl',
      'lg:text-5xl'
    );

    rerender(<Heading level={3}>H3</Heading>);
    expect(screen.getByRole('heading')).toHaveClass(
      'text-2xl',
      'md:text-3xl',
      'lg:text-4xl'
    );

    rerender(<Heading level={6}>H6</Heading>);
    expect(screen.getByRole('heading')).toHaveClass(
      'text-base',
      'md:text-lg',
      'lg:text-xl'
    );
  });

  it('renders with gradient variant', () => {
    render(<Heading variant="gradient">Gradient Heading</Heading>);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass(
      'bg-gradient-to-r',
      'from-primary-500',
      'to-secondary-500',
      'bg-clip-text',
      'text-transparent'
    );
  });

  it('applies custom className', () => {
    render(<Heading className="custom-class">Custom Heading</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('custom-class');
  });
});

describe('Text', () => {
  it('renders with default props', () => {
    render(<Text>Default text</Text>);
    const text = screen.getByText('Default text');
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('P');
    expect(text).toHaveClass('text-base', 'text-gray-700');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Text variant="default">Default text</Text>);
    expect(screen.getByText('Default text')).toHaveClass(
      'text-base',
      'text-gray-700'
    );

    rerender(<Text variant="muted">Muted text</Text>);
    expect(screen.getByText('Muted text')).toHaveClass(
      'text-sm',
      'text-gray-600'
    );

    rerender(<Text variant="small">Small text</Text>);
    expect(screen.getByText('Small text')).toHaveClass(
      'text-sm',
      'text-gray-700'
    );

    rerender(<Text variant="large">Large text</Text>);
    expect(screen.getByText('Large text')).toHaveClass(
      'text-lg',
      'text-gray-700'
    );

    rerender(<Text variant="lead">Lead text</Text>);
    expect(screen.getByText('Lead text')).toHaveClass(
      'text-xl',
      'text-gray-600',
      'font-light'
    );
  });

  it('applies custom className', () => {
    render(<Text className="custom-class">Custom text</Text>);
    expect(screen.getByText('Custom text')).toHaveClass('custom-class');
  });
});
