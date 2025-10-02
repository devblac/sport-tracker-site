import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '../../utils/cn';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string | string[];
  };
}

export function PageLayout({ children, className, meta }: PageLayoutProps) {
  useEffect(() => {
    if (meta?.title) {
      document.title = `${meta.title} | LiftFire`;
    }

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (meta?.description) {
      if (!descriptionMeta) {
        descriptionMeta = document.createElement('meta');
        descriptionMeta.setAttribute('name', 'description');
        document.head.appendChild(descriptionMeta);
      }
      descriptionMeta.setAttribute('content', meta.description);
    }

    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (meta?.keywords) {
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      const keywordsContent = Array.isArray(meta.keywords)
        ? meta.keywords.join(', ')
        : meta.keywords;
      keywordsMeta.setAttribute('content', keywordsContent);
    }
  }, [meta]);

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col bg-slate-900 text-slate-100',
        className
      )}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
