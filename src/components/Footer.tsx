"use client"

import { useParams } from 'next/navigation'

interface FooterProps {
  dict: {
    creator: string;
    twitter: string;
    coffee: string;
    navigation: string;
    resources: string;
    contact: string;
    about: string;
    blog: string;
    privacy: string;
    terms: string;
  }
}

export default function Footer({ dict }: FooterProps) {
  const params = useParams()
  const lang = params.lang

  const linkGroups: {
    title: string;
    links: { href: string; text: string; target?: string }[];
  }[] = [
      {
        title: dict.navigation,
        links: [
          { href: `/${lang}/about`, text: dict.about },
          { href: `/${lang}/blog`, text: dict.blog },
          { href: `/${lang}/privacy`, text: dict.privacy },
          { href: `/${lang}/terms`, text: dict.terms },
        ],
      },
      {
        title: dict.resources,
        links: [
          { href: 'https://www.producthunt.com', text: 'Product Hunt', target: '_blank' },
          { href: 'https://www.indiehackers.com', text: 'Indie Hackers', target: '_blank' },
          { href: 'https://awesomeindie.com', text: 'Awesome Indie', target: '__blank'},
          { href: 'https://v2ex.com', text: 'V2EX', target: '_blank' }
        ],
      },
      {
        title: dict.contact,
        links: [
          { href: 'https://red666.vercel.app', text: 'Red Blog', target: '__blank'},
          { href: 'https://x.com/chrisgostrong', text: 'Twitter', target: '_blank' },
          { href: 'https://github.com/CrisChr/json-translator', text: 'GitHub', target: '_blank' },
        ],
      },
    ]

  return (
    <footer className="py-12 bg-gray-50 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-gray-800 mb-3">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      target={link.target}
                      rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} JSON Translator. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-4 sm:mt-0">
            {dict.creator}
          </p>
        </div>
      </div>
    </footer>
  )
}
