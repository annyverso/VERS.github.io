import * as React from "react";

/**
 * Photograph with a protection gradient. Type never sits on an unprotected image in this system.
 *
 * @startingPoint section="Media" subtitle="Full-bleed photo with protection gradient and caption" viewport="700x400"
 */
export interface MediaFrameProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  alt?: string;
  /** CSS aspect-ratio. @default "16 / 9" */
  ratio?: string;
  /** @default "bottom" */
  protect?: "bottom" | "left" | "scrim" | "indigo" | "none";
  /** Content laid over the bottom of the image. */
  overlay?: React.ReactNode;
  caption?: string;
  /** Photographer credit, uppercase. */
  credit?: string;
  /** Colour of overlaid text. @default "dark" (i.e. dark image → white text) */
  tone?: "dark" | "light";
  /** @default "cover" */
  fit?: "cover" | "contain";
  /** CSS object-position. @default "center" */
  position?: string;
}
export declare function MediaFrame(props: MediaFrameProps): JSX.Element;
