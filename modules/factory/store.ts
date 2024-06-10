import { useSyncExternalStore } from "react";

export type StoreSubscriber<Value> = (value: Value) => void;
type SetStateCallback<Value> = (value: Value) => Value;

export interface StoreValue<Value> {
  getState(): Value;
  setState(value: Value | SetStateCallback<Value>): void;
  updateState(value: Value | SetStateCallback<Value>): void;
  initialize(value: Value): void;
  subscribe(callback: StoreSubscriber<Value>): () => void;
}

export type StoreValues<Store extends StoreValue<any>> = ReturnType<Store["getState"]>;

export function createStore<Value extends Record<string, any>>(initialState: Value): StoreValue<Value> {
  let state = initialState;
  let initialized = false;
  const listeners = new Set<StoreSubscriber<Value>>();

  return {
    getState() {
      return state;
    },

    updateState(value) {
      state = typeof value === "function" ? value(state) : value;
    },

    setState(value) {
      this.updateState(value);
      listeners.forEach((listener) => listener(state));
    },

    initialize(value) {
      if (!initialized) {
        state = value;
        initialized = true;
      }
    },

    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
  };
}

export function useStore<Store extends StoreValue<any>>(store: Store) {
  return useSyncExternalStore<StoreValues<Store>>(
    store.subscribe,
    () => store.getState(),
    () => store.getState(),
  );
}
