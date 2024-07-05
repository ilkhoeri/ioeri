import * as React from "react";

import { useOpenState, type UseOpenStateType } from "@/resource/docs/hooks/use-open-state/use-open-state";
import { InferTypes } from "@/modules/utility/cvx/cvx";
import { twMerge } from "tailwind-merge";

import "./collapsible.css";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
interface ProviderProps<T> extends UseOpenStateType<T> {
  children: React.ReactNode;
}
type StylesType = {
  unstyled?: boolean;
  style?: CSSProperties;
  className?: string;
};
export type DialogContextProps<T> = UseOpenStateType<T> & InferTypes<typeof useOpenState>;
const CollapsibleContext = React.createContext<DialogContextProps<HTMLElement> | undefined>(undefined);

export function useCollapsibleContext<T>(ref: React.ForwardedRef<T>) {
  const context = React.useContext(CollapsibleContext);
  if (!context) {
    throw new Error("Collapsible component trees must be wrap within an Collapsible");
  }
  return { ...context, ref };
}

export function CollapsibleProvider<T extends HTMLElement>({ children, ref, ...props }: ProviderProps<T>) {
  const state = useOpenState<T>({ ref, ...props });
  return <CollapsibleContext.Provider value={state}>{children}</CollapsibleContext.Provider>;
}

const Collapsible = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & UseOpenStateType<HTMLDivElement>
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
    const { refs, styleAt } = useCollapsibleContext<HTMLDivElement>(ref);
    return (
      <div
        ref={refs.root as React.RefObject<HTMLDivElement>}
        {...styleAt("root", { style })}
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
CollapsibleRoot.displayName = "CollapsibleTrigger";

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & StylesType
>(({ type = "button", onClick, className, unstyled, style, ...props }, ref) => {
  const { refs, open, setOpen, styleAt } = useCollapsibleContext<HTMLButtonElement>(ref);
  return (
    <button
      ref={refs.trigger as React.RefObject<HTMLButtonElement>}
      type={type}
      {...styleAt("trigger", { style })}
      className={twMerge(
        !unstyled &&
          "w-full flex flex-nowrap font-medium flex-row items-center justify-between text-sm select-none z-9 rounded-sm py-1",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
        if (onClick) {
          onClick(e);
        }
      }}
      {...props}
    />
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & StylesType
>(({ style, className, unstyled, "aria-disabled": ariaDisabled, ...props }, ref) => {
  const { refs, render, open, styleAt } = useCollapsibleContext<HTMLDivElement>(ref);
  const rest = { "aria-disabled": ariaDisabled || (open ? "false" : "true"), ...props };

  if (!render) {
    return null;
  }
  return (
    <div
      ref={refs.content as React.RefObject<HTMLDivElement>}
      {...styleAt("content", { style })}
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
