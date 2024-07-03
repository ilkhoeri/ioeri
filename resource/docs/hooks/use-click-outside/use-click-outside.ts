import { useEffect } from "react";

const DEFAULTEVENTS = ["mousedown", "touchstart"];

export function useClickOutside(handler: () => void, refs: React.RefObject<HTMLElement>[], events: string[] = DEFAULTEVENTS) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const { target } = event;
      const shouldIgnore =
        target instanceof HTMLElement &&
        (target.hasAttribute("data-ignore-clickoutside") ||
          (!document.body.contains(target) && target.tagName !== "HTML"));
      const shouldTrigger = refs.every((ref) => ref.current && !ref.current.contains(target as Node));

      if (!shouldIgnore && shouldTrigger) {
        handler();
      }
    };
    // @ts-ignore
    events.forEach((event) => document.addEventListener(event, listener));
    return () => {
      // @ts-ignore
      events.forEach((event) => document.removeEventListener(event, listener));
    };
  }, [handler, refs, events]);
}
