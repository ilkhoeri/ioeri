import Link from "next/link";
import { ThemeToggle } from "./theme";

import Element from "@/library/components/element";
import { NavLinkItem } from "./nav-link";
import { appRoutes } from "@/library/routes";
import { IoeriIcon } from "@/resource/docs";
import { cvx } from "@/resource/docs/utility";

import type { Params } from "@/app/(routes)/my/types";

import globalStyle from "../styles/styles";

interface FooterProps {
  pages?: Params[];
}

const Styles = cvx({
  variants: {
    as: {
      footer: "mx-auto flex flex-col w-full relative text-sm bg-background max-w-screen-3xl",
      section: "px-6 md:px-8 lg:px-10 xl:px-10",
      list: "gap-x-6 grid sm:grid-cols-2 md:grid-flow-col md:grid-cols-4 md:grid-rows-5 lg:grid-cols-5",
      listitem: "content-center !list-none flex items-center",
      link: "line-clamp-1 text-xs md:text-sm 2xl:text-base text-muted-foreground hover:text-color transition ease-in-out duration-150 rounded-md py-1 underline-hover data-[path=active]:font-semibold data-[path=active]:text-constructive [&_mark]:data-[mark=true]:ml-[10px]",
    },
    section: {
      top: "border-t border-t-muted pt-4 w-full grid items-start grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 text-muted-foreground",
      bottom: "py-2 gap-4 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm",
    },
  },
});

// const URL = `${process.env.SECRET_API_CLIENT}/${process.env.SECRET_API_ID}`;
// async function getParams(): Promise<Params[]> {
//   const res = await fetch(`${URL}/params`, { cache: "no-store" });
//   return await res.json();
// }

export async function FootNav() {
  // const pages = await getParams();
  const currentYear = new Date().getFullYear();

  return (
    <footer data-dom="footer-nav" className={Styles({ as: "footer" })}>
      <Element el="section" className={Styles({ as: "section", section: "top" })}>
        <div className="w-max col-span-1 lg:col-span-2">
          <Link
            href="/"
            className="text-muted-foreground hover:text-color flex flex-initial items-center font-semibold rounded-lg"
            aria-label="HOME"
          >
            <IoeriIcon className="flex flex-none items-center justify-center border bg-background h-[36px] w-[36px] rounded-xl mr-2 p-1" />
          </Link>
        </div>

        <Element el="nav" className="col-span-1 lg:col-span-10">
          <ul role="list" className={Styles({ as: "list" })}>
            {appRoutes["footRoutes"].map((i, index) => (
              <li key={index} role="listitem" className={Styles({ as: "listitem" })}>
                <NavLinkItem href={i.href} title={i.title} className={Styles({ as: "link" })} />
              </li>
            ))}
          </ul>
        </Element>
      </Element>

      <ThemeToggle
        unstyled={{ wrapper: true, buttons: true }}
        classNames={{
          wrapper: globalStyle(
            { toggle: "group" },
            "pt-2 pb-4 px-4 relative gap-px flex-row flex-nowrap justify-end text-muted-foreground border-b border-b-muted",
          ),
          buttons: globalStyle({ toggle: "item", size: "icon-sm" }),
        }}
      />

      <Element el="section" className={Styles({ as: "section", section: "bottom" })}>
        <div className="flex flex-col sm:flex-row items-center gap-x-4">
          <p>&copy; {currentYear} ioeri rights MIT</p>
          <hr className="hidden h-4 w-[1px] border-l border-l-neutral-400 sm:inline-block" />
          <p>Designed in Earth-616</p>
        </div>

        <div className="flex items-center md:ml-auto cursor-default group">
          Built by
          <a
            tabIndex={-1}
            rel="noopener noreferrer nofollow"
            target="_blank"
            href="https://github.com/ioeridev"
            aria-label="Vercel.com Link"
            className="mx-2 rounded-lg gap-2 hover:text-color transition-colors duration-200 cursor-pointer"
          >
            <IoeriIcon
              size={28}
              aria-label="ioeri Logo"
              className="transform duration-200 ease-linear group-hover:scale-110"
            />{" "}
            ioeri
          </a>
        </div>
      </Element>
    </footer>
  );
}
