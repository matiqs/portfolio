"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/**
 * Marca su contenido con data-inview="false" si arranca fuera de pantalla y lo
 * pasa a "true" al entrar. Las transiciones viven en CSS (.reveal-* en globals.css).
 *
 * Sin JavaScript (o si ya está visible al cargar) el contenido se muestra normal:
 * nunca queda oculto esperando a la hidratación.
 */
export function InView({ children, ...props }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return; // ya visible: no animar

    el.dataset.inview = "false";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.dataset.inview = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
