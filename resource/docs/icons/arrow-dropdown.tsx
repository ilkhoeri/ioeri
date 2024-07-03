import type { SvgProps } from "../components/web/svg/svg";

export const ArrowDropdownIcon = ({
  fill = "currentColor",
  viewBox = "0 0 15 6",
  strokeWidth = 0,
  ...props
}: SvgProps) => {
  const rest = { fill, viewBox, strokeWidth, ...props };
  return (
    <svg {...rest}>
      <path d="m.7.4c.4,0,.8.2,1.1.5l4,4.1c.5.5,1.1.7,1.7.7s1.2-.2,1.7-.7L13.2.9c.3-.3.7-.5,1.1-.5s.4-.2.4-.4H.3c0,.2.2.4.4.4Z" />
      <path
        data-arrow="border"
        d="m12.9.6l-4,4.1c-.8.8-2,.8-2.8,0L2.1.6c-.4-.4-.9-.6-1.4-.6h-.7c0,.4.3.7.7.7s.7.1.9.4l4,4.1c.5.5,1.2.8,1.9.8s1.4-.3,1.9-.8L13.4,1.1c.2-.2.6-.4.9-.4S15,.4,15,0h-.7C13.8,0,13.3.2,12.9.6Z"
      />
    </svg>
  );
};
