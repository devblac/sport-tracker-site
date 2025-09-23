import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import type { HeaderProps } from './Header';
import type { FooterProps } from './Footer';
import { cn } from '../../utils/cn';

export interface PageMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
}

export interface PageLayoutProps {
  children: React.ReactNode;
  meta?: PageMeta;
  headerProps?: Partial<HeaderProps>;
  footerProps?: Partial<FooterProps>;
  className?: string;
  includeHeader?: boolean;
  includeFooter?: boolean;
}

// Meta tag component for managing document head
function MetaTags({ meta }: { meta: PageMeta }) {
  React.useEffect(() => {
    // Update document title
    if (meta.title) {
      document.title = meta.title.includes('LiftFire')
        ? meta.title
        : `${meta.title} | LiftFire`;
    }

    // Update meta description
    if (meta.description) {
      let descriptionMeta = document.querySelector('meta[name="description"]');
      if (!descriptionMeta) {
        descriptionMeta = document.createElement('meta');
        descriptionMeta.setAttribute('name', 'description');
        document.head.appendChild(descriptionMeta);
      }
      descriptionMeta.setAttribute('content', meta.description);
    }

    // Update meta keywords
    if (meta.keywords && meta.keywords.length > 0) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', meta.keywords.join(', '));
    }

    // Update Open Graph tags
    if (meta.ogImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (!ogImageMeta) {
        ogImageMeta = document.createElement('meta');
        ogImageMeta.setAttribute('property', 'og:image');
        document.head.appendChild(ogImageMeta);
      }
      ogImageMeta.setAttribute('content', meta.ogImage);
    }

    if (meta.ogType) {
      let ogTypeMeta = document.querySelector('meta[property="og:type"]');
      if (!ogTypeMeta) {
        ogTypeMeta = document.createElement('meta');
        ogTypeMeta.setAttribute('property', 'og:type');
        document.head.appendChild(ogTypeMeta);
      }
      ogTypeMeta.setAttribute('content', meta.ogType);
    }

    // Update Twitter Card tags
    if (meta.twitterCard) {
      let twitterCardMeta = document.querySelector('meta[name="twitter:card"]');
      if (!twitterCardMeta) {
        twitterCardMeta = document.createElement('meta');
        twitterCardMeta.setAttribute('name', 'twitter:card');
        document.head.appendChild(twitterCardMeta);
      }
      twitterCardMeta.setAttribute('content', meta.twitterCard);
    }

    // Update canonical URL
    if (meta.canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', meta.canonicalUrl);
    }

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      // Note: In a real app, you might want to restore previous meta tags
      // For now, we'll leave them as they are since this is a SPA
    };
  }, [meta]);

  return null; // This component doesn't render anything
}

export function PageLayout({
  children,
  meta = {},
  headerProps = {},
  footerProps = {},
  className,
  includeHeader = true,
  includeFooter = true,
}: PageLayoutProps) {
  // Default meta values
  const defaultMeta: PageMeta = {
    title: 'LiftFire - Transform Your Fitness Journey',
    description:
      'LiftFire is a gamified gym tracker PWA with offline functionality, social features, and AI insights. Track workouts, earn achievements, and connect with friends.',
    keywords: [
      'fitness',
      'gym tracker',
      'workout app',
      'gamification',
      'PWA',
      'offline',
      'social fitness',
    ],
    ogType: 'website',
    twitterCard: 'summary_large_image',
  };

  const mergedMeta = { ...defaultMeta, ...meta };

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col bg-background text-foreground',
        className
      )}
    >
      {/* Meta tags management */}
      <MetaTags meta={mergedMeta} />

      {/* Header */}
      {includeHeader && <Header {...headerProps} />}

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      {includeFooter && <Footer {...footerProps} />}
    </div>
  );
}
