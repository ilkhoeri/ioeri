import { Main } from "@/components/ui/components";
import { NavAside } from "@/components/assets/nav-aside/aside";
import { getNestedRoutes, getRoutes } from "@/scripts/get-routes";
import { NestedRoute, SingleRoute } from "@/routes";

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
  const hooks = await loadRoutes("hooks");
  const nested = await loadNestedRoutes("components");
  return (
    <Main>
      <NavAside routes={hooks} nestedRoutes={nested} />
      {children}
    </Main>
  );
}
