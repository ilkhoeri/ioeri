"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimText, BookOpen2Icon, GithubIcon, Transform } from "@/modules";

import style from "./ioeri.module.css";
import mainStyle from "@/styles/ioeri.module.css";
const TYPING_DEFAULT = ["a team", "an idea", "a hook", "a component", "a spirit"];

const links = [
  {
    title: "Getting Started",
    target: "_self",
    icon: BookOpen2Icon,
    url: "/started",
  },
  {
    title: "Documentation",
    target: "_blank",
    icon: GithubIcon,
    url: "https://github.com/ilkhoeri/modules",
  },
];

export const HeaderHome: React.FC = () => {
  return (
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
          <AnimText el="span" anim="typing" placeholders={TYPING_DEFAULT} />
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
            <Link key={index} href={i.url} target={i.target} data-link={i.title.toLowerCase().replace(" ", "")}>
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
  );
};

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
