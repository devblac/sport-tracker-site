import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { CommunityPage } from '../CommunityPage';
import '../../i18n/config';

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
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

describe('CommunityPage', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear();
  });

  it('renders the community page with hero section', () => {
    renderWithProviders(<CommunityPage />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByText(/join the liftfire community/i)
    ).toBeInTheDocument();
  });

  it('displays community statistics', () => {
    renderWithProviders(<CommunityPage />);

    expect(screen.getByText('10,000+')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('1M+')).toBeInTheDocument();
    expect(screen.getByText('Workouts Tracked')).toBeInTheDocument();
    expect(screen.getByText('4.8/5')).toBeInTheDocument();
    expect(screen.getByText('Community Rating')).toBeInTheDocument();
  });

  it('displays community channels with correct information', () => {
    renderWithProviders(<CommunityPage />);

    expect(screen.getByText('Discord Server')).toBeInTheDocument();
    expect(screen.getByText('GitHub Repository')).toBeInTheDocument();
    expect(screen.getByText('Twitter Community')).toBeInTheDocument();
    expect(screen.getByText('Reddit Community')).toBeInTheDocument();

    // Check member counts
    expect(screen.getByText('2,500+ members')).toBeInTheDocument();
    expect(screen.getByText('150+ members')).toBeInTheDocument();
    expect(screen.getByText('1,200+ members')).toBeInTheDocument();
    expect(screen.getByText('800+ members')).toBeInTheDocument();
  });

  it('opens external links when community buttons are clicked', () => {
    renderWithProviders(<CommunityPage />);

    const joinButtons = screen.getAllByText('Join Community');

    // Click Discord button
    fireEvent.click(joinButtons[0]);
    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://discord.gg/liftfire',
      '_blank',
      'noopener,noreferrer'
    );

    // Click GitHub button
    fireEvent.click(joinButtons[1]);
    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://github.com/liftfire/liftfire',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('displays beta program section', () => {
    renderWithProviders(<CommunityPage />);

    expect(screen.getByText(/join our beta program/i)).toBeInTheDocument();
    expect(screen.getByText(/get early access/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /join beta program/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /learn more/i })
    ).toBeInTheDocument();
  });

  it('displays community guidelines', () => {
    renderWithProviders(<CommunityPage />);

    expect(screen.getByText(/community guidelines/i)).toBeInTheDocument();
    expect(screen.getByText('Be Respectful')).toBeInTheDocument();
    expect(screen.getByText('Be Helpful')).toBeInTheDocument();
    expect(screen.getByText('Be Constructive')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<CommunityPage />);

    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeEnabled();
    });
  });

  it('is responsive and works on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    renderWithProviders(<CommunityPage />);

    // Check that content is still accessible
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Discord Server')).toBeInTheDocument();
  });
});
