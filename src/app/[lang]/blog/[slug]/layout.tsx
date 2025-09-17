import { ReactNode } from 'react';

interface BlogPostLayoutProps {
  children: ReactNode;
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
