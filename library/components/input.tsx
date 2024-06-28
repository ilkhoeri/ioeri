"use client";

import * as React from "react";
import { attr, capitalizeWords, sanitizedToParams } from "@/modules";
import { twMerge } from "tailwind-merge";
import { cvx } from "@/modules/utility/cvx/cvx";
import { cn } from "../utils";

const inputVariants = cvx({
  variants: {
    variant: {
      inputBase: "input_classt",
      inputPassword: "input_class",
      inputPin:
        "block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0",
    },
  },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  unstyled?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
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

    attr.disabled = disabled;
    attr.autoComplete = autoComplete;
    attr["aria-disabled"] = disabled ? "true" : "false";
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
        {...attr}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export function InputFilter({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      <input
        type="text"
        name={sanitizedToParams(id)}
        id={sanitizedToParams(id)}
        value={value}
        onChange={onChange}
        className="peer w-full min-w-full leading-none placeholder:leading-none placeholder:min-h-8 border-b pb-3 mt-1 mb-12 bg-transparent transition-colors focus-visible:ring-0 focus-visible:outline-0 focus-visible:border-b-color autofill:bg-transparent valid:bg-transparent placeholder-shown:bg-transparent focus:bg-transparent"
      />
      <label
        role="presentation"
        htmlFor={sanitizedToParams(id)}
        className={cn(
          "font-bold tracking-normal cursor-pointer absolute z-9 left-0 transition-all",
          value ? "text-[100%] -translate-y-[28px]" : "text-h3 translate-y-0 peer-focus:text-[100%] peer-focus:-translate-y-[28px] peer-focus-visible:text-[100%] peer-focus-visible:-translate-y-[28px]",
        )}
      >
        {capitalizeWords(id)}
      </label>
    </>
  );
}
