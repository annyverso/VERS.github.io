import React from "react";

/** Radio. The one round control in the system — roundness here is a convention, not a style choice. */
export function Radio({ checked, name, value, onChange, label, disabled = false, id, style, ...rest }) {
  return (
    <label htmlFor={id} style={{ display: "inline-flex", alignItems: "flex-start", gap: 12, cursor: disabled ? "not-allowed" : "pointer", ...style }}>
      <input id={id} type="radio" name={name} value={value} checked={checked} onChange={onChange} disabled={disabled}
        style={{ position: "absolute", opacity: 0, width: 20, height: 20, margin: 0, cursor: "inherit" }} {...rest} />
      <span aria-hidden="true" style={{
        flex: "0 0 auto", width: 20, height: 20, marginTop: 1, borderRadius: "var(--radius-pill)",
        border: "2px solid " + (disabled ? "var(--border-default)" : "var(--border-strong)"),
        background: "transparent", display: "grid", placeItems: "center"
      }}>
        {checked && <span style={{ width: 10, height: 10, borderRadius: "var(--radius-pill)", background: "var(--vers-black)" }} />}
      </span>
      {label && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-s)", lineHeight: 1.4, color: disabled ? "var(--action-disabled-fg)" : "var(--text-primary)" }}>{label}</span>}
    </label>
  );
}
