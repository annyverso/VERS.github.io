import React from "react";

const SIZES = {
  sm: { padding: "8px 16px", fontSize: 12, minHeight: 34, tracking: "0.08em" },
  md: { padding: "12px 24px", fontSize: 13, minHeight: 44, tracking: "0.08em" },
  lg: { padding: "17px 34px", fontSize: 15, minHeight: 56, tracking: "0.06em" }
};

/** VERS action. Square-cornered, uppercase Nebulica, no shadow, no scale on press. */
export function Button({
  variant = "primary",
  size = "md",
  full = false,
  disabled = false,
  as = "button",
  href,
  iconAfter,
  iconBefore,
  onClick,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = SIZES[size] || SIZES.md;

  const skins = {
    primary: {
      background: hover ? "var(--action-primary-bg-hover)" : "var(--action-primary-bg)",
      color: "var(--action-primary-fg)",
      border: "2px solid transparent"
    },
    accent: {
      background: hover ? "var(--action-accent-bg-hover)" : "var(--action-accent-bg)",
      color: "var(--action-accent-fg)",
      border: "2px solid transparent"
    },
    outline: {
      background: hover ? "var(--text-primary)" : "transparent",
      color: hover ? "var(--surface-page)" : "var(--text-primary)",
      border: "2px solid var(--border-strong)"
    },
    ghost: {
      background: hover ? "var(--vers-ink-100)" : "transparent",
      color: "var(--text-primary)",
      border: "2px solid transparent"
    }
  };

  const skin = disabled
    ? { background: "var(--action-disabled-bg)", color: "var(--action-disabled-fg)", border: "2px solid transparent" }
    : skins[variant] || skins.primary;

  const Tag = href ? "a" : as;

  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      aria-disabled={disabled || undefined}
      disabled={Tag === "button" ? disabled : undefined}
      style={{
        display: full ? "flex" : "inline-flex",
        width: full ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: s.padding,
        minHeight: s.minHeight,
        fontFamily: "var(--font-ui)",
        fontSize: s.fontSize,
        fontWeight: 500,
        letterSpacing: s.tracking,
        textTransform: "uppercase",
        textDecoration: "none",
        borderRadius: "var(--radius-none)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
        filter: active && !disabled ? "brightness(0.9)" : "none",
        boxSizing: "border-box",
        ...skin,
        ...style
      }}
      {...rest}
    >
      {iconBefore}
      <span>{children}</span>
      {iconAfter}
    </Tag>
  );
}
