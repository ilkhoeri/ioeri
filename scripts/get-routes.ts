"use server";

import fs from "fs-extra";
import path from "path";
import { capitalizeFirst } from "@/modules";

import type { InnerRoutes, NestedRoute } from "../routes/index";

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

async function generateRoutes(sourcePath: string, basePath: string): Promise<{ title: string; href: string }[]> {
  const routes: InnerRoutes[] = [];
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

export async function main() {
  const title = "web-app";
  const sourcePath = "hooks";

  const routesPath = path.resolve(process.cwd(), `routes/${sourcePath}.json`);
  const routeData = await generateRoutes(sourcePath, path.resolve(process.cwd(), `modules/${sourcePath}`));

  const routesData = [
    {
      title: capitalizeFirst(title),
      data: [
        {
          title: capitalizeFirst(sourcePath),
          data: routeData,
        },
      ],
    },
  ];

  try {
    await fs.outputJson(routesPath, routesData, { spaces: 2 });
    console.log("Routes generated and saved to", routesPath);
  } catch (error) {
    console.error("Error saving routes:", error);
  }
}

export async function getRoutes(sourcePath: string): Promise<NestedRoute[]> {
  try {
    const routesPath = path.resolve(process.cwd(), `routes/${sourcePath}.json`);
    const routesData = await fs.readJson(routesPath);
    return routesData;
  } catch (error) {
    console.error("Error generating routes:", error);
    return [];
  }
}
