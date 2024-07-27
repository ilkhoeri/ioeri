"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { FileIcon } from "@/modules/icons";
import { retitled, slug, sourceFiles } from "@/library/utils";
import { Spinner } from "@/library/assets/anim-loader";
import { Tabs } from "@/library/components/tabs";
import { Playground } from "@/library/components/playground";
import { Code, Customizer, Reference } from "@/library/components/code";
import { readdirPrefix } from "@/library/scripts/get-demos";
import { sanitizedToParams, toPascalCase } from "@/modules/index";
import { Content } from "@/library/scripts/get-contents";
import { highlightCode } from "@/library/utils/escape-code";
import { Title } from "@/library/components/components";

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
  params,
  usage,
  reference,
  consideration,
  description,
  reUsage,
  files,
}: DocsParams & {
  usage: { [key: string]: string | null };
  reference?: { [key: string]: string | null };
  consideration?: { [key: string]: string | null };
  description?: { [key: string]: string | null } | string | null;
  reUsage?: string | null;
  files: string[];
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

        {reUsage && (
          <Tabs defaultValue="usage" className="w-full mb-12">
            <Playground
              childrens={{
                usage: (
                  <Code title={`${slug(params.docs)}-demo.tsx`} ext=".tsx" code={reUsage} setInnerHTML={reUsage} />
                ),
              }}
            />
          </Tabs>
        )}

        {reUsage && description && typeof description === "string" && <Customizer setInnerHTML={description} />}
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
            {reference && <Reference title="API reference" setInnerHTML={await highlightCode(reference[file])} />}
            {consideration && <Customizer setInnerHTML={await highlightCode(consideration[file])} />}

            <Tabs defaultValue="preview" className="w-full mb-12">
              <Playground
                childrens={{
                  preview: (
                    <article
                      data-rehype-pretty-code-fragment=""
                      className="relative min-h-[32rem] mx-auto size-full flex flex-col items-center justify-center"
                    >
                      <React.Suspense fallback={<Spinner size={22} classNames={{ root: "my-auto" }} />}>
                        <Component />
                      </React.Suspense>
                    </article>
                  ),
                  usage: (
                    <Code
                      title={`${file}.tsx`}
                      ext=".tsx"
                      code={usage[file]}
                      setInnerHTML={await highlightCode(usage[file] || "")}
                    />
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
