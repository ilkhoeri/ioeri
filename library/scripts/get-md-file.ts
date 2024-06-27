import path from "node:path";
import fs from "fs-extra";

export async function getMdFileOld(toPath: string, sourcePath: string): Promise<string> {
  try {
    const filePath = path.resolve(process.cwd(), String(sourcePath));
    // Specify the path for the .md file
    const mdFilePath = path.resolve(process.cwd(), "md", toPath, path.basename(filePath).replace(/\.[^.]+$/, ".md"));

    // If the .md file doesn't exist yet, convert the original file to .md
    if (!(await fileExists(mdFilePath))) {
      await convertFileToMd(toPath, filePath);
    }

    // Now read the .md file
    const content = await fs.readFile(mdFilePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Failed to read markdown file from ${sourcePath}:`, error);
    throw error;
  }
}

export async function getMdFile(
  toPath: string,
  sourcePath: string,
  extensions: string[] = [".tsx", ".ts"],
): Promise<string> {
  try {
    for (const ext of extensions) {
      const filePath = path.resolve(process.cwd(), `${sourcePath}${ext}`);

      const mdFilePath = path.resolve(process.cwd(), "md", toPath, path.basename(filePath).replace(/\.[^.]+$/, ".md"));

      if (await fileExists(filePath)) {
        if (!(await fileExists(mdFilePath))) {
          await convertFileToMd(toPath, filePath);
        }

        const content = await fs.readFile(mdFilePath, "utf-8");
        return content;
      }
    }
    throw new Error(`File not found with supported extensions in ${sourcePath}`);
  } catch (error) {
    console.error(`Failed to read markdown file from ${sourcePath}:`, error);
    throw error;
  }
}

async function convertFileToMdOld(toPath: string, filePath: string): Promise<string> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");

    const mdFilePath = path.resolve(process.cwd(), "md", toPath, path.basename(filePath).replace(/\.[^.]+$/, ".md"));

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

async function convertFileToMd(toPath: string, sourcePath: string): Promise<void> {
  // Placeholder implementation for file conversion
  const mdFilePath = path.resolve(process.cwd(), "md", toPath, path.basename(sourcePath).replace(/\.[^.]+$/, ".md"));
  const content = await fs.readFile(sourcePath, "utf-8");
  const markdownContent = `# Converted Content\n\n${content}`; // Simplistic conversion
  await fs.writeFile(mdFilePath, markdownContent, "utf-8");
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
