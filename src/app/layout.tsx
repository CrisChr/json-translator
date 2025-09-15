import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSON Translation Tool - AI-powered Multilingual Translation Solution",
  description: "Use AI technology to quickly and accurately translate JSON language files into multiple languages. Supports preserving JSON structure, variable placeholders, and HTML tags.",
  keywords: "i18n translation, JSON translation, AI translation, developer translation tool, software localization, website localization, App localization, internationalization tool, automated translation, code translation, React i18n, Vue i18n, Next.js i18n, Angular i18n, Svelte i18n, i18next automated translation, next-intl tool, JavaScript i18n library, Flutter i18n, React Native i18n, iOS App translation, Android App translation, GitHub i18n integration, VS Code i18n plugin, Node.js i18n, ARB file translation, AI-powered JSON file translation, developer-specific i18n solution, automated translation of JSON language files, online JSON translator, free i18n translation tool, efficient software internationalization process, best i18n practices, continuous localization service, multilingual website development, game localization tool, AI-assisted localization, translation management system, TMS, agile localization, translation API, one-click translation of all languages, how to implement multilingual websites, how to do App internationalization, automated front-end translation process, reduce localization costs, quickly launch multilingual versions, how to manage multilingual JSON files, translation team collaboration tool, solve i18n pain points, how to maintain translation consistency, the best JSON translation tool"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
