import { Demos } from "./demo";
import { Tabs } from "@/library/components/tabs";
import { highlightCode } from "@/library/utils/escape-code";
import { Playground } from "@/library/components/playground";
import { prefixName, retitled, slug, sourceFiles } from "@/library/utils";
import { getFilesWithPrefix, readdirPrefix } from "@/library/scripts/get-demos";
import { toPascalCase, sanitizedToParams } from "@/resource/docs";
import { Container, Title } from "@/library/components/components";
import { Code, Customizer, Reference } from "@/library/components/code";
import { getMdx, getContent, type Content, getRepo } from "@/library/scripts/get-contents";

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
async function getCodeDemo({ params }: DocsParams, files: string[]) {
  const usageMap: { [key: string]: string | null } = {};
  const referenceMap: { [key: string]: string | null } = {};
  const descriptionMap: { [key: string]: string | null } = {};
  const considerationMap: { [key: string]: string | null } = {};
  for (const file of files) {
    const rename = { Demo: `${prefixName(params.docs, file)}Demo` };
    const usage = await getContent(
      `resource/_docs_demo/${readdirPrefix("readdir", params.docs)}/${file}`,
      undefined,
      rename,
    );
    usageMap[file] = usage.content;

    const reference = await getMdx(`/resource/docs/${sourceFiles(params.docs)}`, `api-reference-${file}`);
    referenceMap[file] = reference;

    const description = await getMdx(`/resource/docs/${sourceFiles(params.docs)}`, `description-${file}`);
    descriptionMap[file] = description;

    const consideration = await getMdx(`/resource/docs/${sourceFiles(params.docs)}`, `consideration-${file}`);
    considerationMap[file] = consideration;
  }
  return { usages: usageMap, reference: referenceMap, description: descriptionMap, consideration: considerationMap };
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
  const files = getFilesWithPrefix({ params });
  const demo = await getCodeDemo({ params }, files);

  const reUsage = !demo.usages.length ? await getReUsage({ params }) : null;
  let reCode = null;
  if (process.env.NODE_ENV === "production") {
    reCode = await getReCode({ params }, `${ce}`);
  }

  const [css, dependOn, description, explanation, conclusion, notes] = await Promise.all([
    getCss({ params }).then((res) => res.content),
    getSection({ params }, "depend-on"),
    getSection({ params }, "description"),
    getSection({ params }, "explanation"),
    getSection({ params }, "conclusion"),
    getSection({ params }, "notes"),
  ]);

  const codes: { [key: string]: React.JSX.Element | null } = {};
  const repo: string = `${sourceFiles(params.docs)}${ce}`;
  const file: string = `${slug(params.docs)}${ce}`;

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
      {(demo || reUsage) && (
        <Demos
          files={files}
          params={params}
          usage={demo.usages}
          reference={demo.reference}
          consideration={demo.consideration}
          reUsage={await highlightCode(reUsage)}
          description={demo.description || (await highlightCode(description, { copy: true }))}
        />
      )}

      <div id="code">
        <Customizer setInnerHTML={await highlightCode(dependOn)} className="mb-4 text-paragraph border-t pt-4" />
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
