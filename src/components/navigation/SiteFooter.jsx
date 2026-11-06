import React from "react";
import { Logo } from "../brand/Logo.jsx";

// Brandbook p. 6: in visual applications the tagline is composed in two lines, Nebulica Medium then
// Nebulica Black, same size, sentence case, no full stop.
const TAGLINES = {
  "Onde a cultura ganha presença": ["Onde a cultura", "ganha presença"],
  "Where culture gains presence": ["Where culture", "gains presence"],
  "Là où la culture devient présence": ["Là où la culture", "devient présence"]
};
function taglineLines(text) {
  const s = String(text).trim().replace(/\.$/, "");
  if (TAGLINES[s]) return TAGLINES[s];
  const w = s.split(" "), k = Math.ceil(w.length / 2);
  return [w.slice(0, k).join(" "), w.slice(k).join(" ")];
}

/** Site footer — logotipo with descriptor, column links, trilingual descriptor line. */
export function SiteFooter({
  columns = [], descriptor = "Produtora e distribuidora de cultura imersiva",
  tagline = "Onde a cultura ganha presença", legal, assetBase = "assets/graphics", style, ...rest
}) {
  return (
    <footer className="vers-dark" style={{ background: "var(--vers-black)", color: "var(--vers-white)", padding: "var(--space-9) var(--gutter-page) var(--space-6)", ...style }} {...rest}>
      <div style={{ maxWidth: "var(--container-full)", margin: "0 auto", display: "grid", gap: "var(--space-8)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(240px,1.4fr) repeat(auto-fit,minmax(150px,1fr))", gap: "var(--space-7)" }}>
          <div style={{ display: "grid", gap: 22, alignContent: "start" }}>
            <Logo colour="white" height={30} descriptor={descriptor} assetBase={assetBase} />
          </div>
          {columns.map((col) => (
            <div key={col.title} style={{ display: "grid", gap: 14, alignContent: "start" }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--size-eyebrow)", fontWeight: 500, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "rgba(255,255,255,.48)" }}>{col.title}</div>
              <div style={{ display: "grid", gap: 9 }}>
                {col.links.map((l) => (
                  <a key={l.label} href={l.href || "#"} style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--vers-white)", textDecoration: "none", border: 0 }}>{l.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,.14)" }} />

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 20, alignItems: "baseline" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, lineHeight: 1.06, color: "var(--vers-lime)" }}>
            <span style={{ display: "block", fontWeight: 500 }}>{taglineLines(tagline)[0]}</span>
            <span style={{ display: "block", fontWeight: 900 }}>{taglineLines(tagline)[1]}</span>
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, letterSpacing: "var(--tracking-label)", color: "rgba(255,255,255,.44)" }}>{legal}</div>
        </div>
      </div>
    </footer>
  );
}
