import { Main } from "@/components/ui/components";
import { NavAside } from "@/components/assets/nav-aside/aside";
import { getRoutes } from "@/scripts";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "nodejs";
// export const fetchCache = "only-no-store";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hooks = await getRoutes("hooks");
  return (
    <Main>
      <NavAside routes={hooks} />
      {children}
    </Main>
  );
}
