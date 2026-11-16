function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  /** Nombre real: titulares, metadata y SEO. */
  name: "Matías Quinteros",
  /** Marca personal: logo y redes (mati.qs, matiqs.fit). */
  handle: "matiqs",
  url: resolveSiteUrl(),
} as const;
