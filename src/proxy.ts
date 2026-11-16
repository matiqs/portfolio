import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

/**
 * Elige el idioma según Accept-Language. Con dos idiomas no hace falta
 * una librería de negociación: alcanza con respetar el orden de preferencia.
 */
function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of preferred) {
    if (isLocale(lang)) return lang;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Excluye internos de Next, rutas de metadata y cualquier archivo con extensión.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
