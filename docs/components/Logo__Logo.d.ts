import * as React from "react";

/**
 * The VERS logotipo. Never re-letter, stretch, outline, rotate or recolour outside the seven supplied colourways.
 * Clear space around the mark is the height of the V, on all four sides.
 *
 * @startingPoint section="Brand" subtitle="Logotipo and Símbolo V in all seven colourways" viewport="700x200"
 */
export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "black" */
  colour?: "white" | "black" | "lime" | "orange" | "sky" | "lilac" | "indigo";
  /** Full wordmark or the isolated V. @default "wordmark" */
  mark?: "wordmark" | "symbol";
  /** Rendered height of the mark in px. @default 32 */
  height?: number;
  /** Institutional descriptor locked up beneath the mark, e.g. "Produtora de cultura imersiva". */
  descriptor?: string;
  /** Path to the graphics folder, relative to the page. @default "assets/graphics" */
  assetBase?: string;
}

export declare function Logo(props: LogoProps): JSX.Element;
