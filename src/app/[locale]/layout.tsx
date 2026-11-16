import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "../globals.css";

import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { locales, ogLocales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.title,
      template: `%s — ${siteConfig.name}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/es",
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.handle,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: ogLocales[locale],
      url: `/${locale}`,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1424" },
    { media: "(prefers-color-scheme: light)", color: "#f3f6fb" },
  ],
};

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    // next-themes modifica la clase de <html> antes de hidratar.
    <html lang={locale} className={`dark ${fontVariables}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-fg"
        >
          {dict.a11y.skipToContent}
        </a>
        <ThemeProvider>
          <SiteHeader />
          <main id="main">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
