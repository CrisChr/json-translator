import { MetadataRoute } from 'next';
import { locales } from '@/config/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://jsontrans.fun';
  const pages = ['', '/about', '/privacy', '/terms', '/blog']; // Add all static pages here

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${domain}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 0.9 : 0.8,
      });
    });
  });

  // Add the root URL to the sitemap
  sitemapEntries.unshift({
    url: domain,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  return sitemapEntries;
}
