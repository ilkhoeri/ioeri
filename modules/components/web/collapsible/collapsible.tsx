import * as React from "react";

import { useDialog } from "@/modules/hooks/use-dialog/use-dialog";
import type * as TYPE from "@/modules/hooks/use-dialog/use-dialog";

import { ChevronDownSquareIcon } from "@/modules/icons";
import { twMerge } from "tailwind-merge";

import "./collapsible.css";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
interface ProviderProps<T> extends TYPE.UseDialogType<T> {
  children: React.ReactNode;
}
type StylesType = {
  unstyled?: boolean;
  style?: CSSProperties;
  className?: string;
};

const CollapsibleContext = React.createContext<TYPE.DialogContextProps<HTMLElement> | undefined>(undefined);

export function useCollapsibleContext<T>(ref: React.ForwardedRef<T>) {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error("Collapsible component trees must be wrap within an Collapsible");
  }
  return { ...context, ref };
}

export function CollapsibleProvider<T extends HTMLElement>({ children, ref, ...props }: ProviderProps<T>) {
  const state = useDialog<T>({ ref, ...props });
  return <CollapsibleContext.Provider value={state}>{children}</CollapsibleContext.Provider>;
}

const Collapsible = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & TYPE.IntrinsicUseDialog & TYPE.DestructureUseDialog
>(({ side, align, sideOffset, open, setOpen, clickOutsideToClose, defaultOpen, ...props }, ref) => {
  const rest = { side, align, sideOffset, open, setOpen, clickOutsideToClose, defaultOpen };
  return (
    <CollapsibleProvider {...rest}>
      <CollapsibleRoot ref={ref} {...props} />
    </CollapsibleProvider>
  );
});
Collapsible.displayName = "Collapsible";

const CollapsibleRoot = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div"> & StylesType>(
  ({ className, unstyled, style, ...props }, ref) => {
    const { refs, attrData, styles } = useCollapsibleContext<HTMLDivElement>(ref);
    return (
      <div
        ref={refs.root as React.RefObject<HTMLDivElement>}
        {...attrData("root")}
        className={twMerge(
          !unstyled && "group relative flex h-auto border-0 select-none gap-[--offset]",
          "data-[side=top]:flex-col-reverse data-[side=right]:flex-row data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse",
          className,
        )}
        style={{ ...styles("root"), ...style }}
        {...props}
      />
    );
  },
);
CollapsibleRoot.displayName = "CollapsibleTrigger";

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & StylesType & { withArrow?: boolean }
>(({ type = "button", onClick, children, withArrow = true, className, style, unstyled, ...props }, ref) => {
  const { refs, open, setOpen, attrData, styles } = useCollapsibleContext<HTMLButtonElement>(ref);
  return (
    <button
      ref={refs.trigger as React.RefObject<HTMLButtonElement>}
      type={type}
      {...attrData("trigger")}
      className={twMerge(
        !unstyled &&
          "w-full flex flex-nowrap font-medium flex-row items-center justify-between text-sm select-none z-9 rounded-sm py-1",
        className,
      )}
      style={{ ...styles("trigger"), ...style }}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
        if (onClick) {
          onClick(e);
        }
      }}
      {...props}
    >
      {children}
      {withArrow && <ChevronDownSquareIcon data-origin="arrow-trigger" className="size-[22px]" />}
    </button>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & StylesType
>(({ className, unstyled, style, "aria-disabled": ariaDisabled, ...props }, ref) => {
  const { refs, render, attrData, open, styles } = useCollapsibleContext<HTMLDivElement>(ref);
  const rest = { "aria-disabled": ariaDisabled || (open ? "false" : "true"), ...props };

  if (!render) {
    return null;
  }
  return (
    <div
      ref={refs.content as React.RefObject<HTMLDivElement>}
      {...attrData("content")}
      className={twMerge(
        !unstyled &&
          "relative flex z-50 min-w-[8rem] overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:flex-col-reverse data-[side=right]:flex-row data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse",
        className,
      )}
      style={{ ...styles("content"), ...style }}
      {...rest}
    />
  );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleRoot, CollapsibleTrigger, CollapsibleContent };
