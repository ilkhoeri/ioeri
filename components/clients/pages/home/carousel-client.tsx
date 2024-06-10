"use client";

import { Image } from "@/components/ui/image";
import { Running } from "@/modules";
import type { Clients } from "@/types/connections";

import style from "./ioeri.module.css";

interface CarouselClientProps {
  data: Clients[] | null;
}

export const CarouselClient: React.FC<CarouselClientProps> = ({ data }) => {
  if (!data?.length) {
    return null;
  }

  const extendedClientList = [...data, ...data];

  return (
    <Running
      id="client-list-section"
      direction="right-to-left"
      el={{ wrap: "section", inner: "ol" }}
      className={style.carousel_wrap}
    >
      {extendedClientList.map((crs, index) => (
        <li key={index}>
          <Image
            src={crs.imageUrl}
            tabIndex={-1}
            loading="lazy"
            alt="client logo"
            width="100"
            height="48"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </li>
      ))}
    </Running>
  );
};
