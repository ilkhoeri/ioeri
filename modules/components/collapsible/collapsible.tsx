"use client";

import * as React from "react";

import { twMerge } from "tailwind-merge";
import { stylesCollapsibleVars, useCollapsible } from "./utils";
import { ChevronDownSquareIcon } from "../../icons";
import { mergeRefs } from "@/modules/hooks";

import type {
  CollapsibleContentType,
  CollapsibleRootType,
  CollapsibleTriggerType,
  CollapsibleContextProps,
  CollapsibleProviderProps,
  DestructureCollapsibleType,
  IntrinsicUseCollapsible,
} from "./types";

type HTMLAttributes = React.HTMLAttributes<HTMLElement>;
type HTMLButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ComponentType = React.ComponentType<HTMLAttributes>;

import "./collapsible.css";

const CollapsibleContext = React.createContext<CollapsibleContextProps | undefined>(undefined);

export const useCollapsibleContext = () => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error("Collapsible component trees must be wrap within an Collapsible");
  }
  return context;
};

export const CollapsibleProvider: React.FC<CollapsibleProviderProps> = ({ children, ...props }) => {
  const value = useCollapsible({ ...props });
  return <CollapsibleContext.Provider value={value}>{children}</CollapsibleContext.Provider>;
};

const Collapsible = React.forwardRef<
  HTMLElement,
  HTMLAttributes & CollapsibleRootType & IntrinsicUseCollapsible & DestructureCollapsibleType
>(({ side, align, sideOffset, open, setOpen, clickOutsideToClose, defaultOpen, ...props }, ref) => {
  const rest = { side, align, sideOffset, open, setOpen, clickOutsideToClose, defaultOpen };
  return (
    <CollapsibleProvider {...rest}>
      <CollapsibleRoot ref={ref} {...props} />
    </CollapsibleProvider>
  );
});
Collapsible.displayName = "Collapsible";

const CollapsibleRoot = React.forwardRef<HTMLElement, HTMLAttributes & CollapsibleRootType>(
  ({ el = "div", unstyled, className, style, ...props }, ref) => {
    let Root: ComponentType = el as ComponentType;
    const { attr, ...vars } = useCollapsibleContext();
    const rest = {
      ref,
      ...attr("root"),
      className: twMerge(
        "group",
        !unstyled?.root && "relative flex h-auto border-0 select-none gap-[--offset]",
        "data-[side=top]:flex-col-reverse data-[side=right]:flex-row data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse",
        className,
      ),
      style: { ...stylesCollapsibleVars("root", { ...vars }), ...style },
      ...props,
    };
    return <Root {...rest} />;
  },
);
CollapsibleRoot.displayName = "CollapsibleTrigger";

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  HTMLButtonAttributes & CollapsibleTriggerType & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style">
>(({ type = "button", onClick, children, withArrow = true, className, style, ...props }, ref) => {
  const { open, setOpen, attr, triggerRef, ...vars } = useCollapsibleContext();

  const rest = {
    ref: mergeRefs(triggerRef, ref),
    type,
    ...attr("trigger"),
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setOpen(!open);
      if (onClick) {
        onClick(e);
      }
    },
    className: twMerge(
      "w-full flex flex-nowrap font-medium flex-row items-center justify-between text-sm select-none z-9 rounded-sm py-1",
      className,
    ),
    style: { ...stylesCollapsibleVars("trigger", { ...vars }), ...style },
    ...props,
  };
  return (
    <button {...rest}>
      {children}
      {withArrow && <ChevronDownSquareIcon data-collapse="arrow-trigger" className="size-[22px]" />}
    </button>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CollapsibleContentType
>(({ className, unstyled, style, "aria-disabled": ariaDisabled, ...props }, ref) => {
  const { shouldRender, attr, open, ...vars } = useCollapsibleContext();

  if (!shouldRender) {
    return null;
  }

  const rest = {
    ref,
    "aria-disabled": ariaDisabled || (open ? "false" : "true"),
    ...attr("content"),
    className: twMerge(
      !unstyled?.content &&
        "relative flex z-50 min-w-[8rem] overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:flex-col-reverse data-[side=right]:flex-row data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse",
      className,
    ),
    style: { ...stylesCollapsibleVars("content", { ...vars }), ...style },
    ...props,
  };

  return <div {...rest} />;
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
