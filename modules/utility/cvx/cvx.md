$:title
Create Variants X

$:description
If you have ever used <a href="https://cva.style/docs" target="_blank" class="a_blank">class variance authority</a>, you are also familiar with the cvx function. You can think of cvx as a simpler or lite version.

cva uses the first argument as a constant that will be distributed throughout the variance, in cvx this argument is moved to the <code class="block_code">assign</code> parameter. cvx does not or has not passed the <code class="block_code">class</code> and <code class="block_code">className</code> parameters. cvx was created just as a simple function to pass a string with various variants that you create.

$:installation
Berikut adalah cara untuk install Create Variant ....

$:usage
import { cvx, type VariantsType } from "@/modules";

const classes = cvx({
  assign: "bg-muted rounded-md px-2 border", // assign values and it's optional
  variants: {
    type: {
      button: "font-bold",
      toggle: "font-italic",
      trigger: "font-semibold",
      checkbox: "font-light",
    },
    clr: {
      blue: "text-blue-600",
      green: "text-green-700",
      red: "text-red-500",
      purple: "text-purple-500",
    },
    sz: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-10 w-10",
      xl: "h-14 w-14",
    },
  },
  defaultVariants: {
    clr: "blue",
    sz: "lg",
    type: "button",
  },
});


type MyVariantsComponentType = VariantsType<typeof classes>;

// return
type MyVariantsComponentType = {
  type?: "button" | "toggle" | "trigger" | "checkbox";
  clr?: "blue" | "green" | "red" | "purple";
  sz?: "sm" | "md" | "lg" | "xl";
}

// usage in component
  <div className={classes()}>MY COMPONENT</div>

// or
  <div className={classes({ clr: "red", sz: "md" })}>MY COMPONENT</div>

// with twMerge
  <div className={twMerge(classes({ clr: "red", sz: "md" }), "text-background font-extrabold border-0")}>MY COMPONENT</div>

// merge with twMerge
  import { cvx, type VariantsType } from "@/modules/utility";
  import { twMerge } from "tailwind-merge";

  export const compoundStyle = cvx({
    variants: {
      toggle: {
        group: "flex items-center",
        item: "inline-flex items-center justify-center rounded-md ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-color",
      },
      theme: {
        default: "bg-transparent",
        outline: "border bg-transparent hover:bg-muted hover:text-color",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
  });

  export default function globalStyle(variants: VariantsType<typeof compoundStyle>, className?: string) {
    return twMerge(compoundStyle(variants), className);
  }

  <div className={globalStyle({ toggle: "group" }, "ml-auto [&_svg]:size-5")} />