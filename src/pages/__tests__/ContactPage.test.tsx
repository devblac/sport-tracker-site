import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { ContactPage } from '../ContactPage';
import '../../i18n/config';

// Mock window.open and window.location
const mockWindowOpen = vi.fn();
const mockLocationHref = vi.fn();

Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
});

Object.defineProperty(window, 'location', {
  value: {
    href: mockLocationHref,
  },
  writable: true,
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>{component}</LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe('ContactPage', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear();
    mockLocationHref.mockClear();
  });

  it('renders the contact page with hero section', () => {
    renderWithProviders(<ContactPage />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
  });

  it('displays all contact methods', () => {
    renderWithProviders(<ContactPage />);

    expect(screen.getByText('General Support')).toBeInTheDocument();
    expect(screen.getByText('Bug Reports')).toBeInTheDocument();
    expect(screen.getByText('Feature Requests')).toBeInTheDocument();
    expect(screen.getByText('Partnerships')).toBeInTheDocument();
    expect(screen.getByText('Press & Media')).toBeInTheDocument();
    expect(screen.getByText('Community Chat')).toBeInTheDocument();
  });

  it('opens correct links when contact method buttons are clicked', () => {
    renderWithProviders(<ContactPage />);

    // Test email support
    const emailSupportButton = screen.getByText('Email Support');
    fireEvent.click(emailSupportButton);
    expect(mockLocationHref).toHaveBeenCalledWith(
      'mailto:support@liftfire.app'
    );

    // Test Discord
    const discordButton = screen.getByText('Join Discord');
    fireEvent.click(discordButton);
    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://discord.gg/liftfire',
      '_blank',
      'noopener,noreferrer'
    );

    // Test GitHub bug reports
    const bugReportButton = screen.getByText('Report Bug');
    fireEvent.click(bugReportButton);
    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://github.com/liftfire/liftfire/issues/new?template=bug_report.md',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('renders contact form with all required fields', () => {
    renderWithProviders(<ContactPage />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('validates required form fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactPage />);

    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Try to submit empty form
    await user.click(submitButton);

    // HTML5 validation should prevent submission
    const nameInput = screen.getByLabelText(/full name/i);
    expect(nameInput).toBeRequired();
    expect(nameInput).toBeInvalid();
  });

  it('allows form submission with valid data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactPage />);

    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(
      screen.getByLabelText(/email address/i),
      'john@example.com'
    );
    await user.selectOptions(screen.getByLabelText(/category/i), 'technical');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(
      screen.getByLabelText(/message/i),
      'This is a test message.'
    );

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Check that the button shows loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument();

    // Wait for success message
    await waitFor(
      () => {
        expect(
          screen.getByText(/thank you for your message/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('displays all category options in the select dropdown', () => {
    renderWithProviders(<ContactPage />);

    const categorySelect = screen.getByLabelText(/category/i);

    expect(
      screen.getByRole('option', { name: /general support/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /technical support/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /billing/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /partnerships/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /press/i })).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /feedback/i })
    ).toBeInTheDocument();
  });

  it('clears form after successful submission', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactPage />);

    // Fill out the form
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'This is a test message.');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for success and form reset
    await waitFor(
      () => {
        expect(nameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(subjectInput).toHaveValue('');
        expect(messageInput).toHaveValue('');
      },
      { timeout: 3000 }
    );
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<ContactPage />);

    // Check form labels
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);

    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');

    // Check headings hierarchy
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('is responsive and works on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    renderWithProviders(<ContactPage />);

    // Check that content is still accessible
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });
});
