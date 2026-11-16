import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "@/lib/cn";

import { InView } from "./in-view";

type RevealProps = ComponentPropsWithoutRef<"div"> & {
  /** Retraso en segundos. */
  delay?: number;
};

/** Aparición sutil (fade + desplazamiento) al entrar en pantalla. */
export function Reveal({ delay = 0, className, style, ...props }: RevealProps) {
  return (
    <InView
      className={cn("reveal-fade", className)}
      style={{ "--d": `${delay}s`, ...style } as CSSProperties}
      {...props}
    />
  );
}
