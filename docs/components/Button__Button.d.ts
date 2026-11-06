import * as React from "react";

/**
 * VERS action button. Square-cornered, uppercase Nebulica, no shadow, no scale on press.
 * Primary is black (indigo on hover); accent is lime; outline and ghost are quieter.
 *
 * @startingPoint section="Core" subtitle="Square-cornered uppercase action in four skins" viewport="700x160"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual skin. @default "primary" */
  variant?: "primary" | "accent" | "outline" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Stretch to the container width. @default false */
  full?: boolean;
  /** @default false */
  disabled?: boolean;
  /** Render as another element when no href is given. @default "button" */
  as?: keyof JSX.IntrinsicElements;
  /** Renders an <a> when set. */
  href?: string;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
