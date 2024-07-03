"use server";

import fs from "fs-extra";
import path from "path";
// import path from "node:path";

import type { InnerRoutes, NestedRoute, SingleRoute } from "../routes/index";

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
export function getPath(filePath: string) {
  return path.posix.resolve(filePath);
}
export function getPaths(filePaths: string[]) {
  return filePaths.map(getPath);
}
*/

// Function to generate routes dynamically
async function generatePath(sourcePath: string, basePath: string): Promise<InnerRoutes[]> {
  const routes = [];
  try {
    const folders = await fs.readdir(basePath);

    for (const folder of folders) {
      const folderPath = path.join(basePath, folder);
      const isDirectory = (await fs.stat(folderPath)).isDirectory();
      if (isDirectory) {
        routes.push({
          title: toCamelCase(folder),
          href: `/docs/${sourcePath}/${folder}`,
        });
      }
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }
  return routes;
}

export async function getPath(sourcePath: string): Promise<SingleRoute[]> {
  try {
    const routeData = await generatePath(sourcePath, path.resolve(process.cwd(), `resource/docs/${sourcePath}`));
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

async function generatePaths(sourcePath: string, basePath: string): Promise<SingleRoute[]> {
  const routes: SingleRoute[] = [];
  try {
    const folders = await fs.readdir(basePath);

    for (const folder of folders) {
      const folderPath = path.join(basePath, folder);
      const isDirectory = (await fs.stat(folderPath)).isDirectory();
      if (isDirectory) {
        const subFolders = await fs.readdir(folderPath);
        const hasSubFolders = subFolders.some(async (subFolder) => {
          const subFolderPath = path.join(folderPath, subFolder);
          return (await fs.stat(subFolderPath)).isDirectory();
        });

        if (hasSubFolders) {
          routes.push({
            title: capitalizeFirst(folder),
            data: await generatePath(`${sourcePath}/${folder}`, folderPath),
          });
        } else {
          const innerRoutes = subFolders.map((subFolder) => ({
            title: capitalizeFirst(subFolder),
            href: `/${sourcePath}/${folder}/${subFolder}`,
          }));
          routes.push({
            title: capitalizeFirst(folder),
            data: innerRoutes,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }
  return routes;
}

export async function getPaths(sourcePath: string): Promise<NestedRoute[]> {
  try {
    const basePath = path.resolve(process.cwd(), `resource/docs/${sourcePath}`);
    const routeData = await generatePaths(sourcePath, basePath);
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
