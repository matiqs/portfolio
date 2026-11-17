import type { Localized } from "@/i18n/config";

type Highlight = {
  title: Localized;
  body: Localized;
  /** Tecnología principal del producto (opcional). */
  tech?: string;
};

export type CareerEntry = {
  company: string;
  /** Se muestra solo cuando está confirmado. */
  role?: Localized;
  /** Formato "AAAA-MM" o "AAAA". Sin `end` = actualidad. El período se muestra solo si hay `start`. */
  start?: string;
  end?: string;
  summary?: Localized;
  highlights: Highlight[];
  stack: string[];
};

const entries: CareerEntry[] = [
  {
    company: "Wiener Lab",
    role: { es: "Desarrollador de software", en: "Software Developer" },
    start: "2022-08",
    summary: {
      es: "Desarrollo frontend de productos internos para una empresa del sector salud.",
      en: "Frontend development of internal products for a healthcare company.",
    },
    highlights: [
      {
        title: { es: "Nobilis\u00a0Cloud", en: "Nobilis\u00a0Cloud" },
        tech: "Angular",
        body: {
          es: "LIS (sistema de información de laboratorio). Participé desde cero en la creación del frontend y en la definición de su arquitectura; hoy lo seguimos haciendo crecer como una plataforma de múltiples módulos.",
          en: "LIS (laboratory information system). I was involved from day one in building the frontend and defining its architecture; today we keep growing it into a multi-module platform.",
        },
      },
      {
        title: { es: "My Wiener Lab", en: "My Wiener Lab" },
        tech: "Angular",
        body: {
          es: "Portal donde laboratorios, distribuidores y filiales gestionan su postventa en un solo lugar: instrumentos y garantías, soporte técnico, reclamos y documentación de facturación. Incluye un backoffice para usuarios internos y está disponible en 4 idiomas.",
          en: "Portal where laboratories, distributors and subsidiaries handle their after-sales in one place: instruments and warranties, technical support, claims and billing documents. It includes a back office for internal users and is available in 4 languages.",
        },
      },
      {
        title: { es: "Sitio web", en: "Website" },
        tech: "Next.js",
        body: {
          es: "Mantenimiento y mejoras del sitio institucional de la empresa.",
          en: "Maintenance and improvements of the company's website.",
        },
      },
    ],
    stack: [
      "Angular",
      "Next.js",
      "TypeScript",
      "RxJS",
      "Angular Signals",
      "PrimeNG",
      "SCSS",
      "i18n · Tolgee",
    ],
  },
  {
    company: "Freelance",
    role: { es: "Desarrollador independiente", en: "Independent developer" },
    start: "2020",
    summary: {
      es: "Proyectos web para clientes, en paralelo a mi trabajo en relación de dependencia.",
      en: "Web projects for clients, alongside my full-time work.",
    },
    highlights: [],
    stack: [],
  },
];

export const career = {
  tagline: {
    es: "Dónde construí lo que sé hacer.",
    en: "Where I built what I know how to do.",
  } satisfies Localized,
  entries,
};
