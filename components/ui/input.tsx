"use client";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import { attr as attrBase } from "@/utils/attr";

type Variants = "inputBase" | "inputPassword" | "inputPin";
const inputVariants = ({ variant }: { variant: Variants }): string | undefined => {
  const variants: { [key: string]: string } = {
    inputBase: "input_classt",
    inputPassword: "input_class",
    inputPin:
      "block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0",
  };

  return variants[variant] || undefined;
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  unstyled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, disabled, onChange, autoComplete = "off", unstyled, ...props }, ref) => {
    const [numb, setNumb] = React.useState(value ?? "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numeric = e.target.value.replace(/[^0-9]/g, "");
      if (/^\d*$/.test(numeric)) {
        type === "number" && setNumb(numeric);
      }
      if (onChange) {
        onChange(e);
      }
    };

    attrBase.disabled = disabled;
    attrBase.autoComplete = autoComplete;
    attrBase["aria-disabled"] = disabled ? "true" : "false";
    return (
      <input
        ref={ref}
        spellCheck={false}
        aria-invalid="false"
        className={twMerge(
          !unstyled && "max-w-full aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50",
          !unstyled && inputVariants({ variant: "inputBase" }),
          className,
        )}
        type={type === "number" ? "text" : type}
        value={type === "number" ? numb : value}
        onChange={handleChange}
        {...attrBase}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
