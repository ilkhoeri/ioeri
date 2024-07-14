"use client";
import * as React from "react";

import { useOpenState, type UseOpenStateType } from "@/modules/hooks";
import { InferTypes } from "@/modules/utility";
import { twMerge } from "tailwind-merge";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
interface ProviderProps<T> extends UseOpenStateType<T> {
  children: React.ReactNode;
}
type SharedType = {
  unstyled?: boolean;
  style?: CSSProperties;
  className?: string;
};
export type DialogContextProps<T> = UseOpenStateType<T> & InferTypes<typeof useOpenState>;
const DialogContext = React.createContext<DialogContextProps<HTMLElement> | undefined>(undefined);

export function useDialogContext<T>(ref: React.ForwardedRef<T>) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) {
    throw new Error("Dialog component trees must be wrap within an <Dialog>");
  }
  return { ...ctx, ref };
}

function Dialog<T extends HTMLElement>({ children, ref, modal = true, ...props }: ProviderProps<T>) {
  const state = useOpenState<T>({ ref, modal, base: true, ...props });
  return <DialogContext.Provider value={state}>{children}</DialogContext.Provider>;
}

const DialogTrigger = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & SharedType
>(({ type = "button", className, unstyled, style, ...props }, ref) => {
  const ctx = useDialogContext<HTMLButtonElement>(ref);
  return (
    <button
      ref={ctx.refs.trigger as React.RefObject<HTMLButtonElement>}
      type={type}
      {...ctx.styleAt("trigger", { style })}
      className={twMerge(
        !unstyled && "flex flex-nowrap font-medium text-sm select-none z-9 rounded-sm py-1",
        className,
      )}
      {...props}
    />
  );
});
DialogTrigger.displayName = "DialogTrigger";

const DialogOverlay = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div"> & SharedType>(
  ({ className, style, unstyled, ...props }, ref) => {
    const ctx = useDialogContext<HTMLDivElement>(ref);

    return (
      <ctx.Portal render={ctx.render}>
        <div
          ref={ctx.refs.overlay as React.RefObject<HTMLDivElement>}
          {...ctx.styleAt("overlay", { style })}
          className={twMerge(
            !unstyled &&
              "fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className,
          )}
          {...props}
        />
      </ctx.Portal>
    );
  },
);
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div"> & SharedType>(
  ({ style, className, unstyled, ...props }, ref) => {
    const ctx = useDialogContext<HTMLDivElement>(ref);

    return (
      <ctx.Portal render={ctx.render}>
        <div
          ref={ctx.refs.content as React.RefObject<HTMLDivElement>}
          {...ctx.styleAt("content", { style })}
          className={twMerge(
            !unstyled &&
              "fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[50%] data-[state=closed]:slide-out-to-top-[50%] rounded-lg",
            className,
          )}
          {...props}
        />
      </ctx.Portal>
    );
  },
);
DialogContent.displayName = "DialogContent";

export { Dialog, DialogTrigger, DialogContent, DialogOverlay };
