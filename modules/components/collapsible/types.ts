import * as React from "react";

import type { Mandatory, CSSProperties } from "../../types/shared";

type Info = "x" | "y" | "width" | "height" | "top" | "right" | "bottom" | "left" | "scrollX" | "scrollY";
export type ElementInfo = Record<Info, number>;

export interface IntrinsicUseCollapsible {
  defaultOpen?: boolean;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  clickOutsideToClose?: boolean;
}

export type DestructureCollapsibleType = {
  align?: CollapsibleAlignValuesType;
  side?: CollapsibleSideValuesType;
  sideOffset?: number;
  triggerInfo?: ElementInfo;
};

export type UseCollapsibleType = IntrinsicUseCollapsible & DestructureCollapsibleType;

export interface CollapsibleContextProps extends Mandatory<IntrinsicUseCollapsible>, DestructureCollapsibleType {
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  shouldRender: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  attr: (as: string) => {
    ["data-state"]: string;
    ["data-side"]: CollapsibleSideValuesType;
    ["data-align"]: CollapsibleAlignValuesType;
    ["data-collapse"]: string;
  };
}

export interface CollapsibleProviderProps extends IntrinsicUseCollapsible, DestructureCollapsibleType {
  children: React.ReactNode;
}

export type CollapsibleAlignValuesType = "center" | "start" | "end";
export type CollapsibleSideValuesType = "top" | "right" | "bottom" | "left";
export type CollapsibleTrees = "root" | "trigger" | "content";

export type CollapsibleStylesType = {
  unstyled?: Partial<Record<CollapsibleTrees, boolean>>;
  style?: CSSProperties;
  styles?: Partial<Record<CollapsibleTrees, CSSProperties>>;
  className?: string;
  classNames?: Partial<Record<CollapsibleTrees, string>>;
};

export type IntrinsicCollapsibleType = CollapsibleStylesType;

export type CollapsibleSharedType = IntrinsicCollapsibleType & Omit<React.HTMLAttributes<HTMLElement>, "style">;

export type CollapsibleRootType = {
  /** @default div */
  el?: React.ElementType;
  rel?: string;
  href?: string;
  htmlFor?: string;
  target?: string;
  type?: "button" | "submit" | "reset";
  dateTime?: string;
  // ref?: React.Ref<HTMLElement>;
} & CollapsibleSharedType;

export type CollapsibleTriggerType = {
  withArrow?: boolean;
} & IntrinsicCollapsibleType;

export type CollapsibleContentType = CollapsibleSharedType;

export interface CollapsibleProps
  extends UseCollapsibleType,
    CollapsibleStylesType,
    CollapsibleRootType,
    CollapsibleTriggerType,
    CollapsibleContentType {
  children?: React.ReactNode;
}
