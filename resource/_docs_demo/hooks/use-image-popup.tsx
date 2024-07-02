"use client";

import { useImagePopup } from "@/modules";

export function Demo() {
  useImagePopup({ selectors: "[data-has-popup]" });
  return (
    <div>
      <img
        data-has-popup=""
        src="/ioeri-asset.png"
        alt="ioeri logo"
        width={96}
        height={96}
        className="size-24 border rounded-lg cursor-zoom-in bg-black"
      />
    </div>
  );
}
