import * as React from "react";

/** Hover/focus label for icon-only controls. */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  /** @default "top" */
  placement?: "top" | "bottom" | "left" | "right";
  children?: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
