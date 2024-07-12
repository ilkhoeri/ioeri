import React, { ElementType, FC } from "react";
import { twMerge } from "tailwind-merge";

export type MarkBooleanProps = {
  className?: string;
  childTrue?: React.ReactNode;
  childFalse?: React.ReactNode;
  el?: ElementType;
  mark: boolean;
} & React.HTMLAttributes<HTMLElement>;

const MarkBoolean: FC<MarkBooleanProps> = ({ childTrue, childFalse, className, el = "mark", mark, ...props }) => {
  let Component: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any;
  return (
    <Component
      className={twMerge(
        "px-1 h-4 text-[10px] leading-[16px] font-mono font-semibold text-center uppercase rounded text-white w-max select-none",
        mark === true ? "bg-[#2ea043] tracking-wide" : "bg-[#e54b4b] tracking-[0]",
        className,
      )}
      {...props}
    >
      {mark === true ? childTrue ?? "True" : childFalse ?? "False"}
    </Component>
  );
};

export default MarkBoolean;
