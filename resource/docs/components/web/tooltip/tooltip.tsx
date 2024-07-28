"use client";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { ArrowDropdownIcon } from "@/modules/icons";
import { cvx, InferTypes } from "@/modules/utility/cvx/cvx";
import { mergeRefs, useOpenState, createSafeContext, type HoverOpenOptions } from "@/modules/hooks";

type SharedType = { unstyled?: boolean; style?: React.CSSProperties & { [key: string]: any }; className?: string };
type TooltipContextValue = HoverOpenOptions &
  InferTypes<typeof useOpenState> & { withArrow?: boolean; touch?: boolean };
type TooltipTriggerType = React.ComponentPropsWithoutRef<"button"> & SharedType & { asChild?: boolean };
type TooltipContentType = React.ComponentPropsWithoutRef<"div"> & SharedType;

const [Provider, useTooltipContext] = createSafeContext<TooltipContextValue>(
  "Tooltip component trees must be wrap within an <Tooltip>",
);

const TooltipProvider = (
  props: HoverOpenOptions & { children: React.ReactNode; withArrow?: boolean; touch?: boolean },
) => {
  const { withArrow, sideOffset, touch, ...rest } = props;
  const ctx = useOpenState<HTMLElement>({
    trigger: "hover",
    sideOffset: withArrow ? Number(sideOffset) + 9 : sideOffset,
    observe: { touch, align: true, side: true, sideswipe: true, offset: true, contentRect: true },
    ...rest,
  });
  return <Provider value={{ withArrow, sideOffset, touch, ...rest, ...ctx }}>{props.children}</Provider>;
};

const TooltipTrigger = React.forwardRef<React.ElementRef<"button">, TooltipTriggerType>(
  ({ type = "button", asChild, unstyled, style, children, ...props }, ref) => {
    const ctx = useTooltipContext();
    const rest = { ref: mergeRefs(ctx.refs.trigger, ref), type, ...props };
    const child = React.Children.only(children as React.ReactElement);

    return asChild ? (
      React.cloneElement(child, {
        ...rest,
        ...ctx.styleAt("trigger", { style: { ...style, ...child.props.style } }),
        className: twMerge(child.props.className, props.className),
      })
    ) : (
      <button {...ctx.styleAt("trigger", { style })} {...rest}>
        {children}
      </button>
    );
  },
);
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<React.ElementRef<"div">, TooltipContentType>(
  ({ style, className, children, unstyled, "aria-disabled": ariaDisabled, role = "tooltip", ...props }, ref) => {
    const { withArrow, align, side, ...ctx } = useTooltipContext();
    const rest = { "aria-disabled": ariaDisabled || (ctx.open ? "false" : "true"), role, ...props };

    return (
      <ctx.Portal render={ctx.render}>
        <div
          ref={mergeRefs(ctx.refs.content, ref)}
          {...{ className: twMerge(!unstyled && classes({ side }), className), ...ctx.styleAt("content", { style }) }}
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

type TooltipType = Omit<TooltipTriggerType, "content"> &
  HoverOpenOptions & {
    touch?: boolean;
    withArrow?: boolean;
    content?: React.ReactNode;
    contentProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & SharedType;
  };
const Tooltip = React.forwardRef<React.ElementRef<"button">, TooltipType>((_props, ref) => {
  const { content, contentProps, open, onOpenChange, sideOffset, withArrow, touch, align, side, delay, ...props } =
    _props;

  return (
    <TooltipProvider {...{ open, onOpenChange, sideOffset, withArrow, touch, align, side, delay }}>
      <TooltipTrigger ref={ref} {...props} />
      {content && <TooltipContent {...contentProps}>{content}</TooltipContent>}
    </TooltipProvider>
  );
});
Tooltip.displayName = "Tooltip";

const classes = cvx({
  assign:
    "group absolute min-w-max z-20 text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max transition-opacity [transition-duration:200ms] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-95 top-[--top] left-[--left]",
  variants: {
    side: {
      top: "data-[side=top]:slide-in-from-bottom-0 data-[side=top]:data-[state=closed]:slide-out-to-bottom-0",
      right: "data-[side=right]:slide-in-from-left-0 data-[side=right]:data-[state=closed]:slide-out-to-left-0",
      bottom: "data-[side=bottom]:slide-in-from-top-0 data-[side=bottom]:data-[state=closed]:slide-out-to-top-0",
      left: "data-[side=left]:slide-in-from-right-0 data-[side=left]:data-[state=closed]:slide-out-to-right-0",
    },
  },
});
const arrow = cvx({
  assign:
    "w-[23px] h-[9px] absolute text-background [&_[data-arrow=border]]:text-border data-[align=center]:data-[side=top]:inset-x-auto data-[align=center]:data-[side=bottom]:inset-x-auto data-[align=center]:data-[side=right]:inset-y-auto data-[align=center]:data-[side=left]:inset-y-auto data-[align=start]:data-[side=top]:left-2 data-[align=start]:data-[side=bottom]:left-2 data-[align=start]:data-[side=right]:top-4 data-[align=start]:data-[side=left]:top-4 data-[align=end]:data-[side=top]:right-2 data-[align=end]:data-[side=bottom]:right-2 data-[align=end]:data-[side=right]:bottom-4 data-[align=end]:data-[side=left]:bottom-4 data-[side=top]:rotate-0 data-[side=top]:top-[calc(var(--content-h)-2px)] data-[side=right]:rotate-90 data-[side=right]:right-[calc(var(--content-w)-9px)] data-[side=bottom]:rotate-180 data-[side=bottom]:bottom-[calc(var(--content-h)-2px)] data-[side=left]:-rotate-90 data-[side=left]:left-[calc(var(--content-w)-9px)]",
  variants: {},
});

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent };
