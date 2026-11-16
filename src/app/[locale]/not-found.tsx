import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <Container className="flex min-h-[calc(100dvh-4rem)] flex-col items-start justify-center py-24">
      <p className="font-mono text-sm text-accent-text">404</p>
      <h1 className="mt-4 font-serif text-5xl">{dict.notFound.title}</h1>
      <p className="mt-4 text-fg-muted">{dict.notFound.description}</p>
      <Link
        href={`/${locale}`}
        className="mt-8 text-sm text-accent-text underline-offset-4 hover:underline"
      >
        {dict.notFound.back}
      </Link>
    </Container>
  );
}
