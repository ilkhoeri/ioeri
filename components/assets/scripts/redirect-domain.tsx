"use client";
import React, { useEffect } from "react";

export function RedirectDomain() {
  return (
    <script
      data-redirect-mobile="https://mobile.berdikarier.com"
      dangerouslySetInnerHTML={{
        __html: `
        if (window.innerWidth <= 576) {
          window.location.href = "https://mobile.berdikarier.com";
        }

          `,
      }}
    />
  );
}

export function MobileRedirect() {
  useEffect(() => {
    // Mendeteksi lebar layar saat komponen dimuat
    const screenWidth = window.innerWidth;

    // Tentukan batas lebar layar untuk diarahkan (misalnya, 576px)
    const mobileScreenWidth = 576;

    // Cek apakah lebar layar lebih kecil dari batas lebar layar mobile
    if (screenWidth <= mobileScreenWidth) {
      // Redirect ke subdomain mobile.berdikarier.com
      window.location.href = "https://mobile.berdikarier.com";
    }
  }, []);

  return null;
}

export function ResizeRedirect({ mobileScreenWidth = 576 }) {
  useEffect(() => {
    let isRedirecting = false; // Tambahkan variabel state

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= mobileScreenWidth && !isRedirecting) {
        isRedirecting = true; // Setel variabel state
        // Redirect ke subdomain mobile.berdikarier.com jika ukuran jendela sesuai
        window.location.href = "https://mobile.berdikarier.com";
      } else if (screenWidth > mobileScreenWidth && isRedirecting) {
        isRedirecting = false; // Setel variabel state
        // Redirect kembali ke domain utama jika ukuran jendela tidak sesuai
        window.location.href = "https://berdikarier.com";
      }
    };

    // Menjalankan fungsi saat komponen dimuat
    handleResize();

    // Menambahkan event listener untuk mendeteksi perubahan ukuran jendela
    window.addEventListener("resize", handleResize);

    return () => {
      // Membersihkan event listener saat komponen dibongkar
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileScreenWidth]);

  return null;
}
