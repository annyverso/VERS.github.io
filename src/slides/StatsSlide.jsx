import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/** Track record. Numbers are evidence — the operational register's slide. */
export function StatsSlide({
  ground = "black", eyebrow = "Track record", title = "Operação em escala",
  stats = [], footnote, assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  return (
    <SlideFrame ground={ground} fit={fit}>
      <SlideChrome ground={ground} frame="rules" mark="right" assetBase={assetBase} />
      <div style={{ position: "absolute", left: 72, right: 72, top: 88, bottom: 104, display: "grid", gridTemplateRows: "auto 1fr auto", gap: 32 }}>
        <header style={{ display: "grid", gap: 14 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: g.accentText }}>{eyebrow}</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 48, lineHeight: 0.98, letterSpacing: "-0.03em", textTransform: "uppercase", color: g.ink, margin: 0 }}>{title}</h2>
        </header>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.max(stats.length, 1)},1fr)`, alignContent: "center", borderTop: "1px solid " + g.accent }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: "32px 28px 0", borderLeft: i ? "1px solid " + g.accent : "none", display: "grid", gap: 12 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 68, lineHeight: 0.9, letterSpacing: "-0.04em", color: g.accent, fontVariantNumeric: "tabular-nums" }}>
                {s.value}{s.suffix && <span style={{ fontSize: "0.46em", marginLeft: 5 }}>{s.suffix}</span>}
              </div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: g.ink, opacity: 0.9 }}>{s.label}</div>
            </div>
          ))}
        </div>
        {footnote && <div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: g.ink, opacity: 0.9 }}>{footnote}</div>}
      </div>
    </SlideFrame>
  );
}
