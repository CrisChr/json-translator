import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import whatIsJsonMarkdown from '@/content/what-is-json';
import howToBuildMarkdown from '@/content/how-to-build';
import commonErrorMarkdown from '@/content/common-json-error';
import jsonVsXmlMarkdown from '@/content/json-vs-xml';
import { getDictionary } from '@/lib/getDictionary';
import React from 'react'; // Import React for React.HTMLAttributes

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
  img: ({ node, ...props }) => <img className="max-w-full h-auto my-4 rounded-md" {...props} />,
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
        return <p>Article not found.</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      {renderContent()}
    </div>
  );
}
