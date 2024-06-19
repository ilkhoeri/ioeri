import { Playground } from "@/components/ui/playground";
import { Article, Title } from "@/components/ui/components";
import { CodeCustomizer } from "@/components/ui/code-customizer";
import { getFileContent } from "@/scripts/get-file-content";
import { getRepository } from "@/scripts/get-repository";
import { kebabToCamelCase } from "@/modules";

import type { Metadata } from "next";

interface Params {
  params: { functionsId: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const namePage = params.functionsId;
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

async function getCode(sourcePath: string): Promise<string | null> {
  return getFileContent(`/modules/functions/${sourcePath}`, `${sourcePath}.ts`);
}
async function getCss(sourcePath: string): Promise<string | null> {
  const cssPath = sourcePath.replace("use-", "");
  return getFileContent(`/modules/functions/${sourcePath}`, `${cssPath}.css`);
}
async function getUsage(sourcePath: string): Promise<string | null> {
  return getFileContent(`/modules/functions/${sourcePath}`, `${sourcePath}-usage.md`);
}

export default async function Page({ params }: Params) {
  const [code, css, usage] = await Promise.all([
    getCode(params.functionsId),
    getCss(params.functionsId),
    getUsage(params.functionsId),
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

  return (
    <Article className="gap-12 pt-4">
      <Title type="tick" title={kebabToCamelCase(params.functionsId)} />
      <Playground
        defaultState="code"
        childrens={childrens}
        linkCode={getRepository("functions", params.functionsId, "ts")}
      />
    </Article>
  );
}
