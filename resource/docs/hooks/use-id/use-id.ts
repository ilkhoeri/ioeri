import React, { useLayoutEffect, useRef, useState } from "react";
import { useIsomorphicEffect } from "@/modules/hooks";

const __useId: () => string | undefined = (React as any)["useId".toString()] || (() => undefined);

export function useReactId() {
  const id = __useId();
  return id ? `${id.replace(/:/g, "")}` : "";
}

function randomId() {
  return `${Math.random().toString(36).slice(2, 11)}`;
}

export function useId(staticId?: string) {
  const reactId = useReactId();
  const [uuid, setUuid] = useState(reactId);

  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);

  if (typeof staticId === "string") {
    return staticId;
  }

  if (typeof window === "undefined") {
    return reactId;
  }

  return uuid;
}

function generateHierarchyId<T extends HTMLElement = HTMLElement>(el: T) {
  let id = "";
  let total = 0;
  let currentElement: HTMLElement | null = el;
  const indices: number[] = [];

  while (currentElement) {
    const parentElement: HTMLElement | null = currentElement.parentElement;
    if (parentElement) {
      const children: HTMLElement[] = Array.from(parentElement.children) as HTMLElement[];
      const index = children.indexOf(currentElement);

      total += index;
      indices.unshift(index);

      id = `${index}-${id}`;
    }
    currentElement = parentElement;
  }

  const hierarchyId = indices.join("-");
  return `${total}-${hierarchyId}`;
}

export function useHierarchyId<T extends HTMLElement = any>(el: T | null) {
  const [id, setId] = useState<string>("");

  useIsomorphicEffect(() => {
    if (el) {
      const id = generateHierarchyId(el);
      setId(id);
    }
  }, [el]);

  return id;
}

const generateHierarchyIdX = (element: HTMLElement | null): string => {
  if (!element) return "";
  let path = [];
  let current: HTMLElement | null = element;

  while (current && current.parentElement) {
    const childrenArray = Array.from(current.parentElement.children);
    const index = childrenArray.indexOf(current);
    path.unshift(index + 1);
    current = current.parentElement;
  }

  return path.join("-");
};
