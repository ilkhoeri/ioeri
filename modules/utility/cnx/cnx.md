#title
className x

#description
cnx is inspired by clsx, the arguments you give in cn or clsx you can put into cnx, so that you can think of <a href="https://www.npmjs.com/package/clsx" target="_blank" class="a_blank">cnx as clsx from another universe</a>.

#installation
Berikut adalah cara untuk install Create Variant ....

#usage
function cnx(...inputs: ClassValue[]): string

// usage
// Allows receiving more than one First value and Second value
  const className = cnx(
  ['class_root', `variant-${variant}`, `size-${props.size}`, !(variant === 'unstyled') && classes.root],
  classNames?.root,
  className
  );

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