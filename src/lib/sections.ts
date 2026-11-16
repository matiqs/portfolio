/**
 * Orden y anclas de las secciones de la home.
 * Los ids son estables en ambos idiomas (#about, #projects…); los títulos viven en i18n.
 */
export const sectionIds = [
  "about",
  "projects",
  "freelance",
  "career",
  "skills",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

/** Número de sección con dos dígitos: 01, 02… */
export function sectionIndex(id: SectionId): string {
  return String(sectionIds.indexOf(id) + 1).padStart(2, "0");
}
