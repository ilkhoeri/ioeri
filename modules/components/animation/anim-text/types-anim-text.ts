import type { DetailedHTMLType, DispatchType, ElementProps, _DispatchType } from "../../../types/shared";
import type { RecordElements, RecordClasses, RecordStyles } from "../../../utils/record-types";

// export type AnimTextSharedType = Omit<DispatchType, "children">;

export type AnimTextTypingType = {
  /**
   *```js
   * // sample
   * placeholders={['one', 'two', 'three', 'four', 'five']}
   *```
   */
  placeholders: string[];
  duration?: {
    /** @default ``` 1000 ``` */
    after?: number;
    /** @default ``` 200 ``` */
    max?: number;
    /** @default ``` 200 ``` */
    min?: number;
  };
} & ElementProps &
  Omit<DetailedHTMLType, "children"> &
  _DispatchType;

type TextRunningTrees = "wrap" | "inner";
type ElementTextRunning = RecordElements<TextRunningTrees>;
type ClassesTextRunning = RecordClasses<TextRunningTrees>;
type StylesTextRunning = RecordStyles<TextRunningTrees>;
export type AnimTextRunningType = {
  /**
   *```js
   * // sample
   * placeholders={['One Two Three Four Five',]}
   * // *ReactNode
   *```
   */
  placeholders?: string | string[];
  /** @default ``` "left-to-right" ``` */
  direction?: "right-to-left" | "left-to-right" | "top-to-bottom" | "bottom-to-top";
  /** @default ``` 25 ``` */
  speed?: number;
} & ElementTextRunning &
  ClassesTextRunning &
  StylesTextRunning &
  DetailedHTMLType &
  _DispatchType;

type TextSpiralTrees = "root" | "wrap" | "inner";
type ElementTextSpiral = RecordElements<TextSpiralTrees>;
type ClassesTextSpiral = RecordClasses<TextSpiralTrees>;
type StylesTextSpiral = RecordStyles<TextSpiralTrees>;
export type AnimTextSpiralType = {
  placeholders?: string | string[];
  /** @default ``` "" ``` */
  direction?: "";
  /** @default ``` 4000 ``` */
  duration?: number;
} & ElementTextSpiral &
  ClassesTextSpiral &
  StylesTextSpiral &
  Omit<DetailedHTMLType, "children"> &
  _DispatchType;

export type AnimTextAllTypes =
  | (AnimTextTypingType & { anim: "typing" })
  | (AnimTextRunningType & { anim: "running" })
  | (AnimTextSpiralType & { anim: "spiral" });
