import type { CSSProperties } from "react";

import { InView } from "@/components/motion/in-view";
import { skills } from "@/content/skills";
import { getLocale } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export async function Skills() {
  const locale = await getLocale();

  return (
    <InView>
      <dl className="relative">
        {skills.groups.map((group, i) => (
          <div
            key={group.label.es}
            className="relative grid gap-3 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8"
          >
            <span
              aria-hidden
              className="reveal-rule absolute inset-x-0 top-0 h-px bg-line"
              style={delay(0.1 + i * 0.12)}
            />
            <dt
              className="reveal-fade pt-1 font-mono text-xs tracking-[0.2em] text-accent-text uppercase"
              style={delay(0.2 + i * 0.12)}
            >
              {group.label[locale]}
            </dt>
            <dd className="reveal-fade" style={delay(0.25 + i * 0.12)}>
              <ul
                className={cn(
                  "flex flex-wrap",
                  group.emphasis === "primary"
                    ? "gap-x-6 gap-y-2 text-2xl tracking-tight text-fg sm:text-3xl"
                    : "gap-x-2 gap-y-2 text-fg-muted",
                )}
              >
                {group.items.map((item) => (
                  <li
                    key={item.es}
                    className={cn(
                      group.emphasis === "secondary" &&
                        "rounded-full border border-line px-3 py-1 text-sm transition-colors hover:border-line-strong hover:text-fg",
                    )}
                  >
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
        <span
          aria-hidden
          className="reveal-rule absolute inset-x-0 bottom-0 h-px bg-line"
          style={delay(0.1 + skills.groups.length * 0.12)}
        />
      </dl>
    </InView>
  );
}
