import { DataOrigin, DataSide } from "@/modules/hooks";
import { cvx } from "@/modules/utility";
import { twMerge } from "tailwind-merge";
import { SheetsVariant } from "./sheets";

export const drawerVariants = cvx({
  assign:
    "fixed z-[111] gap-4 bg-background p-6 shadow-lg transition ease-linear data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:duration-200 data-[state=closed]:duration-200",
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom:
        "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      right:
        "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
    },
  },
});

const contentClasses = (side: `${DataSide}`) =>
  cvx({
    variants: {
      variant: {
        accordion:
          "overflow-hidden transition-all data-[state=open]:animate-collapse-open data-[state=closed]:animate-collapse-closed data-[state=closed]:duration-200 bg-transparent m-0 p-0 w-full text-left",
        collapsible:
          "overflow-hidden transition-all data-[state=open]:animate-collapse-open data-[state=closed]:animate-collapse-closed bg-transparent m-0 p-0 w-full text-left",
        dropdown:
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2 absolute z-[111] left-[--left] top-[--top] overflow-hidden bg-background rounded-md border",
        dialog:
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2 fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[60%] data-[state=closed]:slide-out-to-top-[60%] rounded-lg",
        drawer: drawerVariants({ side }),
      },
    },
  });

interface ClassesProps {
  variant?: `${SheetsVariant}`;
  unstyled?: boolean;
  className?: string;
  side?: `${DataSide}`;
}

export default function classes(selector: `${DataOrigin}`, options: ClassesProps) {
  const { variant, side = "right", unstyled, className } = options;

  switch (selector) {
    case "trigger":
      if (variant === "accordion") {
        return {
          className: twMerge(
            !unstyled &&
              "relative z-9 w-full flex flex-row items-center justify-between flex-1 py-4 rounded-none font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
            className,
          ),
        };
      }
      return {
        className: twMerge(
          !unstyled &&
            "relative rounded-md font-medium group min-w-24 z-50 bg-color text-background h-9 px-2 text-center",
          className,
        ),
      };

    case "content":
      return { className: twMerge(!unstyled && contentClasses(side)({ variant }), className) };

    case "overlay":
      return {
        className: twMerge(
          !unstyled &&
            "fixed inset-0 size-full z-[100] bg-background/50 supports-[backdrop-filter]:bg-background/50 cursor-default data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          className,
        ),
      };

    case "item":
      if (variant === "accordion") {
        return {
          className: twMerge(
            !unstyled &&
              "group relative flex flex-col h-auto border-0 select-none gap-[--offset] data-[side=top]:flex-col-reverse data-[side=right]:flex-row data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse data-[align=start]:items-start data-[align=center]:items-center data-[align=end]:items-end border-b",
            className,
          ),
        };
      }
      return { className };

    default:
      return { className };
  }
}
