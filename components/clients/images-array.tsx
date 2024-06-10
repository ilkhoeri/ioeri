"use client";

import { Image } from "@/components/ui/image";
import Dragging from "@/components/assets/carousel/dragging";

import type { Image as ImagesType } from "@/types/connections";

import style from "@/styles/ioeri.module.css";

const ImagesArray: React.FC<{ images: ImagesType[] | undefined }> = ({ images }) => {
  if (!images?.length) {
    return null;
  }
  const imagesData = Array.isArray(images) ? images : [images];
  return (
    <Dragging getCarousel={{ loop: true }} className="mb-12">
      {imagesData.map((image, index) => (
        <figure key={index} className={style.img_array_figure}>
          <Image
            fill
            sizes="224"
            className={style.img_array_img}
            alt=""
            src={image?.url || ""}
            srcLoad="Load..."
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
        </figure>
      ))}
    </Dragging>
  );
};

export { ImagesArray };
