"use client";
import React from "react";
import { commandActions, useCommandContext } from "./command-store";

import { factory, useProps, CompoundStylesApiProps, ElementProps, Factory } from "@/modules/factory";

export type CommandActionsListOrigin = "actionsOrder" | "actionsList";

export interface CommandActionsListProps
  extends CompoundStylesApiProps<CommandActionsListFactory>,
    ElementProps<"div"> {
  loading?: boolean;
  loader?: React.ReactNode;
}

export type CommandActionsListFactory = Factory<{
  ref: HTMLDivElement;
  props: CommandActionsListProps;
  stylesNames: CommandActionsListOrigin;
  compound: true;
}>;

const defaultProps: Partial<CommandActionsListProps> = {};

export const CommandActionsList = factory<CommandActionsListFactory>((props, ref) => {
  const { id, className, classNames, style, styles, loading, loader, ...others } = useProps(
    "CommandActionsList",
    defaultProps,
    props,
  );
  const ctx = useCommandContext();
  const genId = `command-${React.useId().replace(/:/g, "")}`;
  const setId = id || genId;

  React.useEffect(() => {
    commandActions.setListId(setId, ctx.store);
    return () => commandActions.setListId("", ctx.store);
  }, [setId, ctx.store]);

  if (loading && loader) {
    return loader;
  }

  return (
    <div {...ctx.getStyles("actionsOrder", { id: setId, className, classNames, style, styles })}>
      <div ref={ref} {...ctx.getStyles("actionsList", { id, className, classNames, style, styles })} {...others} />
    </div>
  );
});
