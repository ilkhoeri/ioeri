// export const formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
// });

export const formatterIDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const formatterLong = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0, // Menetapkan jumlah digit di belakang koma
  maximumFractionDigits: 0, // Menetapkan jumlah maksimum digit di belakang koma
});

export const formatterIDRK = (value: number) => {
  if (value >= 1000 && value < 1000000) {
    return `Rp ${Math.floor(value / 1000)} K`;
  } else {
    return formatterIDR.format(value);
  }
};

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
