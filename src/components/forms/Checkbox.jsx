import React from "react";

/** Square checkbox with a drawn tick. No rounding — the system does not round things. */
export function Checkbox({ checked, defaultChecked, onChange, label, disabled = false, id, style, ...rest }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : inner;
  const handle = (e) => { if (!isControlled) setInner(e.target.checked); onChange && onChange(e); };

  return (
    <label htmlFor={id} style={{ display: "inline-flex", alignItems: "flex-start", gap: 12, cursor: disabled ? "not-allowed" : "pointer", ...style }}>
      <input id={id} type="checkbox" checked={on} onChange={handle} disabled={disabled}
        style={{ position: "absolute", opacity: 0, width: 20, height: 20, margin: 0, cursor: "inherit" }} {...rest} />
      <span aria-hidden="true" style={{
        flex: "0 0 auto", width: 20, height: 20, marginTop: 1,
        border: "2px solid " + (disabled ? "var(--border-default)" : on ? "var(--vers-black)" : "var(--border-strong)"),
        background: disabled ? "var(--vers-ink-100)" : on ? "var(--vers-black)" : "transparent",
        borderRadius: "var(--radius-none)", display: "grid", placeItems: "center",
        transition: "background var(--duration-fast) var(--ease-standard)"
      }}>
        {on && <span style={{ width: 9, height: 5, borderLeft: "2px solid var(--vers-lime)", borderBottom: "2px solid var(--vers-lime)", transform: "rotate(-45deg) translate(1px,-1px)" }} />}
      </span>
      {label && <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-s)", lineHeight: 1.4, color: disabled ? "var(--action-disabled-fg)" : "var(--text-primary)" }}>{label}</span>}
    </label>
  );
}
