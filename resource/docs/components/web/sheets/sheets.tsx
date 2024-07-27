// prettier-ignore
"use client";
import * as React from "react";
import { XIcon } from "@/modules/icons";
import { twMerge } from "tailwind-merge";
import { InferTypes } from "@/modules/utility";
import { createSafeContext, mergeRefs, useOpenState, hasSpecificChildren, type ClickOpenOptions } from "@/modules/hooks";

import classes from "./sheets-style";
import "./sheets.css";

export enum SheetsVariant {
  Accordion = "accordion",
  Collapsible = "collapsible",
  Dropdown = "dropdown",
  Dialog = "dialog",
  Drawer = "drawer",
}
type SharedType = {
  unstyled?: boolean;
  className?: string;
  style?: React.CSSProperties & { [key: string]: any };
};
type SheetsValuesType = ClickOpenOptions & {
  children: React.ReactNode;
  variant?: `${SheetsVariant}`;
  multipleOpen?: boolean;
  openId?: string | null;
  setOpenId?: React.Dispatch<React.SetStateAction<string | null>>;
};
type SheetsType = React.ComponentPropsWithoutRef<"div"> & SheetsValuesType;
type SheetsValue = InferTypes<typeof useOpenState> & Omit<SheetsValuesType, "children">;
type SheetsSharedType<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & SharedType;

