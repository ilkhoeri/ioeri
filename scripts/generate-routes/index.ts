import path from "path";
import fs from "fs-extra";
import promptSync from "prompt-sync";

import { capitalizeFirst } from "../../modules";

import type { InnerRoutes, SingleRoute } from "../../routes/index";

const prompt = promptSync({ sigint: true });

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

async function main() {
  // let title: string = "";
  let sourcePath: string = "";

  const routesPath = path.resolve(process.cwd(), `routes/${sourcePath}.json`);

  if (!fs.existsSync(routesPath)) {
    // title = prompt("Enter the title: ");
    sourcePath = prompt("Enter the source path: ");
  } else {
    // Read the existing routes file to get the sourcePath
    const existingRoutes = await fs.readJson(routesPath);
    // title = existingRoutes[0]?.title;
    sourcePath = existingRoutes[0]?.data[0]?.title.toLowerCase();
  }

  const routeData = await generateRoutes(sourcePath, path.resolve(process.cwd(), `modules/${sourcePath}`));

  const routesData = [
    {
      title: capitalizeFirst(sourcePath),
      data: routeData,
    },
  ];

  try {
    await fs.outputJson(routesPath, routesData, { spaces: 2 });
    console.log("Routes generated and saved to", routesPath);
  } catch (error) {
    console.error("Error saving routes:", error);
  }
}

export async function getRoutes(sourcePath: string): Promise<SingleRoute[]> {
  try {
    const routesPath = path.resolve(process.cwd(), `routes/${sourcePath}.json`);
    const routesData = await fs.readJson(routesPath);
    return routesData;
  } catch (error) {
    console.error("Error generating routes:", error);
    return [];
  }
}

if (require.main === module) {
  main().catch(console.error);
}

main();