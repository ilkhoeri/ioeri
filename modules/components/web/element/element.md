$usage
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