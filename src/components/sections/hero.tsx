import { ArrowDown, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

import { NeuralField } from "@/components/motion/neural-field";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

/** Retraso de la animación de entrada (ver .intro-* en globals.css). */
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export async function Hero() {
  const dict = await getDictionary();
  const [firstName, ...lastNames] = siteConfig.name.split(" ");

  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="intro-grid bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div aria-hidden className="intro-grid bg-glow absolute inset-0 -z-10" />
      <NeuralField />

      <Container className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-24">
        <h1 className="text-[clamp(3.25rem,11vw,8rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
          <span className="intro-line">
            <span style={delay(0.15)}>{firstName}</span>
          </span>
          <span className="intro-line">
            <span style={delay(0.27)}>{lastNames.join(" ")}</span>
          </span>
          <span className="intro-line mt-4">
            <span
              style={delay(0.42)}
              className="font-serif text-[clamp(2rem,5vw,3.75rem)] leading-none font-normal tracking-normal text-fg-muted italic"
            >
              {dict.home.role}
            </span>
          </span>
        </h1>

        <p
          className="intro-fade mt-8 max-w-xl text-lg leading-relaxed text-pretty text-fg-muted sm:text-xl"
          style={delay(0.6)}
        >
          {dict.home.summary}
        </p>

        <div className="intro-fade mt-10 flex flex-wrap gap-3" style={delay(0.72)}>
          <a
            href="#projects"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-on-accent transition hover:brightness-110"
          >
            {dict.home.cta.projects}
            <ArrowDown
              className="size-4 transition-transform group-hover:translate-y-0.5"
              aria-hidden
            />
          </a>
          <a
            href="#contact"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent-text"
          >
            {dict.home.cta.contact}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>
      </Container>
    </div>
  );
}
