type Texts = string | string[] | null | undefined;
type FileType = "js" | "jsx" | "ts" | "tsx" | "css" | "scss" | "json";

export function getRepository(path: string, texts: Texts, type: FileType) {
  if (!texts) return null;

  if (Array.isArray(texts)) {
    const [secondLast, last] = texts.slice(-2);
    return secondLast && last ? `/${path}/${secondLast}/${last}/${last}.${type}` : null;
  } else {
    return `/${path}/${texts}/${texts}.${type}`;
  }
}
