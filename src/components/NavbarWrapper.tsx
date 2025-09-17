'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getDictionary } from '@/lib/getDictionary';

interface NavbarWrapperProps {
  dict: {
    coffee: string;
  };
}

export default function NavbarWrapper({ dict }: NavbarWrapperProps) {
  const pathname = usePathname();
  // const isBlogPostPage = pathname.includes('/blog/'); // 简单判断是否是博客详情页

  // if (isBlogPostPage) {
  //   return null; // 如果是博客详情页，则不渲染 Navbar
  // }

  return <Navbar dict={dict} />;
}
