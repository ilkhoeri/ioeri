"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useOpenState } from "../../hooks/use-open-state/use-open-state";
import type { OpenStateOptions, DataOrigin } from "../../hooks/use-open-state/use-open-state";

interface OpenStateContextProps {
  state: string;
  defaultOpen?: boolean;
  clickOutsideToClose?: boolean;
  render: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => false | void;
  refs: Partial<Record<DataOrigin, React.MutableRefObject<HTMLElement | null>>>;
}

interface OpenStateProviderProps extends OpenStateOptions {
  children: ReactNode;
}

const OpenStateContext = createContext<OpenStateContextProps | undefined>(undefined);

export const OpenStateProvider: React.FC<OpenStateProviderProps> = ({ children, ...rest }) => {
  const value = useOpenState({ ...rest });
  return <OpenStateContext.Provider value={value}>{children}</OpenStateContext.Provider>;
};

export const useOpenStateContext = () => {
  const context = useContext(OpenStateContext);
  if (!context) {
    throw new Error("useOpenStateContext must be used within an OpenStateProvider");
  }
  return context;
};
