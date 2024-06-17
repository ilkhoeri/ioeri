function MyComponent() {
  return (
    <div
      // include class `markdown-body` in the inner wrapper
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: markdownText(text) }}
    />
  )
}