import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getDictionary } from '@/lib/getDictionary';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  lang: string;
}

export default async function Breadcrumb({ items, lang }: BreadcrumbProps) {
  const dict = await getDictionary(lang);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      <Link 
        href={`/${lang}`}
        className="flex items-center hover:text-gray-900 transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={`breadcrumb-${index}-${item.label}`} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
