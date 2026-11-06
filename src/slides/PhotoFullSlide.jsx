import React from "react";
import { SlideFrame, SlideChrome } from "./SlideFrame.jsx";

/** Full-bleed photograph with a protection gradient. Images run big — the deck's default slide. */
export function PhotoFullSlide({
  image, eyebrow = "Circuito Sesc de Artes", title = "Barretos · 2026",
  body, credit = "Foto: Danilo Ferrara", align = "left",
  assetBase = "assets/graphics", fit = true
}) {
  return (
    <SlideFrame ground="black" fit={fit}>
      <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--protect-bottom)" }} />
      {align === "left" && <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--protect-left)" }} />}
      <SlideChrome ground="black" frame="rules" mark="right" assetBase={assetBase} />
      <div style={{ position: "absolute", left: 72, right: 72, bottom: 108, maxWidth: align === "left" ? 700 : undefined }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D3DE28" }}>{eyebrow}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 58, lineHeight: 0.98, letterSpacing: "-0.03em", textTransform: "uppercase", color: "#FFFFFF", margin: "18px 0 0" }}>{title}</h2>
        {body && <p style={{ fontFamily: "var(--font-body)", fontSize: 19, lineHeight: 1.45, color: "rgba(255,255,255,.84)", margin: "18px 0 0", maxWidth: 560 }}>{body}</p>}
      </div>
      {credit && <div style={{ position: "absolute", left: 72, bottom: 56, fontFamily: "var(--font-ui)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>{credit}</div>}
    </SlideFrame>
  );
}
