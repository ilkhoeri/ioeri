"use client";

import { createContext, useContext } from "react";
import { UseSlideType, useSlide } from "../../hooks/use-slide/use-slide";

import type { ScrollDirectionType } from "../../hooks/use-slide/use-slide";

export type DispatchUseSlide = {
  open?: boolean;
  setOpen?: (val: boolean) => void;
  scrollDirection?: ScrollDirectionType;
  setScrollDirection?: (val: ScrollDirectionType) => void;
  scrollUp?: boolean;
  scrollDown?: boolean;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
} & UseSlideType;

export interface SlideContextProps extends UseSlideType, DispatchUseSlide {}

const SlideContext = createContext<SlideContextProps | undefined>(undefined);

export interface SlideProviderProps extends UseSlideType {
  children: React.ReactNode;
}

export const SlideProvider: React.FC<SlideProviderProps> = ({ children, threshold, ...rest }) => {
  const slides = useSlide();

  const value = { threshold, ...slides, ...rest };
  return <SlideContext.Provider value={value}>{children}</SlideContext.Provider>;
};

export function useSlideContext() {
  const ctx = useContext(SlideContext);
  if (!ctx) {
    throw new Error("useSlideContext must be wrap within an SlideProvider");
  }
  return ctx;
}
