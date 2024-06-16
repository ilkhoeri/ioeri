"use server";

import fs from "fs-extra";
import path from "path";

import type { NestedRoute } from "./index";

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Function to generate routes dynamically
async function generateHookRoutes(basePath: string): Promise<{ title: string; href: string }[]> {
  const hookRoutes = [];
  try {
    const folders = await fs.readdir(basePath);

    for (const folder of folders) {
      const folderPath = path.join(basePath, folder);
      const isDirectory = (await fs.stat(folderPath)).isDirectory();
      if (isDirectory && folder.startsWith("use")) {
        hookRoutes.push({
          title: toCamelCase(folder),
          href: `/web/hooks/${folder}`,
        });
      }
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }
  return hookRoutes;
}

export async function getRoutes(): Promise<NestedRoute[]> {
  const hooksData = await generateHookRoutes(path.resolve(process.cwd(), "modules/hooks"));
  return [
    {
      title: "Web app",
      data: [
        {
          title: "Hooks",
          data: hooksData,
        },
      ],
    },
  ];
}
