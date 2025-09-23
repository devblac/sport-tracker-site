// Core types for the LiftFire marketing website

export interface Feature {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  status: FeatureStatus;
  category: FeatureCategory;
  icon: string;
  screenshots?: string[];
  videoUrl?: string;
}

export const FeatureStatus = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PLANNED: 'planned',
  EXPERIMENTAL: 'experimental',
} as const;

export type FeatureStatus = (typeof FeatureStatus)[keyof typeof FeatureStatus];

export const FeatureCategory = {
  CORE: 'core',
  GAMIFICATION: 'gamification',
  SOCIAL: 'social',
  AI: 'ai',
  TECHNICAL: 'technical',
} as const;

export type FeatureCategory =
  (typeof FeatureCategory)[keyof typeof FeatureCategory];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  quote: string;
  rating: number;
  featured: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: PlanFeature[];
  highlighted: boolean;
}

export interface PlanFeature {
  name: string;
  included: boolean;
  description?: string;
}

export interface RoadmapItem {
  id: string;
  quarter: string;
  year: number;
  theme: string;
  status: 'completed' | 'in-progress' | 'planned';
  features: string[];
  successMetrics: string[];
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description?: string;
}
