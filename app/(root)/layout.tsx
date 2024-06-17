import Element from "@/components/ui/element";
import { NavAside } from "@/components/assets/nav-aside/aside";
import { getRoutes } from "@/scripts/get-routes";

import style from "@/styles/ioeri.module.css";
import { SingleRoute } from "@/routes";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "nodejs";

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
    <Element el="main" className={[style.main_home, "[--hex:#f2f2f2] dark:[--hex:#171717]"].join(" ")}>
      <NavAside routes={hooks} />
      {children}
    </Element>
  );
}
