import Element from "@/components/ui/element";
import { Transform } from "@/modules";
import { Image } from "@/components/ui/image";

import style from "./ioeri.module.css";

type initialData = "imageUrl" | "name" | "job" | "comment";
interface CardReviewsProps {
  data: Record<initialData, string>[];
}

export const CardReviews: React.FC<CardReviewsProps> = ({ data }) => {
  return (
    <section id="started" className={style.card_reviews}>
      <div className={style.card_reviews_header}>
        <div className={style.card_reviews_title}>
          <Transform
            transform={{ before: "translateY(4rem)", after: "translateY(0)", origin: "bottom" }}
            className={style.card_reviews_title_images}
          >
            {data.slice(0, 5).map((data, index) => {
              const sm = "32px";
              const md = "48px";
              const lg = "64px";

              let zIndex;
              let height;
              let width;

              if (index === 0 || index === 4) {
                zIndex = 6;
                height = sm;
                width = sm;
              } else if (index === 1 || index === 3) {
                zIndex = 8;
                height = md;
                width = md;
              } else {
                zIndex = 10;
                height = lg;
                width = lg;
              }

              return (
                <Image
                  key={index}
                  loading="lazy"
                  width="200"
                  height="200"
                  src={data.imageUrl}
                  alt="member photo"
                  // style={{ zIndex, height, width }}
                />
              );
            })}
          </Transform>

          <div className={style.card_reviews_title_wrap}>
            <Transform el="h3" transform={{ before: "translateX(-50dvw)", after: "translateX(0)", origin: "left" }}>
              Get Started now
            </Transform>

            <Transform el="p" transform={{ before: "translateX(50dvw)", after: "translateX(0)", origin: "right" }}>
              Be part of millions people around the world using tailus in modern User Interfaces.
            </Transform>
          </div>
        </div>
      </div>

      <Element el="ul" role="list">
        {data.slice(0, 6).map((data, index) => (
          <Transform
            key={index}
            el="li"
            role="listitem"
            transform={{ before: "translateY(6rem)", after: "translateY(0)", origin: "top" }}
          >
            <figure>
              <Image src={data.imageUrl} alt="user avatar" width="200" height="200" loading="lazy" />
              <figcaption>
                <h6>{data.name}</h6>
                <p>{data.job}</p>
              </figcaption>
            </figure>

            <Transform
              el={"article"}
              hold={0.4}
              transform={{ before: "translateX(-100%)", after: "translateX(0)", origin: "left" }}
            >
              {data.comment}
            </Transform>
          </Transform>
        ))}
      </Element>
    </section>
  );
};
