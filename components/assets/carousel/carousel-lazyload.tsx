"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { IoeriIcon } from "@/modules";

import crs from "./carousel.module.css";

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

type PropType = {
  imageUrl: string;
  inView: boolean;
  index: number;
  label: string;
};

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imageUrl, inView, index, label } = props;
  const [hasLoaded, setHasLoaded] = useState(false);

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  return (
    <>
      <div
        aria-label={label}
        data-carousel-number={index + 1}
        className={twMerge(
          "p-0 rounded-[var(--br,_10px)] overflow-hidden embla__slide aspect-[3/1] [--w:100%] w-[var(--w)] min-w-[var(--w)] max-w-max h-[var(--h)] flex items-center justify-center relative",
          hasLoaded && "embla__lazyload_hasloaded",
        )}
      >
        {!hasLoaded && <IoeriIcon className="absolute opacity-50" />}

        <Image
          fill
          sizes="500"
          priority={false}
          onLoad={setLoaded}
          src={inView ? imageUrl : PLACEHOLDER_SRC}
          alt={label}
          loading="lazy"
          data-src={imageUrl}
          className={twMerge(
            crs.lazyload__img,
            "transition-opacity object-cover relative flex items-center justify-center w-full h-full | rounded-[var(--br,_10px)] object-center bg-center !bg-cover overflow-hidden focus:outline-0",
          )}
        />

        {/* {hasLoaded && (
          <div className="absolute font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs [--shadow-color:#fff] dark:[--shadow-color:#000] [text-shadow:0px_0px_12px_var(--shadow-color)] --[-webkit-text-stroke:1px_#fff]">
            {label}
          </div>
        )} */}
      </div>
    </>
  );
};
