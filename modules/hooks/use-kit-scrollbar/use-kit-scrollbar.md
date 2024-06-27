
$usage
import { useKitScrollbar } from "@/modules";

function MyComponent() {
  const { scrollContentRef, thumbRef } = useKitScrollbar({ overflow: "y" });

  return (
    <div className="relative w-full h-[12rem] max-h-dvh overflow-hidden">
      <div ref={scrollContentRef} className="size-full overflow-y-auto overflow-x-hidden">
        {/* Add more content to demonstrate the scrollbar */}
      </div>
      <span ref={thumbRef} aria-label="thumb" className="rounded-full right-8 w-1.5" />
    </div>
  );
};