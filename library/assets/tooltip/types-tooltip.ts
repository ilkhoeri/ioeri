import * as React from "react";

export type HTMLAttributes = React.HTMLAttributes<HTMLElement>;
export type ComponentType = React.ComponentType<HTMLAttributes>;

export type TooltipTriggerValuesType = "hover" | "click";
export type TooltipAlignValuesType = "center" | "start" | "end";
export type TooltipSideValuesType = "top" | "right" | "bottom" | "left";
export type StylesTooltipVarsType = "content" | "arrow";
export type TooltipTrees = "root" | "trigger" | "content" | "arrow";
export type TooltipUnstyledType = {
  unstyled?: Partial<Record<TooltipTrees, boolean>>;
};

export type UseTooltipType = {
  trigger?: TooltipTriggerValuesType;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TooltipStyledType = {
  style?: CSSProperties;
  styles?: Partial<Record<TooltipTrees, CSSProperties>>;
  className?: string;
  classNames?: Partial<Record<TooltipTrees, string>>;
} & TooltipUnstyledType;

export type TooltipSharedType = {
  align?: TooltipAlignValuesType;
  side?: TooltipSideValuesType;
  withArrow?: boolean;
  sideOffset?: number;
} & TooltipStyledType;

export type TooltipRootType = {
  /** @default div */
  el?: React.ElementType;
  rel?: string;
  href?: string;
  target?: string;
  type?: "button" | "submit" | "reset";
  ref?: React.Ref<HTMLElement>;
} & TooltipSharedType &
  Omit<React.DetailedHTMLProps<HTMLAttributes, HTMLElement>, "style">;

export type TooltipTriggerType = {
  asChild?: boolean;
  trigger?: TooltipTriggerValuesType;
} & TooltipSharedType;

export type TooltipContentType = {
  open?: boolean;
} & TooltipSharedType;

export interface TooltipProps
  extends UseTooltipType,
    TooltipStyledType,
    TooltipRootType,
    TooltipTriggerType,
    TooltipContentType {
  children: React.ReactNode;
  tooltip?: React.ReactNode;
}

export interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
