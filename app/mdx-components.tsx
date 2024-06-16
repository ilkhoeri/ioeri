import type { MDXComponents } from "mdx/types";

import { components as config } from "./mdx-config";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...config,
    ...components,
  };
}
