import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const mockTranslations = {
  en: {
    common: {
      navigation: {
        home: 'Home',
        features: 'Features',
        pricing: 'Pricing',
        roadmap: 'Roadmap',
        community: 'Community',
        contact: 'Contact',
      },
      buttons: {
        startJourney: 'Start Your Journey',
        watchDemo: 'Watch Demo',
        learnMore: 'Learn More',
        getStarted: 'Get Started',
        tryFree: 'Try Free',
        upgrade: 'Upgrade',
        download: 'Download',
      },
      labels: {
        language: 'Language',
        theme: 'Theme',
      },
      seo: {
        defaultTitle: 'LiftFire - Transform Your Fitness Journey',
        defaultDescription:
          'Gamified gym tracker with offline functionality, social features, and AI insights. Track workouts, earn XP, and connect with the fitness community.',
        defaultKeywords:
          'gym tracker,fitness app,workout tracker,gamified fitness,offline gym app,PWA fitness,social fitness',
      },
    },
    homepage: {
      hero: {
        title: 'Transform Your Fitness Journey with LiftFire',
        description: 'The gamified gym tracker that works 100% offline.',
      },
      features: {
        title: 'Why Choose LiftFire?',
        description:
          'Everything you need for a complete fitness tracking experience.',
      },
    },
    features: {
      hero: {
        title: 'Discover everything that makes LiftFire unbeatable',
        description:
          'From offline-first logging to AI coaching, explore the systems that turn serious lifters into unstoppable forces.',
      },
      categories: {
        all: 'All Features',
        core: 'Core Features',
        gamification: 'Gamification',
        social: 'Social Features',
        ai: 'AI & Analytics',
        technical: 'Technical',
      },
      featureList: {
        offlinePWA: {
          title: 'Progressive Web App (PWA)',
          description: 'Works everywhere, syncs everywhere.',
          details: [
            'Installable on any device',
            'Offline-first architecture',
            'Automatic background syncing',
            'Native-like performance',
          ],
          status: 'completed',
        },
        aiTrainer: {
          title: 'Your Personal AI Trainer',
          description: 'Adaptive coaching insights and recommendations.',
          details: [
            'AI-powered workout suggestions',
            'Fatigue management',
            'Form correction feedback',
            'Progress analysis',
          ],
          status: 'in-progress',
        },
        nativeApps: {
          title: 'Native Mobile Apps',
          description: 'Optimized experience for iOS and Android.',
          details: [
            'Dedicated iOS app',
            'Dedicated Android app',
            'Push notifications',
            'Offline capabilities',
          ],
          status: 'planned',
        },
      },
    },
    community: {
      hero: {
        title: 'Join the LiftFire Community',
        description:
          'Connect with thousands of lifters, share your progress, and get support.',
      },
      channels: {
        title: 'Connect with Us',
        description: 'Find your tribe and engage with the LiftFire team.',
        discord: {
          title: 'Discord Server',
          description: 'Real-time chat, support, and community events.',
        },
        github: {
          title: 'GitHub Repository',
          description:
            'Contribute to development, report bugs, and suggest features.',
        },
        twitter: {
          title: 'Twitter Community',
          description: 'Stay updated with news, tips, and announcements.',
        },
        reddit: {
          title: 'Reddit Community',
          description:
            'Share your progress, ask questions, and find motivation.',
        },
      },
      beta: {
        title: 'Join Our Beta Program',
        description:
          'Get early access to new features and help shape the future of LiftFire.',
        joinButton: 'Get Early Access',
        learnMore: 'Learn More',
      },
      guidelines: {
        title: 'Community Guidelines',
        description:
          'To ensure a positive and supportive environment for everyone.',
        respectful: {
          title: 'Be Respectful',
          description: 'Treat all members with kindness and respect.',
        },
        helpful: {
          title: 'Be Helpful',
          description: 'Share your knowledge and support others.',
        },
        constructive: {
          title: 'Be Constructive',
          description:
            'Provide feedback and suggestions in a constructive manner.',
        },
      },
    },
    roadmap: {
      hero: {
        title: 'Our Journey Ahead: The LiftFire Roadmap',
        description:
          "See what's next for LiftFire. Our future plans, upcoming features, and long-term vision.",
      },
      quarters: {
        q1_2024: {
          title: 'Q1 2024: Core Foundations',
          theme: 'Building the Base',
          status: 'completed',
          description: 'Establishing core functionality and infrastructure.',
          features: [
            'Offline-first workout tracking',
            'User authentication',
            'Basic analytics',
          ],
          successMetrics: ['99% uptime', '10,000+ active users'],
        },
        q2_2024: {
          title: 'Q2 2024: Gamification & Social',
          theme: 'Making Fitness Fun',
          status: 'in-progress',
          description: 'Adding gamification and social features.',
          features: ['XP system', 'Achievements', 'Friend system'],
          successMetrics: [
            '20% increase in engagement',
            '50% challenge participation',
          ],
        },
      },
    },
    contact: {
      seo: {
        title: 'Contact Us - LiftFire',
        description:
          "Get in touch with the LiftFire team. We're here to help with any questions about our gamified fitness tracking app.",
        keywords: 'contact liftfire,fitness app support,gym tracker help',
      },
      hero: {
        title: 'Get in Touch',
        description: "We're here to help with any questions about LiftFire.",
      },
      methods: {
        title: 'Contact Methods',
        description: 'Choose the best way to reach us.',
      },
      form: {
        title: 'Send us a Message',
        description:
          "Fill out the form below and we'll get back to you as soon as possible.",
        name: 'Name',
        namePlaceholder: 'Enter your name',
        email: 'Email',
        emailPlaceholder: 'Enter your email',
        category: 'Category',
        categories: {
          general: 'General Inquiry',
          technical: 'Technical Support',
          billing: 'Billing',
          partnerships: 'Partnerships',
          press: 'Press',
          feedback: 'Feedback',
        },
        subject: 'Subject',
        subjectPlaceholder: "What's this about?",
        message: 'Message',
        messagePlaceholder: 'How can we help?',
        send: 'Send Message',
      },
    },
  },
  es: {
    common: {
      navigation: {
        home: 'Inicio',
        features: 'Características',
        pricing: 'Precios',
        roadmap: 'Roadmap',
        community: 'Comunidad',
        contact: 'Contacto',
      },
    },
  },
};

i18next.use(initReactI18next).init({
  debug: true,
  initAsync: true,
  ns: ['common', 'homepage', 'features', 'pricing', 'roadmap'],
  defaultNS: 'common',
  fallbackLng: ['en'],
  fallbackNS: ['common'],
  supportedLngs: ['en', 'es', 'cimode'],
  nonExplicitSupportedLngs: true,
  load: 'languageOnly',
  preload: ['en'],
  resources: mockTranslations,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});