const DedicatedContext = React.createContext<{
  openId: string | null;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  openId: null,
  setOpenId: () => {},
});
const useDedicatedContext = () => React.useContext(DedicatedContext);
export function DedicatedProvider({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  return <DedicatedContext.Provider value={{ openId, setOpenId }}>{children}</DedicatedContext.Provider>;
}

const [Provider, useSheetsContext] = createSafeContext<SheetsValue>(
  "Sheets component trees must be wrap within an <SheetsProvider> or <Sheets>",
);

const SheetsProvider = (props: SheetsValuesType) => {
  const { variant = "accordion", side, modal, multipleOpen, children, ...rest } = props;

  const ctx = useOpenState<HTMLElement>({
    observe: {
      align: variant === SheetsVariant.Dropdown,
      side: ["dropdown", "drawer"].includes(variant),
      offset: variant === SheetsVariant.Dropdown,
      sideswipe: variant === SheetsVariant.Dropdown,
      orientation: variant === SheetsVariant.Accordion,
      multipleOpen: multipleOpen || variant !== SheetsVariant.Accordion,
      availableSize: ["accordion", "collapsible"].includes(variant),
      contentRect: ["collapsible", "dropdown"].includes(variant),
    },
    side: side || (variant === "dropdown" ? "bottom" : "right"),
    modal: modal || ["dialog", "drawer"].includes(variant),
    trigger: "click",
    ...rest,
  });

  return <Provider value={{ variant, multipleOpen, ...ctx, ...rest }}>{children}</Provider>;
};

function SheetsDedicatedProvider(props: Omit<SheetsValuesType, "openId" | "setOpenId">) {
  const { variant = "accordion", children, ...rest } = props;
  const { openId, setOpenId } = useDedicatedContext();

  if (variant !== SheetsVariant.Accordion) return null;

  return (
    <SheetsProvider variant="accordion" openId={openId} setOpenId={setOpenId} {...rest}>
      {children}
    </SheetsProvider>
  );
}

const Sheets = React.forwardRef<React.ElementRef<"div">, SheetsType>(
  (
    { align, side, open, onOpenChange, sideOffset, clickOutsideToClose, defaultOpen, variant = "accordion", children, openId, setOpenId, delay, multipleOpen, hotKeys, modal, popstate, ...props },
    ref,
  ) => {
    const rest = { align, side, open, onOpenChange, sideOffset, clickOutsideToClose, defaultOpen, variant, openId, setOpenId, delay, multipleOpen, hotKeys, modal, popstate };

    const hasSheetsChild = hasSpecificChildren(children, [SheetsTrigger, SheetsContent]);

    const renderContent = (content: React.ReactNode) => (
      <SheetsProvider {...rest}>
        <SheetsRoot ref={ref} {...props}>
          {content}
        </SheetsRoot>
      </SheetsProvider>
    );

    switch (variant) {
      case SheetsVariant.Accordion:
        return multipleOpen ? renderContent(children) : renderContent(<DedicatedProvider>{children}</DedicatedProvider>);

      case SheetsVariant.Collapsible:
        return hasSheetsChild ? (
          renderContent(children)
        ) : (
          <SheetsProvider {...rest}>
            <SheetsContent ref={ref} {...props}>
              {children}
            </SheetsContent>
          </SheetsProvider>
        );

      default:
        return <SheetsProvider {...rest}>{children}</SheetsProvider>;
    }
  },
);
Sheets.displayName = "Sheets";

const SheetsRoot = React.forwardRef<React.ElementRef<"div">, SheetsSharedType<"div">>(
  ({ className, unstyled, style, ...props }, ref) => {
    const { variant, ...ctx } = useSheetsContext();

    return (
      <div
        ref={mergeRefs(ctx.refs.root, ref)}
        {...classes("root", { variant, className, unstyled })}
        {...ctx.styleAt("root", { style })}
        {...props}
      />
    );
  },
);
SheetsRoot.displayName = "SheetsRoot";

const SheetsItem = React.forwardRef<React.ElementRef<"div">, SheetsSharedType<"div">>(
  ({ className, unstyled, style, ...props }, ref) => {
    const { variant, multipleOpen, ...ctx } = useSheetsContext();

    const item = (
      <div
        ref={mergeRefs(ctx.refs.item, ref)}
        {...classes("item", { variant, className, unstyled })}
        {...ctx.styleAt("item", { style })}
        {...props}
      />
    );

    if (variant === SheetsVariant.Accordion) {
      return multipleOpen ? (
        <SheetsProvider multipleOpen>{item}</SheetsProvider>
      ) : (
        <SheetsDedicatedProvider>{item}</SheetsDedicatedProvider>
      );
    }
    return item;
  },
);
SheetsItem.displayName = "SheetsItem";

const SheetsTrigger = React.forwardRef<React.ElementRef<"button">, SheetsSharedType<"button">>(
  ({ type = "button", className, unstyled, style, onClick, ...props }, ref) => {
    const { variant, ...ctx } = useSheetsContext();

    return (
      <button
        ref={mergeRefs(ctx.refs.trigger, ref)}
        type={type}
        {...classes("trigger", { variant, className, unstyled })}
        {...ctx.styleAt("trigger", { style })}
        {...props}
      />
    );
  },
);
SheetsTrigger.displayName = "SheetsTrigger";

const SheetsClosed = React.forwardRef<React.ElementRef<"button">, SheetsSharedType<"button">>(
  ({ type = "button", className, unstyled, onClick, children, ...props }, ref) => {
    const ctx = useSheetsContext();

    return (
      <button
        ref={ref}
        type={type}
        onClick={(e) => {
          onClick?.(e);
          ctx.toggle();
        }}
        className={twMerge(!unstyled && "size-4 absolute right-4 top-4 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50", className)}
        {...props}
      >
        {children || <XIcon />}
      </button>
    );
  },
);
SheetsClosed.displayName = "SheetsClosed";

const SheetsContent = React.forwardRef<React.ElementRef<"div">, SheetsSharedType<"div">>(
  ({ className, unstyled, "aria-disabled": arDsb, style, children, ...props }, ref) => {
    const { variant = "accordion", side, ...ctx } = useSheetsContext();
    const omitVariants = ["accordion", "collapsible"].includes(variant);

    if (!ctx.render && !omitVariants) return null;

    const content = (
      <div
        ref={mergeRefs(ctx.refs.content, ref)}
        {...classes("content", { variant, side, className, unstyled })}
        {...ctx.styleAt("content", { style })}
        role={omitVariants ? "region" : undefined}
        aria-labelledby={`${ctx.refs.trigger.current?.id}`}
        aria-disabled={arDsb || ctx.render ? "false" : "true"}
        hidden={!ctx.render}
        {...props}
      >
        {omitVariants ? (ctx.render ? children : null) : children}
      </div>
    );

    if (omitVariants) return content;

    return (
      <ctx.Portal render={ctx.render}>
        {variant !== SheetsVariant.Dropdown && <SheetsOverlay />}
        {content}
      </ctx.Portal>
    );
  },
);
SheetsContent.displayName = "SheetsContent";

const SheetsOverlay = React.forwardRef<React.ElementRef<"div">, SheetsSharedType<"div">>(
  ({ className, unstyled, style, onClick, ...props }, ref) => {
    const { variant, ...ctx } = useSheetsContext();

    return (
      <div
        ref={mergeRefs(ctx.refs.overlay, ref)}
        {...classes("overlay", { variant, className, unstyled })}
        {...ctx.styleAt("overlay", { style })}
        onClick={(e) => {
          onClick?.(e);
          ctx.toggle();
        }}
        {...props}
      />
    );
  },
);
SheetsOverlay.displayName = "SheetsOverlay";

export { SheetsProvider, Sheets, SheetsItem, SheetsTrigger, SheetsClosed, SheetsContent };
