import * as React from "react";

/** Transient confirmation — black block, 4px accent bar. */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "neutral" */
  tone?: "neutral" | "success" | "alert";
  title?: string;
  message?: string;
  onDismiss?: () => void;
}
export declare function Toast(props: ToastProps): JSX.Element;
