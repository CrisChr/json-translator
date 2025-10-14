import Link from 'next/link';

export type Article = {
    slug: string;
    title: string;
    description: string;
};

export const articles: Article[] = [
    {
        slug: 'api-key-security',
        title: 'API Key Security Best Practices',
        description: 'Why your keys are safe with us and best practices for API key security.',
    },
    {
        slug: 'full-translation-workflow',
        title: 'From Upload to Integration: A Complete JSON Translation Workflow',
        description: 'A step-by-step guide to translating your JSON files with our tool.',
    },
    {
        slug: 'code-friendly',
        title: 'Code Friendly',
        description: 'Supports automatic JSON formatting, you can copy or directly download the JSON file.',
    },
    {
        slug: 'multi-language-support',
        title: 'Multi-language Support',
        description: 'Supports translation in over 30 languages.'
    },
    {
        slug: 'ai-powered',
        title: 'AI-Powered',
        description: 'Utilizes advanced AI technology to ensure translation accuracy and fluency.'
    },
    {
        slug: 'data-security',
        title: 'Data Security',
        description: 'All translation processes are done in your browser, ensuring your data is not uploaded to the cloud.'
    }
];

export default async function HelpPage({ params: { lang } }: { params: { lang: string } }) {
    return (
        <div className="container mx-auto px-4 py-24">
            <h1 className="text-4xl font-bold mb-12 text-center">Help Center</h1>
            <div className="max-w-3xl mx-auto">
                {articles.map((article) => (
                    <div key={article.slug} className="mb-8 p-6 border rounded-lg hover:shadow-lg transition-shadow">
                        <h2 className="text-2xl font-semibold mb-2">
                            <Link href={`/${lang}/help/${article.slug}`} className="text-blue-600 hover:underline">
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
