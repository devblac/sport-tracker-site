import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'outline'
    | 'gradient'
    | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  asChild?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      children,
      asChild = false,
      icon,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group';

    const variants = {
      primary:
        'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform',
      secondary:
        'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform',
      ghost:
        'text-blue-600 hover:bg-blue-50 active:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-950 dark:active:bg-blue-900 hover:scale-105 active:scale-95 transform',
      outline:
        'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transform dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900',
      gradient:
        'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform animate-gradient bg-[length:200%_200%]',
      glass:
        'backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform dark:bg-gray-900/10 dark:border-gray-700/20',
    };

    const sizes = {
      sm: 'h-10 px-4 text-sm gap-2',
      md: 'h-12 px-6 text-base gap-2',
      lg: 'h-14 px-8 text-lg gap-3',
      xl: 'h-16 px-10 text-xl gap-3',
    };

    const Component = asChild ? 'span' : 'button';

    return (
      <Component
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        type={asChild ? undefined : 'button'}
        {...props}
      >
        {/* Shimmer effect for gradient buttons */}
        {variant === 'gradient' && (
          <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}

        {/* Icon */}
        {icon && !loading && <span className="flex-shrink-0">{icon}</span>}

        {/* Button text */}
        <span className={cn(loading && 'opacity-0')}>{children}</span>
      </Component>
    );
  }
);

Button.displayName = 'Button';

export { Button };
