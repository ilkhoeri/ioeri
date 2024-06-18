"use client";
import React from "react";
import { ElementProps } from "../../factory/transit";
import { CompoundStylesApiProps } from "../../factory/styles-api.types";
import { Factory, factory } from "../../factory";
import { useProps } from "../../factory/use-props";
import { useSpotlightContext } from "./spotlight.context";

export type SpotlightActionsListStylesNames = "actionsList" | "actionsListInner";

export interface SpotlightActionsListProps
  extends CompoundStylesApiProps<SpotlightActionsListFactory>,
    ElementProps<"div"> {
  loading?: boolean;
  loadingComponent?: React.ReactNode;
}

export type SpotlightActionsListFactory = Factory<{
  props: SpotlightActionsListProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightActionsListStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightActionsListProps> = {};

export const SpotlightActionsList = factory<SpotlightActionsListFactory>((props, ref) => {
  const { id, className, classNames, style, styles, loading, loadingComponent, ...others } = useProps(
    "SpotlightActionsList",
    defaultProps,
    props,
  );
  const ctx = useSpotlightContext();

  if (loading && loadingComponent) {
    return loadingComponent;
  }

  return (
    <div
      ref={ref}
      data-spotlight="actionslist"
      {...ctx.getStyles("actionsList", { id, className, classNames, style, styles })}
      {...others}
    />
  );
});
