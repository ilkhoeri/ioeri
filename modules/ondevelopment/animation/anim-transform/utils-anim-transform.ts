import type { TransformProps } from "./types-anim-transform";

export const observeIntersection = (
  ref: React.RefObject<HTMLElement>,
  { hold = 0.1, opacity, withoutOpacity, transform }: TransformProps,
) => {
  const windowHeight = window.innerHeight;
  const threshold = windowHeight * hold;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const targetElement = entry.target as HTMLElement;
        targetElement.style.setProperty(
          "--opacity-after",
          entry.isIntersecting && !withoutOpacity ? String(opacity?.after || "1") : null,
        );
        targetElement.style.setProperty(
          "--transform-after",
          entry.isIntersecting ? transform?.after || "scale(1)" : null,
        );
        targetElement.setAttribute("data-transform", entry.isIntersecting ? "true" : "false");
      });
    },
    { rootMargin: `0px 0px -${threshold}px 0px` },
  );

  const currentRef = ref.current;

  if (currentRef) {
    observer.observe(currentRef);
  }

  return () => {
    if (currentRef) {
      observer.unobserve(currentRef);
    }
  };
};

export const styletransformVars = ({
  transition,
  transform,
  opacity,
  withoutOpacity,
}: TransformProps): Record<string, string | any> => {
  const styleVars: Record<string, string | any> = {
    transformOrigin: transform?.origin || "center",
    "--transform-before": transform?.before || "scale(0)",
    transform: "var(--transform-after, var(--transform-before))",
    transition: (typeof transition === "string" && transition) || "opacity 0.5s ease 0.3s, transform 1s ease",

    transformStyle: transform?.style,
    transformBox: transform?.box,
  };

  if (!withoutOpacity) {
    styleVars["--opacity-before"] = opacity?.before || "0";
    styleVars.opacity = "var(--opacity-after, var(--opacity-before))";
  }

  if (typeof transition === "object") {
    const { behavior, delay, duration, property, timingFunction } = transition;
    styleVars.transitionBehavior = behavior || "";
    styleVars.transitionDelay = typeof delay === "number" ? `${delay}s` : delay || "";
    styleVars.transitionDuration = duration || "";
    styleVars.transitionProperty = property || "";
    styleVars.transitionTimingFunction = timingFunction || "";
  }

  return styleVars;
};
