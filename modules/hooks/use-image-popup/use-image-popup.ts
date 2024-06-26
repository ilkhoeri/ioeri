import React, { useEffect } from "react";
import { useHasScrollbar, attributeState, removeBodyProperty, setBodyProperty } from "@/modules";

import "./use-image-popup.css";

interface UseImagePopupProps {
  selectors?: React.ElementType | (string & {});
  timeRender?: number;
}

export function useImagePopup({ selectors = ".embeded-image", timeRender = 350 }: UseImagePopupProps = {}) {
  const [hasScrollbar, scrollbarWidth] = useHasScrollbar();

  useEffect(() => {
    const imgElements = document.querySelectorAll(selectors as string);
    const body = document.body;

    if (imgElements) {
      imgElements.forEach((img) => {
        img.addEventListener("click", (event) => {
          const clickedImage = event.currentTarget as HTMLImageElement;

          let figure = document.querySelector(".popup-figure") as HTMLElement;
          if (!figure) {
            clickedImage.style.setProperty("filter", "opacity(0)");
            body.style.setProperty("overflow", "hidden");

            if (hasScrollbar) {
              setBodyProperty(scrollbarWidth);
            }

            const rect = clickedImage.getBoundingClientRect();

            figure = document.createElement("figure") as HTMLElement;
            figure.classList.add("popup-figure");
            figure.style.setProperty("--duration", `${timeRender - 50}ms`);
            body.appendChild(figure);

            const overlay = document.createElement("div");
            overlay.classList.add("image-popup-overlay");
            figure.appendChild(overlay);

            const imgPopup = document.createElement("img") as HTMLImageElement;
            imgPopup.src = clickedImage.src;

            attributeState(imgPopup, "open");

            imgPopup.classList.add("image-popup");
            imgPopup.setAttribute("draggable", "false");
            imgPopup.oncontextmenu = (e) => e.preventDefault();

            imgPopup.style.position = "absolute";
            imgPopup.style.setProperty("--initial-w", `${rect.width}px`);
            imgPopup.style.setProperty("--initial-h", `${rect.height}px`);

            figure.appendChild(imgPopup);

            imgPopup.getBoundingClientRect();

            imgPopup.style.setProperty(
              "--translate-in",
              `${(window.innerWidth / 2 - rect.left - rect.width / 2) * -1}px, ${(window.innerHeight / 2 - rect.top - rect.height / 2) * -1}px`,
            );

            overlay.addEventListener("click", () => {
              attributeState(imgPopup, "closed");
              overlay.style.opacity = "0";

              setTimeout(() => {
                clickedImage.style.removeProperty("filter");
                body.style.removeProperty("overflow");
                figure.remove();

                if (hasScrollbar) {
                  removeBodyProperty();
                }
              }, timeRender);
            });

            const handlePopstate = (event: PopStateEvent) => {
              attributeState(imgPopup, "closed");
              overlay.style.opacity = "0";

              setTimeout(() => {
                clickedImage.style.removeProperty("filter");
                body.style.removeProperty("overflow");
                figure.remove();

                if (hasScrollbar) {
                  removeBodyProperty();
                }
              }, timeRender);

              event.preventDefault();
            };

            window.history.pushState({ drawerOpen: true }, "");
            window.addEventListener("popstate", handlePopstate);
            return () => {
              setTimeout(() => {
                window.removeEventListener("popstate", handlePopstate);
              }, timeRender);
            };
          }
        });
      });
    }
  }, [selectors, hasScrollbar, scrollbarWidth, timeRender]);
}
