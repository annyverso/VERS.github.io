import * as React from "react";

/** Square icon-only action. `label` is required — it becomes the accessible name and the tooltip. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Accessible name. Required. */
  label: string;
  disabled?: boolean;
  /** The glyph — a Lucide `<i data-lucide>` or an inline SVG at 20–24px, stroke-width 2. */
  children?: React.ReactNode;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
