// Feature data with status indicators based on FEATURE_STATUS.md

export type FeatureStatus =
  | 'completed'
  | 'in-progress'
  | 'planned'
  | 'experimental';
export type FeatureCategory =
  | 'core'
  | 'gamification'
  | 'social'
  | 'ai'
  | 'technical';

export interface Feature {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  keyPoints?: string[];
  status: FeatureStatus;
  category: FeatureCategory;
  icon: string;
  completionPercentage?: number;
}

// Core Features - Fully Implemented (100% Complete)
export const CORE_FEATURES: Feature[] = [
  {
    id: 'pwa-core',
    title: 'Progressive Web App (PWA)',
    description: 'Install on any device, works like a native app',
    longDescription:
      'Complete PWA implementation with service worker, offline functionality, app installation prompts, and background sync capabilities.',
    status: 'completed',
    category: 'technical',
    icon: '📱',
    completionPercentage: 100,
  },
  {
    id: 'exercise-database',
    title: '1000+ Exercises at Your Fingertips',
    description: 'Comprehensive database with detailed instructions',
    longDescription:
      "Access a complete database of exercises with detailed instructions, muscle group targeting, and equipment requirements. From basic movements to advanced techniques, we've got you covered.",
    keyPoints: [
      'Detailed exercise instructions and form tips',
      'Muscle group visualization',
      'Equipment and difficulty categorization',
      'Offline access to entire database',
    ],
    status: 'completed',
    category: 'core',
    icon: '🏋️',
    completionPercentage: 100,
  },
  {
    id: 'offline-functionality',
    title: 'Works Everywhere, Syncs Everywhere',
    description: '100% offline functionality with seamless sync',
    longDescription:
      "Train in basements, remote gyms, or anywhere with poor connectivity. LiftFire stores everything locally and syncs seamlessly when you're back online.",
    keyPoints: [
      '100% offline functionality',
      'Automatic background sync',
      'No data loss, ever',
      'Works on any device, anywhere',
    ],
    status: 'completed',
    category: 'core',
    icon: '🔥',
    completionPercentage: 100,
  },
  {
    id: 'authentication',
    title: 'Secure Authentication System',
    description: 'Supabase integration with guest mode',
    longDescription:
      'Complete authentication system with email/password authentication, guest mode for offline-first usage, session management, and password reset functionality.',
    status: 'completed',
    category: 'technical',
    icon: '🔐',
    completionPercentage: 100,
  },
  {
    id: 'design-system',
    title: 'Complete Design System & Theming',
    description: 'Responsive design with multiple themes',
    longDescription:
      'Complete theme system with Light, Dark, OLED, and seasonal themes. Mobile-first responsive design with accessibility compliance and custom UI component library.',
    status: 'completed',
    category: 'technical',
    icon: '🎨',
    completionPercentage: 100,
  },
];

// Partially Implemented Features (70-90% Complete)
export const PARTIAL_FEATURES: Feature[] = [
  {
    id: 'workout-system',
    title: 'Track Every Rep, Set, and Personal Record',
    description: 'Comprehensive workout creation and execution',
    longDescription:
      'Log your workouts with precision using our intuitive interface. Track weights, reps, rest times, and RPE while our system automatically calculates your progress and personal records.',
    keyPoints: [
      'Real-time workout logging',
      'Automatic personal record detection',
      'Rest timer with customizable intervals',
      'Progress visualization and analytics',
    ],
    status: 'in-progress',
    category: 'core',
    icon: '📊',
    completionPercentage: 85,
  },
  {
    id: 'gamification-system',
    title: 'Make Fitness Addictive',
    description: 'XP, levels, achievements, and streaks',
    longDescription:
      'Transform your workouts into an engaging game. Earn XP for every exercise, unlock achievements for milestones, and maintain streaks that adapt to your real-life schedule.',
    keyPoints: [
      'XP system with meaningful progression',
      '100+ unique achievements to unlock',
      'Flexible streak system with compensation days',
      'Seasonal challenges and events',
    ],
    status: 'in-progress',
    category: 'gamification',
    icon: '🎮',
    completionPercentage: 80,
  },
  {
    id: 'social-features',
    title: 'Your Gym Community, Digitized',
    description: 'Connect with workout partners and friends',
    longDescription:
      'Connect with workout partners, share achievements, and participate in challenges. Build a supportive community that keeps you motivated and accountable.',
    keyPoints: [
      'Gym friends system',
      'Activity feeds and workout sharing',
      'Group challenges and competitions',
      'Leaderboards and rankings',
    ],
    status: 'in-progress',
    category: 'social',
    icon: '👥',
    completionPercentage: 60,
  },
  {
    id: 'user-profiles',
    title: 'Comprehensive User Profiles',
    description: 'Profile management with customization',
    longDescription:
      'Complete profile management with privacy settings, theme preferences, notification settings, and profile customization options.',
    status: 'in-progress',
    category: 'core',
    icon: '👤',
    completionPercentage: 90,
  },
];

