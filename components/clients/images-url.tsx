import React from "react";
import { Image } from "../ui/image";

export type ImagesData = { images?: { url: string }[] };
interface ImagesUrlProps {
  src: { imageUrl?: string; images?: { url: string }[] };
}

export const ImagesUrl: React.FC<ImagesUrlProps> = ({ src }) => {
  const imgUrl = src.imageUrl;
  const imgs = src.images?.[0]?.url;
  const imgSrc = imgUrl ?? imgs;

  if (src.imageUrl) {
    return <Image alt=" " src={imgUrl || ""} />;
  }

  if (src.images) {
    return <Image alt=" " src={imgs || ""} />;
  }
};
