import * as React from "react";

/** Rule-anchored tabs. Controlled via `value`/`onChange` or uncontrolled via `defaultValue`. */
export interface TabItem { id: string; label: string; }
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items?: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** @default "light" */
  tone?: "light" | "dark";
}
export declare function Tabs(props: TabsProps): JSX.Element;
