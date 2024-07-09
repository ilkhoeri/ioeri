"use client";

export { useClickOutside } from "./use-click-outside/use-click-outside";
export { useDidUpdate } from "./use-did-update/use-did-update";
export { useDisclosure } from "./use-disclosure/use-disclosure";
export { useFullscreen } from "./use-fullscreen/use-fullscreen";
export {
  useFixed,
  useHasScrollbar,
  applyStateEffect,
  attachBodyProperty,
  detachBodyProperty,
  attributeState,
  useWidthScrollbar,
} from "./use-fixed/use-fixed";
export { useHotkeys, getHotkeyHandler, getHotkeyMatcher, parseHotkey } from "./use-hotkeys/use-hotkeys";
export { useHover } from "./use-hover/use-hover";
export { useIntersection } from "./use-intersection/use-intersection";
export { useInterval } from "./use-interval/use-interval";
export { useLocalStorage } from "./use-local-storage/use-local-storage";
export { useMediaQuery } from "./use-media-query/use-media-query";
export { assignRef, createRefs, mergeRefs, useMergedRef } from "./use-merged-ref/use-merged-ref";
export { clampUseMovePosition, useMove } from "./use-move/use-move";
export { useMouse } from "./use-mouse/use-mouse";
export { useOpenState, DataOrigin, DataTrigger, DataAlign, DataSide } from "./use-open-state/use-open-state";
export { DOTS, range, usePagination } from "./use-pagination/use-pagination";
export { getRandomColor, useRandomColors } from "./use-random-colors/use-random-colors";
export { useReducedMotion } from "./use-reduced-motion/use-reduced-motion";
export { useElementSize, useResizeObserver } from "./use-resize-observer/use-resize-observer";
export {
  useScrollIntoView,
  easeInOutQuad,
  getRelativePosition,
  getScrollStart,
  setScrollParam,
} from "./use-scroll-into-view/use-scroll-into-view";
export { useUncontrolled } from "./use-uncontrolled/use-uncontrolled";
export { useViewportSize } from "./use-viewport-size/use-viewport-size";
export { useWindowEvent } from "./use-window-event/use-window-event";
export { useWindowScroll } from "./use-window-scroll/use-window-scroll";
export { useId, useReactId } from "./use-id/use-id";
export { useImagePopup } from "./use-image-popup/use-image-popup";
export { useIsomorphicEffect } from "./use-isomorphic-effect/use-isomorphic-effect";
export { getInputOnChange, useInputState } from "./use-input-state/use-input-state";
export { useStateHistory } from "./use-state-history/use-state-history";
export { useValidatedState } from "./use-validated-state/use-validated-state";
export { useClipboard } from "./use-clipboard/use-clipboard";
export { useDocumentTitle } from "./use-document-title/use-document-title";
export { useDocumentVisibility } from "./use-document-visibility/use-document-visibility";
export { useEyeDropper, type EyeDropperOpenReturnType } from "./use-eye-dropper/use-eye-dropper";
export { useFetch, type UseFetchOptions } from "./use-fetch/use-fetch";
export { useNetwork } from "./use-network/use-network";
export { useOs, type OS } from "./use-os/use-os";
export { useTrigger, useRender } from "./use-trigger/use-trigger";
export { useOrientation } from "./use-orientation/use-orientation";
export { useReload } from "./use-reload/use-reload";
export { usePWAInstaller } from "./use-pwa-installer/use-pwa-installer";
export { useElementInfo } from "./use-element-info/use-element-info";
export { useScrollArea, type UseScrollAreaType } from "./use-scroll-area/use-scroll-area";

export type { HotkeyItem, Hotkey, HotkeyItemOptions, KeyboardModifiers } from "./use-hotkeys/use-hotkeys";
export type { InitialInfo, RectElement, RectInfo } from "./use-element-info/use-element-info";
export type { UseMediaQueryOptions } from "./use-media-query/use-media-query";
export type { UseMovePosition } from "./use-move/use-move";
export type { UseOpenStateType } from "./use-open-state/use-open-state";
export type { PaginationParams } from "./use-pagination/use-pagination";
export type { StateHistory, UseStateHistoryHandlers } from "./use-state-history/use-state-history";
