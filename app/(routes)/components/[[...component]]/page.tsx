import { Title } from "@/components/ui/components";
import { Playground } from "@/components/ui/playground";
import { CodeCustomizer } from "@/components/ui/code-customizer";
import { getFileContent } from "@/scripts/get-file-content";
import { getRepository } from "@/scripts/get-repository";
import { capitalizeWords } from "@/modules";

import type { Metadata } from "next";

interface Params {
  params: { component: string[] };
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
  const path = sourcePath !== undefined ? sourcePath.join("/") : "";
  return getFileContent(`/modules/components/${path}`, `${slug(sourcePath)}.tsx`);
}
async function getUsage(sourcePath: string[]): Promise<string | null> {
  const path = sourcePath !== undefined ? sourcePath.join("/") : "";
  return getFileContent(`/modules/components/${path}`, `${slug(sourcePath)}-usage.md`);
}
async function getCss(sourcePath: string[]): Promise<string | null> {
  const path = sourcePath !== undefined ? sourcePath.join("/") : "";
  return getFileContent(`/modules/components/${path}`, `${slug(sourcePath)}.css`);
}

export default async function Page({ params }: Params) {
  const sourcePath =
    params.component !== undefined ? remakeTitle(params.component) : "Components is under constructions";
  const [code, css, usage] = await Promise.all([
    getCode(params.component),
    getCss(params.component),
    getUsage(params.component),
  ]);

  const childrens: { [key: string]: React.JSX.Element | null } = {};

  if (code) {
    childrens.code = <CodeCustomizer code={code} />;
  }
  if (css) {
    childrens.css = <CodeCustomizer code={css} />;
  }
  if (usage) {
    childrens.usage = <CodeCustomizer code={usage} />;
  }

  if (params.component === undefined) {
    return <Title type="tick" title={String(sourcePath)} className="mt-16 mx-auto" />;
  }

  return (
    <>
      <Title type="tick" title={String(sourcePath)} />
      <Playground
        defaultState="code"
        childrens={childrens}
        linkCode={getRepository("components", params.component, "tsx")}
      />
    </>
  );
}

function remakeTitle(texts: string[] | undefined) {
  const length = texts?.length;
  const secondLast = length ? texts[texts?.length - 2] : " ";
  const last = length ? texts[texts?.length - 1] : " ";
  const text = texts === undefined ? "Components" : `${capitalizeWords(secondLast)} / ${capitalizeWords(last)}`;
  return text;
}

function slug(texts: string[] | undefined) {
  return texts === undefined ? " " : texts[texts.length - 1];
}
