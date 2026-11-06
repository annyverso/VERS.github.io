import React from "react";

const FORMS = {
  logotipo: "logotipo-white.png",
  v: "simbolo-v-white.png",
  "simbolo-v": "simbolo-v-white.png",
  olho: "olho-white.png",
  // dark grounds: the inverted eye keeps the polarity (colour fills the frame, the dots are cut out)
  "olho-invertido": "olho-invertido-white.png",
  mural: "mural-white.png",
  ondas: "ondas-white.png",
  glitch: "glitch-grande-white.png",
  "glitch-grande": "glitch-grande-white.png",
  "glitch-h": "glitch-h-white.png",
  "glitch-v": "glitch-v-white.png"
};

/**
 * A Grafismo used as texture — tinted through a CSS mask so any colour works, including
 * translucent veils the shipped colourways can't express. When you need a flat brand colour,
 * prefer the tinted file directly: <img src="assets/graphics/olho-lime.png">.
 * Fills its positioned parent by default.
 */
export function Grafismo({
  form = "olho",
  colour = "var(--vers-lime)",
  opacity = 1,
  repeat = false,
  size = "cover",
  position = "center",
  assetBase = "assets/graphics",
  style,
  ...rest
}) {
  const url = assetBase + "/" + (FORMS[form] || FORMS.olho);
  const mask = `url("${url}") ${position}/${size} ${repeat ? "repeat" : "no-repeat"}`;
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        WebkitMask: mask, mask, background: colour, opacity, ...style
      }}
      {...rest}
    />
  );
}
