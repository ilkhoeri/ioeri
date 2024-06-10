import { camelToKebab } from "../utils";
import { GetStylesApiOptions } from "./styles-api.types";

interface GetSelectorId {
  selector: string;
  options?: GetStylesApiOptions;
}

export function getId({ selector, options }: GetSelectorId) {
  const firstThreeChars = selector.slice(0, 3).toLowerCase();
  const charCodeSum = firstThreeChars.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const charIndex = charCodeSum % 26;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const number = "0123456789";
  const char = alphabet.charAt(charIndex);
  const numb = number.charAt(charIndex);
  return options?.id || `${camelToKebab(selector)}:-${char + numb}`;
}
