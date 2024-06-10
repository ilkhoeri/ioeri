"use client";

import { useEffect, useState } from "react";

export const useAttention = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  useEffect(() => {
    const cleanupTimeout = setTimeout(() => {
      setError(undefined);
      setSuccess(undefined);
    }, 6000);

    return () => clearTimeout(cleanupTimeout);
  }, [error, success]);

  return { error, setError, success, setSuccess };
};
