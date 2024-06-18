import fs from "fs-extra";
import path from "node:path";

import { Playground } from "@/components/ui/playground";
import { Article, Title } from "@/components/ui/components";
import { CodeCustomizer, markdownCustomizer } from "@/components/ui/code-customizer";

import { capitalizeWords } from "@/modules";
import { getMdFile } from "@/scripts/get-md-file";
import { Code } from "@/components/ui/code";
import type { Metadata } from "next";
import { getFileContent } from "@/scripts/get-file-content";

interface Params {
  params: {
    component: string[];
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const namePage = remakeTitle(params.component);
  return {
    title: namePage ? namePage : "NotFound!",
    description: namePage,
    openGraph: {
      title: namePage || "NotFound!",
      description: namePage || "NotFound!",
      url: url + "/" + namePage,
      locale: "id-ID",
      type: "website",
    },
  };
}

async function getCode(sourcePath: string[]): Promise<string | null> {
  return getFileContent(`/modules/components/${sourcePath.join("/")}`, `${slug(sourcePath)}.tsx`);
}
async function getUsage(sourcePath: string[]): Promise<string | null> {
  return getFileContent(`/modules/components/${sourcePath.join("/")}`, `${slug(sourcePath)}-usage.md`);
}
async function getCss(sourcePath: string[]): Promise<string | null> {
  return getFileContent(`/modules/components/${sourcePath.join("/")}`, `${slug(sourcePath)}.css`);
}

export default async function Page({ params }: Params) {
  const [code, css, usage] = await Promise.all([
    getCode(params.component),
    getCss(params.component),
    getUsage(params.component),
  ]);

  const childrens: { [key: string]: React.JSX.Element } = {};

  if (code) {
    childrens.code = <CodeCustomizer code={code} />;
  }
  if (css) {
    childrens.css = <CodeCustomizer code={css} />;
  }
  if (usage) {
    childrens.usage = <CodeCustomizer code={usage} />;
  }

  if (!code && !css && !usage) {
    return (
      <Title type="tick" title={`${remakeTitle(params.component)} is under constructions`} className="mt-16 mx-auto" />
    );
  }

  return (
    <Article className="gap-12 pt-4">
      <Title type="tick" title={remakeTitle(params.component)} />

      <Playground defaultState="code" childrens={childrens} />
    </Article>
  );
}

function remakeTitle(texts: string[] | undefined) {
  const length = texts?.length;
  const secondLast = length ? texts[texts?.length - 2] : "";
  const last = length ? texts[texts?.length - 1] : "";
  const text = texts === undefined ? "Components" : `${capitalizeWords(secondLast)} / ${capitalizeWords(last)}`;
  return text;
}

function slug(texts: string[] | undefined) {
  return texts === undefined ? "" : texts[texts.length - 1];
}
