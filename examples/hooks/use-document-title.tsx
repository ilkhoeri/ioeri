"use client";

import { useState } from "react";
import { useDocumentTitle } from "@/modules";
import globalStyle from "@/library/styles/styles";

export function Example() {
  const [newTitle, setNewTitle] = useState<string>("");
  useDocumentTitle(newTitle);

  return (
    <div>
      <input
        type="text"
        name="set-newtitle"
        id="set-newtitle"
        title="set-newtitle"
        aria-label="set-newtitle"
        onChange={(e) => setNewTitle(e.target.value)}
        className={globalStyle({ input: "text" })}
      />
    </div>
  );
}
