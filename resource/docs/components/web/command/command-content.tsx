"use client";
import React from "react";
import { createPortal } from "react-dom";
import { CommandProvider } from "./command-store";
import { useDidUpdate, useHotkeys, useRender, useFixed } from "@/modules/hooks";
import { Factory, factory, CSSProperties, useProps, StylesApiProps, useStyles } from "@/modules/factory";
import { useCommand, CommandStore, commandStore, commandActions, getHotkeys, CommandOrigin } from "./command-store";

export type CommandContentOrigin = "overlay" | "content";

import classes from "./command-styles";
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
  modal?: boolean;
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
  stylesNames: CommandOrigin;
  compound: true;
}>;

const defaultProps: Partial<CommandContentProps> = {
  store: commandStore,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  shortcut: "mod + K",
  modal: true,
};

export const CommandContent = factory<CommandContentFactory>((_props, ref) => {
  const props = useProps("CommandContent", defaultProps, _props);
  const {
    vars,
    store,
    modal,
    style,
    styles,
    variant,
    children,
    disabled,
    unstyled,
    shortcut,
    className,
    classNames,
    defaultOpen,
    tagsToIgnore,
    onCommandOpen,
    onQueryChange,
    onCommandClose,
    query: baseQuery,
    clearQueryOnClose,
    closeOnActionTrigger,
    triggerOnContentEditable,
    ...others
  } = props;

  const { open, query: storeQuery } = useCommand(store!);

  const query = baseQuery || storeQuery;
  const render = useRender(open);
  useFixed(!open ? render : open);

  const setQuery = (q: string) => {
    onQueryChange?.(q);
    commandActions.setQuery(q, store!);
  };

  const getStyles = useStyles<CommandContentFactory>({
    name: "command",
    props,
    style,
    styles,
    unstyled,
    className,
    classNames,
    // @ts-ignore
    classes,
    ...others,
  });
  useHotkeys(getHotkeys(shortcut, store!), tagsToIgnore, triggerOnContentEditable);

  useDidUpdate(() => {
    open ? onCommandOpen?.() : onCommandClose?.();
  }, [open]);

  const onClose = () => {
    commandActions.close(store!);
    clearQueryOnClose && setQuery("");
    commandActions.clearCommandState({ clearQuery: clearQueryOnClose }, store!);
  };

  const attrs: Record<string, string | undefined> = {
    "data-modal": !modal ? "false" : undefined,
    "data-state": defaultOpen ? "opened" : open ? "open" : "closed",
  };
  const rest = { ...others, ...attrs };

  if (typeof document === "undefined" || !(render || defaultOpen) || disabled) return null;

  const content = (
    <CommandProvider value={{ setQuery, query, store: store!, closeOnActionTrigger, getStyles }}>
      <div onClick={onClose} {...getStyles("overlay", { classNames, styles })} {...attrs} />
      <div ref={ref} {...getStyles("content", { className, classNames, style, styles })} {...rest}>
        {children}
      </div>
    </CommandProvider>
  );

  return modal ? createPortal(content, document.body) : content;
});
