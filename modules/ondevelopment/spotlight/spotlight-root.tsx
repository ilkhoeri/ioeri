"use client";
import React from "react";
import { Factory, factory } from "../factory";
import { useProps } from "../factory/use-props";
import { SpotlightProvider } from "./spotlight.context";
import { useSpotlight, SpotlightStore, spotlightStore, spotlightActions } from "./spotlight.store";
import { getHotkeys } from "./get-hotkeys";
import { StylesApiProps } from "../factory/styles-api.types";
import { useDidUpdate } from "../../hooks/use-did-update/use-did-update";
import { useHotkeys } from "../../hooks/use-hotkeys/use-hotkeys";
import { useStyles } from "../factory/use-styles/use-styles";
import { CSSProperties } from "../utils/record-types";

import classes from "./spotlight.module.css";

export type SpotlightRootStylesNames =
  | "root"
  | "searchWrap"
  | "search"
  | "actionsList"
  | "action"
  | "empty"
  | "footer"
  | "actionBody"
  | "actionLabel"
  | "actionDescription"
  | "actionLeftSection"
  | "actionRightSection"
  | "actionsGroup";

export interface SpotlightRootProps extends StylesApiProps<SpotlightRootFactory> {
  /** Spotlight store, can be used to create multiple instances of spotlight */
  store?: SpotlightStore;

  /** Controlled Spotlight search query */
  query?: string;

  /** Called when query changes */
  onQueryChange?(query: string): void;

  /** Determines whether the search query should be cleared when the spotlight is closed, `true` by default */
  clearQueryOnClose?: boolean;

  /** Keyboard shortcut or a list of shortcuts to trigger spotlight, `'mod + K'` by default */
  shortcut?: string | string[] | null;

  /** A list of tags which when focused will be ignored by shortcut, `['input', 'textarea', 'select']` by default */
  tagsToIgnore?: string[];

  /** Determines whether shortcut should trigger based in contentEditable, `false` by default */
  triggerOnContentEditable?: boolean;

  /** If set, spotlight will not be rendered */
  disabled?: boolean;

  /** Called when spotlight opens */
  onSpotlightOpen?(): void;

  /** Called when spotlight closes */
  onSpotlightClose?(): void;

  /** Forces opened state, useful for tests */
  forceOpened?: boolean;

  /** Determines whether spotlight should be closed when one of the actions is triggered, `true` by default */
  closeOnActionTrigger?: boolean;

  /** Spotlight content max-height. Ignored unless `scrollable` prop is set. `400` by default */
  maxHeight?: React.CSSProperties["maxHeight"];

  /** Determines whether the actions list should be scrollable. If not set, `maxHeight` is ignored, `false` by default */
  scrollable?: boolean;
  children?: React.ReactNode;
}

export type DetailsSpotlightRoot = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  style?: CSSProperties;
};

export type SpotlightRootFactory = Factory<{
  props: SpotlightRootProps & DetailsSpotlightRoot;
  ref: HTMLDivElement;
  stylesNames: SpotlightRootStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightRootProps> = {
  store: spotlightStore,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  shortcut: "mod + K",
  maxHeight: 400,
  scrollable: false,
};

export const SpotlightRoot = factory<SpotlightRootFactory>((_props, ref) => {
  const posprops = useProps("SpotlightRoot", defaultProps, _props);
  const {
    store,
    children,
    query,
    onQueryChange,
    classNames,
    disabled,
    onSpotlightOpen,
    onSpotlightClose,
    closeOnActionTrigger,
    styles,
    unstyled,
    shortcut,
    tagsToIgnore,
    triggerOnContentEditable,
    //
    clearQueryOnClose,
    forceOpened,
    maxHeight,
    scrollable,
    variant,
    vars,
    ...others
  } = posprops;
  const { className, style, id, ...rest } = others;

  const { opened, query: storeQuery } = useSpotlight(store!);
  const _query = query || storeQuery;
  const setQuery = (q: string) => {
    onQueryChange?.(q);
    spotlightActions.setQuery(q, store!);
  };

  const getStyles = useStyles<SpotlightRootFactory>({
    // classNamesPrefix:'spotlight',
    name: "spotlight",
    props: posprops,
    classes,
    classNames,
    styles,
    unstyled,
    className,
    style,
  });

  useHotkeys(getHotkeys(shortcut, store!), tagsToIgnore, triggerOnContentEditable);

  useDidUpdate(() => {
    opened ? onSpotlightOpen?.() : onSpotlightClose?.();
  }, [opened]);

  if (disabled) {
    return null;
  }

  // const cn = Array.isArray(className) ? className.join(" ") : className;

  return (
    <SpotlightProvider
      value={{
        setQuery,
        query: _query,
        store: store!,
        closeOnActionTrigger,
        getStyles,
      }}
    >
      <div
        ref={ref}
        data-spotlight="root"
        {...getStyles("root", { id, className, classNames, style, styles })}
        {...rest}
      >
        {children}
      </div>
    </SpotlightProvider>
  );
});
