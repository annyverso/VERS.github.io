import * as React from "react";

/** Single-line text input. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Orange border + error state. @default false */
  invalid?: boolean;
}
export declare function Input(props: InputProps): JSX.Element;
