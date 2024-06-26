import Docs from "./docs";
import { getNestedRoutes, getRoutes } from "@/library/scripts/get-routes";
import { InnerRoutes, NestedRoute, SingleRoute } from "@/library/routes";
import { notFound } from "next/navigation";
import { RestDocsPage } from "./client";

// export function generateStaticParams() {
//   return [{ docs: ["hooks", "use-clipboard"] }, { docs: ["b", "2"] }, { docs: ["c", "3"] }];
// }

async function loadRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getRoutes(sourcePath);
}
async function loadNestedRoutes(sourcePath: string): Promise<NestedRoute[]> {
  return await getNestedRoutes(sourcePath);
}

interface DocsParams {
  children: React.ReactNode;
  params: {
    docs: string[];
  };
}

export default async function Layout({ children, params }: Readonly<DocsParams>) {
  const nested = await loadNestedRoutes("components");
  const components = nested.map((i) => i.data).flat();
  const utility = await loadRoutes("utility");
  const hooks = await loadRoutes("hooks");

  if (!params.docs) {
    return <Docs />;
  }

  if (params.docs.length === 1) {
    const routesMap: { [key: string]: any } = {
      components: nested,
      utility: utility,
      hooks: hooks,
    };
    const routes = routesMap[params.docs[0]];
    return <RestDocsPage id={params.docs[0]} routes={routes} />;
  }

  const matchingRoutes = findMatchingRoute(params.docs, [...components, ...utility, ...hooks]);
  if (!matchingRoutes) notFound();

  return <>{children}</>;
}

const findMatchingRoute = (slug: string[], routes: (InnerRoutes | SingleRoute)[]): boolean => {
  const matcher = `/docs/${slug.join("/")}`;

  for (const route of routes) {
    if ("href" in route && route.href === matcher) {
      return true;
    }

    if ("data" in route) {
      const matchingData = route.data.some((data) => data.href === matcher);
      if (matchingData) {
        return true;
      }
    }
  }
  return false;
};
