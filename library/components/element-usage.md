// default as div
// ref and all props as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
function MyComponent() {
  return (
    <Element
      style={{
        "--sz": "0.75rem",
        width: "var(--sz)",
        height: "var(--sz)",
        "--bg-open": "var(--background)",
      }}
    />
  )
}

// Pass ref and properties to first child component
function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  // containerRef functions

  return (
    <Element
      ref={containerRef}
      asChild
      style={{
        "--sz": "0.75rem",
        width: "var(--sz)",
        height: "var(--sz)",
        "--bg-open": "var(--background)",
      }}
    >
      <aside>
        <h6>Title</h6>

        <section>Content</section>
        <section>Content</section>
      </aside>
    </Element>
  )
}


// ref and all props as DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
function MyComponent() {
  return <Element el="nav" />
}

// ref and all props as DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
function MyComponent() {
  return <Element el="a" href="" />
}

// ref and all props as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
function MyComponent() {
  return <Element el="img" src="" />
}