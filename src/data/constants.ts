// Constants for the LiftFire marketing website

export const SITE_CONFIG = {
  name: 'LiftFire',
  description:
    'Transform Your Fitness Journey with LiftFire - The gamified gym tracker that works offline, connects you with friends, and uses AI to optimize your workouts.',
  url: 'https://liftfire.app',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/liftfire',
    discord: 'https://discord.gg/liftfire',
    twitter: 'https://twitter.com/liftfireapp',
    instagram: 'https://instagram.com/liftfireapp',
    linkedin: 'https://linkedin.com/company/liftfire',
  },
} as const;

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Roadmap', href: '/roadmap' },
] as const;

export const BRAND_COLORS = {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6', // Electric Blue - Energy & Technology
    600: '#2563eb',
    rgb: '59, 130, 246',
    hsl: '217, 91%, 60%',
  },
  secondary: {
    50: '#faf5ff',
    500: '#8b5cf6', // Vibrant Purple - Premium & Innovation
    600: '#7c3aed',
    rgb: '139, 92, 246',
    hsl: '258, 90%, 66%',
  },
  success: {
    500: '#10b981', // Success Green - Achievement & Growth
    rgb: '16, 185, 129',
    hsl: '160, 84%, 39%',
  },
  warning: {
    500: '#f59e0b', // Warning Orange - Energy & Motivation
    rgb: '245, 158, 11',
    hsl: '38, 92%, 50%',
  },
  error: {
    500: '#ef4444', // Error Red - Alerts & Challenges
    rgb: '239, 68, 68',
    hsl: '0, 84%, 60%',
  },
} as const;

export const CONTACT_INFO = {
  email: 'support@liftfire.app',
  discord: 'https://discord.gg/liftfire',
  github: 'https://github.com/liftfire',
} as const;

// Statistics for social proof
export const STATS = {
  activeUsers: '10,000+',
  workoutsTracked: '1M+',
  userSatisfaction: '95%',
  availableLanguages: '12',
  exercises: '1000+',
  achievements: '100+',
} as const;

// Feature status indicators
export const FEATURE_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PLANNED: 'planned',
} as const;

// Core features with status
export const CORE_FEATURES = [
  {
    id: 'offline-functionality',
    title: 'Works Offline Always',
    description: 'Never Miss a Rep',
    longDescription:
      "Poor gym WiFi? No problem. LiftFire works completely offline, syncing your data when you're back online. Your workouts are always tracked, no matter where you train.",
    status: FEATURE_STATUS.COMPLETED,
    category: 'core',
    icon: '🔥',
  },
  {
    id: 'gamification',
    title: 'Gamified Fitness',
    description: 'Level Up Your Workouts',
    longDescription:
      'Earn XP for every workout, unlock achievements for milestones, and maintain streaks that adapt to your schedule. Make fitness as addictive as your favorite game.',
    status: FEATURE_STATUS.COMPLETED,
    category: 'gamification',
    icon: '🎮',
  },
  {
    id: 'social-features',
    title: 'Social Motivation',
    description: 'Train with Friends',
    longDescription:
      'Connect with gym buddies, share achievements, and compete in challenges. Turn your fitness journey into a social experience that keeps you motivated.',
    status: FEATURE_STATUS.IN_PROGRESS,
    category: 'social',
    icon: '👥',
  },
  {
    id: 'ai-insights',
    title: 'AI-Powered Insights',
    description: 'Your Personal AI Trainer',
    longDescription:
      'Get personalized workout recommendations, plateau detection, and form analysis. Our AI learns from your progress to provide insights that help you train smarter, not just harder.',
    status: FEATURE_STATUS.PLANNED,
    category: 'ai',
    icon: '🤖',
  },
] as const;

// Pricing plans
export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for trying out LiftFire and basic workout tracking.',
    popular: false,
    features: [
      'Complete exercise database (1000+ exercises)',
      '100% offline workout tracking',
      'Basic gamification (XP and levels)',
      'Personal progress tracking',
      'Local data storage',
    ],
    limitations: [
      'No cloud sync across devices',
      'No advanced AI features',
      'No premium social features',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    period: 'per month',
    description:
      'For serious fitness enthusiasts who want advanced features and cloud sync.',
    popular: true,
    features: [
      'Everything in Free',
      'Cloud sync across all devices',
      'Advanced gamification (achievements, streaks)',
      'Social features (gym friends, challenges)',
      'AI workout recommendations',
      'Advanced analytics and insights',
      'Priority customer support',
      'Early access to new features',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 19.99,
    period: 'per month',
    description:
      'For fitness professionals and serious athletes who need the ultimate tools.',
    popular: false,
    features: [
      'Everything in Pro',
      'Personal trainer marketplace access',
      'Custom workout plan creation',
      'Advanced AI coaching features',
      'Form analysis and feedback',
      'Nutrition integration',
      'White-label options for trainers',
      'Advanced client management tools',
    ],
  },
] as const;

// Brand personality and voice
export const BRAND_VOICE = {
  personality: [
    'Energetic',
    'Intelligent',
    'Social',
    'Innovative',
    'Accessible',
  ],
  tone: ['Encouraging', 'Knowledgeable', 'Authentic'],
  style: ['Direct', 'Energetic', 'Motivational'],
  taglines: [
    'Your Fitness Journey, Gamified',
    'Level Up Your Workouts',
    'Fitness That Never Goes Offline',
    'Where Strength Meets Smart',
    'Ignite Your Fitness Potential',
  ],
} as const;
