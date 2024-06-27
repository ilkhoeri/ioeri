import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { AnchorTargets } from "@/modules";
import { cvx, type VariantsType } from "@/modules/utility/cvx/cvx";

export const variantLinkButton = cvx({
  assign: "cursor-pointer",
  variants: {
    variant: {
      badge: "min-w-[54px] py-[1px] z-10 px-1 rounded-full centered text-center text-[10px] font-medium leading-normal",
      normal: "flex items-center justify-center",
    },
    color: {
      base: "text-black dark:text-white bg-[#e6e4e9] dark:bg-[#1a1a1a]",
      blue: "bg-[#228be61a] text-[#339af0] border-[#339af0]",
      grape: "bg-[#be4bdb1a] text-[#cc5de8] border-[#cc5de8]",
      green: "bg-[#12b8861a] text-[#20c997] border-[#20c997]",
      red: "bg-[#fa52521a] text-[#ff6b6b] border-[#ff6b6b]",
      "gradient-blue": "bg-[linear-gradient(#0dccea,_#0d70ea)]",
      "gradient-orange": "bg-[linear-gradient(-180deg,_#FF7E31,_#E62C03)]",
      "outline-base": "bg-white dark:bg-black text-slate outline-1 outline outline-slate",
      "outline-indigo": "outline-2 outline outline-indigo-500 bg-indigo-500/20 text-indigo-600",
      "outline-teal": "outline-2 outline outline-teal-500 bg-teal-500/20 text-teal-600",
    },
  },
});

export type LinkType = LinkProps & AnchorTargets & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: string };
export type DivType = React.HTMLAttributes<HTMLDivElement>;

export type LinkButtonProps =
  | ({ el?: "link" } & LinkType & VariantsType<typeof variantLinkButton>)
  | ({ el?: "button" } & ButtonType & VariantsType<typeof variantLinkButton>)
  | ({ el?: "div" } & DivType & VariantsType<typeof variantLinkButton>);

export const LinkButton = (props: LinkButtonProps) => {
  const { el = "link", className, color, variant = "normal", ...rest } = props;
  const router = useRouter();
  const classes = twMerge(variantLinkButton({ variant, color }), className);

  if (el === "link") {
    const { rel = "noopener noreferrer", ...other } = rest as LinkType;
    return <Link rel={rel} className={classes} {...other} />;
  }

  if (el === "button") {
    const { type = "button", onClick, href, ...other } = rest as ButtonType;
    return (
      <button
        type={type}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (href) {
            router.push(href);
          } else if (onClick) {
            onClick(e);
          }
        }}
        className={classes}
        {...other}
      />
    );
  }

  if (el === "div") {
    const { ...other } = rest as DivType;
    return <div className={classes} {...other} />;
  }

  return el;
};
