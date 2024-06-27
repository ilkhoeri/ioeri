import fs from "fs-extra";
import path from "node:path";

import { Container, Title } from "@/library/components/components";
import { Playground } from "@/library/components/playground";
import { CodeCustomizer } from "@/library/components/code-customizer";
import { getMdFile } from "@/library/scripts/get-md-file";
import { sanitizedToParams } from "@/modules";
import { retitled, sourceFiles } from "@/library/utils";

import type { Metadata } from "next";
import { Tabs } from "@/library/components/tabs";
import { getContExt, getMdx, type ContExt } from "@/library/scripts/get-file-content";

interface Params {
  params: { examples: string[] };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const slug = retitled(params.examples);
  const namePage = slug + " | Playground";
  return {
    title: namePage ? namePage : "NotFound!",
    description: namePage,
    openGraph: {
      title: namePage || "NotFound!",
      description: namePage || "NotFound!",
      url: url + "/" + slug,
      locale: "id-ID",
      type: "website",
    },
  };
}
async function loadFiles(paths: string[]): Promise<(string | null)[]> {
  return Promise.all(
    paths.map(async (filePath) => {
      try {
        return await fs.readFile(path.join(process.cwd(), filePath), "utf-8");
      } catch (error) {
        return null;
      }
    }),
  );
}

async function loadComponentFiles(
  basePath: string,
  usagePath: string,
  extensions: string[],
): Promise<{ code: string | null; usage: string | null }> {
  const [code, usage] = await Promise.all([
    getMdFile("convert", basePath, extensions),
    fs.readFile(path.join(process.cwd(), usagePath), "utf-8"),
  ]);
  return { code, usage };
}

async function getCode({ params }: Params): Promise<ContExt> {
  return getContExt(`/modules/${sourceFiles(params.examples)}`, [".tsx", ".ts"]);
}
async function getCss({ params }: Params): Promise<ContExt> {
  return getContExt(`/modules/${sourceFiles(params.examples)}`, [".css"]);
}
async function getSection({ params }: Params, sectionId: string): Promise<string | null> {
  return getMdx(`/modules/${sourceFiles(params.examples)}`, sectionId);
}

async function loadMarkdownTextExample({ params }: Params) {
  const [example, code, css, usage] = await Promise.all([
    getSection({ params }, "example"),
    getCode({ params }).then((res) => res.content),
    getCss({ params }).then((res) => res.content),
    getSection({ params }, "usage"),
  ]);

  return (
    <Tabs defaultValue="code" id="code" className="w-full scroll-m-20">
      <Playground
        edit={example}
        childrens={{
          code: <CodeCustomizer code={String(code)} />,
          css: <CodeCustomizer code={String(css)} />,
          usage: <CodeCustomizer code={String(usage)} />,
        }}
      />
    </Tabs>
  );
}

async function loadPolymorphicSlotExample({ params }: Params) {
  const [codePoly, usagePoly] = await Promise.all([
    getCode({ params }).then((res) => res.content),
    getCss({ params }).then((res) => res.content),
  ]);

  return (
    <Tabs defaultValue="code" id="code" className="w-full scroll-m-20">
      <Playground
        defaultState="code"
        childrens={{
          code: <CodeCustomizer code={String(codePoly)} />,
          usage: <CodeCustomizer code={String(usagePoly)} />,
        }}
      />
    </Tabs>
  );
}

const exampleLoaders: { [key: string]: (params: Params) => Promise<React.JSX.Element> } = {
  "markdown-text": loadMarkdownTextExample,
  // "polymorphic-slot": loadPolymorphicSlotExample,
};

export function generateStaticParams() {
  return [{ examples: ["a", "1"] }, { examples: ["b", "2"] }, { examples: ["c", "3"] }];
}

export default async function Page({ params }: Params) {
  const components = await Promise.all(
    params.examples.map(async (example) => {
      const loader = exampleLoaders[example];
      return loader ? loader({ params }) : null;
    }),
  );

  return (
    <Container>
      <h4 className="text-h3 font-bold">{String(sourceFiles(params.examples))}</h4>
      <Title
        title={retitled(params.examples)}
        id={sanitizedToParams(retitled(params.examples))}
        className="mt-0 mb-12"
      />
      {components.filter(Boolean)}
    </Container>
  );
}