// In Development Features (30-70% Complete)
export const DEVELOPMENT_FEATURES: Feature[] = [
  {
    id: 'ai-recommendations',
    title: 'Your Personal AI Trainer',
    description: 'AI-powered workout recommendations and insights',
    longDescription:
      'Get personalized workout recommendations, plateau detection, and form analysis. Our AI learns from your progress to provide insights that help you train smarter, not just harder.',
    keyPoints: [
      'Personalized workout recommendations',
      'Plateau detection and breakthrough strategies',
      'Progress prediction and goal optimization',
      'Form analysis using device camera (coming soon)',
    ],
    status: 'in-progress',
    category: 'ai',
    icon: '🤖',
    completionPercentage: 40,
  },
  {
    id: 'progress-analytics',
    title: 'Advanced Progress Tracking',
    description: 'Comprehensive analytics and insights',
    longDescription:
      'Detailed workout history, personal records tracking, progress charts, and advanced analytics to monitor your fitness journey over time.',
    status: 'in-progress',
    category: 'core',
    icon: '📈',
    completionPercentage: 50,
  },
  {
    id: 'community-features',
    title: 'Global Fitness Community',
    description: 'Leaderboards, challenges, and social interactions',
    longDescription:
      'Join a global community with leaderboards, community challenges, workout sharing, and social interactions that keep you motivated.',
    status: 'in-progress',
    category: 'social',
    icon: '🌍',
    completionPercentage: 35,
  },
];

// Planned Features (0-30% Complete)
export const PLANNED_FEATURES: Feature[] = [
  {
    id: 'advanced-challenges',
    title: 'Challenges & Competitions',
    description: 'Tournament system and seasonal events',
    longDescription:
      'Participate in tournaments, seasonal events, guild/team competitions, and community challenges with rewards and recognition.',
    status: 'planned',
    category: 'gamification',
    icon: '🏆',
    completionPercentage: 20,
  },
  {
    id: 'mentorship-program',
    title: 'Trainer-Client System',
    description: 'Professional mentorship and coaching',
    longDescription:
      'Connect with certified trainers, get personalized coaching, track client progress, and access professional communication tools.',
    status: 'planned',
    category: 'social',
    icon: '🎓',
    completionPercentage: 15,
  },
  {
    id: 'advanced-ai',
    title: 'Advanced AI Insights',
    description: 'Machine learning and predictive analytics',
    longDescription:
      'Advanced machine learning models for predictive analytics, injury prevention, nutrition integration, and comprehensive health insights.',
    status: 'planned',
    category: 'ai',
    icon: '🧠',
    completionPercentage: 25,
  },
  {
    id: 'third-party-integrations',
    title: 'Third-Party Integrations',
    description: 'Fitness trackers, nutrition apps, and more',
    longDescription:
      'Integrate with fitness trackers (Apple Health, Google Fit), nutrition apps, gym equipment QR codes, wearable devices, and calendar integration.',
    status: 'planned',
    category: 'technical',
    icon: '🔗',
    completionPercentage: 10,
  },
  {
    id: 'native-mobile-apps',
    title: 'Native Mobile Apps',
    description: 'iOS and Android app store deployment',
    longDescription:
      'Native iOS and Android apps with push notifications, background workout tracking, offline sync optimization, and native device features.',
    status: 'planned',
    category: 'technical',
    icon: '📲',
    completionPercentage: 5,
  },
];

// Experimental Features (Research Phase)
export const EXPERIMENTAL_FEATURES: Feature[] = [
  {
    id: 'ar-vr-integration',
    title: 'AR/VR Integration',
    description: 'Augmented and virtual reality experiences',
    longDescription:
      'Form analysis using device camera, virtual personal trainer, AR workout overlays, and immersive fitness experiences.',
    status: 'experimental',
    category: 'ai',
    icon: '🥽',
    completionPercentage: 0,
  },
  {
    id: 'blockchain-features',
    title: 'Blockchain Integration',
    description: 'NFT achievements and decentralized features',
    longDescription:
      'NFT achievements, decentralized leaderboards, crypto rewards for milestones, and blockchain-based fitness challenges.',
    status: 'experimental',
    category: 'technical',
    icon: '⛓️',
    completionPercentage: 0,
  },
];

// All features combined
export const ALL_FEATURES = [
  ...CORE_FEATURES,
  ...PARTIAL_FEATURES,
  ...DEVELOPMENT_FEATURES,
  ...PLANNED_FEATURES,
  ...EXPERIMENTAL_FEATURES,
];

// Feature categories
export const FEATURE_CATEGORIES = {
  core: 'Core Features',
  gamification: 'Gamification',
  social: 'Social Features',
  ai: 'AI & Analytics',
  technical: 'Technical Excellence',
} as const;

// Status indicators with colors and labels
export const STATUS_CONFIG = {
  completed: {
    label: 'Completed',
    color: 'success',
    icon: '✅',
    description: 'Fully implemented and available',
  },
  'in-progress': {
    label: 'In Progress',
    color: 'warning',
    icon: '🟡',
    description: 'Currently being developed',
  },
  planned: {
    label: 'Planned',
    color: 'error',
    icon: '🔴',
    description: 'Planned for future development',
  },
  experimental: {
    label: 'Experimental',
    color: 'secondary',
    icon: '🧪',
    description: 'Research and experimentation phase',
  },
} as const;

// Get features by category
export const getFeaturesByCategory = (category: FeatureCategory): Feature[] => {
  return ALL_FEATURES.filter(feature => feature.category === category);
};

// Get features by status
export const getFeaturesByStatus = (status: FeatureStatus): Feature[] => {
  return ALL_FEATURES.filter(feature => feature.status === status);
};

// Get feature completion stats
export const getFeatureStats = () => {
  const total = ALL_FEATURES.length;
  const completed = getFeaturesByStatus('completed').length;
  const inProgress = getFeaturesByStatus('in-progress').length;
  const planned = getFeaturesByStatus('planned').length;
  const experimental = getFeaturesByStatus('experimental').length;

  return {
    total,
    completed,
    inProgress,
    planned,
    experimental,
    completionPercentage: Math.round((completed / total) * 100),
  };
};
