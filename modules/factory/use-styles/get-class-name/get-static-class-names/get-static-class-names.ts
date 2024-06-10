interface GetStaticClassNamesInput {
  themeName: string[];
  selector: string;
  classNamesPrefix?: string;
}

/** Returns static component classes, for example, `.Input-wrapper` */
export function getStaticClassNames({ themeName, classNamesPrefix, selector }: GetStaticClassNamesInput) {
  return themeName.map((n) => `${classNamesPrefix}-${n}-${selector}`).join(" ");
}
