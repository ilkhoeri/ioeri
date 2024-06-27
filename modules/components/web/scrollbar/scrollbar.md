
$:usage
import { Scrollbar } from "@/modules";

function MyComponent() {

  return (
    <section className="relative h-full max-h-dvh overflow-hidden">
      <Scrollbar overflow="y">
        <h1>Custom Scrollbar</h1>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
        <p>Lorem ipsum dolor sit amet...</p>
      </Scrollbar>
    </section>
  );
};