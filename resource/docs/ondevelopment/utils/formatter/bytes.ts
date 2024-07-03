/**
 * @param bytes number
 * @returns (bytes / (1024 * 1024)).toFixed(1)
 */
export function convertBytesToMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(1);
}
