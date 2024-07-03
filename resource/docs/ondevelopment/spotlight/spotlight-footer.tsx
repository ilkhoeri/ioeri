"use client";
import React from "react";
import { ElementProps } from "../factory/transit";
import { CompoundStylesApiProps } from "../factory/styles-api.types";
import { Factory, factory } from "../factory";
import { useProps } from "../factory/use-props";
import { useSpotlightContext } from "./spotlight.context";

export type SpotlightFooterStylesNames = "footer";

export interface SpotlightFooterProps extends CompoundStylesApiProps<SpotlightFooterFactory>, ElementProps<"div"> {}

export type SpotlightFooterFactory = Factory<{
  props: SpotlightFooterProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightFooterStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightFooterProps> = {};

export const SpotlightFooter = factory<SpotlightFooterFactory>((props, ref) => {
  const { id, className, classNames, style, styles, ...others } = useProps("SpotlightFooter", defaultProps, props);
  const ctx = useSpotlightContext();
  return <div ref={ref} {...ctx.getStyles("footer", { id, className, classNames, style, styles })} {...others} />;
});
