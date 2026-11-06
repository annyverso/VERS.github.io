import * as React from "react";

/** Square checkbox with a lime tick on black. */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
