import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import whatIsJsonMarkdown from '@/content/what-is-json';
import howToBuildMarkdown from '@/content/how-to-build';
import commonErrorMarkdown from '@/content/common-json-error';
import jsonVsXmlMarkdown from '@/content/json-vs-xml';
import { getDictionary } from '@/lib/getDictionary';
import { locales, defaultLocale } from '@/config/i18n';
import React from 'react'; // Import React for React.HTMLAttributes

// Metadata for each blog post
const blogMetadata: { [key: string]: { title: string; description: string; date: string; } } = {
  'what-is-json': {
    title: 'What is JSON? A Comprehensive Guide for Developers',
    description: 'Explore the fundamentals of JSON, including its syntax, data types, and common use cases in web development and APIs.',
    date: '2025-10-01',
  },
  'how-to-build': {
    title: 'How to Build a Multilingual Website with Next.js',
    description: 'A step-by-step guide on creating an internationalized (i18n) website using Next.js App Router and modern localization techniques.',
    date: '2025-10-04',
  },
  'common-json-error': {
    title: 'Common JSON Errors and How to Fix Them',
    description: 'Learn to identify and resolve frequent JSON parsing errors, such as syntax mistakes, invalid data types, and encoding issues.',
    date: '2025-10-08',
  },
  'json-vs-xml': {
    title: 'JSON vs. XML: Key Differences and When to Use Each',
    description: 'A detailed comparison of JSON and XML, covering their structure, verbosity, parsing speed, and ideal applications.',
    date: '2025-10-11',
  },
};

export async function generateMetadata({ params }: { params: { slug: string, lang: string } }): Promise<Metadata> {
  const slug = params.slug;
  const lang = params.lang;
  const metadata = blogMetadata[slug];

  if (!metadata) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    image: `https://jsontrans.fun/og-image.png`,
    datePublished: metadata.date,
    author: {
      '@type': 'Organization',
      name: 'jsontrans.fun',
      url: 'https://jsontrans.fun',
    },
    publisher: {
      '@type': 'Organization',
      name: 'jsontrans.fun',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jsontrans.fun/logo-blue.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://jsontrans.fun/${lang}/blog/${slug}`,
    },
  };

  const domain = "https://jsontrans.fun";
  const languageAlternates = locales.reduce(
    (acc: { [key: string]: string }, locale: string) => {
      acc[locale] = `${domain}/${locale}/blog/${slug}`;
      return acc;
    },
    {},
  );

  languageAlternates['x-default'] = `${domain}/${defaultLocale}/blog/${slug}`;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${domain}/${lang}/blog/${slug}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `/${lang}/blog/${slug}`,
      type: 'article',
      publishedTime: metadata.date,
      images: [
        {
          url: 'https://jsontrans.fun/og-image.png',
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: ['https://jsontrans.fun/og-image.png'],
    },
    other: {
      'ld+json': JSON.stringify(articleJsonLd),
    },
  };
}

// Custom components to ensure semantic HTML tags and potentially add styling/syntax highlighting
const components: Components = {
  h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-4" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mb-3" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mb-2" {...props} />,
  p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 pl-5" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 pl-5" {...props} />,
  li: ({ node, ...props }) => <li className="mb-2" {...props} />,
  a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
  code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto mb-4">
        <code className={`language-${match[1]}`} {...props}>
          {children}
        </code>
      </pre>
    ) : (
      <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded-sm" {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4" {...props} />
  ),
  img: ({ node, alt, ...props }) => <img className="max-w-full h-auto my-4 rounded-md" alt={alt || ''} {...props} />,
  table: ({ node, ...props }) => (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-4" {...props} />
  ),
  thead: ({ node, ...props }) => (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
  ),
  tbody: ({ node, ...props }) => (
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700" {...props} />
  ),
  tr: ({ node, ...props }) => (
    <tr {...props} />
  ),
  th: ({ node, ...props }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200" {...props} />
  ),
};

export default async function BlogPostPage({ params }: { params: { slug: string, lang: string } }) {
  const dict = await getDictionary(params.lang);

  const renderContent = () => {
    switch (params.slug) {
      case 'what-is-json':
        return (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {whatIsJsonMarkdown}
          </ReactMarkdown>
        );
      case 'how-to-build':
        return (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {howToBuildMarkdown}
          </ReactMarkdown>
        );
      case 'common-json-error':
        return (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {commonErrorMarkdown}
          </ReactMarkdown>
        );
      case 'json-vs-xml':
        return (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {jsonVsXmlMarkdown}
          </ReactMarkdown>
        );
      default:
        notFound();
    }
  };

  return (
    <div className="container mx-auto px-4 py-15">
      {renderContent()}
    </div>
  );
}
