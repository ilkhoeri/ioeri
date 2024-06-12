"use client";

import Link from "next/link";
import Container from "@/components/ui/container";
import { IoeriLogoTextIcon } from "@/modules";
import { useState } from "react";

export default function Headnav() {
  const [hoveredElement, setHoveredElement] = useState<DOMRect | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredElement(rect);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };
  return (
    <header className="h-[--navbar] flex items-center justify-between py-4 px-4 md:px-5 xl:px-6 border-0 border-b-[0.04rem] border-b-muted/65 sticky top-0 inset-x-0 z-99 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 [&_+_main]:pt-[--navbar]">
      <Container unstyled className="w-full relative flex items-center mx-auto max-w-screen-3xl md:px-4 3xl:px-20">
        <Link href={"/"} aria-label="ioeri" className="rounded-xl py-1 px-2">
          <IoeriLogoTextIcon size={20} />
        </Link>

        <div className="relative h-full hidden md:flex items-center justify-between text-muted-foreground font-medium text-sm ml-10 overflow-hidden rounded-sm mr-auto">
          <div
            role="button"
            className="cursor-pointer select-none py-1 px-2 h-6 rounded-sm centered"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Products
          </div>
          <div
            role="button"
            className="cursor-pointer select-none py-1 px-2 h-6 rounded-sm centered"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Contacts
          </div>
          <div
            role="button"
            className="cursor-pointer select-none py-1 px-2 h-6 rounded-sm centered"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Generators
          </div>
          <div
            role="button"
            className="cursor-pointer select-none py-1 px-2 h-6 rounded-sm centered"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Docs
          </div>

          {hoveredElement && (
            <span
              className="absolute -z-1 transition-transform bg-muted rounded-sm"
              style={{
                transition: "transform 180ms, width 90ms",
                height: `${hoveredElement?.height}px`,
                width: `${hoveredElement?.width}px`,
                // top: `${hoveredElement?.top}px`,
                // left: `${hoveredElement?.left}px`,
                // @ts-ignore
                transform: `translateX(${hoveredElement?.x - 193.5}px)`, // Adjust for scroll position
              }}
            />
          )}
        </div>

        <div />
      </Container>
    </header>
  );
}
