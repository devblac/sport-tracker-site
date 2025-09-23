import { render, screen } from '@testing-library/react';
import { Container } from '../Container';

describe('Container', () => {
  it('renders with default props', () => {
    render(<Container>Container content</Container>);
    const container = screen.getByText('Container content');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      'mx-auto',
      'w-full',
      'max-w-6xl',
      'px-4',
      'sm:px-6',
      'lg:px-8'
    ); // lg size, md padding
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Container size="sm">Small container</Container>
    );
    expect(screen.getByText('Small container')).toHaveClass('max-w-2xl');

    rerender(<Container size="md">Medium container</Container>);
    expect(screen.getByText('Medium container')).toHaveClass('max-w-4xl');

    rerender(<Container size="lg">Large container</Container>);
    expect(screen.getByText('Large container')).toHaveClass('max-w-6xl');

    rerender(<Container size="xl">Extra large container</Container>);
    expect(screen.getByText('Extra large container')).toHaveClass('max-w-7xl');

    rerender(<Container size="full">Full width container</Container>);
    expect(screen.getByText('Full width container')).toHaveClass('max-w-none');
  });

  it('renders with different padding sizes', () => {
    const { rerender } = render(
      <Container padding="none">No padding</Container>
    );
    const container = screen.getByText('No padding');
    expect(container).not.toHaveClass('px-4', 'px-6', 'px-8');

    rerender(<Container padding="sm">Small padding</Container>);
    expect(screen.getByText('Small padding')).toHaveClass('px-4', 'sm:px-6');

    rerender(<Container padding="md">Medium padding</Container>);
    expect(screen.getByText('Medium padding')).toHaveClass(
      'px-4',
      'sm:px-6',
      'lg:px-8'
    );

    rerender(<Container padding="lg">Large padding</Container>);
    expect(screen.getByText('Large padding')).toHaveClass(
      'px-6',
      'sm:px-8',
      'lg:px-12'
    );
  });

  it('applies custom className', () => {
    render(<Container className="custom-class">Custom container</Container>);
    expect(screen.getByText('Custom container')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Container ref={ref}>Container with ref</Container>);
    expect(ref).toHaveBeenCalled();
  });

  it('passes through other HTML attributes', () => {
    render(<Container data-testid="test-container">Container</Container>);
    expect(screen.getByTestId('test-container')).toBeInTheDocument();
  });
});
