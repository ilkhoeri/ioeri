import Element from "@/library/components/element";
import { AsideLeft } from "@/library/assets/nav-aside/aside-left";
import { getNestedRoutes, getRoutes } from "@/library/scripts/get-routes";
import type { NestedRoute, SingleRoute } from "@/library/routes";

import style from "@/library/styles/ioeri.module.css";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "nodejs";

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
  const utility = await loadRoutes("utility");
  const hooks = await loadRoutes("hooks");

  return (
    <Element el="main" className={[style.main_home, "[--hex:#f2f2f2] dark:[--hex:#171717]"].join(" ")}>
      <AsideLeft topRoutes={[...utility]} routes={[...hooks]} nestedRoutes={nested} />
      {children}
    </Element>
  );
}
