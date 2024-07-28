"use client";
import * as React from "react";
import dynamic from "next/dynamic";

import { FileIcon } from "@/modules/icons";
import { Tabs } from "@/library/components/tabs";
import { sanitizedToParams } from "@/modules/index";
import { Spinner } from "@/library/assets/anim-loader";
import { Title } from "@/library/components/components";
import { readdirPrefix } from "@/library/scripts/get-demos";
import { highlightCode } from "@/library/utils/escape-code";
import { Playground } from "@/library/components/playground";
import { retitled, slug, sourceFiles } from "@/library/utils";
import { Code, Customizer, Reference } from "@/library/components/code";

interface DocsParams {
  params: { docs: string[] };
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

export const loadComponent = ({ params }: DocsParams, filename: string) =>
  dynamic(
    () =>
      import(`@/resource/_docs_demo/${readdirPrefix("readdir", params.docs)}/${filename}`)
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

export function Demos({
  files,
  params,
  usage,
  reference,
  consideration,
  description,
}: DocsParams & {
  files: string[];
  usage: { [key: string]: string | null } | string | null;
  reference?: { [key: string]: string | null } | string | null;
  consideration?: { [key: string]: string | null } | string | null;
  description?: { [key: string]: string | null } | string | null;
}) {
  if (!files.length) {
    return (
      <div id="usage" className="mt-12">
        <Title
          size="h1"
          variant="segment"
          title={retitled(params.docs)}
          id={sanitizedToParams(retitled(params.docs))}
          className="mb-12"
        />

        {reference && typeof reference === "string" && <Reference title="API reference" setInnerHTML={reference} />}
        {consideration && typeof consideration === "string" && <Customizer setInnerHTML={consideration} />}

        {usage && typeof usage === "string" && (
          <Tabs defaultValue="usage" className="w-full mb-12 prefers_code_fragment">
            <Playground childrens={{ usage: <Customizer setInnerHTML={usage} className="mb-0 scrollbar" /> }} />
          </Tabs>
        )}

        {usage && typeof usage === "string" && description && typeof description === "string" && (
          <Customizer setInnerHTML={description} />
        )}
      </div>
    );
  }

  return (
    <React.Fragment>
      {files.map(async (file) => {
        const Component = loadComponent({ params }, file);

        return (
          <div key={file} id={sanitizedToParams(file)} className="mt-12 pt-8 border-t first:mt-6 first:pt-0 first:border-t-0">
            <Title size="h1" variant="segment" title={retitled(file)} className="mt-16 mb-12" />
            {reference && typeof reference === "object" && (
              <Reference title="API reference" setInnerHTML={await highlightCode(reference[file])} />
            )}
            {consideration && typeof consideration === "object" && (
              <Customizer setInnerHTML={await highlightCode(consideration[file])} />
            )}

            <Tabs defaultValue="preview" className="w-full mb-12">
              <Playground
                childrens={{
                  preview: (
                    <article data-rehype-pretty-code-fragment="" className="relative min-h-[32rem] mx-auto size-full flex flex-col items-center justify-center">
                      <React.Suspense fallback={<Spinner size={22} classNames={{ root: "my-auto" }} />}>
                        <Component />
                      </React.Suspense>
                    </article>
                  ),
                  usage: usage && typeof usage === "object" && (
                    <Code title={`${file}-demo.tsx`} ext=".tsx" code={usage[file]} setInnerHTML={await highlightCode(usage[file])} />
                  ),
                }}
              />
            </Tabs>

            {description && typeof description === "object" && (
              <Customizer setInnerHTML={await highlightCode(description[file], { copy: true })} />
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
}

export const loadComponentX = ({ params }: DocsParams) =>
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
