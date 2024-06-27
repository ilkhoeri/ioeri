import { cnx, type ClassValue } from "@/modules/utility/cnx/cnx";
import { capitalizeWords } from "@/modules";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(cnx(...inputs));
}

export function retitled(texts: string[] | undefined, defaultText: string = "Docs") {
  if (texts === undefined) return defaultText;
  const length = texts?.length;
  const secondLast = length ? texts[texts?.length - 2] : " ";
  const last = length ? texts[texts?.length - 1] : " ";
  return capitalizeWords(last.replace("use", ""));
}

export function sourceFiles(texts: string[] | undefined) {
  if (texts === undefined) return null;
  const sourceFolder = texts.join("/");
  const nameFiles = texts[texts.length - 1];
  return `${sourceFolder}/${nameFiles}`;
}
