import React from "react";

/** A number that carries weight — visitors, editions, festivals, territories. Evidence, not decoration. */
export function Stat({ value, label, suffix, tone = "primary", size = "md", style, ...rest }) {
  const sizes = { sm: 34, md: 56, lg: 88 };
  const colors = { primary: "var(--text-primary)", accent: "var(--text-accent)", lime: "var(--vers-lime)", orange: "var(--vers-orange)" };
  return (
    <div style={{ display: "grid", gap: 8, ...style }} {...rest}>
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 900,
        fontSize: sizes[size] || sizes.md, lineHeight: 0.92,
        letterSpacing: "var(--tracking-display)", color: colors[tone] || colors.primary,
        fontVariantNumeric: "tabular-nums"
      }}>
        {value}{suffix && <span style={{ fontSize: "0.52em", marginLeft: 4 }}>{suffix}</span>}
      </div>
      <div style={{
        fontFamily: "var(--font-ui)", fontSize: "var(--size-eyebrow)", fontWeight: 500,
        letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)"
      }}>{label}</div>
    </div>
  );
}
