import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/** Section divider — a grafismo running full-bleed behind a number and a title. */
export function SectionBreakSlide({
  ground = "black", number = "02", title = "VERS Apresenta", subtitle,
  grafismo = "mural", assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  const FORMS = { mural: "mural-white.png", ondas: "ondas-white.png", glitch: "glitch-grande-white.png", olho: "olho-white.png", v: "simbolo-v-white.png" };
  const url = assetBase + "/" + (FORMS[grafismo] || FORMS.mural);
  const tiled = grafismo === "mural" || grafismo === "ondas";
  return (
    <SlideFrame ground={ground} fit={fit}>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, opacity: 0.18,
        WebkitMask: `url("${url}") center/${tiled ? "300px" : "contain"} ${tiled ? "repeat" : "no-repeat"}`,
        mask: `url("${url}") center/${tiled ? "300px" : "contain"} ${tiled ? "repeat" : "no-repeat"}`,
        background: g.accent
      }} />
      <SlideChrome ground={ground} frame="rules" mark="left" assetBase={assetBase} />
      <div style={{ position: "absolute", inset: 0, padding: "96px 72px 108px", display: "grid", alignContent: "center", gap: 22 }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 20, letterSpacing: "0.2em", color: g.accent }}>{number}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 78, lineHeight: 0.94, letterSpacing: "-0.04em", textTransform: "uppercase", color: g.ink, margin: 0, maxWidth: "14ch" }}>{title}</h2>
        {subtitle && <p style={{ fontFamily: "var(--font-body)", fontSize: 21, lineHeight: 1.42, color: g.ink, opacity: 0.9, margin: 0, maxWidth: "48ch" }}>{subtitle}</p>}
      </div>
    </SlideFrame>
  );
}
