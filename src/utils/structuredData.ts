// Structured Data utilities for SEO

export interface Organization {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    '@type': string;
    contactType: string;
    email: string;
  };
}

export interface WebApplication {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string[];
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
  }[];
  aggregateRating?: {
    '@type': string;
    ratingValue: number;
    reviewCount: number;
  };
  author: {
    '@type': string;
    name: string;
  };
}

export interface WebPage {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  isPartOf: {
    '@type': string;
    name: string;
    url: string;
  };
}

export const createOrganizationSchema = (
  language: string = 'en'
): Organization => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LiftFire',
  url: 'https://liftfire.app',
  logo: 'https://liftfire.app/logo.png',
  description:
    language === 'es'
      ? 'Aplicación de seguimiento de gimnasio gamificada con funcionalidad offline, características sociales e insights de IA.'
      : 'Gamified gym tracker with offline functionality, social features, and AI insights.',
  sameAs: [
    'https://github.com/liftfire',
    'https://discord.gg/liftfire',
    'https://twitter.com/LiftFireApp',
    'https://instagram.com/liftfireapp',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'support@liftfire.app',
  },
});

export const createWebApplicationSchema = (
  language: string = 'en'
): WebApplication => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LiftFire',
  description:
    language === 'es'
      ? 'Aplicación de seguimiento de gimnasio gamificada que transforma tu viaje fitness con funcionalidad offline, características sociales e insights de IA.'
      : 'Gamified gym tracker that transforms your fitness journey with offline functionality, social features, and AI insights.',
  url: 'https://liftfire.app',
  applicationCategory: 'HealthApplication',
  operatingSystem: [
    'Web Browser',
    'iOS',
    'Android',
    'Windows',
    'macOS',
    'Linux',
  ],
  offers: [
    {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      price: '9.99',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      price: '19.99',
      priceCurrency: 'USD',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 1250,
  },
  author: {
    '@type': 'Organization',
    name: 'LiftFire Team',
  },
});

export const createWebPageSchema = (
  title: string,
  description: string,
  url: string,
  language: string = 'en'
): WebPage => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url,
  inLanguage: language,
  isPartOf: {
    '@type': 'WebSite',
    name: 'LiftFire',
    url: 'https://liftfire.app',
  },
});

export const createBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const createFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const createSoftwareApplicationSchema = (language: string = 'en') => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LiftFire',
  description:
    language === 'es'
      ? 'Aplicación PWA de seguimiento de gimnasio con gamificación, funcionalidad offline y características sociales.'
      : 'Progressive Web App for gym tracking with gamification, offline functionality, and social features.',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'LiftFire Team',
  },
  downloadUrl: 'https://liftfire.app',
  featureList:
    language === 'es'
      ? [
          'Seguimiento offline de entrenamientos',
          'Sistema de gamificación con XP y logros',
          'Características sociales y comunidad',
          'Base de datos de 1000+ ejercicios',
          'Insights de IA y recomendaciones',
          'Sincronización en la nube',
          'Aplicación web progresiva (PWA)',
        ]
      : [
          'Offline workout tracking',
          'Gamification system with XP and achievements',
          'Social features and community',
          '1000+ exercise database',
          'AI insights and recommendations',
          'Cloud synchronization',
          'Progressive Web App (PWA)',
        ],
});
