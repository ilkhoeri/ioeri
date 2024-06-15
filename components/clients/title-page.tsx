"use client";

import * as React from "react";

import style from "@/styles/ioeri.module.css";

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

  const rest = { className: style.h, style: { opacity }, ...props };

  return (
    <h1 {...rest}>
      <span className={style.h_span}>{title}</span>
    </h1>
  );
};

export const TitlePageID: React.FC<TitlePageProps> = ({ title, ...props }) => {
  return (
    <h1 className={style.tt} {...props}>
      {title}
    </h1>
  );
};
