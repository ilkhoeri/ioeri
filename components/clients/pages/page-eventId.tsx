"use client";

import { SectionID } from "../section";
import { PostedTimes } from "../italic-time";
import { TitlePageID } from "../title-page";
import { ImagesArray } from "../images-array";
import { markdownInsertHTML } from "@/lib/clean-html";
import { useImagePopup } from "@/modules";

import type { PageEventIdTypes } from "@/types/connections";

export const PageEventId: React.FC<PageEventIdTypes> = ({ event }) => {
  useImagePopup();

  return (
    <SectionID>
      <TitlePageID title={event?.title} />
      <ImagesArray images={event?.images} />
      {event?.description && (
        <article
          className="text-wrap text-pre-line text-sm md:text-[15px] leading-normal text-justify"
          dangerouslySetInnerHTML={markdownInsertHTML(event.description)}
        />
      )}
      {event?.notes && (
        <article
          className="text-wrap text-pre-line text-sm md:text-[15px] leading-normal text-justify text-muted-foreground"
          dangerouslySetInnerHTML={markdownInsertHTML(event.notes)}
        />
      )}
      <PostedTimes times={event} />
    </SectionID>
  );
};
