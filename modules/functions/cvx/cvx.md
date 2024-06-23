#title
create variants x

#description
If you have ever used ‵class variance authority‵, you are also familiar with the cvx function. You can think of cvx as a simpler or lite version.

cva uses the first argument as a constant that will be distributed throughout the variance, in cvx this argument is moved to the ‵assign‵ parameter.
cvx does not or has not passed the ‵class‵ and ‵className‵ parameters. cvx was created just as a simple function to pass a string with various variants that you create.

#installation
Berikut adalah cara untuk install Create Variant ....

#usage
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

