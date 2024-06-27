"use client";
import React from "react";
import { ElementProps } from "../factory/transit";
import { CompoundStylesApiProps } from "../factory/styles-api.types";
import { Factory, factory } from "../factory";
import { useProps } from "../factory/use-props";
import { useSpotlightContext } from "./spotlight.context";

export type SpotlightActionsGroupStylesNames = "actionsGroup";

export interface SpotlightActionsGroupProps
  extends CompoundStylesApiProps<SpotlightActionsGroupFactory>,
    ElementProps<"div"> {
  /** `Spotlight.Action` components */
  children?: React.ReactNode;
  /** Group label */
  label?: React.ReactNode;
}

export type SpotlightActionsGroupFactory = Factory<{
  props: SpotlightActionsGroupProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightActionsGroupStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightActionsGroupProps> = {};

export const SpotlightActionsGroup = factory<SpotlightActionsGroupFactory>((props, ref) => {
  const { id, className, classNames, style, styles, ...others } = useProps(
    "SpotlightActionsGroup",
    defaultProps,
    props,
  );
  const ctx = useSpotlightContext();

  return <div ref={ref} {...ctx.getStyles("actionsGroup", { id, className, style, classNames, styles })} {...others} />;
});
