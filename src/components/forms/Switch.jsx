import React from "react";

/** Binary toggle. Square track, square knob, lime when on. */
export function Switch({ checked, defaultChecked, onChange, label, disabled = false, id, style, ...rest }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : inner;
  const handle = (e) => { if (!isControlled) setInner(e.target.checked); onChange && onChange(e); };

  return (
    <label htmlFor={id} style={{ display: "inline-flex", alignItems: "center", gap: 12, cursor: disabled ? "not-allowed" : "pointer", ...style }}>
      <input id={id} type="checkbox" role="switch" checked={on} onChange={handle} disabled={disabled}
        style={{ position: "absolute", opacity: 0, width: 44, height: 24, margin: 0, cursor: "inherit" }} {...rest} />
      <span aria-hidden="true" style={{
        width: 46, height: 24, flex: "0 0 auto", position: "relative",
        background: disabled ? "var(--vers-ink-200)" : on ? "var(--vers-black)" : "var(--vers-ink-300)",
        borderRadius: "var(--radius-none)",
        transition: "background var(--duration-base) var(--ease-standard)"
      }}>
        <span style={{
          position: "absolute", top: 3, left: on ? 25 : 3, width: 18, height: 18,
          background: on ? "var(--vers-lime)" : "var(--vers-white)",
          transition: "left var(--duration-base) var(--ease-standard), background var(--duration-base) var(--ease-standard)"
        }} />
      </span>
      {label && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-s)", color: disabled ? "var(--action-disabled-fg)" : "var(--text-primary)" }}>{label}</span>}
    </label>
  );
}
