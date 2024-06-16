"use client";
import React, { useEffect } from "react";
import { useHasScrollbar } from "../use-has-scrollbar/use-has-scrollbar";
import { attributeState, removeBodyProperty, setBodyProperty } from "../../function/attribute-property";

import "./image-popup.css";

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

          let section = document.querySelector(".image-popup-root") as HTMLElement;
          if (!section) {
            clickedImage.style.setProperty("filter", "opacity(0)");
            body.style.setProperty("overflow", "hidden");

            if (hasScrollbar) {
              setBodyProperty(scrollbarWidth);
            }

            const rect = clickedImage.getBoundingClientRect();

            section = document.createElement("section") as HTMLElement;
            section.classList.add("image-popup-root");
            body.appendChild(section);

            const overlay = document.createElement("div");
            overlay.classList.add("image-popup-overlay");
            section.appendChild(overlay);

            const imgPopup = document.createElement("img") as HTMLImageElement;
            imgPopup.src = clickedImage.src;

            attributeState(imgPopup, "open");

            imgPopup.classList.add("image-popup");
            imgPopup.setAttribute("draggable", "false");
            imgPopup.oncontextmenu = (e) => e.preventDefault();

            // Set initial position and size
            imgPopup.style.position = "absolute";
            // imgPopup.style.left = `${rect.left}px`;
            // imgPopup.style.top = `${rect.top}px`;
            imgPopup.style.setProperty("--initial-w", `${rect.width}px`);
            imgPopup.style.setProperty("--initial-h", `${rect.height}px`);

            section.appendChild(imgPopup);

            // Trigger reflow for the transition
            imgPopup.getBoundingClientRect();

            // Animate to the center of the viewport
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
                section.remove();

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
                section.remove();

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
