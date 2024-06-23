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

export async function getContentFile(basePath: string, filePath: string, id: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), basePath, filePath);
    const fileStream = fs.createReadStream(fullPath, "utf-8");

    let content = "";
    let capturing = false;

    for await (const chunk of fileStream) {
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.trim() === `#${id}`) {
          capturing = true;
        } else if (line.startsWith("#") && capturing) {
          // If another section starts, stop capturing
          capturing = false;
        }

        if (capturing) {
          content += line + "\n";
        }
      }
    }

    return content.trim() ? content : null;
  } catch (error) {
    return null;
  }
}


export async function getContent(basePath: string, filePath: string, sectionId?: string): Promise<string | null> {
  try {
    const fullPath = path.join(process.cwd(), basePath, filePath);
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