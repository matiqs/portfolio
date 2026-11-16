"use client";

import { useEffect, useRef } from "react";

/**
 * Capa de grilla iluminada que sigue al cursor dentro de su contenedor padre.
 * Solo se activa con mouse (hover + puntero fino); en táctil no hace nada.
 */
export function GridSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      layer.style.setProperty("--mx", `${x}px`);
      layer.style.setProperty("--my", `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      layer.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      layer.style.opacity = "0";
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="bg-grid-lit pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500"
    />
  );
}
