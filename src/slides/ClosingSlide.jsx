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

/** Closing slide — the mark centred on a flat ground, with the contact line. */
export function ClosingSlide({
  ground = "lime", tagline, descriptor = "Produtora e distribuidora de cultura imersiva",
  contact = ["alexandre.calil@vers.com.br", "vers.com.br", "@vers_xr"],
  assetBase = "assets/graphics", fit = true
}) {
  const g = groundOf(ground);
  const logo = ground === "black" || ground === "indigo" || ground === "indigo-deep" ? "white" : "black";
  return (
    <SlideFrame ground={ground} fit={fit}>
      <SlideChrome ground={ground} frame="rules" mark="none" assetBase={assetBase} />
      <div style={{ position: "absolute", inset: 0, padding: "96px 72px 88px", display: "grid", gridTemplateRows: "1fr auto", gap: 32 }}>
        <div style={{ alignSelf: "center", justifySelf: "center", textAlign: "center", display: "grid", gap: 28, justifyItems: "center" }}>
          <img src={assetBase + "/logotipo-" + logo + ".png"} alt="VERS" style={{ width: 420, height: "auto" }} />
          {tagline && <div style={{ fontFamily: "var(--font-display)", fontSize: 34, lineHeight: 1.06, color: g.accent }}>
            <span style={{ display: "block", fontWeight: 500 }}>{taglineLines(tagline)[0]}</span>
            <span style={{ display: "block", fontWeight: 900 }}>{taglineLines(tagline)[1]}</span>
          </div>}
          <div style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontWeight: 700, fontSize: 18, color: g.ink }}>{descriptor}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, borderTop: "1px solid " + g.accent, paddingTop: 22 }}>
          {contact.map((c) => <span key={c} style={{ fontFamily: "var(--font-ui)", fontSize: 14, letterSpacing: "0.08em", color: g.ink }}>{c}</span>)}
        </div>
      </div>
    </SlideFrame>
  );
}
