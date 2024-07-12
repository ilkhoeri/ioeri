import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { AnchorTargets } from "@/modules/types";

export interface AnchorProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target">, LinkProps, AnchorTargets {}

export const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ rel = "noopener noreferrer nofollow", ...props }, ref) => <Link ref={ref} rel={rel} {...props} />,
);
Anchor.displayName = "Anchor";
