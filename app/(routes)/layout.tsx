import { Main } from "@/components/ui/component";
import { NavAside } from "@/components/assets/nav-aside/aside";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Main>
      <NavAside />
      {children}
    </Main>
  );
}
