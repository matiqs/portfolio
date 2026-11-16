import type { CSSProperties } from "react";

import { InView } from "@/components/motion/in-view";
import { Reveal } from "@/components/motion/reveal";
import { about } from "@/content/about";
import { getLocale } from "@/i18n/dictionaries";
import { highlight } from "@/lib/highlight";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export async function About() {
  const locale = await getLocale();

  return (
    <div className="grid gap-12">
      <Reveal>
        <p className="text-2xl leading-snug font-normal tracking-tight text-balance text-fg sm:text-3xl">
          {highlight(about.lead[locale])}
        </p>
      </Reveal>

      <Reveal
        delay={0.08}
        className="grid max-w-2xl gap-5 text-base leading-relaxed text-fg-muted sm:text-lg"
      >
        {about.paragraphs.map((p) => (
          <p key={p.es}>{p[locale]}</p>
        ))}
      </Reveal>

      <InView>
        <h3
          className="reveal-fade font-mono text-xs tracking-[0.2em] text-accent-text uppercase"
          style={delay(0.1)}
        >
          {about.strengthsTitle[locale]}
        </h3>
        <ul className="relative mt-4">
          {about.strengths.map((item, i) => (
            <li
              key={item.title.es}
              className="relative grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8"
            >
              {/* Divisoria que se dibuja; cada fila con un pequeño desfase. */}
              <span
                aria-hidden
                className="reveal-rule absolute inset-x-0 top-0 h-px bg-line"
                style={delay(0.15 + i * 0.12)}
              />
              <p
                className="reveal-fade flex items-baseline gap-3 font-medium text-fg"
                style={delay(0.25 + i * 0.12)}
              >
                <span className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-accent" aria-hidden />
                {item.title[locale]}
              </p>
              <p
                className="reveal-fade leading-relaxed text-fg-muted"
                style={delay(0.3 + i * 0.12)}
              >
                {item.body[locale]}
              </p>
            </li>
          ))}
          <span
            aria-hidden
            className="reveal-rule absolute inset-x-0 bottom-0 h-px bg-line"
            style={delay(0.15 + about.strengths.length * 0.12)}
          />
        </ul>
      </InView>
    </div>
  );
}
