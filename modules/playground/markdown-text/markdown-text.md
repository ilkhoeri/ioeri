$:usage
function MyComponent() {
  return (
    <div
      className="markdown-body" // set class `markdown-body` in wrapper
      dangerouslySetInnerHTML={{ __html: markdownText(text) }}
    />
  )
}

$:example
<div align="center">
  <a href="https://www.github.com/ilkhoeri/modules" target="_blank">
    <img src="https://raw.githubusercontent.com/ioeridev/.github/main/profile/ioeri-512x512.png" alt="ioeri" height="200" style="width: 200px;height: 200px;border-radius: 8px;overflow: hidden;" />
  </a>
</div>

___

# h1

## h2

### h3

1 List Pertama
2 List Kedua
3 List Ketiga
4 List Keempat

- unordered list 1
- unordered list 2
- unordered list 3
- un ordered list 4

> blockquote

[Link](https://...)

<address@mail.com>

```
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
```

<div align="left">
  <a href="https://www.npmjs.com/package/ioeri">
    <img src="https://badgen.net/npm/v/ioeri" alt="version" />
  </a>
  <a href="https://npmjs.org/package/ioeri">
    <img src="https://badgen.now.sh/npm/dm/ioeri" alt="downloads" />
  </a>
</div>
