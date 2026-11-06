import React from "react";
import { IconButton } from "../core/IconButton.jsx";

/** Modal. The one place in the system where a shadow is allowed. */
export function Dialog({ open, onClose, title, eyebrow, footer, width = 620, children, style, ...rest }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape" && onClose) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="presentation" onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 100, background: "var(--overlay-scrim-strong)", display: "grid", placeItems: "center", padding: 24 }}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: width, maxHeight: "86vh", overflow: "auto",
          background: "var(--surface-page)", color: "var(--text-primary)",
          boxShadow: "var(--shadow-overlay)", borderRadius: "var(--radius-none)",
          padding: "var(--space-6)", display: "grid", gap: "var(--space-5)", ...style
        }} {...rest}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-start" }}>
          <div style={{ display: "grid", gap: 8 }}>
            {eyebrow && <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--size-eyebrow)", fontWeight: 500, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)" }}>{eyebrow}</div>}
            {title && <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--size-heading-l)", lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0 }}>{title}</h2>}
          </div>
          <IconButton label="Fechar" onClick={onClose}>
            <span aria-hidden="true" style={{ position: "relative", width: 16, height: 16, display: "block" }}>
              <span style={{ position: "absolute", top: 7, left: 0, width: 16, height: 2, background: "currentColor", transform: "rotate(45deg)" }} />
              <span style={{ position: "absolute", top: 7, left: 0, width: 16, height: 2, background: "currentColor", transform: "rotate(-45deg)" }} />
            </span>
          </IconButton>
        </div>
        <div>{children}</div>
        {footer && <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>{footer}</div>}
      </div>
    </div>
  );
}
