$:usage
function MyComponent() {
  const { prompt, installer } = usePWAInstaller();

  return (
    <button id="install" hidden={!prompt} onClick={installer}>
      Install
    </button>
  );
};