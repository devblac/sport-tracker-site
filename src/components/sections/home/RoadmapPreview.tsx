import React from 'react';
import { Badge } from '../../ui/Badge';
import { Activity, CheckCircle, Rocket, Target } from 'lucide-react';
import type { RoadmapQuarter } from '../../../data/roadmap';
import { Section } from '../../ui/Section';

export interface RoadmapPreviewProps {
  heading: string;
  description: string;
  quarters: RoadmapQuarter[];
}

const statusIcon = (status: RoadmapQuarter['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-3 w-3" />;
    case 'in-progress':
      return <Activity className="h-3 w-3" />;
    default:
      return <Target className="h-3 w-3" />;
  }
};

const statusBadgeVariant = (status: RoadmapQuarter['status']) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in-progress':
      return 'warning';
    default:
      return 'info';
  }
};

export const RoadmapPreviewSection: React.FC<RoadmapPreviewProps> = ({
  heading,
  description,
  quarters,
}) => (
  <Section variant="default" spacing="default">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
        {heading}
      </h2>
      <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {quarters.map(quarter => (
        <div
          key={quarter.id}
          className="group rounded-2xl border border-slate-800 bg-slate-800/50 p-6 shadow-md hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
            <span className="font-semibold uppercase tracking-wider">
              {quarter.period}
            </span>
            <Badge
              variant={statusBadgeVariant(quarter.status)}
              size="sm"
              className="gap-1"
            >
              {statusIcon(quarter.status)}
              {quarter.status.replace('-', ' ')}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
            {quarter.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {quarter.description}
          </p>
          <ul className="space-y-2 text-sm text-slate-400">
            {quarter.features.slice(0, 3).map(feature => (
              <li key={feature} className="flex items-start gap-2">
                <Rocket className="mt-0.5 h-4 w-4 text-blue-500 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);
