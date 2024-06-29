import { cnx, type ClassValue } from "@/modules/utility";
import { cvx, type VariantsType } from "@/modules/utility";
import { twMerge } from "tailwind-merge";

export const compoundStyle = cvx({
  variants: {
    toggle: {
      group: "flex items-center",
      item: "inline-flex items-center justify-center rounded-md ring-offset-background transition-colors text-muted-foreground hover:bg-muted/75 hover:text-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-color",
    },
    theme: {
      default: "bg-transparent",
      outline: "border bg-transparent hover:bg-muted hover:text-color",
    },
    size: {
      default: "h-10 px-3",
      icon: "size-9 p-1",
      sm: "h-9 px-2.5",
      lg: "h-11 px-5",
    },
  },
});

export default function globalStyle(variants: VariantsType<typeof compoundStyle>, ...inputs: ClassValue[]) {
  return twMerge(compoundStyle(variants), cnx(...inputs));
}
