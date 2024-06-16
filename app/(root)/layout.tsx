import Element from "@/components/ui/element";
import { NavAside } from "@/components/assets/nav-aside/aside";
import { getRoutes } from "@/scripts";

import style from "@/styles/ioeri.module.css";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "nodejs";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hooks = await getRoutes("hooks");
  return (
    <Element el="main" className={[style.main_home, "[--hex:#f2f2f2] dark:[--hex:#151515]"].join(" ")}>
      <NavAside routes={hooks} />
      {children}
    </Element>
  );
}
