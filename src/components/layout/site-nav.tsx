"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
        <ul className="flex items-center gap-1">
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
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-line-strong bg-surface"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
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

      <AnimatePresence>
        {open && (
          <motion.nav
            id={menuId}
            aria-label={a11y.mainNav}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] border-t border-line bg-bg md:hidden"
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
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
