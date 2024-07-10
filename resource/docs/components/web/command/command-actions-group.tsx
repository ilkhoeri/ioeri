"use client";
import React from "react";
import { useCommandContext } from "./command-store";
import { factory, useProps, CompoundStylesApiProps, ElementProps, Factory } from "@/modules/factory";

export type CommandActionsGroupOrigin = "actionsGroup" | "actionGroupLabel";

export interface CommandActionsGroupProps
  extends CompoundStylesApiProps<CommandActionsGroupFactory>,
    ElementProps<"div"> {
  children?: React.ReactNode;
  label?: React.ReactNode;
}

export type CommandActionsGroupFactory = Factory<{
  ref: HTMLDivElement;
  props: CommandActionsGroupProps;
  stylesNames: CommandActionsGroupOrigin;
  compound: true;
}>;

const defaultProps: Partial<CommandActionsGroupProps> = {};

export const CommandActionsGroup = factory<CommandActionsGroupFactory>((props, ref) => {
  const { id, className, classNames, style, styles, label, children, ...others } = useProps(
    "CommandActionsGroup",
    defaultProps,
    props,
  );
  const ctx = useCommandContext();

  return (
    <div
      ref={ref}
      data-label={typeof label === "string" ? label : undefined}
      {...ctx.getStyles("actionsGroup", { id, className, style, classNames, styles })}
      {...others}
    >
      {label && <div {...ctx.getStyles("actionGroupLabel", { classNames, styles })}>{label}</div>}
      {children}
    </div>
  );
});
