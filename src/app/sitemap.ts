import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}`]));

  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    alternates: { languages },
  }));
}
