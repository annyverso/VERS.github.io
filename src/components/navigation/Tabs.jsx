import React from "react";

/** Rule-anchored tabs. Uppercase Nebulica; the active tab carries a 2px rule in the accent colour. */
export function Tabs({ items = [], value, defaultValue, onChange, tone = "light", style, ...rest }) {
  const [inner, setInner] = React.useState(defaultValue ?? (items[0] && items[0].id));
  const active = value !== undefined ? value : inner;
  const pick = (id) => { if (value === undefined) setInner(id); onChange && onChange(id); };
  const dark = tone === "dark";

  return (
    <div role="tablist" style={{ display: "flex", gap: 0, borderBottom: "1px solid " + (dark ? "rgba(255,255,255,.18)" : "var(--border-subtle)"), ...style }} {...rest}>
      {items.map((it) => {
        const on = active === it.id;
        return (
          <button key={it.id} role="tab" aria-selected={on} onClick={() => pick(it.id)}
            style={{
              appearance: "none", background: "transparent", cursor: "pointer",
              padding: "12px 20px 11px", marginBottom: -1,
              border: 0, borderBottom: "2px solid " + (on ? (dark ? "var(--vers-lime)" : "var(--vers-black)") : "transparent"),
              fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500,
              letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase",
              color: on ? (dark ? "var(--vers-white)" : "var(--vers-black)") : (dark ? "rgba(255,255,255,.55)" : "var(--text-muted)"),
              transition: "color var(--duration-fast) var(--ease-standard)"
            }}>{it.label}</button>
        );
      })}
    </div>
  );
}
