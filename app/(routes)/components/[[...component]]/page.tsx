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

export default async function Page({ params }: Params) {
  return (
    <Article className="gap-12 pt-4">
      <Title type="tick" title={remakeTitle(params.component)} />

      <Playground
        defaultState="code"
        childrens={{
          code: (
            <CodeCustomizer
              code={markdownCustomizer(String(`test ${remakeTitle(params.component)} is under constructions`))}
            />
          ),
        }}
      />
    </Article>
  );
}

function remakeTitle(text: string[] | undefined) {
  const o = text === undefined ? "Components" : text[text.length - 1];
  return capitalizeWords(o);
}
