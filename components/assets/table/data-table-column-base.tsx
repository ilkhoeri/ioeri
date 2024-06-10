import * as React from "react";

import { twMerge } from "tailwind-merge";

interface DataTableColumnBaseProps extends React.HTMLAttributes<HTMLParagraphElement> {
  centered?: boolean;
}

export function DataTableColumnBase({ className, children, title, centered, ...props }: DataTableColumnBaseProps) {
  return (
    <p
      className={twMerge(
        "cursor-default flex items-center text-sm font-medium rounded-md px-3 w-max h-8 hover:bg-muted/30 hover:text-color data-[state=open]:bg-muted/30 focus-visible:ring-offset-0 focus-visible:ring-0",
        centered && "justify-center",
        className,
      )}
      {...props}
    >
      {children || title}
    </p>
  );
}
