"use client";
import React from "react";
import { createPortal } from "react-dom";
import { CommandProvider } from "./command-context";
import { useDidUpdate, useHotkeys, useRender, useHideScrollbar } from "@/modules/hooks";
import { useCommand, CommandStore, commandStore, commandActions, getHotkeys } from "./command-store";
import { Factory, factory, CSSProperties, useProps, StylesApiProps, useStyles } from "@/modules/factory";

import classes from "./command-styles";

export type CommandStylesNames =
  | "overlay"
  | "content"
  | "searchWrap"
  | "search"
  | "actionBody"
  | "actionsList"
  | "actionsGroup"
  | "actionLabel"
  | "action"
  | "actionDescription"
  | "actionLeftSection"
  | "actionRightSection"
  | "empty"
  | "footer";

export interface CommandContentProps extends StylesApiProps<CommandContentFactory> {
  store?: CommandStore;
  query?: string;
  onQueryChange?(query: string): void;
  clearQueryOnClose?: boolean;
  shortcut?: string | string[] | null;
  tagsToIgnore?: string[];
  triggerOnContentEditable?: boolean;
  disabled?: boolean;
  onCommandOpen?(): void;
  onCommandClose?(): void;
  defaultOpen?: boolean;
  closeOnActionTrigger?: boolean;
  children?: React.ReactNode;
}

export type DetailsCommandContent = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  style?: CSSProperties;
};

export type CommandContentFactory = Factory<{
  ref: HTMLDivElement;
  props: CommandContentProps & DetailsCommandContent;
  stylesNames: CommandStylesNames;
  compound: true;
}>;

const defaultProps: Partial<CommandContentProps> = {
  store: commandStore,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  shortcut: "mod + K",
};

export const CommandContent = factory<CommandContentFactory>((_props, ref) => {
  const props = useProps("CommandContent", defaultProps, _props);
  const {
    store,
    children,
    query: baseQuery,
    onQueryChange,
    disabled,
    onCommandOpen,
    onCommandClose,
    closeOnActionTrigger,
    shortcut,
    tagsToIgnore,
    triggerOnContentEditable,
    clearQueryOnClose,
    defaultOpen,
    variant,
    vars,
    className,
    classNames,
    style,
    styles,
    unstyled,
    ...others
  } = props;

  const { open, query: storeQuery } = useCommand(store!);
  const query = baseQuery || storeQuery;
  const render = useRender(open);
  const setQuery = (q: string) => {
    onQueryChange?.(q);
    commandActions.setQuery(q, store!);
  };

  const getStyles = useStyles<CommandContentFactory>({
    name: "command",
    props,
    // @ts-ignore
    classes,
    className,
    classNames,
    style,
    styles,
    unstyled,
    ...others,
  });

  useHotkeys(getHotkeys(shortcut, store!), tagsToIgnore, triggerOnContentEditable);

  useHideScrollbar(render);

  useDidUpdate(() => {
    open ? onCommandOpen?.() : onCommandClose?.();
  }, [open]);

  const attrs = { "data-state": open ? "open" : "closed" };
  const rest = { ...others, ...attrs };

  if (typeof document === "undefined" || !render || disabled) return null;

  return createPortal(
    <CommandProvider value={{ setQuery, query, store: store!, closeOnActionTrigger, getStyles }}>
      <div {...attrs} onClick={() => commandActions.close(store!)} {...getStyles("overlay", { classNames, styles })} />
      <div ref={ref} {...rest} {...getStyles("content", { className, classNames, style, styles })}>
        {children}
      </div>
    </CommandProvider>,
    document.body,
  );
});
