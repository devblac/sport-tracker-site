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

const shimmer = (
  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
);

const spinner = (
  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = 'primary',
      size = 'md',
      children,
      asChild = false,
      icon,
      loading = false,
      disabled,
      onClick,
      ...rest
    } = props;

    const renderContent = (inner: React.ReactNode) => (
      <>
        {variant === 'gradient' && shimmer}
        {loading ? (
          spinner
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        <span className={cn(loading && 'opacity-0')}>{inner}</span>
      </>
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      const handleClick: React.MouseEventHandler<HTMLElement> = event => {
        if (child.props?.onClick) {
          child.props.onClick(event);
        }
        if (!event.defaultPrevented && onClick) {
          onClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
        }
      };

      return React.cloneElement(child, {
        className: cn(
          buttonClasses(variant, size),
          child.props?.className,
          className
        ),
        children: renderContent(child.props?.children),
        onClick: handleClick,
        'aria-disabled': disabled || loading || child.props?.['aria-disabled'],
      });
    }

    return (
      <button
        ref={ref}
        className={buttonClasses(variant, size, className)}
        disabled={disabled || loading}
        onClick={onClick}
        {...rest}
      >
        {renderContent(children)}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
