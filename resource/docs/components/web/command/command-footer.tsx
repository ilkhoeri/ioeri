"use client";
import React from "react";
import { useCommandContext } from "./command-store";
import { Factory, factory, useProps, CompoundStylesApiProps, ElementProps } from "@/modules/factory";

export type CommandFooterOrigin = "footer";

export interface CommandFooterProps extends CompoundStylesApiProps<CommandFooterFactory>, ElementProps<"div"> {}

export type CommandFooterFactory = Factory<{
  ref: HTMLDivElement;
  props: CommandFooterProps;
  stylesNames: CommandFooterOrigin;
  compound: true;
}>;

const defaultProps: Partial<CommandFooterProps> = {};

export const CommandFooter = factory<CommandFooterFactory>((props, ref) => {
  const { id, className, classNames, style, styles, ...others } = useProps("CommandFooter", defaultProps, props);
  const ctx = useCommandContext();
  return <div ref={ref} {...ctx.getStyles("footer", { id, className, classNames, style, styles })} {...others} />;
});
