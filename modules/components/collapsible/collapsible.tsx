"use client";

import * as React from "react";

import { cnx } from "../../utils/cnx";
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

import classes from "./collapsible.module.css";

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
      className: cnx("group", !unstyled?.root && classes.collapse_root, className),
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
>(({ type = "button", onClick, children, withArrow = true, style, ...props }, ref) => {
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
    style: { ...stylesCollapsibleVars("trigger", { ...vars }), ...style },
    ...props,
  };
  return (
    <button {...rest}>
      {children}
      {withArrow && <ChevronDownSquareIcon data-collapse="arrow-trigger" />}
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
    className: cnx(!unstyled?.content && classes.collapse_content, className),
    style: { ...stylesCollapsibleVars("content", { ...vars }), ...style },
    ...props,
  };

  return <div {...rest} />;
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
