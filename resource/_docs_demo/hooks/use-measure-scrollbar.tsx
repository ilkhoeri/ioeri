"use client";
import { useState } from "react";
import { useMeasureScrollbar } from "@/modules/hooks";
import globalStyle from "@/library/styles/styles";

export function Demo() {
  const [open, setOpen] = useState<boolean>(false);
  const [_, scrollbarWidth] = useMeasureScrollbar(open);

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        role="button"
        data-state={open ? "open" : "closed"}
        onClick={() => setOpen(!open)}
        className={globalStyle({ button: "default", size: "sm" }, "w-24")}
      >
        {open ? "Close" : "Open"}
      </button>
      {open && (
        <div
          data-state={open ? "open" : "closed"}
          className="absolute bg-background top-[calc(50%+20px)] border p-4 rounded-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          <span>Scroll body removed</span>
        </div>
      )}
      <p className="absolute top-4 left-4">browser scrollbar: {scrollbarWidth}px</p> {/* prettier-ignore */}
    </div>
  );
}
