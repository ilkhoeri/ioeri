import { Paragraph, Title } from "@/components/ui/components";
import { Playground } from "@/components/ui/playground";
import { CodeCustomizer } from "@/components/ui/code-customizer";
import { getContent, getFileContent } from "@/scripts/get-file-content";
import { getRepository } from "@/scripts/get-repository";
import { getMdFile } from "@/scripts/get-md-file";
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

async function getReserveCode(sourcePath: string): Promise<string | null> {
  return getMdFile("reserve", `modules/functions/${sourcePath}/${sourcePath}.ts`);
}
async function getCode(sourcePath: string): Promise<string | null> {
  return getFileContent(`/modules/functions/${sourcePath}`, `${sourcePath}.ts`);
}
async function getCss(sourcePath: string): Promise<string | null> {
  return getFileContent(`/modules/functions/${sourcePath}`, `${sourcePath}.css`);
}
async function getSection(sourcePath: string, sectionId: string): Promise<string | null> {
  return getContent(`/modules/functions/${sourcePath}`, `${sourcePath}.md`, sectionId);
}

export default async function Page({ params }: Params) {
  const code = await getCode(params.functionsId);
  const reserveCode = code === null ? await getReserveCode(params.functionsId) : null;

  const [css, title, description, usage] = await Promise.all([
    getCss(params.functionsId),
    getSection(params.functionsId, "title"),
    getSection(params.functionsId, "description"),
    getSection(params.functionsId, "usage"),
  ]);

  const childrens: { [key: string]: React.JSX.Element } = {};

  if (code) {
    childrens.code = <CodeCustomizer code={code} />;
  } else if (reserveCode) {
    childrens.code = <CodeCustomizer code={reserveCode} />;
  }
  if (css) {
    childrens.css = <CodeCustomizer code={css} />;
  }
  if (usage) {
    childrens.usage = <CodeCustomizer code={usage} />;
  }

  return (
    <>
      <Title
        type="drive"
        title={title || kebabToCamelCase(params.functionsId)}
        className={title ? "mt-0" : "mt-0 mb-12"}
      />
      {description && <Paragraph className="mt-0 mb-12">{description}</Paragraph>}

      <Playground
        defaultState="code"
        childrens={childrens}
        linkCode={getRepository("functions", params.functionsId, "ts")}
      />
    </>
  );
}
