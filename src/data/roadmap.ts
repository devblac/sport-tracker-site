// Roadmap data based on ROADMAP.md

export type RoadmapStatus = 'completed' | 'in-progress' | 'planned';

export interface RoadmapQuarter {
  id: string;
  title: string;
  theme: string;
  period: string;
  status: RoadmapStatus;
  description: string;
  features: string[];
  successMetrics: string[];
  completionPercentage?: number;
}

export interface LongTermGoal {
  title: string;
  description: string;
  timeline: string;
}

// Quarterly roadmap data
export const ROADMAP_QUARTERS: RoadmapQuarter[] = [
  {
    id: 'q1-2024',
    title: 'Q1 2024 - Foundation Complete',
    theme: 'Building the Foundation',
    period: 'Q1 2024',
    status: 'completed',
    description:
      "We've established the core infrastructure that makes LiftFire unique - offline-first architecture, comprehensive exercise database, and the beginning of our gamification system.",
    features: [
      'Progressive Web App (PWA) with offline functionality',
      '1000+ exercise database with detailed information',
      'User authentication and profile management',
      'Basic workout creation and tracking',
      'XP system and achievement framework',
    ],
    successMetrics: [
      '100% offline functionality achieved',
      'Sub-2s load times',
      'PWA installable on all devices',
      '1000+ exercises in database',
    ],
    completionPercentage: 100,
  },
  {
    id: 'q2-2024',
    title: 'Q2 2024 - Gamification & Social',
    theme: 'Making Fitness Addictive',
    period: 'Q2 2024',
    status: 'in-progress',
    description:
      "We're expanding our gamification system and building the social features that will connect fitness enthusiasts worldwide.",
    features: [
      'Advanced achievement system with 100+ unique achievements',
      'Social fitness network with gym friends',
      'Challenge system for community competitions',
      'Leaderboards and ranking system',
      'Enhanced streak system with flexible scheduling',
    ],
    successMetrics: [
      '50% of users add at least one friend',
      '30% increase in workout frequency',
      '1000+ community challenges completed',
      'Social sharing increases by 200%',
    ],
    completionPercentage: 65,
  },
  {
    id: 'q3-2024',
    title: 'Q3 2024 - AI & Intelligence',
    theme: 'Your Personal AI Trainer',
    period: 'Q3 2024',
    status: 'planned',
    description:
      'Introducing AI-powered features that will analyze your progress, detect plateaus, and provide personalized recommendations to optimize your training.',
    features: [
      'AI workout recommendations based on your progress',
      'Plateau detection and breakthrough strategies',
      'Form analysis using device camera',
      'Recovery optimization and rest day planning',
      'Predictive progress modeling',
    ],
    successMetrics: [
      '85% accuracy in plateau detection',
      '60% of users follow AI recommendations',
      '25% improvement in user progress',
      'Advanced analytics used by 70% of Pro users',
    ],
    completionPercentage: 0,
  },
  {
    id: 'q4-2024',
    title: 'Q4 2024 - Platform Expansion',
    theme: 'Everywhere You Train',
    period: 'Q4 2024',
    status: 'planned',
    description:
      'Expanding LiftFire to native mobile apps, wearable devices, and creating partnerships with gyms and equipment manufacturers.',
    features: [
      'Native iOS and Android apps',
      'Apple Watch and Wear OS integration',
      'Gym equipment QR code integration',
      'Third-party app integrations',
      'Public API for developers',
    ],
    successMetrics: [
      '50,000+ app downloads',
      '4.8+ app store rating',
      '20+ gym partnerships',
      '100+ API developers',
    ],
    completionPercentage: 0,
  },
];

// Long-term vision goals
export const LONG_TERM_GOALS: LongTermGoal[] = [
  {
    title: 'AI Fitness Coach',
    description:
      'Advanced AI that understands your goals, preferences, and progress to provide personalized coaching',
    timeline: '2025 H1',
  },
  {
    title: 'AR/VR Integration',
    description:
      'Augmented and virtual reality workout experiences with immersive form analysis',
    timeline: '2025 H2',
  },
  {
    title: 'Global Fitness Community',
    description:
      'Worldwide challenges, competitions, and fitness events through the platform',
    timeline: '2025-2026',
  },
  {
    title: 'Health Ecosystem',
    description:
      'Integration with healthcare providers, nutritionists, and wellness professionals',
    timeline: '2026+',
  },
];

