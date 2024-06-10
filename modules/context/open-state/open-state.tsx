"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useOpenState } from "../../hooks/use-open-state/use-open-state";
import type { UseOpenStateType } from "../../hooks/use-open-state/use-open-state";

interface OpenStateContextProps {
  render: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: () => void;
}

interface OpenStateProviderProps extends UseOpenStateType {
  children: ReactNode;
}

const OpenStateContext = createContext<OpenStateContextProps | undefined>(undefined);

/**
 * @usage
 * ```js
  import { OpenStateProvider } from "@/modules";

  export default async function DashboardLayout({children}:{children: React.ReactNode}) {
  return (
    <>
      <OpenStateProvider>
        <NavHead data={admin} />
        <NavSide />
      </OpenStateProvider>

      {children}
    </>
  )
  }
 * ```
 * @param param0 
 * @returns 
 */
export const OpenStateProvider: React.FC<OpenStateProviderProps> = ({ children, ...rest }) => {
  const state = useOpenState({ ...rest });

  return <OpenStateContext.Provider value={state}>{children}</OpenStateContext.Provider>;
};

/**
 * @usage
 * ```js
  // pada komponen pertama
  "use client";

  export function NavHead() {
    const { handleOpen, open, setOpen } = useOpenStateContext();

    return (
      <Element className={s.container}>
        <ButtonAside setOpen={setOpen} open={open} onOpenChange={handleOpen} />
      </Element>
    );
  };
  
  // pada komponen kedua dan seterusnya
  "use client";

  export function NavSide() {
    const { open, setOpen, handleClose } = useOpenStateContext();
    const rest = {
      classNames: { link, active },
      onClick: () => query && handleClose(),
    };

    return (
      <Element>
        <Overlay open={open} setOpen={setOpen} />

        <aside className={twMerge(open ? navStyle.open : navStyle.close)} >
          <ButtonAside query={query} open={open} onOpenChange={handleClose} />
          <LinkNav items={useRoute()} {...rest} />
        </aside>
      </Element>
    );
  }
 * ```
 * @returns 
 */
export const useOpenStateContext = () => {
  const context = useContext(OpenStateContext);
  if (!context) {
    throw new Error("useOpenStateContext must be used within an OpenStateProvider");
  }
  return context;
};
