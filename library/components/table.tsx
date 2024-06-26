import * as React from "react";
import { twMerge } from "tailwind-merge";

type Unstyled = {
  unstyled?: boolean;
};

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement> & Unstyled>(
  ({ className, unstyled, ...props }, ref) => (
    <div className="w-full scroll_ [--scroll-sz:4px] overflow-auto rounded-[inherit]">
      <table
        ref={ref}
        className={twMerge(!unstyled && "w-full caption-bottom text-sm min-w-max", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement> & Unstyled>(
  ({ className, unstyled, ...props }, ref) => (
    <thead
      ref={ref}
      className={twMerge(!unstyled && "[&_tr]:border-b [&_tr>th]:font-semibold ", className)}
      {...props}
    />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement> & Unstyled>(
  ({ className, unstyled, ...props }, ref) => (
    <tbody ref={ref} className={twMerge(!unstyled && "[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement> & Unstyled>(
  ({ className, unstyled, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={twMerge(!unstyled && "bg-primary font-medium text-muted-foreground", className)}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement> & Unstyled>(
  ({ className, unstyled, ...props }, ref) => (
    <tr
      ref={ref}
      className={twMerge(!unstyled && "border-b border-b-border data-[state=selected]:bg-muted", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement> & Unstyled>(
  ({ className, unstyled, ...props }, ref) => (
    <th
      ref={ref}
      className={twMerge(
        !unstyled &&
          "h-12 py-3 pl-2 pr-2 max-w-var text-left align-middle font-medium text-default [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement> & Unstyled>(
  ({ className, unstyled, ...props }, ref) => (
    <td
      ref={ref}
      className={twMerge(
        !unstyled &&
          "py-4 px-4 whitespace-pre-line align-middle [&:has([role=checkbox])]:pr-0 max-w-var min-w-max truncate",
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement> & Unstyled
>(({ className, unstyled, ...props }, ref) => (
  <caption ref={ref} className={twMerge(!unstyled && "mt-4 text-sm text-muted-foreground", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
