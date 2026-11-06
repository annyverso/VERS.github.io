import * as React from "react";

/** Horizontal or vertical rule — the system's primary structural device. */
export interface RuleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "hairline" */
  weight?: "hairline" | "rule" | "heavy";
  /** @default "subtle" */
  tone?: "subtle" | "default" | "strong" | "lime" | "indigo";
  /** @default false */
  vertical?: boolean;
}

export declare function Rule(props: RuleProps): JSX.Element;
