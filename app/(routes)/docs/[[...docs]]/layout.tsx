import { Section, Main } from "@/library/components/components";
import { AsideLeft } from "@/library/assets/nav-aside/aside-left";
import { AsideRight } from "@/library/assets/nav-aside/aside-right";
import { NavBottom } from "@/library/assets/nav-bottom/nav-bottom";
import { getNestedRoutes, getRoutes } from "@/library/scripts/get-routes";
import { InnerRoutes, NestedRoute, SingleRoute } from "@/library/routes";
import { NavigationBreadcrumb } from "@/library/assets/navigation/navigation-breadcrumb";

async function loadRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getRoutes(sourcePath);
}
async function loadNestedRoutes(sourcePath: string): Promise<NestedRoute[]> {
  return await getNestedRoutes(sourcePath);
}

// export function generateStaticParams() {
//   return [{ docs: ["hooks", "use-clipboard"] }, { docs: ["b", "2"] }, { docs: ["c", "3"] }];
// }

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nested = await loadNestedRoutes("components");
  const utility = await loadRoutes("utility");
  const hooks = await loadRoutes("hooks");
  const components = nested.map((i) => i.data).flat();
  return <>{children}</>;
}

type Route = InnerRoutes | SingleRoute;

export const findMatchingRoute = (params: string[], routes: Route[]): boolean => {
  const matcher = `/${params.join("/")}`;

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
