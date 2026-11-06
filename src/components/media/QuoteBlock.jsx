import React from "react";

/** Pull-quote in Elgraine, rule-led. The brand's editorial voice. */
export function QuoteBlock({ children, attribution, role, accent = "var(--vers-lime)", size = "md", style, ...rest }) {
  const sizes = { sm: 22, md: 30, lg: 42 };
  return (
    <blockquote style={{ margin: 0, paddingLeft: 26, borderLeft: "var(--border-heavy) solid " + accent, display: "grid", gap: 18, ...style }} {...rest}>
      <p style={{ fontFamily: "var(--font-body)", fontSize: sizes[size] || sizes.md, lineHeight: 1.32, color: "var(--text-primary)", margin: 0, maxWidth: "var(--measure-lede)", textWrap: "pretty" }}>
        {children}
      </p>
      {(attribution || role) && (
        <footer style={{ fontFamily: "var(--font-ui)", fontSize: "var(--size-caption)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>
          {attribution}{role && <span style={{ opacity: 0.7 }}> · {role}</span>}
        </footer>
      )}
    </blockquote>
  );
}
