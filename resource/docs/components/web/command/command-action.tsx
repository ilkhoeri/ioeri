"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { commandActions } from "./command-store";
import { useCommandContext } from "./command-store";
import { factory, useProps } from "@/modules/factory";

import type { Factory, ElementProps, AnchorTargets, CSSProperties, CompoundStylesApiProps } from "@/modules/factory";

export type CommandActionOrigin =
  | "action"
  | "actionLabel"
  | "actionInner"
  | "actionDescription"
  | "actionLeftSection"
  | "actionRightSection"
  | "actionBody";

export interface CommandActionProps
  extends Omit<LinkProps, "href">,
    CompoundStylesApiProps<CommandActionFactory>,
    ElementProps<"a"> {
  label?: string;
  href?: string;
  style?: CSSProperties;
  description?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  children?: React.ReactNode;
  dimmedSections?: boolean;
  highlightQuery?: boolean;
  highlightColor?:
    | "dark"
    | "gray"
    | "red"
    | "pink"
    | "grape"
    | "violet"
    | "indigo"
    | "blue"
    | "cyan"
    | "green"
    | "lime"
    | "yellow"
    | "orange"
    | "teal"
    | (string & NonNullable<unknown>);
  closeCommandOnTrigger?: boolean;
  keywords?: string | string[];
}

export interface AnchorProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target">,
    Omit<LinkProps, "href">,
    AnchorTargets {
  style?: CSSProperties;
}

export type CommandActionFactory = Factory<{
  ref: HTMLAnchorElement;
  props: CommandActionProps & AnchorProps;
  stylesNames: CommandActionOrigin;
  compound: true;
}>;

const defaultProps: Partial<CommandActionProps> = {
  // dimmedSections: true,
  highlightQuery: false,
};

export const CommandAction = factory<CommandActionFactory>((_props, ref) => {
  const {
    id,
    label,
    style,
    styles,
    onClick,
    children,
    className,
    classNames,
    description,
    onMouseDown,
    leftSection,
    rightSection,
    highlightQuery,
    closeCommandOnTrigger,
    href = "",
    ...others
  } = useProps("CommandAction", defaultProps, _props);

  const ctx = useCommandContext();

  const stylesApi = { classNames, styles };

  const labelNode =
    highlightQuery && typeof label === "string" ? (
      <CommandHighlight highlight={ctx.query} text={label} {...ctx.getStyles("actionLabel", stylesApi)} />
    ) : (
      <span {...ctx.getStyles("actionLabel", stylesApi)}>{label}</span>
    );

  const defaultChild = (
    <>
      {leftSection && <span {...ctx.getStyles("actionLeftSection", stylesApi)}>{leftSection}</span>}

      <div {...ctx.getStyles("actionInner", stylesApi)}>
        {labelNode}
        <span {...ctx.getStyles("actionDescription", stylesApi)}>{description}</span>
      </div>

      {rightSection && <span {...ctx.getStyles("actionRightSection", stylesApi)}>{rightSection}</span>}
    </>
  );

  const rest = {
    "data-action": "",
    ...ctx.getStyles("action", { id, className, style, ...stylesApi }),
    onMouseDown,
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      onClick?.(e);
      if (closeCommandOnTrigger ?? ctx.closeOnActionTrigger) {
        commandActions.close(ctx.store);
      }
    },
    ...others,
  };

  return (
    <Link ref={ref} href={href} {...rest}>
      {children || defaultChild}
    </Link>
  );
});

export const CommandHighlight = React.forwardRef<
  HTMLParagraphElement,
  {
    text: string;
    highlight: string;
    el?: React.ElementType;
    style?: React.CSSProperties & {
      [key: string]: any;
    };
  } & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "children">
>(({ el = "p", text, highlight, ...props }, ref) => {
  type ComponentType = React.ComponentType<React.HTMLAttributes<HTMLParagraphElement>>;
  let P: ComponentType = el as ComponentType;

  const lowerTitle = text.toLowerCase();
  const lowerQuery = highlight.toLowerCase();
  const startIndex = lowerTitle.indexOf(lowerQuery);
  const endIndex = startIndex + lowerQuery.length;
  const before = text.slice(0, startIndex);
  const match = text.slice(startIndex, endIndex);
  const after = text.slice(endIndex);

  return (
    <P ref={ref} {...props}>
      {before}
      <mark>{match}</mark>
      {after}
    </P>
  );
});
CommandHighlight.displayName = "CommandHighlight";
