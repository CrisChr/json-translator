import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/getDictionary';
import { locales, defaultLocale } from '@/config/i18n';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import codeFriendlyMarkdown from '@/content/code-friendly';
import multiLanguageSurpport from '@/content/muti-language-support';
import aiPoweredMarkdown from '@/content/ai-powered';
import dataSecurityMarkdown from '@/content/data-security';
import fullTranslationWorkflowMarkdown from '@/content/full-translation-workflow';
import apiKeySecurityMarkdown from '@/content/api-key-security';

// Metadata for each help post
const helpMetadata: { [key: string]: { title: string; description: string; date: string; } } = {
    'api-key-security': {
        title: 'API Key Security Best Practices',
        description: 'Why your keys are safe with us and best practices for API key security.',
        date: '2025-10-14',
    },
    'full-translation-workflow': {
        title: 'From Upload to Integration: A Complete JSON Translation Workflow',
        description: 'A step-by-step guide to translating your JSON files with our tool.',
        date: '2025-10-14',
    },
    'code-friendly': {
        title: 'Code-Friendly',
        description: 'Supports automatic JSON formatting, you can copy or directly download the JSON file.',
        date: '2025-08-14',
    },
    'multi-language-support': {
        title: 'Multi-language Support',
        description: 'Supports translation in over 30 languages.',
        date: '2025-08-14'
    },
    'ai-powered': {
        title: 'AI-Powered',
        description: 'Utilizes advanced AI technology to ensure translation accuracy and fluency.',
        date: '2025-08-14'
    },
    'data-security': {
        title: 'Data Security',
        description: 'All translation processes are done in your browser, ensuring your data is not uploaded to the cloud.',
        date: '2025-08-15'
    }
};

export async function generateMetadata({ params }: { params: { slug: string, lang: string } }): Promise<Metadata> {
    const slug = params.slug;
    const lang = params.lang;
    const metadata = helpMetadata[slug];

    if (!metadata) {
        notFound();
    }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    proficiencyLevel: 'Beginner',
    technicalAudience: 'Developers',
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
            '@id': `https://jsontrans.fun/${lang}/help/${slug}`,
        },
    };

    const domain = "https://jsontrans.fun";
    const languageAlternates = locales.reduce(
        (acc: { [key: string]: string }, locale: string) => {
            acc[locale] = `${domain}/${locale}/help/${slug}`;
            return acc;
        },
        {},
    );

    languageAlternates['x-default'] = `${domain}/${defaultLocale}/help/${slug}`;

    return {
        title: metadata.title,
        description: metadata.description,
        alternates: {
            canonical: `${domain}/${lang}/help/${slug}`,
            languages: languageAlternates,
        },
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            url: `/${lang}/help/${slug}`,
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

export default async function HelpPostPage({ params }: { params: { slug: string, lang: string } }) {
    const dict = await getDictionary(params.lang);

    const renderContent = () => {
        switch (params.slug) {
            case 'api-key-security':
                return (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                        {apiKeySecurityMarkdown}
                    </ReactMarkdown>
                );
            case 'full-translation-workflow':
                return (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                        {fullTranslationWorkflowMarkdown}
                    </ReactMarkdown>
                );
            case 'code-friendly':
                return (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                        {codeFriendlyMarkdown}
                    </ReactMarkdown>
                );
            case 'multi-language-support':
                return (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                        {multiLanguageSurpport}
                    </ReactMarkdown>
                );
            case 'ai-powered':
                return (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                        {aiPoweredMarkdown}
                    </ReactMarkdown>
                );
            case 'data-security':
                return (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                        {dataSecurityMarkdown}
                    </ReactMarkdown>
                )
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
