import { Svg, SvgProps } from "./utils";

export const FolderSearchIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M11 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v4" />
      <circle cx="17" cy="17" r="3" />
      <path d="m21 21-1.5-1.5" />
    </Svg>
  );
};
