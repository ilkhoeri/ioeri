import DOMPurify from "dompurify";

const config = {
  ADD_TAGS: ["iframe", "use"], // Izinkan elemen <iframe>
  // ALLOWED_TAGS: ["b", "span"],
  // ALLOWED_ATTR: ["style"],
};

/**
 * ```js
 * import { cleanHTML } from '../../libs';
   <div
      dangerouslySetInnerHTML={{ __html: cleanHTML(data.description) }}
   />

   <article
    role="article"
    className="ProseMirror"
    dangerouslySetInnerHTML={{ __html: cleanHTML(String(content)) }}
   />
   ```
*/
export function cleanHTML(html: string) {
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(html, config);
  }
  return html;
}

export function markdownInsertHTML(html: string) {
  if (typeof window !== "undefined") {
    const sanitizedHTML = DOMPurify.sanitize(html, config);
    return { __html: addLineBreaksToEmptyParagraphs(sanitizedHTML) };
  }
  return { __html: html };
}

function addLineBreaksToEmptyParagraphs(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const emptyParagraphs = doc.querySelectorAll("p:empty:not(:only-child)");
  emptyParagraphs.forEach(function (paragraph) {
    paragraph.innerHTML = "<br>"; // Menambahkan konten <br> (enter)
  });
  return doc.body.innerHTML;
}

function removeEmptyParagraphs(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const emptyParagraphs = doc.querySelectorAll("p:empty:not(:only-child)");
  emptyParagraphs.forEach(function (p) {
    p.remove();
  });
  return doc.body.innerHTML;
}

/**
 * @usage
 * ```js
  export default function MarkdownPreview({ markdown }) {
     const markup = markdownHTML(markdown);
     return <div dangerouslySetInnerHTML={markup} />;
  }
  ```
 * @param markdown 
 * @returns __html: renderedHTML
 */
export function markdownHTML(html: string) {
  if (typeof window !== "undefined") {
    const sanitizedHTML = DOMPurify.sanitize(html, config);
    return { __html: removeEmptyParagraphs(sanitizedHTML) }; // Pastikan mengembalikan objek dengan properti __html
  }
  return { __html: html }; // Jika tidak perlu membersihkan HTML, kembalikan langsung
}

// document.addEventListener("DOMContentLoaded", function () {
//   const emptyParagraphs = document.querySelectorAll("p:empty:not(:only-child)");
//   emptyParagraphs.forEach(function (paragraph) {
//     paragraph.innerHTML = "<br>"; // Menambahkan konten <br> (enter)
//   });
// });

export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// export function stripHtml(html: string) {
//   const doc = new DOMParser().parseFromString(html, "text/html");
//   return doc.body.textContent || "";
// }

export function stripHtml(html: string) {
  // Cek jika potongan string berakhir di tengah tag HTML
  const lastOpeningTagIndex = html.lastIndexOf("<");
  const lastClosingTagIndex = html.lastIndexOf(">");
  if (lastClosingTagIndex < lastOpeningTagIndex) {
    // Jika iya, potong string agar berakhir setelah tag HTML terakhir
    html = html.slice(0, lastOpeningTagIndex);
  }
  // Hapus tag HTML dari string yang sudah dipotong
  return strippedHtml(html);
}

export function strippedHtml(html: string) {
  const strippedHtml = html.replace(/<[^>]*>/g, "");
  const stripped = strippedHtml
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\*/g, "")
    .replace(/\_/g, "")
    .replace(/\n/g, " ");
  const strip = stripped
    .replace("&amp;", "")
    .replace("&lt;", "")
    .replace("&gt;", "")
    .replace("&quot;", "")
    .replace("&#039;", "");
  return strip;
}
