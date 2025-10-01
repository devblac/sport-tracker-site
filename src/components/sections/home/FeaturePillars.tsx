import React from 'react';
import { Section } from '../../ui/Section';

export interface FeatureHighlight {
  categoryLabel: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FeaturePillarsProps {
  heading: string;
  description: string;
  highlights: FeatureHighlight[];
}

export const FeaturePillars: React.FC<FeaturePillarsProps> = ({ heading, description, highlights }) => (
  <Section variant="default" spacing="default">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
        {heading}
      </h2>
      <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {highlights.map((highlight) => {
        const Icon = highlight.icon;
        return (
          <div
            key={highlight.title}
            className="group rounded-2xl border border-slate-800 bg-slate-800/50 p-6 shadow-md hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 group-hover:from-blue-500/20 group-hover:to-violet-500/20 transition-all">
                <Icon className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              {highlight.categoryLabel}
            </p>
            <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">{highlight.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{highlight.description}</p>
          </div>
        );
      })}
    </div>
  </Section>
);
