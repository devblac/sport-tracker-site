import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  twitterCard?: string;
  structuredData?: object;
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image = '/vite.svg',
  url,
  type = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  noIndex = false,
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Default values with translations
  const defaultTitle = t(
    'seo.defaultTitle',
    'LiftFire - Transform Your Fitness Journey'
  );
  const defaultDescription = t(
    'seo.defaultDescription',
    'Gamified gym tracker with offline functionality, social features, and AI insights. Track workouts, earn XP, and connect with the fitness community.'
  );
  const defaultKeywordsString = t(
    'seo.defaultKeywords',
    'gym tracker,fitness app,workout tracker,gamified fitness,offline gym app,PWA fitness,social fitness'
  );
  const defaultKeywords =
    typeof defaultKeywordsString === 'string'
      ? defaultKeywordsString.split(',')
      : [];

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords =
    Array.isArray(keywords) && keywords.length > 0 ? keywords : defaultKeywords;
  const finalUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '');

  // Generate hreflang URLs
  const baseUrl =
    typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.host}`
      : 'https://liftfire.app';

  const currentPath =
    typeof window !== 'undefined' && window.location && window.location.pathname
      ? window.location.pathname
          .replace(/^\/[a-z]{2}\//, '/')
          .replace(/^\//, '')
      : '';

  const hreflangs = [
    { lang: 'en', url: `${baseUrl}/${currentPath}` },
    { lang: 'es', url: `${baseUrl}/es/${currentPath}` },
    { lang: 'x-default', url: `${baseUrl}/${currentPath}` },
  ];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta
        name="keywords"
        content={
          Array.isArray(finalKeywords)
            ? finalKeywords.join(', ')
            : finalKeywords
        }
      />
      <meta name="language" content={currentLanguage} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:site_name" content="LiftFire" />
      <meta
        property="og:locale"
        content={currentLanguage === 'es' ? 'es_ES' : 'en_US'}
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
      <meta name="twitter:site" content="@LiftFireApp" />
      <meta name="twitter:creator" content="@LiftFireApp" />

      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />

      {/* Hreflang Tags */}
      {hreflangs.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
