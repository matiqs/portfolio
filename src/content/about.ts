import type { Localized } from "@/i18n/config";

type Strength = { title: Localized; body: Localized };

export const about = {
  /** Tesis corta que acompaña al título de la sección. */
  tagline: {
    es: "Construyo la parte del software que la gente usa.",
    en: "I build the part of software people actually use.",
  } satisfies Localized,
  /** Admite **resaltado** con el color de acento. */
  lead: {
    es: "Soy desarrollador frontend con 6\u00a0años de experiencia en desarrollo y 4\u00a0años construyendo software para el **sector salud** en Wiener\u00a0Lab.",
    en: "I'm a frontend developer with 6\u00a0years of development experience and 4\u00a0years building **healthcare software** at Wiener\u00a0Lab.",
  },
  paragraphs: [
    {
      es: "Actualmente trabajo en Nobilis\u00a0Cloud, un LIS (sistema de información de laboratorio), y en My\u00a0Wiener\u00a0Lab, el portal de postventa de la empresa.",
      en: "I currently work on Nobilis\u00a0Cloud, a LIS (laboratory information system), and on My\u00a0Wiener\u00a0Lab, the company's after-sales portal.",
    },
    {
      es: "En paralelo, desarrollo productos propios web y mobile de punta a punta: desde la idea y el diseño de la experiencia hasta la implementación. Me interesa entender qué problema resuelve cada producto, cómo hacerlo fácil de usar y, sobre todo, decidir qué vale la pena construir.",
      en: "In parallel, I build my own web and mobile products end to end: from the idea and the experience design to the implementation. I care about understanding what problem each product solves, how to make it easy to use and, above all, deciding what's worth building.",
    },
  ] satisfies Localized[],
  strengthsTitle: { es: "Lo que aporto", en: "What I bring" } satisfies Localized,
  strengths: [
    {
      title: { es: "Arquitectura desde cero", en: "Architecture from scratch" },
      body: {
        es: "Participé en la creación del frontend de Nobilis\u00a0Cloud desde sus primeras etapas, contribuyendo a definir una arquitectura que continúa evolucionando y escalando junto a equipos multidisciplinarios.",
        en: "I took part in building the Nobilis\u00a0Cloud frontend from its earliest stages, helping define an architecture that keeps evolving and scaling alongside multidisciplinary teams.",
      },
    },
    {
      title: { es: "Desarrollo + UI/UX", en: "Development + UI/UX" },
      body: {
        es: "Me interesa tanto cómo funciona un producto como la experiencia que ofrece. Busco construir interfaces claras, intuitivas y consistentes, donde cada decisión tenga un propósito.",
        en: "I care as much about how a product works as about the experience it offers. I aim to build clear, intuitive and consistent interfaces, where every decision has a purpose.",
      },
    },
    {
      title: { es: "Mirada de producto", en: "Product mindset" },
      body: {
        es: "El desarrollo de productos propios me lleva a involucrarme en todo el proceso: entender necesidades, diseñar soluciones, evaluar alternativas y priorizar funcionalidades. No se trata solamente de construir, sino de construir lo correcto.",
        en: "Building my own products gets me involved in the whole process: understanding needs, designing solutions, weighing alternatives and prioritizing features. It's not just about building, but about building the right thing.",
      },
    },
  ] satisfies Strength[],
};
