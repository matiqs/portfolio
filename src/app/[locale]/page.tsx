import type { ReactNode } from "react";

import { About } from "@/components/sections/about";
import { Career } from "@/components/sections/career";
import { Contact } from "@/components/sections/contact";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Section, SectionPlaceholder } from "@/components/ui/section";
import { about } from "@/content/about";
import { career } from "@/content/career";
import { contact } from "@/content/contact";
import { skills } from "@/content/skills";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { visibleSectionIds, type SectionId } from "@/lib/sections";

/** Secciones ya construidas. Las que no estén acá muestran un marcador. */
const sectionContent: Partial<Record<SectionId, ReactNode>> = {
  about: <About />,
  career: <Career />,
  contact: <Contact />,
  skills: <Skills />,
};

export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  const sectionSubtitle: Partial<Record<SectionId, string>> = {
    about: about.tagline[locale],
    career: career.tagline[locale],
    contact: contact.tagline[locale],
    skills: skills.tagline[locale],
  };

  return (
    <>
      <PersonJsonLd locale={locale} />
      <Hero />

      {visibleSectionIds.map((id) => (
        <Section key={id} id={id} title={dict.sections[id]} subtitle={sectionSubtitle[id]}>
          {sectionContent[id] ?? <SectionPlaceholder label={dict.section.placeholder} />}
        </Section>
      ))}
    </>
  );
}
