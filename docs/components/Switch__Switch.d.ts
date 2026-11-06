import * as React from "react";

/** Binary toggle — square track, lime knob when on. */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
}
export declare function Switch(props: SwitchProps): JSX.Element;
