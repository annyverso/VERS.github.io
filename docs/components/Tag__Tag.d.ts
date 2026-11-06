import * as React from "react";

/** Small classification chip — formato, território, ano, frente de atuação. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: "neutral" | "indigo" | "lime" | "orange" | "sky" | "lilac" | "outline";
  /** Rounded ends. Square is the system default. @default false */
  pill?: boolean;
  children?: React.ReactNode;
}

export declare function Tag(props: TagProps): JSX.Element;
