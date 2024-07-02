import { PickColorIcon, useEyeDropper } from "@/modules";
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
      <label
        htmlFor="pick color"
        className="absolute top-4 left-4 text-h1 font-extrabold opacity-20 hover:opacity-100 z-9 cursor-pointer"
      >
        {message}
      </label>
      <div // prettier-ignore
        className="absolute size-full rounded-lg inset-0 min-h-full min-w-full flex items-center justify-center" // prettier-ignore
        style={{ backgroundColor: color }} // prettier-ignore
      /> {/* prettier-ignore */}
    </div>
  );
}
