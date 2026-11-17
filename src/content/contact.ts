import type { Localized } from "@/i18n/config";

type ProfileLink = { label: string; href: string; handle: string };

export const contact = {
  tagline: {
    es: "Si tenés un proyecto en mente, hablemos.",
    en: "If you have a project in mind, let's talk.",
  } satisfies Localized,
  lead: {
    es: "¿Tenés un proyecto, una propuesta o simplemente querés charlar? Escribime y te respondo a la brevedad.",
    en: "Have a project, an opportunity or just want to chat? Write to me and I'll get back to you soon.",
  } satisfies Localized,
  /**
   * El mail se guarda en partes para que no aparezca completo en el HTML
   * (los robots que buscan direcciones suelen leer el texto plano).
   */
  email: { user: "matiquinteros.dev", domain: "gmail.com" },
  profiles: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mati-quinteros/",
      handle: "in/mati-quinteros",
    },
    { label: "GitHub", href: "https://github.com/matiqs", handle: "@matiqs" },
  ] satisfies ProfileLink[],
};
