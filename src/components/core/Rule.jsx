import React from "react";

/** Horizontal or vertical rule. Structure in VERS comes from rules, not boxes. */
export function Rule({ weight = "hairline", tone = "subtle", vertical = false, style, ...rest }) {
  const w = { hairline: "var(--border-hairline)", rule: "var(--border-rule)", heavy: "var(--border-heavy)" }[weight] || "1px";
  const c = { subtle: "var(--border-subtle)", default: "var(--border-default)", strong: "var(--border-strong)", lime: "var(--vers-lime)", indigo: "var(--vers-indigo)" }[tone] || "var(--border-subtle)";
  return (
    <div
      role="separator"
      aria-orientation={vertical ? "vertical" : "horizontal"}
      style={vertical
        ? { width: w, alignSelf: "stretch", background: c, flex: "0 0 auto", ...style }
        : { height: w, width: "100%", background: c, ...style }}
      {...rest}
    />
  );
}
