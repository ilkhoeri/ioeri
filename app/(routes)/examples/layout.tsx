import { Section, Main } from "@/library/components/components";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Main>
      <Section className="px-6 md:px-8 lg:px-12">{children}</Section>
    </Main>
  );
}
