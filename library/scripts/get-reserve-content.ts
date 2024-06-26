import path from "node:path";
import fs from "fs-extra";

// Helper function to check if a file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Mock function to convert file to markdown (implementation required)
async function convertFileToMd(toPath: string, sourcePath: string): Promise<void> {
  // Placeholder implementation for file conversion
  const mdFilePath = path.resolve(process.cwd(), "md", toPath, path.basename(sourcePath).replace(/\.[^.]+$/, ".md"));
  const content = await fs.readFile(sourcePath, "utf-8");
  const markdownContent = `# Converted Content\n\n${content}`; // Simplistic conversion
  await fs.writeFile(mdFilePath, markdownContent, "utf-8");
}

async function getMdFile(toPath: string, sourcePath: string, extensions: string[] = [".tsx", ".ts"]): Promise<string> {
  for (const ext of extensions) {
    const filePath = path.resolve(process.cwd(), `${sourcePath}${ext}`);
    // Specify the path for the .md file
    const mdFilePath = path.resolve(process.cwd(), "md", toPath, path.basename(filePath).replace(/\.[^.]+$/, ".md"));

    if (await fileExists(filePath)) {
      // If the .md file doesn't exist yet, convert the original file to .md
      if (!(await fileExists(mdFilePath))) {
        await convertFileToMd(toPath, filePath);
      }

      // Now read the .md file
      const content = await fs.readFile(mdFilePath, "utf-8");
      return content;
    }
  }
  throw new Error(`File not found with supported extensions in ${sourcePath}`);
}

export async function getReserveContent(
  basePath: string,
  extensions: string[] = [".tsx", ".ts"],
): Promise<string | null> {
  try {
    for (const ext of extensions) {
      const fullPath = path.resolve(process.cwd(), `${basePath}${ext}`);
      if (await fileExists(fullPath)) {
        const content = await fs.readFile(fullPath, "utf-8");
        return content.trim() ? content : null;
      }
    }
    // If file is not found with any of the extensions, fall back to getMdFile
    return await getMdFile("reserve", `${basePath}`, extensions);
  } catch (error) {
    console.error(`Failed to read file from ${basePath}:`, error);
    return null;
  }
}
