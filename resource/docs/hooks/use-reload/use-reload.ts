import { useEffect, useState } from "react";

export function useReload() {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setReload(true);
    };

    const handleLoad = () => {
      setReload(false);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const onReload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    window.location.reload();
    e.preventDefault();
  };

  return { reload, onReload };
}
