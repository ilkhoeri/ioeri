import Link from "next/link";
import { SingleRoute } from "@/library/routes";
import { getRoutes } from "@/library/scripts/get-routes";
import { Title } from "@/library/components/components";
import { Container } from "@/library/components/components";
import { displayName } from "@/library/utils";

async function loadRoutes(sourcePath: string): Promise<SingleRoute[]> {
  return await getRoutes(sourcePath);
}

export default async function Router() {
  const routesUtility = await loadRoutes("utility");

  if (!routesUtility) return null;

  return (
    <Container el="div">
      <Title id="utility" className="mt-0 mb-12 min-w-full">
        Utility
      </Title>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 mt-5 sm:gap-6">
        {routesUtility.map((i) =>
          i.data.map((i, index) => (
            <Link
              key={index}
              href={i.href}
              title={i.title}
              className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
            >
              <span className="font-medium">{displayName(i.title)}</span>
            </Link>
          )),
        )}
      </div>
    </Container>
  );
}
