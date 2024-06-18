import { useMediaQuery, UseMediaQueryOptions } from "@/modules/hooks";

export function useReducedMotion(initialValue?: boolean, options?: UseMediaQueryOptions) {
  return useMediaQuery("(prefers-reduced-motion: reduce)", initialValue, options);
}
