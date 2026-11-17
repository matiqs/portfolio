import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import { InView } from "@/components/motion/in-view";
import { EmailLink } from "@/components/ui/email-link";
import { StatusBadge } from "@/components/ui/status-badge";
import { availability } from "@/content/availability";
import { contact } from "@/content/contact";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

export async function Contact() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <InView className="grid gap-10">
      <div className="reveal-fade" style={delay(0.05)}>
        <StatusBadge>{availability[locale]}</StatusBadge>
      </div>

      <p
        className="reveal-fade max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl"
        style={delay(0.12)}
      >
        {contact.lead[locale]}
      </p>

      <div className="reveal-fade" style={delay(0.2)}>
        <EmailLink user={contact.email.user} domain={contact.email.domain} labels={dict.contact} />
      </div>

      <div>
        <p
          className="reveal-fade font-mono text-xs tracking-[0.2em] text-accent-text uppercase"
          style={delay(0.28)}
        >
          {dict.contact.profiles}
        </p>
        <ul className="relative mt-4">
          {contact.profiles.map((profile, i) => (
            <li key={profile.href} className="relative">
              <span
                aria-hidden
                className="reveal-rule absolute inset-x-0 top-0 h-px bg-line"
                style={delay(0.3 + i * 0.1)}
              />
              <a
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal-fade group flex items-center justify-between gap-4 py-5"
                style={delay(0.38 + i * 0.1)}
              >
                <span className="text-lg text-fg transition-colors group-hover:text-accent-text">
                  {profile.label}
                </span>
                <span className="flex items-center gap-3 font-mono text-sm text-fg-muted">
                  {profile.handle}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-text"
                    aria-hidden
                  />
                </span>
              </a>
            </li>
          ))}
          <span
            aria-hidden
            className="reveal-rule absolute inset-x-0 bottom-0 h-px bg-line"
            style={delay(0.3 + contact.profiles.length * 0.1)}
          />
        </ul>
      </div>
    </InView>
  );
}
