// Testimonials and social proof data based on WEBSITE_CONTENT.md

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  rating: number;
  featured: boolean;
  category?: 'general' | 'offline' | 'gamification' | 'social' | 'ai';
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

// Main testimonials from marketing content
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah-m',
    quote:
      'LiftFire completely changed how I approach the gym. The offline feature is a game-changer!',
    author: 'Sarah M.',
    role: 'Fitness Enthusiast',
    rating: 5,
    featured: true,
    category: 'offline',
  },
  {
    id: 'mike-r',
    quote:
      "The gamification keeps me coming back. I'm actually excited to work out now!",
    author: 'Mike R.',
    role: 'Personal Trainer',
    rating: 5,
    featured: true,
    category: 'gamification',
  },
  {
    id: 'alex-k',
    quote: "Finally, a fitness app that works when the gym WiFi doesn't.",
    author: 'Alex K.',
    role: 'Powerlifter',
    rating: 5,
    featured: true,
    category: 'offline',
  },
];

// Additional testimonials for variety
export const EXTENDED_TESTIMONIALS: Testimonial[] = [
  ...TESTIMONIALS,
  {
    id: 'jessica-l',
    quote:
      "The achievement system is so motivating! I've unlocked 15 badges this month.",
    author: 'Jessica L.',
    role: 'Gym Enthusiast',
    rating: 5,
    featured: false,
    category: 'gamification',
  },
  {
    id: 'david-w',
    quote:
      'Love how I can compete with my gym buddies. The leaderboards are addictive!',
    author: 'David W.',
    role: 'Competitive Lifter',
    rating: 5,
    featured: false,
    category: 'social',
  },
  {
    id: 'maria-s',
    quote:
      'Perfect for my home gym. No internet required and it tracks everything perfectly.',
    author: 'Maria S.',
    role: 'Home Gym Owner',
    rating: 5,
    featured: false,
    category: 'offline',
  },
  {
    id: 'james-t',
    quote: 'The streak system keeps me consistent. 45 days and counting!',
    author: 'James T.',
    role: 'Fitness Beginner',
    rating: 5,
    featured: false,
    category: 'gamification',
  },
  {
    id: 'lisa-h',
    quote:
      'As a trainer, I love how my clients stay engaged with the XP system.',
    author: 'Lisa H.',
    role: 'Certified Personal Trainer',
    rating: 5,
    featured: false,
    category: 'gamification',
  },
];

// Social proof statistics
export const STATISTICS: Statistic[] = [
  {
    id: 'active-users',
    value: '10,000+',
    label: 'Active Users',
    description: 'Fitness enthusiasts using LiftFire daily',
    icon: '👥',
  },
  {
    id: 'workouts-tracked',
    value: '1M+',
    label: 'Workouts Tracked',
    description: 'Total workouts logged by our community',
    icon: '🏋️',
  },
  {
    id: 'user-satisfaction',
    value: '95%',
    label: 'User Satisfaction',
    description: 'Users who rate LiftFire 4+ stars',
    icon: '⭐',
  },
  {
    id: 'languages',
    value: '12',
    label: 'Languages',
    description: 'Available in multiple languages worldwide',
    icon: '🌍',
  },
  {
    id: 'exercises',
    value: '1000+',
    label: 'Exercises',
    description: 'Comprehensive exercise database',
    icon: '💪',
  },
  {
    id: 'achievements',
    value: '100+',
    label: 'Achievements',
    description: 'Unique badges and milestones to unlock',
    icon: '🏆',
  },
];

// Trust indicators
export const TRUST_INDICATORS = [
  {
    id: 'offline-first',
    title: '100% Offline Functionality',
    description: 'Works without internet connection',
    icon: '🔥',
  },
  {
    id: 'privacy-focused',
    title: 'Privacy-First Design',
    description: 'Your data stays secure and private',
    icon: '🔐',
  },
  {
    id: 'open-source',
    title: 'Open Source Foundation',
    description: 'Transparent and community-driven',
    icon: '🌟',
  },
  {
    id: 'no-ads',
    title: 'No Ads, No Tracking',
    description: 'Clean experience focused on your fitness',
    icon: '🚫',
  },
];

// Success stories by category
export const SUCCESS_STORIES = {
  beginners: [
    {
      title: 'From Couch to Consistent',
      story:
        "Sarah went from never working out to maintaining a 30-day streak with LiftFire's gamification system.",
      author: 'Sarah M.',
      timeframe: '3 months',
    },
    {
      title: 'Building Healthy Habits',
      story:
        'James used the achievement system to build consistent workout habits and lost 25 pounds.',
      author: 'James T.',
      timeframe: '6 months',
    },
  ],
  experienced: [
    {
      title: 'Breaking Through Plateaus',
      story:
        "Mike used LiftFire's progress tracking to identify weak points and increase his bench press by 50 lbs.",
      author: 'Mike R.',
      timeframe: '4 months',
    },
    {
      title: 'Competitive Edge',
      story:
        'Alex leveraged the social features to train with friends and improve his powerlifting total by 200 lbs.',
      author: 'Alex K.',
      timeframe: '8 months',
    },
  ],
  trainers: [
    {
      title: 'Client Engagement',
      story:
        "Lisa saw 80% better client retention after introducing LiftFire's gamification to her training programs.",
      author: 'Lisa H.',
      timeframe: '1 year',
    },
  ],
};

// Community highlights
export const COMMUNITY_HIGHLIGHTS = [
  {
    id: 'discord-community',
    title: 'Active Discord Community',
    description: '2,000+ members sharing tips, challenges, and motivation',
    link: 'https://discord.gg/liftfire',
    icon: '💬',
  },
  {
    id: 'github-contributors',
    title: 'Open Source Contributors',
    description: "50+ developers contributing to LiftFire's development",
    link: 'https://github.com/liftfire',
    icon: '👨‍💻',
  },
  {
    id: 'social-media',
    title: 'Social Media Following',
    description: '5,000+ followers across Twitter, Instagram, and LinkedIn',
    link: 'https://twitter.com/liftfireapp',
    icon: '📱',
  },
];

// Get testimonials by category
export const getTestimonialsByCategory = (category: string): Testimonial[] => {
  return EXTENDED_TESTIMONIALS.filter(
    testimonial => testimonial.category === category
  );
};

// Get featured testimonials
export const getFeaturedTestimonials = (): Testimonial[] => {
  return EXTENDED_TESTIMONIALS.filter(testimonial => testimonial.featured);
};

// Get random testimonials
export const getRandomTestimonials = (count: number = 3): Testimonial[] => {
  const shuffled = [...EXTENDED_TESTIMONIALS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get statistics for display
export const getKeyStatistics = (): Statistic[] => {
  return STATISTICS.slice(0, 4); // Return first 4 main stats
};

// Get all statistics
export const getAllStatistics = (): Statistic[] => {
  return STATISTICS;
};
