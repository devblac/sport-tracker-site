import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { cn } from '../../utils/cn';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface HeaderProps {
  navItems?: NavItem[];
  className?: string;
}

// Simplified navigation - desktop-first, always visible
const DEFAULT_NAV: NavItem[] = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Community', href: '/community' },
  { label: 'Contact', href: '/contact' },
];

const NavLink = ({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) => {
  const baseClasses = 'text-sm font-medium transition-colors no-underline px-3 py-2 rounded-lg';
  const activeClasses = 'text-slate-100 bg-slate-800';
  const inactiveClasses = 'text-slate-400 hover:text-slate-100';

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClasses, inactiveClasses, 'flex items-center gap-1')}
      >
        {item.label}
        <span className="text-xs opacity-60">↗</span>
      </a>
    );
  }

  return (
    <Link
      to={item.href}
      className={cn(baseClasses, isActive ? activeClasses : inactiveClasses)}
    >
      {item.label}
    </Link>
  );
};

export function Header({ navItems, className }: HeaderProps) {
  const location = useLocation();
  const finalNavItems = navItems || DEFAULT_NAV;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-lg',
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
              <span className="text-white font-bold text-sm">LF</span>
            </div>
            <span className="text-base font-bold text-slate-100">LiftFire</span>
          </Link>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-1">
            {finalNavItems.map(item => (
              <NavLink key={item.label} item={item} isActive={location.pathname === item.href} />
            ))}
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher showLabel={false} />
            <ThemeToggle />
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
