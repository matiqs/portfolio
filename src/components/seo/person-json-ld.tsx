import { contact } from "@/content/contact";
import { skills } from "@/content/skills";
import type { Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

const jobTitle: Record<Locale, string> = {
  es: "Desarrollador frontend",
  en: "Frontend developer",
};

/**
 * Datos estructurados (schema.org/Person) para que los buscadores entiendan
 * quién es el dueño del sitio y lo relacionen con sus perfiles.
 */
export function PersonJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.handle,
    jobTitle: jobTitle[locale],
    url: `${siteConfig.url}/${locale}`,
    sameAs: contact.profiles.map((p) => p.href),
    worksFor: { "@type": "Organization", name: "Wiener Lab" },
    knowsAbout: skills.groups.find((g) => g.emphasis === "primary")?.items.map((i) => i[locale]),
  };

  return (
    <script
      type="application/ld+json"
      // Escapar "<" evita que el contenido pueda cerrar la etiqueta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
