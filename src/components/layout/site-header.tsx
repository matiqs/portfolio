import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

export async function SiteHeader() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href={`/${locale}`}
          aria-label={siteConfig.name}
          className="font-mono text-sm tracking-tight text-fg"
        >
          {siteConfig.handle}
          <span className="text-accent-text">.</span>
        </Link>

        <div className="flex items-center gap-2">
          <LocaleSwitcher current={locale} label={dict.a11y.switchLanguage} />
          <ThemeToggle label={dict.a11y.toggleTheme} />
        </div>
      </Container>
    </header>
  );
}
