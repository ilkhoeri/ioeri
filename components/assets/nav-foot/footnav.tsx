import Link from "next/link";
import Element from "@/components/ui/element";
import { ThemeToggle } from "@/components/assets/theme/theme-toggle";
import { twMerge } from "tailwind-merge";

import { IoeriIcon, IoeriTextIcon } from "@/modules";
import { FootLink, FootLinkMark } from "./foot-link";

import type { Params } from "../user/types";

import f from "@/styles/ioeri.module.css";

interface FooterProps {
  className?: string;
  children?: any;
  pages?: Params[];
}

const mainroutes = [
  {
    title: "Components",
    slug: "components",
  },
  {
    title: "Playground",
    slug: "playground",
  },
  {
    title: "Web app",
    slug: "web",
  },
  {
    title: "Native app",
    slug: "mobile",
  },
];

const URL = `${process.env.SECRET_API_CLIENT}/${process.env.SECRET_API_ID}`;
async function getParams(): Promise<Params[]> {
  const res = await fetch(`${URL}/params`, { cache: "no-store" });
  return await res.json();
}

export async function FootNav({ className }: FooterProps) {
  const pages = await getParams();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-nav" className={twMerge(f.footnav, className)}>
      <Element el="section" className={f.footnav_top_inner}>
        <div className={f.inner_left}>
          <Link href="/" className={f.home_link} aria-label="HOME">
            <IoeriIcon data-logo="" />
            <IoeriTextIcon />
          </Link>
        </div>

        <Element el="nav" className={f.inner_right}>
          <ul className={f.ul}>
            <FootLink items={mainroutes} />
            <FootLinkMark items={pages} />
          </ul>
        </Element>
      </Element>

      <ThemeToggle
        unstyled={{ wrapper: true, buttons: true }}
        classNames={{ wrapper: f.footnav_inner_theme, buttons: f.theme_toggle }}
      />

      <Element el="section" className={f.footnav_bottom_inner}>
        <div className={f.inner_left}>
          <p>&copy; {currentYear} ioeri rights MIT</p>
          <hr />
          <p>Designed in Earth-616</p>
        </div>

        <div className={f.inner_right}>
          Built by
          <a
            tabIndex={-1}
            rel="noopener noreferrer nofollow"
            target="_blank"
            href="https://github.com/ioeridev"
            aria-label="Vercel.com Link"
          >
            <IoeriIcon size={28} aria-label="ioeri Logo" /> ioeri
          </a>
        </div>
      </Element>
    </footer>
  );
}
