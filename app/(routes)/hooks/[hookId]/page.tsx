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
    hookId: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const slug = params.hookId;
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
  const codePoly = await fs.readFile(
    path.join(process.cwd(), `/modules/hooks/${params.hookId}/${params.hookId}.ts`),
    "utf-8",
  );
  // const codePoly = await getMdFile("hooks", `modules/hooks/${params.hookId}/${params.hookId}.ts`);

  return (
    <Article className="gap-12">
      <Title type="tick" title={params.hookId} />

      <Playground
        defaultState="code"
        childrens={{ code: <CodeCustomizer code={markdownCustomizer(String(codePoly))} /> }}
      />
    </Article>
  );
}
