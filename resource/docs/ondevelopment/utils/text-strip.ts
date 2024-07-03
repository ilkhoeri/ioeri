export function stripHtml(html: string) {
  // Cek jika potongan string berakhir di tengah tag HTML
  const lastOpeningTagIndex = html.lastIndexOf("<");
  const lastClosingTagIndex = html.lastIndexOf(">");
  if (lastClosingTagIndex < lastOpeningTagIndex) {
    // Jika iya, potong string agar berakhir setelah tag HTML terakhir
    html = html.slice(0, lastOpeningTagIndex);
  }
  // Hapus tag HTML dari string yang sudah dipotong
  return html.replace(/<[^>]*>/g, "").replace(/\n/g, " ");
}
