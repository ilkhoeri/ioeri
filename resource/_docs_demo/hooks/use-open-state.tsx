// //@ts-nocheck
"use client";
import { createPortal } from "react-dom";
import { useOpenState } from "@/modules/hooks";
import { cvx } from "@/modules/utility";
import globalStyle from "@/library/styles/styles";

export function Demo() {
  const state = useOpenState<HTMLElement>({ modal: true });

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Modal />
      <Tooltip />
    </div>
  );
}

function Modal() {
  const state = useOpenState<HTMLElement>({ modal: true });

  return (
    <>
      <button
        type="button"
        role="button"
        ref={state.refs.trigger}
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
              ref={state.refs.overlay}
              {...state.styleAt("overlay")}
              onClick={() => state.setOpen(false)}
              className={classes({ overlay: "modal" })}
            />
            <div
              role="dialog"
              ref={state.refs.content}
              {...state.styleAt("content")}
              className={classes({ content: "modal" })}
            >
              <span className="size-full flex items-center justify-center">Click overlay to close</span>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

function Tooltip() {
  const state = useOpenState<HTMLElement>({ trigger: "hover", side: "right", sideOffset: 8 });

  return (
    <>
      <button
        type="button"
        role="button"
        ref={state.refs.trigger}
        {...state.styleAt("trigger")}
        onMouseEnter={state.onMouseEnter}
        onMouseLeave={state.onMouseLeave}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        Tooltip
      </button>

      {state.render && (
        <div
          role="dialog"
          ref={state.refs.content}
          {...state.styleAt("content")}
          className={classes({ content: "tooltip" })}
        >
          <span className="size-full flex items-center justify-center">Content tooltip</span>
        </div>
      )}
    </>
  );
}

const classes = cvx({
  variants: {
    content: {
      modal:
        "fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[60%] data-[state=closed]:slide-out-to-top-[60%] sm:rounded-lg",
      tooltip:
        "fixed min-w-max z-[999] text-[13px] rounded-md border bg-background text-popover-foreground shadow-md outline-none focus-visible:ring-0 flex items-center justify-center py-1 px-2 w-max max-w-max data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=open]:fade-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-75 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:data-[state=closed]:slide-out-to-bottom-4 data-[side=right]:slide-in-from-left-2 data-[side=right]:data-[state=closed]:slide-out-to-left-4 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:data-[state=closed]:slide-out-to-top-4 data-[side=left]:slide-in-from-right-2 data-[side=left]:data-[state=closed]:slide-out-to-right-4 data-[side=right]:left-[calc(var(--trigger-x)+calc(var(--trigger-w)+var(--offset)))] data-[side=right]:top-[calc(var(--trigger-b)-calc(calc(var(--trigger-h)*0.5)+calc(var(--content-h)*0.5)))]",
    },
    overlay: {
      modal:
        "fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      tooltip: "",
    },
  },
});
