"use client";

import React from "react";
import Link from "next/link";
import { ArrowsSquareIcon } from "@/modules";

export function PageHome() {
  return (
    <section className="w-full min-w-full space-y-40 mb-20">
      <div id="features">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="md:w-2/3 lg:w-1/2">
            <svg width="64" height="64" className="text-color size-10" onContextMenu={(e) => e.preventDefault()}>
              <use href="/images/icons.svg#stars" />
            </svg>

            <h2 className="mt-4 mb-2 text-h6 font-bold text-color">
              A community of web and mobile applications developers based on React.js
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm 2xl:text-base">
              Crafting and share relevant functionals, styles, and hooks recommendations for react.js applications.
            </p>
          </div>
          <div className="relative mt-16 mb-12 bg-background grid overflow-hidden rounded-xl border text-muted-foreground sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
            <FeaturesList features={features} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesList({
  features,
}: {
  features: { title?: string; slug?: string; image?: string; notes?: string }[] | null;
}) {
  if (!features?.length) {
    return null;
  }
  return features.map((i, index) => (
    <div key={index} className="group relative transition cursor-default">
      <div className="relative space-y-4 py-8 px-6">
        <svg width="64" height="64" className="text-color size-10" onContextMenu={(e) => e.preventDefault()}>
          <use href={i.image} />
        </svg>

        <div className="space-y-1">
          {i?.title && <h5 className="text-h6 font-semibold text-color transition">{i.title}</h5>}
          {i?.notes && <p className="text-muted-foreground text-xs md:text-sm 2xl:text-base">{i.notes}</p>}
        </div>
        {i?.slug && (
          <Link href={i.slug} className="flex items-center justify-start gap-4 rounded-sm group-hover:text-color">
            <span className="text-sm">Read</span>
            <ArrowsSquareIcon
              withSquare={false}
              direction="right"
              className="size-6 -translate-x-4 text-2xl transition duration-300 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
            />
          </Link>
        )}
      </div>
    </div>
  ));
}

const features = [
  {
    title: "Snappy",
    slug: "#",
    image: "/images/icons.svg#clock-alt-2",
    notes: "The effectiveness of time in building and adjusting the needs during development.",
  },
  {
    title: "Scalable",
    slug: "#",
    image: "/images/icons.svg#draw-compass",
    notes: "Consider the effectiveness of code structure to maintain component flexibility.",
  },
  {
    title: "Enchant",
    slug: "#",
    image: "/images/icons.svg#forest",
    notes: "The structure of rich components is modeled effectively for rapid comprehension.",
  },
  {
    title: "Valuable",
    slug: "#",
    image: "/images/icons.svg#pantone-2",
    notes: "Editable content according to the requirements of the style component structure.",
  },
];
