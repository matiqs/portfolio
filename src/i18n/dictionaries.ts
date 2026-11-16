import { notFound } from "next/navigation";
import { locale as localeParam } from "next/root-params";

import { isLocale, type Locale } from "./config";
import type es from "./messages/es.json";

/** El español es la fuente de verdad: el inglés debe tener la misma forma. */
export type Dictionary = typeof es;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("./messages/es.json").then((m) => m.default),
  en: () => import("./messages/en.json").then((m) => m.default),
};

/** Idioma de la ruta actual. Solo Server Components. */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!value || !isLocale(value)) notFound();
  return value;
}

/** Diccionario del idioma de la ruta actual. Solo Server Components. */
export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}

/** Diccionario de un idioma explícito (metadata, sitemap…). */
export function getDictionaryFor(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
