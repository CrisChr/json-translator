import { MetadataRoute } from 'next';
import { locales } from '@/config/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://jsontrans.fun';

  const sitemapEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${domain}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Add the root URL to the sitemap
  sitemapEntries.unshift({
    url: domain,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1.0,
  });

  return sitemapEntries;
}
