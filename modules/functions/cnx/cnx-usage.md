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
  <div className={cnx('h-6', isOpen && 'w-6', isDark ? 'bg-black' : 'bg-white')} />
  <div className="h-6 w-6 bg-white" />

// Example of using merge with tailwind-merge
  import { cnx, type ClassValue } from "@/modules/functions";
  import { twMerge } from "tailwind-merge";

  export function cn(...inputs: ClassValue[]) {
    return twMerge(cnx(inputs));
  }
