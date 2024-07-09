"use client";

import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@/library/components/image";

import { getFullAge } from "../utils";
import { StateHidden } from "@/library/assets/theme";
import { Confetti } from "@/modules/components/web";
import { markdownInsertHTML } from "@/library/utils/clean-html";
import { StyleObject, getRandomColor, getTimeAgo } from "@/modules/index";

import type { Address, Blog, Socmed, User, UserProps } from "../types";

import style from "./user.module.css";

interface LengthDatasProps {
  blog: Blog[] | null;
}

interface UserPortfolioProps extends UserProps, Omit<LengthDatasProps, "shortPost"> {
  address: Address | null;
  socmed: Socmed[] | null;
  children?: React.ReactNode;
}

export function UserPortfolio({ user, address, blog, socmed, children }: UserPortfolioProps) {
  const { birthday, ageString } = getFullAge(user.birth);

  return (
    <article className="relative size-full">
      {birthday && <Confetti lifespan={5000} />}

      <UserPageHeader user={user} />

      <section className={style.portfolio_section}>
        <div className={style.portfolio_wrapper}>
          <div className={style.portfolio_wraptop}>
            <LengthDatas blog={blog} />

            {user.image && (
              <figure>
                <Image height={192} width={192} alt="" srcLoad={user.name} src={user.image} />
              </figure>
            )}

            <div className={style.portfolio_wrap_link}></div>
          </div>

          <div className={style.portfolio_wrapbottom}>
            {user?.alias && <h4 className={style.alias}>● {user.alias} ●</h4>}

            {user?.name && <figcaption>{user.name}</figcaption>}

            {birthday ? (
              <h4>
                <span>🎊🎉</span>
                <span>{ageString}</span>
              </h4>
            ) : (
              <p className={style.portfolio_birth}>Sejak {getTimeAgo(new Date(user.birth), { perYears: true })}</p>
            )}

            {address ? <AddressDisplay address={address} /> : <span className={style.text}>&nbsp;</span>}

            {user?.bio && <p className={style.bio}>{user.bio}</p>}

            {user?.resume && (
              <article
                role="article"
                className={style.resume}
                dangerouslySetInnerHTML={markdownInsertHTML(user.resume)}
              />
            )}
          </div>

          {children}
        </div>
      </section>
      <StateHidden />
    </article>
  );
}

function LengthDatas({ blog }: LengthDatasProps) {
  return (
    <div className={style.portfolio_lth_db}>
      {blog && blog?.length > 0 ? (
        <Link href="/blog" aria-label="Blog" className={style.portfolio_lth_db_lnk}>
          <p data-count="">{blog.length}</p>
          <p data-name="">Blog</p>
        </Link>
      ) : (
        <p className={style.portfolio_lth_db_lnk}>
          <span data-count="">0</span> <span data-name="">Blog</span>
        </p>
      )}
    </div>
  );
}

const AddressDisplay: React.FC<{
  address?: Address;
}> = ({ address }) => {
  if (!address) return null;

  const { country, province, city, regency, district } = address;
  const addressParts = [district, regency, city, province, country].filter(Boolean);

  if (addressParts.length === 0) return null;

  return <p className={style.text}>{addressParts.join(", ")}</p>;
};

function variables(): StyleObject {
  const vars: StyleObject = {};
  vars["--text-gradient-from"] = getRandomColor();
  vars["--text-gradient-to"] = getRandomColor();
  return vars;
}

export function UserPageHeader({ user }: { user: User }) {
  const header = { className: style.user_header, style: variables() };
  const pict = { style: { backgroundImage: `url("/images/pattern-prisma.svg")` } };
  return (
    <section suppressHydrationWarning {...header}>
      {/* <DoubleHelixWords placeholders={user.name} /> */}

      <a href="https://github.com/ioeridev/ioeri/graphs/contributors">
        <figure>
          <figcaption>
            <h1>Thank&apos;s for contributors</h1>
          </figcaption>
          <picture>
            <img src="https://contrib.rocks/image?repo=ilkhoeri/ioeri" alt="contributors" height={32} />
          </picture>
        </figure>
      </a>

      <div data-bg="">
        <picture {...pict} />
      </div>
    </section>
  );
}
