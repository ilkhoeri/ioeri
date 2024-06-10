"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  let errorMessage = null;
  if (process.env.NODE_ENV !== "production") {
    errorMessage = <p className="text-muted-foreground text-[13px] font-mono">{String(error)}</p>;
  }
  return (
    <html>
      <body className="bg-background flex flex-col items-center justify-center gap-4">
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
      </body>
    </html>
  );
}
