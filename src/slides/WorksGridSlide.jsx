import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/** Catalogue grid — three works with a format stamp. Used for VERS Apresenta selections. */
export function WorksGridSlide({
  ground = "black", eyebrow = "VERS Apresenta", title = "Catálogo de experiências",
  works = [], assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  return (
    <SlideFrame ground={ground} fit={fit}>
      <SlideChrome ground={ground} frame="rules" mark="right" assetBase={assetBase} />
      <div style={{ position: "absolute", left: 72, right: 72, top: 88, bottom: 104, display: "grid", gridTemplateRows: "auto 1fr", gap: 32 }}>
        <header style={{ display: "grid", gap: 12 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: g.accentText }}>{eyebrow}</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 44, lineHeight: 0.98, letterSpacing: "-0.03em", textTransform: "uppercase", color: g.ink, margin: 0 }}>{title}</h2>
        </header>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, alignContent: "start" }}>
          {works.map((w) => (
            <div key={w.title} style={{ display: "grid", gap: 12, alignContent: "start" }}>
              <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: "#191919" }}>
                {w.image && <img src={w.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
                {w.format && <span style={{ position: "absolute", left: 0, top: 0, background: "#D3DE28", color: "#191919", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 10px" }}>{w.format}</span>}
              </div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: g.accentText }}>{[w.venue, w.year].filter(Boolean).join(" · ")}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, lineHeight: 1.08, letterSpacing: "-0.01em", color: g.ink }}>{w.title}</div>
              {w.summary && <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.42, color: g.ink, opacity: 0.9, margin: 0 }}>{w.summary}</p>}
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
