// Misalnya, jika paramsId adalah UUID, maka kita asumsikan itu adalah id
// const isId = (n: string) => /^[0-9a-fA-F]{24}$/.test(n); // Contoh pola untuk UUID

// Fungsi untuk mengecek apakah paramsId adalah UUID
export const UUID = (n: string) =>
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(n);
