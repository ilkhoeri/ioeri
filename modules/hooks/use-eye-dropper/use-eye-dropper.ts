import { useCallback, useState } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect/use-isomorphic-effect";

interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}
export interface EyeDropperOpenReturnType {
  sRGBHex: string;
}

export function useEyeDropper() {
  const [color, setColor] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [supported, setSupported] = useState<boolean>(false);

  useIsomorphicEffect(() => {
    setSupported(typeof window !== "undefined" && "EyeDropper" in window);
  }, []);

  const open = useCallback(
    (options: EyeDropperOpenOptions = {}): Promise<EyeDropperOpenReturnType | undefined> => {
      if (supported) {
        const eyeDropper = new (window as any).EyeDropper();
        return eyeDropper.open(options);
      }
      return Promise.resolve(undefined);
    },
    [supported],
  );

  const pickColor = useCallback(async () => {
    try {
      const result = await open();
      if (result) {
        setColor(result.sRGBHex);
        setError(null);
      }
    } catch (e: any) {
      if (e.name === "AbortError" || e.message === "The user canceled the selection.") {
        setError(null);
      } else {
        setError(e);
      }
    }
  }, [open]);

  return { supported, open, color, error, pickColor };
}
