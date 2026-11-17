import { Container } from "@/components/ui/container";
import { contact } from "@/content/contact";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

export async function SiteFooter() {
  const dict = await getDictionary();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-4 py-10 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-mono text-fg">
            {siteConfig.handle}
            <span className="text-accent-text">.</span>
          </span>
          <span className="mx-3 text-line-strong" aria-hidden>
            /
          </span>
          {siteConfig.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {contact.profiles.map((profile) => (
            <a
              key={profile.href}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              {profile.label}
            </a>
          ))}
          <span className="font-mono text-xs">{dict.footer.madeWith}</span>
        </div>
      </Container>
    </footer>
  );
}
