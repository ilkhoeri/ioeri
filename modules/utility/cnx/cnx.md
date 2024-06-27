$:title
Classes and X

$:description
cnx is inspired by <a href="https://www.npmjs.com/package/clsx" target="_blank" class="a_blank">clsx</a>, the arguments you give in cn or clsx you can put into cnx, so that you can think of cnx as <a href="https://www.npmjs.com/package/clsx" target="_blank" class="a_blank">clsx</a> from another universe.

$:installation
Berikut adalah cara untuk install Create Variant ....

$:usage
function cnx(...inputs: ClassValue[]): string

// Allows receiving more than one First value and Second value
  const className = cnx(
  ['class_root', `variant-${variant}`, `size-${props.size}`, !(variant === 'unstyled') && classes.root],
  classNames?.root,
  className
  );

// with boolean value
  function MyComponent({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <div
        className={cnx("min-h-[62px] bg-background-box relative transition-[width,height,color]", {
          "h-[20rem] max-h-[20rem] overflow-hidden text-muted-foreground/50": !open,
        })}
      >
        {children}
        <Button
          variant="outline"
          className="absolute inset-x-[calc(50%-1.5rem)] bottom-4 z-[99] px-3 min-w-20 w-max"
          onClick={() => setOpen(!open)}
        >
          {open ? "Collapse" : "Expand"}
        </Button>
      </div>
    );
  }

// Example with many First values ​​and Second values
  <div className={cnx(['class1', 'class2'], classLight, classDark, classNames?.root, className)} />

// Example of use in the parent component
  <div className={cnx(['h-6', 'w-6'])} />
  <div className={cnx("h-6 w-6 bg-white")} />
  <div className={cnx('h-6', isOpen && 'w-6', isDark ? 'bg-black' : 'bg-white')} />

// Example of using merge with tailwind-merge
  import { cnx, type ClassValue } from "@/modules";
  import { twMerge } from "tailwind-merge";

  export function cn(...inputs: ClassValue[]) {
    return twMerge(cnx(...inputs));
  }

// configuration vscode settings.json
  "tailwindCSS.experimental.classRegex": [
    ["cnx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["twMerge\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
  ],