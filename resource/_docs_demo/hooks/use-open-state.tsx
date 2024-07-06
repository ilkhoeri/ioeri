"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useOpenState, DataSide } from "@/modules/hooks";
import { cvx } from "@/modules/utility";
import { SetProps, SetPropsSelect } from "../__set_props";
import globalStyle from "@/library/styles/styles";

export function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Dialog />
      <Tooltip />
    </div>
  );
}

function Dialog() {
  const state = useOpenState<HTMLElement>({ modal: true, hotKeys: "ctrl+M" });

  return (
    <>
      <button
        type="button"
        role="button"
        ref={state.refs.trigger as React.RefObject<HTMLButtonElement>}
        {...state.styleAt("trigger")}
        onClick={() => state.setOpen(!state.open)}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        {state.render ? "Close Modal" : "Open Modal"}
      </button>

      {state.render &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              ref={state.refs.overlay as React.RefObject<HTMLDivElement>}
              {...state.styleAt("overlay")}
              onClick={() => state.setOpen(false)}
              className={dialog({ as: "overlay" })}
            />
            <div
              role="dialog"
              ref={state.refs.content as React.RefObject<HTMLDivElement>}
              {...state.styleAt("content")}
              className={dialog({ as: "content" })}
            >
              <span className="size-full flex items-center justify-center">Click overlay to close</span>
              <span className="text-xs font-roboto-mono font-medium -mt-1">or use ctrl+M</span>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

function Tooltip() {
  const [side, setSide] = useState<string>("right");
  const state = useOpenState<HTMLElement>({ trigger: "hover", sideOffset: 8, side: side as `${DataSide}` });

  return (
    <>
      <button
        type="button"
        role="button"
        ref={state.refs.trigger as React.RefObject<HTMLButtonElement>}
        {...state.styleAt("trigger")}
        onMouseEnter={state.onStartEnter}
        onMouseLeave={state.onEndLeave}
        className={globalStyle({ button: "default", size: "sm" }, "w-24")}
      >
        Tooltip
      </button>

      {state.render && (
        <state.Portal portal={false} container={document.body}>
          <div
            role="dialog"
            ref={state.refs.content as React.RefObject<HTMLDivElement>}
            {...state.styleAt("content")}
            className={tooltip({ align: "center", side: side as `${DataSide}` })}
          >
            <span className="size-full text-center">TOOLTIP CONTENT</span>
          </div>
        </state.Portal>
      )}
      <SetProps.Wrapper>
        <SetPropsSelect values={Object.values(DataSide)} str={side} setStr={setSide} />
      </SetProps.Wrapper>
    </>
  );
}

const dialog = cvx({
  variants: {
    as: {
      overlay:
        "fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      content:
        "fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[60%] data-[state=closed]:slide-out-to-top-[60%] sm:rounded-lg",
    },
  },
});

const tooltip = cvx({
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
