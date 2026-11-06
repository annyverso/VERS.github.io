import * as React from "react";

/**
 * vers.com.br top bar. Logotipo left, uppercase Nebulica links, a single action.
 *
 * @startingPoint section="Navigation" subtitle="Site header on a blurred dark ground" viewport="700x120"
 */
export interface SiteHeaderNavItem { id: string; label: string; href?: string; }
export interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
  items?: SiteHeaderNavItem[];
  /** id of the current item. */
  active?: string;
  onNavigate?: (id: string) => void;
  /** Label of the single action, e.g. "Falar com a VERS". */
  cta?: string;
  ctaHref?: string;
  /** @default "dark" */
  tone?: "dark" | "light";
  /** @default "assets/graphics" */
  assetBase?: string;
  /** @default true */
  sticky?: boolean;
}
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
