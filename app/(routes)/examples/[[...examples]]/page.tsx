import fs from "fs-extra";
import path from "node:path";

import { Tabs } from "@/library/components/tabs";
import { retitled, sourceFiles } from "@/library/utils";
import { Playground } from "@/library/components/playground";
import { Container, Title } from "@/library/components/components";
import { getMdx, getContent, type Content } from "@/library/scripts/get-contents";
import { escapeCode } from "@/library/utils/escape-customizer";
import { Code } from "@/library/components/code";
import { sanitizedToParams } from "@/modules";

import type { Metadata } from "next";
import { EditableContent } from "./client";

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

async function getCode({ params }: Params): Promise<Content> {
  return getContent(`/modules/${sourceFiles(params.examples)}`, [".tsx", ".ts"]);
}
async function getCss({ params }: Params): Promise<Content> {
  return getContent(`/modules/${sourceFiles(params.examples)}`, [".css"]);
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
      <Playground
        childrens={{
          edit: <EditableContent content="edit" edit={example} />,
          preview: <EditableContent content="preview" edit={example} />,
          ...childrens,
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
