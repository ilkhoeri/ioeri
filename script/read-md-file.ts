import path from "node:path";
import fs from "fs-extra";

export async function getMdFile(sourcePath: string): Promise<string> {
  try {
    const filePath = path.resolve(process.cwd(), String(sourcePath));
    // Tentukan path untuk file .md
    const mdFilePath = path.resolve(process.cwd(), "md", path.basename(filePath).replace(/\.[^.]+$/, ".md"));

    // Jika file .md belum ada, konversi dari file asli ke .md
    if (!(await fileExists(mdFilePath))) {
      await convertFileToMd(filePath);
    }

    // Sekarang baca file .md
    const content = await fs.readFile(mdFilePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Failed to read markdown file from ${sourcePath}:`, error);
    throw error;
  }
}

async function convertFileToMd(filePath: string): Promise<string> {
  try {
    // Baca isi file
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Tentukan nama dan path untuk file .md baru
    const mdFilePath = path.resolve(process.cwd(), "md", path.basename(filePath).replace(/\.[^.]+$/, ".md"));

    // Tulis isi file ke dalam file .md baru
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
