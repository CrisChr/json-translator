import React from 'react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="prose lg:prose-xl max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
