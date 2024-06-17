"use server";

import fs from "fs-extra";
import path from "node:path";

export async function getFileContent(basePath: string, filePath: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), basePath, filePath);
    const text = await fs.readFile(fullPath, "utf-8");
    return text.trim() ? text : null;
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
