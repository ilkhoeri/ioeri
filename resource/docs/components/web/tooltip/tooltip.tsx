import * as React from "react";

import { useOpenState, type UseOpenStateType } from "@/resource/docs/hooks/use-open-state/use-open-state";
import { cvx, InferTypes } from "@/modules/utility/cvx/cvx";
import { twMerge } from "tailwind-merge";

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
const TooltipContext = React.createContext<DialogContextProps<HTMLElement> | undefined>(undefined);

export function useTooltipContext<T>(ref: React.ForwardedRef<T>) {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip component trees must be wrap within an <Tooltip>");
  }
  return { ...context, ref };
}

function Tooltip<T extends HTMLElement>({ children, ref, ...props }: ProviderProps<T>) {
  const state = useOpenState<T>({ ref, trigger: "hover", ...props });
  return <TooltipContext.Provider value={state}>{children}</TooltipContext.Provider>;
}

const TooltipTrigger = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div"> & StylesType>(
  ({ role = "button", className, unstyled, style, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const { refs, styleAt, onMouseEnter: onME, onMouseLeave: onML } = useTooltipContext<HTMLDivElement>(ref);
    const rest = {
      role,
      ...styleAt("trigger", { style }),
      className: twMerge(!unstyled && "flex font-medium text-sm select-none z-9 rounded-sm py-1", className),
      ...props,
    };
    return (
      <div
        ref={refs.trigger as React.RefObject<HTMLDivElement>}
        onMouseEnter={(e) => {
          onME();
          if (onMouseEnter) onMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          onML();
          if (onMouseLeave) onMouseLeave(e);
        }}
        {...rest}
      />
    );
  },
);
TooltipTrigger.displayName = "TooltipTrigger";

const classes = cvx({
  assign:
    "fixed min-w-max z-[999] text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=open]:fade-out data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-75",
  variants: {
    align: {
      center:
        "data-[side=top]:data-[align=center]:left-[calc(var(--trigger-r)-calc(calc(var(--trigger-w)*0.5)+calc(var(--content-w)*0.5)))] data-[side=bottom]:data-[align=center]:left-[calc(var(--trigger-r)-calc(calc(var(--trigger-w)*0.5)+calc(var(--content-w)*0.5)))] data-[side=right]:data-[align=center]:top-[calc(var(--trigger-b)-calc(calc(var(--trigger-h)*0.5)+calc(var(--content-h)*0.5)))] data-[side=left]:data-[align=center]:top-[calc(var(--trigger-b)-calc(calc(var(--trigger-h)*0.5)+calc(var(--content-h)*0.5)))]",
      start: "",
      end: "",
    },
    side: {
      top: "data-[side=top]:slide-in-from-bottom-2 data-[side=top]:data-[state=closed]:slide-out-to-bottom-4 data-[side=top]:top-[calc(calc(var(--trigger-b)-calc(var(--trigger-h)+var(--content-h)))-var(--offset))] ",
      right:
        "data-[side=right]:slide-in-from-left-2 data-[side=right]:data-[state=closed]:slide-out-to-left-4 data-[side=right]:left-[calc(var(--trigger-x)+calc(var(--trigger-w)+var(--offset)))] ",
      bottom:
        "data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:data-[state=closed]:slide-out-to-top-4 data-[side=bottom]:top-[calc(var(--trigger-b)+var(--offset))] ",
      left: "data-[side=left]:slide-in-from-right-2 data-[side=left]:data-[state=closed]:slide-out-to-right-4 data-[side=left]:left-[calc(calc(var(--trigger-x)-var(--content-w))-var(--offset))] ",
    },
  },
});

const TooltipContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div"> & StylesType>(
  ({ style, className, unstyled, "aria-disabled": ariaDisabled, ...props }, ref) => {
    const { refs, render, open, align, side, styleAt, Portal } = useTooltipContext<HTMLDivElement>(ref);
    const rest = { "aria-disabled": ariaDisabled || (open ? "false" : "true"), ...props };

    if (!render) return null;
    return (
      <Portal container={document.body}>
        <div
          ref={refs.content as React.RefObject<HTMLDivElement>}
          {...styleAt("content", { style })}
          className={twMerge(!unstyled && classes({ align, side }), className)}
          {...rest}
        />
      </Portal>
    );
  },
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent };
