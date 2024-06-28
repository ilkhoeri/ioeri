import { SingleRoute } from "@/library/routes";
import { getRoutes } from "@/library/scripts/get-routes";

async function loadRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getRoutes(sourcePath);
}

export default async function Router() {
  const routes = await loadRoutes("utility");

  return <>REST UTILITY</>;
}
