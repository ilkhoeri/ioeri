export {
  spotlight,
  createSpotlight,
  createSpotlightStore,
  useSpotlight,
  openSpotlight,
  closeSpotlight,
  toggleSpotlight,
} from "./spotlight.store";
export type { SpotlightState, SpotlightStore } from "./spotlight.store";

export { isActionsGroup } from "./is-actions-group";

export { Spotlight } from "./spotlight";
export { SpotlightAction } from "./spotlight-action";
export { SpotlightActionsGroup } from "./spotlight-actions-group";
export { SpotlightActionsList } from "./spotlight-actions-list";
export { SpotlightEmpty } from "./spotlight-empty";
export { SpotlightFooter } from "./spotlight-footer";
export { SpotlightSearch } from "./spotlight-search";

export type {
  SpotlightFactory,
  SpotlightFilterFunction,
  SpotlightActionData,
  SpotlightActionGroupData,
  SpotlightProps,
  SpotlightStylesNames,
} from "./spotlight";

export type { SpotlightActionProps, SpotlightActionStylesNames } from "./spotlight-action";
export type { SpotlightActionsGroupProps, SpotlightActionsGroupStylesNames } from "./spotlight-actions-group";
export type { SpotlightActionsListProps, SpotlightActionsListStylesNames } from "./spotlight-actions-list";
export type { SpotlightEmptyProps, SpotlightEmptyStylesNames } from "./spotlight-empty";
export type { SpotlightFooterProps, SpotlightFooterStylesNames } from "./spotlight-footer";
export type { SpotlightSearchProps, SpotlightSearchStylesNames } from "./spotlight-search";
export type { SpotlightRootProps, SpotlightRootStylesNames } from "./spotlight-root";
