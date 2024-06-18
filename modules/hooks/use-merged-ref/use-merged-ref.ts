import { useCallback, Ref, useRef, MutableRefObject } from "react";

type PossibleRef<T> = Ref<T> | MutableRefObject<T | null> | undefined;

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

export function createRefs<T, U extends string>(
  keys: U[],
  ref?: MutableRefObject<T | null>,
): { [K in U]: MutableRefObject<T | null> } {
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
    {} as { [K in U]: MutableRefObject<T | null> },
  );
}

export function useMergedRef<T>(...refs: PossibleRef<T>[]) {
  return useCallback(mergeRefs(...refs), refs);
}
