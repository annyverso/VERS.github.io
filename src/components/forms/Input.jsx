import React from "react";

/** Single-line text input. Square-ish (2px radius), hairline border, indigo on focus. */
export function Input({ invalid = false, disabled = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <input
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
        background: disabled ? "var(--vers-ink-100)" : "var(--surface-page)",
        color: disabled ? "var(--action-disabled-fg)" : "var(--text-primary)",
        ...style
      }}
      {...rest}
    />
  );
}
