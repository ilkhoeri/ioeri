type AttrState = "open" | "closed";
export function attributeState(element: HTMLElement, state: AttrState) {
  element.setAttribute("data-state", state as string);
}

export function setBodyProperty(scrollbarWidth: number) {
  const body = document.body;

  body.setAttribute("data-has-scroll", "true");
  body.style.setProperty("overflow", "hidden");
  body.style.setProperty("margin-right", "var(--set-has-scrollbar, var(--has-scrollbar))");
  body.style.setProperty("--has-scrollbar", `${scrollbarWidth}px`);
}

export function removeBodyProperty() {
  const body = document.body;

  body.removeAttribute("data-has-scroll");
  body.style.removeProperty("overflow");
  body.style.removeProperty("margin-right");
  body.style.removeProperty("--has-scrollbar");
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
