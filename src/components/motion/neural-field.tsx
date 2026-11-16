"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
  k: number;
  sx: number;
  sy: number;
  /** Nodos del grupo encendido: se ubican relativos al ancla (ox, oy) y oscilan con su fase. */
  anchored?: { ox: number; oy: number; phase: number };
};

/** Lee un color "R G B" de una variable CSS y lo devuelve como "R,G,B". */
function readRgb(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
    .split(/\s+/)
    .join(",");
}

/**
 * Red neuronal sutil: nodos casi invisibles que derivan lento; alrededor del cursor
 * se encienden y se conectan entre sí. Un grupo de nodos espaciados queda siempre
 * encendido arriba a la derecha (el "ancla") y se mueve muy despacio. Canvas sin dependencias.
 *
 * - Se pausa fuera de pantalla y con la pestaña oculta.
 * - En pantallas táctiles o con "reducir movimiento" queda estática.
 * - Lee los colores de --fx / --fx-base y se actualiza al cambiar de tema.
 */
export function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const animated = finePointer && !reduceMotion;

    const RADIUS = 260; // zona de influencia del cursor
    const LINK = 160; // distancia máxima para conectar dos nodos
    const DENSITY = 9000; // px² por nodo
    const ANCHOR_STRENGTH = 0.8; // intensidad del grupo siempre encendido
    const INTRO_DELAY = 0; // ms: el grupo empieza a encenderse junto con la entrada del nombre
    const INTRO_DURATION = 1800; // ms
    const FADE = 0.07; // velocidad del fundido de cada nodo (0–1 por cuadro)

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let colors = { fx: "91,147,255", base: "158,173,195" };
    let light = false;
    const mouse = { x: -9999, y: -9999, active: false };
    let energy = 0;
    let frame = 0;
    let tick = 0;
    let visible = true;
    const introStart = performance.now() + INTRO_DELAY;

    /** 0→1 con salida suave; sin animación, directamente 1. */
    const introProgress = () => {
      if (!animated) return 1;
      const t = Math.min(1, Math.max(0, (performance.now() - introStart) / INTRO_DURATION));
      return 1 - Math.pow(1 - t, 3);
    };

    /** Caída suave (sin corte) de la influencia según la distancia. */
    const falloff = (distance: number, radius: number) => {
      const t = Math.max(0, 1 - distance / radius);
      return t * t * (3 - 2 * t);
    };

    const readColors = () => {
      colors = { fx: readRgb("--fx"), base: readRgb("--fx-base") };
      light = document.documentElement.classList.contains("light");
    };

    const seed = () => {
      const count = Math.round((width * height) / DENSITY);
      const free: Node[] = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        depth: 0.3 + Math.random() * 0.7,
        k: 0,
        sx: 0,
        sy: 0,
      }));
      // Grupo propio del ancla: puntos repartidos en una elipse con distancia mínima
      // entre sí, para que formen una malla abierta y no un ovillo.
      const { r } = anchor();
      const narrow = width < 640;
      const clusterSize = narrow ? 9 : 14;
      const minGap = narrow ? 48 : 70;
      const offsets: Array<{ ox: number; oy: number }> = [];
      for (let tries = 0; offsets.length < clusterSize && tries < 600; tries++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.sqrt(Math.random());
        const ox = Math.cos(angle) * dist * r;
        const oy = Math.sin(angle) * dist * r * 0.7;
        if (offsets.every((o) => Math.hypot(o.ox - ox, o.oy - oy) >= minGap))
          offsets.push({ ox, oy });
      }
      const cluster: Node[] = offsets.map(({ ox, oy }) => ({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        depth: 0.3 + Math.random() * 0.4,
        k: 0,
        sx: 0,
        sy: 0,
        anchored: { ox, oy, phase: Math.random() * 6.283 },
      }));
      nodes = [...free, ...cluster];
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    /** Centro y radio del grupo encendido: arriba a la derecha, junto al nombre. */
    const anchor = () => {
      const narrow = width < 640;
      const drift = animated ? 1 : 0;
      return {
        x: width * (narrow ? 0.74 : 0.8) + Math.sin(tick * 0.0045) * 36 * drift,
        y: height * (narrow ? 0.14 : 0.3) + Math.cos(tick * 0.0032) * 22 * drift,
        r: narrow ? 150 : 260,
      };
    };

    const draw = () => {
      tick += 1;
      energy += ((mouse.active ? 1 : 0) - energy) * 0.035;
      const a = anchor();
      const intro = introProgress();
      ctx.clearRect(0, 0, width, height);

      // Profundidad: los nodos se desplazan apenas en sentido contrario al cursor.
      const px = mouse.active ? (mouse.x - width / 2) * -0.012 : 0;
      const py = mouse.active ? (mouse.y - height / 2) * -0.012 : 0;

      for (const n of nodes) {
        if (n.anchored) {
          const wobble = animated ? 6 : 0;
          n.x = a.x + n.anchored.ox + Math.sin(tick * 0.012 + n.anchored.phase) * wobble;
          n.y = a.y + n.anchored.oy + Math.cos(tick * 0.01 + n.anchored.phase) * wobble;
        } else if (animated) {
          n.x = (n.x + n.vx + width) % width;
          n.y = (n.y + n.vy + height) % height;
        }
        n.sx = n.x + px * n.depth;
        n.sy = n.y + py * n.depth;
        const fromCursor = falloff(Math.hypot(n.sx - mouse.x, n.sy - mouse.y), RADIUS) * energy;
        const fromAnchor =
          falloff(Math.hypot(n.sx - a.x, n.sy - a.y), a.r) * ANCHOR_STRENGTH * intro;
        const target = Math.max(fromCursor, fromAnchor);
        // Cada nodo se enciende y apaga de forma gradual.
        n.k = animated ? n.k + (target - n.k) * FADE : target;
        if (n.k < 0.003) n.k = 0;
      }

      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i]!;
        if (p.k <= 0) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j]!;
          if (q.k <= 0) continue;
          const d = Math.hypot(p.sx - q.sx, p.sy - q.sy);
          if (d > LINK) continue;
          ctx.strokeStyle = `rgba(${colors.fx},${(1 - d / LINK) * Math.min(p.k, q.k) * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(p.sx, p.sy);
          ctx.lineTo(q.sx, q.sy);
          ctx.stroke();
        }
      }

      const baseAlpha = light ? 0.22 : 0.16;
      for (const n of nodes) {
        ctx.fillStyle =
          n.k > 0
            ? `rgba(${colors.fx},${baseAlpha + n.k * 0.65})`
            : `rgba(${colors.base},${baseAlpha})`;
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, 1.1 + n.k * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (animated && visible && !document.hidden && !frame) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    readColors();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // Cambio de tema: re-leer colores y redibujar.
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });
    viewObserver.observe(host);

    if (animated) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      viewObserver.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 size-full"
    />
  );
}
