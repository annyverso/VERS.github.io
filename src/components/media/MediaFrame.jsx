import React from "react";

/** Full-bleed photograph with a protection gradient and optional overlaid caption block. */
export function MediaFrame({
  src, alt = "", ratio = "16 / 9", protect = "bottom", overlay,
  caption, credit, tone = "dark", fit = "cover", position = "center",
  style, children, ...rest
}) {
  const gradients = {
    bottom: "var(--protect-bottom)",
    left: "var(--protect-left)",
    scrim: "linear-gradient(0deg, var(--overlay-scrim), var(--overlay-scrim))",
    indigo: "linear-gradient(0deg, var(--overlay-indigo), var(--overlay-indigo))",
    none: "none"
  };
  return (
    <figure style={{ margin: 0, display: "grid", gap: 10, ...style }} {...rest}>
      <div style={{ position: "relative", aspectRatio: ratio, overflow: "hidden", background: "var(--vers-ink-900)" }}>
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: fit, objectPosition: position, display: "block" }} />
        {protect !== "none" && <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: gradients[protect] || gradients.bottom }} />}
        {(overlay || children) && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "clamp(20px,4%,44px)", color: tone === "dark" ? "var(--vers-white)" : "var(--vers-black)" }}>
            {overlay}{children}
          </div>
        )}
      </div>
      {(caption || credit) && (
        <figcaption style={{ display: "flex", justifyContent: "space-between", gap: 16, fontFamily: "var(--font-ui)", fontSize: "var(--size-caption)", color: "var(--text-muted)" }}>
          <span>{caption}</span>{credit && <span style={{ letterSpacing: "var(--tracking-label)", textTransform: "uppercase", flex: "0 0 auto" }}>{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
