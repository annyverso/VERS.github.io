import React from "react";

const FILES = {
  white: "logotipo-white.png", black: "logotipo-black.png", lime: "logotipo-lime.png",
  orange: "logotipo-orange.png", sky: "logotipo-sky.png", lilac: "logotipo-lilac.png", indigo: "logotipo-indigo.png"
};
const SYMBOL = {
  white: "simbolo-v-white.png", black: "simbolo-v-black.png", lime: "simbolo-v-lime.png",
  orange: "simbolo-v-orange.png", sky: "simbolo-v-sky.png", lilac: "simbolo-v-lilac.png", indigo: "simbolo-v-indigo.png"
};

/** The VERS logotipo (or the isolated Símbolo V), optionally locked up with an institutional descriptor. */
export function Logo({
  colour = "black",
  mark = "wordmark",
  height = 32,
  descriptor,
  assetBase = "assets/graphics",
  style,
  ...rest
}) {
  const src = assetBase + "/" + (mark === "symbol" ? SYMBOL[colour] || SYMBOL.black : FILES[colour] || FILES.black);
  // p. 46: the descriptor is set in Elgraine Bold Italic, in the logotipo's colour, under it and right-aligned;
  // size 0.17 x the logotipo height (p. 46 sample), never below 10px.
  const INK = { white: "var(--vers-white)", black: "var(--vers-black)", lime: "var(--vers-lime)", orange: "var(--vers-orange)", sky: "var(--vers-sky)", lilac: "var(--vers-lilac)", indigo: "var(--vers-indigo)" };
  const ink = INK[colour] || INK.black;

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end", gap: Math.round(height * 0.18), ...style }} {...rest}>
      <img src={src} alt="VERS" style={{ height, width: "auto", display: "block" }} />
      {descriptor && (
        <span style={{
          fontFamily: "var(--font-body)", fontStyle: "italic", fontWeight: 700,
          fontSize: Math.max(10, Math.round(height * 0.17)), lineHeight: 1.2,
          color: ink, whiteSpace: "nowrap"
        }}>{descriptor}</span>
      )}
    </div>
  );
}
