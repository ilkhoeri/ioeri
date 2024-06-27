"use client";
import { FactoryPayload } from "../factory";
import { GetStylesApiOptions } from "../factory/styles-api.types";
import { createSafeContext } from "../factory/transit";
import { SpotlightRootFactory } from "./spotlight-root";
import { SpotlightStore } from "./spotlight.store";
import type { CSSProperties } from "../utils/record-types";

export type GetStylesApi<Payload extends FactoryPayload> = (
  selector: NonNullable<Payload["stylesNames"]>,
  options?: GetStylesApiOptions,
) => {
  className: string;
  style: CSSProperties;
};

interface SpotlightContextValue {
  query: string;
  setQuery(query: string): void;
  getStyles: GetStylesApi<SpotlightRootFactory>;
  store: SpotlightStore;
  closeOnActionTrigger: boolean | undefined;
}

export const [SpotlightProvider, useSpotlightContext] = createSafeContext<SpotlightContextValue>(
  "Spotlight component was not found in tree",
);
