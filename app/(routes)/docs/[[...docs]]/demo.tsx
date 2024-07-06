"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Spinner } from "@/library/assets/anim-loader";
import { FileIcon } from "@/modules/icons";
import { sourceFiles } from "@/library/utils";

interface DocsParams {
  params: {
    docs: string[];
  };
}

export const FallbackComponent = ({ params }: DocsParams) => (
  <div>
    <p className=" border-b pt-2 pb-1">Component not found</p>
    <a
      href={`https://github.com/ilkhoeri/ioeri/edit/main/resource/${sourceFiles(params.docs)}.mdx`}
      target="_blank"
      className="w-max text-muted-foreground hover:text-constructive transition-colors text-sm pt-3 pb-1.5 gap-2 justify-start underline-hover"
    >
      Edit this page on GitHub <FileIcon arrow />
    </a>
  </div>
);

export const loadComponent = ({ params }: DocsParams) =>
  dynamic(
    () =>
      import(`@/resource/_docs_demo/${params.docs.join("/")}`)
        .then((mod) => mod.Demo)
        .catch((err) => {
          console.error("Error loading component:", err);
          return FallbackComponent({ params });
        }),
    {
      ssr: false,
      loading: () => <Spinner size={22} classNames={{ root: "my-auto" }} />,
    },
  );

export function Examples({ params }: DocsParams) {
  const Component = loadComponent({ params });

  return (
    <article
      data-rehype-pretty-code-fragment=""
      className="relative min-h-[32rem] mx-auto size-full flex flex-col items-center justify-center"
    >
      <Suspense fallback={<Spinner size={22} classNames={{ root: "my-auto" }} />}>
        <Component />
      </Suspense>
    </article>
  );
}

async function importComponent(path: string): Promise<{ default: React.ComponentType<any> }> {
  return import(`@/resource/_docs_demo/${path}`);
}
async function loadExampleComponent({ params }: DocsParams): Promise<React.ComponentType<any> | null> {
  try {
    const path = params.docs.join("/");
    const { default: Component } = await importComponent(path);
    const Compo = () => <Component />;
    return Compo;
  } catch {
    return null;
  }
}
