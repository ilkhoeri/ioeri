import Element from "@/components/ui/element";
import { NavAside } from "@/components/assets/nav-aside/aside";

import style from "@/styles/ioeri.module.css";

export const dynamic = "force-dynamic";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Element el="main" className={[style.main_home, "[--hex:#f2f2f2] dark:[--hex:#151515]"].join(" ")}>
      <NavAside />
      {children}
    </Element>
  );
}
