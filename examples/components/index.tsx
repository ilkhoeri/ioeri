import Link from "next/link";
import { NestedRoute } from "@/library/routes";
import { getNestedRoutes } from "@/library/scripts/get-routes";
import { Title } from "@/library/components/components";
import { Container } from "@/library/components/components";
import { displayName } from "@/library/utils";
import { sanitizedToParams } from "@/modules";

async function loadNestedRoutes(sourcePath: string): Promise<NestedRoute[]> {
  return await getNestedRoutes(sourcePath);
}

export default async function Router() {
  const nested = await loadNestedRoutes("components");

  if (!nested) return null;

  return (
    <Container el="div">
      <Title id="components" className="mt-0 mb-12 min-w-full">
        Components
      </Title>

      {nested.map((i) =>
        i.data.map((i, index) => (
          <div key={index} className="w-full mt-12 first:mt-0">
            <Title el="h4" id={sanitizedToParams(i.title)} size="h4" variant="section">
              {i.title}
            </Title>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 mt-5 sm:gap-6">
              {i.data.map((i, index) => (
                <Link
                  key={index}
                  href={i.href}
                  title={i.title}
                  className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
                >
                  <span className="font-medium">{displayName(i.title)}</span>
                </Link>
              ))}
            </div>
          </div>
        )),
      )}
    </Container>
  );
}
