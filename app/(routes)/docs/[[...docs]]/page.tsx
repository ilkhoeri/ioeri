import { Tabs } from "@/library/components/tabs";
import { retitled, slug, sourceFiles } from "@/library/utils";
import { Playground } from "@/library/components/playground";
import { Code, Customizer, APIReference } from "@/library/components/code";
import { Container, Title } from "@/library/components/components";
import { getMdx, getContent, type Content, getRepo } from "@/library/scripts/get-contents";
import { escapeCode, highlightCode, mdCustom } from "@/library/utils/escape-code";
import { toPascalCase, sanitizedToParams } from "@/resource/docs";
import { Examples } from "./demo";

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

const gitrepo = `https://raw.githubusercontent.com/ilkhoeri/ioeri/main`;

async function getReCode({ params }: DocsParams, ext: string): Promise<string> {
  // return (await fetch(`${gitrepo}/resource/docs/${sourceFiles(params.docs)}${ext}`)).text();
  return getRepo(`${gitrepo}/resource/docs/${sourceFiles(params.docs)}`, ext);
}
async function getCode({ params }: DocsParams): Promise<Content> {
  if (!params.docs) return { content: null, extension: null };
  return getContent(`/resource/docs/${sourceFiles(params.docs)}`, [".tsx", ".ts"]);
}
async function getReUsage({ params }: DocsParams): Promise<string | null> {
  if (!params.docs) return null;
  return getMdx(`/resource/docs/${sourceFiles(params.docs)}`, "usage");
}
async function getUsage({ params }: DocsParams, replace?: Record<string, string>): Promise<Content> {
  if (!params.docs) return { content: null, extension: null };
  return getContent(`/resource/_docs_demo/${params.docs.join("/")}`, undefined, replace);
}
async function getCss({ params }: DocsParams): Promise<Content> {
  if (!params.docs) return { content: null, extension: null };
  return getContent(`/resource/docs/${sourceFiles(params.docs)}`, [".css"], undefined, { lang: "css" });
}
async function getSection({ params }: DocsParams, id: string): Promise<string | null> {
  if (!params.docs) return null;
  return getMdx(`/resource/docs/${sourceFiles(params.docs)}`, id);
}

export default async function Page({ params }: DocsParams) {
  const code = await getCode({ params });
  const ce = code.extension || ".tsx";
  const reCode = await getReCode({ params }, `${ce}`);

  const rename = { Demo: `${toPascalCase(slug(params.docs))}Demo` };
  const usage = await getUsage({ params }, rename).then((res) => res.content);
  const reUsage = usage === null ? await getReUsage({ params }) : null;

  const [css, title, reference, consideration, description, explanation, conclusion, notes] = await Promise.all([
    getCss({ params }).then((res) => res.content),
    getSection({ params }, "title"),
    getSection({ params }, "api-reference"),
    getSection({ params }, "consideration"),
    getSection({ params }, "description"),
    getSection({ params }, "explanation"),
    getSection({ params }, "conclusion"),
    getSection({ params }, "notes"),
  ]);

  const usages: { [key: string]: React.JSX.Element | null } = {};
  const codes: { [key: string]: React.JSX.Element | null } = {};
  const repo: string = `${sourceFiles(params.docs)}${ce}`;
  const file: string = `${slug(params.docs)}${ce}`;

  if (usage) {
    usages.preview = <Examples params={params} />;
    usages.usage = (
      <Code title={`${slug(params.docs)}-demo.tsx`} ext=".tsx" code={usage} setInnerHTML={await highlightCode(usage)} />
    );
  } else if (reUsage) {
    usages.usage = (
      <Code
        title={`${slug(params.docs)}-demo.tsx`}
        ext=".tsx"
        code={reUsage}
        setInnerHTML={await highlightCode(reUsage)}
      />
    );
  }

  if (css) {
    codes.css = (
      <Code title={`${slug(params.docs)}.css`} ext=".css" code={css} setInnerHTML={await highlightCode(css)} />
    );
  }

  if (code.content) {
    codes.code = (
      <Code title={file} repo={repo} ext={ce} code={code.content} setInnerHTML={await highlightCode(code.content)} />
    );
  } else if (reCode) {
    codes.code = <Code title={file} repo={repo} ext={ce} code={reCode} setInnerHTML={await highlightCode(reCode)} />;
  }

  return (
    <Container>
      <div>
        <Title
          size="h1"
          variant="segment"
          title={title || retitled(params.docs)}
          id={sanitizedToParams(retitled(params.docs))}
          className="mt-0 mb-12"
        />
        <APIReference setInnerHTML={await highlightCode(reference)} />
        <Customizer setInnerHTML={await highlightCode(consideration)} />
      </div>

      {(usage || reUsage) && (
        <div id="usage">
          <Tabs defaultValue={usage ? "preview" : "usage"} className="w-full mb-12">
            <Playground childrens={usages} />
          </Tabs>
          <Customizer setInnerHTML={await highlightCode(description, { copy: true })} />
        </div>
      )}

      <div id="code">
        <Tabs defaultValue="code" className="w-full mb-12">
          <Playground childrens={codes} />
        </Tabs>
        <Customizer setInnerHTML={await highlightCode(explanation, { copy: true })} />
        <Customizer setInnerHTML={await highlightCode(conclusion, { copy: true })} />
      </div>

      {conclusion && notes && <hr className="mt-12 b-4 w-full" />}
      <Customizer setInnerHTML={await highlightCode(notes)} />
    </Container>
  );
}
