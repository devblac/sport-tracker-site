import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { HOMEPAGE_STATS, HERO_BULLETS, STORE_LINKS } from '../data/homepage';
import {
  ALL_FEATURES,
  FEATURE_CATEGORIES,
  type FeatureCategory,
  type FeatureStatus,
} from '../data/features';
import { ROADMAP_QUARTERS } from '../data/roadmap';
import { HeroSection } from '../components/sections/home/HeroSection';
import { StatsStrip } from '../components/sections/home/StatsStrip';
import {
  FeaturePillars,
  type FeatureHighlight,
} from '../components/sections/home/FeaturePillars';
import { RoadmapPreviewSection } from '../components/sections/home/RoadmapPreview';
import { CommunityAiSection } from '../components/sections/home/CommunityAiSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Activity, Brain, ShieldCheck, Trophy, Users } from 'lucide-react';
import {
  createOrganizationSchema,
  createWebApplicationSchema,
  createWebPageSchema,
} from '../utils/structuredData';
const statusWeight: Record<FeatureStatus, number> = {
  completed: 0,
  'in-progress': 1,
  planned: 2,
  experimental: 3,
};

const HERO_EYEBROW =
  'LiftFire • Strength analytics for athletes who demand more';

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const highlightedByCategory = useMemo(() => {
    const lookup = new Map<FeatureCategory, (typeof ALL_FEATURES)[number]>();

    ALL_FEATURES.forEach(feature => {
      const current = lookup.get(feature.category);
      if (
        !current ||
        statusWeight[feature.status] < statusWeight[current.status]
      ) {
        lookup.set(feature.category, feature);
      }
    });

    return Array.from(lookup.entries()).map(([category, feature]) => ({
      category,
      feature,
    }));
  }, []);

  const iconMap: Record<
    FeatureCategory,
    React.ComponentType<{ className?: string }>
  > = {
    core: Activity,
    gamification: Trophy,
    social: Users,
    ai: Brain,
    technical: ShieldCheck,
  };

  const featureHighlights: FeatureHighlight[] = highlightedByCategory.map(
    ({ category, feature }) => ({
      categoryLabel: FEATURE_CATEGORIES[category],
      title: feature.title,
      description: feature.description,
      icon: iconMap[category],
    })
  );

  const roadmapPreview = useMemo(() => ROADMAP_QUARTERS.slice(0, 3), []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      createOrganizationSchema(currentLanguage),
      createWebApplicationSchema(currentLanguage),
      createWebPageSchema(
        t('seo.homePage.title'),
        t('seo.homePage.description'),
        typeof window !== 'undefined'
          ? window.location.href
          : 'https://liftfire.app',
        currentLanguage
      ),
    ],
  };

  return (
    <main>
      <SEO
        title={t('seo.homePage.title')}
        description={t('seo.homePage.description')}
        keywords={t('seo.defaultKeywords').split(',')}
        structuredData={structuredData}
        type="website"
      />

      <HeroSection
        eyebrow={HERO_EYEBROW}
        title="Think less. Lift more."
        subtitle="The offline-first strength companion trusted by dedicated lifters. Track effortlessly, stay motivated, and let LiftFire AI guide every training block."
        bullets={HERO_BULLETS}
        storeLinks={STORE_LINKS}
        primaryCta={{
          label: t('buttons.startJourney', { ns: 'common' }),
          href: '/contact',
        }}
        secondaryCta={{ label: 'Explore product tour', href: '/features' }}
      />

      <StatsStrip stats={HOMEPAGE_STATS} />

      <FeaturePillars
        heading="Engineered for lifters who take progress seriously"
        description="Every pillar of LiftFire is tuned for the full training lifecycle—from logging offline to celebrating streaks with your crew."
        highlights={featureHighlights}
      />

      <RoadmapPreviewSection
        heading="Roadmap momentum"
        description="We ship in the open. Here's what just landed, what's in flight, and what's inspiring the next releases."
        quarters={roadmapPreview}
      />

      <CommunityAiSection />

      <FinalCTA />
    </main>
  );
};
