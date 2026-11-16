import Link from "next/link";

import type { Locale } from "@/i18n/config";

type Props = {
  current: Locale;
  label: string;
};

/** Enlace al otro idioma. Con dos idiomas, un toggle es más claro que un menú. */
export function LocaleSwitcher({ current, label }: Props) {
  const target: Locale = current === "es" ? "en" : "es";

  return (
    <Link
      href={`/${target}`}
      hrefLang={target}
      lang={target}
      aria-label={label}
      title={label}
      className="inline-flex h-9 items-center rounded-full border border-line px-3 font-mono text-xs uppercase tracking-widest text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {target}
    </Link>
  );
}
