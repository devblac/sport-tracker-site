import React from 'react';
import { Activity, TrendingUp, Users, Sparkles } from 'lucide-react';
import { Section } from '../../ui/Section';

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsStripProps {
  stats: StatItem[];
}

const iconMap = [
  Activity, // Workout streak
  TrendingUp, // XP earned
  Sparkles, // Satisfaction score
  Users, // Countries
];

export const StatsStrip: React.FC<StatsStripProps> = ({ stats }) => (
  <Section variant="default" spacing="default">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = iconMap[index] || Activity;
        return (
          <div
            key={stat.label}
            className="group rounded-2xl border border-slate-800 bg-slate-800/50 p-6 shadow-md hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                <Icon className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                {stat.value}
              </p>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  </Section>
);
