import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/**
 * Measurable results. Big figures in accent panels laid over a full-bleed photograph —
 * the portfolio's "RESULTADOS MENSURÁVEIS" layout.
 */
export function ResultsSlide({
  ground = "black", image, title = "Resultados mensuráveis:", figures = [], notes = [],
  assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  return (
    <SlideFrame ground={ground} fit={fit}>
      {image && <>
        <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(25,25,25,.86) 0%,rgba(25,25,25,.42) 58%,rgba(25,25,25,.10) 100%)" }} />
      </>}
      <SlideChrome ground={ground} frame="rules" mark="left" assetBase={assetBase} />
      <div style={{ position: "absolute", left: 72, top: 88, bottom: 104, width: 560, display: "grid", alignContent: "start", gap: 22 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 40, lineHeight: 1.02, letterSpacing: "-0.025em", textTransform: "uppercase", color: "#D3DE28", margin: 0, maxWidth: "16ch" }}>{title}</h2>
        <div style={{ display: "grid", gap: 10 }}>
          {figures.map((fg) => (
            <div key={fg.label} style={{ display: "inline-grid", gridTemplateColumns: "auto 1fr", alignItems: "baseline", gap: 14, background: "#D3DE28", color: "#191919", padding: "10px 16px", justifySelf: "start" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 34, lineHeight: 1, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>{fg.value}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{fg.label}</span>
            </div>
          ))}
        </div>
        {notes.length > 0 && (
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
            {notes.map((n) => (
              <li key={n} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 12, fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.42, color: "#FFFFFF" }}>
                <span style={{ width: 12, height: 2, background: "#D3DE28", marginTop: 10 }} />{n}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SlideFrame>
  );
}
