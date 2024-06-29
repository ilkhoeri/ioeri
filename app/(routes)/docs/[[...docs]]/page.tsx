import { Tabs } from "@/library/components/tabs";
import { retitled, sourceFiles } from "@/library/utils";
import { Playground } from "@/library/components/playground";
import { CodeCustomizer, escapeCode } from "@/library/components/code-customizer";
import { Container, Paragraph, Title } from "@/library/components/components";
import { getMdx, getContExt, type ContExt } from "@/library/scripts/get-file-content";
import { sanitizedToParams } from "@/modules";

import type { Metadata } from "next";
import { Examples, FallbackComponent } from "./examples";

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

async function getReserveCode({ params }: DocsParams, extension: string): Promise<string | null> {
  const res = await fetch(
    `https://raw.githubusercontent.com/ilkhoeri/modules/main/${sourceFiles(params.docs)}${extension}`,
  );
  return await res.text();
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
async function getSection({ params }: DocsParams, sectionId: string): Promise<string | null> {
  return getMdx(`/modules/${sourceFiles(params.docs)}`, sectionId);
}

export default async function Page({ params }: DocsParams) {
  const { content: code, extension: codeExt } = await getCode({ params });
  const usage = await getUsage({ params }).then((res) => res.content);

  const XTS = codeExt || ".tsx";
  const reserveCode = code === null ? await getReserveCode({ params }, `${XTS}`) : null;
  const reserveUsage = usage === null ? await getReserveUsage({ params }) : null;

  const [css, title, description] = await Promise.all([
    getCss({ params }).then((res) => res.content),
    getSection({ params }, "title"),
    getSection({ params }, "description"),
    // getSection({ params }, "usage"),
    ,
  ]);

  const childrens: { [key: string]: React.JSX.Element | null } = {};
  const codes: { [key: string]: React.JSX.Element | null } = {};

  if (usage) {
    childrens.preview = <Examples params={params} />;
    childrens.usage = <CodeCustomizer setInnerHTML code={escapeCode(usage)} />;
  } else if (reserveUsage) {
    childrens.usage = <CodeCustomizer setInnerHTML code={escapeCode(reserveUsage)} />;
  }

  if (css) {
    codes.css = <CodeCustomizer code={css} />;
  }
  if (code) {
    codes.code = <CodeCustomizer code={code} />;
  } else if (reserveCode) {
    codes.code = <CodeCustomizer code={reserveCode} />;
  }

  return (
    <Container>
      <Title
        size="h1"
        variant="segment"
        title={title || retitled(params.docs)}
        id={sanitizedToParams(retitled(params.docs))}
        className={description ? "mt-0 mb-4" : "mt-0 mb-12"}
      />

      {description && (
        <Paragraph color="default" className="mt-0 mb-12 text-base" dangerouslySetInnerHTML={{ __html: description }} />
      )}

      {(usage || reserveUsage) && (
        <Tabs defaultValue="usage" id="usage" className="w-full">
          <Playground childrens={childrens} />
        </Tabs>
      )}

      <Tabs defaultValue="code" id="code" className="w-full mt-12">
        <Playground childrens={codes} repo={`${sourceFiles(params.docs)}${XTS}`} />
      </Tabs>
    </Container>
  );
}

function slug(texts: string[] | undefined) {
  return texts === undefined ? " " : texts[texts.length - 1];
}
