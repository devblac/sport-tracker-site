import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { HeroSection } from '../components/sections/HeroSection';
import { FeatureShowcase } from '../components/sections/FeatureShowcase';
import { SocialProofSection } from '../components/sections/SocialProofSection';
import { FinalCTA } from '../components/sections/FinalCTA';
import {
  createOrganizationSchema,
  createWebApplicationSchema,
  createWebPageSchema,
} from '../utils/structuredData';

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

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
    <div>
      <SEO
        title={t('seo.homePage.title')}
        description={t('seo.homePage.description')}
        keywords={t('seo.defaultKeywords').split(',')}
        structuredData={structuredData}
        type="website"
      />
      <HeroSection />
      <FeatureShowcase />
      <SocialProofSection />
      <FinalCTA />
    </div>
  );
};
