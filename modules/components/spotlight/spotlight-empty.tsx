"use client";
import React from "react";
import { ElementProps } from "../../factory/transit";
import { CompoundStylesApiProps } from "../../factory/styles-api.types";
import { Factory, factory } from "../../factory";
import { useProps } from "../../factory/use-props";
import { useSpotlightContext } from "./spotlight.context";

export type SpotlightEmptyStylesNames = "empty";

export interface SpotlightEmptyProps extends CompoundStylesApiProps<SpotlightEmptyFactory>, ElementProps<"div"> {}

export type SpotlightEmptyFactory = Factory<{
  props: SpotlightEmptyProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightEmptyStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightEmptyProps> = {};

export const SpotlightEmpty = factory<SpotlightEmptyFactory>((props, ref) => {
  const { id, className, classNames, style, styles, ...others } = useProps("SpotlightEmpty", defaultProps, props);

  const ctx = useSpotlightContext();

  return <div ref={ref} {...ctx.getStyles("empty", { id, classNames, styles, className, style })} {...others} />;
});
