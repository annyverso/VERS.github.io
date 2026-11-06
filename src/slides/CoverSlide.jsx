import React from "react";
import { SlideFrame, SlideChrome, groundOf } from "./SlideFrame.jsx";

// Brandbook p. 6: in visual applications the tagline is composed in two lines, Nebulica Medium then
// Nebulica Black, same size, sentence case, no full stop.
const TAGLINES = {
  "Onde a cultura ganha presença": ["Onde a cultura", "ganha presença"],
  "Where culture gains presence": ["Where culture", "gains presence"],
  "Là où la culture devient présence": ["Là où la culture", "devient présence"]
};
function taglineLines(text) {
  const s = String(text).trim().replace(/\.$/, "");
  if (TAGLINES[s]) return TAGLINES[s];
  const w = s.split(" "), k = Math.ceil(w.length / 2);
  return [w.slice(0, k).join(" "), w.slice(k).join(" ")];
}

/**
 * Deck cover. The portfolio's own cover is the logotipo alone, centred on a flat lime ground —
 * no tagline, no photograph. Pass `title` only when the deck needs a named cover.
 */
export function CoverSlide({
  ground = "lime", title, eyebrow, meta, logoWidth = 630,
  assetBase = "assets/graphics", fit = true
}) {
  const bare = !title && !eyebrow && !meta;
  const ink = groundOf(ground).ink;
  const logo = ground === "black" || ground === "indigo" || ground === "indigo-deep" ? "white" : "black";
  const isTagline = typeof title === "string" && Boolean(TAGLINES[title.trim().replace(/\.$/, "")]);
  const lines = isTagline ? taglineLines(title) : null;
  return (
    <SlideFrame ground={ground} fit={fit}>
      {bare ? (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <img src={assetBase + "/logotipo-" + logo + ".png"} alt="VERS" style={{ width: logoWidth, height: "auto" }} />
        </div>
      ) : (
        <>
          <SlideChrome ground={ground} frame="rules" mark="left" assetBase={assetBase} />
          <div style={{ position: "absolute", inset: 0, padding: "108px 72px 96px", display: "grid", alignContent: "center", gap: 22 }}>
            {eyebrow && <div style={{ fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: ink, opacity: 0.9 }}>{eyebrow}</div>}
            {isTagline ? (
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 84, lineHeight: 1.06, letterSpacing: 0, color: ink, margin: 0 }}>
                <span style={{ display: "block", fontWeight: 500 }}>{lines[0]}</span>
                <span style={{ display: "block", fontWeight: 900 }}>{lines[1]}</span>
              </h1>
            ) : (
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 84, lineHeight: 0.94, letterSpacing: "-0.035em", textTransform: "uppercase", color: ink, margin: 0, maxWidth: "16ch" }}>{title}</h1>
            )}
            {meta && <div style={{ fontFamily: "var(--font-ui)", fontSize: 15, letterSpacing: "0.08em", textTransform: "uppercase", color: ink, opacity: 0.9 }}>{meta}</div>}
          </div>
        </>
      )}
    </SlideFrame>
  );
}
