"use client";
import * as React from "react";

import { useOpenState, type UseOpenStateType } from "@/resource/docs/hooks/use-open-state/use-open-state";
import { cvx, InferTypes } from "@/modules/utility/cvx/cvx";
import { ArrowDropdownIcon } from "@/modules/icons";
import { twMerge } from "tailwind-merge";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
interface ProviderProps<T> extends UseOpenStateType<T> {
  children: React.ReactNode;
  withArrow?: boolean;
}
type SharedType = {
  unstyled?: boolean;
  style?: CSSProperties;
  className?: string;
};
export type DialogContextProps<T> = UseOpenStateType<T> & InferTypes<typeof useOpenState> & { withArrow?: boolean };
const TooltipContext = React.createContext<DialogContextProps<HTMLElement> | undefined>(undefined);

export function useTooltipContext<T>(ref: React.ForwardedRef<T>) {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip component trees must be wrap within an <Tooltip>");
  }
  return { ...context, ref };
}

function Tooltip<T extends HTMLElement>({ children, ref, withArrow, sideOffset, ...props }: ProviderProps<T>) {
  const state = useOpenState<T>({
    ref,
    trigger: "hover",
    sideOffset: withArrow ? Number(sideOffset) + 9 : sideOffset,
    ...props,
  });
  return <TooltipContext.Provider value={{ withArrow, ...state }}>{children}</TooltipContext.Provider>;
}

const TooltipTrigger = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div"> & SharedType>(
  ({ role = "button", className, unstyled, style, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const tooltip = useTooltipContext<HTMLDivElement>(ref);
    const rest = {
      role,
      ...tooltip.styleAt("trigger", { style }),
      className: twMerge(!unstyled && "flex font-medium text-sm select-none z-9 rounded-sm py-1", className),
      ...props,
    };
    return (
      <div
        ref={tooltip.refs.trigger as React.RefObject<HTMLDivElement>}
        onMouseEnter={(e) => {
          tooltip.onMouseEnter();
          if (onMouseEnter) onMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          tooltip.onMouseLeave();
          if (onMouseLeave) onMouseLeave(e);
        }}
        {...rest}
      />
    );
  },
);
TooltipTrigger.displayName = "TooltipTrigger";

const content = cvx({
  assign:
    "group fixed min-w-max z-[999] text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=open]:fade-out data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-75",
  variants: {
    align: {
      center:
        "data-[side=top]:data-[align=center]:left-[calc(var(--trigger-r)-calc(calc(var(--trigger-w)*0.5)+calc(var(--content-w)*0.5)))] data-[side=bottom]:data-[align=center]:left-[calc(var(--trigger-r)-calc(calc(var(--trigger-w)*0.5)+calc(var(--content-w)*0.5)))] data-[side=right]:data-[align=center]:top-[calc(var(--trigger-b)-calc(calc(var(--trigger-h)*0.5)+calc(var(--content-h)*0.5)))] data-[side=left]:data-[align=center]:top-[calc(var(--trigger-b)-calc(calc(var(--trigger-h)*0.5)+calc(var(--content-h)*0.5)))]",
      start:
        "data-[side=top]:data-[align=start]:left-[calc(var(--trigger-r)-var(--trigger-w))] data-[side=bottom]:data-[align=start]:left-[calc(var(--trigger-r)-var(--trigger-w))] data-[side=right]:data-[align=start]:top-[calc(var(--trigger-b)-var(--trigger-h))] data-[side=left]:data-[align=start]:top-[calc(var(--trigger-b)-var(--trigger-h))]",
      end: "data-[side=top]:data-[align=end]:left-[calc(var(--trigger-r)-var(--content-w))] data-[side=bottom]:data-[align=end]:left-[calc(var(--trigger-r)-var(--content-w))] data-[side=right]:data-[align=end]:top-[calc(var(--trigger-b)-var(--content-h))] data-[side=left]:data-[align=end]:top-[calc(var(--trigger-b)-var(--content-h))]",
    },
    side: {
      top: "data-[side=top]:slide-in-from-bottom-2 data-[side=top]:data-[state=closed]:slide-out-to-bottom-4 data-[side=top]:top-[calc(calc(var(--trigger-b)-calc(var(--trigger-h)+var(--content-h)))-var(--offset))]",
      right:
        "data-[side=right]:slide-in-from-left-2 data-[side=right]:data-[state=closed]:slide-out-to-left-4 data-[side=right]:left-[calc(var(--trigger-x)+calc(var(--trigger-w)+var(--offset)))]",
      bottom:
        "data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:data-[state=closed]:slide-out-to-top-4 data-[side=bottom]:top-[calc(var(--trigger-b)+var(--offset))] ",
      left: "data-[side=left]:slide-in-from-right-2 data-[side=left]:data-[state=closed]:slide-out-to-right-4 data-[side=left]:left-[calc(calc(var(--trigger-x)-var(--content-w))-var(--offset))]",
    },
  },
});
const arrow = cvx({
  assign: "w-[23px] h-[9px] absolute text-background [&_[data-arrow=border]]:text-border",
  variants: {
    align: {
      center:
        "group-data-[side=top]:inset-x-auto group-data-[side=bottom]:inset-x-auto group-data-[side=right]:inset-y-auto group-data-[side=left]:inset-y-auto  ",
      start:
        "group-data-[side=top]:left-2 group-data-[side=bottom]:left-2 group-data-[side=right]:top-4 group-data-[side=left]:top-4",
      end: "group-data-[side=top]:right-2 group-data-[side=bottom]:right-2 group-data-[side=right]:bottom-4 group-data-[side=left]:bottom-4",
    },
    side: {
      top: "rotate-0 top-[calc(var(--content-h)-2px)]",
      right: "rotate-90 right-[calc(var(--content-w)-9px)]",
      bottom: "rotate-180 bottom-[calc(var(--content-h)-2px)]",
      left: "-rotate-90 left-[calc(var(--content-w)-9px)]",
    },
  },
});

const TooltipContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div"> & SharedType>(
  (
    { style, className, children, unstyled, "aria-disabled": ariaDisabled, onMouseEnter, onMouseLeave, ...props },
    ref,
  ) => {
    const tooltip = useTooltipContext<HTMLDivElement>(ref);
    const { withArrow, align, side } = tooltip;
    const rest = { "aria-disabled": ariaDisabled || (tooltip.open ? "false" : "true"), ...props };

    if (!tooltip.render) return null;
    return (
      <tooltip.Portal container={document.body}>
        <div
          ref={tooltip.refs.content as React.RefObject<HTMLDivElement>}
          {...tooltip.styleAt("content", { style })}
          className={twMerge(!unstyled && content({ align, side }), className)}
          onMouseEnter={(e) => {
            tooltip.onMouseEnter();
            if (onMouseEnter) onMouseEnter(e);
          }}
          onMouseLeave={(e) => {
            tooltip.onMouseLeave();
            if (onMouseLeave) onMouseLeave(e);
          }}
          {...rest}
        >
          {children}
          {withArrow && <ArrowDropdownIcon className={arrow({ align, side })} />}
        </div>
      </tooltip.Portal>
    );
  },
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent };