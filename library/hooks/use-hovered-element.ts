"use client";

import { useState } from "react";

export function useHoveredElement() {
  const [hoveredElement, setHoveredElement] = useState<DOMRect | null>(null);

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredElement(rect);
  };

  const onMouseLeave = () => {
    setHoveredElement(null);
  };

  return { onMouseEnter, onMouseLeave, hovered: hoveredElement };
}
