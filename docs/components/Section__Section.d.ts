import * as React from "react";

/**
 * A full-bleed page section on one dominant ground. Dark and indigo grounds automatically
 * apply the matching theme scope, so nested components invert correctly.
 *
 * @startingPoint section="Layout" subtitle="Full-bleed section with eyebrow, display title and lede" viewport="700x320"
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** @default "paper" */
  ground?: "paper" | "subtle" | "black" | "graphite" | "indigo" | "lime" | "orange" | "sky" | "lilac";
  eyebrow?: string;
  title?: string;
  lede?: string;
  /** @default "left" */
  align?: "left" | "center";
  /** Max content width. @default "var(--container-full)" */
  width?: string;
  /** Vertical padding. @default "var(--gutter-section)" */
  pad?: string;
  children?: React.ReactNode;
}
export declare function Section(props: SectionProps): JSX.Element;
