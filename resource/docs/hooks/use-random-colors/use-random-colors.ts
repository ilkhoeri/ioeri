import { useEffect, useState } from "react";

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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
