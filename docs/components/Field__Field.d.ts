import * as React from "react";

/** Label + control + help/error wrapper. */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  help?: string;
  /** Replaces `help` and turns the message orange. */
  error?: string;
  /** @default false */
  required?: boolean;
  children?: React.ReactNode;
}
export declare function Field(props: FieldProps): JSX.Element;
