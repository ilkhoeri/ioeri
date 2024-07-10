"use client";
import React from "react";
import { CommandEmpty } from "./command-empty";
import { CommandFooter } from "./command-footer";
import { useUncontrolled } from "@/modules/hooks";
import { CommandActionsList } from "./command-actions-list";
import { CommandActionsGroup } from "./command-actions-group";
import { Factory, factory, useProps } from "@/modules/factory";
import { CommandSearch, CommandSearchProps } from "./command-search";
import { CommandAction, CommandActionProps, CommandHighlight } from "./command-action";
import { DetailsCommandContent, CommandContent, CommandContentProps } from "./command-content";
import { commandStore, command, isActionsGroup, limitActions, defaultFilter, CommandOrigin } from "./command-store";

export interface CommandActionData extends CommandActionProps {
  id: string;
  group?: string;
}
export interface CommandActionGroupData {
  group: string;
  actions: CommandActionData[];
}

export type CommandFilterFunction = (query: string, actions: CommandActions[]) => CommandActions[];
export type CommandActions = CommandActionData | CommandActionGroupData;
type CommandType = CommandFactory & DetailsCommandContent;

export interface CommandProps extends CommandContentProps {
  searchProps?: CommandSearchProps;
  actions: CommandActions[];
  filter?: CommandFilterFunction;
  nothingFound?: React.ReactNode;
  highlightQuery?: boolean;
  limit?: number;
}
export type CommandFactory = Factory<{
  props: CommandProps;
  ref: HTMLDivElement;
  stylesNames: CommandOrigin;
  staticComponents: {
    Content: typeof CommandContent;
    Search: typeof CommandSearch;
    ActionsList: typeof CommandActionsList;
    Action: typeof CommandAction;
    Highlight: typeof CommandHighlight;
    Empty: typeof CommandEmpty;
    Footer: typeof CommandFooter;
    ActionsGroup: typeof CommandActionsGroup;
    open: typeof command.open;
    close: typeof command.close;
    toggle: typeof command.toggle;
  };
}>;

const defaultProps: Partial<CommandProps> = {
  limit: Infinity,
  store: commandStore,
  filter: defaultFilter,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  highlightQuery: false,
  shortcut: "mod + K",
  nothingFound: "Nothing found...",
};

export const Command = factory<CommandType>((_props, ref) => {
  const props = useProps("Command", defaultProps, _props);
  const { searchProps, filter, query, onQueryChange, actions, nothingFound, highlightQuery, limit, ...others } = props;

  const [_query, setQuery] = useUncontrolled({
    value: query,
    finalValue: "",
    defaultValue: "",
    onChange: onQueryChange,
  });

  const filteredActions = limitActions(filter!(_query, actions), limit!).map((item) => {
    if (isActionsGroup(item)) {
      const items = item.actions.map(({ id, ...actionData }) => (
        <CommandAction key={id} highlightQuery={highlightQuery} {...actionData} />
      ));

      return (
        <CommandActionsGroup key={item.group} label={item.group}>
          {items}
        </CommandActionsGroup>
      );
    }

    return <CommandAction key={item.id} highlightQuery={highlightQuery} {...item} />;
  });

  return (
    <CommandContent {...others} query={_query} onQueryChange={setQuery} ref={ref}>
      <CommandSearch {...searchProps} />
      <CommandActionsList>
        {filteredActions}
        {filteredActions.length === 0 && nothingFound && <CommandEmpty>{nothingFound}</CommandEmpty>}
      </CommandActionsList>
    </CommandContent>
  );
});

Command.Content = CommandContent;
Command.Search = CommandSearch;
Command.ActionsList = CommandActionsList;
Command.Action = CommandAction;
Command.Highlight = CommandHighlight;
Command.Empty = CommandEmpty;
Command.ActionsGroup = CommandActionsGroup;
Command.Footer = CommandFooter;
Command.open = command.open;
Command.close = command.close;
Command.toggle = command.toggle;
