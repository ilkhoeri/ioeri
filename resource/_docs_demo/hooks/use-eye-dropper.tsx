import { useEyeDropper } from "@/modules/hooks";
import { PickColorIcon } from "@/modules/icons";
import { SetProps } from "../__set_props";
import globalStyle from "@/library/styles/styles";

export function Demo() {
  const { pickColor, color, supported, error } = useEyeDropper();

  if (!supported) {
    return "Your browser does not support the EyeDropper API";
  }
  let message: string = "Pick color";
  if (error) message = error?.message;
  if (color) message = color;

  return (
    <div>
      <button
        type="button"
        aria-label="pick color"
        title="pick color"
        id="pick color"
        onClick={pickColor}
        className={globalStyle({ button: "outline", size: "icon-sm" }, "z-9")}
      >
        <PickColorIcon color={color} size={20} />
      </button>
      <SetProps.LabelOnly htmlFor="pick color">{message}</SetProps.LabelOnly>
      <div // prettier-ignore
        className="absolute size-full rounded-lg inset-0 min-h-full min-w-full flex items-center justify-center" // prettier-ignore
        style={{ backgroundColor: color }} // prettier-ignore
      /> {/* prettier-ignore */}
    </div>
  );
}
