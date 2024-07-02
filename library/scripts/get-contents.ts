"use server";

import fs from "fs-extra";
import path from "node:path";

async function filterContentOld(content: string): Promise<string> {
  const lines = content.split("\n"); // Split the content by lines
  // Filter out lines containing the specific keywords
  const filteredLines = lines.filter(
    (line) =>
      !line.includes("prettier-ignore") &&
      !line.includes("import globalStyle") &&
      !line.includes("className={globalStyle") &&
      !line.includes("__set_props") &&
      !line.includes("useSetProps") &&
      !line.includes("SetProps"),
  );

  return filteredLines.join("\n"); // Join the filtered lines back into a single string
}

export type ContentOld = { content: string | null; extension: string | null };
export async function getContentOld(basePath: string, extensions: string[] = [".tsx", ".ts"]): Promise<ContentOld> {
  try {
    for (const ext of extensions) {
      const fullPath = path.join(process.cwd(), `${basePath}${ext}`);
      try {
        // const text = await fs.readFile(fullPath, "utf-8"); // without filtered
        let text = await fs.readFile(fullPath, "utf-8");
        text = await filterContentOld(text);
        return { content: text.trim() ? text : null, extension: ext };
      } catch (error) {
        // Continue to the next extension if file is not found
      }
    }
    return { content: null, extension: null }; // If none of the extensions matched
  } catch (error) {
    return { content: null, extension: null };
  }
}

async function filterContent(content: string, replacements: Record<string, string>): Promise<string> {
  const lines = content.split("\n"); // Split the content by lines

  // Filter and replace lines
  const filteredLines = lines
    .filter(
      (line) =>
        !line.includes("prettier-ignore") &&
        !line.includes("import globalStyle") &&
        !line.includes("className={globalStyle") &&
        !line.includes("__set_props") &&
        !line.includes("useSetProps") &&
        !line.includes("SetProps"),
    )
    .map((line) => {
      // Replace words in the line according to the replacements object
      for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(`\\b${key}\\b`, "g");
        line = line.replace(regex, value);
      }
      return line;
    });

  return filteredLines.join("\n"); // Join the filtered lines back into a single string
}

export type Content = { content: string | null; extension: string | null };
export async function getContent(
  basePath: string,
  extensions: string[] = [".tsx", ".ts"],
  replacements: Record<string, string> = {},
): Promise<Content> {
  try {
    for (const ext of extensions) {
      const fullPath = path.join(process.cwd(), `${basePath}${ext}`);
      try {
        // const text = await fs.readFile(fullPath, "utf-8"); // without filtered
        let text = await fs.readFile(fullPath, "utf-8");
        text = await filterContent(text, replacements);
        return { content: text.trim() ? text : null, extension: ext };
      } catch (error) {
        // Continue to the next extension if file is not found
      }
    }
    return { content: null, extension: null }; // If none of the extensions matched
  } catch (error) {
    return { content: null, extension: null };
  }
}

export async function getMdx(basePath: string, sectionId?: string): Promise<string | null> {
  try {
    const fullPathMd = path.join(process.cwd(), `${basePath}.md`);
    const fullPathMdx = path.join(process.cwd(), `${basePath}.mdx`);

    let text;
    try {
      text = await fs.readFile(fullPathMd, "utf-8");
    } catch (error) {
      text = await fs.readFile(fullPathMdx, "utf-8");
    }

    if (!sectionId) {
      return text.trim() ? text : null;
    }

    const sectionRegex = new RegExp(`\\$:${sectionId}[\\s\\S]*?(?=\\$:|$)`, "g");
    const match = text.match(sectionRegex);

    if (match) {
      return match[0].replace(`$:${sectionId}`, "").trim();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
