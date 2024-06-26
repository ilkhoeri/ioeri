"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";

export interface IdDepth {
  id: string;
  depth: number;
}

interface ContextProps {
  ids: IdDepth[];
  addIds: (idDepth: IdDepth) => void;
  resetIds: () => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [idSet, setIdSet] = useState<Set<IdDepth>>(new Set());

  const addIds = (idDepth: IdDepth) => {
    setIdSet((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.add(idDepth);
      return newSet;
    });
  };

  const resetIds = useCallback(() => {
    setIdSet(new Set());
  }, []);

  const value = { ids: Array.from(idSet), addIds, resetIds };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const ChildWrapper = ({ children }: { children: React.ReactNode }) => {
  const { ids, addIds, resetIds } = useAppContext();

  useEffect(() => {
    resetIds(); // Reset ids when navigating
  }, [resetIds]);

  useEffect(() => {
    collectIds(
      children,
      addIds,
      ids.map((idDepth) => idDepth.id),
    );
  }, [children, addIds, ids]);

  return <>{children}</>;
};

const collectIds = (
  children: React.ReactNode,
  addIds: (idDepth: IdDepth) => void,
  existingIds: string[],
  depth = 0,
) => {
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.props.id && !existingIds.includes(child.props.id)) {
        addIds({ id: child.props.id, depth });
      }
      if (child.props.children) {
        collectIds(child.props.children, addIds, existingIds, depth + 1);
      }
    }
  });
};
