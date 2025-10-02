import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { StoreBadges, type StoreBadgeLink } from './StoreBadges';
import { HeroPhoneMock } from './HeroPhoneMock';
import { Section } from '../../ui/Section';

export interface HeroSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: string[];
  storeLinks: StoreBadgeLink[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  eyebrow,
  title,
  subtitle,
  bullets,
  storeLinks,
  primaryCta,
  secondaryCta,
}) => {
  return (
    <Section
      variant="default"
      spacing="large"
      className="relative overflow-hidden pt-24"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-violet-500/5 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-left">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 bg-slate-800 px-4 py-2 rounded-full border border-slate-700 shadow-md">
              {eyebrow}
            </span>
            <h1 className="text-4xl font-bold leading-tight text-slate-100 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                to={primaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white text-base font-semibold rounded-full hover:bg-blue-600 hover:scale-105 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/50"
              >
                {primaryCta.label}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to={secondaryCta.href}
                className="inline-flex items-center px-8 py-4 bg-slate-800 text-slate-100 text-base font-semibold rounded-full hover:bg-slate-700 hover:scale-105 transition-all border border-slate-700 shadow-md"
              >
                {secondaryCta.label}
              </Link>
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              {bullets.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <StoreBadges links={storeLinks} />
          </div>

          <div className="hidden lg:flex justify-end">
            <HeroPhoneMock />
          </div>
        </div>

        <div className="mt-12 lg:hidden">
          <HeroPhoneMock />
        </div>
      </div>
    </Section>
  );
};
