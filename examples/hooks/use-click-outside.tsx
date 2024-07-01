"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "@/modules";
import globalStyle from "@/library/styles/styles";

export function Example() {
  const [open, setOpen] = useState(false);
  const [withRef, setWithRef] = useState(true);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(() => setOpen(false), [buttonRef, contentRef]);

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        role="button"
        onClick={() => setWithRef(!withRef)}
        className="absolute top-4 left-4 min-w-26 justify-start w-max rounded-md border px-2 py-1 text-sm bg-background cursor-pointer" // prettier-ignore
      >
        {withRef ? "withRef" : "whitOutRef"}
      </button>

      <button
        ref={withRef ? buttonRef : undefined}
        type="button"
        role="button"
        data-state={open ? "open" : "closed"}
        onClick={() => setOpen(!open)}
        className={globalStyle({ button: "default", size: "sm" })}
      >
        {open ? "Close" : "Open"}
      </button>

      {open && (
        <div
          ref={withRef ? contentRef : undefined}
          data-state={open ? "open" : "closed"}
          className="absolute bg-background top-[calc(50%+20px)] border p-4 rounded-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          <span>{withRef ? "Click outside to close" : "Can't click outside to close"}</span>
        </div>
      )}
    </div>
  );
}

