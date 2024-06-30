"use server";

import fs from "fs-extra";
import path from "node:path";

export async function getFileContentOld(basePath: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), basePath);
    const text = await fs.readFile(fullPath, "utf-8");
    return text.trim() ? text : null;
  } catch (error) {
    return null;
  }
}

export async function getFileContent(basePath: string, extensions: string[] = [".tsx", ".ts"]): Promise<string | null> {
  try {
    for (const ext of extensions) {
      const fullPath = path.join(process.cwd(), `${basePath}${ext}`);
      try {
        const text = await fs.readFile(fullPath, "utf-8");
        return text.trim() ? text : null;
      } catch (error) {
        //
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

async function filterContent(content: string): Promise<string> {
  // Split the content by lines
  const lines = content.split("\n");
  // Filter out lines containing the specific keywords
  const filteredLines = lines.filter(
    (line) =>
      !line.includes("import globalStyle") &&
      !line.includes("className={globalStyle") &&
      !line.includes("__props") &&
      !line.includes("const props") &&
      !line.includes("useProps(") &&
      !line.includes("<Props"),
  );
  // Join the filtered lines back into a single string
  return filteredLines.join("\n");
}

export type ContExt = { content: string | null; extension: string | null };
export async function getContExt(basePath: string, extensions: string[] = [".tsx", ".ts"]): Promise<ContExt> {
  try {
    for (const ext of extensions) {
      const fullPath = path.join(process.cwd(), `${basePath}${ext}`);
      try {
        // const text = await fs.readFile(fullPath, "utf-8"); // without filtered
        let text = await fs.readFile(fullPath, "utf-8");
        text = await filterContent(text);
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

export async function getMd(basePath: string, sectionId?: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), basePath);
    const text = await fs.readFile(fullPath, "utf-8");

    if (!sectionId) {
      return text.trim() ? text : null;
    }

    const sectionRegex = new RegExp(`#${sectionId}[\\s\\S]*?(?=#|$)`, "g");
    const match = text.match(sectionRegex);

    if (match) {
      return match[0].replace(`#${sectionId}`, "").trim();
    } else {
      return null;
    }
  } catch (error) {
    return null;
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

/**
async function getCode(sourcePath: string) {
  const source = path.join(process.cwd(), `/modules/hooks/${sourcePath}/${sourcePath}.ts`);
  try {
    const text = await fs.readFile(source, "utf-8");
    return text.trim() ? text : null;
  } catch (error) {
    return null;
  }
}
 */
