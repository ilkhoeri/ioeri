import Docs from "./docs";
import RestDocsPage from "./client";
import { notFound } from "next/navigation";
import { Headnav } from "@/library/assets/nav-head";
import { NavBottom } from "@/library/assets/nav-prev-next";
import { AsideLeft } from "@/library/assets/nav-aside-left";
import { ChildWrapper } from "@/library/context/app-context";
import { AsideRight } from "@/library/assets/nav-aside-right";
import { Section, Main } from "@/library/components/components";
import { getPath, getPaths } from "@/library/scripts/get-paths";
import { NavigationBreadcrumb } from "@/library/assets/nav-breadcrumb";
import { InnerRoutes, NestedRoute, SingleRoute } from "@/library/routes";

export const runtime = "nodejs";
export const dynamicParams = true;
export const dynamic = "force-dynamic";
// export const fetchCache = "only-no-store";

async function routes(sourcePath: string): Promise<SingleRoute[]> {
  return await getPath(["resource", "docs", sourcePath]);
}
async function nestedRoutes(sourcePath: string): Promise<NestedRoute[]> {
  return await getPaths(["resource", "docs", sourcePath]);
}
async function examplesRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getPath(["resource", sourcePath]);
}

interface DocsParams {
  children: React.ReactNode;
  params: {
    docs: string[];
  };
}

export default async function Layout({ children, params }: Readonly<DocsParams>) {
  const [utility, nested, hooks, examples] = await Promise.all([
    routes("utility"),
    nestedRoutes("components"),
    routes("hooks"),
    examplesRoutes("examples"),
  ]);
  const components = nested.map((i) => i.data).flat();

  function Template({ children }: { children: React.ReactNode }) {
    return (
      <>
        <Headnav routes={[...utility, ...nested, ...hooks, ...examples]} />
        <Main>
          <AsideLeft routes={[...utility, ...nested, ...hooks, ...examples]} />
          <Section>
            <NavigationBreadcrumb />
            <ChildWrapper>{children}</ChildWrapper>
            <NavBottom routes={[...utility, ...components, ...hooks]} />
          </Section>
          <AsideRight />
        </Main>
      </>
    );
  }

  if (!params.docs) {
    return (
      <Template>
        <Docs />
      </Template>
    );
  }

  if (params.docs.length === 1) {
    const routesMap: { [key: string]: any } = {
      components: nested,
      utility: utility,
      hooks: hooks,
    };
    const routes = routesMap[params.docs[0]];
    return (
      <Template>
        <RestDocsPage id={params.docs[0]} routes={routes} />
      </Template>
    );
  }

  const matchingRoutes = findMatchingRoute(params.docs, [...components, ...utility, ...hooks]);
  if (!matchingRoutes) notFound();

  return <Template>{children}</Template>;
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
