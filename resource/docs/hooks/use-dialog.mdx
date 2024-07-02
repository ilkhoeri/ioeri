
const attrData = ({
  as,
  align,
  side,
  dataState,
}: {
  as: OriginType;
  align: "center" | "start" | "end";
  side: "top" | "right" | "bottom" | "left";
  dataState: "open" | "opened" | "closed";
}): { [key: string]: string | undefined } => ({
  "data-state": dataState,
  "data-side": side,
  "data-align": align,
  "data-origin": as,
});

const styles = ({
  as,
  sideOffset,
  triggerInfo,
  contentInfo,
}: {
  as: OriginType;
  sideOffset: number;
  triggerInfo: RectElement;
  contentInfo: RectElement;
}): { [key: string]: string } => {
  const vars: { [key: string]: string } = {};
  const setVars = (as: OriginType, info?: RectElement) => {
    if (info) {
      vars[`--${as}-h`] = `${info.height}px`;
      vars[`--${as}-w`] = `${info.width}px`;
      vars[`--${as}-x`] = `${info.x}px`;
      vars[`--${as}-y`] = `${info.y}px`;
    }
  };
  switch (as) {
    case "root":
      vars["--offset"] = String(`${sideOffset}px`);
      setVars("trigger", triggerInfo);
      setVars("content", contentInfo);
      break;
    case "trigger":
      setVars(as, triggerInfo);
      break;
    case "content":
      setVars(as, contentInfo);
      break;
  }
  return vars;
};
