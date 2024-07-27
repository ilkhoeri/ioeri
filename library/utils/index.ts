import { cnx, type ClassValue } from "@/resource/docs/ondevelopment/utils/cnx";
import { camelToKebab, capitalizeWords, toPascalCase } from "@/resource/docs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(cnx(...inputs));
}

export function retitled(texts: string[] | string | undefined, defaultText: string = "Docs") {
  if (texts === undefined) return defaultText;
  if (Array.isArray(texts)) {
    const length = texts?.length;
    const secondLast = length ? texts[texts?.length - 2] : " ";
    const last = length ? texts[texts?.length - 1] : " ";
    return capitalizeWords(last);
  } else {
    return capitalizeWords(texts);
  }
}

export function prefixName(docs: string[], name: string): string {
  const prefix = docs[docs.length - 1];
  let strippedName = name;

  if (name.startsWith(prefix)) {
    strippedName = name.replace(prefix, "").replace(/^-/, "");
  }

  if (prefix === name) {
    strippedName = name;
  }

  return strippedName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function displayName(str: string) {
  // str = str.replace("use", "");
  str = camelToKebab(str);
  str = capitalizeWords(str);
  str = str.replace(/-/g, " ");
  return str;
}

export function sourceFiles(texts: string[] | undefined) {
  if (texts === undefined) return null;
  const sourceFolder = texts.join("/");
  const nameFiles = texts[texts.length - 1];
  return `${sourceFolder}/${nameFiles}`;
}

export function slug(texts: string[] | undefined) {
  return texts === undefined ? " " : texts[texts.length - 1];
}

export function tocopy(text: string) {
  const regex = /^```.*\n|\n```\s*$/gm;
  text = text.replace(regex, "");

  return text;
}

export function nextValue<T>(currentValue: T, values: T[]): T {
  const currentIndex = values.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % values.length;
  return values[nextIndex];
}
