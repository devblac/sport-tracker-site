import React from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'default' | 'gradient' | 'ring' | 'glow';
  gradientColors?: 'blue' | 'purple' | 'pink' | 'green' | 'orange' | 'multi';
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      fallback,
      size = 'md',
      variant = 'default',
      gradientColors = 'multi',
      status,
      showStatus = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'relative inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0';

    const sizes = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
      '2xl': 'h-20 w-20 text-2xl',
    };

    const variants = {
      default: 'bg-muted',
      gradient: '',
      ring: 'ring-2 ring-offset-2 ring-primary',
      glow: 'shadow-xl',
    };

    const gradients = {
      blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
      purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
      pink: 'bg-gradient-to-br from-pink-400 to-pink-600',
      green: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      orange: 'bg-gradient-to-br from-orange-400 to-orange-600',
      multi: 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500',
    };

    const statusColors = {
      online: 'bg-emerald-500',
      offline: 'bg-slate-400',
      away: 'bg-amber-500',
      busy: 'bg-red-500',
    };

    const statusSizes = {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-3.5 w-3.5',
      '2xl': 'h-4 w-4',
    };

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div className={cn(baseStyles, sizes[size], className)} ref={ref} {...props}>
        <div
          className={cn(
            'h-full w-full flex items-center justify-center font-semibold text-white',
            variant === 'gradient' ? gradients[gradientColors] : variants[variant]
          )}
        >
          {src ? (
            <img src={src} alt={alt || 'Avatar'} className="h-full w-full object-cover" />
          ) : (
            <span>{fallback ? getInitials(fallback) : '?'}</span>
          )}
        </div>

        {/* Status indicator */}
        {showStatus && status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-2 border-background',
              statusColors[status],
              statusSizes[size]
            )}
            aria-label={status}
          />
        )}

        {/* Glow effect for glow variant */}
        {variant === 'glow' && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl -z-10" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group Component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: AvatarProps['size'];
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 5, size = 'md', ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const displayChildren = max ? childArray.slice(0, max) : childArray;
    const remaining = max ? childArray.length - max : 0;

    return (
      <div className={cn('flex items-center -space-x-2', className)} ref={ref} {...props}>
        {displayChildren}
        {remaining > 0 && (
          <Avatar
            size={size}
            fallback={`+${remaining}`}
            variant="gradient"
            gradientColors="multi"
          />
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar };

