import { cnx, type ClassValue } from "@/modules/utility";
import { cvx, type VariantsType } from "@/modules/utility";
import { twMerge } from "tailwind-merge";

export const compoundStyle = cvx({
  variants: {
    button: {
      default: "transition-colors rounded-md font-medium text-span bg-color text-background border border-background hover:bg-color/90 disabled:opacity-50",
      destructive: "transition-colors rounded-md font-medium text-span bg-destructive text-white hover:bg-destructive-foreground",
      constructive: "transition-colors rounded-md font-medium text-span bg-constructive text-white hover:bg-constructive-foreground",
      conservative: "transition-colors rounded-md font-medium text-span bg-conservative text-white hover:bg-conservative-foreground",
      primitive:
        "transition-colors rounded-md font-medium text-span bg-primitive-foreground/35 text-color border border-primitive-emphasis hover:bg-accent hover:text-primitive/40",
      outline: "transition-colors rounded-md font-medium text-span border bg-background text-muted-foreground hover:bg-muted hover:text-color",
      link: "transition-colors rounded-md font-medium text-span text-color underline-offset-4 hover:text-constructive hover:underline",
    },
    toggle: {
      group: "flex items-center",
      item: "inline-flex items-center justify-center rounded-md ring-offset-background transition-colors text-muted-foreground hover:bg-muted/75 hover:text-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-color",
    },
    input: {
      text: "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
