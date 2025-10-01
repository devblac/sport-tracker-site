import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: 'default' | 'muted' | 'gradient';
  spacing?: 'default' | 'large' | 'none';
}

const VARIANT_CLASSES = {
  default: 'bg-slate-900',
  muted: 'bg-slate-950',
  gradient: 'bg-gradient-to-br from-blue-600 to-violet-600',
};

const SPACING_CLASSES = {
  default: 'py-16 md:py-20',
  large: 'py-20 md:py-24',
  none: '',
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  innerClassName,
  variant = 'default',
  spacing = 'default',
}) => {
  return (
    <section className={cn(VARIANT_CLASSES[variant], SPACING_CLASSES[spacing], className)}>
      <div className={cn('max-w-5xl mx-auto px-6', innerClassName)}>
        {children}
      </div>
    </section>
  );
};

