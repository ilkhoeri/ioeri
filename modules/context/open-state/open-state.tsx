"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useOpenState } from "../../hooks/use-open-state/use-open-state";
import type { UseOpenStateType } from "../../hooks/use-open-state/use-open-state";

interface OpenStateContextProps {
  dataState: string;
  defaultOpen?: boolean;
  render: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: () => void;
}

interface OpenStateProviderProps extends UseOpenStateType {
  children: ReactNode;
}

const OpenStateContext = createContext<OpenStateContextProps | undefined>(undefined);

export const OpenStateProvider: React.FC<OpenStateProviderProps> = ({ children, defaultOpen, ...rest }) => {
  const state = useOpenState({ ...rest });
  const value = { defaultOpen, ...state };
  return <OpenStateContext.Provider value={value}>{children}</OpenStateContext.Provider>;
};

export const useOpenStateContext = () => {
  const context = useContext(OpenStateContext);
  if (!context) {
    throw new Error("useOpenStateContext must be used within an OpenStateProvider");
  }
  return context;
};
