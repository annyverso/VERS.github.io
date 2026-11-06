import React from "react";

/** Native select with the VERS control skin and a drawn chevron. */
export function Select({ invalid = false, disabled = false, options = [], children, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        disabled={disabled}
        onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
        style={{
          ...{
        width: "100%", boxSizing: "border-box",
        padding: "13px 14px", minHeight: 46,
        fontFamily: "var(--font-body)", fontSize: "var(--size-body-s)", lineHeight: 1.4,
        color: "var(--text-primary)", background: "var(--surface-page)",
        border: "1px solid " + (invalid ? "var(--vers-orange)" : focus ? "var(--vers-indigo)" : "var(--border-default)"),
        borderRadius: "var(--radius-xs)",
        outline: "none",
        transition: "border-color var(--duration-fast) var(--ease-standard)"
      },
          appearance: "none", WebkitAppearance: "none",
          paddingRight: 40, cursor: disabled ? "not-allowed" : "pointer",
          background: disabled ? "var(--vers-ink-100)" : "var(--surface-page)",
          ...style
        }}
        {...rest}
      >
        {children || options.map((o) =>
          typeof o === "string"
            ? <option key={o} value={o}>{o}</option>
            : <option key={o.value} value={o.value}>{o.label}</option>
        )}
      </select>
      <span aria-hidden="true" style={{
        position: "absolute", right: 15, top: "50%", width: 9, height: 9,
        borderRight: "2px solid var(--text-secondary)", borderBottom: "2px solid var(--text-secondary)",
        transform: "translateY(-70%) rotate(45deg)", pointerEvents: "none"
      }} />
    </div>
  );
}
