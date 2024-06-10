"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  let errorMessage = null;
  if (process.env.NODE_ENV !== "production") {
    errorMessage = <p className="text-muted-foreground text-[13px] font-mono">{String(error)}</p>;
  }

  return (
    <>
      <h2 className="font-medium">Something went wrong!</h2>
      {errorMessage}

      <div className="flex flex-row gap-8 font-medium">
        <button type="button" aria-label="try-again" onClick={() => reset()}>
          Try again
        </button>
        <button type="button" aria-label="reload" onClick={() => window.location.reload()}>
          Reload
        </button>
        <button type="button" aria-label="home" onClick={() => (window.location.href = "/")}>
          Home
        </button>
      </div>
    </>
  );
}
