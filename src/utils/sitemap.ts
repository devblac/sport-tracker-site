// Sitemap generation utilities

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
  alternates?: Array<{
    hreflang: string;
    href: string;
  }>;
}

export const generateSitemap = (urls: SitemapUrl[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen =
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
  const urlsetClose = '</urlset>';

  const urlElements = urls
    .map(url => {
      let urlElement = `  <url>
    <loc>${url.loc}</loc>`;

      if (url.lastmod) {
        urlElement += `
    <lastmod>${url.lastmod}</lastmod>`;
      }

      if (url.changefreq) {
        urlElement += `
    <changefreq>${url.changefreq}</changefreq>`;
      }

      if (url.priority !== undefined) {
        urlElement += `
    <priority>${url.priority}</priority>`;
      }

      if (url.alternates && url.alternates.length > 0) {
        url.alternates.forEach(alternate => {
          urlElement += `
    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`;
        });
      }

      urlElement += `
  </url>`;

      return urlElement;
    })
    .join('\n');

  return `${xmlHeader}
${urlsetOpen}
${urlElements}
${urlsetClose}`;
};

export const getDefaultSitemapUrls = (): SitemapUrl[] => {
  const baseUrl = 'https://liftfire.app';
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  const pages = [
    { path: '', priority: 1.0, changefreq: 'weekly' as const },
    { path: '/features', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/pricing', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/roadmap', priority: 0.7, changefreq: 'weekly' as const },
  ];

  const urls: SitemapUrl[] = [];

  pages.forEach(page => {
    // English version (default)
    urls.push({
      loc: `${baseUrl}${page.path}`,
      lastmod,
      changefreq: page.changefreq,
      priority: page.priority,
      alternates: [
        { hreflang: 'en', href: `${baseUrl}${page.path}` },
        { hreflang: 'es', href: `${baseUrl}/es${page.path}` },
        { hreflang: 'x-default', href: `${baseUrl}${page.path}` },
      ],
    });

    // Spanish version
    urls.push({
      loc: `${baseUrl}/es${page.path}`,
      lastmod,
      changefreq: page.changefreq,
      priority: page.priority * 0.9, // Slightly lower priority for non-default language
      alternates: [
        { hreflang: 'en', href: `${baseUrl}${page.path}` },
        { hreflang: 'es', href: `${baseUrl}/es${page.path}` },
        { hreflang: 'x-default', href: `${baseUrl}${page.path}` },
      ],
    });
  });

  return urls;
};

export const generateRobotsTxt = (): string => {
  const baseUrl = 'https://liftfire.app';

  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Block access to admin or sensitive areas (if any)
# Disallow: /admin/
# Disallow: /api/

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /`;
};
