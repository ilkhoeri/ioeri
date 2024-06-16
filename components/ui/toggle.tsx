"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { UnstyledButton } from "./button";
import { ClipboardCheckIcon, ClipboardCopyIcon, useClipboard } from "@/modules";

export const CopyToggle = React.forwardRef<
  React.ElementRef<typeof UnstyledButton>,
  React.ComponentPropsWithoutRef<typeof UnstyledButton> & { text: string | null | undefined }
>(({ text, className, ...props }, ref) => {
  const clipboard = useClipboard({ timeout: 1000 });
  return (
    <UnstyledButton
      ref={ref}
      {...props}
      tabIndex={-1}
      onClick={() => clipboard.copy(text)}
      disabled={!text}
      className={twMerge(
        "centered p-1 rounded-md border bg-background-box absolute right-0 top-0 [&_svg]:sizer [--sz:20px]",
        className,
      )}
    >
      {clipboard.copied ? <ClipboardCheckIcon /> : <ClipboardCopyIcon />}
    </UnstyledButton>
  );
});
CopyToggle.displayName = "CopyToggle";
