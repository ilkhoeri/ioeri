"use client";

import React from "react";
import Link, { LinkProps } from "next/link";

import { CSSProperties, ElementProps } from "../factory/transit";
import { CompoundStylesApiProps } from "../factory/styles-api.types";
import { Factory, factory } from "../factory";
import { useProps } from "../factory/use-props";
import { useSpotlightContext } from "./spotlight.context";
import { spotlightActions } from "./spotlight.store";

import { HighlightText } from "../highlight-text";
import type { AnchorTargets } from "../../types/anchor";

export type SpotlightActionStylesNames =
  | "action"
  | "actionLabel"
  | "actionDescription"
  | "actionLeftSection"
  | "actionRightSection"
  | "actionBody";

export interface SpotlightActionProps
  extends Omit<LinkProps, "href">,
    CompoundStylesApiProps<SpotlightActionFactory>,
    ElementProps<"a"> {
  /** Action label, pass string to use in default filter */
  label?: string;

  href?: string;

  style?: CSSProperties;

  /** Action description, pass string to use in default filter */
  description?: string;

  /** Section displayed on the left side of the label, for example, icon */
  leftSection?: React.ReactNode;

  /** Section displayed on the right side of the label, for example, hotkey */
  rightSection?: React.ReactNode;

  /** Children override default action elements, if passed, label, description and sections are hidden */
  children?: React.ReactNode;

  /** Determines whether left and right sections should have dimmed styles, `true` by default */
  dimmedSections?: boolean;

  /** Determines whether search query should be highlighted in action label, `false` by default */
  highlightQuery?: boolean;

  /** Key of `theme.colors` of any valid CSS color that will be used to highlight search query, `'yellow'` by default */
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

  /** Determines whether the spotlight should be closed when action is triggered, overrides `closeOnActionTrigger` prop set on `Spotlight` */
  closeSpotlightOnTrigger?: boolean;

  /** Keywords that are used for default filtering, not displayed anywhere, can be a string: "react,router,javascript" or an array: ['react', 'router', 'javascript'] */
  keywords?: string | string[];
}

export interface AnchorProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target">,
    Omit<LinkProps, "href">,
    AnchorTargets {
  style?: CSSProperties;
}

export type SpotlightActionFactory = Factory<{
  props: SpotlightActionProps & AnchorProps;
  ref: HTMLAnchorElement;
  stylesNames: SpotlightActionStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightActionProps> = {
  // dimmedSections: true,
  highlightQuery: false,
};

export const SpotlightAction = factory<SpotlightActionFactory>((_props, ref) => {
  const {
    id,
    className,
    style,
    classNames,
    styles,
    description,
    label,
    leftSection,
    rightSection,
    children,
    highlightQuery,
    closeSpotlightOnTrigger,
    onClick,
    onMouseDown,
    href,
    // highlightColor, // dimmedSections, // keywords, // vars,
    ...others
  } = useProps("SpotlightAction", defaultProps, _props);

  const ctx = useSpotlightContext();

  const stylesApi = { classNames, styles };

  const labelNode =
    highlightQuery && typeof label === "string" ? (
      <HighlightText
        highlight={ctx.query}
        text={label} // color={highlightColor}
        {...ctx.getStyles("actionLabel", stylesApi)}
      />
    ) : (
      <span {...ctx.getStyles("actionLabel", stylesApi)}>{label}</span>
    );

  const defaultChild = (
    <>
      {leftSection && (
        <span
          {...ctx.getStyles("actionLeftSection", stylesApi)} // mod={{ position: 'left', dimmed: dimmedSections }}
        >
          {leftSection}
        </span>
      )}

      <div {...ctx.getStyles("actionDescription", stylesApi)}>
        {labelNode}
        <span>{description}</span>
      </div>

      {rightSection && (
        <span
          {...ctx.getStyles("actionRightSection", stylesApi)} // mod={{ position: 'right', dimmed: dimmedSections }}
        >
          {rightSection}
        </span>
      )}
    </>
  );

  return (
    <Link
      ref={ref}
      href={(href as string) || ""}
      data-action=""
      {...ctx.getStyles("action", { id, className, style, ...stylesApi })}
      onMouseDown={onMouseDown}
      onClick={(event) => {
        onClick?.(event);
        if (closeSpotlightOnTrigger ?? ctx.closeOnActionTrigger) {
          spotlightActions.close(ctx.store);
        }
      }}
      {...others}
    >
      {children || defaultChild}
    </Link>
  );
});
