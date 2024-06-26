#usage
function MyComponent() {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

    return (
      <>
        <button onClick={() => setOpened(true)}>Open</button>

        {opened && (
          <div ref={ref} shadow="sm">
            <span>Click outside to close</span>
          </div>
        )}
      </>
    );

}
