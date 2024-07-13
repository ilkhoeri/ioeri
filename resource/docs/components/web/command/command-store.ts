"use client";
import { HotkeyItem } from "@/modules/hooks";
import { clamp } from "@/modules/factory/factory-utils";
import { CommandContentFactory } from "./command-content";
import { createStore, useStore, StoreValue } from "@/modules/factory/factory-store";
import { createSafeContext, CSSProperties, FactoryPayload, GetStylesApiOptions } from "@/modules/factory";

import type { CommandEmptyOrigin } from "./command-empty";
import type { CommandActionOrigin } from "./command-action";
import type { CommandFooterOrigin } from "./command-footer";
import type { CommandSearchOrigin } from "./command-search";
import type { CommandContentOrigin } from "./command-content";
import type { CommandActionsListOrigin } from "./command-actions-list";
import type { CommandActionsGroupOrigin } from "./command-actions-group";
import type { CommandFilterFunction, CommandActionData, CommandActionGroupData, CommandActions } from "./command";

export type CommandOrigin =
  | CommandContentOrigin
  | CommandActionOrigin
  | CommandActionsGroupOrigin
  | CommandActionsListOrigin
  | CommandEmptyOrigin
  | CommandFooterOrigin
  | CommandSearchOrigin;

export interface CommandState {
  open: boolean;
  selected: number;
  listId: string;
  query: string;
  empty: boolean;
  registeredActions: Set<string>;
}

export type CommandStore = StoreValue<CommandState>;

export const createCommandStore = () =>
  createStore<CommandState>({
    query: "",
    listId: "",
    open: false,
    empty: false,
    selected: -1,
    registeredActions: new Set(),
  });

export type GetStylesApi<Payload extends FactoryPayload> = (
  selector: NonNullable<Payload["stylesNames"]>,
  options?: GetStylesApiOptions,
) => {
  className: string;
  style: CSSProperties;
};

type CommandContextValue = {
  query: string;
  setQuery(query: string): void;
  getStyles: GetStylesApi<CommandContentFactory>;
  store: CommandStore;
  closeOnActionTrigger: boolean | undefined;
};

export const [CommandProvider, useCommandContext] = createSafeContext<CommandContextValue>(
  "Command component was not found in tree",
);

export const useCommand = (store: CommandStore) => useStore(store);

export function updateCommandStateAction(update: (state: CommandState) => Partial<CommandState>, store: CommandStore) {
  const state = store.getState();
  store.setState({ ...state, ...update(store.getState()) });
}

export function openCommandAction(store: CommandStore) {
  updateCommandStateAction(() => ({ open: true }), store);
}

export function closeCommandAction(store: CommandStore) {
  updateCommandStateAction(() => ({ open: false }), store);
}

export function toggleCommandAction(store: CommandStore) {
  updateCommandStateAction((state) => ({ open: !state.open }), store);
}

export function setSelectedAction(index: number, store: CommandStore) {
  store.updateState((state) => ({ ...state, selected: index }));
}

export function setListId(id: string, store: CommandStore) {
  store.updateState((state) => ({ ...state, listId: id }));
}

export function selectAction(index: number, store: CommandStore): number {
  const state = store.getState();
  const actionsList = document.getElementById(state.listId);
  const selected = actionsList?.querySelector<HTMLAnchorElement>("[data-selected]");
  const actions = actionsList?.querySelectorAll<HTMLAnchorElement>(`[data-command="action"]`) ?? [];
  const nextIndex = index === -1 ? actions.length - 1 : index === actions.length ? 0 : index;

  const selectedIndex = clamp(nextIndex, 0, actions.length - 1);
  selected?.removeAttribute("data-selected");
  actions[selectedIndex]?.scrollIntoView({ block: "nearest" });
  actions[selectedIndex]?.setAttribute("data-selected", "true");
  setSelectedAction(selectedIndex, store);

  return selectedIndex;
}

export function selectNextAction(store: CommandStore) {
  return selectAction(store.getState().selected + 1, store);
}

export function selectPreviousAction(store: CommandStore) {
  return selectAction(store.getState().selected - 1, store);
}

export function triggerSelectedAction(store: CommandStore) {
  const state = store.getState();
  const selected = document.querySelector<HTMLAnchorElement>(`#${state.listId} [data-selected]`);
  selected?.click();
}

export function registerAction(id: string, store: CommandStore) {
  const state = store.getState();
  state.registeredActions.add(id);
  return () => {
    state.registeredActions.delete(id);
  };
}

export function setQuery(query: string, store: CommandStore) {
  updateCommandStateAction(() => ({ query }), store);
  Promise.resolve().then(() => {
    selectAction(0, store);
    updateCommandStateAction(
      (state) => ({
        empty: (state.query.trim().length > 0 && state.registeredActions.size === 0) || false,
      }),
      store,
    );
  });
}

export function clearCommandState({ clearQuery }: { clearQuery: boolean | undefined }, store: CommandStore) {
  store.updateState((state) => ({
    ...state,
    selected: -1,
    query: clearQuery ? "" : state.query,
    empty: clearQuery ? false : state.empty,
  }));
}

export const commandActions = {
  open: openCommandAction,
  close: closeCommandAction,
  toggle: toggleCommandAction,
  updateState: updateCommandStateAction,
  setSelectedAction,
  setListId,
  selectAction,
  selectNextAction,
  selectPreviousAction,
  triggerSelectedAction,
  registerAction,
  setQuery,
  clearCommandState,
};

