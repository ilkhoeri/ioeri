"use client";

import { useEffect, useState } from "react";

/**
 * ```js
 * const [hasScrollbar, scrollbarWidth] = useHasScrollbar();
 * console.log(scrollbarWidth); // Lebar scrollbar yang diukur
 * ```
 * memeriksa apakah lebar scrollbar melebihi batas tertentu
 */
export function useHasScrollbar(): [boolean, number] {
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const measureScrollbar = () => {
      // Buat elemen div sementara di luar viewport
      const outer = document.createElement("div");

      outer.style.visibility = "hidden";
      outer.style.position = "absolute";
      outer.style.zIndex = "-9999px";
      outer.style.overflow = "scroll"; // Gunakan overflow: scroll untuk memastikan scrollbar muncul

      document.body.appendChild(outer);

      // Hitung lebar scrollbar
      const width = outer.offsetWidth - outer.clientWidth;

      // Hapus elemen div sementara
      document.body.removeChild(outer);

      // Tentukan apakah scrollbar ada berdasarkan lebar scrollbar
      setScrollbarWidth(width);
      setHasScrollbar(width > 0);
    };

    // Panggil fungsi untuk mengukur scrollbar saat komponen dimuat
    measureScrollbar();

    // Tambahkan event listener resize untuk menangani perubahan ukuran jendela
    window.addEventListener("resize", measureScrollbar);

    // Cleanup: hapus event listener saat komponen dibongkar
    return () => {
      window.removeEventListener("resize", measureScrollbar);
    };
  }, []);

  return [hasScrollbar, scrollbarWidth];
}
