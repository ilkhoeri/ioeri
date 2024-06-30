import fs from "fs-extra";
import path from "node:path";

import { Tabs } from "@/library/components/tabs";
import { retitled, sourceFiles } from "@/library/utils";
import { getMdFile } from "@/library/scripts/get-md-file";
import { Playground } from "@/library/components/playground";
import { Container, Title } from "@/library/components/components";
import { Code, escapeCode } from "@/library/components/code";
import { getContExt, getMdx, type ContExt } from "@/library/scripts/get-file-content";
import { sanitizedToParams } from "@/modules";

import type { Metadata } from "next";

interface Params {
  params: { examples: string[] };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const namePage = retitled(params.examples) || "NotFound!";
  const urlOpenGraph = `${domain}/examples/${params.examples.join("/")}`;
  return {
    title: namePage,
    description: namePage,
    openGraph: {
      title: namePage,
      description: namePage,
      url: urlOpenGraph,
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

  const childrens: { [key: string]: React.JSX.Element | null } = {};

  if (code) {
    childrens.code = <Code setInnerHTML={escapeCode(code)} code={code} />;
  }
  if (css) {
    childrens.css = <Code code={String(css)} />;
  }
  if (usage) {
    childrens.usage = <Code setInnerHTML={escapeCode(usage)} code={usage} />;
  }

  return (
    <Tabs defaultValue="code" id="code" className="w-full scroll-m-20">
      <Playground edit={example} childrens={childrens} />
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
          code: <Code code={String(codePoly)} />,
          usage: <Code code={String(usagePoly)} />,
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
      <Title
        title={retitled(params.examples)}
        id={sanitizedToParams(retitled(params.examples))}
        className="mt-0 mb-12"
      />
      {components.filter(Boolean)}
    </Container>
  );
}
