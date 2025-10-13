import Link from 'next/link';
import { getDictionary } from '@/lib/getDictionary'

export type Article = {
  slug: string;
  title: string;
  description: string;
};

export const articles: Article[] = [
  {
    slug: 'what-is-json',
    title: 'What is JSON? A Beginner\'s Guide for Web Developers',
    description: 'JSON is a lightweight data-interchange format that has become the de facto standard in web development. This article will guide you through its basic structure, its differences from XML, and its practical applications.',
  },
  {
    slug: 'how-to-build',
    title: 'How to build multi-language website and manage JSON files',
    description: 'In this article, I will share my experience of building a multi-language website and managing JSON files.',
  },
  {
    slug: 'common-json-error',
    title: '5 Common JSON Format Errors and How to Fix Them Quickly',
    description: 'JSON is a popular data format, but it\'s not without its pitfalls. In this article, we\'ll explore the most common errors you might encounter and how to fix them.',
  },
  {
    slug: 'json-vs-xml',
    title: 'JSON vs XML: Which One Should You Choose for Your Web Project?',
    description: 'JSON and XML are both popular data formats, but which one is better for your web project? In this article, we\'ll compare the two and help you make an informed decision.',
  }
];

export default async function BlogPage({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang)

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
      <div className="max-w-3xl mx-auto">
        {articles.map((article) => (
          <div key={article.slug} className="mb-8 p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/${lang}/blog/${article.slug}`} className="text-blue-600 hover:underline">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-600">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
