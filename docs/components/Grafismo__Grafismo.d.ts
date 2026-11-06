import * as React from "react";

/**
 * A Grafismo used as texture, tinted via CSS mask. Absolutely positioned — put it inside a
 * `position: relative` parent with `overflow: hidden`. Grafismos run large, cropped and bleeding.
 *
 * @startingPoint section="Brand" subtitle="Grafismos as tinted full-bleed texture" viewport="700x210"
 */
export interface GrafismoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "olho" */
  form?: "logotipo" | "v" | "simbolo-v" | "olho" | "mural" | "ondas" | "glitch" | "glitch-grande" | "glitch-h" | "glitch-v";
  /** Any CSS colour — use a brand token. @default "var(--vers-lime)" */
  colour?: string;
  /** @default 1 */
  opacity?: number;
  /** Tile the form. Only `mural` and `ondas` are designed to tile. @default false */
  repeat?: boolean;
  /** CSS mask-size. @default "cover" */
  size?: string;
  /** CSS mask-position. @default "center" */
  position?: string;
  /** @default "assets/graphics" */
  assetBase?: string;
}

export declare function Grafismo(props: GrafismoProps): JSX.Element;
