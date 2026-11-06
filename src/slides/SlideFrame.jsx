import React from "react";

// Brandbook 10-2026 (pp. 45, 50 to 52): ink and logotipo keep at least 4.5:1 and 3:1 on their ground.
// accent is for large type (24px+, or 18.66px bold) and rules; accentText for small type (eyebrows, labels).
const GROUNDS = {
  black: { background: "#191919", cls: "vers-dark", ink: "#FFFFFF", accent: "#D3DE28", accentText: "#D3DE28", logo: "lime", line: "#D3DE28" },
  indigo: { background: "#4B59A7", cls: "vers-indigo", ink: "#FFFFFF", accent: "#D3DE28", accentText: "#FFFFFF", logo: "lime", line: "#D3DE28" },
  // "indigo-deep" kept as a name only: decks use the palette indigo (p. 50), so it renders as "indigo".
  "indigo-deep": { background: "#4B59A7", cls: "vers-indigo", ink: "#FFFFFF", accent: "#D3DE28", accentText: "#FFFFFF", logo: "lime", line: "#D3DE28" },
  lime: { background: "#D3DE28", cls: "", ink: "#191919", accent: "#4B59A7", accentText: "#191919", logo: "indigo", line: "#4B59A7" },
  lilac: { background: "#D0B7D8", cls: "", ink: "#191919", accent: "#4B59A7", accentText: "#191919", logo: "black", line: "#191919" },
  orange: { background: "#F15E2B", cls: "", ink: "#191919", accent: "#FFFFFF", accentText: "#191919", logo: "black", line: "#191919" },
  sky: { background: "#B0E0E9", cls: "", ink: "#191919", accent: "#4B59A7", accentText: "#191919", logo: "indigo", line: "#4B59A7" },
  paper: { background: "#FFFFFF", cls: "", ink: "#191919", accent: "#4B59A7", accentText: "#4B59A7", logo: "black", line: "#4B59A7" }
};

export function groundOf(name) { return GROUNDS[name] || GROUNDS.black; }

/**
 * The chrome every VERS slide carries: hairline rules in the accent colour and the
 * 158×43 logotipo pinned to the bottom margin. Measured off the VERS portfolio deck.
 */
export function SlideChrome({ ground = "black", frame = "rules", mark = "right", arrow = false, assetBase = "assets/graphics" }) {
  const g = groundOf(ground);
  const line = g.line || (g.logo === "indigo" ? "#4B59A7" : "#D3DE28");
  return (
    <>
      {frame !== "none" && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {frame === "box" && <div style={{ position: "absolute", inset: 28, border: "1px solid " + line, opacity: 0.55 }} />}
          {frame === "rules" && <>
            <div style={{ position: "absolute", left: 32, right: 32, top: 32, height: 1, background: line, opacity: 0.5 }} />
            <div style={{ position: "absolute", left: 32, right: 32, bottom: 32, height: 1, background: line, opacity: 0.5 }} />
            <div style={{ position: "absolute", left: "33.33%", bottom: 22, width: 1, height: 20, background: line, opacity: 0.5 }} />
            <div style={{ position: "absolute", left: "66.66%", bottom: 22, width: 1, height: 20, background: line, opacity: 0.5 }} />
          </>}
        </div>
      )}
      {arrow && (
        <svg aria-hidden="true" viewBox="0 0 67 33" style={{ position: "absolute", right: 40, top: "50%", width: 67, height: 33, transform: "translateY(-50%)" }}>
          <path d="M0 14h48V3l19 13.5L48 30V19H0z" fill={line} />
        </svg>
      )}
      {mark !== "none" && (
        <img src={assetBase + "/logotipo-" + g.logo + ".png"} alt="VERS"
          style={{ position: "absolute", bottom: 52, width: 158, height: "auto", ...(mark === "right" ? { right: 33 } : { left: 33 }) }} />
      )}
    </>
  );
}

/** 1280×720 slide frame. Scales to fit its container so a card preview and a full deck share one layout. */
export function SlideFrame({ ground = "black", fit = true, children, style, ...rest }) {
  const g = groundOf(ground);
  const frame = (
    <div className={g.cls} style={{
      width: 1280, height: 720, position: "relative", overflow: "hidden",
      background: g.background, color: g.ink,
      fontFamily: "var(--font-body)", flex: "0 0 auto", ...style
    }} {...rest}>{children}</div>
  );
  if (!fit) return frame;
  return (
    <div style={{ width: "100%", aspectRatio: "16 / 9", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1280, height: 720, transform: "scale(var(--slide-scale, 1))", transformOrigin: "0 0" }} ref={(el) => {
        if (!el) return;
        const parent = el.parentElement;
        const apply = () => { el.style.setProperty("--slide-scale", (parent.clientWidth / 1280).toString()); };
        apply();
        if (!el.__ro) { el.__ro = new ResizeObserver(apply); el.__ro.observe(parent); }
      }}>{frame}</div>
    </div>
  );
}

/** A lime/indigo angled wedge — the deck's corner motif. */
export function Wedge({ corner = "top-left", colour = "#D3DE28", size = 260, opacity = 1 }) {
  const clip = {
    "top-left": "polygon(0 0, 100% 0, 0 100%)",
    "top-right": "polygon(0 0, 100% 0, 100% 100%)",
    "bottom-left": "polygon(0 0, 0 100%, 100% 100%)",
    "bottom-right": "polygon(100% 0, 100% 100%, 0 100%)"
  }[corner];
  const pos = {
    "top-left": { left: 0, top: 0 }, "top-right": { right: 0, top: 0 },
    "bottom-left": { left: 0, bottom: 0 }, "bottom-right": { right: 0, bottom: 0 }
  }[corner];
  return <div aria-hidden="true" style={{ position: "absolute", width: size, height: size, background: colour, clipPath: clip, opacity, ...pos }} />;
}

/** A filled copy panel — the deck sets body copy inside tinted boxes, not loose on the ground. */
export function Panel({ tone = "lime", children, style, ...rest }) {
  const TONES = {
    lime: { background: "#D3DE28", color: "#191919" },
    indigo: { background: "#4B59A7", color: "#FFFFFF" },
    black: { background: "#191919", color: "#FFFFFF" },
    lilac: { background: "#D0B7D8", color: "#191919" },
    paper: { background: "#FFFFFF", color: "#191919" },
    outline: { background: "transparent", color: "inherit", boxShadow: "inset 0 0 0 1px currentColor" }
  };
  return (
    <div style={{ padding: "18px 20px", fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.45, ...(TONES[tone] || TONES.lime), ...style }} {...rest}>
      {children}
    </div>
  );
}
