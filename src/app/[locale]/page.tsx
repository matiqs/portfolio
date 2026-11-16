import type { ReactNode } from "react";

import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Section, SectionPlaceholder } from "@/components/ui/section";
import { about } from "@/content/about";
import { skills } from "@/content/skills";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { sectionIds, type SectionId } from "@/lib/sections";

/** Secciones ya construidas. Las que no estén acá muestran un marcador. */
const sectionContent: Partial<Record<SectionId, ReactNode>> = {
  about: <About />,
  skills: <Skills />,
};

export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  const sectionSubtitle: Partial<Record<SectionId, string>> = {
    about: about.tagline[locale],
    skills: skills.tagline[locale],
  };

  return (
    <>
      <Hero />

      {sectionIds.map((id) => (
        <Section key={id} id={id} title={dict.sections[id]} subtitle={sectionSubtitle[id]}>
          {sectionContent[id] ?? <SectionPlaceholder label={dict.section.placeholder} />}
        </Section>
      ))}
    </>
  );
}
