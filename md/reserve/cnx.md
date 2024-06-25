export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export function cnx(...inputs: ClassValue[]): string {
let classNamesArray = Array.isArray(inputs) ? inputs : [inputs];

classNamesArray = classNamesArray.filter((className) => typeof className === "string");

const combinedClassNames = [...classNamesArray];

inputs.forEach((className) => {
if (className) {
combinedClassNames.push(className);
}
});

return combinedClassNames.filter(Boolean).join(" ");
}
