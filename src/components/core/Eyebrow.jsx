import React from "react";

/** The system's metadata voice — Nebulica uppercase at 0.18em tracking, optionally rule-led. */
export function Eyebrow({ rule = false, tone = "muted", children, style, ...rest }) {
  const colors = { muted: "var(--text-muted)", primary: "var(--text-primary)", accent: "var(--text-accent)", lime: "var(--vers-lime)" };
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 12,
        fontFamily: "var(--font-ui)", fontSize: "var(--size-eyebrow)", fontWeight: 500,
        letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase",
        color: colors[tone] || colors.muted, ...style
      }}
      {...rest}
    >
      {rule && <span style={{ width: 32, height: 2, background: "currentColor", flex: "0 0 auto" }} />}
      <span>{children}</span>
    </div>
  );
}
