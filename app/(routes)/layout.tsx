import Container from "@/components/ui/container";

import style from "../../styles/ioeri.module.css";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container el={"main"} unstyled className={style.main}>
      {children}
    </Container>
  );
}
