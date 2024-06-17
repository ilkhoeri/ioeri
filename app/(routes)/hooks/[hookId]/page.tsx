import { Playground } from "@/components/ui/playground";
import { Article, Title } from "@/components/ui/components";
import { CodeCustomizer } from "@/components/ui/code-customizer";
import { getFileContent } from "@/scripts/get-file-content";
import { kebabToCamelCase } from "@/modules";

import type { Metadata } from "next";

interface Params {
  params: {
    hookId: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const namePage = params.hookId;
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
  return getFileContent(`/modules/hooks/${sourcePath}`, `${sourcePath}.ts`);
}
async function getUsage(sourcePath: string): Promise<string | null> {
  return getFileContent(`/modules/hooks/${sourcePath}`, `${sourcePath}-usage.md`);
}
async function getCss(sourcePath: string): Promise<string | null> {
  const cssPath = sourcePath.replace("use-", "");
  return getFileContent(`/modules/hooks/${sourcePath}`, `${cssPath}.css`);
}

export default async function Page({ params }: Params) {
  const [code, css, usage] = await Promise.all([
    getCode(params.hookId),
    getCss(params.hookId),
    getUsage(params.hookId),
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
      <Title type="tick" title={kebabToCamelCase(params.hookId)} />

      <Playground defaultState="code" childrens={childrens} />
    </Article>
  );
}
