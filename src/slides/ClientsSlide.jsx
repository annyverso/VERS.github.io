import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/** Institutions and partners. Evidence does the work adjectives would do. */
export function ClientsSlide({
  ground = "paper", eyebrow = "Instituições e parceiros", title = "Com quem a VERS trabalha",
  logos = [], assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  const dark = ground === "black" || ground === "indigo" || ground === "indigo-deep";
  return (
    <SlideFrame ground={ground} fit={fit}>
      <SlideChrome ground={ground} frame="rules" mark="right" assetBase={assetBase} />
      <div style={{ position: "absolute", left: 72, right: 72, top: 88, bottom: 104, display: "grid", gridTemplateRows: "auto 1fr", gap: 36 }}>
        <header style={{ display: "grid", gap: 12 }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: g.accentText }}>{eyebrow}</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 44, lineHeight: 0.98, letterSpacing: "-0.03em", textTransform: "uppercase", color: g.ink, margin: 0 }}>{title}</h2>
        </header>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "30px 26px", alignContent: "center", borderTop: "1px solid " + g.accent, paddingTop: 36 }}>
          {logos.map((src) => (
            <div key={src} style={{ height: 56, display: "grid", placeItems: "center" }}>
              <img src={src} alt="" style={{ maxHeight: 56, maxWidth: "100%", width: "auto", objectFit: "contain", filter: dark ? "grayscale(1) invert(1) brightness(2)" : "grayscale(1)", opacity: 0.8 }} />
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
