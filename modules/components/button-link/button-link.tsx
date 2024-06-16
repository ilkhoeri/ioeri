import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { AnchorTargets } from "@/modules";

type hrefProps = { href?: string };

export type AnchorProps = LinkProps & AnchorTargets & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target">;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type DivProps = React.HTMLAttributes<HTMLDivElement>;

export type variantButtonLink = {
  variant?: "unstyled" | "normal" | "badge";
};

export type colorButtonLink = {
  color?:
    | "base"
    | "outline-base"
    | "gradient-blue"
    | "gradient-orange"
    | "outline-teal"
    | "outline-indigo"
    | "blue"
    | "green"
    | "red"
    | "grape";
};

export type destructureButtonLinkProps = variantButtonLink & colorButtonLink;

export type ButtonLinkProps =
  | ({ parent: "anchor" } & AnchorProps & destructureButtonLinkProps)
  | ({ parent: "button" } & ButtonProps & destructureButtonLinkProps & hrefProps)
  | ({ parent: "div" } & DivProps & destructureButtonLinkProps & hrefProps);

export const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  const { parent, children, className, color, variant = "normal", ...rest } = props;

  const router = useRouter();

  const classes = twMerge(
    "cursor-pointer",
    color === "base" && "text-black dark:text-white bg-[#e6e4e9] dark:bg-[#1a1a1a]",
    color === "outline-base" && "bg-white dark:bg-black text-slate outline-1 outline outline-slate",
    color === "gradient-blue" && "[background-image:linear-gradient(#0dccea,_#0d70ea)]",
    color === "gradient-orange" && "[background-image:linear-gradient(-180deg,_#FF7E31,_#E62C03)]",
    color === "outline-teal" && "outline-2 outline outline-teal-500 bg-teal-500/20 text-teal-600",
    color === "outline-indigo" && "outline-2 outline outline-indigo-500 bg-indigo-500/20 text-indigo-600",
    color === "blue" && "bg-[#228be61a] text-[#339af0] border-[#339af0]",
    color === "green" && "bg-[#12b8861a] text-[#20c997] border-[#20c997]",
    color === "red" && "bg-[#fa52521a] text-[#ff6b6b] border-[#ff6b6b]",
    color === "grape" && "bg-[#be4bdb1a] text-[#cc5de8] border-[#cc5de8]",
    //
    variant === "badge" &&
      "min-w-[54px] py-[1px] z-10 px-1 rounded-full centered text-center text-[10px] font-medium leading-normal",
    variant === "normal" && "flex items-center justify-center ",
    variant === "unstyled" && "__berdikarier_ioeri",
    className,
  );

  if (parent === "anchor") {
    const { rel = "noopener noreferrer", ...a } = rest as AnchorProps;
    return (
      <Link rel={rel} className={classes} {...a}>
        {children}
      </Link>
    );
  }

  if (parent === "button") {
    const { type, onClick, href, ...b } = rest as ButtonProps & hrefProps;
    return (
      <button
        type={type === "submit" ? "submit" : "button"}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (href) {
            router.push(href);
          } else if (onClick) {
            onClick(e);
          }
        }}
        className={classes}
        {...b}
      >
        {children}
      </button>
    );
  }

  if (parent === "div") {
    const { onClick, href, ...d } = rest as DivProps & hrefProps;
    return (
      <div
        onClick={() => {
          if (href) {
            router.push(href);
          } else if (onClick) {
            onClick;
          }
        }}
        className={classes}
        {...d}
      >
        {children}
      </div>
    );
  }

  if (!parent) {
    throw new Error("Prop 'parent' is required for ButtonLink parent. You Must Define parent from property!");
  }

  return parent;
};