export function createCommand() {
  const store = createCommandStore();
  const actions = {
    open: () => openCommandAction(store),
    close: () => closeCommandAction(store),
    toggle: () => toggleCommandAction(store),
  };

  return [store, actions] as const;
}

export const [commandStore, command] = createCommand();
export const { open: openCommand, close: closeCommand, toggle: toggleCommand } = command;

function getKeywords(keywords: string | string[] | undefined) {
  if (Array.isArray(keywords)) {
    return keywords
      .map((keyword) => keyword.trim())
      .join(",")
      .toLowerCase()
      .trim();
  }

  if (typeof keywords === "string") {
    return keywords.toLowerCase().trim();
  }

  return "";
}

function getFlatActions(data: CommandActions[]) {
  return data.reduce<CommandActionData[]>((acc, item) => {
    if ("actions" in item) {
      return [...acc, ...item.actions.map((action) => ({ ...action, group: item.group }))];
    }

    return [...acc, item];
  }, []);
}

function flatActionsToGroups(data: CommandActionData[]) {
  const groups: Record<string, { pushed: boolean; data: CommandActionGroupData }> = {};
  const result: CommandActions[] = [];

  data.forEach((action) => {
    if (action.group) {
      if (!groups[action.group]) {
        groups[action.group] = { pushed: false, data: { group: action.group, actions: [] } };
      }

      groups[action.group].data.actions.push(action);

      if (!groups[action.group].pushed) {
        groups[action.group].pushed = true;
        result.push(groups[action.group].data);
      }
    } else {
      result.push(action);
    }
  });

  return result;
}

export const defaultFilter: CommandFilterFunction = (_query, data) => {
  const query = _query.trim().toLowerCase();
  const priorityMatrix: CommandActionData[][] = [[], []];
  const flatActions = getFlatActions(data);
  flatActions.forEach((item) => {
    if (item.label?.toLowerCase().includes(query)) {
      priorityMatrix[0].push(item);
    } else if (item.description?.toLowerCase().includes(query) || getKeywords(item.keywords).includes(query)) {
      priorityMatrix[1].push(item);
    }
  });

  return flatActionsToGroups(priorityMatrix.flat());
};

export const fuzzyFilter: CommandFilterFunction = (_query, data) => {
  const query = _query.trim().toLowerCase();
  const priorityMatrix: CommandActionData[][] = [[], [], []];
  const flatActions = getFlatActions(data);

  flatActions.forEach((item) => {
    if (item.label?.toLowerCase().includes(query)) {
      priorityMatrix[0].push(item);
    } else if (item.description?.toLowerCase().includes(query) || getKeywords(item.keywords).includes(query)) {
      priorityMatrix[1].push(item);
    }
  });

  if (priorityMatrix[0].length === 0 && priorityMatrix[1].length === 0) {
    const labels = flatActions.map((item) => item.label?.toLowerCase() || "");
    const closestLabel = fuzzySearch(query, labels);

    flatActions.forEach((item) => {
      if (item.label?.toLowerCase() === closestLabel) {
        priorityMatrix[2].push(item);
      }
    });
  }

  return flatActionsToGroups(priorityMatrix.flat());
};

export function fuzzySearch(query: string, terms: string[]): string {
  function fuzzy(text: string, query: string) {
    const normalizedQuery = query.trim().toLowerCase();
    const sanitizedQuery = normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, "");
    const regex = new RegExp(`\\b${sanitizedQuery.split("").join(".*")}\\b`, "i");
    return regex.test(text) || text.toLowerCase().includes(normalizedQuery);
  }

  const directMatch = terms.find((term) => fuzzy(term, query));
  if (directMatch) return directMatch;

  const sortedTerms = terms
    .map((term) => ({ term, distance: levenshteinDistance(term, query) }))
    .filter((item) => item.distance <= 4)
    .sort((a, b) => a.distance - b.distance);

  return sortedTerms[0]?.term ?? "";
}

export function levenshteinDistance(term: string, query: string): number {
  const matrix = Array.from({ length: query.length + 1 }, () => Array(term.length + 1).fill(0));

  for (let i = 0; i <= query.length; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= term.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= query.length; i++) {
    for (let j = 1; j <= term.length; j++) {
      if (query[i - 1] === term[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + 1);
      }
    }
  }

  return matrix[query.length][term.length];
}

export function getHotkeys(hotkeys: string | string[] | null | undefined, store: CommandStore): HotkeyItem[] {
  if (!hotkeys) return [];
  const open = () => commandActions.open(store);
  if (Array.isArray(hotkeys)) {
    return hotkeys.map((hotkey) => [hotkey, open]);
  }

  return [[hotkeys, open]];
}

export function actionsGroup(item: CommandActionData | CommandActionGroupData): item is CommandActionGroupData {
  const _item = item as CommandActionGroupData;
  return _item.group !== undefined && Array.isArray(_item.actions);
}

export function limitActions(actions: CommandActions[], limit: number) {
  const result: CommandActions[] = [];
  if (!Array.isArray(actions)) return [];

  for (let i = 0; i < actions.length; i += 1) {
    const item = actions[i];

    if (result.length >= limit) return result;

    if (actionsGroup(item)) {
      result.push({
        group: item.group,
        actions: limitActions(item.actions, limit - result.length) as CommandActionData[],
      });
    }

    if (!actionsGroup(item)) {
      result.push(item);
    }
  }

  return result;
}
