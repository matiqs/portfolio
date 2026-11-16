/**
 * Configuración de idiomas. Sin dependencias de servidor:
 * se puede importar desde el proxy, Server y Client Components.
 */
export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Texto traducible para el contenido de dominio (proyectos, trayectoria…). */
export type Localized<T = string> = Record<Locale, T>;

/** Etiqueta Open Graph por idioma. */
export const ogLocales: Record<Locale, string> = {
  es: "es_AR",
  en: "en_US",
};
