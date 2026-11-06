import React from "react";
import { SlideFrame, SlideChrome, groundOf, Wedge } from "./SlideFrame.jsx";

/** Photo mosaic — three to six images showing the public and the team. Diversity of audience is a message. */
export function PhotoMosaicSlide({
  ground = "indigo", title = "Diversidade de público e equipe", subtitle,
  images = [], wedge = true, assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  const n = images.length;
  const cols = n <= 3 ? n : n <= 4 ? 2 : 3;
  return (
    <SlideFrame ground={ground} fit={fit}>
      {wedge && <Wedge corner="top-left" colour="#D3DE28" size={200} />}
      <SlideChrome ground={ground} frame="rules" mark="right" assetBase={assetBase} />
      <div style={{ position: "absolute", left: 72, top: 266, width: 300 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 38, lineHeight: 1.02, letterSpacing: "-0.025em", color: "#D3DE28", margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.45, color: g.ink, opacity: 0.9, margin: "18px 0 0" }}>{subtitle}</p>}
      </div>
      <div style={{ position: "absolute", left: 420, right: 72, top: 88, bottom: 104, display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 10 }}>
        {images.map((src, i) => (
          <div key={src + i} style={{ overflow: "hidden", background: "#191919" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}
