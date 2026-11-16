# Portfolio — Matías

Portfolio personal. Next.js (App Router) · React · TypeScript · Tailwind CSS · Motion · Lucide.

## Requisitos

- Node.js ≥ 20.9 (recomendado: 22 LTS o superior)

## Scripts

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run lint       # ESLint
npm run typecheck  # chequeo de tipos
```

## Estructura

```
src/
├─ app/
│  ├─ [locale]/          # layout raíz por idioma (/es, /en)
│  │  ├─ layout.tsx      # <html lang>, fuentes, tema, metadata y hreflang
│  │  ├─ page.tsx        # home (provisoria)
│  │  ├─ not-found.tsx   # 404 traducido
│  │  └─ [...rest]/      # rutas inexistentes → 404
│  ├─ globals.css        # tokens de diseño y tema claro/oscuro
│  ├─ icon.svg · robots.ts · sitemap.ts
├─ assets/fonts/         # Geist, Geist Mono, Instrument Serif (OFL, self-hosted)
├─ components/
│  ├─ ui/                # primitivos reutilizables
│  ├─ layout/            # header, selector de tema e idioma
│  ├─ sections/          # secciones del portfolio
│  └─ motion/            # wrappers de animación
├─ content/              # contenido de dominio tipado (proyectos, trayectoria…)
├─ i18n/                 # configuración, diccionarios y mensajes es/en
├─ lib/                  # utilidades (cn, fuentes, config del sitio)
├─ types/                # tipos compartidos
└─ proxy.ts              # redirige / al idioma preferido del navegador
```

## Decisiones

- **i18n nativo** con `next/root-params` y diccionarios JSON. `es.json` es la fuente de verdad del tipado: si falta una clave en `en.json`, el build falla.
- **Textos de interfaz** en `i18n/messages`; **contenido de dominio** en `content/` usando `Localized<T>`.
- **Temas** con `next-themes`. Oscuro por defecto, sin seguir al sistema. Los colores son tokens semánticos (`bg`, `surface`, `elevated`, `fg`, `fg-muted`, `accent`, `accent-text`, `line`). Ningún componente usa hex directos.
- **Accesibilidad de color**: `accent` (#3478F6) se usa en rellenos y bordes; `accent-text` en texto y links (≥ 4.5:1 en ambos temas).
- **TypeScript 6.0**: TS 7 todavía no es compatible con typescript-eslint.

## Variables de entorno

| Variable               | Uso                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica (ej. `https://tudominio.com`). En Vercel, sin definir, usa el dominio de producción. |
