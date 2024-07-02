import { cnx, type ClassValue } from "@/modules/ondevelopment/utils/cnx";
import { camelToKebab, capitalizeWords } from "@/modules";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(cnx(...inputs));
}

export function retitled(texts: string[] | undefined, defaultText: string = "Docs") {
  if (texts === undefined) return defaultText;
  const length = texts?.length;
  const secondLast = length ? texts[texts?.length - 2] : " ";
  const last = length ? texts[texts?.length - 1] : " ";
  return capitalizeWords(last);
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
