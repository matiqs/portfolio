"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type Props = {
  user: string;
  domain: string;
  labels: { copy: string; copied: string; write: string };
};

/**
 * Muestra el mail sin escribir la "@" en el HTML (la agrega CSS con ::before),
 * arma el mailto recién al hacer click y ofrece copiarlo, porque mailto falla
 * en equipos sin cliente de correo configurado.
 */
export function EmailLink({ user, domain, labels }: Props) {
  const [copied, setCopied] = useState(false);
  const address = () => `${user}@${domain}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sin permiso de portapapeles: el usuario puede seleccionar el texto.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `mailto:${address()}`;
        }}
        aria-label={`${labels.write}: ${user} arroba ${domain}`}
        className="group text-2xl tracking-tight break-all text-fg transition-colors hover:text-accent-text sm:text-4xl"
      >
        {user}
        <span className="before:content-['@']" aria-hidden />
        {domain}
        <span className="mt-1 block h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
      </a>

      <button
        type="button"
        onClick={copy}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-sm text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
      >
        {copied ? (
          <Check className="size-4 text-positive" aria-hidden />
        ) : (
          <Copy className="size-4" aria-hidden />
        )}
        <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
      </button>
    </div>
  );
}
