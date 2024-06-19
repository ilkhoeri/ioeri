import Link from "next/link";
import { ExpoIcon, NextjsIcon, ReactIcon } from "@/modules";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const namePage = "Getting Started";
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

export default async function Page() {
  return (
    <>
      <div className="mx-auto w-full min-w-0">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Getting Started</h1>
          <p className="text-lg text-muted-foreground">
            <span>Create your application and compactness the required dependencies.</span>
          </p>
        </div>
        <div className="pt-8">
          <div className="mdx">
            <h2
              className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
              id="frameworks"
            >
              <a
                className="font-medium underline underline-offset-4 subheading-anchor"
                aria-label="Link to section"
                href="#frameworks"
              >
                <span className="icon icon-link"></span>
              </a>
              Frameworks
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-8 sm:gap-6">
              <Link
                className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
                href=""
              >
                <NextjsIcon className="size-10" />
                <p className="font-medium mt-2">Next.js</p>
              </Link>

              <Link
                className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
                href=""
              >
                <ExpoIcon className="size-10" />
                <p className="font-medium mt-2">Expo</p>
              </Link>

              <Link
                className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
                href=""
              >
                <ReactIcon className="size-10" />
                <p className="font-medium mt-2">React</p>
              </Link>
            </div>
            <h2
              className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
              id="typescript"
            >
              <a
                className="font-medium underline underline-offset-4 subheading-anchor"
                aria-label="Link to section"
                href="#typescript"
              >
                <span className="icon icon-link"></span>
              </a>
              TypeScript
            </h2>
            <p className="leading-7 [&amp;:not(:first-child)]:mt-6">
              This project and the components are written in TypeScript. We recommend using TypeScript for your project
              as well.
            </p>
            <p className="leading-7 [&amp;:not(:first-child)]:mt-6">
              However we provide a JavaScript version of the components as well. The JavaScript version is available via
              the{" "}
              <a className="font-medium underline underline-offset-4" href="/docs/cli">
                cli
              </a>
              .
            </p>
            <p className="leading-7 [&amp;:not(:first-child)]:mt-6">
              To opt-out of TypeScript, you can use the{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">tsx</code> flag in
              your{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                components.json
              </code>{" "}
              file.
            </p>
            <div data-rehype-pretty-code-fragment="">
              <div data-rehype-pretty-code-title="" data-language="json" data-theme="default">
                components.json
              </div>
              <pre
                className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900"
                data-language="json"
                data-theme="default"
              >
                <code
                  className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
                  data-language="json"
                  data-theme="default"
                >
                  <span className="line">
                    <span></span>
                  </span>
                </code>
              </pre>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&amp;_svg]:size-3 absolute right-4 top-16">
                <span className="sr-only">Copy</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-clipboard "
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                </svg>
              </button>
            </div>
            <p className="leading-7 [&amp;:not(:first-child)]:mt-6">
              To configure import aliases, you can use the following{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">jsconfig.json</code>
              :
            </p>
            <div data-rehype-pretty-code-fragment="">
              <div data-rehype-pretty-code-title="" data-language="json" data-theme="default">
                jsconfig.json
              </div>
              <pre
                className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900"
                data-language="json"
                data-theme="default"
              >
                <code
                  className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
                  data-language="json"
                  data-theme="default"
                >
                  <span className="line">
                    <span></span>
                  </span>
                </code>
              </pre>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&amp;_svg]:size-3 absolute right-4 top-16">
                <span className="sr-only">Copy</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-clipboard "
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
}
