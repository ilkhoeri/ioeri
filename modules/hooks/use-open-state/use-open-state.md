#usage
function MyComponent() {
  const {ref, render, handleOpen, handleClose} = useOpenState();

  return (
    <div>
      <button type="button" onClick={handleOpen}>Open</button>

      {render && (
        <article ref={ref}>
          <button type="button" onClick={handleClose}>Close</button>
          <span>Click outside to close</span>
        </article>
      )}
    </div>
  );
}

function MyComponent() {
  const {render, onMouseEnter, onMouseLeave } = useOpenState({ trigger: "hover" });

  return (
    <>
      <button
        type="button"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        Tooltip
      </button>

      {render && (
        <div>
          <span>Content</span>
        </div>
      )}
    </>
  );
}

function MyComponent() {
  const {render, handleOpen, handleClose, dataState} = useOpenState({ defaultOpen: true });

  return (
    <>
      <button
        type="button"
        data-state={dataState}
        onClick={handleOpen}
      >
        Tooltip
      </button>

      {render && (
        <div data-state={dataState}>
          <button type="button" onClick={handleClose}>Close</button>
          <span>Content</span>
        </div>
      )}
    </>
  );
}

// api
const { open, setOpen } = useOpenState();

// or
const [open, setOpen] = useState(false);
const { handleOpen, handleClose } = useOpenState({ open, setOpen });

// handleOpen is slightly different with setOpen
// handleOpen adds history.pushState with empty string, suitable when used for mobile devices