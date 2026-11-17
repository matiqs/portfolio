import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { isLocale, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} · ${siteConfig.handle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts/og");

const copy: Record<Locale, { role: string; line: string }> = {
  es: {
    role: "Desarrollador frontend",
    line: "Interfaces claras para productos que necesitan crecer.",
  },
  en: {
    role: "Frontend developer",
    line: "Clear interfaces for products that need to grow.",
  },
};

/** Nodos fijos de la "red neuronal" (mismo motivo que el hero). */
const nodes: Array<[number, number]> = [
  [860, 120], [945, 90], [1030, 140], [1110, 105], [905, 205], [995, 240],
  [1085, 215], [1150, 280], [870, 305], [960, 330], [1050, 345], [1120, 390],
];
const links: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 4], [4, 5], [2, 5], [5, 6], [3, 6], [6, 7],
  [4, 8], [8, 9], [5, 9], [9, 10], [6, 10], [10, 11], [7, 11],
];

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const t = copy[locale];

  const [semibold, regular, mono, serifItalic] = await Promise.all([
    readFile(join(fontDir, "Geist-SemiBold.ttf")),
    readFile(join(fontDir, "Geist-Regular.ttf")),
    readFile(join(fontDir, "GeistMono-Regular.ttf")),
    readFile(join(fontDir, "instrument-serif-latin-400-italic.woff")),
  ]);

  const [firstName, ...lastNames] = siteConfig.name.split(" ");
  const host = new URL(siteConfig.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#0b1424",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(52,120,246,0.22), transparent 70%), linear-gradient(to right, rgba(158,173,195,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(158,173,195,0.06) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          color: "#e8edf7",
          fontFamily: "Geist",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {links.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={nodes[a]![0]}
              y1={nodes[a]![1]}
              x2={nodes[b]![0]}
              y2={nodes[b]![1]}
              stroke="rgba(91,147,255,0.35)"
              strokeWidth="1.2"
            />
          ))}
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="rgba(91,147,255,0.9)" />
          ))}
        </svg>

        <div style={{ display: "flex", fontFamily: "GeistMono", fontSize: 26 }}>
          {siteConfig.handle}
          <span style={{ color: "#5b93ff" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 112,
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            <span>{firstName}</span>
            <span>{lastNames.join(" ")}</span>
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 64,
              color: "#9eadc3",
            }}
          >
            {t.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "#9eadc3",
          }}
        >
          <span>{t.line}</span>
          <span style={{ fontFamily: "GeistMono", fontSize: 22, color: "#5b93ff" }}>{host}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "GeistMono", data: mono, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
      ],
    },
  );
}
