import React from 'react';
import { cn } from '../../utils/cn';

// Heading Component
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'gradient';
  children: React.ReactNode;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, variant = 'default', children, ...props }, ref) => {
    const baseStyles =
      'font-bold tracking-tight text-gray-900 dark:text-gray-100';

    const levelStyles = {
      1: 'text-4xl md:text-5xl lg:text-6xl',
      2: 'text-3xl md:text-4xl lg:text-5xl',
      3: 'text-2xl md:text-3xl lg:text-4xl',
      4: 'text-xl md:text-2xl lg:text-3xl',
      5: 'text-lg md:text-xl lg:text-2xl',
      6: 'text-base md:text-lg lg:text-xl',
    };

    const variants = {
      default: '',
      gradient:
        'bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent',
    };

    const HeadingComponent = React.createElement(
      `h${level}`,
      {
        className: cn(
          baseStyles,
          levelStyles[level],
          variants[variant],
          className
        ),
        ref,
        ...props,
      },
      children
    );

    return HeadingComponent;
  }
);

Heading.displayName = 'Heading';

// Text Component
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'muted' | 'small' | 'large' | 'lead';
  children: React.ReactNode;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'text-base text-gray-700 dark:text-gray-300',
      muted: 'text-sm text-gray-600 dark:text-gray-400',
      small: 'text-sm text-gray-700 dark:text-gray-300',
      large: 'text-lg text-gray-700 dark:text-gray-300',
      lead: 'text-xl text-gray-600 dark:text-gray-400 font-light',
    };

    return (
      <p className={cn(variants[variant], className)} ref={ref} {...props}>
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';

// Unified Typography Component
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body'
    | 'small'
    | 'large'
    | 'lead';
  children: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'body', children, ...props }, ref) => {
    const variants = {
      h1: {
        tag: 'h1',
        styles:
          'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
      },
      h2: {
        tag: 'h2',
        styles:
          'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
      },
      h3: {
        tag: 'h3',
        styles:
          'text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
      },
      h4: {
        tag: 'h4',
        styles:
          'text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
      },
      h5: {
        tag: 'h5',
        styles:
          'text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
      },
      h6: {
        tag: 'h6',
        styles:
          'text-base md:text-lg lg:text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100',
      },
      body: { tag: 'p', styles: 'text-base text-gray-700 dark:text-gray-300' },
      small: {
        tag: 'small',
        styles: 'text-sm text-gray-600 dark:text-gray-400',
      },
      large: { tag: 'p', styles: 'text-lg text-gray-700 dark:text-gray-300' },
      lead: {
        tag: 'p',
        styles: 'text-xl text-gray-600 dark:text-gray-400 font-light',
      },
    };

    const { tag, styles } = variants[variant];

    return React.createElement(
      tag,
      {
        className: cn(styles, className),
        ref,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';

export { Heading, Text, Typography };
