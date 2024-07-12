"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { FileIcon } from "@/modules/icons";
import { sourceFiles } from "@/library/utils";
import { Spinner } from "@/library/assets/anim-loader";

interface DocsParams {
  params: {
    examples: string[];
  };
}

export const FallbackComponent = ({ params }: DocsParams) => (
  <div>
    <p className=" border-b pt-2 pb-1">Component not found</p>
    <a
      href={`https://github.com/ilkhoeri/ioeri/edit/main/resource/${sourceFiles(params.examples)}.tsx`}
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
      import(`@/resource/examples/${params.examples.join("/")}`)
        .then((mod) => mod.Example)
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
    <article className="relative min-h-screen mx-auto w-full flex flex-col items-center justify-center max-w-screen-3xl">
      <Suspense fallback={<Spinner size={22} classNames={{ root: "my-auto" }} />}>
        <Component />
      </Suspense>
    </article>
  );
}
