"use client";

import React from "react";
import { commandActions } from "./command-store";
import { useCommandContext } from "./command-store";
import { Factory, factory, useProps, CompoundStylesApiProps, ElementProps } from "@/modules/factory";

export type CommandSearchOrigin = "search" | "searchWrap";

export interface CommandSearchProps extends CompoundStylesApiProps<CommandSearchFactory>, ElementProps<"input", "size"> {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  size?: number;
}

export type CommandSearchFactory = Factory<{
  ref: HTMLInputElement;
  props: CommandSearchProps;
  stylesNames: CommandSearchOrigin;
  compound: true;
}>;

const defaultProps: Partial<CommandSearchProps> = {
  size: 32,
};

export const CommandSearch = factory<CommandSearchFactory>((props, ref) => {
  const {
    id,
    size,
    value,
    style,
    styles,
    onChange,
    unstyled,
    onKeyDown,
    className,
    classNames,
    leftSection,
    rightSection,
    type = "text",
    autoFocus = true,
    spellCheck = "false",
    autoComplete = "off",
    placeholder = "Search...",
    ...others
  } = useProps("CommandSearch", defaultProps, props);
  const ctx = useCommandContext();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);

    if (event.nativeEvent.code === "ArrowDown") {
      event.preventDefault();
      commandActions.selectNextAction(ctx.store);
    }
    if (event.nativeEvent.code === "ArrowUp") {
      event.preventDefault();
      commandActions.selectPreviousAction(ctx.store);
    }
    if (event.nativeEvent.code === "Enter") {
      event.preventDefault();
      commandActions.triggerSelectedAction(ctx.store);
    }
  };

  const rest = {
    ref,
    type,
    autoFocus,
    spellCheck,
    placeholder,
    autoComplete,
    onKeyDown: handleKeyDown,
    value: value ?? ctx.query,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      ctx.setQuery(event.currentTarget.value);
      onChange?.(event);
    },
    ...ctx.getStyles("search", { id, className, classNames, style, styles }),
    ...others,
  };

  return (
    <div {...ctx.getStyles("searchWrap", { classNames, styles })}>
      <LeftSection leftSection={leftSection} />
      <input {...rest} />
      {rightSection}
    </div>
  );
});

function LeftSection({ leftSection }: { leftSection: React.ReactNode }) {
  if (leftSection) return leftSection;
  return (
    <svg
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      height="24px"
      width="24px"
      aria-hidden="true"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 size-4 shrink-0 opacity-50"
    >
      <path
        data-d="search"
        d="M41.95,39.34l-6.81-6.81c2.28-2.85,3.65-6.45,3.65-10.38,0-9.18-7.47-16.65-16.65-16.65S5.5,12.97,5.5,22.15s7.47,16.65,16.65,16.65c3.92,0,7.53-1.37,10.38-3.65l6.81,6.81c.36,.36,.83,.54,1.31,.54s.95-.18,1.31-.54c.72-.72,.72-1.89,0-2.62ZM9.2,22.15c0-7.14,5.81-12.95,12.95-12.95s12.95,5.81,12.95,12.95c0,3.55-1.44,6.78-3.77,9.12-.01,0-.02,.01-.03,.02s-.01,.02-.02,.03c-2.34,2.33-5.57,3.77-9.12,3.77-7.14,0-12.95-5.81-12.95-12.95Z"
      />
    </svg>
  );
}
