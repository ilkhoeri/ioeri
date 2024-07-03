"use client";

import { useEffect } from "react";
import { Section } from "@/library/components/components";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  let errorMessage = <p className="text-muted-foreground text-[13px] font-mono">{String(error)}</p>;
  if (process.env.NODE_ENV !== "production") {
    errorMessage = <p className="text-muted-foreground text-[13px] font-mono">{String(error)}</p>;
  }

  return (
    <Section className="font-medium my-12 mt-12 mb-12 gap-4 [&_*]:font-mono">
      <h2 className="">Something went wrong!</h2>
      {errorMessage}

      <div className="flex flex-row gap-8 font-medium text-sm">
        <button type="button" aria-label="try-again" onClick={() => reset()}>
          Try again
        </button>
        <button type="button" aria-label="reload" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    </Section>
  );
}
