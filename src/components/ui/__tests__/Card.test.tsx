import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../Card';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-white', 'dark:bg-gray-900', 'p-6'); // default variant and md padding
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Card variant="default">Default Card</Card>);
    expect(screen.getByText('Default Card')).toHaveClass(
      'bg-white',
      'border',
      'border-gray-200'
    );

    rerender(<Card variant="elevated">Elevated Card</Card>);
    expect(screen.getByText('Elevated Card')).toHaveClass(
      'shadow-lg',
      'hover:shadow-xl'
    );

    rerender(<Card variant="outlined">Outlined Card</Card>);
    expect(screen.getByText('Outlined Card')).toHaveClass(
      'bg-transparent',
      'border-2'
    );
  });

  it('renders with different padding sizes', () => {
    const { rerender } = render(<Card padding="none">No padding</Card>);
    expect(screen.getByText('No padding')).not.toHaveClass('p-4', 'p-6', 'p-8');

    rerender(<Card padding="sm">Small padding</Card>);
    expect(screen.getByText('Small padding')).toHaveClass('p-4');

    rerender(<Card padding="md">Medium padding</Card>);
    expect(screen.getByText('Medium padding')).toHaveClass('p-6');

    rerender(<Card padding="lg">Large padding</Card>);
    expect(screen.getByText('Large padding')).toHaveClass('p-8');
  });

  it('applies custom className', () => {
    render(<Card className="custom-class">Custom Card</Card>);
    expect(screen.getByText('Custom Card')).toHaveClass('custom-class');
  });
});

describe('Card sub-components', () => {
  it('renders CardHeader correctly', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toHaveClass(
      'flex',
      'flex-col',
      'space-y-1.5'
    );
  });

  it('renders CardTitle correctly', () => {
    render(<CardTitle>Card Title</CardTitle>);
    const title = screen.getByText('Card Title');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('text-xl', 'font-semibold');
  });

  it('renders CardDescription correctly', () => {
    render(<CardDescription>Card description</CardDescription>);
    const description = screen.getByText('Card description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm', 'text-gray-600');
  });

  it('renders CardContent correctly', () => {
    render(<CardContent>Card content</CardContent>);
    expect(screen.getByText('Card content')).toHaveClass('pt-0');
  });

  it('renders CardFooter correctly', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toHaveClass(
      'flex',
      'items-center',
      'pt-0'
    );
  });

  it('renders complete card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});
