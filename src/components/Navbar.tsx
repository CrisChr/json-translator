"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation'

interface NavbarProps {
  dict: {
    coffee: string;
    helpCenter: string;
    blog: string;
  }
}

export default function Navbar({ dict }: NavbarProps) {
  const params = useParams()
  const pathname = usePathname()
  const lang = params.lang
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const staticPages = ['/blog', '/about', '/privacy', '/terms', '/help']
  const isStaticPage = !!staticPages.find((page) => pathname.includes(page))

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${isStaticPage ? 'bg-blue-600/80 backdrop-blur-sm shadow-sm' : scrolled ? 'bg-blue-600/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + 网站名称 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-12 h-7">
              <Image
                src={"/logo-white.png"}
                alt="JSON Translater Logo"
                width={512}
                height={316}
                className="object-contain"
                priority
              />
            </div>
            <span className={`font-semibold text-lg hidden sm:block ${scrolled ? 'text-white' : 'text-white'
              }`}>
              JSON Translater
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href={`/${lang}/help`}
              className={`transition-colors ${
                scrolled ? 'text-white hover:text-white/80' : 'text-white hover:text-white/80'
              }`}
            >
              {dict.helpCenter}
            </Link>
            <Link
              href={`/${lang}/blog`}
              className={`transition-colors ${
                scrolled ? 'text-white hover:text-white/80' : 'text-white hover:text-white/80'
              }`}
            >
              {dict.blog}
            </Link>
            {mounted && <LanguageSwitcher />}

            {/* GitHub 链接 */}
            <a
              href="https://github.com/CrisChr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`transition-colors ${scrolled ? 'text-white hover:text-white/80' : 'text-white hover:text-white/80'
                }`}
            >
              <span className="sr-only">GitHub</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://buymeacoffee.com/ponyred"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${scrolled
                  ? 'bg-white/20 text-white hover:bg-white/30'
                  : 'bg-white/20 text-white hover:bg-white/30'
                }`}
            >
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                role="img"
              >
                <title>Buy me a coffee</title>
                <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4v-2z" />
              </svg>
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
