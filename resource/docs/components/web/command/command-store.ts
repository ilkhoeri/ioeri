"use client";
import { HotkeyItem } from "@/modules/hooks";
import { clamp } from "@/modules/factory/factory-utils";
import { createStore, useStore, StoreValue } from "@/modules/factory/factory-store";
import type { CommandFilterFunction, CommandActionData, CommandActionGroupData, CommandActions } from "./command";

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
    open: false,
    empty: false,
    selected: -1,
    listId: "",
    query: "",
    registeredActions: new Set(),
  });

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
  const selected = actionsList?.querySelector<HTMLButtonElement>("[data-selected]");
  const actions = actionsList?.querySelectorAll<HTMLButtonElement>("[data-action]") ?? [];
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
  const selected = document.querySelector<HTMLButtonElement>(`#${state.listId} [data-selected]`);
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

export function getHotkeys(hotkeys: string | string[] | null | undefined, store: CommandStore): HotkeyItem[] {
  if (!hotkeys) return [];
  const open = () => commandActions.open(store);
  if (Array.isArray(hotkeys)) {
    return hotkeys.map((hotkey) => [hotkey, open]);
  }

  return [[hotkeys, open]];
}

export function isActionsGroup(item: CommandActionData | CommandActionGroupData): item is CommandActionGroupData {
  const _item = item as CommandActionGroupData;
  return _item.group !== undefined && Array.isArray(_item.actions);
}

export function limitActions(actions: CommandActions[], limit: number) {
  const result: CommandActions[] = [];
  if (!Array.isArray(actions)) return [];

  for (let i = 0; i < actions.length; i += 1) {
    const item = actions[i];

    if (result.length >= limit) return result;

    if (isActionsGroup(item)) {
      result.push({
        group: item.group,
        actions: limitActions(item.actions, limit - result.length) as CommandActionData[],
      });
    }

    if (!isActionsGroup(item)) {
      result.push(item);
    }
  }

  return result;
}
