import type { CSSProperties } from "react";

import { InView } from "@/components/motion/in-view";
import { career, type CareerEntry } from "@/content/career";
import type { Locale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/** "2022-03" → "ago. 2022" / "Aug 2022"; "2020" → "2020". */
function formatMonth(value: string, locale: Locale): string {
  const [year, month] = value.split("-").map(Number);
  if (!month) return String(year);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year ?? 2000, (month ?? 1) - 1, 1)));
}

function period(entry: CareerEntry, locale: Locale, present: string): string | null {
  if (!entry.start) return null;
  const end = entry.end ? formatMonth(entry.end, locale) : present;
  return `${formatMonth(entry.start, locale)} — ${end}`;
}

export async function Career() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <div className="grid gap-16">
      {career.entries.map((entry) => {
        const range = period(entry, locale, dict.career.present);

        return (
          <InView key={entry.company}>
            <article>
              <header className="reveal-fade flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-2xl tracking-tight text-fg sm:text-3xl">{entry.company}</h3>
                {range && (
                  <p className="font-mono text-xs tracking-wide text-fg-muted uppercase">{range}</p>
                )}
              </header>
              {entry.role && (
                <p className="reveal-fade mt-1 text-accent-text" style={delay(0.05)}>
                  {entry.role[locale]}
                </p>
              )}
              {entry.summary && (
                <p
                  className="reveal-fade mt-4 max-w-2xl leading-relaxed text-fg-muted sm:text-lg"
                  style={delay(0.1)}
                >
                  {entry.summary[locale]}
                </p>
              )}

              {entry.highlights.length > 0 && (
                <ul className="relative mt-8">
                  {entry.highlights.map((item, i) => (
                    <li
                      key={item.title.es}
                      className="relative grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8"
                    >
                      <span
                        aria-hidden
                        className="reveal-rule absolute inset-x-0 top-0 h-px bg-line"
                        style={delay(0.15 + i * 0.12)}
                      />
                      <p
                        className="reveal-fade flex items-baseline gap-3 font-medium text-fg"
                        style={delay(0.25 + i * 0.12)}
                      >
                        <span
                          className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-accent"
                          aria-hidden
                        />
                        <span>
                          {item.title[locale]}
                          {item.tech && (
                            <span className="mt-1 block font-mono text-xs font-normal tracking-wide text-fg-muted">
                              {item.tech}
                            </span>
                          )}
                        </span>
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
                    style={delay(0.15 + entry.highlights.length * 0.12)}
                  />
                </ul>
              )}

              {entry.stack.length > 0 && (
                <div
                  className="reveal-fade mt-6 flex flex-wrap items-center gap-2"
                  style={delay(0.3 + entry.highlights.length * 0.12)}
                >
                  <span className="mr-2 font-mono text-xs tracking-[0.2em] text-accent-text uppercase">
                    {dict.career.stack}
                  </span>
                  {entry.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line px-3 py-1 text-sm text-fg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </InView>
        );
      })}
    </div>
  );
}
