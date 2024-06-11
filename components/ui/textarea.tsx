import React from "react";
import { twMerge } from "tailwind-merge";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  unstyled?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ unstyled, className, ...props }, ref) => {
    const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      event.currentTarget.style.height = "auto";
      event.currentTarget.style.height = `${event.currentTarget.scrollHeight + 2}px`;
      if (props.onInput) {
        props.onInput(event);
      }
    };

    const rest = {
      ref,
      onInput,
      spellCheck: false,
      className: twMerge(
        !unstyled && "textarea_class",
        "disabled:opacity-50 webkit-scrollbar [field-sizing:content]",
        className,
      ),
      ...props,
    };

    return <textarea {...rest} />;
  },
);
Textarea.displayName = "Textarea";
