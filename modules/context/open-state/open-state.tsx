"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useOpenState } from "../../hooks/use-open-state/use-open-state";
import type { UseOpenStateType, OriginState } from "../../hooks/use-open-state/use-open-state";

interface OpenStateContextProps<T> {
  dataState: string;
  defaultOpen?: boolean;
  clickOutsideToClose?: boolean;
  render: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
  onHandle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: () => void;
  refs: Partial<Record<OriginState, React.MutableRefObject<T | null>>>;
}

interface OpenStateProviderProps<T> extends UseOpenStateType<T> {
  children: ReactNode;
}

const OpenStateContext = createContext<OpenStateContextProps<HTMLElement> | undefined>(undefined);

export const OpenStateProvider: React.FC<OpenStateProviderProps<HTMLElement>> = ({ children, ...rest }) => {
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
