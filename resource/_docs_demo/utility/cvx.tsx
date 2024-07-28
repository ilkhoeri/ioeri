import { cvx, type VariantsType } from "@/modules/utility";
import { twMerge } from "tailwind-merge";
import { SetProps } from "../__set_props";

const classes = cvx({
  assign: "bg-muted rounded-sm px-2 border flex items-center justify-center", // assign values that is definitely returned
  variants: {
    variant: {
      bold: "font-bold",
      italic: "font-italic",
      semibold: "font-semibold",
      light: "font-light",
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
  // determine the variance value by default
  defaultVariants: {
    variant: "bold",
    color: "blue",
    size: "lg",
  },
});

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
      <SetProps.Comment title="// usage defaultVariants and passed className props" />
      <div {...clN(props)}>MY COMPONENT</div>

      <SetProps.Comment title="// usage defaultVariants without defined variant" />
      <div className={classes()}>MY COMPONENT</div>

      <SetProps.Comment title={`// classes({ color: 'red', size: 'md' })`} />
      <div className={classes({ color: "red", size: "lg" })}>MY COMPONENT</div>

      <SetProps.Comment title={`// twMerge(classes({ variants }), className)`} />
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
