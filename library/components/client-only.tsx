"use client";

import { useEffect, useState } from "react";

export const ClientOnly = ({ children, state = true }: { children: React.ReactNode; state?: boolean }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (state && !isMounted) {
    return null;
  }

  return <>{children}</>;
};
