import { MetadataRoute } from 'next';
import { locales } from '@/config/i18n';

// Assuming blogMetadata is accessible here or fetched.
// For simplicity, let's define it directly. In a real app, you might import it.
const blogPosts = [
  { slug: 'what-is-json', lastModified: '2025-10-01' },
  { slug: 'how-to-build', lastModified: '2025-10-04' },
  { slug: 'common-json-error', lastModified: '2025-10-08' },
  { slug: 'json-vs-xml', lastModified: '2025-10-11' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://jsontrans.fun';

  // 1. Static pages per locale
  const staticPages = ['', '/about', '/privacy', '/terms', '/blog'];
  const sitemapEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${domain}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'monthly',
      priority: page === '' ? 1.0 : 0.8,
    }))
  );

  // 2. Dynamic blog posts per locale
  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${domain}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.lastModified),
      changeFrequency: 'weekly',
      priority: 0.9,
    }))
  );

  return [...sitemapEntries, ...blogEntries];
}
