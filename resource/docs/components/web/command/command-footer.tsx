"use client";
import React from "react";
import { useCommandContext } from "./command-context";
import { Factory, factory, useProps, CompoundStylesApiProps, ElementProps } from "@/modules/factory";

export type CommandFooterStylesNames = "footer";

export interface CommandFooterProps extends CompoundStylesApiProps<CommandFooterFactory>, ElementProps<"div"> {}

export type CommandFooterFactory = Factory<{
  props: CommandFooterProps;
  ref: HTMLDivElement;
  stylesNames: CommandFooterStylesNames;
  compound: true;
}>;

const defaultProps: Partial<CommandFooterProps> = {};

export const CommandFooter = factory<CommandFooterFactory>((props, ref) => {
  const { id, className, classNames, style, styles, ...others } = useProps("CommandFooter", defaultProps, props);
  const ctx = useCommandContext();
  return <div ref={ref} {...ctx.getStyles("footer", { id, className, classNames, style, styles })} {...others} />;
});
