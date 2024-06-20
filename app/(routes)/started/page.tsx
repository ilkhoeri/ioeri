import Link from "next/link";
import { ExpoIcon, NextjsIcon, ReactIcon, Svg, TerminalOutlineIcon } from "@/modules";
import type { Metadata } from "next";
import { frameworks } from "@/routes";
import { Paragraph, Title } from "@/components/ui/components";
import { CopyToggle } from "@/components/ui/toggle";
import { InstallCommand } from "@/components/assets/parts/install-command";

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
            <span>Create your project and compactness the required dependencies.</span>
          </p>
        </div>
        <div className="pt-8">
          <div className="mdx">
            <QuickInstallation />

            <FrameworksCard />

            <div className="mt-12">
              <Title el="h2" type="drive" id="typescript">
                <TypingIcon />
                TypeScript
              </Title>

              <Paragraph>
                This project and the components are written in TypeScript. We recommend using TypeScript for your
                project as well.
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FrameworksCard() {
  return (
    <>
      <Title el="h2" type="drive" id="frameworks">
        <BoxIcon />
        Learn Frameworks
      </Title>

      <Paragraph>
        This project is based on the&nbsp;
        <A title="React.js" href="https://react.dev/learn/" />
        &nbsp;library.
      </Paragraph>
      <Paragraph>
        On web projects we recommend using&nbsp;
        <A title="Next.js" href="https://nextjs.org/" />
        , or&nbsp;
        <A title="Remix" href="https://remix.run/docs/" />
        , or&nbsp;
        <A title="Gatsby" href="https://www.gatsbyjs.com/docs/" />
        &nbsp;framework. On mobile app projects we recommend using&nbsp;
        <A title="Expo" href="https://docs.expo.dev/" />
        &nbsp;framework.
      </Paragraph>

      <div className="grid sm:grid-cols-2 gap-4 mt-8 sm:gap-6">
        {frameworks.map((i) => (
          <Link
            key={i.title}
            href={i.href}
            target="_blank"
            className="flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10"
          >
            <i.icon className="size-10" />
            <p className="font-medium mt-2">{i.title}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

function A({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="underline underline-offset-2 decoration-muted hover:decoration-muted-foreground">
      {title}
    </Link>
  );
}

function QuickInstallation() {
  return (
    <>
      <Title el="h2" type="drive" id="installation">
        <StromIcon />
        Quick Installation
      </Title>

      <InstallCommand />
    </>
  );
}

function StromIcon() {
  return (
    <Svg width="18" height="23" viewBox="0 0 18 23" fill="#FFF5B1" stroke="#F2C012" className="mr-3 mt-1.5 float-left">
      <path d="M12.3953 1.65402L1.11071 11.5713L8.35515 13.5124L5.39339 21.3461L16.678 11.4289L9.43357 9.48772L12.3953 1.65402Z" />
    </Svg>
  );
}
function BoxIcon() {
  return (
    <Svg stroke="#F2C012" className="mr-3 mt-1.5 size-[25px] float-left">
      <path
        fill="#F2C012"
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      />
      <polyline stroke="hsl(var(--background))" points="3.29 7 12 12 20.71 7" />
      <line stroke="hsl(var(--background))" x1="12" x2="12" y1="22" y2="12" />
    </Svg>
  );
}
function TypingIcon() {
  return (
    <Svg viewBox="0 0 512 512" fill="#F2C012" stroke="none" className="mr-3 mt-1.5 size-[24px] float-left">
      <rect width="512" height="512" rx="15%" />
      <path
        fill="hsl(var(--background))"
        d="m233 284h64v-41H118v41h64v183h51zm84 173c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4c11-2.3 20-6.1 28-11c8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9c-5.2-2.6-9.7-5.2-13-7.8c-3.7-2.7-6.5-5.5-8.5-8.4c-2-3-3-6.3-3-10c0-3.4.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6c4.7-1.1 9.9-1.6 16-1.6c4.2 0 8.6.31 13 .94c4.6.63 9.3 1.6 14 2.9c4.7 1.3 9.3 2.9 14 4.9c4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21c-4.7 8.4-7 18-7 30c0 15 4.3 28 13 38c8.6 11 22 19 39 27c6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5c2.5 3.4 3.8 7.4 3.8 12c0 3.2-.78 6.2-2.3 9s-3.9 5.2-7.1 7.2s-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7c-11 0-22-1.9-32-5.7c-11-3.8-21-9.5-28.1-15.44z"
      />
    </Svg>
  );
}
