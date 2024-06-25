"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimText, BookOpen2Icon, GithubIcon, Transform, sanitizedToParams, ArrowsSquareIcon } from "@/modules";

import style from "./ioeri.module.css";
import mainStyle from "@/styles/ioeri.module.css";

const TYPING_DEFAULT = ["a team", "an idea", "a solution", "a spirit"];

export function PageHome() {
  return (
    <>
      <section id="header-section" className={style.header_home}>
        <i
          aria-hidden="true"
          className={[
            mainStyle.aura,
            "opacity-[0.65] before:top-[-10%] before:left-[-2%] after:bottom-[5%] after:right-[-5%]",
          ].join(" ")}
        />

        <article className={style.hero}>
          <Transform el="h1" hold={0}>
            <span>bring</span>
            <AnimText el="span" anim="typing" placeholders={TYPING_DEFAULT} duration={{ break: 2500 }} />
            <span>together</span>
          </Transform>

          <Transform
            el="p"
            hold={0}
            transition={{ delay: "300ms, 300ms" }}
            transform={{ before: "translateY(9rem)", after: "translateY(0)", origin: "bottom center" }}
          >
            <span>Construct and develop your web and mobile applications using straightforward dependencies</span>
          </Transform>

          <Transform
            el="div"
            hold={0}
            className={style.link_wrap}
            transform={{ before: "translateY(9rem)", after: "translateY(0)", origin: "bottom center" }}
          >
            {links.map((i, index) => (
              <Link key={index} href={i.url} target={i.target} data-link={sanitizedToParams(i.title)}>
                <span>
                  <i.icon /> {i.title}
                </span>
              </Link>
            ))}
          </Transform>
        </article>

        <CheckBox />

        <Transform
          el="s"
          className={style.line_top}
          transition={{ delay: "600ms, 600ms" }}
          transform={{ before: "scale(0)", after: "scale(1)", origin: "right center" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 436 140"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
          >
            <circle cx="426.76" cy="9.5" r="7.5" fill="hsl(var(--background))" />
            <circle cx="9.24" cy="130.5" r="7.5" fill="hsl(var(--background))" />
            <path
              data-line=""
              d="m19.66,130.5h92.57c33.14,0,64-26.86,64-60v-1c0-33.14,29.86-60,63-60h180.56"
              fill="none"
              strokeDasharray="0 0 5 5"
            />
          </svg>
        </Transform>

        <Transform
          el="s"
          className={style.line_circle}
          transition={{ delay: "600ms, 600ms" }}
          transform={{ before: "scale(0)", after: "scale(1)", origin: "left center" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 218 179"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="3"
          >
            <circle cx="9" cy="9.04" r="7.5" fill="hsl(var(--background))" />

            <path
              data-line=""
              d="m198.54,169.04H69c-33.14,0-60-26.86-60-60V16.02"
              fill="none"
              strokeDasharray="0 0 6.96 6.96"
            />

            <path
              d="m203,177.46c-.26,0-.52-.07-.75-.2-.46-.27-.75-.76-.75-1.3v-13.86c0-.54.29-1.03.75-1.3.23-.13.49-.2.75-.2s.52.07.75.2l12,6.93c.46.27.75.76.75,1.3s-.29,1.03-.75,1.3l-12,6.93c-.23.13-.49.2-.75.2Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </Transform>
      </section>

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
    </>
  );
}

function CheckBox() {
  const { theme, setTheme } = useTheme();
  return (
    <Transform
      el="div"
      data-icon="🥳"
      className={style.checkbox_wrap}
      transition={{ delay: "300ms, 300ms" }}
      transform={{ before: "translateX(7rem)", after: "translateX(0)", origin: "right" }}
    >
      <input
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={style.tgl}
        id="checkbox-toggle"
        name="checkbox-toggle"
        aria-label="toggle"
        type="checkbox"
      />
      <label className={style.tgl_btn} htmlFor="checkbox-toggle" />
    </Transform>
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
          <Link
            href={i.slug}
            className="!hidden !sr-only flex items-center justify-start gap-4 rounded-sm group-hover:text-color"
          >
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

const links = [
  {
    title: "Docs",
    target: "_self",
    icon: BookOpen2Icon,
    url: "/started",
  },
  {
    title: "Repo",
    target: "_blank",
    icon: GithubIcon,
    url: "https://github.com/ilkhoeri/modules",
  },
];

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
