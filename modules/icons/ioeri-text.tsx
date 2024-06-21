import { Svg, SvgProps } from "./utils";

export const IoeriTextIcon = ({ viewBox = "0 0 94.2 24", size = 16, ...props }: SvgProps) => {
  const rest = { viewBox, size, ...props };
  return (
    <Svg currentFill="fill" ratio={{ w: 3.925 }} {...rest}>
      <rect x="88.58" y="0" width="5.62" height="24" rx="2.81" ry="2.81" />
      <path d="m68.63,21.19c0,1.55,1.26,2.81,2.81,2.81h0c1.55,0,2.81-1.26,2.81-2.81v-9.05c0-3.6,2.92-6.51,6.51-6.51h0c1.55,0,2.81-1.26,2.81-2.81h0C83.58,1.26,82.32,0,80.76,0h0c-6.7,0-12.14,5.43-12.14,12.14v9.05Z" />
      <path d="m51.63,18.38c-4.01,0-7.16-3.71-6.2-7.88.53-2.3,2.39-4.16,4.69-4.69,3.12-.72,5.98.86,7.23,3.38h-6.47c-1.56,0-2.82,1.26-2.82,2.82h0c0,1.56,1.26,2.82,2.82,2.82h9.93c1.52,0,2.81-1.2,2.82-2.72s-.26-2.98-.94-4.56C60.81,3.19,56.6.1,51.87,0c-7.01-.14-12.68,5.73-12.22,12.8.36,5.55,4.68,10.28,10.19,11.07,2.34.34,4.58,0,6.54-.85,2.77-1.2,1.82-5.39-1.2-5.39h0c-.41,0-.8.11-1.18.26-.73.31-1.53.49-2.38.49Z" />
      <path d="m22.44,0c-6.21.1-11.49,5.19-11.8,11.39-.24,4.94,2.51,9.26,6.59,11.31,1.83.92,3.98-.51,3.98-2.56h0c0-1.02-.54-2-1.46-2.46-2.49-1.25-4.05-4.11-3.33-7.2.53-2.3,2.41-4.17,4.72-4.69,4.17-.94,7.86,2.19,7.86,6.2,0,2.49-1.42,4.65-3.51,5.7-.92.46-1.46,1.43-1.46,2.46h0c0,2.06,2.16,3.48,4,2.56,3.91-1.96,6.6-6.02,6.6-10.71C34.63,5.32,29.16-.1,22.44,0Z" />
      <rect x="0" y="0" width="5.62" height="24" rx="2.81" ry="2.81" />
    </Svg>
  );
};
