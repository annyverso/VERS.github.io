import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/**
 * Case-study opener. One flat colour ground per case, a big title in the accent colour,
 * a photograph clipped on the deck's diagonal, and the years the case ran.
 */
export function CaseOpenerSlide({
  ground = "lilac", title = "CCXP", subtitle, years = [],
  image, grafismo = "mural", assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  return (
    <SlideFrame ground={ground} fit={fit}>
      {image && (
        <div style={{ position: "absolute", right: 0, top: 0, width: 660, height: 720, overflow: "hidden", clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }}>
          <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}
      {grafismo !== "none" && (
        <div aria-hidden="true" style={{
          position: "absolute", right: 96, top: -30, width: 300, height: 230,
          WebkitMask: `url("${assetBase}/${grafismo}-white.png") center/contain no-repeat`,
          mask: `url("${assetBase}/${grafismo}-white.png") center/contain no-repeat`,
          background: "#D3DE28"
        }} />
      )}
      <SlideChrome ground={ground} frame="rules" mark="left" assetBase={assetBase} />
      <div style={{ position: "absolute", left: 72, top: 0, bottom: 0, width: 560, display: "grid", alignContent: "center", gap: 26 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 62, lineHeight: 0.98, letterSpacing: "-0.03em", textTransform: "uppercase", color: g.accent, margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ fontFamily: "var(--font-body)", fontSize: 20, lineHeight: 1.45, color: g.ink, opacity: 0.9, margin: 0, maxWidth: "34ch" }}>{subtitle}</p>}
        {years.length > 0 && (
          <div style={{ display: "grid", gap: 4, marginTop: 6 }}>
            {years.map((y) => <div key={y} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, letterSpacing: "0.02em", color: g.ink, opacity: 0.9 }}>{y}</div>)}
          </div>
        )}
      </div>
    </SlideFrame>
  );
}
