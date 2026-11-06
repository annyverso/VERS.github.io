import React from "react";

const SIZES = { sm: 34, md: 44, lg: 56 };

/** Square icon-only action. Same skins as Button, always at least 44px on touch surfaces. */
export function IconButton({ variant = "ghost", size = "md", label, disabled = false, onClick, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const dim = SIZES[size] || SIZES.md;

  const skins = {
    primary: { background: hover ? "var(--action-primary-bg-hover)" : "var(--action-primary-bg)", color: "var(--action-primary-fg)", border: "2px solid transparent" },
    accent: { background: hover ? "var(--action-accent-bg-hover)" : "var(--action-accent-bg)", color: "var(--action-accent-fg)", border: "2px solid transparent" },
    outline: { background: hover ? "var(--text-primary)" : "transparent", color: hover ? "var(--surface-page)" : "var(--text-primary)", border: "2px solid var(--border-strong)" },
    ghost: { background: hover ? "var(--vers-ink-100)" : "transparent", color: "var(--text-primary)", border: "2px solid transparent" }
  };

  const skin = disabled
    ? { background: "var(--action-disabled-bg)", color: "var(--action-disabled-fg)", border: "2px solid transparent" }
    : skins[variant] || skins.ghost;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: dim, height: dim,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        padding: 0,
        borderRadius: "var(--radius-none)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
        ...skin, ...style
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
