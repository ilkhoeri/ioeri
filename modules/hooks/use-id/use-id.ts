import React, { useState } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect/use-isomorphic-effect";

const __useId: () => string | undefined = (React as any)["useId".toString()] || (() => undefined);

export function useReactId() {
  const id = __useId();
  return id ? `ioeri-${id.replace(/:/g, "")}` : "";
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
