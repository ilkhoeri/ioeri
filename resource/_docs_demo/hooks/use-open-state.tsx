"use client";
import { useState } from "react";
import { XIcon } from "@/modules/icons";
import { cvx, VariantsType } from "@/modules/utility";
import { useOpenState, DataSide } from "@/modules/hooks";
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
        className={globalStyle({ button: "default", size: "sm" })}
      >
        Dialog
      </button>

      <state.Portal render={state.render}>
        <div onClick={state.toggle} {...state.styleAt("overlay")} {...cn("overlay")} />
        <div
          role="dialog"
          ref={state.refs.content as React.RefObject<HTMLDivElement>}
          {...state.styleAt("content")}
          {...cn("content")}
        >
          <button type="button" onClick={state.toggle} {...cn("close")}>
            <XIcon />
            <span className="sr-only">Close Trigger</span>
          </button>
          <span className="size-full flex items-center justify-center">Click overlay to close</span>
          <span className="text-xs font-roboto-mono font-medium -mt-1">or use ctrl+M</span>
        </div>
      </state.Portal>
    </>
  );
}

function Tooltip() {
  const [side, setSide] = useState<string>("bottom");
  const state = useOpenState<HTMLElement>({
    trigger: "hover",
    sideOffset: 8,
    touch: true,
    side: side as `${DataSide}`,
  });

  return (
    <>
      <button
        type="button"
        role="button"
        ref={state.refs.trigger as React.RefObject<HTMLButtonElement>}
        {...state.styleAt("trigger")}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        Tooltip
      </button>

      <state.Portal render={state.render}>
        <div
          role="tooltip"
          ref={state.refs.content as React.RefObject<HTMLDivElement>}
          {...state.styleAt("content")}
          className={tooltip({ align: "center", side: side as `${DataSide}` })}
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

type Origin = NonNullable<VariantsType<typeof dialog>["as"]>;
function cn(as: Origin) {
  return {
    className: dialog({ as }),
  };
}

const dialog = cvx({
  variants: {
    as: {
      overlay:
        "fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      content:
        "fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[60%] data-[state=closed]:slide-out-to-top-[60%] rounded-lg",
      close: "size-4 absolute right-4 top-4 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50",
    },
  },
});

const tooltip = cvx({
  assign:
    "flex flex-col group absolute min-w-max z-20 text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-75 data-[side=top]:top-[calc(var(--top)-var(--offset))] data-[side=bottom]:top-[calc(var(--top)+var(--offset))]",
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
