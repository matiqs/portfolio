import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/** Ancho máximo y márgenes laterales consistentes en todo el sitio. */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return <Component className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...props} />;
}
