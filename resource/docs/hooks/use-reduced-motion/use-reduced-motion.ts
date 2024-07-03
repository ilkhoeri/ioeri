import { useMediaQuery, UseMediaQueryOptions } from "@/resource/docs/hooks";

export function useReducedMotion(initialValue?: boolean, options?: UseMediaQueryOptions) {
  return useMediaQuery("(prefers-reduced-motion: reduce)", initialValue, options);
}
