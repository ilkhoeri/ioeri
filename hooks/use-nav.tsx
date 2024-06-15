"use client";
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import {
  useElementSize as useHeaderSize,
  useElementSize as useFooterSize,
  useOpenState,
  useMediaQuery,
} from "@/modules";

import type { UseOpenStateType } from "@/modules";

interface MediaQuery {
  /**
   * ```js
   * const query = useMediaQuery(`(max-width: ${mediaQuery})`)
   * ```
   * @default 768 */
  mediaQuery?: number;
}

interface NavContextProps extends MediaQuery {
  render: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: () => void;
  minQuery: boolean | undefined;
  maxQuery: boolean | undefined;
  ref: React.MutableRefObject<any>;
}

interface NavProviderProps extends UseOpenStateType, MediaQuery {
  children: ReactNode;
}

const NavContext = createContext<NavContextProps | undefined>(undefined);

export const NavProvider: React.FC<NavProviderProps> = ({ children, mediaQuery = 768, ...rest }) => {
  const state = useOpenState({ ...rest });
  const { open } = state;

  const minQuery = useMediaQuery(`(min-width: ${mediaQuery}px)`);
  const maxQuery = useMediaQuery(`(max-width: ${mediaQuery - 1}px)`);

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
