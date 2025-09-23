import { useTranslation } from 'react-i18next';
import { createKeyBuilder } from '../i18n/utils';

// Common translation keys type for better TypeScript support
export interface CommonTranslations {
  navigation: {
    home: string;
    features: string;
    pricing: string;
    roadmap: string;
    community: string;
    contact: string;
  };
  buttons: {
    startJourney: string;
    watchDemo: string;
    learnMore: string;
    getStarted: string;
    tryFree: string;
    upgrade: string;
    download: string;
    viewAll: string;
    readMore: string;
    close: string;
    menu: string;
    back: string;
    next: string;
    previous: string;
  };
  labels: {
    language: string;
    theme: string;
    lightMode: string;
    darkMode: string;
    loading: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    required: string;
    optional: string;
    email: string;
    name: string;
    message: string;
    subject: string;
    send: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    confirm: string;
  };
  status: {
    completed: string;
    inProgress: string;
    planned: string;
    experimental: string;
    available: string;
    comingSoon: string;
    beta: string;
    new: string;
  };
  footer: {
    tagline: string;
    product: string;
    company: string;
    community: string;
    legal: string;
    privacyPolicy: string;
    termsOfService: string;
    cookiePolicy: string;
    support: string;
    documentation: string;
    blog: string;
    about: string;
    careers: string;
    press: string;
    allRightsReserved: string;
  };
}

/**
 * Hook for common translations with TypeScript support
 */
export const useCommonTranslations = () => {
  const { t } = useTranslation('common');

  return {
    navigation: {
      home: t('navigation.home'),
      features: t('navigation.features'),
      pricing: t('navigation.pricing'),
      roadmap: t('navigation.roadmap'),
      community: t('navigation.community'),
      contact: t('navigation.contact'),
    },
    buttons: {
      startJourney: t('buttons.startJourney'),
      watchDemo: t('buttons.watchDemo'),
      learnMore: t('buttons.learnMore'),
      getStarted: t('buttons.getStarted'),
      tryFree: t('buttons.tryFree'),
      upgrade: t('buttons.upgrade'),
      download: t('buttons.download'),
      viewAll: t('buttons.viewAll'),
      readMore: t('buttons.readMore'),
      close: t('buttons.close'),
      menu: t('buttons.menu'),
      back: t('buttons.back'),
      next: t('buttons.next'),
      previous: t('buttons.previous'),
    },
    labels: {
      language: t('labels.language'),
      theme: t('labels.theme'),
      lightMode: t('labels.lightMode'),
      darkMode: t('labels.darkMode'),
      loading: t('labels.loading'),
      error: t('labels.error'),
      success: t('labels.success'),
      warning: t('labels.warning'),
      info: t('labels.info'),
      required: t('labels.required'),
      optional: t('labels.optional'),
      email: t('labels.email'),
      name: t('labels.name'),
      message: t('labels.message'),
      subject: t('labels.subject'),
      send: t('labels.send'),
      cancel: t('labels.cancel'),
      save: t('labels.save'),
      edit: t('labels.edit'),
      delete: t('labels.delete'),
      confirm: t('labels.confirm'),
    },
    status: {
      completed: t('status.completed'),
      inProgress: t('status.inProgress'),
      planned: t('status.planned'),
      experimental: t('status.experimental'),
      available: t('status.available'),
      comingSoon: t('status.comingSoon'),
      beta: t('status.beta'),
      new: t('status.new'),
    },
    footer: {
      tagline: t('footer.tagline'),
      product: t('footer.product'),
      company: t('footer.company'),
      community: t('footer.community'),
      legal: t('footer.legal'),
      privacyPolicy: t('footer.privacyPolicy'),
      termsOfService: t('footer.termsOfService'),
      cookiePolicy: t('footer.cookiePolicy'),
      support: t('footer.support'),
      documentation: t('footer.documentation'),
      blog: t('footer.blog'),
      about: t('footer.about'),
      careers: t('footer.careers'),
      press: t('footer.press'),
      allRightsReserved: t('footer.allRightsReserved'),
    },
  } as CommonTranslations;
};

/**
 * Hook for namespace-specific translations
 */
export const useNamespaceTranslations = (namespace: string) => {
  const { t } = useTranslation(namespace);
  const keyBuilder = createKeyBuilder(namespace);

  return {
    t,
    key: keyBuilder,
  };
};

/**
 * Hook for pluralization support
 */
export const usePluralization = () => {
  const { t } = useTranslation();

  const plural = (key: string, count: number, options?: any) => {
    return t(key, { count, ...options });
  };

  return { plural };
};

/**
 * Hook for interpolation support
 */
export const useInterpolation = () => {
  const { t } = useTranslation();

  const interpolate = (key: string, values: Record<string, any>) => {
    return t(key, values);
  };

  return { interpolate };
};

/**
 * Hook for homepage translations
 */
