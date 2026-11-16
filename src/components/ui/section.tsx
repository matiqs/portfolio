import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { sectionIndex, type SectionId } from "@/lib/sections";

type SectionProps = {
  id: SectionId;
  title: string;
  children: ReactNode;
};

/**
 * Patrón común de sección: número en mono + título en serif a la izquierda
 * (fijo al hacer scroll en pantallas grandes) y contenido a la derecha.
 */
export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-16">
      <Container>
        <div className="grid gap-8 border-t border-line py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-xs tracking-[0.2em] text-accent-text" aria-hidden>
                {sectionIndex(id)}
              </p>
              <h2 id={headingId} className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
                {title}
              </h2>
            </div>
          </header>
          <div className="lg:col-span-8">{children}</div>
        </div>
      </Container>
    </section>
  );
}

/** Marcador visible mientras una sección no tiene contenido real. */
export function SectionPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-line-strong bg-surface/40">
      <p className="font-mono text-xs tracking-wide text-fg-muted">{label}</p>
    </div>
  );
}
