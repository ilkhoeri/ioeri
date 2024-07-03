"use client";

import { useMediaQuery } from "@/resource/docs";

/**
 *
 * @returns
 */
export function useQueryApp() {
  const maxMobile = useMediaQuery("(max-width: 639px)");
  const minTablet = useMediaQuery("(min-width: 640px)");
  const maxTablet = useMediaQuery("(max-width: 767px)");
  const minNoteBook = useMediaQuery("(max-width: 768px)");
  const maxNoteBook = useMediaQuery("(max-width: 1023px)");
  const minLarge = useMediaQuery("(min-width: 1024px)");
  const maxLarge = useMediaQuery("(max-width: 1279px)");

  return {
    /** @returns (min-width: 640px)
     * @usage
     * ```js
      const { maxMobile } = useQueryApp();
      if (maxMobile) {
        return null;
      }
      className="hidden sm:flex"
     * ```
     */
    maxMobile,
    /** @returns (min-width: 640px)
     * @usage
     * ```js
      const { minTablet } = useQueryApp();
      if (minTablet) {
        return null;
      }
      className="hidden sm:flex"
     * ```
     */
    minTablet,
    /** @returns (max-width: 767px)
     * @usage
     * ```js
      const { maxTablet } = useQueryApp();
      if (maxTablet) {
        return null;
      }
      className="hidden md:flex"
     * ```
     */
    maxTablet,
    /** @returns (min-width: 768px)
     * @usage
     * ```js
      const { minNoteBook } = useQueryApp();
        {minNoteBook && imageSrc && (
          <Image width={350} height={350} alt="berdikarier.com" src={imageSrc} />
        )}
      className="hidden md:flex"
     * ```
     */
    minNoteBook,
    /** @returns (min-width: 1023px)
     * @usage
     * ```js
      const { maxNoteBook } = useQueryApp();
        {maxNoteBook && imageSrc && (
          <Image width={350} height={350} alt="berdikarier.com" src={imageSrc} />
        )}
      className="hidden md:flex"
     * ```
     */
    maxNoteBook,
    /** @returns (min-width: 1024px)
     * @usage
     * ```js
      const { minTablet } = useQueryApp();
        {minTablet && imageSrc && (
          <Image width={350} height={350} alt="berdikarier.com" src={imageSrc} />
        )}
      className="hidden md:flex"
     * ```
     */
    minLarge,
    maxLarge,
  };
}
