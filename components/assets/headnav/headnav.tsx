import Link from "next/link";
import Container from "@/components/ui/container";
import { IoeriLogoTextIcon } from "@/modules";

export default function Headnav() {
  return (
    <header className="h-[--navbar] flex items-center justify-between py-4 px-4 md:px-5 xl:px-6 border-0 border-b-[0.04rem] border-b-muted/65 sticky top-0 inset-x-0 z-99 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 [&_+_main]:pt-[--navbar]">
      <Container unstyled className="w-full relative flex items-center mx-auto max-w-screen-3xl md:px-4 3xl:px-20">
        <Link href={"/"} aria-label="ioeri" className="rounded-xl py-1 px-2">
          <IoeriLogoTextIcon size={20} />
        </Link>

        <div className="h-full hidden md:flex items-center justify-between gap-4 text-muted-foreground font-medium text-sm ml-10 mr-auto">
          <div className="cursor-pointer select-none">Products</div>
          <div className="cursor-pointer select-none">Contacts</div>
          <div className="cursor-pointer select-none">Generators</div>
          <div className="cursor-pointer select-none">Docs</div>
        </div>

        <div />
      </Container>
    </header>
  );
}
