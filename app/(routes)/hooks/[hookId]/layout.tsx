import { notFound } from "next/navigation";
import { getRoutes } from "@/scripts/get-routes";

interface Params {
  children: React.ReactNode;
  params: { hookId: string };
}

async function findMatchingRoute(slug: string, params: string): Promise<boolean> {
  for (const route of await getRoutes(slug)) {
    if ("data" in route) {
      const matchingData = route.data.some((data) => data.href === `/${slug}/${params}`);
      if (matchingData) {
        return true;
      }
    }
  }
  return false;
}

export const fetchCache = "only-no-store";
export default async function Layout({ children, params }: Readonly<Params>) {
  const matchingRoute = await findMatchingRoute("hooks", params.hookId);

  if (!matchingRoute) {
    notFound();
  }
  return <>{children}</>;
}
