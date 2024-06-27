"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

import { Svg } from "@/modules/icons/utils";
import { cvx, type VariantsType } from "@/modules/utility/cvx/cvx";
import { twMerge } from "tailwind-merge";

export type SheetTrees = "overlay" | "content" | "close" | "header" | "title" | "footer" | "description";
export type SheetClasses = {
  classNames?: Partial<Record<SheetTrees, string>> | undefined;
};

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = ({ ...props }: SheetPrimitive.DialogPortalProps) => <SheetPrimitive.Portal {...props} />;
SheetPortal.displayName = SheetPrimitive.Portal.displayName;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & SheetClasses
>(({ className, classNames, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={twMerge(
      "fixed inset-0 z-[890] bg-white/20 dark:bg-black/20 [backdrop-filter:blur(2px)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 |",
      className,
      classNames?.overlay,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

export const sheetVariants = cvx({
  assign:
    "fixed z-[999] w-full h-full overflow-hidden bg-white dark:bg-black border-solid select-none [&_*]:select-none focus-visible:ring-0 transition-all duration-300 data-[state=open]:animate-in data-[state=open]:duration-300 data-[state=closed]:animate-out data-[state=closed]:duration-300",
  variants: {
    side: {
      top: "flex-col-reverse top-0 inset-x-0 rounded-b-[16px] max-h-[70dvh] pt-[26px] [box-shadow:0_1px_0_0_hsl(var(--color))] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom:
        "flex-col bottom-0 inset-x-0 rounded-t-[16px] max-h-[70dvh] pb-[26px] [box-shadow:0_-1px_0_0_hsl(var(--color))] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "flex-row-reverse left-0 inset-y-0 rounded-r-[16px] max-w-[316px] px-[26px] pb-[26px] [box-shadow:1px_0_0_0_hsl(var(--color))] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
      right:
        "flex-row right-0 inset-y-0 rounded-l-[16px] max-w-[316px] px-[26px] pb-[26px] [box-shadow:-1px_0_0_0_hsl(var(--color))] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
    },
  },
});
export const sheetHead = cvx({
  assign:
    "absolute flex items-center justify-between z-11 right-0 left-0 w-full max-w-full min-w-max px-4 bg-white dark:bg-black",
  variants: {
    side: {
      top: "h-[40px] min-h-[40px] max-h-[40px] bottom-0 border-t border-solid border-t-gray-300 dark:border-t-[#1f1f1f]",
      bottom:
        "h-[40px] min-h-[40px] max-h-[40px] bottom-0 border-t border-solid border-t-gray-300 dark:border-t-[#1f1f1f]",
      left: "h-[var(--h-top)] min-h-[var(--h-top)] max-h-[var(--h-top)] top-0 flex-flow-row-reverse",
      right: "h-[var(--h-top)] min-h-[var(--h-top)] max-h-[var(--h-top)] top-0 flex-flow-row",
    },
  },
});
export const sheetClose = cvx({
  assign:
    "centered h-[32px] min-h-[32px] w-[32px] min-w-[32px] !bg-transparent focus:outline-0 focus:ring-0 focus-visible:[outline:2px_solid_#1971c2] focus-visible:outline-offset-0 disabled:pointer-events-none data-[state=open]:bg-secondary",
  variants: {
    side: {
      top: "py-1 w-full rounded-lg active:bg-[#f3f3f3] dark:active:bg-[#0e0e0e] relative group flex flex-flow-row items-center justify-center gap-2",
      bottom:
        "py-1 w-full rounded-lg active:bg-[#f3f3f3] dark:active:bg-[#0e0e0e] relative group flex flex-flow-row items-center justify-center gap-2",
      left: "flex-flow-row-reverse mr-auto ml-0 rounded-[10px]",
      right: "flex-flow-row ml-auto mr-0 rounded-[10px]",
    },
  },
});
export const sheetIndicator = cvx({
  assign: "absolute rounded-full bg-muted cursor-pointer",
  variants: {
    side: {
      top: "mx-auto my-3 sizer [--sz-w:100px] [--sz-h:8px]",
      bottom: "mx-auto my-3 sizer [--sz-w:100px] [--sz-h:8px]",
      left: "inset-y-[calc(50%-calc(var(--sz-h)/2))] right-2 ml-[10px] sizer [--sz-w:8px] [--sz-h:100px]",
      right: "inset-y-[calc(50%-calc(var(--sz-h)/2))] left-2 mr-[10px] sizer [--sz-w:8px] [--sz-h:100px]",
    },
  },
});

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantsType<typeof sheetVariants> {
  header?: React.ReactNode;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps & SheetClasses
>(({ side, className, classNames, children, header, ...props }, ref) => {
  if (!side) {
    throw new Error(
      `Prop 'side' is required. You must define side attr!\n\n<SheetContent side="right">\n</SheetContent>`,
    );
  }
  return (
    <SheetPortal>
      <SheetOverlay classNames={classNames} />
      <SheetPrimitive.Content
        ref={ref}
        className={twMerge(sheetVariants({ side }), className, classNames?.content)}
        {...props}
      >
        <SheetHeader className={twMerge(sheetHead({ side }), classNames?.header)}>
          {(side === "left" || side === "right") && header}
          <SheetPrimitive.Close className={twMerge(sheetClose({ side }), classNames?.close)}>
            {(side === "top" || side === "bottom") && (
              <Svg height={30} width={30} strokeWidth={1.7} className={side === "bottom" ? "rotate-180" : "rotate-0"}>
                <path d="M4,14.5l8-5,8,5" className="transition-all duration-75 opacity-100 group-hover:opacity-0" />
                <path d="M4,14.5H20" className="transition-all duration-75 opacity-0 group-hover:opacity-100" />
              </Svg>
            )}

            {(side === "left" || side === "right") && (
              <Svg className="sizer [--sz:16px] h-4 w-4">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </Svg>
            )}
          </SheetPrimitive.Close>
        </SheetHeader>

        <SheetPrimitive.Close aria-label="close" className={sheetIndicator({ side })} />

        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, classNames, ...props }: React.HTMLAttributes<HTMLDivElement> & SheetClasses) => (
  <div className={twMerge(className, classNames?.header)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, classNames, ...props }: React.HTMLAttributes<HTMLDivElement> & SheetClasses) => (
  <div
    className={twMerge("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className, classNames?.footer)}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title> & SheetClasses
>(({ className, classNames, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={twMerge("text-lg font-semibold text-foreground", className, classNames?.title)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description> & SheetClasses
>(({ className, classNames, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={twMerge("text-sm text-muted-foreground", className, classNames?.description)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
