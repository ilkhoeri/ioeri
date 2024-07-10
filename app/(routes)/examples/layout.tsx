import { Section, Main } from "@/library/components/components";
import { getPath, getPaths } from "@/library/scripts/get-paths";

import { Headnav } from "@/library/assets/nav-head";
import { NestedRoute, SingleRoute } from "@/library/routes";

async function routes(sourcePath: string): Promise<SingleRoute[]> {
  return await getPath(["resource", "docs", sourcePath]);
}
async function nestedRoutes(sourcePath: string): Promise<NestedRoute[]> {
  return await getPaths(["resource", "docs", sourcePath]);
}
async function examplesRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getPath(["resource", sourcePath]);
}

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [utility, nested, hooks, examples] = await Promise.all([
    routes("utility"),
    nestedRoutes("components"),
    routes("hooks"),
    examplesRoutes("examples"),
  ]);

  return (
    <>
      <Headnav routes={[...utility, ...nested, ...hooks, ...examples]} />

      <Main>
        <Section className="px-6 md:px-8 lg:px-12">{children}</Section>
      </Main>
    </>
  );
}
