"use server";

import fs from "fs-extra";
import path from "path";
import { capitalizeFirst } from "@/modules";

import type { NestedRoute, SingleRoute } from "../routes/index";

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Function to generate routes dynamically
async function generateRoutes(sourcePath: string, basePath: string): Promise<{ title: string; href: string }[]> {
  const routes = [];
  try {
    const folders = await fs.readdir(basePath);

    for (const folder of folders) {
      const folderPath = path.join(basePath, folder);
      const isDirectory = (await fs.stat(folderPath)).isDirectory();
      if (isDirectory && folder.startsWith("use")) {
        routes.push({
          title: toCamelCase(folder),
          href: `/${sourcePath}/${folder}`,
        });
      }
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }
  return routes;
}

export async function getRoutes(sourcePath: string): Promise<SingleRoute[]> {
  try {
    const routeData = await generateRoutes(sourcePath, path.resolve(process.cwd(), `modules/${sourcePath}`));
    return [
      {
        title: capitalizeFirst(sourcePath),
        data: routeData,
      },
    ];
  } catch (error) {
    console.error("Error generating routes:", error);
    return [];
  }
}
