import ReactMarkdown from 'react-markdown';
import whatIsJsonMarkdown from '@/content/what-is-json';
import { getDictionary } from '@/lib/getDictionary';

export default async function BlogPostPage({ params }: { params: { slug: string, lang: string } }) {
  const dict = await getDictionary(params.lang);

  const renderContent = () => {
    switch (params.slug) {
      case 'what-is-json':
        return (
          <div className="prose lg:prose-xl max-w-none">
            <ReactMarkdown>{whatIsJsonMarkdown}</ReactMarkdown>
          </div>
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
