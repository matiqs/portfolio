import type { Localized } from "@/i18n/config";

type SkillGroup = {
  label: Localized;
  /** "primary" se muestra grande; "secondary" en tamaño de texto. */
  emphasis: "primary" | "secondary";
  items: Localized[];
};

/** Mismo texto en ambos idiomas (nombres de tecnologías). */
const same = (text: string): Localized => ({ es: text, en: text });

export const skills = {
  tagline: {
    es: "Lo que uso a diario y lo que me ayuda a ver el sistema completo.",
    en: "What I use every day, and what helps me see the whole system.",
  } satisfies Localized,
  groups: [
    {
      label: { es: "Stack principal", en: "Core stack" },
      emphasis: "primary",
      items: [
        same("Angular"),
        same("React"),
        same("Next.js"),
        same("TypeScript"),
        same("React Native"),
      ],
    },
    {
      label: { es: "Ecosistema frontend", en: "Frontend ecosystem" },
      emphasis: "secondary",
      items: [
        same("RxJS"),
        same("Angular Signals"),
        same("PrimeNG"),
        same("Tailwind CSS"),
        same("SCSS"),
      ],
    },
    {
      label: { es: "Para proyectos completos", en: "For end-to-end projects" },
      emphasis: "secondary",
      items: [same("Python · FastAPI"), same("Supabase")],
    },
    {
      label: { es: "Cómo trabajo", en: "How I work" },
      emphasis: "secondary",
      items: [
        { es: "Arquitectura frontend", en: "Frontend architecture" },
        { es: "Diseño de interfaces (UI/UX)", en: "Interface design (UI/UX)" },
        { es: "Internacionalización (i18n)", en: "Internationalization (i18n)" },
        { es: "Planificación de producto", en: "Product planning" },
        { es: "Diseño técnico y documentación", en: "Technical design and documentation" },
        { es: "Desarrollo asistido por IA", en: "AI-assisted development" },
      ],
    },
  ] satisfies SkillGroup[],
};
