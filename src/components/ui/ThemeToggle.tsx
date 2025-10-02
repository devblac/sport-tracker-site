import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './Button';
import { cn } from '../../utils/cn';

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-5 w-5', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-5 w-5', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SystemIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-5 w-5', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown';
  className?: string;
}

export function ThemeToggle({
  variant = 'button',
  className,
}: ThemeToggleProps) {
  const { theme, setTheme, actualTheme } = useTheme();

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <select
          value={theme}
          onChange={e =>
            setTheme(e.target.value as 'light' | 'dark' | 'system')
          }
          className="appearance-none rounded-xl border border-white/15 bg-slate-900/80 px-3 py-2 pr-8 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    );
  }

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = [
      'light',
      'dark',
      'system',
    ];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    if (theme === 'system') {
      return <SystemIcon className="text-white/80" />;
    }
    return actualTheme === 'dark' ? (
      <MoonIcon className="text-white/80" />
    ) : (
      <SunIcon className="text-white/80" />
    );
  };

  const getAriaLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark theme';
      case 'dark':
        return 'Switch to system theme';
      case 'system':
        return 'Switch to light theme';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <Button
      variant="glass"
      size="sm"
      onClick={cycleTheme}
      className={cn(
        'flex items-center gap-2 rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20',
        className
      )}
      aria-label={getAriaLabel()}
      title={`Current theme: ${theme}`}
    >
      {getIcon()}
      <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
        {theme === 'system' ? 'AUTO' : theme === 'dark' ? 'DARK' : 'LIGHT'}
      </span>
    </Button>
  );
}
