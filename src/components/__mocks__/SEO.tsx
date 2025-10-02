import React from 'react';

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
}) => {
  // Update document title and meta tags directly
  if (title) {
    document.title = title;
  }

  if (description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      meta.setAttribute('content', description);
      document.head.appendChild(meta);
    }
  }

  if (keywords && keywords.length > 0) {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords.join(', '));
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'keywords');
      meta.setAttribute('content', keywords.join(', '));
      document.head.appendChild(meta);
    }
  }

  // Return null since this is just a mock
  return null;
};
