import React from "react";

/** Multi-line input for briefs and messages. */
export function Textarea({ invalid = false, disabled = false, rows = 5, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea
      rows={rows}
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
        minHeight: undefined, resize: "vertical",
        background: disabled ? "var(--vers-ink-100)" : "var(--surface-page)",
        ...style
      }}
      {...rest}
    />
  );
}
