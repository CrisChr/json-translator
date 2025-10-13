import { ReactNode } from 'react';
import Link from 'next/link';
import { articles } from '../page'; // Assuming articles are exported from the blog index page

interface BlogPostLayoutProps {
  children: ReactNode;
  params: {
    slug: string;
    lang: string;
  };
}

export default function BlogPostLayout({ children, params }: BlogPostLayoutProps) {
  const relatedArticles = articles.filter(article => article.slug !== params.slug);

  return (
    <div className="container mx-auto px-4 py-20">
      <article className="prose prose-lg mx-auto">
        {children}
      </article>

      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-5 border-t pt-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {relatedArticles.map((article) => (
            <div key={article.slug} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/${params.lang}/blog/${article.slug}`} className="text-blue-600 hover:underline">
                  {article.title}
                </Link>
              </h3>
              <p className="text-gray-600 text-sm">{article.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
