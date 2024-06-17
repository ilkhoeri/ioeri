import fs from "fs-extra";
import path from "node:path";

import { Playground } from "@/components/ui/playground";
import { Article, Title } from "@/components/ui/components";
import { CodeCustomizer, markdownCustomizer } from "@/components/ui/code-customizer";

import { capitalizeWords } from "@/modules";
import { getMdFile } from "@/scripts/get-md-file";
import { Code } from "@/components/ui/code";
import type { Metadata } from "next";

interface Params {
  params: {
    playgroundId: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const slug = params.playgroundId;
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

export default async function Page({ params }: Params) {
  const [edit, css, usage, code] = await Promise.all([
    fs.readFile(path.join(process.cwd(), "/md/markdown-text-example.md"), "utf-8"),
    fs.readFile(path.join(process.cwd(), "/modules/utils/formatter/markdown-text.css"), "utf-8"),
    fs.readFile(path.join(process.cwd(), "/modules/utils/formatter/markdown-text-usage.md"), "utf-8"),
    getMdFile("convert", "modules/utils/formatter/markdown-text.ts"),
  ]);

  const [codePoly, usagePoly] = await Promise.all([
    // getMdFile("convert", "components/ui/element.tsx"),
    fs.readFile(path.join(process.cwd(), "/components/ui/element.tsx"), "utf-8"),
    fs.readFile(path.join(process.cwd(), "/components/ui/element-usage.md"), "utf-8"),
  ]);

  let component;

  if (params.playgroundId === "markdown-editor") {
    component = (
      <Playground
        edit={edit}
        childrens={{
          code: <CodeCustomizer code={String(code)} />,
          css: <CodeCustomizer code={String(css)} />,
          usage: <CodeCustomizer code={String(usage)} />,
        }}
      />
    );
  }
  if (params.playgroundId === "polymorphic") {
    component = (
      <Playground
        defaultState="code"
        childrens={{
          code: <CodeCustomizer code={String(codePoly)} />,
          usage: <CodeCustomizer code={String(usagePoly)} />,
        }}
      />
    );
  }

  return (
    <Article className="gap-12 pt-4">
      <Title type="tick" title={capitalizeWords(params.playgroundId)} />

      {component}
    </Article>
  );
}
