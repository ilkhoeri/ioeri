"use client";

import * as React from "react";
import { cnx } from "../../utils/cnx";
import { stylesCollapsibleVars, useCollapsible } from "./utils";
import { ChevronDownSquareIcon } from "../../icons";

import type {
  ComponentType,
  HTMLAttributes,
  CollapsibleContentType,
  CollapsibleRootType,
  CollapsibleTriggerType,
  HTMLButtonAttributes,
  CollapsibleContextProps,
  CollapsibleProviderProps,
  DestructureCollapsibleType,
} from "./types";

import classes from "./collapsible.module.css";

const CollapsibleContext = React.createContext<CollapsibleContextProps | undefined>(undefined);

export const useCollapsibleContext = () => {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error("Collapsible component must be wrap within an CollapsibleProvider");
  }
  return context;
};

export const CollapsibleProvider: React.FC<CollapsibleProviderProps> = ({ children, ...rest }) => {
  const state = useCollapsible({ ...rest });
  return <CollapsibleContext.Provider value={state}>{children}</CollapsibleContext.Provider>;
};

const Collapsible = React.forwardRef<HTMLElement, HTMLAttributes & CollapsibleRootType & DestructureCollapsibleType>(
  ({ side, align, sideOffset, open, setOpen, ...props }, ref) => {
    return (
      <CollapsibleProvider sideOffset={sideOffset} align={align} side={side} open={open} setOpen={setOpen}>
        <CollapsibleRoot ref={ref} {...props} />
      </CollapsibleProvider>
    );
  },
);
Collapsible.displayName = "Collapsible";

const CollapsibleRoot = React.forwardRef<HTMLElement, HTMLAttributes & CollapsibleRootType>(
  ({ className, el = "div", unstyled, ...props }, ref) => {
    let Root: ComponentType = el as ComponentType;
    const { attr } = useCollapsibleContext();
    const rest = {
      ref,
      ...attr("root"),
      className: cnx("group", !unstyled?.root && classes.collapse_root, className),
      ...props,
    };
    return <Root {...rest} />;
  },
);
CollapsibleRoot.displayName = "CollapsibleTrigger";

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  HTMLButtonAttributes & CollapsibleTriggerType & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style">
>(({ trigger, type = "button", onClick, children, withArrow = true, ...props }, ref) => {
  const { open, setOpen, attr } = useCollapsibleContext();

  const rest = {
    ref,
    type,
    ...attr("trigger"),
    "data-trigger": trigger,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setOpen(!open);
      if (onClick) {
        onClick(e);
      }
    },
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
>(({ className, unstyled, style, ...props }, ref) => {
  const { shouldRender, attr, side, align, sideOffset } = useCollapsibleContext();

  if (!shouldRender) {
    return null;
  }

  const rest = {
    ref,
    ...attr("content"),
    className: cnx(!unstyled?.content && classes.collapse_content, className),
    style: { ...stylesCollapsibleVars("content", { align, side, sideOffset }), ...style },
    ...props,
  };

  return <div {...rest} />;
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
