import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useCommonTranslations } from '../../hooks/useTranslations';
import { cn } from '../../utils/cn';

// Simple SVG icons
const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-6 w-6', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-6 w-6', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const LiftFireLogo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center space-x-2', className)}>
    <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-lg">L</span>
    </div>
    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
      LiftFire
    </span>
  </div>
);

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface HeaderProps {
  navItems?: NavItem[];
  className?: string;
}

export function Header({ navItems, className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { buttons, navigation } = useCommonTranslations();
  const location = useLocation();

  // Use translated navigation items if none provided
  const translatedNavItems: NavItem[] = [
    { label: navigation.home, href: '/' },
    { label: navigation.features, href: '/features' },
    { label: navigation.pricing, href: '/pricing' },
    { label: navigation.roadmap, href: '/roadmap' },
    { label: navigation.community, href: '/community' },
    { label: navigation.contact, href: '/contact' },
  ];

  const finalNavItems = navItems || translatedNavItems;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <Container size="xl" padding="md">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center"
              onClick={closeMobileMenu}
            >
              <LiftFireLogo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {finalNavItems.map(item => {
              const isActive = location.pathname === item.href;
              return item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="primary" size="sm">
              {buttons.startJourney}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageSwitcher variant="button" showLabel={false} />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen
              ? 'max-h-96 opacity-100 pb-6'
              : 'max-h-0 opacity-0 pb-0'
          )}
        >
          <nav className="flex flex-col space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {finalNavItems.map(item => {
              const isActive = location.pathname === item.href;
              return item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 py-2"
                  onClick={closeMobileMenu}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'text-base font-medium transition-colors duration-200 py-2',
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  )}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              <Button variant="primary" size="md" className="w-full">
                {buttons.startJourney}
              </Button>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
