"use client";

import React, { useEffect, useState } from "react";
import { Billboard as BillboardTypes } from "@/types/connections";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { LazyLoadImage } from "./carousel-lazyload";
import { twMerge } from "tailwind-merge";

import Autoplay from "embla-carousel-autoplay";

import crs from "./carousel.module.css";

export type classNameBillboard = {
  className?: string;
  classNames?: {
    root?: string;
    viewport?: string;
    container?: string;
  };
};

export interface BillboardProps extends classNameBillboard {
  billboard: BillboardTypes | BillboardTypes[];
}

const CarouselBillboard: React.FC<BillboardProps> = ({ billboard, className, classNames }) => {
  const [emblaRed, emblaApi] = useEmblaCarousel(
    {
      axis: "x",
      loop: true,
      dragFree: false,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 5000 })],
  );

  const billboardData = Array.isArray(billboard) ? billboard : [billboard];

  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateSlidesInView = (emblaApi: EmblaCarouselType) => {
      setSlidesInView((slidesInView) => {
        if (slidesInView.length === emblaApi.slideNodes().length) {
          emblaApi.off("slidesInView", updateSlidesInView);
        }
        const inView = emblaApi.slidesInView().filter((index) => !slidesInView.includes(index));
        return slidesInView.concat(inView);
      });
    };

    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
  }, [emblaApi]);

  return (
    <div
      className={twMerge(
        crs.embla,
        "[--slide-sz:80%] min-[566px]:[--h:192px]lg:[--h:212px] [--slide-h:var(--h)] mt-[10px]",
        className,
        classNames?.root,
      )}
    >
      <div className={twMerge(crs.embla__viewport, "!w-full", classNames?.viewport)} ref={emblaRed}>
        <div
          className={twMerge(
            crs.embla__container,
            crs.embla__container_x,
            "gap-0 !ml-0 [--direction:row_!important]",
            classNames?.container,
          )}
        >
          {billboardData.map((billboard, index) => (
            <LazyLoadImage
              key={index}
              index={index}
              imageUrl={billboard?.imageUrl}
              label={billboard.label}
              inView={slidesInView.indexOf(index) > -1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselBillboard;
