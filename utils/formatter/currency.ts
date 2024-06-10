// export const formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
// });

export const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const formatPrice = (value: string): string => {
  // Hapus semua karakter selain digit
  const numericValue = value.replace(/\D/g, "");

  // Periksa apakah numericValue adalah NaN
  if (isNaN(parseInt(numericValue, 10))) {
    // Jika NaN, kembalikan string kosong atau nilai default sesuai kebutuhan
    return "";
  }

  // Format angka dengan menambahkan titik setiap tiga digit terakhir
  return parseFloat(numericValue).toLocaleString("id-ID");
};
