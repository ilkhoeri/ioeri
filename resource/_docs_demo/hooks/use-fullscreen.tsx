"use client";

import { useFullscreen } from "@/modules/hooks";
import { MinimizeIcon, MaximizeIcon } from "@/modules/icons";
import { SetProps } from "../__set_props";
import globalStyle from "@/library/styles/styles";

export function Demo() {
  const { fullscreen, toggle } = useFullscreen();
  const { ref: refImage, toggle: onClickImage } = useFullscreen();

  return (
    <div className="flex items-center justify-center flex-col">
      <button
        type="button"
        role="button"
        id="fullscreen-toggle"
        onClick={toggle}
        title={fullscreen ? "Minimize" : "Maximize"}
        className={globalStyle({ toggle: "item", size: "icon-sm" }, "border")}
      >
        {fullscreen ? <MinimizeIcon strokeWidth={2.25} /> : <MaximizeIcon strokeWidth={2.25} />}
      </button>

      <img
        ref={refImage}
        src="/ioeri-asset.png"
        alt="ioeri logo"
        width={96}
        height={96}
        onClick={onClickImage}
        className="size-24 border rounded-lg bg-black mt-12"
      />
      <span className="text-sm font-medium mt-4">use with ref, click image to view fullscreen</span> {/* prettier-ignore */}
      <SetProps.LabelOnly htmlFor="fullscreen-toggle">{fullscreen ? "Click to Minimize" : "Click to Maximize"}</SetProps.LabelOnly>
    </div>
  );
}
