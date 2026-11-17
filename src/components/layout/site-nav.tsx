"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { sectionIndex, visibleSectionIds, type SectionId } from "@/lib/sections";

import { useActiveSection } from "./use-active-section";

type Props = {
  labels: Record<SectionId, string>;
  a11y: { mainNav: string; openMenu: string; closeMenu: string };
  /** Controles (idioma, tema) que van entre la nav de escritorio y el botón de menú. */
  children?: ReactNode;
};

export function SiteNav({ labels, a11y, children }: Props) {
  const active = useActiveSection(visibleSectionIds);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // Cápsula de la sección activa: una sola pieza que se desliza (CSS transition)
  // hasta el link activo. Se posiciona escribiendo estilos, sin re-render.
  useEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;

    let placed = false;
    const place = () => {
      const link = active ? list.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
      if (!link) {
        pill.style.opacity = "0";
        return;
      }
      // La primera vez aparece en su lugar, sin deslizarse desde el borde.
      if (!placed && pill.style.opacity !== "1") pill.style.transition = "opacity 0.3s";
      // Posición relativa a la lista (cada link está dentro de su propio <li>).
      const left = link.getBoundingClientRect().left - list.getBoundingClientRect().left;
      pill.style.transform = `translateX(${left}px)`;
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.opacity = "1";
      placed = true;
      requestAnimationFrame(() => (pill.style.transition = ""));
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  // Escape cierra el menú y devuelve el foco al botón.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Desktop */}
      <nav aria-label={a11y.mainNav} className="mr-2 hidden md:block">
        <ul ref={listRef} className="relative flex items-center gap-1">
          <span
            ref={pillRef}
            aria-hidden
            className="absolute top-0 left-0 h-full rounded-full border border-line-strong bg-surface opacity-0 transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          />
          {visibleSectionIds.map((id) => {
            const isActive = active === id;
            return (
              <li key={id} className="relative">
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3 py-1.5 text-sm transition-colors",
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {labels[id]}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {children}

      {/* Mobile */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? a11y.closeMenu : a11y.openMenu}
        className="inline-flex size-9 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg md:hidden"
      >
        {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
      </button>

      {/* Siempre montado: abre y cierra con transición CSS; cerrado queda inerte. */}
      <nav
        id={menuId}
        aria-label={a11y.mainNav}
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full h-[calc(100dvh-4rem)] border-t border-line bg-bg transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none md:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
          {visibleSectionIds.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={active === id ? "location" : undefined}
                className={cn(
                  "flex items-baseline gap-4 py-3 text-lg transition-colors",
                  active === id ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                <span className="font-mono text-xs text-accent-text">{sectionIndex(id)}</span>
                {labels[id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
