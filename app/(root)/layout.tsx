import Element from "@/components/ui/element";
import { NavAside } from "@/components/assets/nav-aside/aside";
import { getNestedRoutes, getRoutes } from "@/scripts/get-routes";
import type { NestedRoute, SingleRoute } from "@/routes";

import style from "@/styles/ioeri.module.css";

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
  const hooks = await loadRoutes("hooks");
  const nested = await loadNestedRoutes("components");

  return (
    <Element el="main" className={[style.main_home, "[--hex:#f2f2f2] dark:[--hex:#171717]"].join(" ")}>
      <NavAside routes={hooks} nestedRoutes={nested} />
      {children}
    </Element>
  );
}
