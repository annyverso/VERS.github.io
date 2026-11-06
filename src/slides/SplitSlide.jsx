import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/** Half photograph, half text. The workhorse content slide. */
export function SplitSlide({
  image, side = "left", ground = "black", eyebrow = "Frente 03",
  title = "Materializar", body, bullets = [], assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  const media = <div style={{ position: "relative", overflow: "hidden", background: "#191919" }}>
    {image && <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
  </div>;
  const text = <div style={{ padding: "88px 72px 104px", display: "grid", alignContent: "center", gap: 22 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: g.accentText }}>
      <span style={{ width: 34, height: 2, background: "currentColor" }} />{eyebrow}
    </div>
    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 52, lineHeight: 0.98, letterSpacing: "-0.03em", textTransform: "uppercase", color: g.ink, margin: 0 }}>{title}</h2>
    {body && <p style={{ fontFamily: "var(--font-body)", fontSize: 19, lineHeight: 1.5, color: g.ink, opacity: 0.9, margin: 0 }}>{body}</p>}
    {bullets.length > 0 && (
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
        {bullets.map((b) => (
          <li key={b} style={{ display: "grid", gridTemplateColumns: "18px 1fr", gap: 14, alignItems: "start", fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.42, color: g.ink }}>
            <span style={{ width: 14, height: 2, background: g.accent, marginTop: 11 }} />{b}
          </li>
        ))}
      </ul>
    )}
  </div>;
  return (
    <SlideFrame ground={ground} fit={fit}>
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {side === "left" ? <>{media}{text}</> : <>{text}{media}</>}
      </div>
      <SlideChrome ground={ground} frame="none" mark={side === "left" ? "right" : "left"} assetBase={assetBase} />
    </SlideFrame>
  );
}
