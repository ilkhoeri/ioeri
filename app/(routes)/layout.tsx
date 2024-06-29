import { Section, Main } from "@/library/components/components";
import { AsideLeft } from "@/library/assets/nav-aside-left";
import { AsideRight } from "@/library/assets/nav-aside-right";
import { NavBottom } from "@/library/assets/nav-prev-next";
import { getNestedRoutes, getRoutes } from "@/library/scripts/get-routes";
import { NestedRoute, SingleRoute } from "@/library/routes";
import { NavigationBreadcrumb } from "@/library/assets/nav-breadcrumb";

export const runtime = "nodejs";
export const dynamicParams = true;
// export const dynamic = "force-dynamic";
// export const fetchCache = "only-no-store";

async function loadRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getRoutes(sourcePath);
}
async function loadNestedRoutes(sourcePath: string): Promise<NestedRoute[]> {
  return await getNestedRoutes(sourcePath);
}

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nested = await loadNestedRoutes("components");
  const utility = await loadRoutes("utility");
  const hooks = await loadRoutes("hooks");
  const components = nested.map((i) => i.data).flat();

  return (
    <Main>
      <AsideLeft topRoutes={[...utility]} routes={[...hooks]} nestedRoutes={nested} />
      <Section>
        <NavigationBreadcrumb />
        {children}
        <NavBottom routes={[...utility, ...components, ...hooks]} />
      </Section>
      <AsideRight />
    </Main>
  );
}
