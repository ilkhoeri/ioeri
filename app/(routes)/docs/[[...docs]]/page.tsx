import { Tabs } from "@/library/components/tabs";
import { retitled, sourceFiles } from "@/library/utils";
import { Playground } from "@/library/components/playground";
import { Code, Customizer, APIReference } from "@/library/components/code";
import { Container, Paragraph, Title } from "@/library/components/components";
import { getMdx, getContExt, type ContExt } from "@/library/scripts/get-file-content";
import { escapeCode, mdCustom } from "@/library/utils/escape-customizer";
import { sanitizedToParams } from "@/modules";
import { Examples } from "./examples";

import type { Metadata } from "next";

interface DocsParams {
  params: {
    docs: string[];
  };
}

export async function generateMetadata({ params }: DocsParams): Promise<Metadata> {
  const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const namePage = retitled(params.docs) || "NotFound!";
  const urlDocs = params.docs === undefined ? `${domain}/docs` : `${domain}/docs/${params.docs.join("/")}`;
  return {
    title: namePage,
    description: namePage,
    openGraph: {
      title: namePage,
      description: namePage,
      url: urlDocs,
      type: "website",
    },
  };
}

async function getReserveCode({ params }: DocsParams, ext: string): Promise<string | null> {
  const repo = `https://raw.githubusercontent.com/ilkhoeri/modules/main/`;
  return (await fetch(`${repo}${sourceFiles(params.docs)}${ext}`)).text();
}
async function getReserveUsage({ params }: DocsParams): Promise<string | null> {
  return getMdx(`/modules/${sourceFiles(params.docs)}`, "usage");
}
async function getUsage({ params }: DocsParams): Promise<ContExt> {
  return getContExt(`/examples/${params.docs.join("/")}`, [".tsx", ".ts"]);
}
async function getCode({ params }: DocsParams): Promise<ContExt> {
  return getContExt(`/modules/${sourceFiles(params.docs)}`, [".tsx", ".ts"]);
}
async function getCss({ params }: DocsParams): Promise<ContExt> {
  return getContExt(`/modules/${sourceFiles(params.docs)}`, [".css"]);
}
async function getSection({ params }: DocsParams, id: string): Promise<string | null> {
  return getMdx(`/modules/${sourceFiles(params.docs)}`, id);
}

export default async function Page({ params }: DocsParams) {
  const { content: code, extension: codeExt } = await getCode({ params });
  const usage = await getUsage({ params }).then((res) => res.content);

  const ce = codeExt || ".tsx";
  const reserveCode = code === null ? await getReserveCode({ params }, `${ce}`) : null;
  const reserveUsage = usage === null ? await getReserveUsage({ params }) : null;

  const [css, title, reference, description, explanation, notes] = await Promise.all([
    getCss({ params }).then((res) => res.content),
    getSection({ params }, "title"),
    getSection({ params }, "api-reference"),
    getSection({ params }, "description"),
    getSection({ params }, "explanation"),
    getSection({ params }, "notes"),
  ]);

  const usages: { [key: string]: React.JSX.Element | null } = {};
  const codes: { [key: string]: React.JSX.Element | null } = {};

  if (usage) {
    usages.preview = <Examples params={params} />;
    usages.usage = <Code setInnerHTML={escapeCode(usage)} code={usage} />;
  } else if (reserveUsage) {
    usages.usage = <Code setInnerHTML={escapeCode(reserveUsage)} code={reserveUsage} />;
  }

  if (css) {
    codes.css = <Code code={css} />;
  }
  if (code) {
    codes.code = <Code code={code} />;
  } else if (reserveCode) {
    codes.code = <Code code={reserveCode} />;
  }

  return (
    <Container>
      <Title
        size="h1"
        variant="segment"
        title={title || retitled(params.docs)}
        id={sanitizedToParams(retitled(params.docs))}
        className="mt-0 mb-12"
      />

      <APIReference title="API reference" setInnerHTML={mdCustom(reference)} />

       <Customizer setInnerHTML={description} />

      {(usage || reserveUsage) && (
        <Tabs defaultValue={usage ? "preview" : "usage"} id="usage" className="w-full mb-12">
          <Playground childrens={usages} />
        </Tabs>
      )}

      <Customizer setInnerHTML={mdCustom(explanation)} />

      <Tabs defaultValue="code" id="code" className="w-full mb-12">
        <Playground childrens={codes} repo={`${sourceFiles(params.docs)}${ce}`} />
      </Tabs>

      <Customizer setInnerHTML={mdCustom(notes)} />
    </Container>
  );
}
