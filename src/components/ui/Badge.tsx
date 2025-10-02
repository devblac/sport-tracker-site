import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      glow = false,
      pulse = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300';

    const variants = {
      default:
        'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
      primary:
        'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30',
      secondary:
        'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30',
      success:
        'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30',
      warning:
        'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30',
      error:
        'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30',
      info: 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/30',
      outline: 'border-2 border-current text-foreground hover:bg-muted',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-3 py-1 text-sm gap-1.5',
      lg: 'px-4 py-1.5 text-base gap-2',
    };

    const glowEffect = glow ? 'shadow-2xl animate-pulse' : '';

    const pulseEffect = pulse ? 'animate-pulse' : '';

    return (
      <span
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          glowEffect,
          pulseEffect,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
