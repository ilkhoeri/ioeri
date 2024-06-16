import { Main } from "@/components/ui/components";
import { NavAside } from "@/components/assets/nav-aside/aside";
import { getRoutes } from "@/script/get-routes";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "nodejs";
// export const fetchCache = "only-no-store";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const routes = await getRoutes("Web app", "hooks");
  return (
    <Main>
      <NavAside routes={routes} />
      {children}
    </Main>
  );
}
