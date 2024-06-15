"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

interface TitlePageProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  title: string | undefined;
  /** @default 200 */
  scrollUpto?: number;
}

export const TitlePage: React.FC<TitlePageProps> = ({ title, scrollUpto = 200, ...props }) => {
  const [opacity, setOpacity] = React.useState(1);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = 1 - scrollPosition / scrollUpto;
      setOpacity(Math.max(0.1, newOpacity));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollUpto]);

  return (
    <h1
      className={twMerge("overflow-hidden sticky top-6 -z-9 -mt-8 [font-size:clamp(42px,2px+10dvw,80px)]")}
      style={{ opacity }}
      {...props}
    >
      <span
        className={twMerge(
          "uppercase select-none font-extrabold font-kanit text-muted-foreground w-0 max-w-0 [transition:all_250ms_ease]",
        )}
      >
        {title}
      </span>
    </h1>
  );
};

export const TitlePageID: React.FC<TitlePageProps> = ({ title, ...props }) => {
  return (
    <h1 className={twMerge("mb-3 text-h4 font-bold capitalize leading-none font-kanit")} {...props}>
      {title}
    </h1>
  );
};
