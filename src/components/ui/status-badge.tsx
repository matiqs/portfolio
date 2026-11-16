/** Indicador de estado con punto animado (respeta prefers-reduced-motion). */
export function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-start gap-3 text-sm text-fg-muted">
      <span className="relative mt-1.5 flex size-2.5 shrink-0" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-positive opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2.5 rounded-full bg-positive" />
      </span>
      {children}
    </p>
  );
}
