import * as React from "react";
import { CSSProperties } from "../../utils/record-types";

export type HTMLAttributes = React.HTMLAttributes<HTMLElement>;
export type HTMLButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;
export type ComponentType = React.ComponentType<HTMLAttributes>;

export type UseCollapsibleType = {
  trigger?: CollapsibleTriggerValuesType;
  open?: boolean;
  setOpen?: (value: boolean) => void;
} & DestructureCollapsibleType;

export interface CollapsibleContextProps extends DestructureCollapsibleType {
  refClickOutside: React.MutableRefObject<any>;
  open: boolean;
  setOpen: (value: boolean) => void;
  shouldRender: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: () => void;
  attr: (as: string) => {
    ["data-state"]: string;
    ["data-side"]: CollapsibleSideValuesType;
    ["data-align"]: CollapsibleAlignValuesType;
    ["data-collapse"]: string;
  };
}

export interface UseCollapsibleProps {
  open?: boolean;
  setOpen?: (value: boolean) => void;
}

export interface CollapsibleProviderProps extends UseCollapsibleProps, DestructureCollapsibleType {
  children: React.ReactNode;
}

export type CollapsibleTriggerValuesType = "hover" | "click";
export type CollapsibleAlignValuesType = "center" | "start" | "end";
export type CollapsibleSideValuesType = "top" | "right" | "bottom" | "left";
export type StylesCollapsibleVarsType = "content";
export type CollapsibleTrees = "root" | "trigger" | "content";

export type CollapsibleStylesType = {
  unstyled?: Partial<Record<CollapsibleTrees, boolean>>;
  style?: CSSProperties;
  styles?: Partial<Record<CollapsibleTrees, CSSProperties>>;
  className?: string;
  classNames?: Partial<Record<CollapsibleTrees, string>>;
};

export type DestructureCollapsibleType = UseCollapsibleProps & {
  align?: CollapsibleAlignValuesType;
  side?: CollapsibleSideValuesType;
  sideOffset?: number;
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
  trigger?: CollapsibleTriggerValuesType;
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
