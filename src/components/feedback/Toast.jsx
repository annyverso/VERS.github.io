import React from "react";

const TONES = {
  neutral: { background: "var(--vers-black)", color: "var(--vers-white)", bar: "var(--vers-white)" },
  success: { background: "var(--vers-black)", color: "var(--vers-white)", bar: "var(--vers-lime)" },
  alert: { background: "var(--vers-black)", color: "var(--vers-white)", bar: "var(--vers-orange)" }
};

/** Transient confirmation. Black block with a 4px accent bar — no rounding, no icon. */
export function Toast({ tone = "neutral", title, message, onDismiss, style, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <div role="status" style={{
      display: "flex", alignItems: "stretch", gap: 0, minWidth: 300, maxWidth: 440,
      background: t.background, color: t.color, boxShadow: "var(--shadow-overlay)", ...style
    }} {...rest}>
      <span aria-hidden="true" style={{ width: 4, background: t.bar, flex: "0 0 auto" }} />
      <div style={{ padding: "14px 16px", display: "grid", gap: 4, flex: 1 }}>
        {title && <div style={{ fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase" }}>{title}</div>}
        {message && <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-s)", lineHeight: 1.45, color: "rgba(255,255,255,.78)" }}>{message}</div>}
      </div>
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Fechar" style={{
          appearance: "none", background: "transparent", border: 0, color: "rgba(255,255,255,.6)",
          cursor: "pointer", padding: "0 14px", fontFamily: "var(--font-ui)", fontSize: 16
        }}>×</button>
      )}
    </div>
  );
}
