"use client";
import { useState } from "react";
import { cvx } from "@/modules/utility";
import { useOpenState, DataSide } from "@/modules/hooks";
import { SetProps, SetPropsSelect } from "../__set_props";
import globalStyle from "@/library/styles/styles";

export function Demo() {
  const [side, setSide] = useState<string>("bottom");
  const state = useOpenState<HTMLElement>({
    trigger: "hover",
    sideOffset: 8,
    side: side as `${DataSide}`,
    observe: { touch: true, align: true, side: true, sideswipe: true, offset: true, contentRect: true },
  });

  return (
    <>
      <button
        type="button"
        role="button"
        ref={state.refs.trigger}
        {...state.styleAt("trigger")}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        Tooltip
      </button>

      <state.Portal render={state.render}>
        <div
          role="tooltip"
          ref={state.refs.content}
          {...state.styleAt("content")}
          className={tooltip({ side: side as `${DataSide}` })}
        >
          <span>Lorem ipsum...</span>
          <span>Lorem ipsum...</span>
        </div>
      </state.Portal>
      <SetProps.Wrapper>
        <SetPropsSelect values={Object.values(DataSide)} str={side} setStr={setSide} />
      </SetProps.Wrapper>
    </>
  );
}

const tooltip = cvx({
  assign:
    "group absolute min-w-max z-20 text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max transition-opacity [transition-duration:200ms] data-[state=open]:animate-in data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-95 top-[--top] left-[--left]",
  variants: {
    side: {
      top: "data-[side=top]:slide-in-from-bottom-0 data-[side=top]:data-[state=closed]:slide-out-to-bottom-0",
      right: "data-[side=right]:slide-in-from-left-0 data-[side=right]:data-[state=closed]:slide-out-to-left-0",
      bottom: "data-[side=bottom]:slide-in-from-top-0 data-[side=bottom]:data-[state=closed]:slide-out-to-top-0",
      left: "data-[side=left]:slide-in-from-right-0 data-[side=left]:data-[state=closed]:slide-out-to-right-0",
    },
  },
});
