"use client";

import Link from "next/link";
import { markdownInsertHTML, stripHtml } from "@/lib/clean-html";
import { Image } from "@/components/ui/image";
import { twMerge } from "tailwind-merge";
import { IoeriIcon, Transform } from "@/modules";
import { sanitizedToParams } from "@/utils/text-transform";

import type { RecordClasses } from "@/types";
import type { ImagesData } from "./images-url";

import style from "@/styles/ioeri.module.css";

type Datas<T extends string, U = Record<string, any>> = {
  data: (Partial<Record<T, string>> & U) | undefined;
};

type ListData = "id" | "title" | "image" | "description" | "imageUrl";
type CardData = Datas<ListData, ImagesData>;

type CardTrees = "li" | "a" | "img" | "details";
export type classesCard = RecordClasses<CardTrees>;

interface CardType extends classesCard, CardData {
  srcLoad?: React.ReactNode;
  srcNull: string;
}

const Card: React.FC<CardType> = ({ data, srcLoad, srcNull, className, classNames }) => {
  const text = stripHtml(String(data?.description?.slice(0, 165)));
  return (
    <Transform el="li" className={twMerge(style.card, className, classNames?.li)}>
      <Link href={`/blog/${sanitizedToParams(data?.title)}`} className={twMerge(style.a, classNames?.a)}>
        {data?.images && (
          <Image
            srcLoad={srcLoad || <IoeriIcon className="!size-5/6" />}
            src={data.images?.[0]?.url || srcNull}
            alt=""
            fill
            className={classNames?.img}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        )}

        <article aria-label={data?.title} className={twMerge(style.article, classNames?.details)}>
          <h5 className={style.title}>{String(data?.title)}</h5>
          <p role="article" dangerouslySetInnerHTML={{ __html: stripHtml(String(data?.description?.slice(0, 165))) }} />
        </article>
      </Link>
    </Transform>
  );
};

export { Card };
