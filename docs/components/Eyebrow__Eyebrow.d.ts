import * as React from "react";

/** Section eyebrow / kicker. Nebulica uppercase, 0.18em tracking. */
export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Prefix with a 32×2px rule. @default false */
  rule?: boolean;
  /** @default "muted" */
  tone?: "muted" | "primary" | "accent" | "lime";
  children?: React.ReactNode;
}

export declare function Eyebrow(props: EyebrowProps): JSX.Element;
