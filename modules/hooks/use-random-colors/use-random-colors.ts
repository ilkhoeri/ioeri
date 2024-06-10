"use client";

import { useEffect, useState } from "react";

/**
 * ```js
 * // usage
function variables(): StyleObject {
  const vars: StyleObject = {};
  vars["--text-gradient-from"] = getRandomColor();
  vars["--text-gradient-to"] = getRandomColor();
  return vars;
}
 * ```
 */
export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * ```js
 * // usage
 * const gradientColors = useRandomColors(["#000", "#000", "#000"], 5000);
  function variables(): StyleObject {
    const vars: StyleObject = {};
    vars["--text-gradient-from"] = gradientColors[0];
    vars["--text-gradient-via"] = gradientColors[1];
    vars["--text-gradient-to"] = gradientColors[2];
    return vars;
  }
 * ```
 * @param initialColors 
 * @param intervalTime 
 * @returns 
 */
export function useRandomColors(initialColors: string[], intervalTime: number) {
  const [colors, setColors] = useState<string[]>(initialColors);

  useEffect(() => {
    const interval = setInterval(() => {
      const newColors = initialColors.map(() => getRandomColor());
      setColors(newColors);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [initialColors, intervalTime]);

  return colors;
}
