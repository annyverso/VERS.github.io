import * as React from "react";

/** A single figure with an uppercase label. Numbers are evidence — use real ones. */
export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: string;
  /** Small trailing unit, e.g. "mil", "%", "+". */
  suffix?: string;
  /** @default "primary" */
  tone?: "primary" | "accent" | "lime" | "orange";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

export declare function Stat(props: StatProps): JSX.Element;
