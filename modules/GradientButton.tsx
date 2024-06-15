import React from "react";
import Link, { LinkProps } from "next/link";
import { GradientWrapper } from "./GradientWrapper";
import { AnchorTargets } from "./types";

export type GradientButtonProps = {
  label?: React.ReactNode;
  children?: React.ReactNode;
};

export type hand_AnchorProps = AnchorTargets & React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;
export type hand_ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type GradientButtonAllProps =
  | (hand_AnchorProps &
      GradientButtonProps & {
        core: "anchor";
      })
  | (hand_ButtonProps &
      GradientButtonProps & {
        core: "button";
      });

export const GradientButton = (props: GradientButtonAllProps) => {
  const { label, core, children, ...rest } = props;

  const classCore =
    "shadow-[0_4px_4px_0_#00000040] bg-theme bg-clip-padding border-[3px] border-solid border-transparent transition-all duration-300 h-full max-h-full w-full max-w-full rounded-2xl backdrop-blur-sm p-[0_12px] centered relative active:scale-[0.96]";

  if (core === "anchor") {
    const { href, target, ...anchorProps } = rest as hand_AnchorProps & GradientButtonProps;
    return (
      <GradientWrapper>
        <Link
          href={href}
          aria-label={`${label}` || "Berdikarier"}
          target={target}
          rel="noopener noreferrer"
          className={classCore}
          {...anchorProps}
        >
          {children ?? (label && <span className="truncate inline-block font-medium">{label}</span>)}
        </Link>
      </GradientWrapper>
    );
  }
  if (core === "button") {
    const { type, ...buttonProps } = rest as hand_ButtonProps & GradientButtonProps;
    return (
      <GradientWrapper>
        <button
          type={type === "submit" ? "submit" : "button"}
          data-button="true"
          aria-label={`${label}` || "Berdikarier"}
          className={classCore}
          {...buttonProps}
        >
          {children ?? (label && <span className="truncate inline-block font-medium">{label}</span>)}
        </button>
      </GradientWrapper>
    );
  }

  if (!core) {
    throw new Error("Prop 'core' is required for GradientButton core. You Must Define GradientButton core!");
  }
  return core;
};

GradientButton.displayName = "@/library/modules/GradientButton.tsx";
