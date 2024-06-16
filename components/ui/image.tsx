"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { default as NextImage } from "next/image";

import { twMerge } from "tailwind-merge";

import type { ImageProps } from "next/image";

export const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

type ImgClasses = { classNames?: Partial<Record<"image" | "srcLoad", string>> };

export interface ImgProps
  extends Omit<
      React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
      "width" | "src" | "height" | "alt" | "ref" | "loading" | "srcSet"
    >,
    ImgClasses,
    ImageProps {
  ref?: React.Ref<HTMLImageElement | null> | undefined;
  srcLoad?: React.ReactNode;
}

const Image = React.forwardRef<HTMLImageElement, ImgProps>(
  (
    { className, classNames, src, loading = "lazy", srcLoad, alt = "", draggable = "false", onContextMenu, ...props },
    ref,
  ) => {
    const [hasLoaded, setHasLoaded] = React.useState(false);

    const setLoaded = React.useCallback(() => {
      setHasLoaded(true);
    }, [setHasLoaded]);

    const img = {
      ref,
      loading,
      onLoad: setLoaded,
      draggable,
      className: twMerge(className, classNames?.image),
      src: hasLoaded ? src : PLACEHOLDER_SRC,
      onContextMenu: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault();
        if (onContextMenu) {
          onContextMenu(e);
        }
      },
      ...props,
    };

    return (
      <>
        {!hasLoaded && (
          <Slot
            data-src-load="true"
            className={twMerge(
              "absolute flex items-center justify-center h-full w-full opacity-20 font-bold",
              classNames?.srcLoad,
            )}
          >
            {typeof srcLoad === "string" ? (
              <code className="line-clamp-1 uppercase">{srcLoad.slice(0, 2)}</code>
            ) : (
              srcLoad
            )}
          </Slot>
        )}
        <NextImage data-image-popup alt={alt} {...img} />
      </>
    );
  },
);
Image.displayName = "Image";

export { Image };

/**
<figure itemprop="image" itemscope="" itemtype="http://schema.org/ImageObject" class="bie152-18 grEHQW"><meta itemprop="url" content="https://images.ctfassets.net/23aumh6u8s0i/6pjUKboBuFLvCKkE3esaFA/5f2101d6d2add5c615db5e98a553fc44/nextjs.jpeg"><meta itemprop="width" content="1176"><meta itemprop="height" content="1056"></figure>
 */
