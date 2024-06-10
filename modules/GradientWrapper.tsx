import React from "react";
import { cnx } from "./utils";

export type GradientWrapperProps = { children?: React.ReactNode; className?: string };

export const GradientWrapper = (props: GradientWrapperProps) => {
  const { children, className } = props;

  const classSpan =
    "absolute h-full w-full rounded-2xl backdrop-blur-sm content-[''] z-0 | before:border-[12px] before:border-solid before:border-transparent before:bg-clip-padding before:content-[''] before:blur-[36px] before:h-full before:w-full before:absolute before:z-0 before:opacity-100 before:left-0";
  return (
    <div
      className={cnx(
        [
          "relative centered | ",
          !className && "h-[48px] w-[248px] min992:h-[52px] min992:w-[252px] min1081:h-14 min1081:w-[256px]",
        ],
        className,
      )}
    >
      <span className={`${classSpan} | before:bg-[linear-gradient(165deg,#007cf0,#00dfd8)] animate-pulse-4`} />
      <span className={`${classSpan} | before:bg-[linear-gradient(165deg,#7928ca,#ff0080)] animate-pulse-5`} />
      <span className={`${classSpan} | before:bg-[linear-gradient(165deg,#ff4d4d,#f9cb28)] animate-pulse-6`} />
      {children}
    </div>
  );
};

GradientWrapper.displayName = "@/library/modules/GradientWrapper.tsx";
