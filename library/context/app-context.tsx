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

  const addIds = useCallback((idDepth: IdDepth) => {
    setIdSet((prevSet) => {
      if (!Array.from(prevSet).some((item) => item.id === idDepth.id)) {
        const newSet = new Set(prevSet);
        newSet.add(idDepth);
        return newSet;
      }
      return prevSet;
    });
  }, []);

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
    const elements = document.querySelectorAll("[id]");
    const newIds: IdDepth[] = [];
    elements.forEach((element) => {
      const depth = getDepth(element); // Calculate the depth
      if (element.id && !newIds.some((idDepth) => idDepth.id === element.id)) {
        newIds.push({ id: element.id, depth });
      }
    });
    newIds.forEach((idDepth) => addIds(idDepth));
  }, [children, addIds]);

  return <>{children}</>;
};

const getDepth = (element: Element): number => {
  let depth = 0;
  let parent = element.parentElement;
  while (parent) {
    if (parent.id) {
      depth++;
    }
    parent = parent.parentElement;
  }
  return depth;
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
