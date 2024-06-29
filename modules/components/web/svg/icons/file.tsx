import { Svg, type SvgProps } from "../svg";

export const FileIcon = ({ arrow, ...props }: SvgProps & { arrow?: boolean }) => {
  return (
    <Svg {...props}>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      {arrow && (
        <>
          <path d="M15 11l-5 5" />
          <path d="M15 16v-5h-5" />
        </>
      )}
    </Svg>
  );
};
