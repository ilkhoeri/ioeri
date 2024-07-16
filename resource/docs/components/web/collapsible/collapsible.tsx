"use client";
import * as React from "react";

import { useOpenState, type ClickStateOptions } from "@/modules/hooks";
import { InferTypes } from "@/modules/utility";
import { twMerge } from "tailwind-merge";

import "./collapsible.css";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
interface ProviderProps extends ClickStateOptions {
  children: React.ReactNode;
}
type SharedType = {
  unstyled?: boolean;
  style?: CSSProperties;
  className?: string;
};
export type DialogContextProps = ClickStateOptions & InferTypes<typeof useOpenState>;
const CollapsibleContext = React.createContext<DialogContextProps | undefined>(undefined);

export function useCollapsibleContext() {
  const ctx = React.useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error("Collapsible component trees must be wrap within an <CollapsibleProvider>");
  }
  return ctx;
}

export function CollapsibleProvider({ children, ...props }: ProviderProps) {
  const state = useOpenState({ ...props });
  return <CollapsibleContext.Provider value={state}>{children}</CollapsibleContext.Provider>;
}

const Collapsible = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div"> & ClickStateOptions>(
  ({ side, align, sideOffset, open, onOpenChange, clickOutsideToClose, defaultOpen, ...props }, ref) => {
    const rest = { side, align, sideOffset, open, onOpenChange, clickOutsideToClose, defaultOpen };
    return (
      <CollapsibleProvider {...rest}>
        <CollapsibleRoot ref={ref} {...props} />
      </CollapsibleProvider>
    );
  },
);
Collapsible.displayName = "Collapsible";

const CollapsibleRoot = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div"> & SharedType>(
  ({ className, unstyled, style, ...props }, ref) => {
    const ctx = useCollapsibleContext();
    return (
      <div
        ref={ctx.refs.root as React.RefObject<HTMLDivElement>}
        {...ctx.styleAt("root", { style })}
        className={twMerge(
          !unstyled && "group relative flex h-auto border-0 select-none gap-[--offset]",
          "data-[side=top]:flex-col-reverse data-[side=right]:flex-row data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse data-[align=start]:items-start data-[align=center]:items-center data-[align=end]:items-end",
          className,
        )}
        {...props}
      />
    );
  },
);
CollapsibleRoot.displayName = "CollapsibleRoot";

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & SharedType
>(({ type = "button", className, unstyled, style, ...props }, ref) => {
  const ctx = useCollapsibleContext();
  return (
    <button
      ref={ctx.refs.trigger as React.RefObject<HTMLButtonElement>}
      type={type}
      {...ctx.styleAt("trigger", { style })}
      className={twMerge(
        !unstyled &&
          "w-full flex flex-nowrap font-medium flex-row items-center justify-between text-sm select-none z-9 rounded-sm py-1",
        className,
      )}
      {...props}
    />
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & SharedType
>(({ style, className, unstyled, "aria-disabled": ariaDisabled, ...props }, ref) => {
  const ctx = useCollapsibleContext();
  const rest = { "aria-disabled": ariaDisabled || (ctx.open ? "false" : "true"), ...props };

  if (!ctx.render) return null;
  return (
    <div
      ref={ctx.refs.content as React.RefObject<HTMLDivElement>}
      {...ctx.styleAt("content", { style })}
      className={twMerge(
        !unstyled &&
          "relative flex flex-col z-50 min-w-[8rem] overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2",
        className,
      )}
      {...rest}
    />
  );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
