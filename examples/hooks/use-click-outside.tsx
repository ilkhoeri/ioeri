"use client";

import { useRef, useState } from "react";
import { useClickOutside, useDialog } from "@/modules";
import globalStyle from "@/library/styles/styles";

export function Example() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(() => setOpen(false), [buttonRef, contentRef]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        data-state={open ? "open" : "closed"}
        onClick={() => setOpen(!open)}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        {open ? "Close" : "Open"}
      </button>

      {open && (
        <div
          ref={contentRef}
          data-state={open ? "open" : "closed"}
          className="absolute bottom-[calc(50%+48px)] border p-4 rounded-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          <span>Click outside to close</span>
        </div>
      )}
    </>
  );
}
