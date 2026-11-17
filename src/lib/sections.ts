/**
 * Orden y anclas de las secciones de la home.
 * Los ids son estables en ambos idiomas (#about, #career…); los títulos viven en i18n.
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

/**
 * Secciones ocultas mientras no tengan contenido real.
 * Para mostrar una, sacala de esta lista: vuelve a la nav y a la página.
 */
const hiddenSections: readonly SectionId[] = ["projects", "freelance"];

/** Secciones visibles, en orden. Úsese en lugar de `sectionIds` para renderizar. */
export const visibleSectionIds = sectionIds.filter((id) => !hiddenSections.includes(id));

/** Número de sección con dos dígitos (01, 02…) según el orden visible. */
export function sectionIndex(id: SectionId): string {
  return String(visibleSectionIds.indexOf(id) + 1).padStart(2, "0");
}
