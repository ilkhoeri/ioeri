"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import {
  useElementSize as useHeaderSize,
  useElementSize as useFooterSize,
  useOpenState,
  useMediaQuery,
} from "@/resource/docs";

import type { UseOpenStateType } from "@/resource/docs";

interface MediaQuery {
  mediaQuery?: number;
}

interface NavContextProps extends MediaQuery, UseOpenStateType<HTMLElement> {
  defaultOpen?: boolean;
  render: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
  onHandle: () => void;
  onStartEnter: () => void;
  onEndLeave: () => void;
  onKeyDown: () => void;
  minQuery: boolean | undefined;
  maxQuery: boolean | undefined;
  homeQuery: boolean | undefined;
  pathname: string;
}

interface NavProviderProps extends UseOpenStateType<HTMLElement>, MediaQuery {
  children: ReactNode;
}

const NavContext = createContext<NavContextProps | undefined>(undefined);

export const NavProvider: React.FC<NavProviderProps> = ({ children, mediaQuery = 768, ...rest }) => {
  const pathname = usePathname();
  const state = useOpenState({ ...rest });
  const { open } = state;

  const minQuery = useMediaQuery(`(min-width: ${mediaQuery}px)`);
  const maxQuery = useMediaQuery(`(max-width: ${mediaQuery - 1}px)`);

  const homeQuery = pathname === "/" && minQuery;

  useEffect(() => {
    const body = document.body;

    if (open && maxQuery) {
      body.style.setProperty("overflow", "hidden");
    } else {
      body.style.removeProperty("overflow");
    }

    return () => {
      if (open && maxQuery) {
        body.style.removeProperty("overflow");
      }
    };
  }, [open, maxQuery]);

  const value = {
    mediaQuery,
    minQuery,
    maxQuery,
    homeQuery,
    pathname,
    ...state,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export const useNavContext = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNavContext must be used within an NavProvider");
  }
  return context;
};
