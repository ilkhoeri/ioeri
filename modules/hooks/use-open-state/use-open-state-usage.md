function MyComponent() {
const {open, ref, handleOpen} = useOpenState();

return (
<>
<button onClick={handleOpen}>Open dropdown</button>

        {open && (
          <Paper ref={ref} shadow="sm">
            <span>Click outside to close</span>
          </Paper>
        )}
      </>

);
}

- @returns setOpen(false)
  \*/
  ref,
  /\*\* // sample

```js
if (!render) {
  return null;
}
```

_/
render,
/\*\* @return boolean _/
open,
/** `js
     * <button
     *   type="button"
     *   onClick={() => {
     *     if (!open) {
           window.history.pushState({ open: true }, "");
           }
           setOpen(!open);
     *   }}
     * >
     * Open
     * </button>
     * ` \*/
setOpen,
/**
_ ```js
const handleOpen = () => {
if (trigger === "click") {
if (!open) {
window.history.pushState({ open: true }, "");
}
setOpen(!open);
}
};
_ ```
_/
handleOpen,
handleClose,
/\*\*
_ _Sedikit berbeda dengan handleOpen_
\*/
onClick,
handleBack,
onMouseEnter,
onMouseLeave,
onKeyDown,
