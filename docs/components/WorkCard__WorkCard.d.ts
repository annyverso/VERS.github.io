import * as React from "react";

/**
 * A work or exhibition in a grid. Flat: no shadow, no rounding, no border — the photograph is the card.
 *
 * @startingPoint section="Media" subtitle="Work / exhibition card for a catalogue grid" viewport="700x430"
 */
export interface WorkCardProps extends React.HTMLAttributes<HTMLElement> {
  image?: string;
  title: string;
  /** Format label shown as a lime stamp: "Exposição XR", "Free-roaming", "Instalação imersiva". */
  format?: string;
  year?: string | number;
  venue?: string;
  summary?: string;
  href?: string;
  /** Extra black stamps beside the format. */
  tags?: string[];
  tone?: "light" | "dark";
}
export declare function WorkCard(props: WorkCardProps): JSX.Element;
