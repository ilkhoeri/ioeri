import * as React from "react";

import type { DetailedHTMLType, ElementProps, _DispatchType } from "../../../types/shared";
import type { RecordElements, RecordClasses, RecordStyles } from "../../../utils/record-types";

type RunningTrees = "wrap" | "inner";
type ElementRunning = RecordElements<RunningTrees>;
type ClassesRunning = RecordClasses<RunningTrees>;
type StylesRunning = RecordStyles<RunningTrees>;

export interface RunningSharedType extends ElementRunning, ClassesRunning, StylesRunning, _DispatchType {}

export type RunningType = {
  /** @default ``` "left-to-right" ``` */
  direction?: "right-to-left" | "left-to-right" | "top-to-bottom" | "bottom-to-top";
  /** @default ``` 25 ``` */
  speed?: number;
} & DetailedHTMLType &
  RunningSharedType;
