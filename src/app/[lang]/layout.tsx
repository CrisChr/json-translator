import { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { TranslateProvider } from "@/context/TranslateContext";
import { locales, defaultLocale } from "@/config/i18n";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
//import Analytics from '@/components/Analytics'
import { Analytics } from '@vercel/analytics/next';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface LayoutProps {
  children: ReactNode;
  params: {
    lang: string;
  };
}

export async function generateMetadata(
  { params }: Pick<LayoutProps, 'params'>
): Promise<Metadata> {
  const lang = params.lang;
  const domain = "https://jsontrans.vercel.app";

  // 导入对应语言的字典
  const dict = await import(`@/dictionaries/${lang}.json`).then(
    (module) => module.default
  );

  // 构建语言替代链接对象
  const languageAlternates = locales.reduce((acc: { [key: string]: string }, locale: string) => {
    acc[locale] = `${domain}/${locale}`;
    return acc;
  }, {});

  return {
    metadataBase: new URL(domain),
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      canonical: `${domain}/${lang}`,
      languages: languageAlternates,
    },
    keywords: dict.metadata.keywords,
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: params.lang,
      type: 'website',
      images: [
        {
          url: 'https://json.uiboy.com/og-image.png',
          width: 1200,
          height: 630,
          alt: dict.metadata.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ['https://json.uiboy.com/og-image.png']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // 在这里添加 Google AdSense meta 标签
    other: {
      'google-adsense-account': 'ca-pub-8598116000817169',
    },
  }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

export default async function LocaleLayout(props: LayoutProps) {
  const { children, params: { lang } } = props;

  if (!locales.includes(lang)) {
    notFound();
  }

  const dict = await import(`@/dictionaries/${lang}.json`).then(
    (module) => module.default
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: dict.metadata.title,
    description: dict.metadata.description,
    url: `https://jsontrans.vercel.app/${lang}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
    },
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={cn(
        geistSans.variable,
        geistMono.variable,
        "min-h-screen bg-background font-sans antialiased"
      )}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* <Analytics /> */}
        <TranslateProvider>
          <Navbar dict={dict} />
          {children}
          <Analytics />
          <Toaster />
        </TranslateProvider>
      </body>
    </html>
  );
}
