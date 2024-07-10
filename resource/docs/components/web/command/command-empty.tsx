"use client";
import React from "react";
import { useCommandContext } from "./command-store";
import { Factory, factory, useProps, CompoundStylesApiProps, ElementProps } from "@/modules/factory";

export type CommandEmptyOrigin = "empty";

export interface CommandEmptyProps extends CompoundStylesApiProps<CommandEmptyFactory>, ElementProps<"div"> {}

export type CommandEmptyFactory = Factory<{
  ref: HTMLDivElement;
  props: CommandEmptyProps;
  stylesNames: CommandEmptyOrigin;
  compound: true;
}>;

const defaultProps: Partial<CommandEmptyProps> = {};

export const CommandEmpty = factory<CommandEmptyFactory>((props, ref) => {
  const { id, className, classNames, style, styles, ...others } = useProps("CommandEmpty", defaultProps, props);

  const ctx = useCommandContext();

  return <div ref={ref} {...ctx.getStyles("empty", { id, classNames, styles, className, style })} {...others} />;
});
