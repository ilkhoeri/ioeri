// merge with twMerge
import { cvx, type VariantsType } from "@/modules/utility";
import { twMerge } from "tailwind-merge";

export const compoundStyles = cvx({
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

const classes = cvx({
  assign: "bg-muted rounded-sm px-2 border flex items-center justify-center", // assign values and it's optional
  variants: {
    variant: {
      button: "font-bold",
      toggle: "font-italic",
      trigger: "font-semibold",
      checkbox: "font-light",
    },
    color: {
      blue: "text-blue-600",
      green: "text-green-700",
      red: "text-red-500",
      purple: "text-purple-500",
    },
    size: {
      sm: "h-4",
      md: "h-6",
      lg: "h-10",
      xl: "h-14",
    },
  },
  defaultVariants: {
    variant: "button",
    color: "blue",
    size: "lg",
  },
});

/**
// result type
type MyVariantsType = {
  color?: "blue" | "green" | "red" | "purple";
  variant?: "button" | "toggle" | "trigger" | "checkbox";
  size?: "sm" | "md" | "lg" | "xl";
};
*/

export function globalStyles(variants: VariantsType<typeof compoundStyles>, className?: string) {
  return twMerge(compoundStyles(variants), className);
}

type MyVariantsType = VariantsType<typeof classes>;
interface ClnProps extends MyVariantsType {
  unstyled?: boolean;
  className?: string;
}
export function clN(props: ClnProps) {
  const { className, unstyled, ...rest } = props;
  return { className: twMerge(!unstyled && classes({ ...rest }), className) };
}

export function Demo(props: ClnProps) {
  const { className, color, size, variant, unstyled } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className={globalStyles({ toggle: "group" }, "ml-auto [&_svg]:size-5")}>MY COMPONENT</div>
      {/* // usage defaultVariants without passing props className */}
      <div {...clN(props)}>MY COMPONENT</div>

      {/* // usage defaultVariants without defined variant */}
      <div className={classes()}>MY COMPONENT</div>

      {/* // or */}
      <div className={classes({ color: "red", size: "md" })}>MY COMPONENT</div>

      {/* // with twMerge */}
      <div
        className={twMerge(
          classes({ color: "red", size: "md" }),
          "bg-black/60 dark:bg-white/60 text-white dark:text-black font-extrabold border-0",
        )}
      >
        MY COMPONENT
      </div>
    </div>
  );
}
