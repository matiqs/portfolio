import type { CSSProperties, ReactNode } from "react";

import { InView } from "@/components/motion/in-view";
import { Container } from "@/components/ui/container";
import { sectionIndex, type SectionId } from "@/lib/sections";

type SectionProps = {
  id: SectionId;
  title: string;
  /** Frase corta bajo el título (opcional). */
  subtitle?: string;
  children: ReactNode;
};

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/**
 * Patrón común de sección: número + línea en azul y título en serif a la izquierda
 * (fijo al hacer scroll en pantallas grandes), contenido a la derecha.
 * Al entrar en pantalla, la línea se dibuja y el título sube desde una máscara.
 */
export function Section({ id, title, subtitle, children }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-16">
      <Container>
        <div className="grid gap-8 border-t border-line py-20 sm:py-24 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4">
            <InView className="lg:sticky lg:top-28">
              <p
                className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent-text"
                aria-hidden
              >
                {sectionIndex(id)}
                <span className="reveal-rule h-px w-8 bg-accent" />
              </p>
              <h2
                id={headingId}
                className="mt-4 font-serif text-4xl leading-none tracking-tight sm:text-5xl lg:text-[3.5rem]"
              >
                <span className="reveal-mask">
                  <span style={delay(0.08)}>{title}</span>
                </span>
              </h2>
              {subtitle && (
                <p
                  className="reveal-fade mt-4 max-w-xs font-serif text-xl leading-snug text-balance text-fg-muted italic"
                  style={delay(0.25)}
                >
                  {subtitle}
                </p>
              )}
            </InView>
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
