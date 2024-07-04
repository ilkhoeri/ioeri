"use client";
import { createPortal } from "react-dom";
import { useDialog } from "@/modules/hooks";
import { cvx } from "@/modules/utility";
import globalStyle from "@/library/styles/styles";

export function Demo() {
  const dialog = useDialog<HTMLDivElement>({ modal: true });

  return (
    <div>
      <button
        type="button" role="button"
        {...dialog.attrData("trigger")}
        onClick={() => dialog.setOpen(!dialog.open)}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        {dialog.render ? "Close Dialog" : "Open Dialog"}
      </button>

      {dialog.render && typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              ref={dialog.refs.overlay}
              {...dialog.attrData("overlay")}
              onClick={() => dialog.setOpen(false)}
              className={classes({ as: "overlay" })}
            />
            <div
              role="dialog"
              ref={dialog.refs.content}
              {...dialog.attrData("content")}
              className={classes({ as: "content" })}
            >
              <span className="size-full flex items-center justify-center">
                Click overlay to close
              </span>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}

const classes = cvx({
  variants: {
    as: {
      overlay:
        "fixed inset-0 z-[100] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      content:
        "fixed left-[50%] top-[50%] z-[111] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
    },
  },
});
