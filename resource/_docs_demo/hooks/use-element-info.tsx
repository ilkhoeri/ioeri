"use client";
import { useElementInfo } from "@/modules/hooks";

export function Demo() {
  const info = useElementInfo<HTMLTextAreaElement>();

  return (
    <div className="flex items-center justify-center h-[35rem]">
      <textarea
        ref={info.ref}
        id="box"
        readOnly
        placeholder="resize box"
        className="absolute min-w-28 min-h-9 bg-muted/50 placeholder:text-center placeholder:uppercase place-content-center border rounded-lg resize focus-visible:ring-0 focus-visible:outline-0"
        onMouseEnter={info.onMouseEnter}
        onMouseLeave={info.onMouseLeave}
        style={{ margin: "0", zIndex: "9" }}
        data-custom-attribute="customValue"
      />
      <div suppressHydrationWarning className="absolute left-4 top-4 text-xs flex flex-col gap-2 mb-auto [&_*]:font-roboto-mono">
        <div>
          <h3>Element Information</h3>
          <p>
            <strong>Component Name:</strong>
            &nbsp;&lt;{info.elementName}&gt;
          </p>
          <p>
            <strong>hovered:</strong>
            &nbsp;{info.hovered ? "true" : "false"}
          </p>
        </div>

        <div>
          <h4>Attributes:</h4>
          <ul>
            {Object.entries(info.attributes).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>&nbsp;{value}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Rect Information:</h4>
          <ul>
            {Object.entries(info.rect).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>&nbsp;{value}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Window Size:</h4>
          <p>
            <strong>Width:</strong>&nbsp;{info.windowSize.width}, <strong>Height:</strong>&nbsp;{info.windowSize.height}
          </p>
        </div>

        <div>
          <h4>Scroll Positions:</h4>
          <p>Scroll Position (Element):&nbsp;{info.scrollPosition}</p>
          <p>Scroll Position (Body):&nbsp;{info.scrollBody}</p>
        </div>
      </div>
    </div>
  );
}
