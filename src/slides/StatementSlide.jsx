import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/** One assertive line on one flat colour. The deck's punctuation between cases. */
export function StatementSlide({
  ground = "black", eyebrow, statement = "A tecnologia nunca foi o fim. Ela é o meio.",
  footnote, grafismo = "none", assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  return (
    <SlideFrame ground={ground} fit={fit}>
      {grafismo !== "none" && (
        <div aria-hidden="true" style={{
          position: "absolute", right: -120, bottom: -120, width: 620, height: 620, opacity: 0.9,
          WebkitMask: `url("${assetBase}/${grafismo}-white.png") center/contain no-repeat`,
          mask: `url("${assetBase}/${grafismo}-white.png") center/contain no-repeat`,
          background: g.accent
        }} />
      )}
      <SlideChrome ground={ground} frame="rules" mark="left" assetBase={assetBase} />
      <div style={{ position: "absolute", inset: 0, padding: "96px 72px 108px", display: "grid", alignContent: "center", gap: 26 }}>
        {eyebrow && <div style={{ fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: g.accentText }}>{eyebrow}</div>}
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 62, lineHeight: 1.0, letterSpacing: "-0.03em", textTransform: "uppercase", color: g.ink, maxWidth: "20ch", textWrap: "balance" }}>{statement}</div>
        {footnote && <p style={{ fontFamily: "var(--font-body)", fontSize: 19, lineHeight: 1.45, color: g.ink, opacity: 0.9, maxWidth: "52ch", margin: 0 }}>{footnote}</p>}
      </div>
    </SlideFrame>
  );
}
