import React from "react";

/** Hover/focus label. Square black block, Nebulica, no arrow. */
export function Tooltip({ label, placement = "top", children, style, ...rest }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
  }[placement];

  return (
    <span style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)} {...rest}>
      {children}
      {show && (
        <span role="tooltip" style={{
          position: "absolute", zIndex: 60, whiteSpace: "nowrap", pointerEvents: "none",
          background: "var(--vers-black)", color: "var(--vers-white)",
          fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500,
          letterSpacing: "var(--tracking-label)", textTransform: "uppercase",
          padding: "6px 10px", ...pos
        }}>{label}</span>
      )}
    </span>
  );
}
