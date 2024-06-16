import path from "node:path";
import fs from "fs-extra";

export async function getMdFile(sourcePath: string): Promise<string> {
  try {
    const filePath = path.resolve(process.cwd(), String(sourcePath));
    // Specify the path for the .md file
    const mdFilePath = path.resolve(process.cwd(), "md/convert", path.basename(filePath).replace(/\.[^.]+$/, ".md"));

    // If the .md file doesn't exist yet, convert the original file to .md
    if (!(await fileExists(mdFilePath))) {
      await convertFileToMd(filePath);
    }

    // Now read the .md file
    const content = await fs.readFile(mdFilePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Failed to read markdown file from ${sourcePath}:`, error);
    throw error;
  }
}

async function convertFileToMd(filePath: string): Promise<string> {
  try {
    // Read the contents of the file
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Specify the name and path for the new .md file
    const mdFilePath = path.resolve(process.cwd(), "md/convert", path.basename(filePath).replace(/\.[^.]+$/, ".md"));

    // Write the contents of the file into a new .md file
    const targetDir = path.dirname(mdFilePath);
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(mdFilePath, fileContent, "utf-8");

    console.log(`File ${filePath} telah dikonversi menjadi ${mdFilePath}`);
    return mdFilePath;
  } catch (error) {
    console.error(`Failed to convert ${filePath} to .md:`, error);
    throw error;
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
