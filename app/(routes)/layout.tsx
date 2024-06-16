import { Main } from "@/components/ui/components";
import { NavAside } from "@/components/assets/nav-aside/aside";
import { getRoutes } from "@/scripts/get-routes";
import { SingleRoute } from "@/routes";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "nodejs";
// export const fetchCache = "only-no-store";

async function loadRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getRoutes(sourcePath);
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hooks = await loadRoutes("hooks");
  return (
    <Main>
      <NavAside routes={hooks} />
      {children}
    </Main>
  );
}
