"use client";

import { useState } from "react";
import { useDocumentTitle } from "@/modules";
import globalStyle from "@/library/styles/styles";

export function Example() {
  const [newTitle, setNewTitle] = useState<string>("describe your title");
  useDocumentTitle(newTitle);

  return (
    <div className="size-full flex flex-col items-center justify-center">
      <input
        type="text"
        name="set-newtitle"
        id="set-newtitle"
        title="set-newtitle"
        aria-label="set-newtitle"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className={globalStyle({ input: "text" }, "w-64")}
      />
      <p className="w-1/2 mt-12 text-center">Changing the title on the &lt;title&gt; Element:</p>
    </div>
  );
}
