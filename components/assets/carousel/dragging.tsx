"use client";

import useEmblaCarousel from "embla-carousel-react";

import crs from "./carousel.module.css";
import { twMerge } from "tailwind-merge";

interface DraggingProps {
  children: React.ReactNode;
  className?: string;
  classNames?: {
    root?: string;
    viewport?: string;
    container?: string;
    anchor?: string;
  };
  getCarousel?: {
    axis?: "x" | "y";
    loop?: boolean;
    dragFree?: boolean;
    containScroll?: false | "trimSnaps" | "keepSnaps";
  };

  sectionHead?: React.ReactNode;
}

/**
 * **pada children, tambahkan class*
 * ```js
 * "[flex:0_0_var(--slide-size)] ml-[var(--slide-spacing)] "
 * 
 // Sample
  <Dragging>
    {children}
  </Dragging>
 * ```
 */
const Dragging: React.FC<DraggingProps> = ({ children, getCarousel, className, classNames, sectionHead }) => {
  const [emblaRef] = useEmblaCarousel({
    axis: getCarousel?.axis ?? "x",
    loop: getCarousel?.loop ?? false,
    dragFree: getCarousel?.dragFree ?? true,
    containScroll: getCarousel?.containScroll ?? "trimSnaps",
  });

  return (
    <>
      <section className={twMerge("mt-5 mb-3 [--h:max-content]", className, crs.embla, classNames?.root)}>
        {sectionHead}
        <div className={twMerge("w-full pl-2", crs.embla__viewport, classNames?.viewport)} ref={emblaRef}>
          <div
            className={twMerge(
              "[--direction:row_!important]",
              crs.embla__container_dragging,
              crs.embla__container,
              classNames?.container,
            )}
          >
            {children}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dragging;
