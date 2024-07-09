"use client";
import { CommandStore } from "./command-store";
import { CommandContentFactory } from "./command-content";
import { createSafeContext, CSSProperties, FactoryPayload, GetStylesApiOptions } from "@/modules/factory";

export type GetStylesApi<Payload extends FactoryPayload> = (
  selector: NonNullable<Payload["stylesNames"]>,
  options?: GetStylesApiOptions,
) => {
  className: string;
  style: CSSProperties;
};

type CommandContextValue = {
  query: string;
  setQuery(query: string): void;
  getStyles: GetStylesApi<CommandContentFactory>;
  store: CommandStore;
  closeOnActionTrigger: boolean | undefined;
};

export const [CommandProvider, useCommandContext] = createSafeContext<CommandContextValue>(
  "Command component was not found in tree",
);
