"use client";
import React from "react";
import { useUncontrolled } from "../../hooks";
import { Factory } from "../factory";
import { useProps } from "../factory/use-props";
import { factory } from "../factory/factory";
import { spotlightStore, spotlight } from "./spotlight.store";
import { SpotlightSearch, SpotlightSearchProps } from "./spotlight-search";
import { SpotlightActionsList } from "./spotlight-actions-list";
import { SpotlightAction, SpotlightActionProps } from "./spotlight-action";
import { SpotlightEmpty } from "./spotlight-empty";
import { SpotlightFooter } from "./spotlight-footer";
import { SpotlightActionsGroup } from "./spotlight-actions-group";
import { DetailsSpotlightRoot, SpotlightRoot, SpotlightRootProps, SpotlightRootStylesNames } from "./spotlight-root";
import { defaultSpotlightFilter } from "./default-spotlight-filter";
import { isActionsGroup } from "./is-actions-group";
import { limitActions } from "./limit-actions";
import { HighlightText } from "../highlight-text";
// import { getDefaultZIndex } from '../factory/transit';
// import classes from './spotlight.module.css';

export type SpotlightFilterFunction = (query: string, actions: SpotlightActions[]) => SpotlightActions[];

export interface SpotlightActionData extends SpotlightActionProps {
  id: string;
  group?: string;
}

export interface SpotlightActionGroupData {
  group: string;
  actions: SpotlightActionData[];
}

export type SpotlightActions = SpotlightActionData | SpotlightActionGroupData;

export type SpotlightStylesNames = SpotlightRootStylesNames;

export interface SpotlightProps extends SpotlightRootProps {
  /** Props passed down to the `Spotlight.Search` */
  searchProps?: SpotlightSearchProps;

  /** Actions data, passed down to `Spotlight.Action` component */
  actions: SpotlightActions[];

  /** Function to filter actions data based on search query, by default actions are filtered by title, description and keywords */
  filter?: SpotlightFilterFunction;

  /** Message displayed when none of the actions match given `filter` */
  nothingFound?: React.ReactNode;

  /** Determines whether search query should be highlighted in action label, `false` by default */
  highlightQuery?: boolean;

  /** Maximum number of actions displayed at a time, `Infinity` by default */
  limit?: number;
}

export type SpotlightFactory = Factory<{
  props: SpotlightProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightStylesNames;
  staticComponents: {
    Root: typeof SpotlightRoot;
    Search: typeof SpotlightSearch;
    ActionsList: typeof SpotlightActionsList;
    Action: typeof SpotlightAction;
    Highlight: typeof HighlightText;
    Empty: typeof SpotlightEmpty;
    Footer: typeof SpotlightFooter;
    ActionsGroup: typeof SpotlightActionsGroup;
    open: typeof spotlight.open;
    close: typeof spotlight.close;
    toggle: typeof spotlight.toggle;
  };
}>;

const defaultProps: Partial<SpotlightProps> = {
  limit: Infinity,
  store: spotlightStore,
  filter: defaultSpotlightFilter,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  shortcut: "mod + K",
  highlightQuery: false,
};

type SpotlightType = SpotlightFactory & DetailsSpotlightRoot;

export const Spotlight = factory<SpotlightType>((_props, ref) => {
  const posprops = useProps("Spotlight", defaultProps, _props);
  const { searchProps, filter, query, onQueryChange, actions, nothingFound, highlightQuery, limit, ...others } =
    posprops;

  const [_query, setQuery] = useUncontrolled({
    value: query,
    defaultValue: "",
    finalValue: "",
    onChange: onQueryChange,
  });

  const filteredActions = limitActions(filter!(_query, actions), limit!).map((item) => {
    if (isActionsGroup(item)) {
      const items = item.actions.map(({ id, ...actionData }) => (
        <SpotlightAction key={id} highlightQuery={highlightQuery} {...actionData} />
      ));

      return (
        <SpotlightActionsGroup key={item.group} label={item.group}>
          {items}
        </SpotlightActionsGroup>
      );
    }

    return <SpotlightAction key={item.id} highlightQuery={highlightQuery} {...item} />;
  });

  return (
    <>
      <SpotlightRoot {...others} query={_query} onQueryChange={setQuery} ref={ref}>
        <SpotlightSearch {...searchProps} />
        <SpotlightActionsList>
          {filteredActions}
          {filteredActions.length === 0 && nothingFound && <SpotlightEmpty>{nothingFound}</SpotlightEmpty>}
        </SpotlightActionsList>
      </SpotlightRoot>
    </>
  );
});

Spotlight.Search = SpotlightSearch;
Spotlight.ActionsList = SpotlightActionsList;
Spotlight.Action = SpotlightAction;
Spotlight.Highlight = HighlightText;
Spotlight.Empty = SpotlightEmpty;
Spotlight.ActionsGroup = SpotlightActionsGroup;
Spotlight.Footer = SpotlightFooter;
Spotlight.Root = SpotlightRoot;
Spotlight.open = spotlight.open;
Spotlight.close = spotlight.close;
Spotlight.toggle = spotlight.toggle;
