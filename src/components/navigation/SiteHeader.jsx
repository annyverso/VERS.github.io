import React from "react";
import { Logo } from "../brand/Logo.jsx";
import { Button } from "../core/Button.jsx";

/** Top bar for vers.com.br — logotipo left, uppercase Nebulica links, one action. */
export function SiteHeader({
  items = [], active, onNavigate, cta, ctaHref = "#contato",
  tone = "dark", assetBase = "assets/graphics", sticky = true, style, ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const dark = tone === "dark";
  const fg = dark ? "var(--vers-white)" : "var(--vers-black)";

  return (
    <header
      style={{
        position: sticky ? "sticky" : "relative", top: 0, zIndex: 40,
        background: dark ? "rgba(25,25,25,.86)" : "rgba(255,255,255,.90)",
        backdropFilter: "var(--blur-veil)", WebkitBackdropFilter: "var(--blur-veil)",
        borderBottom: "1px solid " + (dark ? "rgba(255,255,255,.14)" : "var(--border-subtle)"),
        ...style
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, padding: "0 var(--gutter-page)", height: 78, maxWidth: "var(--container-full)", margin: "0 auto" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", border: 0, textDecoration: "none" }}>
          <Logo colour={dark ? "white" : "black"} height={22} assetBase={assetBase} />
        </a>

        <nav style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {items.map((it) => {
            const on = active === it.id;
            return (
              <a key={it.id} href={it.href || "#"}
                onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(it.id); } setOpen(false); }}
                style={{
                  fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500,
                  letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase",
                  color: on ? (dark ? "var(--vers-lime)" : "var(--vers-indigo)") : fg,
                  textDecoration: "none", border: 0,
                  borderBottom: "2px solid " + (on ? "currentColor" : "transparent"),
                  paddingBottom: 3, transition: "color var(--duration-fast) var(--ease-standard)"
                }}>{it.label}</a>
            );
          })}
          {cta && <Button variant={dark ? "accent" : "primary"} size="sm" href={ctaHref}>{cta}</Button>}
        </nav>
      </div>
    </header>
  );
}
