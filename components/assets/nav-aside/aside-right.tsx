import Styles from "./aside-styles";

export function AsideRight() {
  return (
    <aside className={Styles({ style: "aside", aside: "right" })}>
      <nav className={Styles({ style: "nav" })}></nav>
    </aside>
  );
}
