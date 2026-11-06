import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

/** Editorial pull-quote in Elgraine — the one slide where the serif carries the display role. */
export function QuoteSlide({
  ground = "lilac", quote = "A cultura ganha presença quando uma obra deixa de ser apenas vista e passa a ser vivida.",
  attribution = "Núcleo de marca", role = "Brandbook VERS",
  assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  return (
    <SlideFrame ground={ground} fit={fit}>
      <div aria-hidden="true" style={{
        position: "absolute", right: -70, bottom: -110, width: 470, height: 480, opacity: 0.18,
        WebkitMask: `url("${assetBase}/simbolo-v-white.png") center/contain no-repeat`,
        mask: `url("${assetBase}/simbolo-v-white.png") center/contain no-repeat`,
        background: "#191919"
      }} />
      <SlideChrome ground={ground} frame="rules" mark="left" assetBase={assetBase} />
      <div style={{ position: "absolute", inset: 0, padding: "96px 72px 108px", display: "grid", alignContent: "center" }}>
        <blockquote style={{ margin: 0, paddingLeft: 34, borderLeft: "5px solid " + g.accent, maxWidth: 880 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 38, lineHeight: 1.3, color: g.ink, margin: 0, textWrap: "pretty" }}>{quote}</p>
          <footer style={{ marginTop: 28, fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: g.ink, opacity: 0.9 }}>
            {attribution}{role && <span> · {role}</span>}
          </footer>
        </blockquote>
      </div>
    </SlideFrame>
  );
}
