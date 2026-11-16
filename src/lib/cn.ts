/** Une clases condicionales. Si aparecen conflictos de Tailwind, migrar a tailwind-merge. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
