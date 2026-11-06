import React from "react";
import { Eyebrow } from "../core/Eyebrow.jsx";

const GROUNDS = {
  paper: { background: "var(--vers-white)", cls: "" },
  subtle: { background: "var(--vers-ink-050)", cls: "" },
  black: { background: "var(--vers-black)", cls: "vers-dark" },
  graphite: { background: "var(--vers-graphite)", cls: "vers-dark" },
  indigo: { background: "var(--vers-indigo-900)", cls: "vers-indigo" },
  lime: { background: "var(--vers-lime)", cls: "" },
  orange: { background: "var(--vers-orange)", cls: "" },
  sky: { background: "var(--vers-sky)", cls: "" },
  lilac: { background: "var(--vers-lilac)", cls: "" }
};

/** A full-bleed page section on one dominant ground. Colour changes between sections, never inside one. */
export function Section({
  ground = "paper", eyebrow, title, lede, align = "left",
  width = "var(--container-full)", pad = "var(--gutter-section)",
  children, style, ...rest
}) {
  const g = GROUNDS[ground] || GROUNDS.paper;
  return (
    <section className={g.cls} style={{ background: g.background, color: "var(--text-primary)", padding: pad + " var(--gutter-page)", ...style }} {...rest}>
      <div style={{ maxWidth: width, margin: "0 auto", display: "grid", gap: "var(--space-7)", justifyItems: align === "center" ? "center" : "stretch", textAlign: align }}>
        {(eyebrow || title || lede) && (
          <header style={{ display: "grid", gap: "var(--space-4)", maxWidth: align === "center" ? "var(--container-text)" : undefined, justifyItems: align === "center" ? "center" : "start" }}>
            {eyebrow && <Eyebrow rule={align !== "center"} tone="accent">{eyebrow}</Eyebrow>}
            {title && <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--size-display-s)", lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)", textTransform: "uppercase", margin: 0, textWrap: "balance" }}>{title}</h2>}
            {lede && <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-l)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)", margin: 0, maxWidth: "var(--measure-prose)" }}>{lede}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
