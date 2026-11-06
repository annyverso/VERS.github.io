import * as React from "react";

/** Site footer. The tagline signs off here; the descriptor sits under the mark. */
export interface SiteFooterColumn { title: string; links: Array<{ label: string; href?: string }>; }
export interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: SiteFooterColumn[];
  /** @default "Produtora e distribuidora de cultura imersiva" */
  descriptor?: string;
  /** @default "Onde a cultura ganha presença" */
  tagline?: string;
  legal?: string;
  assetBase?: string;
}
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
