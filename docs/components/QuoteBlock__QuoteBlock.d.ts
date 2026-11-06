import * as React from "react";

/** Rule-led pull-quote set in Elgraine. */
export interface QuoteBlockProps extends React.HTMLAttributes<HTMLQuoteElement> {
  attribution?: string;
  role?: string;
  /** Colour of the 4px leading rule. @default "var(--vers-lime)" */
  accent?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}
export declare function QuoteBlock(props: QuoteBlockProps): JSX.Element;
