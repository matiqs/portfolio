import { notFound } from "next/navigation";

/** Cualquier ruta inexistente bajo un idioma muestra el 404 traducido. */
export default function CatchAll() {
  notFound();
}
