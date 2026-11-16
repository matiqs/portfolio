import { Fragment, type ReactNode } from "react";

/** Resalta con el color de acento los fragmentos marcados entre **dobles asteriscos**. */
export function highlight(text: string): ReactNode {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-accent-text">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
