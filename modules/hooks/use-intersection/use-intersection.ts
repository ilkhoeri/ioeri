"use client";
import { useCallback, useRef, useState } from "react";

/**
 * @usage
 * ```js
  import { useRef } from 'react';

  function Demo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { ref, entry } = useIntersection({
      root: containerRef.current,
      threshold: 1,
    });

    return (
      <div ref={containerRef} style={{ overflowY: 'scroll' }}>
        <div>
          <div
            ref={ref}
            style={{
              backgroundColor: entry?.isIntersecting
                ? 'cyan'
                : 'red',
            }}
          >
            <h6>
              {entry?.isIntersecting ? 'Fully visible' : 'Obscured'}
            </h6>
          </div>
        </div>
      </div>
    );
  }
 * ```
 */
export function useIntersection<T extends HTMLElement = any>(
  options?: ConstructorParameters<typeof IntersectionObserver>[1],
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (element: T | null) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }

      if (element === null) {
        setEntry(null);
        return;
      }

      observer.current = new IntersectionObserver(([_entry]) => {
        setEntry(_entry);
      }, options);

      observer.current.observe(element);
    },
    [options],
  );

  return { ref, entry };
}
