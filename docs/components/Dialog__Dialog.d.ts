import * as React from "react";

/** Modal dialog. Closes on Escape and on scrim click. */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  eyebrow?: string;
  footer?: React.ReactNode;
  /** Max width in px. @default 620 */
  width?: number;
  children?: React.ReactNode;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
