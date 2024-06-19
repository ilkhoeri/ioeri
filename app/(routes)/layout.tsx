import { Article, Main } from "@/components/ui/components";
import { AsideLeft } from "@/components/assets/nav-aside/aside-left";
import { AsideRight } from "@/components/assets/nav-aside/aside-right";
import { NavBottom } from "@/components/assets/nav-bottom/nav-bottom";
import { getNestedRoutes, getRoutes } from "@/scripts/get-routes";
import { NestedRoute, SingleRoute } from "@/routes";
import { NavigationBreadcrumb } from "@/components/assets/navigation/navigation-breadcrumb";

export const runtime = "nodejs";
export const dynamicParams = true;
export const dynamic = "force-dynamic";
// export const fetchCache = "only-no-store";

async function loadRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getRoutes(sourcePath);
}
async function loadNestedRoutes(sourcePath: string): Promise<NestedRoute[]> {
  return await getNestedRoutes(sourcePath);
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nested = await loadNestedRoutes("components");
  const functions = await loadRoutes("functions");
  const hooks = await loadRoutes("hooks");
  return (
    <Main>
      <AsideLeft routes={[...functions, ...hooks]} nestedRoutes={nested} />
      <Article>
        <NavigationBreadcrumb />
        {children}
        <NavBottom />
      </Article>
      <AsideRight />
    </Main>
  );
}
