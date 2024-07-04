import { useState, useEffect } from "react";

export function usePWAInstaller() {
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    const beforeInstallPromptHandler = (event: any) => {
      event.preventDefault();
      setPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    };
  }, []);

  const installer = async () => {
    if (!prompt) return;

    try {
      const result = await prompt.prompt();
      console.log(`Install prompt was: ${result.outcome}`);
    } catch (error) {
      console.error("Error while prompting install:", error);
    }

    setPrompt(null);
  };

  const disableInAppInstallPrompt = () => {
    setPrompt(null);
  };

  useEffect(() => {
    const appInstalledHandler = () => {
      disableInAppInstallPrompt();
    };

    window.addEventListener("appinstalled", appInstalledHandler);

    return () => {
      window.removeEventListener("appinstalled", appInstalledHandler);
    };
  }, []);

  return { prompt, installer, disableInAppInstallPrompt };
}
