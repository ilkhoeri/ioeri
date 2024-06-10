export function markdownText(text: string): string {
  // Replace *...* with <strong>...</strong>
  text = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
  // Replace _..._ with <i>...</i>
  text = text.replace(/_(.*?)_/g, "<i>$1</i>");
  // Replace ~...~ with <s>...</s>
  text = text.replace(/~(.*?)~/g, "<s>$1</s>");
  // Replace ```...``` with <code>...</code>
  text = text.replace(/```(.*?)```/g, "<code>$1</code>");

  return text;
}
