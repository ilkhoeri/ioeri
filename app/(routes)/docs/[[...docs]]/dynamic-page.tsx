"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Spinner } from "@/library/assets/anim-loader";

interface DocsParams {
  params: {
    docs: string[];
  };
}

const loadComponent = ({ params }: DocsParams) =>
  dynamic(() => import(`../../../../examples/${params.docs.join("/")}`), {
    ssr: true,
    loading: () => <Spinner size={22} classNames={{ spinner: "my-auto" }} />,
  });

export function RestDocsPage({ params }: DocsParams) {
  const Component = loadComponent({ params });

  return (
    <article className="relative mx-auto w-full min-h-[80vh] flex flex-col items-center justify-start">
      <Suspense fallback={<Spinner size={22} classNames={{ spinner: "my-auto" }} />}>
        <Component />
      </Suspense>
    </article>
  );
}
