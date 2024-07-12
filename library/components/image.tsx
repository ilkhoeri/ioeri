"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { default as NextImage } from "next/image";
import { twMerge } from "tailwind-merge";

import type { ImageProps } from "next/image";

type ImageOrigin = { classNames?: Partial<Record<"image" | "srcLoad", string>> };
type Exclude = "width" | "src" | "height" | "alt" | "ref" | "loading" | "srcSet";
export interface ImgProps
  extends Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, Exclude>,
    ImageOrigin,
    ImageProps {
  ref?: React.Ref<HTMLImageElement | null>;
  srcLoad?: React.ReactNode;
}

export const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

export const Image = React.forwardRef<HTMLImageElement, ImgProps>((_props, ref) => {
  const {
    src,
    onLoad,
    srcLoad,
    alt = "",
    className,
    classNames,
    onContextMenu,
    loading = "lazy",
    draggable = "false",
    ...props
  } = _props;
  const [hasLoad, setHasLoad] = React.useState(false);

  const setLoaded = React.useCallback(() => {
    setHasLoad(true);
  }, [setHasLoad]);

  const img = {
    ref,
    loading,
    draggable,
    className: twMerge(className, classNames?.image),
    src: hasLoad ? src : PLACEHOLDER_SRC,
    ...props,
  };

  return (
    <>
      {!hasLoad && (
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
      <NextImage
        data-image-popup
        alt={alt}
        onLoad={(e) => {
          setLoaded();
          onLoad?.(e);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          onContextMenu?.(e);
        }}
        {...img}
      />
    </>
  );
});
Image.displayName = "Image";