export const useHomepageTranslations = () => {
  const { t } = useTranslation('homepage');

  return {
    hero: {
      headline: t('hero.headline'),
      subheadline: t('hero.subheadline'),
      primaryCTA: t('hero.primaryCTA'),
      secondaryCTA: t('hero.secondaryCTA'),
      trustIndicator: t('hero.trustIndicator'),
    },
    features: {
      title: t('features.title'),
      subtitle: t('features.subtitle'),
      offline: {
        title: t('features.offline.title'),
        description: t('features.offline.description'),
        benefits: t('features.offline.benefits', {
          returnObjects: true,
        }) as string[],
      },
      gamification: {
        title: t('features.gamification.title'),
        description: t('features.gamification.description'),
        benefits: t('features.gamification.benefits', {
          returnObjects: true,
        }) as string[],
      },
      social: {
        title: t('features.social.title'),
        description: t('features.social.description'),
        benefits: t('features.social.benefits', {
          returnObjects: true,
        }) as string[],
      },
    },
    socialProof: {
      title: t('socialProof.title'),
      stats: {
        users: t('socialProof.stats.users'),
        workouts: t('socialProof.stats.workouts'),
        satisfaction: t('socialProof.stats.satisfaction'),
        languages: t('socialProof.stats.languages'),
      },
      testimonials: {
        title: t('socialProof.testimonials.title'),
        items: t('socialProof.testimonials.items', {
          returnObjects: true,
        }) as Array<{
          quote: string;
          author: string;
          role: string;
        }>,
      },
    },
    demo: {
      title: t('demo.title'),
      subtitle: t('demo.subtitle'),
      watchButton: t('demo.watchButton'),
      tryButton: t('demo.tryButton'),
    },
    finalCTA: {
      title: t('finalCTA.title'),
      subtitle: t('finalCTA.subtitle'),
      primaryButton: t('finalCTA.primaryButton'),
      secondaryButton: t('finalCTA.secondaryButton'),
      features: t('finalCTA.features', { returnObjects: true }) as string[],
    },
  };
};

/**
 * Hook for features page translations
 */
export const useFeaturesTranslations = () => {
  const { t } = useTranslation('features');

  return {
    title: t('title'),
    subtitle: t('subtitle'),
    categories: {
      core: t('categories.core'),
      gamification: t('categories.gamification'),
      social: t('categories.social'),
      ai: t('categories.ai'),
      technical: t('categories.technical'),
    },
    techStack: {
      title: t('techStack.title'),
      subtitle: t('techStack.subtitle'),
      frontend: t('techStack.frontend'),
      backend: t('techStack.backend'),
      offline: t('techStack.offline'),
      ui: t('techStack.ui'),
      testing: t('techStack.testing'),
      deployment: t('techStack.deployment'),
    },
    comingSoon: {
      title: t('comingSoon.title'),
      subtitle: t('comingSoon.subtitle'),
      description: t('comingSoon.description'),
    },
  };
};

/**
 * Hook for pricing page translations
 */
export const usePricingTranslations = () => {
  const { t } = useTranslation('pricing');

  return {
    title: t('title'),
    subtitle: t('subtitle'),
    plans: {
      free: {
        name: t('plans.free.name'),
        price: t('plans.free.price'),
        period: t('plans.free.period'),
        description: t('plans.free.description'),
        popular: false,
        features: t('plans.free.features', { returnObjects: true }) as string[],
        limitations: t('plans.free.limitations', {
          returnObjects: true,
        }) as string[],
        cta: t('plans.free.cta'),
      },
      pro: {
        name: t('plans.pro.name'),
        price: t('plans.pro.price'),
        period: t('plans.pro.period'),
        description: t('plans.pro.description'),
        popular: true,
        features: t('plans.pro.features', { returnObjects: true }) as string[],
        cta: t('plans.pro.cta'),
      },
      elite: {
        name: t('plans.elite.name'),
        price: t('plans.elite.price'),
        period: t('plans.elite.period'),
        description: t('plans.elite.description'),
        popular: false,
        features: t('plans.elite.features', {
          returnObjects: true,
        }) as string[],
        cta: t('plans.elite.cta'),
      },
    },
    faq: {
      title: t('faq.title'),
      items: t('faq.items', { returnObjects: true }) as Array<{
        question: string;
        answer: string;
      }>,
    },
    guarantee: {
      title: t('guarantee.title'),
      description: t('guarantee.description'),
    },
    upgrade: {
      title: t('upgrade.title'),
      subtitle: t('upgrade.subtitle'),
      benefits: t('upgrade.benefits', { returnObjects: true }) as string[],
      cta: t('upgrade.cta'),
    },
  };
};

/**
 * Hook for roadmap page translations
 */
export const useRoadmapTranslations = () => {
  const { t } = useTranslation('roadmap');

  return {
    title: t('title'),
    subtitle: t('subtitle'),
    intro: {
      title: t('intro.title'),
      description: t('intro.description'),
      philosophy: t('intro.philosophy'),
    },
    longTerm: {
      title: t('longTerm.title'),
      subtitle: t('longTerm.subtitle'),
      description: t('longTerm.description'),
      goals: t('longTerm.goals', { returnObjects: true }) as Array<{
        title: string;
        description: string;
        timeline: string;
      }>,
    },
    community: {
      title: t('community.title'),
      subtitle: t('community.subtitle'),
      description: t('community.description'),
      ways: t('community.ways', { returnObjects: true }) as string[],
      cta: {
        title: t('community.cta.title'),
        description: t('community.cta.description'),
        discord: t('community.cta.discord'),
        email: t('community.cta.email'),
      },
    },
    updates: {
      title: t('updates.title'),
      subtitle: t('updates.subtitle'),
      newsletter: {
        title: t('updates.newsletter.title'),
        description: t('updates.newsletter.description'),
        cta: t('updates.newsletter.cta'),
      },
      social: {
        title: t('updates.social.title'),
        description: t('updates.social.description'),
        platforms: t('updates.social.platforms', {
          returnObjects: true,
        }) as string[],
      },
    },
  };
};

/**
 * General hook for translations with namespace support
 */
export const useTranslations = (namespace?: string) => {
  const { t } = useTranslation(namespace);

  return { t };
};
