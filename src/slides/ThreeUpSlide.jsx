import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/** Three numbered columns — for Os três verbos, the three frentes, or a three-part challenge. */
export function ThreeUpSlide({
  ground = "indigo", eyebrow = "Os três verbos da VERS", title = "Produzir. Distribuir. Materializar.",
  items = [], assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  return (
    <SlideFrame ground={ground} fit={fit}>
      <SlideChrome ground={ground} frame="rules" mark="right" assetBase={assetBase} />
      <div style={{ position: "absolute", left: 72, right: 72, top: 88, bottom: 104, display: "grid", gridTemplateRows: "auto 1fr", gap: 40 }}>
        <header style={{ display: "grid", gap: 14 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: g.accentText }}>{eyebrow}</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 48, lineHeight: 0.98, letterSpacing: "-0.03em", textTransform: "uppercase", color: g.ink, margin: 0 }}>{title}</h2>
        </header>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, alignContent: "start" }}>
          {items.map((it, i) => (
            <div key={it.title} style={{ display: "grid", gap: 14, alignContent: "start", borderTop: "3px solid " + g.accent, paddingTop: 20 }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", color: g.accentText }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 32, lineHeight: 1, letterSpacing: "-0.02em", textTransform: "uppercase", color: g.ink }}>{it.title}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.45, color: g.ink, opacity: 0.9, margin: 0 }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
