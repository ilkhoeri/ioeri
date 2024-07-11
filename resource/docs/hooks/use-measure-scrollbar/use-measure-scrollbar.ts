import { useEffect, useState } from "react";

export function useMeasureScrollbar(
  render: boolean = false,
  { has = true, modal = true } = {},
): [boolean, number] {
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const measureScrollbar = () => {
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.position = "absolute";
      outer.style.zIndex = "-9999px";
      outer.style.overflow = "scroll";

      document.body.appendChild(outer);
      const width = outer.offsetWidth - outer.clientWidth;
      document.body.removeChild(outer);
      setScrollbarWidth(width);
      setHasScrollbar(width > 0);
    };

    measureScrollbar();
    window.addEventListener("resize", measureScrollbar);
    return () => {
      window.removeEventListener("resize", measureScrollbar);
    };
  }, [hasScrollbar]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (render) {
      if (modal && has) {
        attachBodyProperty(scrollbarWidth);
        applyStateEffect(true);
      }
    } else {
      if (modal && has) {
        detachBodyProperty();
        applyStateEffect(false);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (modal && has) {
        detachBodyProperty();
        applyStateEffect(false);
      }
    };
  }, [render, modal, has, scrollbarWidth]);

  return [hasScrollbar, scrollbarWidth] as const;
}

export function attachBodyProperty(scrollbarWidth: number) {
  const body = document.body;
  body.setAttribute("data-has-scroll", "true");
  body.style.setProperty("overflow", "hidden");
  body.style.setProperty("margin-right", "var(--set-has-scrollbar, var(--has-scrollbar))");
  body.style.setProperty("--has-scrollbar", `${scrollbarWidth}px`);
}

export function detachBodyProperty() {
  const body = document.body;
  body.removeAttribute("data-has-scroll");
  body.style.removeProperty("overflow");
  body.style.removeProperty("margin-right");
  body.style.removeProperty("--has-scrollbar");
}

type State = "opened" | "open" | "closed";

export function attributeState(element: HTMLElement, state: State) {
  element.setAttribute("data-state", state as string);
}

export function applyStateEffect(apply: boolean) {
  const elements = document.querySelectorAll("[data-has-scroll]");

  elements.forEach((element: Element) => {
    if (element instanceof HTMLElement) {
      if (apply) {
        element.style.marginRight = "var(--set-has-scrollbar, var(--has-scrollbar))";
      } else {
        element.style.removeProperty("margin-right");
      }
    }
  });
}
