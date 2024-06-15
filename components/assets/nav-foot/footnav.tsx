import Link from "next/link";
import Element from "@/components/ui/element";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { twMerge } from "tailwind-merge";

import { IoeriIcon, IoeriTextIcon } from "@/modules";
import { sanitizedToParams } from "@/utils/text-transform";
import { getParams } from "@/connections/get-params";
import { getUser } from "@/connections/get-user";
import { FootLink, FootLinkMark } from "./foot-link";

import type { Params } from "@/types/connections";

import f from "@/styles/ioeri.module.css";

interface FooterProps {
  className?: string;
  children?: any;
  pages?: Params[];
}

const mainroutes = (user: string) => [
  {
    title: user,
    slug: `bio/${sanitizedToParams(user)}`,
  },
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

export async function FootNav({ className }: FooterProps) {
  const pages = await getParams();
  const user = await getUser();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-nav" className={twMerge(f.footnav, className)}>
      <Element el="section"  className={f.footnav_top_inner}>
        <div className={f.inner_left}>
          <Link href="/" className={f.home_link} aria-label="HOME">
            <IoeriIcon data-logo="" />
            <IoeriTextIcon />
          </Link>
        </div>

        <Element el="nav"  className={f.inner_right}>
          <ul className={f.ul}>
            <FootLink items={mainroutes(user.name)} />
            <FootLinkMark items={pages} />
          </ul>
        </Element>
      </Element>

      <ThemeToggle
        unstyled={{ wrapper: true, buttons: true }}
        classNames={{ wrapper: f.footnav_inner_theme, buttons: f.theme_toggle }}
      />

      <Element el="section"  className={f.footnav_bottom_inner}>
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
