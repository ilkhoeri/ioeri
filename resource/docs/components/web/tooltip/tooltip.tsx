"use client";
import * as React from "react";

import { useOpenState, type UseOpenStateType } from "@/modules/hooks";
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
  const ctx = React.useContext(TooltipContext);
  if (!ctx) {
    throw new Error("Tooltip component trees must be wrap within an <Tooltip>");
  }
  return { ...ctx, ref };
}

function TooltipProvider<T extends HTMLElement>({ children, ref, withArrow, sideOffset, ...props }: ProviderProps<T>) {
  const state = useOpenState<T>({
    ref,
    trigger: "hover",
    sideOffset: withArrow ? Number(sideOffset) + 9 : sideOffset,
    ...props,
  });
  return <TooltipContext.Provider value={{ withArrow, ...state }}>{children}</TooltipContext.Provider>;
}

const PrimitiveSlot = React.forwardRef(
  <T extends React.ElementType>(
    { children, ...props }: { children: React.ReactElement } & Omit<React.ComponentProps<T>, "ref">,
    ref: React.Ref<any>,
  ) => {
    const child = React.Children.only(children);

    return React.cloneElement(child, {
      ref,
      ...props,
      style: { ...props.style, ...child.props.style },
      className: twMerge(child.props.className, props.className),
    });
  },
);
PrimitiveSlot.displayName = "PrimitiveSlot";

type TooltipTriggerType = React.ComponentPropsWithoutRef<"button"> & SharedType & { asChild?: boolean };
const TooltipTrigger = React.forwardRef<React.ElementRef<"button">, TooltipTriggerType>(
  ({ type = "button", role = "button", asChild, className, unstyled, style, ...props }, ref) => {
    const ctx = useTooltipContext<HTMLButtonElement>(ref);
    const Component = asChild ? PrimitiveSlot : ("button" as React.ElementType);
    const rest = {
      ref: ctx.refs.trigger as React.RefObject<HTMLButtonElement>,
      role,
      type,
      ...ctx.styleAt("trigger", { style }),
      className,
      ...props,
    };
    return <Component {...rest} />;
  },
);
TooltipTrigger.displayName = "TooltipTrigger";

const content = cvx({
  assign:
    "group absolute min-w-max z-20 text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-75 data-[side=top]:top-[calc(var(--top)-var(--offset))] data-[side=bottom]:top-[calc(var(--top)+var(--offset))]",
  variants: {
    align: {
      center: "data-[side=top]:data-[align=center]:[]",
      start: "data-[side=top]:data-[align=start]:[]",
      end: "data-[side=top]:data-[align=end]:[]",
    },
    side: {
      top: "data-[side=top]:slide-in-from-bottom-2 data-[side=top]:data-[state=closed]:slide-out-to-bottom-4 left-[--left]",
      right:
        "data-[side=right]:slide-in-from-left-2 data-[side=right]:data-[state=closed]:slide-out-to-left-4 top-[--top] left-[calc(var(--left)+var(--offset))]",
      bottom:
        "data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:data-[state=closed]:slide-out-to-top-4 left-[--left]",
      left: "data-[side=left]:slide-in-from-right-2 data-[side=left]:data-[state=closed]:slide-out-to-right-4 top-[--top] left-[calc(var(--left)-var(--offset))]",
    },
  },
});
const arrow = cvx({
  assign:
    "w-[23px] h-[9px] absolute text-background [&_[data-arrow=border]]:text-border data-[align=center]:data-[side=top]:inset-x-auto data-[align=center]:data-[side=bottom]:inset-x-auto data-[align=center]:data-[side=right]:inset-y-auto data-[align=center]:data-[side=left]:inset-y-auto data-[align=start]:data-[side=top]:left-2 data-[align=start]:data-[side=bottom]:left-2 data-[align=start]:data-[side=right]:top-4 data-[align=start]:data-[side=left]:top-4 data-[align=end]:data-[side=top]:right-2 data-[align=end]:data-[side=bottom]:right-2 data-[align=end]:data-[side=right]:bottom-4 data-[align=end]:data-[side=left]:bottom-4 data-[side=top]:rotate-0 data-[side=top]:top-[calc(var(--content-h)-2px)] data-[side=right]:rotate-90 data-[side=right]:right-[calc(var(--content-w)-9px)] data-[side=bottom]:rotate-180 data-[side=bottom]:bottom-[calc(var(--content-h)-2px)] data-[side=left]:-rotate-90 data-[side=left]:left-[calc(var(--content-w)-9px)]",
  variants: {},
});

type TooltipContentType = React.ComponentPropsWithoutRef<"div"> & SharedType;
const TooltipContent = React.forwardRef<React.ElementRef<"div">, TooltipContentType>(
  ({ style, className, children, unstyled, "aria-disabled": ariaDisabled, role = "tooltip", ...props }, ref) => {
    const ctx = useTooltipContext<HTMLDivElement>(ref);
    const { withArrow, align, side } = ctx;
    const rest = { "aria-disabled": ariaDisabled || (ctx.open ? "false" : "true"), role, ...props };

    return (
      <ctx.Portal render={ctx.render}>
        <div
          ref={ctx.refs.content as React.RefObject<HTMLDivElement>}
          {...ctx.styleAt("content", { style })}
          className={twMerge(!unstyled && content({ align, side }), className)}
          {...rest}
        >
          {children}
          {withArrow && <ArrowDropdownIcon data-side={side} data-align={align} className={arrow()} />}
        </div>
      </ctx.Portal>
    );
  },
);
TooltipContent.displayName = "TooltipContent";

type TooltipType = Omit<TooltipTriggerType, "content"> & {
  withArrow?: boolean;
  content?: React.ReactNode;
  contentProps?: Omit<TooltipContentType, "children">;
};
const Tooltip = React.forwardRef<HTMLButtonElement, TooltipType & UseOpenStateType<HTMLButtonElement>>(
  (
    { side, align, sideOffset, open, onOpenChange, clickOutsideToClose, withArrow, contentProps, content, ...props },
    ref,
  ) => {
    const rest = { side, align, sideOffset, open, onOpenChange, clickOutsideToClose, withArrow };
    return (
      <TooltipProvider {...rest}>
        <TooltipTrigger ref={ref} {...props} />
        <TooltipContent {...contentProps}>{content}</TooltipContent>
      </TooltipProvider>
    );
  },
);
Tooltip.displayName = "Tooltip";

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent };
