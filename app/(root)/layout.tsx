import Element from "@/library/components/element";
import { AsideLeft } from "@/library/assets/nav-aside-left";
import { getPath, getPaths } from "@/library/scripts/get-paths";
import { Headnav } from "@/library/assets/nav-head";

import type { NestedRoute, SingleRoute } from "@/library/routes";

import style from "@/library/styles/ioeri.module.css";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "nodejs";

async function routes(sourcePath: string): Promise<SingleRoute[]> {
  return await getPath(["resource", "docs", sourcePath]);
}
async function nestedRoutes(sourcePath: string): Promise<NestedRoute[]> {
  return await getPaths(["resource", "docs", sourcePath]);
}
async function examplesRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getPath(["resource", sourcePath]);
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [utility, nested, hooks, examples] = await Promise.all([
    routes("utility"),
    nestedRoutes("components"),
    routes("hooks"),
    examplesRoutes("examples"),
  ]);

  return (
    <>
      <Headnav routes={[...utility, ...nested, ...hooks, ...examples]} />

      <Element el="main" className={[style.main_home, "[--hex:#f2f2f2] dark:[--hex:#171717]"].join(" ")}>
        <AsideLeft
          routes={[...utility, ...nested, ...hooks, ...examples]}
          classNames={{ aside: "md:!hidden md:!sr-only" }}
        />
        {children}
      </Element>
    </>
  );
}
