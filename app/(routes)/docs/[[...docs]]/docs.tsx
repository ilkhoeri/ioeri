import React from "react";
import Link from "next/link";
import { appRoutes } from "@/library/routes";
import { InstallCommand } from "@/library/assets/install-command";
import { Container, Paragraph, Title } from "@/library/components/components";
import { sanitizedToParams } from "@/modules/ondevelopment/utils";
import { Svg, TypescriptIcon } from "@/modules/components/web";

import globalStyle from "@/library/styles/styles";

export default function Docs() {
  return (
    <Container>
      <Title el="h1" className="border-b-0 pb-0 mt-0">
        Getting Started
      </Title>
      <Paragraph className="mt-2 text-color">Create your project and compactness the required dependencies.</Paragraph>

      <QuickInstallation />
      <FrameworksCard />
      <TypingNotes />
    </Container>
  );
}

function A({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} target="_blank" className="links">
      {title}
    </Link>
  );
}

function QuickInstallation() {
  return (
    <>
      <Title el="h2" id="installation" className="!leading-none">
        <StromIcon />
        Quick Installation
      </Title>

      <Paragraph color="default">
        You can use npx CLI to install the React library framework. The npx ships with npm.
      </Paragraph>
      <Paragraph color="default">
        This lets you install packages and run commands in one step. You can use the following command to start creating
        a new project.
      </Paragraph>

      <InstallCommand />
      <div className="flex items-center flex-row my-8 py-6 pl-12 pr-4 isolate [unicode-bidi:isolate] bg-background-box rounded-xl relative before:content-[''] before:absolute before:w-1 before:h-4/5 before:bg-[#202425] before:z-[10] before:left-6">
        <Paragraph>
          <span className="font-semibold">Note:</span> npx requires npm version 5.2 or later. If you’ve installed the
          latest versions of Node and npm, you should also have npx. Otherwise, you should upgrade Node and/or npm.
        </Paragraph>
      </div>
      <Paragraph>
        Once the installation completes, you can run&nbsp;
        <code className="codebox">http://localhost:3000</code>&nbsp;with your browser to start editing the project and
        using ioeri modules utility.
      </Paragraph>
    </>
  );
}

function FrameworksCard() {
  return (
    <>
      <Title el="h2" id="learn" className="!leading-none">
        <BoxIcon />
        Learn
      </Title>

      <Paragraph color="default">
        This project is based on the&nbsp;
        <A title="React.js" href="https://react.dev/learn/" />
        &nbsp;library.
      </Paragraph>
      <Paragraph color="default">
        On web projects we recommend using&nbsp;
        <A title="Next.js" href="https://nextjs.org/" />
        , or&nbsp;
        <A title="Remix" href="https://remix.run/docs/" />
        , or&nbsp;
        <A title="Gatsby" href="https://www.gatsbyjs.com/docs/" />
        &nbsp;framework. On native projects we recommend using&nbsp;
        <A title="Expo" href="https://docs.expo.dev/" />
        &nbsp;framework.
      </Paragraph>

      {appRoutes["frameworks"].map((i) => (
        <div key={i.title} className="mt-8">
          <Title el="h3" id={sanitizedToParams(i.title)} size="h4" variant="section">
            {i.title}
          </Title>

          <Paragraph>{i.description}</Paragraph>

          <div className="grid sm:grid-cols-2 gap-4 mt-5 sm:gap-6">
            {i.data.map((i) => (
              <Link
                key={i.title}
                href={i.href}
                target="_blank"
                className={globalStyle({ cards: "box" }, "p-6 sm:p-10")}
              >
                <i.icon className="size-10" />
                <p className="font-medium mt-2">{i.title}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function TypingNotes() {
  return (
    <>
      <Title el="h2" id="typescript" className="!leading-none">
        <TypescriptIcon size={28} fill="#3178c6" className="mr-3 size-[28px] float-left" />
        TypeScript
      </Title>

      <Paragraph color="default" className="mb-52">
        This project and the components are written in TypeScript. We recommend using TypeScript for your project as
        well.
      </Paragraph>
    </>
  );
}

function StromIcon() {
  return (
    <Svg
      width="18"
      height="23"
      viewBox="0 0 18 23"
      fill="hsl(var(--background))"
      stroke="#F2C012"
      className="mr-3 float-left"
    >
      <path d="M12.3953 1.65402L1.11071 11.5713L8.35515 13.5124L5.39339 21.3461L16.678 11.4289L9.43357 9.48772L12.3953 1.65402Z" />
    </Svg>
  );
}
function BoxIcon() {
  return (
    <Svg stroke="#58c4dc" className="mr-3 size-[25px] float-left">
      <path
        fill="#58c4dc"
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      />
      <polyline stroke="hsl(var(--background))" strokeWidth={3} points="3.29 7 12 12 20.71 7" />
      <line stroke="hsl(var(--background))" strokeWidth={3} x1="12" x2="12" y1="22" y2="12" />
    </Svg>
  );
}
