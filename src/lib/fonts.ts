import localFont from "next/font/local";

/**
 * Fuentes self-hosted (OFL). Se sirven desde el propio dominio,
 * sin depender de Google Fonts en build ni en runtime.
 */
export const geistSans = localFont({
  src: "../assets/fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const geistMono = localFont({
  src: "../assets/fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

/** Serif editorial: solo para titulares y acentos puntuales. */
export const instrumentSerif = localFont({
  src: [
    { path: "../assets/fonts/instrument-serif-latin-400-normal.woff2", style: "normal" },
    { path: "../assets/fonts/instrument-serif-latin-400-italic.woff2", style: "italic" },
  ],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  instrumentSerif.variable,
].join(" ");
