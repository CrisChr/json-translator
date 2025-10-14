'use client';
import Navbar from '@/components/Navbar';

interface NavbarWrapperProps {
  dict: {
    coffee: string;
    helpCenter: string;
    blog: string;
  };
}

export default function NavbarWrapper({ dict }: NavbarWrapperProps) {

  return <Navbar dict={dict} />;
}
