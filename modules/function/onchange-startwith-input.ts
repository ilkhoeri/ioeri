export const destructureAnchorHref = ["https://", "mailto:", "tel:+"];

export function onChangeStartsWith(targetValue: string, onChange: (...event: any[]) => void, prefixValues: string[]) {
  const newValue = targetValue.replace(/\s/g, "");
  onChange(newValue);

  const firstTwoChars = newValue.slice(-5); // Cek apakah dua karakter pertama cocok dengan awalan yang ada dalam array
  const matchingPrefix = prefixValues.find((prefix) => firstTwoChars === prefix.substring(0, 5));

  if (matchingPrefix) {
    onChange(matchingPrefix);
  }

  if (newValue.length >= 5) {
    const chars = newValue.slice(0, 5);
    const isMatchingPrefix = prefixValues.some((prefix) => prefix.startsWith(chars));

    if (!isMatchingPrefix) {
      onChange("https://" + chars);
    }
  }
}
