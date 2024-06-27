import type { DispatchType } from "../../../types/dispatch";
import type { CSSProperties, NestedRecord } from "../../../types/shared";

type Trees = "wrap" | "inner";
type U = ["el", React.ElementType] | ["styles", CSSProperties] | ["classNames", string];

export interface RunningSharedType extends NestedRecord<U, Trees>, DispatchType {}

export type RunningType = {
  /** @default ``` "left-to-right" ``` */
  direction?: "right-to-left" | "left-to-right" | "top-to-bottom" | "bottom-to-top";
  /** @default ``` 25 ``` */
  speed?: number;
} & RunningSharedType &
  Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "style"> & {
    style?: CSSProperties;
  };
