import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/**
 * Scope / capability slide. Copy lives in tinted panels rather than loose on the ground —
 * the portfolio's standard way of presenting a list of deliverables.
 */
export function PanelsSlide({
  ground = "indigo", eyebrow, title = "A atuação da VERS contemplou todas as etapas do projeto",
  image, imageSide = "left", panels = [], panelTone = "lime", columns = 2,
  assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  const TONES = { lime: { background: "#D3DE28", color: "#191919" }, indigo: { background: "#4B59A7", color: "#FFFFFF" }, black: { background: "#191919", color: "#FFFFFF" }, paper: { background: "#FFFFFF", color: "#191919" } };
  const pt = TONES[panelTone] || TONES.lime;
  return (
    <SlideFrame ground={ground} fit={fit}>
      {image && (
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 330, overflow: "hidden", ...(imageSide === "left" ? { left: 0 } : { right: 0 }) }}>
          <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}
      <SlideChrome ground={ground} frame="rules" mark={imageSide === "left" ? "right" : "left"} assetBase={assetBase} />
      <div style={{ position: "absolute", top: 72, bottom: 104, ...(image ? (imageSide === "left" ? { left: 380, right: 72 } : { left: 72, right: 380 }) : { left: 72, right: 72 }), display: "grid", gridTemplateRows: "auto 1fr", gap: 26 }}>
        <header style={{ display: "grid", gap: 12 }}>
          {eyebrow && <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: g.accentText }}>{eyebrow}</div>}
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, lineHeight: 1.1, letterSpacing: "-0.015em", color: g.accent, margin: 0, maxWidth: "30ch" }}>{title}</h2>
        </header>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns},1fr)`, gap: 14, alignContent: "start" }}>
          {panels.map((p) => (
            <div key={p.title} style={{ padding: "16px 18px", ...pt }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, lineHeight: 1.2, letterSpacing: "-0.005em", marginBottom: 8 }}>{p.title}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.42, margin: 0, opacity: 0.9 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
