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
        // Continue to the next extension if file is not found
      }
    }
    return null; // If none of the extensions matched
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

export async function getContent(basePath: string, sectionId?: string): Promise<string | null> {
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
