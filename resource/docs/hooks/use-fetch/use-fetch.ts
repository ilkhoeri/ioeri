import { useCallback, useEffect, useRef, useState } from "react";

export interface UseFetchOptions extends RequestInit {
  autoInvoke?: boolean;
}

export function useFetch<T>(url: string, { autoInvoke = true, ...options }: UseFetchOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const controller = useRef<AbortController | null>(null);

  const refetch = useCallback(async () => {
    if (!url) {
      return;
    }

    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { signal: controller.current.signal, ...options });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (autoInvoke) {
      refetch();
    }
  }, [refetch, autoInvoke]);

  useEffect(() => {
    return () => {
      if (controller.current) {
        controller.current.abort();
      }
    };
  }, []);

  const abort = useCallback(() => {
    if (controller.current) {
      controller.current.abort();
    }
  }, []);

  return { data, loading, error, refetch, abort };
}
