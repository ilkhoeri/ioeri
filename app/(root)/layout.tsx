import Element from "@/components/ui/element";
import { NavAside } from "@/components/assets/nav-aside/aside";
import { getRoutes } from "@/script/get-routes";

import style from "@/styles/ioeri.module.css";

export const dynamic = "force-dynamic";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const routes = await getRoutes("Web app", "hooks");
  return (
    <Element el="main" className={[style.main_home, "[--hex:#f2f2f2] dark:[--hex:#151515]"].join(" ")}>
      <NavAside routes={routes} />
      {children}
    </Element>
  );
}
