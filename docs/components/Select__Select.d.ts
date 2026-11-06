import * as React from "react";

/** Native select in the VERS control skin. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
  /** Convenience — strings or {value,label} pairs. Ignored when children are provided. */
  options?: Array<string | { value: string; label: string }>;
}
export declare function Select(props: SelectProps): JSX.Element;
