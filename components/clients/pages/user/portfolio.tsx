"use client";

import Link from "next/link";
import { Image } from "@/components/ui/image";

import { getFullAge } from "@/connections/get-user-age";
import { Button } from "@/components/ui/button";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/assets/carousel/carousel";
import { getSocMedImages } from "@/connections/get-socmed-images";
import { markdownInsertHTML } from "@/lib/clean-html";
import { Confetti, getTimeAgo } from "@/modules";

import type { Address, Blog, Events, ShortPost, Socmed, UserProps } from "@/types/connections";

import style from "./ioeri.module.css";

interface LengthDatasProps {
  blog: Blog[] | null;
  events: Events[] | null;
  shortPost: ShortPost[] | null;
}

interface UserPortfolioProps extends UserProps, Omit<LengthDatasProps, "shortPost"> {
  address: Address[] | null;
  socmed: Socmed[] | null;
  children?: React.ReactNode;
}

export function UserPortfolio({ user, address, blog, events, socmed, children }: UserPortfolioProps) {
  const { birthday, ageString } = getFullAge(user.birth);

  return (
    <>
      {birthday && <Confetti lifespan={5000} />}
      <section className={style.portfolio_section}>
        <div className={style.portfolio_wrapper}>
          <div className={style.portfolio_wraptop}>
            <LengthDatas blog={blog} events={events} shortPost={[]} />

            {user.image && (
              <figure>
                <Image height={192} width={192} alt="" srcLoad={user.name} src={user.image} />
              </figure>
            )}

            {socmed && socmed?.length > 0 && (
              <div className={style.portfolio_wrap_link}>
                <ConnectLink socmed={socmed} />
                {/* <MessageLink /> */}
              </div>
            )}
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

            {address && address?.length > 0 ? (
              <AddressDisplay address={address} />
            ) : (
              <span className={style.text}>&nbsp;</span>
            )}

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
    </>
  );
}

function LengthDatas({ blog, events, shortPost }: LengthDatasProps) {
  return (
    <div className={style.portfolio_lth_db}>
      {events && events?.length > 0 ? (
        <Link href="/event" aria-label="Event" className={style.portfolio_lth_db_lnk}>
          <p data-count="">{events.length}</p>
          <p data-name="">Event</p>
        </Link>
      ) : (
        <p className={style.portfolio_lth_db_lnk}>
          <span data-count="">0</span> <span data-name="">Event</span>
        </p>
      )}

      {shortPost && shortPost?.length > 0 ? (
        <Link href="/official" aria-label="Short Post" className={style.portfolio_lth_db_lnk}>
          <p data-count="">{shortPost.length}</p>
          <p data-name="">Short</p>
        </Link>
      ) : (
        <p className={style.portfolio_lth_db_lnk}>
          <span data-count="">0</span> <span data-name="">Short</span>
        </p>
      )}

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

const ConnectLink: React.FC<{ socmed: Socmed[] }> = ({ socmed }) => {
  if (!socmed || socmed.length === 0) {
    return null;
  }
  return (
    <Carousel
      orientation="vertical"
      className={style.crs_root}
      plugins={[Autoplay({ delay: 5000 })]}
      opts={{
        loop: true,
        dragFree: false,
        containScroll: "trimSnaps",
      }}
    >
      <CarouselContent className={style.crs_content}>
        {socmed.map((data, index) => (
          <CarouselItem
            key={index}
            el="a"
            unstyled
            rel="noopener noreferrer nofollow"
            target="_blank"
            href={data.siteUrl}
            className={style.portfolio_cntct}
          >
            <Image
              height={28}
              width={28}
              alt=""
              src={data.imageUrl || getSocMedImages({ siteUrl: data.siteUrl, imageUrl: data.imageUrl })}
              className="rounded-full overflow-hidden p-px"
            />
            {data?.siteName || data?.siteUrl?.split("/")[2].split(".").shift()}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const AddressDisplay: React.FC<{
  address?: Address[];
}> = ({ address }) => {
  if (!address || address.length === 0) return null;

  const { country, province, city, regency, district } = address[0];
  const addressParts = [district, regency, city, province, country].filter(Boolean);

  if (addressParts.length === 0) return null;

  return <p className={style.text}>{addressParts.join(", ")}</p>;
};

function MessageLink() {
  return (
    <Button unstyled className={style.portfolio_msg}>
      Message
    </Button>
  );
}
