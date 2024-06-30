"use client";

import { useState } from "react";
import { useClipboard } from "@/modules/hooks";
import { CheckIcon, CopyIcon } from "@/modules";
import globalStyle from "@/library/styles/styles";

export function Example() {
  const { copy, copied, error } = useClipboard();
  const [text, setText] = useState<string | undefined>(undefined);

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <button
        type="button"
        aria-label="copy button"
        title="copy"
        disabled={!text}
        onClick={() => {
          if (text) {
            copy(text);
          }
        }}
        className={globalStyle({ toggle: "item", size: "icon", theme: "outline" })}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>

      <input
        type="text"
        name="set-Text"
        id="set-text"
        title="input text"
        aria-label="input text"
        placeholder="input text to copy"
        className={globalStyle({ input: "text" }, "mt-4")}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
