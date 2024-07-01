$:title
Classes and X

$:api-reference
[mdn](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#examples){class="linkblock"}

$:description
cnx is inspired by [clsx](https://www.npmjs.com/package/clsx), the arguments you give in cn or clsx you can put into cnx, so that you can think of cnx as clsx from another universe.

$:installation
Berikut adalah cara untuk install Create Variant ....

$:usage
function cnx(...inputs: ClassValue[]): string

// allows receiving more than one value
  const className = cnx(['', props, !(props === 'foo') && bar], {'': !props}, '');

// with many First values ​​and Second values
  cnx(['', ''], classLight, classDark)

// ""
  cnx(Boolean, Object, undefined, null, '', 0, NaN)

// merge with tailwind-merge
  function cn(...inputs: ClassValue[]) {
    return twMerge(cnx(...inputs));
  }

// configuration vscode settings.json
  "tailwindCSS.experimental.classRegex": [
    ["cnx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["twMerge\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
  ],