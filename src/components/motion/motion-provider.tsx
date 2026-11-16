"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Configuración global de animaciones: desactiva transformaciones si el usuario lo pide. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