// 2025+ Vision details
export const VISION_2025 = {
  title: '2025 and Beyond',
  subtitle: 'The Future of Fitness Technology',
  description:
    "Our long-term vision includes AR/VR integration, advanced AI coaching, global fitness challenges, and building the world's largest connected fitness community.",

  quarters: [
    {
      period: 'Q1 2025',
      theme: 'Premium Fitness Ecosystem',
      focus: 'Marketplace & Monetization',
      features: [
        'Content Marketplace with premium workout plans',
        'Certified trainer marketplace',
        'Subscription tier optimization',
        'Revenue sharing for community creators',
      ],
    },
    {
      period: 'Q2 2025',
      theme: 'Global Fitness Community',
      focus: 'Advanced Social & Community',
      features: [
        'Mentorship program with experienced lifters',
        'Live workout streaming',
        'Virtual gym sessions',
        'Global fitness events and competitions',
      ],
    },
    {
      period: 'Q3 2025',
      theme: 'Future of Fitness',
      focus: 'Cutting-Edge Technology',
      features: [
        'AR/VR integration for immersive workouts',
        'Natural language workout planning',
        'Predictive injury prevention',
        'Mental health and motivation coaching',
      ],
    },
    {
      period: 'Q4 2025',
      theme: 'Worldwide Fitness Revolution',
      focus: 'Global Expansion',
      features: [
        '20+ language localizations',
        'Regional fitness preferences',
        'Local gym partnerships worldwide',
        'Enterprise wellness solutions',
      ],
    },
  ],
};

// Key Performance Indicators
export const ROADMAP_KPIS = {
  userGrowth: {
    title: 'User Growth Metrics',
    targets: [
      { metric: 'Monthly Active Users (MAU)', target: '100K by end of 2024' },
      { metric: 'Daily Active Users (DAU)', target: '30K by end of 2024' },
      { metric: 'User Retention', target: '80% 7-day, 60% 30-day, 40% 90-day' },
      {
        metric: 'Viral Coefficient',
        target: '0.5+ (each user brings 0.5 new users)',
      },
    ],
  },
  engagement: {
    title: 'Engagement Metrics',
    targets: [
      {
        metric: 'Session Duration',
        target: 'Average 15+ minutes per workout session',
      },
      { metric: 'Workout Completion Rate', target: '85%+ completion rate' },
      {
        metric: 'Social Engagement',
        target: '70%+ users interact with social features',
      },
      {
        metric: 'Feature Adoption',
        target: '60%+ users try new features within 30 days',
      },
    ],
  },
  business: {
    title: 'Business Metrics',
    targets: [
      { metric: 'Revenue Growth', target: '$1M ARR by end of 2024' },
      { metric: 'Customer Acquisition Cost (CAC)', target: '<$10' },
      { metric: 'Lifetime Value (LTV)', target: '>$100' },
      { metric: 'LTV/CAC Ratio', target: '>10:1' },
    ],
  },
  technical: {
    title: 'Technical Metrics',
    targets: [
      { metric: 'App Performance', target: '95%+ uptime, <2s load times' },
      { metric: 'User Satisfaction', target: '4.5+ app store rating' },
      {
        metric: 'Bug Reports',
        target: '<1% of sessions result in bug reports',
      },
      { metric: 'Security Incidents', target: 'Zero major security breaches' },
    ],
  },
};

// Success celebration milestones
export const CELEBRATION_MILESTONES = [
  {
    milestone: '1,000 Users',
    celebration: 'Beta launch celebration',
    achieved: true,
  },
  {
    milestone: '10,000 Users',
    celebration: 'Community appreciation event',
    achieved: false,
  },
  {
    milestone: '100,000 Users',
    celebration: 'Major feature announcement',
    achieved: false,
  },
  {
    milestone: '1,000,000 Users',
    celebration: 'Global fitness day celebration',
    achieved: false,
  },
];

// Feature milestones
export const FEATURE_MILESTONES = [
  {
    milestone: 'First AI Recommendation',
    celebration: 'Technology showcase',
    achieved: false,
  },
  {
    milestone: 'First Million Workouts',
    celebration: 'Community achievement unlock',
    achieved: false,
  },
  {
    milestone: 'First Gym Partnership',
    celebration: 'Industry recognition event',
    achieved: false,
  },
  {
    milestone: 'First International Launch',
    celebration: 'Global expansion celebration',
    achieved: false,
  },
];

// Get roadmap status summary
export const getRoadmapStats = () => {
  const total = ROADMAP_QUARTERS.length;
  const completed = ROADMAP_QUARTERS.filter(
    q => q.status === 'completed'
  ).length;
  const inProgress = ROADMAP_QUARTERS.filter(
    q => q.status === 'in-progress'
  ).length;
  const planned = ROADMAP_QUARTERS.filter(q => q.status === 'planned').length;

  return {
    total,
    completed,
    inProgress,
    planned,
    completionPercentage: Math.round((completed / total) * 100),
  };
};

// Get current quarter
export const getCurrentQuarter = (): RoadmapQuarter | undefined => {
  return (
    ROADMAP_QUARTERS.find(q => q.status === 'in-progress') ||
    ROADMAP_QUARTERS.find(q => q.status === 'planned')
  );
};

// Get next planned features
export const getUpcomingFeatures = (): string[] => {
  const upcomingQuarters = ROADMAP_QUARTERS.filter(
    q => q.status === 'in-progress' || q.status === 'planned'
  );

  return upcomingQuarters.flatMap(q => q.features).slice(0, 5);
};
