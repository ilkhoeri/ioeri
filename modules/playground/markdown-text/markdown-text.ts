import "./markdown-text.css";

export function markdownText(text: string): string {
  // Replace ___ with <hr>
  text = text.replace(/___/g, "<hr>");

  // Replace _..._ with <i>...</i>
  text = text.replace(/_(.*?)_/g, "<i>$1</i>");

  // Replace ~...~ with <s>...</s>
  text = text.replace(/~(.*?)~/g, "<s>$1</s>");

  // Replace *...* with <strong>...</strong>
  text = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

  // Replace headings
  text = text.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  text = text.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  text = text.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Replace links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Replace email addresses with mailto links
  text = text.replace(/<([^>]+@[^>]+)>/g, '<a href="mailto:$1">$1</a>');
  text = text.replace(/^(.*?<a href="mailto:[^>]+>[^<]+<\/a>.*)$/gm, "<p>$1</p>");

  // Replace blockquotes
  text = text.replace(/^> (.*$)/gim, '<blockquote><p dir="auto">$1</p></blockquote>');
  text = text.replace(/^< (.*$)/gim, "$1");

  // Replace ordered list items (start with a digit followed by space)
  text = text.replace(/^\d+ (.*)$/gm, "<li>$1</li>");
  text = text.replace(/(<li>.*<\/li>)(?!(<\/ol>|<\/ul>))/gim, '<ol dir="auto">$1</ol>');

  // Replace unordered list items (start with a dash followed by space)
  text = text.replace(/^- (.*)$/gm, "<li>$1</li>");
  text = text.replace(/(<li>.*<\/li>)(?!(<\/ul>|<\/ol>))/gim, '<ul dir="auto">$1</ul>');

  // Combine all consecutive <ol> and <ul> tags into one
  text = text.replace(/<\/ol>\s*<ol dir="auto">/gim, "");
  text = text.replace(/<\/ul>\s*<ul dir="auto">/gim, "");

  // Replace code blocks (text wrapped with triple backticks)
  text = text.replace(
    /```([^```]+)```/gs,
    (_, p1) =>
      `<div data-area="clipboard" class="clipboard-content notranslate position-relative overflow-auto"><pre class="notranslate"><code>${p1.trim()}</code></pre><span role="button" aria-label="Copy" class="clipboard-button" data-value="${stripHtml(p1)}" tabindex="0"><svg width="16" height="16" class="clipboard-icons size-4"><use class="icons-path" href="/images/icons.svg#copy"></use></svg></span></div>`,
  );

  // Replace `...` with <code>...</code>
  text = text.replace(/`(.*?)`/g, "<code>$1</code>");

  // Replace ```...``` with <code>...</code>
  text = text.replace(/```(.*?)```/g, "<code>$1</code>");

  return text;
}

function stripHtml(text: string) {
  text = text.replace(/<[^>]*>/g, "");
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  return text.trim();
}

// event listener to handle copy functionality
if (typeof window !== "undefined") {
  document.addEventListener("click", function (event) {
    const target = event.target as HTMLElement;

    if (target && target.closest(".clipboard-button")) {
      const button = target.closest(".clipboard-button") as HTMLElement;
      const useElement = button.querySelector("use") as SVGUseElement;

      const textToCopy = button.getAttribute("data-value");
      if (textToCopy) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            button.setAttribute("data-copied", "success");
            useElement.setAttribute("href", "/images/icons.svg#check");
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      }
    }
  });
}
