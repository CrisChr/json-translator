import { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import NavbarWrapper from "@/components/NavbarWrapper";
import { TranslateProvider } from "@/context/TranslateContext";
import { locales, defaultLocale } from "@/config/i18n";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
//import Analytics from '@/components/Analytics'
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer"; // Import Footer component

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

export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const lang = params.lang;
  const domain = "https://jsontrans.fun";

  // 导入对应语言的字典
  const dict = await import(`@/dictionaries/${lang}.json`).then(
    (module) => module.default,
  );

  // 构建语言替代链接对象
  const languageAlternates = locales.reduce(
    (acc: { [key: string]: string }, locale: string) => {
      acc[locale] = `${domain}/${locale}`;
      return acc;
    },
    {},
  );

  // 为 hreflang 添加 x-default, 指向默认语言版本
  languageAlternates["x-default"] = `${domain}/${defaultLocale}`;

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
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: params.lang,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: dict.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout(props: LayoutProps) {
  const {
    children,
    params: { lang },
  } = props;

  if (!locales.includes(lang)) {
    notFound();
  }

  const dict = await import(`@/dictionaries/${lang}.json`).then(
    (module) => module.default,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: dict.metadata.title,
    description: dict.metadata.description,
    url: `https://jsontrans.fun/${lang}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
    },
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script async data-cfasync="false" src="//pl27813265.effectivegatecpm.com/4b5735e9fa53bd4a6fb3a12753c86bcf/invoke.js"></Script>
      </head>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "min-h-screen bg-background font-sans antialiased flex flex-col", // Add flex flex-col
        )}
      >
        {/* <Analytics /> */}
        <TranslateProvider>
          <NavbarWrapper dict={{ coffee: dict.footer.coffee }} />
          <main className="flex-grow">
            {" "}
            {/* Wrap children in a main tag with flex-grow */}
            {children}
          </main>
          <Footer dict={dict.footer} />{" "}
          {/* Render Footer component with full dict.footer */}
          <Analytics />
          <Toaster />
        </TranslateProvider>
        <div id="container-4b5735e9fa53bd4a6fb3a12753c86bcf"></div>
      </body>
    </html>
  );
}
