"use client";
import React from "react";
import { useCommandContext } from "./command-context";
import { Factory, factory, useProps, CompoundStylesApiProps, ElementProps } from "@/modules/factory";

export type CommandEmptyStylesNames = "empty";

export interface CommandEmptyProps extends CompoundStylesApiProps<CommandEmptyFactory>, ElementProps<"div"> {}

export type CommandEmptyFactory = Factory<{
  props: CommandEmptyProps;
  ref: HTMLDivElement;
  stylesNames: CommandEmptyStylesNames;
  compound: true;
}>;

const defaultProps: Partial<CommandEmptyProps> = {};

export const CommandEmpty = factory<CommandEmptyFactory>((props, ref) => {
  const { id, className, classNames, style, styles, ...others } = useProps("CommandEmpty", defaultProps, props);

  const ctx = useCommandContext();

  return <div ref={ref} {...ctx.getStyles("empty", { id, classNames, styles, className, style })} {...others} />;
});
