import { usePWAInstaller } from "@/modules";
import globalStyle from "@/library/styles/styles";

export function Demo() {
  const { prompt, installer } = usePWAInstaller();

  return (
    <button
      type="button"
      role="button"
      title="install pwa"
      aria-label="install pwa"
      hidden={!prompt}
      onClick={installer}
      className={globalStyle({ button: "default", size: "sm" })}
    >
      Install PWA
    </button>
  );
}
