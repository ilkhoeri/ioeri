import { notFound } from "next/navigation";
import { SingleRoute, fitures } from "@/routes";

interface Params {
  children: React.ReactNode;
  params: { playgroundId: string };
}

export const fetchCache = "only-no-store";

export default function Layout({ children, params }: Readonly<Params>) {
  const matchingRoute = findMatchingRoute(["playground", params.playgroundId], [...fitures]);

  // if (!matchingRoute) {
  //   notFound();
  // }
  return <>{children}</>;
}

const findMatchingRoute = (params: string[], routes: SingleRoute[]): boolean => {
  const matcher = `/${params.join("/")}`;
  for (const route of routes) {
    if ("href" in route && route.href === matcher) {
      return true;
    }

    if ("data" in route) {
      const matchingData = route.data.some((data) => data.href === matcher);
      if (matchingData) {
        return true;
      }
    }
  }
  return false;
};
