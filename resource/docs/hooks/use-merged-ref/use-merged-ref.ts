import { useCallback, Ref, useRef, ForwardedRef, RefObject, MutableRefObject } from "react";

export type PossibleRef<T> = Ref<T> | MutableRefObject<T | null> | undefined;

export function assignRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    (ref as MutableRefObject<T>).current = value;
  }
}

export function mergeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T | null) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}

type Refs<T> = RefObject<T> | MutableRefObject<T>;
interface CreateRefsOptions<F, K extends string> {
  ref?: ForwardedRef<F>;
  assignRef?: K;
}

export function createRefsX<T, U extends string, F = T>(keys: U[], ...refs: PossibleRef<F>[]): { [K in U]: Refs<T> } {
  return keys.reduce(
    (acc, key) => {
      const currentRef = useRef<T>(null);
      acc[key] = refs !== undefined ? { current: null } : currentRef;
      if (refs) {
        const mergedRef = (node: T | null) => {
          if (node) refs.forEach((ref) => assignRef(ref, node as F));
        };
        (acc[key] as any) = { current: null, ...mergedRef };
      }
      return acc;
    },
    {} as { [K in U]: Refs<T> },
  );
}

export function createRefsY<T, U extends string, F = T>(keys: U[], ...refs: PossibleRef<F>[]): { [K in U]: Refs<F> } {
  return keys.reduce(
    (acc, key) => {
      const currentRef = useRef<F>(null);
      acc[key] = currentRef;

      if (refs.length > 0) {
        const mergedRef = (node: T | null) => {
          if (node !== null && node !== undefined) {
            refs.forEach((ref) => assignRef(ref, node as F));
          }
        };
        (acc[key] as any) = { current: null, ...mergedRef };
      }

      return acc;
    },
    {} as { [K in U]: Refs<F> },
  );
}

export function createRefsZ<T, U extends string>(keys: U[], ref?: ForwardedRef<T>): { [K in U]: Refs<T> } {
  return keys.reduce(
    (acc, key) => {
      const currentRef = useRef<T>(null);
      acc[key] = ref !== undefined ? { current: null } : currentRef;
      if (ref !== undefined) {
        const mergedRef = mergeRefs(currentRef, ref);
        (acc[key] as any) = { current: null, ...mergedRef };
      }
      return acc;
    },
    {} as { [K in U]: Refs<T> },
  );
}

export function createRefs<F, U extends string>(keys: U[]): { [K in U]: React.RefObject<F> } {
  return keys.reduce(
    (acc, key) => {
      acc[key] = useRef<F>(null);
      return acc;
    },
    {} as { [K in U]: React.RefObject<F> },
  );
}

export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
  return useCallback(mergeRefs(...refs), refs);
}
