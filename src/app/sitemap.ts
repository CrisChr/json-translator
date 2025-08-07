import { MetadataRoute } from 'next';
import { locales } from '@/config/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://jsontrans.vercel.app';

  const sitemapEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${domain}/${locale}`,
    lastModified: new Date(),
  }));

  return sitemapEntries;
}
