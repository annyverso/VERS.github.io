import React from "react";

/** A work / exhibition card: image, format tags, title, one line. Flat — no shadow, no rounding. */
export function WorkCard({ image, title, format, year, venue, summary, href, tags = [], tone = "light", style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid", gap: 16, textDecoration: "none", border: 0,
        background: tone === "dark" ? "transparent" : "transparent",
        color: "var(--text-primary)", ...style
      }}
      {...rest}
    >
      <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: "var(--vers-ink-200)" }}>
        {image && <img src={image} alt="" style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hover ? "scale(1.03)" : "scale(1)",
          transition: "transform var(--duration-slow) var(--ease-standard)"
        }} />}
        {(format || tags.length > 0) && (
          <div style={{ position: "absolute", left: 0, top: 0, display: "flex", gap: 2 }}>
            {format && <span style={{ background: "var(--vers-lime)", color: "var(--vers-black)", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, letterSpacing: "var(--tracking-label)", textTransform: "uppercase", padding: "6px 10px" }}>{format}</span>}
            {tags.map((t) => <span key={t} style={{ background: "var(--vers-black)", color: "var(--vers-white)", fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 500, letterSpacing: "var(--tracking-label)", textTransform: "uppercase", padding: "6px 10px" }}>{t}</span>)}
          </div>
        )}
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--size-eyebrow)", fontWeight: 500, letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-muted)" }}>
          {[venue, year].filter(Boolean).join(" · ")}
        </div>
        <div style={{
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--size-heading-m)",
          lineHeight: 1.08, letterSpacing: "-0.01em",
          textDecoration: hover && href ? "underline" : "none", textUnderlineOffset: 5, textDecorationThickness: 2
        }}>{title}</div>
        {summary && <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--size-body-s)", lineHeight: 1.5, color: "var(--text-secondary)", margin: 0, maxWidth: "42ch" }}>{summary}</p>}
      </div>
    </Tag>
  );
}
