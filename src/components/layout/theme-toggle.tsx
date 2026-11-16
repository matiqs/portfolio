"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * El ícono visible lo decide CSS según la clase de <html>,
 * así no hay desajuste de hidratación ni hace falta esperar al montaje.
 */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <Sun className="hidden size-4 dark:block" aria-hidden />
      <Moon className="block size-4 dark:hidden" aria-hidden />
    </button>
  );
}
