import React from "react";

/** Label + control + help/error wrapper. Every form control in VERS sits inside a Field. */
export function Field({ label, htmlFor, help, error, required = false, children, style, ...rest }) {
  return (
    <div style={{ display: "grid", gap: 8, ...style }} {...rest}>
      {label && (
        <label htmlFor={htmlFor} style={{
          fontFamily: "var(--font-ui)", fontSize: "var(--size-eyebrow)", fontWeight: 500,
          letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-secondary)"
        }}>
          {label}{required && <span style={{ color: "var(--text-primary)", marginLeft: 4 }}>*</span>}
        </label>
      )}
      {children}
      {(help || error) && (
        <div style={{
          fontFamily: "var(--font-ui)", fontSize: "var(--size-caption)",
          color: error ? "var(--text-primary)" : "var(--text-muted)",
          borderLeft: error ? "3px solid var(--status-alert)" : "none", paddingLeft: error ? 8 : 0
        }}>{error || help}</div>
      )}
    </div>
  );
}
