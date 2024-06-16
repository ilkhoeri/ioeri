import { Main } from "@/components/ui/components";
import { NavAside } from "@/components/assets/nav-aside/aside";
import { getRoutes } from "@/routes/generates";

export const dynamic = "force-dynamic";
// export const fetchCache = "only-no-store";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const routes = await getRoutes();
  return (
    <Main>
      <NavAside routes={routes} />
      {children}
    </Main>
  );
}
