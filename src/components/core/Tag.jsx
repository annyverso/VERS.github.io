import React from "react";

const TONES = {
  neutral: { background: "var(--vers-ink-100)", color: "var(--vers-ink-700)" },
  indigo: { background: "var(--vers-indigo)", color: "var(--vers-white)" },
  lime: { background: "var(--vers-lime)", color: "var(--vers-black)" },
  orange: { background: "var(--vers-orange)", color: "var(--vers-white)" },
  sky: { background: "var(--vers-sky)", color: "var(--vers-black)" },
  lilac: { background: "var(--vers-lilac)", color: "var(--vers-black)" },
  outline: { background: "transparent", color: "var(--text-primary)", boxShadow: "inset 0 0 0 1px var(--border-default)" }
};

/** Small classification chip — formato, território, ano, frente. */
export function Tag({ tone = "neutral", pill = false, children, style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center",
        padding: pill ? "5px 12px" : "5px 10px",
        fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500,
        letterSpacing: "var(--tracking-label)", textTransform: "uppercase",
        borderRadius: pill ? "var(--radius-pill)" : "var(--radius-none)",
        whiteSpace: "nowrap",
        ...(TONES[tone] || TONES.neutral), ...style
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
