import { GetStylesApiOptions } from "./factory-types";

export function clamp(value: number, min: number | undefined, max: number | undefined) {
  if (min === undefined && max === undefined) {
    return value;
  }
  if (min !== undefined && max === undefined) {
    return Math.max(value, min);
  }
  if (min === undefined && max !== undefined) {
    return Math.min(value, max);
  }

  return Math.min(Math.max(value, min!), max!);
}

export function camelToKebab(n: string): string {
  if (n === undefined) return "";
  return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

interface SelectorOptions {
  selector: string;
  options?: GetStylesApiOptions;
}
export function getId({ selector, options }: SelectorOptions) {
  const firstThreeChars = selector.slice(0, 3).toLowerCase();
  const charCodeSum = firstThreeChars.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const charIndex = charCodeSum % 26;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const number = "0123456789";
  const char = alphabet.charAt(charIndex);
  const numb = number.charAt(charIndex);

  const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 3.33)}`;

  return options?.id || `${camelToKebab(selector)}:-${char + numb}-${uniqueId}`;
}

export function getAttrs({ selector }: { selector: string }) {
  const attr: { [key: string]: string | undefined } = {
    "data-command": camelToKebab(selector),
  };

  return attr;
}
