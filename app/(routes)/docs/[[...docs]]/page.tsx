import Docs from "./docs";
import { Tabs } from "@/library/components/tabs";
import { retitled, sourceFiles } from "@/library/utils";
import { Playground } from "@/library/components/playground";
import { CodeCustomizer } from "@/library/components/code-customizer";
import { Container, Paragraph, Title } from "@/library/components/components";
import { getMdx, getContExt, type ContExt } from "@/library/scripts/get-file-content";
import { sanitizedToParams } from "@/modules";

import type { Metadata } from "next";
import { getMdFile } from "@/library/scripts/get-md-file";

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
async function getCode({ params }: DocsParams): Promise<ContExt> {
  return getContExt(`/modules/${sourceFiles(params.docs)}`, [".tsx", ".ts"]);
}
async function getCss({ params }: DocsParams): Promise<ContExt> {
  return getContExt(`/modules/${sourceFiles(params.docs)}`, [".css"]);
}
async function getSection({ params }: DocsParams, sectionId: string): Promise<string | null> {
  return getMdx(`/modules/${sourceFiles(params.docs)}`, sectionId);
}

async function docsPage({ params }: DocsParams): Promise<React.JSX.Element> {
  const { content: code, extension: codeExt } = await getCode({ params });
  const reserveCode = code === null ? await getReserveCode({ params }, `${codeExt}`) : null;

  const [css, title, description, usage] = await Promise.all([
    getCss({ params }).then((res) => res.content),
    getSection({ params }, "title"),
    getSection({ params }, "description"),
    getSection({ params }, "usage"),
  ]);

  const childrens: { [key: string]: React.JSX.Element | null } = {};

  if (usage) {
    childrens.usage = <CodeCustomizer code={usage} />;
  }
  if (code) {
    childrens.code = <CodeCustomizer code={code} />;
  } else if (reserveCode) {
    childrens.code = <CodeCustomizer code={reserveCode} />;
  }
  if (css) {
    childrens.css = <CodeCustomizer code={css} />;
  }

  return (
    <Container>
      {/* <h4 className="text-h3 font-bold">{String(sourceFiles(params.docs))}</h4> */}

      <Title
        title={title || retitled(params.docs)}
        id={sanitizedToParams(retitled(params.docs))}
        className={description ? "mt-0 mb-0" : "mt-0 mb-12"}
      />

      {description && <Paragraph className="mt-0 mb-12" dangerouslySetInnerHTML={{ __html: description }} />}

      <Tabs defaultValue="code" id="code" className="w-full scroll-m-20">
        <Playground childrens={childrens} repo={`${sourceFiles(params.docs)}${codeExt}`} />
      </Tabs>
    </Container>
  );
}

async function loadPage({ params }: DocsParams): Promise<React.JSX.Element> {
  return (
    <Container>
      <h4 className="text-h3 font-bold">{String(sourceFiles(params.docs))}</h4>

      <h4 className="text-h3 font-bold">Length: {String(params.docs.length)}</h4>
      <Title
        title={String(slug(params.docs))}
        id={sanitizedToParams(String(slug(params.docs)))}
        className="mt-0 mb-12"
      />
    </Container>
  );
}

export default async function Page({ params }: DocsParams) {
  if (params.docs === undefined) {
    return <Docs />;
  } else {
    if (params.docs.length === 1) {
      return loadPage({ params });
    } else {
      return docsPage({ params });
    }
  }
}

function slug(texts: string[] | undefined) {
  return texts === undefined ? " " : texts[texts.length - 1];
}
