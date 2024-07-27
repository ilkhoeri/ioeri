"use client";
import { XIcon } from "@/modules/icons";
import { cvx, VariantsType } from "@/modules/utility";
import { useOpenState } from "@/modules/hooks";
import globalStyle from "@/library/styles/styles";

export function Demo() {
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
        "fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      content:
        "fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[60%] data-[state=closed]:slide-out-to-top-[60%] rounded-lg",
      close: "size-4 absolute right-4 top-4 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50",
    },
  },
});