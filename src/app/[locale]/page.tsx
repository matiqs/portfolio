import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

/**
 * Página provisoria: solo valida tipografías, tokens, temas e idiomas.
 * Las secciones reales (Sobre mí, Proyectos…) se construyen en las próximas iteraciones.
 */
export default async function HomePage() {
  const dict = await getDictionary();

  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div aria-hidden className="bg-glow absolute inset-0 -z-10" />

      <Container className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
            {dict.home.status}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            {siteConfig.name}
            <span className="block font-serif text-4xl font-normal italic text-fg-muted sm:text-6xl">
              {dict.home.role}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-lg text-pretty text-fg-muted">{dict.home.summary}</p>
        </Reveal>
      </Container>
    </div>
  );
}
